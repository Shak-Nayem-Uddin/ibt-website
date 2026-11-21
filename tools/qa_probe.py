import urllib.request, re, gzip
H = {'User-Agent': 'Mozilla/5.0 (compatible; IBT-site-index/1.0; +https://shak-nayem-uddin.github.io/ibt-website/)'}
def get(u, n=1500, hd=False):
    try:
        r = urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30); b = r.read()
        if b[:2] == b'\x1f\x8b': b = gzip.decompress(b)
        t = b.decode('utf-8', 'ignore'); print('\n=====', u, r.status, len(t))
        if hd: print('HEADERS', {k: v for k, v in r.headers.items() if k.lower() in ('x-frame-options', 'content-security-policy', 'access-control-allow-origin')})
        if n: print(t[:n])
        return t
    except Exception as e: print('\n=====', u, 'ERR', e); return ''
idx = get('https://islamqa.info/sitemaps/sitemap-index.xml', 800)
locs = re.findall(r'<loc>([^<]+)</loc>', idx); print(len(locs)); [print('L', l) for l in locs if 'bn' in l or 'en' in l][:0]
for l in locs: print('L', l)
bnl = [l for l in locs if '/bn' in l or '-bn' in l or '_bn' in l]
for l in bnl[:2]:
    t = get(l, 600); u = re.findall(r'<loc>([^<]+)</loc>', t); print('count', len(u), u[:5])
get('https://islamqa.info/bn/answers/178639', 0, True)
t = get('https://www.islamweb.net/en/fatwa/', 0, True)
links = sorted(set(re.findall(r'href="([^"]*fatwa[^"]*)"', t))); print(len(links)); [print('W', x) for x in links[:80]]
t = get('https://www.islamweb.net/en/fatwa/index', 0)
t2 = get('https://www.islamweb.net/en/fatwa/350000/', 0)
print('W title', re.findall(r'<title>([^<]*)</title>', t2)[:1], re.findall(r'<link rel="canonical"[^>]*>', t2)[:1])
t3 = get('https://www.islamweb.net/en/fatwa/?page=2', 0); print(len(set(re.findall(r'/en/fatwa/\d+', t3))))
