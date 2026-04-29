import re
from pathlib import Path


def main() -> None:
    root = Path(__file__).resolve().parent
    css_path = root / "styles-page2.css"
    css = css_path.read_text(encoding="utf-8")

    # Extract referenced PNG file names like assets/page2/img_...png
    refs = re.findall(r"assets/page2/(img_[^\"]+?\.png)", css)
    uniq = []
    for r in refs:
        if r not in uniq:
            uniq.append(r)

    print("unique png refs:", len(uniq))

    assets_dir = root / "assets" / "page2"
    existing = 0
    for f in uniq[:50]:
        if (assets_dir / f).exists():
            existing += 1
        else:
            print("missing:", f)
    print("existing in first 50:", existing, "/ 50")


if __name__ == "__main__":
    main()

