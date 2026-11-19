# Parses harvest/*.tsv|txt (collected from the YouTube channel pages) into data/videos.json
import json, re, datetime
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
TODAY = datetime.date(2026, 11, 19)

def approx(ago):
    m = re.search(r'(\d+)\s*(d|w|mo|y)\b', ago or '')
    if not m: return None
    n, u = int(m.group(1)), m.group(2)
    days = {'d': 1, 'w': 7, 'mo': 30, 'y': 365}[u] * n
    return (TODAY - datetime.timedelta(days=days)).isoformat()[:7]  # YYYY-MM (approximate)

def row(line):
    vid, rest = line.split('\t', 1)
    parts = [p.strip() for p in rest.split('¦')]
    title = parts[0]
    ago = next((p for p in parts[1:] if 'ago' in p), '')
    return vid.strip(), title, ago

videos = {}
def add(vid, title, ago, channel, kind):
    if not re.fullmatch(r'[\w-]{11}', vid or ''): return
    v = videos.setdefault(vid, {"id": vid, "title": title, "channel": channel, "kind": kind, "approx": approx(ago), "playlists": []})

for line in (ROOT/'harvest/yt-ibt.tsv').read_text().splitlines()[1:]:
    if '\t' in line: add(*row(line), 'ibt', 'video')

section = None; pl = None; playlists = []
for line in (ROOT/'harvest/yt-more.txt').read_text().splitlines():
    if line.startswith('#### '):
        section = line[5:].split(' ')[0] + ' ' + line[5:].split(' ')[1]; pl = None; continue
    if line.startswith('## '):
        pid, meta = line[3:].split('\t', 1)
        public = 'Unlisted' not in meta and 'Private' not in meta
        name = re.sub(r'^\d+ videos? ', '', meta)
        name = re.sub(r' Playlist.*$', '', name).strip()
        pl = {"id": pid, "name": name, "channel": 'kq' if section.startswith('KQ') else 'ibt', "public": public, "videos": []}
        playlists.append(pl); continue
    if pl is not None and section.endswith('PLAYLISTS') and line.strip() and not line.startswith('#'):
        pl["videos"] = [x for x in line.strip().split(',') if x]; continue
    if '\t' in line and section in ('KQ VIDEOS', 'IBT STREAMS'):
        vid, title, ago = row(line)
        add(vid, title, ago, 'kq' if section.startswith('KQ') else 'ibt', 'live' if 'STREAMS' in section else 'video')

pub = [p for p in playlists if p["public"] and len(p["videos"]) > 0]
for p in pub:
    for v in p["videos"]:
        if v in videos: videos[v]["playlists"].append(p["id"])
for p in pub:  # keep only videos we know are public
    p["videos"] = [v for v in p["videos"] if v in videos]
    del p["public"]
out = {"updated": TODAY.isoformat(), "note": "approx = month estimated from YouTube's relative date; new videos are added automatically with exact dates.",
       "channels": [{"id": "ibt", "channelId": "UCm8It2AWLRt3N22-fL89K_w", "name": "Imam Bukhari Trust", "url": "https://www.youtube.com/channel/UCm8It2AWLRt3N22-fL89K_w"},
                    {"id": "kq", "channelId": "UCBTHMWdAFuQ5ynEryDIWdRw", "name": "Kulliyatul Quran BD", "url": "https://www.youtube.com/@kulliyatulquranbd"}],
       "playlists": [p for p in pub if p["videos"]],
       "videos": sorted(videos.values(), key=lambda v: v["approx"] or '', reverse=True)}
(ROOT/'data/videos.json').write_text(json.dumps(out, ensure_ascii=False, indent=0))
print(len(out["videos"]), 'videos;', len(out["playlists"]), 'public playlists')
for p in out["playlists"]: print(' ', p["channel"], len(p["videos"]), p["name"])
