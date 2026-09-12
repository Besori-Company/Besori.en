#!/usr/bin/env python3
"""Genera sitemap.xml a partir de las páginas .html del sitio.

- Descubre solas las páginas: index.html + pages/*.html.
- Salta cualquier página marcada como noindex.
- lastmod = fecha del último commit que tocó el archivo (si hay git);
  si no, la fecha de modificación del archivo.
- changefreq y priority salen de CONFIG (con un valor por defecto).
- Incluye la extensión de imágenes de Google (<image:image>): cada página
  lista sus imágenes (las <img> del cuerpo + el og:image), para que Google
  las descubra e indexe en Google Imágenes.
"""

import datetime
import pathlib
import posixpath
import re
import subprocess
import sys

BASE = "https://en.besoricompany.com"
RAIZ = pathlib.Path(__file__).resolve().parent.parent

DEFECTO = ("monthly", "0.5")
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


def paginas():
    """Rutas de las páginas indexables, en orden estable."""
    candidatas = [RAIZ / "index.html"] + sorted((RAIZ / "pages").glob("*.html"))
    for ruta in candidatas:
        if not ruta.exists():
            continue
        texto = ruta.read_text(encoding="utf-8")
        if re.search(r'name=["\']robots["\'][^>]*content=["\'][^"\']*noindex',
                     texto, re.I):
            continue
        yield ruta, texto


def loc(rel):
    return f"{BASE}/" if rel == "index.html" else f"{BASE}/{rel}"


def url_absoluta(src, pagina_rel):
    """Convierte un src de imagen en URL absoluta del sitio."""
    if src.startswith("http"):
        return src
    if src.startswith("/"):
        return BASE + src
    carpeta = posixpath.dirname(pagina_rel)
    return BASE + "/" + posixpath.normpath(posixpath.join(carpeta, src))


def imagenes(texto, pagina_rel):
    """Imágenes de la página (cuerpo + og:image), absolutas y sin repetir."""
    encontradas = RE_IMG.findall(texto) + RE_OG.findall(texto)
    vistas, salida = set(), []
    for src in encontradas:
        url = url_absoluta(src, pagina_rel)
        if url not in vistas:
            vistas.add(url)
            salida.append(url)
    return salida


def lastmod(ruta):
    try:
        salida = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", str(ruta)],
            cwd=RAIZ, capture_output=True, text=True, check=True).stdout.strip()
        if salida:
            return salida
    except Exception:
        pass
    return datetime.date.fromtimestamp(ruta.stat().st_mtime).isoformat()


def main():
    dry_run = "--dry-run" in sys.argv

    bloques = []
    for ruta, texto in paginas():
        rel = ruta.relative_to(RAIZ).as_posix()
        freq, prio = CONFIG.get(rel, DEFECTO)
        imgs = "".join(
            f"\n    <image:image><image:loc>{u}</image:loc></image:image>"
            for u in imagenes(texto, rel))
        bloques.append(
            "  <url>\n"
            f"    <loc>{loc(rel)}</loc>\n"
            f"    <lastmod>{lastmod(ruta)}</lastmod>\n"
            f"    <changefreq>{freq}</changefreq>\n"
            f"    <priority>{prio}</priority>"
            f"{imgs}\n"
            "  </url>"
        )

    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
           '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n'
           + "\n\n".join(bloques)
           + "\n\n</urlset>\n")

    if dry_run:
        print(xml, end="")
        return

    (RAIZ / "sitemap.xml").write_text(xml, encoding="utf-8")
    print(f"sitemap.xml generado con {len(bloques)} páginas")


if __name__ == "__main__":
    main()
