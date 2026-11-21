# Detects live / upcoming streams on the IBT YouTube channels and writes data/live.json.
# Runs on GitHub Actions every 10 minutes; standard library only. Writes only when the state changes.
import json, re, urllib.request
from pathlib import Path
from datetime import datetime, timezone
ROOT = Path(__file__).resolve().parent.parent
chans = json.loads((ROOT / 'data' / 'videos.json').read_text())['channels']
out = []
for ch in chans:
    url = 'https://www.youtube.com/channel/%s/live' % ch['channelId']
    try:
        html = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en'}), timeout=30).read().decode('utf-8', 'ignore')
    except Exception as e:
        print('fetch failed', ch['id'], e); continue
    m = re.search(r'<link rel="canonical" href="https://www\.youtube\.com/watch\?v=([\w-]{11})"', html)
    if not m: continue
    vid = m.group(1)
    live = '"isLiveNow":true' in html or '"isLive":true' in html
    upcoming = '"isUpcoming":true' in html
    t = re.search(r'<meta name="title" content="([^"]*)"', html)
    st = re.search(r'"scheduledStartTime":"(\d+)"', html)
    if live or upcoming:
        out.append({'channel': ch['id'], 'videoId': vid, 'title': (t.group(1) if t else '').replace('&amp;', '&').replace('&quot;', '"'), 'status': 'live' if live else 'upcoming',
                    'start': datetime.fromtimestamp(int(st.group(1)), timezone.utc).isoformat() if st else ''})
P = ROOT / 'data' / 'live.json'
old = json.loads(P.read_text()) if P.exists() else {}
if old.get('items') != out:
    P.write_text(json.dumps({'checked': datetime.now(timezone.utc).isoformat(timespec='minutes'), 'items': out}, ensure_ascii=False, indent=1))
    print('changed', out)
else:
    print('unchanged', out)
