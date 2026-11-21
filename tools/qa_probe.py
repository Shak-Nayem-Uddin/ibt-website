import urllib.request, re
H = {'User-Agent': 'Mozilla/5.0 (compatible; IBT-site-index/1.0)'}
def get(u):
    try: return urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30).read().decode('utf-8', 'ignore')
    except Exception as e: print('ERR', u, e); return ''
t = get('https://www.islamweb.net/en/fatwa/')
hrefs = sorted(set(re.findall(r'href="([^"]+)"', t)))
for x in hrefs:
    if not re.search(r'/fatwa/\d+/', x): print('H', x)
for u in ['https://www.islamweb.net/en/fatwa/index/', 'https://www.islamweb.net/en/fatwa/index/?pageno=2', 'https://www.islamweb.net/en/fatwa/?pageno=2', 'https://www.islamweb.net/en/fatwa/?page=2', 'https://www.islamweb.net/en/fatwa/?start=20']:
    t = get(u); ids = re.findall(r'/fatwa/(\d+)/', t); print('U', u, len(t), len(set(ids)), ids[:6])
    for x in sorted(set(re.findall(r'href="([^"]*(?:page|start|index|cat|topic)[^"]*)"', t)))[:25]: print('   ', x)
