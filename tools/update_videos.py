# Adds newly published YouTube videos (from the channels' public RSS feeds) to data/videos.json.
# Runs on GitHub Actions on a schedule; standard library only.
import json, urllib.request, xml.etree.ElementTree as ET
from pathlib import Path
from datetime import datetime, timezone
P = Path(__file__).resolve().parent.parent / 'data' / 'videos.json'
NS = {'a': 'http://www.w3.org/2005/Atom', 'yt': 'http://www.youtube.com/xml/schemas/2015', 'media': 'http://search.yahoo.com/mrss/'}
data = json.loads(P.read_text())
known = {v['id']: v for v in data['videos']}
added = 0
for ch in data['channels']:
    url = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + ch['channelId']
    try:
        xml = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30).read()
    except Exception as e:
        print('feed failed', ch['id'], e); continue
    for e in ET.fromstring(xml).findall('a:entry', NS):
        vid = e.findtext('yt:videoId', namespaces=NS)
        title = e.findtext('a:title', namespaces=NS)
        pub = (e.findtext('a:published', namespaces=NS) or '')[:10]
        link = (e.find('a:link', NS).get('href') if e.find('a:link', NS) is not None else '')
        if '/shorts/' in link: continue
        if vid in known:
            v = known[vid]
            if pub and not v.get('date'): v['date'] = pub
            if title and v.get('title') != title: v['title'] = title
            continue
        v = {'id': vid, 'title': title, 'channel': ch['id'], 'kind': 'video', 'date': pub, 'approx': pub[:7], 'playlists': []}
        data['videos'].insert(0, v); known[vid] = v; added += 1
data['videos'].sort(key=lambda v: v.get('date') or v.get('approx') or '', reverse=True)
data['updated'] = datetime.now(timezone.utc).date().isoformat()
P.write_text(json.dumps(data, ensure_ascii=False, indent=0))
print('added', added)

# Curated playlists (Q&A series, documentaries): add new items from each playlist's feed.
import re as _re
PP = P.parent / 'playlists.json'
if PP.exists():
    pls = json.loads(PP.read_text())
    padded = 0
    for key, pl in pls['lists'].items():
        try:
            xml = urllib.request.urlopen(urllib.request.Request('https://www.youtube.com/feeds/videos.xml?playlist_id=' + pl['id'], headers={'User-Agent': 'Mozilla/5.0'}), timeout=30).read()
        except Exception as e:
            print('playlist feed failed', key, e); continue
        have = {v['id']: v for v in pl['items']}
        for e in ET.fromstring(xml).findall('a:entry', NS):
            vid = e.findtext('yt:videoId', namespaces=NS); title = (e.findtext('a:title', namespaces=NS) or '').strip()
            pub = (e.findtext('a:published', namespaces=NS) or '')[:10]
            if not vid: continue
            if vid in have:
                if title: have[vid]['title'] = _re.sub(r'\s+', ' ', title)
                continue
            it = {'id': vid, 'title': _re.sub(r'\s+', ' ', title), 'date': pub, 'len': ''}
            if key == 'ask':
                m = _re.search(r'Episode\D*(\d+)', title); it['ep'] = int(m.group(1)) if m else None
            pl['items'].append(it); have[vid] = it; padded += 1
        if key == 'ask': pl['items'].sort(key=lambda v: -(v.get('ep') or 0))
        else: pl['items'].sort(key=lambda v: v.get('date') or '', reverse=True)
    if padded:
        pls['updated'] = datetime.now(timezone.utc).date().isoformat()
        PP.write_text(json.dumps(pls, ensure_ascii=False, indent=0))
    print('playlist items added', padded)
