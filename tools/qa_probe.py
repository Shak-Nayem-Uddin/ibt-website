# One-off probe: prints how IslamQA and Islamweb expose question lists (robots, sitemaps, sample pages).
import urllib.request, re, gzip, sys
H = {'User-Agent': 'Mozilla/5.0 (compatible; IBT-site-index/1.0; +https://shak-nayem-uddin.github.io/ibt-website/)'}
def get(u, n=3000):
    try:
        r = urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30); b = r.read()
        if b[:2] == b'\x1f\x8b': b = gzip.decompress(b)
        t = b.decode('utf-8', 'ignore'); print('\n=====', u, r.status, len(t)); print(t[:n]); return t
    except Exception as e: print('\n=====', u, 'ERR', e); return ''
for u in ['https://islamqa.info/robots.txt', 'https://www.islamweb.net/robots.txt']: get(u, 2500)
sm = get('https://islamqa.info/sitemap.xml', 2500)
for m in re.findall(r'<loc>([^<]+)</loc>', sm)[:40]: print('SM', m)
bn = [m for m in re.findall(r'<loc>([^<]+)</loc>', sm) if '/bn' in m or 'bn' in m.split('/')[-1]]
for u in bn[:3]: t = get(u, 1500)
get('https://islamqa.info/bn/answers/178639', 200)
t = get('https://islamqa.info/bn/answers/178639', 0)
print('TITLE', re.findall(r'<title>([^<]*)</title>', t)[:1]); print('OG', re.findall(r'<meta[^>]+property="og:[^"]+"[^>]*>', t)[:6])
print('JSONLD', re.findall(r'<script type="application/ld\+json">(.{0,600})', t, re.S)[:2])
get('https://islamqa.info/bn/latest', 3000)
get('https://islamqa.info/api/', 500)
w = get('https://www.islamweb.net/sitemap.xml', 2500)
for m in re.findall(r'<loc>([^<]+)</loc>', w)[:60]: print('WSM', m)
get('https://www.islamweb.net/en/fatwa/', 1500)
get('https://www.islamweb.net/en/fatwa/rss', 1500)
