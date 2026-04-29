"""
Download assets from image-download-plan-*.json using the Figma REST API.

Requires a personal access token:
  set FIGMA_ACCESS_TOKEN=your_token_here   (PowerShell: $env:FIGMA_ACCESS_TOKEN="...")

Then:
  python download_figma_assets.py image-download-plan-page2.json assets/page2
"""
from __future__ import annotations

import json
import os
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any, Dict, List


def _get(url: str, headers: dict) -> dict:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _download_file(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "AV_Apparel-downloader/1.0"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        dest.write_bytes(resp.read())


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__.strip())
        return 2
    plan_path = Path(sys.argv[1])
    out_dir = Path(sys.argv[2])
    token = os.environ.get("FIGMA_ACCESS_TOKEN", "").strip()
    if not token:
        print("Missing FIGMA_ACCESS_TOKEN in environment.")
        return 1

    plan: List[Dict[str, Any]] = json.loads(plan_path.read_text(encoding="utf-8"))
    file_key = "gLyBwA9pEiH1EZW060KyBJ"
    headers = {"X-Figma-Token": token}

    svg_items = [x for x in plan if str(x.get("fileName", "")).endswith(".svg")]
    png_items = [x for x in plan if not str(x.get("fileName", "")).endswith(".svg")]

    def chunks(items: List[Dict[str, Any]], n: int) -> List[List[Dict[str, Any]]]:
        return [items[i : i + n] for i in range(0, len(items), n)]

    def export_batch(batch: List[Dict[str, Any]], fmt: str, scale: int) -> None:
        if not batch:
            return
        # Encode node ids (colons must be %3A); keep commas between ids unencoded.
        ids = ",".join(urllib.parse.quote(str(x["nodeId"]), safe="") for x in batch)
        q = f"ids={ids}&format={urllib.parse.quote(fmt)}&scale={scale}"
        url = f"https://api.figma.com/v1/images/{file_key}?{q}"
        data = _get(url, headers)
        err = data.get("err")
        if err:
            raise RuntimeError(f"Figma API error: {err}")
        images = data.get("images") or {}
        for item in batch:
            nid = str(item["nodeId"])
            u = images.get(nid)
            if not u:
                print("skip (no URL)", nid, item.get("fileName"))
                continue
            dest = out_dir / item["fileName"]
            _download_file(u, dest)
            print("ok", dest.name)
        time.sleep(0.35)

    print(f"SVG nodes: {len(svg_items)}, PNG nodes: {len(png_items)}")
    # Keep batches small to avoid URL length limits
    for batch in chunks(svg_items, 40):
        export_batch(batch, "svg", 1)
    for batch in chunks(png_items, 25):
        export_batch(batch, "png", 2)

    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
