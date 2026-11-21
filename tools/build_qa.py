# Builds data/qa.json: a searchable index of question TITLES + links (no answer text) from
#   IslamQA (Bangla + English answers, via their public sitemaps) and Islamweb (English fatwas, via list pages).
# Answers stay on the source sites; the IBT page links to them. Runs on GitHub Actions, incremental and polite.
import json, re, time, gzip, html, urllib.request, concurrent.futures as cf
from pathlib import Path
from datetime import datetime, timezone
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'data' / 'qa.json'; STATE = ROOT / 'tools' / 'qa_state.json'
H = {'User-Agent': 'Mozilla/5.0 (compatible; IBT-website-index/1.0; +https://shak-nayem-uddin.github.io/ibt-website/)'}
T0 = time.time(); BUDGET = 32 * 60  # seconds per run

def get(u, limit=None):
    r = urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=40)
    b = r.read(limit) if limit else r.read(); r.close()
    if b[:2] == b'\x1f\x8b': b = gzip.decompress(b)
    return b.decode('utf-8', 'ignore')

db = json.loads(OUT.read_text()) if OUT.exists() else {'items': []}
state = json.loads(STATE.read_text()) if STATE.exists() else {}
have = {(i[0], str(i[1])): i for i in db['items']}
state.setdefault('missing', {}); state.setdefault('iw_page', 1); state.setdefault('iw_done', False)

# ---- IslamQA: sitemap → ids, then fetch only the <head> of new pages for the title ----
def sitemap_ids(lang):
    ids, order = [], []
    for n in range(1, 6):
        try: x = get('https://islamqa.info/sitemaps/%s/answers/%d/sitemap.xml' % (lang, n))
        except Exception: break
        for m in re.finditer(r'<loc>https://islamqa\.info/%s/answers/(\d+)</loc>\s*<lastmod>([^<]*)</lastmod>' % lang, x): ids.append((m.group(1), m.group(2)))
    return ids
def iqa_title(lang, i):
    t = get('https://islamqa.info/%s/answers/%s' % (lang, i), 90000)
    m = re.search(r'"@type":"Question","name":"((?:[^"\\]|\\.)*)"', t)
    if m: return json.loads('"' + m.group(1) + '"').strip()
    m = re.search(r'<meta property="og:title" content="([^"]*)"', t) or re.search(r'<title>([^<]*)</title>', t)
    return html.unescape(m.group(1)).split(' - ')[0].strip() if m else ''
featured = []
for lang in ['bn', 'en']:
    src = 'iqa-' + lang
    try: ids = sitemap_ids(lang)
    except Exception as e: print('sitemap fail', lang, e); continue
    print(src, 'sitemap', len(ids))
    if lang == 'bn': featured = [i for i, _ in sorted(ids, key=lambda x: x[1], reverse=True)[:40]]
    todo = [i for i, _ in ids if (src, i) not in have and state['missing'].get(src + i, 0) < 3]
    print(src, 'to fetch', len(todo))
    def job(i):
        try: return i, iqa_title(lang, i)
        except Exception as e: return i, None
    with cf.ThreadPoolExecutor(4) as ex:
        futs = []
        for i in todo:
            if time.time() - T0 > BUDGET * (0.55 if lang == 'bn' else 0.8): break
            futs.append(ex.submit(job, i))
            if len(futs) >= 8:
                for f in futs:
                    i2, t = f.result()
                    if t: have[(src, i2)] = [src, int(i2), t]
                    else: state['missing'][src + i2] = state['missing'].get(src + i2, 0) + 1
                futs = []; time.sleep(0.4)
        for f in futs:
            i2, t = f.result()
            if t: have[(src, i2)] = [src, int(i2), t]
    print(src, 'now', sum(1 for k in have if k[0] == src))

# ---- Islamweb English: fatwa list pages give id + English slug (title) ----
def slug_title(s): return re.sub(r'\s+', ' ', s.replace('-', ' ')).strip()
page = 1 if state['iw_done'] else state['iw_page']; empty = 0
while time.time() - T0 < BUDGET and page < 4000:
    try: t = get('https://www.islamweb.net/en/fatwa/?page=%d' % page)
    except Exception as e: print('iw fail', page, e); break
    found = re.findall(r'href="(?:https://www\.islamweb\.net)?/(?:en|ar)/fatwa/(\d+)/([^"/?#]+)"', t)
    new = 0
    for i, slug in found:
        if ('iw-en', i) not in have: have[('iw-en', i)] = ['iw-en', int(i), slug_title(html.unescape(slug)), slug]; new += 1
    if not found: empty += 1
    if empty >= 3: state['iw_done'] = True; state['iw_page'] = 1; break
    if state['iw_done'] and new == 0 and page > 3: break  # caught up with new fatwas
    page += 1; state['iw_page'] = page; time.sleep(0.6)
print('iw-en now', sum(1 for k in have if k[0] == 'iw-en'), 'page', page)

items = sorted(have.values(), key=lambda x: ({'iqa-bn': 0, 'iqa-en': 1, 'iw-en': 2}.get(x[0], 9), -x[1]))
fe = [have[('iqa-bn', i)] for i in featured if ('iqa-bn', i) in have]
counts = {}
for x in items: counts[x[0]] = counts.get(x[0], 0) + 1
OUT.write_text(json.dumps({'updated': datetime.now(timezone.utc).isoformat(timespec='minutes'), 'counts': counts, 'items': items, 'featured': fe}, ensure_ascii=False, separators=(',', ':')))
STATE.write_text(json.dumps(state))
print('done', counts, int(time.time() - T0), 's')
