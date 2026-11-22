# v10 (22 Nov 2026): basement dropped from the masjid and academic designs (management instruction, 22 Nov 2026);
# masjid and academic building swap places in the campus layout; visitor-facing editorial notes removed.
import re as _re
_SUBS = [(r"বি\+জি\+", "জি+"), (r"B\+G\+", "G+"), (r"قبو\+أرضي\+", "أرضي+"),
         (r",? ?প্রায় [০-৯,]+ বর্গফুট", ""), (r",? ?মোট নামাজের স্থান [০-৯,]+ বর্গফুট", ""),
         (r",? about [\d,]+ sq ft", ""), (r",? with [\d,]+ sq ft of prayer space", ""),
         (r" بنحو [\d,]+ قدمًا مربعًا", ""), (r" ومساحة صلاة [\d,]+ قدمًا مربعًا", "")]
def _nb(o):
    if isinstance(o, dict): return {k: _nb(v) for k, v in o.items()}
    if isinstance(o, list): return [_nb(v) for v in o]
    if isinstance(o, str):
        for a, b in _SUBS: o = _re.sub(a, b, o)
        return o
    return o
for _k in ("projects", "funds", "future", "stories"):
    if _k in C: C[_k] = _nb(C[_k])
C["floors"]["specs"] = {"mosque": T("জি+৫ · ৬ তলা", "G+5 · 6 floors", "أرضي+5 · 6 طوابق"),
                        "academic": T("জি+৯ · ১০ তলা · ৭০টি শ্রেণিকক্ষ · ২,১০০ শিক্ষার্থী", "G+9 · 10 floors · 70 classrooms · 2,100 students", "أرضي+9 · 10 طوابق · 70 فصلًا · 2,100 طالب")}
# masjid: the lowest listed level was the basement -> removed; the two cast slabs stay the two lowest floors
_M = C["floors"]["mosque"]
if len(_M) == 8:
    _st = [f["status"] for f in _M]
    del _M[1]
    for _i, _f in enumerate(_M): _f["status"] = _st[_i] if _i < 3 else "planned"
_ORD = [("১ম", "1st", "الأول"), ("২য়", "2nd", "الثاني"), ("৩য়", "3rd", "الثالث"), ("৪র্থ", "4th", "الرابع"), ("৫ম", "5th", "الخامس"), ("৬ষ্ঠ", "6th", "السادس")]
for _f in _M[1:3]: _f["note"] = T("ছাদ ঢালাই সম্পন্ন", "Roof slab cast", "تم صب السقف")
for _f in _M[3:]: _f.pop("note", None)
for _i, _f in enumerate(_M[1:]):
    b, e, a = _ORD[_i]; _f["label"] = T(b + " তলা", e + " floor", "الطابق " + a)
for _m in C.get("milestones", []):
    if _m["text"]["en"].startswith("Masjid: 3rd to"): _m["text"] = T("মাসজিদ: ৩য় থেকে ৬ষ্ঠ তলা", "Masjid: 3rd to 6th floors", "المسجد: الطوابق 3–6")
# campus layout: masjid and academic building exchange positions
_g = {g["id"]: g for g in C["masterplan"]["groups"]}
_pm = _g["masjid-complex"]["parts"][0]; _pa = [p for p in _g["academic-1"]["parts"] if p.get("status") == "academic"][0]
if _pm["z"] < _pa["z"]: _pm["z"], _pa["z"] = _pa["z"], _pm["z"]
# visitor-facing notes that serve editors, not visitors
C["future"]["note"] = T("", "", "")
for _b in C["future"]["buildings"]: _b["illustrative"] = False
C["home"]["factsSource"] = T("", "", "")
for _r in C.get("registrations", []):
    if _r.get("id") == "teachers-training":
        _r["text"] = T("কুল্লিয়াতুল কুরআনের শিক্ষক প্রশিক্ষণ কার্যক্রম। পরবর্তী ব্যাচের তারিখ ঘোষণা করা হলে এখানে জানানো হবে।",
                       "Kulliyatul Quran's teacher training programme. Dates for the next batch will be announced here.",
                       "برنامج تدريب المعلمين في كلية القرآن. يُعلن هنا عن مواعيد الدفعة القادمة.")
C["floors"]["note"] = T("", "", "")
C["ui"]["send_ready"] = T("আপনার তথ্য প্রস্তুত। পাঠানো সম্পন্ন করতে নিচের “ইমেইলে পাঠান” বোতাম চাপুন, অথবা ফোনে যোগাযোগ করুন।",
                          "Your details are ready. Press “Send by email” below to complete sending, or call us.",
                          "بياناتك جاهزة. اضغط «أرسل بالبريد» أدناه لإتمام الإرسال، أو اتصل بنا.")
C["ui"]["nav_all_inst"] = T("সকল প্রতিষ্ঠান", "All institutions", "كل المؤسسات")
C["ui"]["nav_join"] = T("আইবিটি পরিবারে যুক্ত হোন", "Join the IBT family", "انضم إلى أسرة الوقف")
