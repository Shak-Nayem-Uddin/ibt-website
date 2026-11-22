"""Pre-render key pages as static HTML for search engines and link previews.

Usage (from the repo root):  python tools/prerender.py
Needs: pip install playwright && playwright install chromium   (or set CHROME=/path/to/chrome)
Writes <route>/index.html for each route in ROUTES, plus sitemap.xml and robots.txt.
Each static page shows the real content immediately, then the normal site takes over
(the address changes to /#route). Re-run after content changes that matter for search.
"""
import asyncio, functools, http.server, json, os, re, threading
from datetime import date
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://shak-nayem-uddin.github.io/ibt-website/"
BASE_PATH = "/ibt-website/"
ROUTES = ["about", "mission", "history", "governance", "chairman", "sister-concerns", "programs", "activity-welfare", "activities", "projects", "project-ibjmc", "future",
          "institutions", "inst-kulliyatul-quran", "funds", "donate", "transparency", "publications", "news", "register",
          "reg-get-together-2026", "ask", "quran", "prayer", "media", "contact", "privacy", "terms"]
PORT = 8790

def serve():
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
    http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), h).serve_forever()

async def main():
    threading.Thread(target=serve, daemon=True).start()
    tpl = (ROOT / "index.html").read_text(encoding="utf-8")
    async with async_playwright() as p:
        kw = {"executable_path": os.environ["CHROME"]} if os.environ.get("CHROME") else {}
        b = await p.chromium.launch(**kw)
        ctx = await b.new_context(viewport={"width": 1366, "height": 900})
        async def block(r):
            if r.request.url.startswith("http://127.0.0.1"): return await r.continue_()
            return await r.fulfill(status=204, body="")
        await ctx.route("**/*", block)
        pg = await ctx.new_page()
        await pg.goto(f"http://127.0.0.1:{PORT}/index.html")
        await pg.evaluate("localStorage.setItem('ibt_lang','bn');localStorage.setItem('ibt_theme','light')")
        for route in ROUTES:
            await pg.goto(f"http://127.0.0.1:{PORT}/index.html#{route}"); await pg.reload(); await pg.wait_for_timeout(2200)
            data = await pg.evaluate("""() => { document.querySelectorAll('#main .rv').forEach(e => e.classList.add('in'));
                const m = n => (document.querySelector(n) || {}).content || '';
                return { title: document.title, desc: m('meta[name="description"]'), img: m('meta[property="og:image"]'), main: document.querySelector('#main').innerHTML }; }""")
            url = SITE + route + "/"
            img = data["img"] if data["img"].startswith("https://") else SITE + "img/og-cover.jpg"
            html = tpl
            html = html.replace("<head>", f'<head>\n<base href="{BASE_PATH}">', 1)
            html = re.sub(r"<title>.*?</title>", "<title>" + data["title"].replace("&", "&amp;").replace("<", "&lt;") + "</title>", html, 1, re.S)
            esc = lambda s: s.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;")
            html = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{esc(data["desc"])}">', html, 1)
            html = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{esc(data["title"])}">', html, 1)
            html = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{esc(data["desc"])}">', html, 1)
            html = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">', html, 1)
            html = re.sub(r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{esc(img)}">', html, 1)
            html = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">', html, 1)
            html = html.replace('<main id="main" tabindex="-1">', '<script>if(!location.hash)history.replaceState(null,"",document.baseURI+"#' + route + '");</script>\n<main id="main" tabindex="-1">', 1)
            html = re.sub(r'(<main id="main" tabindex="-1">).*?(</main>)', lambda m: m.group(1) + data["main"] + m.group(2), html, 1, re.S)
            out = ROOT / route / "index.html"; out.parent.mkdir(exist_ok=True); out.write_text(html, encoding="utf-8")
            print("ok", route, len(html) // 1024, "KB")
        # home: the root page carries the rendered home content too, so the first paint needs no script
        await pg.goto(f"http://127.0.0.1:{PORT}/index.html#home"); await pg.reload(); await pg.wait_for_timeout(2500)
        main = await pg.evaluate("() => { document.querySelectorAll('#main .rv').forEach(e => e.classList.add('in')); return document.querySelector('#main').innerHTML; }")
        root = (ROOT / "index.html").read_text(encoding="utf-8")
        root = re.sub(r"(<main id=\"main\" tabindex=\"-1\">).*?(</main>)", lambda m: m.group(1) + main + m.group(2), root, 1, re.S)
        (ROOT / "index.html").write_text(root, encoding="utf-8"); print("ok home (index.html)", len(root) // 1024, "KB")
        await b.close()
    today = date.today().isoformat()
    urls = [SITE] + [SITE + r + "/" for r in ROUTES]
    (ROOT / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        "".join(f"  <url><loc>{u}</loc><lastmod>{today}</lastmod></url>\n" for u in urls) + "</urlset>\n", encoding="utf-8")
    (ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nDisallow: /harvest/\nDisallow: /apps-script/\n\nSitemap: {SITE}sitemap.xml\n", encoding="utf-8")
    print("sitemap", len(urls), "urls")

asyncio.run(main())
