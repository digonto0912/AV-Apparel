import argparse
import json
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import yaml


def _css_escape_class(s: str) -> str:
    # Node ids like "8:5" -> "n-8-5"
    return "n-" + re.sub(r"[^a-zA-Z0-9_-]+", "-", s)


def _sanitize_filename(s: str) -> str:
    return re.sub(r"[^a-zA-Z0-9_.-]+", "-", s)


def _hex_color(fill_value: Any) -> Optional[str]:
    # fill_* style can be:
    # - ['#FFFFFF']
    # - [{'type': 'IMAGE', ...}]
    if isinstance(fill_value, list) and fill_value:
        if isinstance(fill_value[0], str) and fill_value[0].startswith("#"):
            return fill_value[0]
    return None


def _image_fill(fill_value: Any) -> Optional[Dict[str, Any]]:
    if isinstance(fill_value, list) and fill_value:
        if isinstance(fill_value[0], dict) and fill_value[0].get("type") == "IMAGE":
            return fill_value[0]
    return None


def _get_layout(styles: Dict[str, Any], layout_key: Optional[str]) -> Optional[Dict[str, Any]]:
    if not layout_key:
        return None
    v = styles.get(layout_key)
    if isinstance(v, dict) and "dimensions" in v:
        return v
    return None


def _get_text_style(styles: Dict[str, Any], style_key: Optional[str]) -> Optional[Dict[str, Any]]:
    if not style_key:
        return None
    v = styles.get(style_key)
    if isinstance(v, dict) and "fontFamily" in v:
        return v
    return None


def _iter_nodes(node: Dict[str, Any]) -> List[Dict[str, Any]]:
    out = [node]
    for child in node.get("children", []) or []:
        out.extend(_iter_nodes(child))
    return out


def _node_by_id(root_nodes: List[Dict[str, Any]]) -> Dict[str, Dict[str, Any]]:
    m: Dict[str, Dict[str, Any]] = {}
    for n in root_nodes:
        for x in _iter_nodes(n):
            if "id" in x:
                m[str(x["id"])] = x
    return m


def _build_dom(
    node: Dict[str, Any],
    styles: Dict[str, Any],
    assets_dir: str,
    svg_exports: Dict[str, str],
    image_exports: Dict[Tuple[str, str], str],
) -> str:
    node_id = str(node.get("id", ""))
    node_name = str(node.get("name", "")).strip()
    node_type = node.get("type")
    layout_key = node.get("layout")
    fills_key = node.get("fills")

    cls = _css_escape_class(node_id) if node_id else "n-unknown"
    attrs = [f'class="figma-node {cls}"']
    if node_id:
        attrs.append(f'data-node-id="{node_id}"')
    if node_name:
        attrs.append(f'data-node-name="{html_escape(node_name)}"')
    if node_type:
        attrs.append(f'data-node-type="{node_type}"')

    inner = ""
    if node_type == "TEXT":
        text = node.get("text", "") or ""
        inner = html_escape(str(text))
    elif node_type == "IMAGE-SVG":
        # Exported separately as a .svg.
        file_name = svg_exports.get(node_id)
        if file_name:
            inner = f'<img class="figma-img" alt="" src="{assets_dir}/{file_name}"/>'
        else:
            inner = ""
    else:
        children = node.get("children", []) or []
        inner = "".join(_build_dom(c, styles, assets_dir, svg_exports, image_exports) for c in children)

    return f"<div {' '.join(attrs)}>{inner}</div>"


def html_escape(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#39;")
    )


def _css_for_node(
    node: Dict[str, Any],
    styles: Dict[str, Any],
    svg_exports: Dict[str, str],
    image_exports: Dict[Tuple[str, str], str],
    assets_prefix: str,
) -> str:
    node_id = str(node.get("id", ""))
    if not node_id:
        return ""

    cls = "." + _css_escape_class(node_id)
    layout = _get_layout(styles, node.get("layout"))
    fills_val = styles.get(node.get("fills")) if node.get("fills") else None
    text_style = _get_text_style(styles, node.get("textStyle"))
    node_type = node.get("type")

    rules: List[str] = []
    if layout:
        loc = (layout.get("locationRelativeToParent") or {}) if isinstance(layout.get("locationRelativeToParent"), dict) else {}
        dims = layout.get("dimensions") or {}
        x = loc.get("x", 0)
        y = loc.get("y", 0)
        w = dims.get("width")
        h = dims.get("height")
        rules.append("position: absolute;")
        rules.append(f"left: {x}px;")
        rules.append(f"top: {y}px;")
        if w is not None:
            rules.append(f"width: {w}px;")
        if h is not None:
            rules.append(f"height: {h}px;")

    if node_type in ("FRAME", "GROUP", "COMPONENT", "INSTANCE", "SECTION", "RECTANGLE"):
        rules.append("box-sizing: border-box;")

    color = _hex_color(fills_val)
    if color:
        if node_type == "TEXT":
            rules.append(f"color: {color};")
        else:
            rules.append(f"background: {color};")

    image_fill = _image_fill(fills_val)
    if image_fill:
        image_ref = image_fill.get("imageRef", "")
        file_name = image_exports.get((node_id, str(image_ref)))
        if file_name:
            rules.append(f'background-image: url("{assets_prefix}/{file_name}");')
            rules.append("background-repeat: no-repeat;")
            object_fit = (image_fill.get("objectFit") or "").lower()
            scale_mode = (image_fill.get("scaleMode") or "").upper()
            if scale_mode == "STRETCH" or object_fit in ("fill", "contain", "cover"):
                if object_fit == "contain":
                    rules.append("background-size: contain; background-position: center;")
                elif object_fit == "cover":
                    rules.append("background-size: cover; background-position: center;")
                else:
                    rules.append("background-size: 100% 100%; background-position: 0 0;")
            else:
                rules.append("background-size: cover; background-position: center;")

    if node_type == "TEXT" and text_style:
        ff = text_style.get("fontFamily")
        fw = text_style.get("fontWeight")
        fs = text_style.get("fontSize")
        lh = text_style.get("lineHeight")
        tah = (text_style.get("textAlignHorizontal") or "").upper()
        tav = (text_style.get("textAlignVertical") or "").upper()

        rules.append("white-space: pre-line;")
        if ff:
            rules.append(f"font-family: \"{ff}\", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;")
        if fw is not None:
            rules.append(f"font-weight: {fw};")
        if fs is not None:
            rules.append(f"font-size: {fs}px;")
        if isinstance(lh, str) and lh.endswith("em"):
            rules.append(f"line-height: {lh};")
        elif isinstance(lh, (int, float)):
            rules.append(f"line-height: {lh}px;")
        if tah:
            rules.append(f"text-align: {tah.lower()};")
        # Vertical alignment is approximated using flex on the container.
        rules.append("display: flex;")
        if tah == "CENTER":
            rules.append("justify-content: center;")
        elif tah == "RIGHT":
            rules.append("justify-content: flex-end;")
        else:
            rules.append("justify-content: flex-start;")
        if tav == "CENTER":
            rules.append("align-items: center;")
        elif tav == "BOTTOM":
            rules.append("align-items: flex-end;")
        else:
            rules.append("align-items: flex-start;")

    if node_type == "IMAGE-SVG":
        rules.append("overflow: hidden;")
        rules.append("background: transparent;")

    if not rules:
        return ""

    return f"{cls}{{{''.join(rules)}}}\n"


def generate(
    root: Path,
    figma_yaml_path: Path,
    html_name: str,
    css_name: str,
    js_name: str,
    assets_rel: str,
    plan_name: str,
    title: str,
) -> None:
    if not figma_yaml_path.exists():
        raise SystemExit(f"Missing {figma_yaml_path}.")

    # PyYAML follows YAML 1.1, where unquoted values like "8:9" can be parsed
    # as sexagesimal numbers (8*60+9=489). Figma node IDs commonly look like
    # that, so we pre-quote them to keep IDs stable.
    raw = figma_yaml_path.read_text(encoding="utf-8")
    raw = re.sub(r"^(\s*-?\s*id:\s*)(\d+:\d+)\s*$", r'\1"\2"', raw, flags=re.MULTILINE)
    data = yaml.safe_load(raw)
    if not isinstance(data, dict):
        raise SystemExit("Unexpected Figma data format.")

    nodes = data.get("nodes") or []
    global_vars = data.get("globalVars") or {}
    styles = (global_vars.get("styles") or {}) if isinstance(global_vars, dict) else {}
    if not isinstance(nodes, list) or not isinstance(styles, dict):
        raise SystemExit("Unexpected Figma data shape (nodes/styles).")

    # Export plan for images and SVGs.
    all_nodes_map = _node_by_id(nodes)
    svg_exports: Dict[str, str] = {}
    image_exports: Dict[Tuple[str, str], str] = {}
    downloads: List[Dict[str, Any]] = []

    for node_id, node in all_nodes_map.items():
        node_type = node.get("type")
        if node_type == "IMAGE-SVG":
            fname = _sanitize_filename(f"svg_{node_id.replace(':','-')}.svg")
            svg_exports[node_id] = fname
            downloads.append({"nodeId": node_id, "fileName": fname})

    # Image fills are stored in styles under fill_* keys.
    for node_id, node in all_nodes_map.items():
        fills_key = node.get("fills")
        if not fills_key:
            continue
        fills_val = styles.get(fills_key)
        image_fill = _image_fill(fills_val)
        if not image_fill:
            continue
        image_ref = str(image_fill.get("imageRef", "") or "")
        if not image_ref:
            continue

        suffix = ""
        ida = image_fill.get("imageDownloadArguments") or {}
        if isinstance(ida, dict) and ida.get("filenameSuffix"):
            suffix = f"_{ida.get('filenameSuffix')}"

        fname = _sanitize_filename(f"img_{node_id.replace(':','-')}{suffix}.png")
        image_exports[(node_id, image_ref)] = fname

        dl: Dict[str, Any] = {"nodeId": node_id, "imageRef": image_ref, "fileName": fname}
        if isinstance(ida, dict):
            if "needsCropping" in ida:
                dl["needsCropping"] = bool(ida["needsCropping"])
            if "requiresImageDimensions" in ida:
                dl["requiresImageDimensions"] = bool(ida["requiresImageDimensions"])
            if "cropTransform" in ida:
                dl["cropTransform"] = ida["cropTransform"]
            if "filenameSuffix" in ida:
                dl["filenameSuffix"] = str(ida["filenameSuffix"])
        downloads.append(dl)

    assets_path = root / assets_rel.replace("\\", "/")
    assets_path.mkdir(parents=True, exist_ok=True)
    (root / plan_name).write_text(json.dumps(downloads, indent=2), encoding="utf-8")

    # Build HTML + CSS.
    page_root = nodes[0] if nodes else {}
    dom = _build_dom(page_root, styles, assets_rel.replace("\\", "/"), svg_exports, image_exports)
    page_layout = _get_layout(styles, page_root.get("layout") if isinstance(page_root, dict) else None) if isinstance(page_root, dict) else None
    page_w = 1920
    page_h = None
    if page_layout and isinstance(page_layout.get("dimensions"), dict):
        dims = page_layout["dimensions"]
        if dims.get("width") is not None:
            page_w = float(dims["width"])
        page_h = dims.get("height")

    assets_prefix = assets_rel.replace("\\", "/")

    css = [
        "html,body{margin:0;padding:0;background:#ffffff;}\n",
        ".viewport{width:100%;overflow-x:auto;}\n",
        f".figma-page{{position:relative;width:{page_w}px;{f'height:{page_h}px;' if page_h is not None else ''}transform-origin:top left;}}\n",
        ".figma-node{position:absolute;}\n",
        ".figma-img{width:100%;height:100%;display:block;}\n",
    ]

    for n in _iter_nodes(page_root):
        css.append(_css_for_node(n, styles, svg_exports, image_exports, assets_prefix))

    html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{html_escape(title)}</title>
    <link rel="stylesheet" href="{html_escape(css_name)}" />
  </head>
  <body>
    <div class="viewport">
      <div id="figmaPage" class="figma-page" data-base-width="{page_w}">
        {dom}
      </div>
    </div>
    <script src="{html_escape(js_name)}"></script>
  </body>
</html>
"""

    (root / html_name).write_text(html, encoding="utf-8")
    (root / css_name).write_text("".join(css), encoding="utf-8")
    (root / js_name).write_text(
        """(function () {
  const page = document.getElementById('figmaPage');
  if (!page) return;
  const BASE_W = parseFloat(page.dataset.baseWidth || '1920', 10) || 1920;
  function applyScale() {
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const scale = Math.min(1, vw / BASE_W);
    page.style.transform = 'scale(' + scale + ')';
    page.style.height = (page.scrollHeight / scale) + 'px';
  }
  window.addEventListener('resize', applyScale);
  applyScale();
})();\n""",
        encoding="utf-8",
    )

    print(f"Generated {html_name}, {css_name}, {js_name}, {plan_name}")


def main() -> int:
    root = Path(__file__).resolve().parent
    p = argparse.ArgumentParser(description="Generate static HTML/CSS from Framelink Figma YAML export.")
    p.add_argument("--yaml", default="figma-node-4-2.yaml", help="Path to saved get_figma_data YAML")
    p.add_argument("--html", default="index.html")
    p.add_argument("--css", default="styles.css")
    p.add_argument("--js", default="script.js")
    p.add_argument("--assets", default="assets", help="Assets folder relative to project root (use forward slashes)")
    p.add_argument("--plan", default="image-download-plan.json")
    p.add_argument("--title", default="Landing")
    args = p.parse_args()

    generate(
        root=root,
        figma_yaml_path=(root / args.yaml) if not Path(args.yaml).is_absolute() else Path(args.yaml),
        html_name=args.html,
        css_name=args.css,
        js_name=args.js,
        assets_rel=args.assets,
        plan_name=args.plan,
        title=args.title,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

