#!/usr/bin/env python3
"""Generates sitemap.xml from the site's .html pages.

- Discovers pages automatically: index.html + pages/*.html.
- Skips any page marked as noindex.
- lastmod = date of the last commit that touched the file (if git is available);
  otherwise, the file's modification date.
- changefreq and priority come from CONFIG (with a default value).
- Includes Google's image extension (<image:image>): each page lists its
  images (the <img> tags in the body + the og:image), so Google can
  discover and index them in Google Images.
"""

import datetime
import pathlib
import posixpath
import re
import subprocess
import sys

BASE = "https://en.besoricompany.com"
ROOT = pathlib.Path(__file__).resolve().parent.parent

DEFAULT = ("monthly", "0.5")
CONFIG = {
    "index.html":          ("monthly", "1.0"),
    "pages/catalog.html":  ("monthly", "0.9"),
    "pages/hyprdesk.html": ("monthly", "0.9"),
    "pages/aboutus.html":  ("monthly", "0.8"),
    "pages/terms.html":    ("yearly",  "0.3"),
}

RE_IMG = re.compile(r'<img[^>]+src=["\']([^"\']+)["\']', re.I)
RE_OG = re.compile(r'<meta[^>]+property=["\']og:image["\'][^>]+'
                   r'content=["\']([^"\']+)["\']', re.I)


def pages():
    """Paths of the indexable pages, in a stable order."""
    candidates = [ROOT / "index.html"] + sorted((ROOT / "pages").glob("*.html"))
    for path in candidates:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        if re.search(r'name=["\']robots["\'][^>]*content=["\'][^"\']*noindex',
                     text, re.I):
            continue
        yield path, text


def loc(rel):
    return f"{BASE}/" if rel == "index.html" else f"{BASE}/{rel}"


def absolute_url(src, page_rel):
    """Turns an image src into an absolute site URL."""
    if src.startswith("http"):
        return src
    if src.startswith("/"):
        return BASE + src
    folder = posixpath.dirname(page_rel)
    return BASE + "/" + posixpath.normpath(posixpath.join(folder, src))


def images(text, page_rel):
    """Page images (body + og:image), absolute and without duplicates."""
    found = RE_IMG.findall(text) + RE_OG.findall(text)
    seen, result = set(), []
    for src in found:
        url = absolute_url(src, page_rel)
        if url not in seen:
            seen.add(url)
            result.append(url)
    return result


def lastmod(path):
    try:
        output = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", str(path)],
            cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()
        if output:
            return output
    except Exception:
        pass
    return datetime.date.fromtimestamp(path.stat().st_mtime).isoformat()


def main():
    dry_run = "--dry-run" in sys.argv

    blocks = []
    for path, text in pages():
        rel = path.relative_to(ROOT).as_posix()
        freq, prio = CONFIG.get(rel, DEFAULT)
        imgs = "".join(
            f"\n    <image:image><image:loc>{u}</image:loc></image:image>"
            for u in images(text, rel))
        blocks.append(
            "  <url>\n"
            f"    <loc>{loc(rel)}</loc>\n"
            f"    <lastmod>{lastmod(path)}</lastmod>\n"
            f"    <changefreq>{freq}</changefreq>\n"
            f"    <priority>{prio}</priority>"
            f"{imgs}\n"
            "  </url>"
        )

    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
           '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n'
           + "\n\n".join(blocks)
           + "\n\n</urlset>\n")

    if dry_run:
        print(xml, end="")
        return

    (ROOT / "sitemap.xml").write_text(xml, encoding="utf-8")
    print(f"sitemap.xml generated with {len(blocks)} pages")


if __name__ == "__main__":
    main()
