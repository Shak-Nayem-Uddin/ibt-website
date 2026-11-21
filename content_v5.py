# v5: campus master plan (Master Plan, Imam Bukhari Trust, New Dhaka City, 21 Nov 2026) for the 3D model.
import json as _json
_plots = _json.load(open("tools/masterplan_plots.json"))
_S, _CX, _CY = 6.0, 306.0, 318.0
def _w(p):  # page rect (x, y, w, h in pt) -> world box (center x, center z, size x, size z)
    x, y, w, h = p
    return [round((y + h / 2 - _CY) / _S, 2), round((x + w / 2 - _CX) / _S, 2), round(h / _S, 2), round(w / _S, 2)]
def _find(pt):
    x, y = pt
    c = [p for p in _plots if p[0] <= x <= p[0] + p[2] and p[1] <= y <= p[1] + p[3]]
    return min(c, key=lambda p: p[2] * p[3])
_L = {"masjid": (260, 189), "playground": (300, 257), "taibah": (286, 107), "girls_hostel": (331, 70), "girls_madrasha": (331, 91), "girls_school": (331, 118),
      "teachers_tower": (331, 137), "english_school": (403, 475), "tti": (403, 502), "research": (403, 529), "bangla_school": (403, 561),
      "senior_youth": (333, 473), "museum": (331, 492), "boys_hostel": (331, 512)}
_used = set()
def _part(key, **kw):
    p = _find(_L[key]); _used.add(tuple(p)); b = _w(p)
    d = {"key": key, "x": b[0], "z": b[1], "w": b[2], "d": b[3]}; d.update(kw); return d
_mb = _find(_L["masjid"]); _used.add(tuple(_mb))
_mx, _my, _mw, _mh = _mb
_half = _mw / 2
def _box(x, y, w, h, **kw):
    b = _w([x, y, w, h]); d = {"x": b[0], "z": b[1], "w": round(b[2] * 0.82, 2), "d": round(b[3] * 0.82, 2)}; d.update(kw); return d
_ctx = []
for i, p in enumerate(_plots):
    if tuple(p) in _used: continue
    if p[1] < 8 or p[1] + p[3] > 640: continue
    b = _w(p)
    if b[2] * b[3] > 120: continue
    _ctx.append(b + [2 + (i * 7919) % 4])
N = lambda bn, en, ar: T(bn, en, ar)
C["masterplan"] = {
    "source": T("মাস্টারপ্ল্যান: ইমাম বুখারী ট্রাস্ট, নিউ ঢাকা সিটি (২১ নভেম্বর ২০২৬)। ভবনের উচ্চতা ও আকৃতি আনুমানিক।", "Master plan: Imam Bukhari Trust, New Dhaka City (21 Nov 2026). Building heights and forms are indicative.", "المخطط العام: وقف الإمام البخاري، مدينة دكا الجديدة (21 نوفمبر 2026). الارتفاعات والأشكال تقريبية."),
    "context": _ctx,
    "groups": [
        {"id": "masjid-complex", "parts": [_box(_mx, _my, _half, _mh, key="masjid", kind="masjid", status="mosque", name=N("মাসজিদ", "Masjid", "المسجد"))]},
        {"id": "academic-1", "parts": [_box(_mx + _half, _my, _half, _mh, key="academic", status="academic", name=N("একাডেমিক ভবন", "Academic Building", "المبنى الأكاديمي")),
                                         _part("playground", kind="ground", name=N("খেলার মাঠ", "Playground", "الملعب")),
                                         _part("research", ghostFloors=5, name=N("সায়েন্টিফিক রিসার্চ সেন্টার", "Scientific Research Center", "مركز البحث العلمي"))]},
        {"id": "academic-2", "parts": [_part("girls_hostel", ghostFloors=7, name=N("ছাত্রী হোস্টেল", "Girls' hostel", "سكن الطالبات")),
                                         _part("girls_madrasha", ghostFloors=6, name=N("গার্লস মাদরাসা", "Girls' madrasah", "مدرسة البنات")),
                                         _part("girls_school", ghostFloors=5, name=N("গার্লস স্কুল", "Girls' school", "مدرسة البنات النظامية")),
                                         _part("tti", ghostFloors=6, name=N("টিচার্স ট্রেনিং ইনস্টিটিউট", "Teachers Training Institute", "معهد تدريب المعلمين"))]},
        {"id": "academic-3", "parts": [_part("teachers_tower", ghostFloors=10, kind="tower", name=N("টিচার্স টাওয়ার", "Teachers' Tower", "برج المعلمين")),
                                         _part("boys_hostel", ghostFloors=7, name=N("ছাত্র হোস্টেল", "Boys' hostel", "سكن الطلاب")),
                                         _part("english_school", ghostFloors=6, name=N("ইংলিশ মিডিয়াম স্কুল", "English Medium School", "مدرسة بالإنجليزية")),
                                         _part("bangla_school", ghostFloors=6, name=N("বাংলা মিডিয়াম স্কুল", "Bangla Medium School", "مدرسة بالبنغالية")),
                                         _part("senior_youth", ghostFloors=4, name=N("সিনিয়র সিটিজেন ও ইয়ুথ ক্লাব", "Senior Citizens' & Youth Club", "نادي كبار السن والشباب"))]},
        {"id": "taibah-tower", "parts": [_part("taibah", ghostFloors=15, kind="tower", name=N("তাইবাহ একাডেমিক টাওয়ার", "Taibah Academic Tower", "برج طيبة الأكاديمي")),
                                           _part("museum", ghostFloors=4, name=N("ইসলামিক মিউজিয়াম", "Islamic Museum", "المتحف الإسلامي"))]}]}
for b in C["future"]["buildings"]:
    if b["id"] == "academic-3" and not any(i["icon"] == "school" and "Bangla" in i["name"]["en"] for i in b["items"]):
        b["items"].insert(2, {"name": T("বাংলা মিডিয়াম স্কুল", "Bangla Medium School", "مدرسة بالبنغالية"), "icon": "school"})
    if b["id"] == "academic-1":
        b["items"][0] = {"name": T("সায়েন্টিফিক রিসার্চ সেন্টার", "Scientific Research Center", "مركز البحث العلمي"), "icon": "research"}
        b["items"].append({"name": T("খেলার মাঠ", "Playground", "الملعب"), "icon": "youth"})
