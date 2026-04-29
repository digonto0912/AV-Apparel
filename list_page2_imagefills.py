import re
from pathlib import Path

import yaml


def main() -> None:
    root = Path(__file__).resolve().parent
    yml = root / "figma-node-21-9.yaml"
    raw = yml.read_text(encoding="utf-8")

    # Avoid PyYAML treating unquoted "21:83" like a sexagesimal number.
    raw = re.sub(r"^(\s*-?\s*id:\s*)(\d+:\d+)\s*$", r'\1"\2"', raw, flags=re.MULTILINE)
    data = yaml.safe_load(raw)

    styles = ((data.get("globalVars") or {}).get("styles") or {}) if isinstance(data, dict) else {}
    nodes = data.get("nodes") or []

    def iter_nodes(n):
        yield n
        for c in n.get("children") or []:
            yield from iter_nodes(c)

    def get_style_fill(fills_key):
        v = styles.get(fills_key)
        if isinstance(v, list) and v and isinstance(v[0], dict) and v[0].get("type") == "IMAGE":
            return v[0]
        return None

    img = []
    for top in nodes:
        for n in iter_nodes(top):
            fills_key = n.get("fills")
            if not fills_key:
                continue
            fill = get_style_fill(fills_key)
            if not fill:
                continue
            layout = n.get("layout")
            loc = layout.get("locationRelativeToParent") if isinstance(layout, dict) else {}
            img.append(
                {
                    "id": str(n.get("id")),
                    "name": str(n.get("name", ""))[:80],
                    "y": loc.get("y", 0),
                    "x": loc.get("x", 0),
                    "imageRef": str(fill.get("imageRef", "")),
                }
            )

    img.sort(key=lambda a: (a["y"], a["x"]))
    print("image-fill nodes:", len(img))
    for a in img[:25]:
        name = a["name"].encode("ascii", errors="replace").decode("ascii")
        print(a["id"], "y", a["y"], "x", a["x"], "name", name, "ref", a["imageRef"][:10])


if __name__ == "__main__":
    main()

