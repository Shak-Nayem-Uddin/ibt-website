# v13 (23 Nov 2026): master plan changes marked by IBT management (names on roofs, masjid 6 floors,
# every other building 10 floors, re-assigned blocks), future-project lists as supplied by IBT,
# catalogues 2024/2025/2026, Google Form for questions, office map, verified Qur'an verses and hadith.
import json as _json
U = C["ui"]

# ---------- master plan ----------
_mp = C["masterplan"]; _g = {g["id"]: g for g in _mp["groups"]}
def _part(gid, key): return [p for p in _g[gid]["parts"] if p["key"] == key][0]
_m = _part("masjid-complex", "masjid"); _m["name"] = T("ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স", "Imam Bukhari Jame Masjid Complex", "مجمع جامع الإمام البخاري")
_a = _part("academic-1", "academic"); _a["name"] = T("আইবিটি একাডেমিক কমপ্লেক্স", "IBT Academic Complex", "المجمع الأكاديمي للوقف")
# left cluster (per the marked-up master plan)
_gh = _part("academic-2", "girls_hostel")   # bottom plot + the plot above it: one 10-storey building
_gh.update({"key": "mm_girls", "x": -41.06, "z": 6.24, "w": 3.72, "d": 10.08,
            "name": T("মডেল মাদরাসা গার্লস সেকশন", "Model Madrasah Girls' Section", "المدرسة النموذجية قسم البنات")})
_part("academic-2", "girls_madrasha").update({"key": "girls_hostel", "name": T("গার্লস হোস্টেল", "Girls' Hostel", "سكن الطالبات")})
_part("academic-2", "girls_school").update({"key": "kq_girls", "name": T("কুল্লিয়াতুল কুরআন গার্লস সেকশন", "Kulliyatul Quran Girls' Section", "كلية القرآن قسم البنات")})
_tt = _part("academic-3", "teachers_tower"); _tt.update({"key": "dormitory", "name": T("শিক্ষক ডরমিটরি", "Teachers' Dormitory", "سكن المعلمين")}); _tt.pop("kind", None)
_part("academic-3", "english_school")["name"] = T("ইসলামিক স্কুল (ইংলিশ মিডিয়াম)", "Islamic School (English Medium)", "مدرسة إسلامية (إنجليزية)")
_part("academic-3", "bangla_school")["name"] = T("ইসলামিক স্কুল (এনসিটিবি)", "Islamic School (NCTB)", "مدرسة إسلامية (المنهج الوطني)")
_part("academic-3", "boys_hostel")["name"] = T("ছাত্র হোস্টেল", "Boys' Hostel", "سكن الطلاب")
# Taibah Academic Tower moves to the marked block (upper plot's right part + the two plots below it)
_part("taibah-tower", "taibah").update({"x": -30.56, "z": -5.99, "w": 6.36, "d": 10.08})
# every building except the masjid: 10 storeys
for _gp in _mp["groups"]:
    for _p in _gp["parts"]:
        if _p.get("kind") != "ground" and _p.get("status") not in ("mosque", "academic"): _p["ghostFloors"] = 10
# neighbouring plots now taken by the re-assigned buildings
def _overlap(c):
    for _gp in _mp["groups"]:
        for _p in _gp["parts"]:
            if _p.get("kind") == "ground": continue
            if abs(c[0] - _p["x"]) < (c[2] + _p["w"]) / 2 - 0.3 and abs(c[1] - _p["z"]) < (c[3] + _p["d"]) / 2 - 0.3: return True
    return False
_mp["context"] = [c for c in _mp["context"] if not _overlap(c)]
_mp["source"] = T("মাস্টারপ্ল্যান: ইমাম বুখারী ট্রাস্ট, নিউ ঢাকা সিটি (২৩ নভেম্বর ২০২৬ সংশোধিত)। মাসজিদ ৬ তলা, অন্য সব ভবন ১০ তলা; আকৃতি আনুমানিক।",
                  "Master plan: Imam Bukhari Trust, New Dhaka City (revised 23 Nov 2026). Masjid 6 storeys, every other building 10 storeys; forms are indicative.",
                  "المخطط العام: وقف الإمام البخاري، مدينة دكا الجديدة (مراجعة 23 نوفمبر 2026). المسجد 6 طوابق وسائر المباني 10 طوابق؛ الأشكال تقريبية.")

# ---------- future projects (list supplied by IBT, 23 Nov 2026) ----------
def _it(bn, en, ar, ic): return {"name": T(bn, en, ar), "icon": ic}
_fb = {b["id"]: b for b in C["future"]["buildings"]}
C["future"]["title"] = T("আইবিটি ভবিষ্যৎ প্রকল্প", "IBT Future Projects", "مشاريع الوقف المستقبلية")
_fb["masjid-complex"]["items"] = [
    _it("দাওয়াহ ও রিসার্চ সেন্টার", "Dawah & Research Center", "مركز الدعوة والبحث", "dawah"),
    _it("ইমাম বুখারী কেন্দ্রীয় লাইব্রেরি", "Imam Bukhari Central Library", "مكتبة الإمام البخاري المركزية", "library"),
    _it("সকাল ও সন্ধ্যার মক্তব", "Morning & Evening Moktob", "الكتّاب الصباحي والمسائي", "maktab"),
    _it("তাহফিযুল কুরআন মাদরাসা", "Tahfizul Quran Madrasah", "مدرسة تحفيظ القرآن", "quran"),
    _it("আইবিটি ডিজিটাল স্টুডিও", "IBT Digital Studio", "الاستوديو الرقمي للوقف", "studio")]
_fb["academic-1"]["name"] = T("একাডেমিক কমপ্লেক্স ১ (আইবিটি একাডেমিক কমপ্লেক্স)", "Academic Complex 1 (IBT Academic Complex)", "المجمع الأكاديمي 1")
_fb["academic-1"]["items"] = [
    _it("সায়েন্টিফিক রিসার্চ সেন্টার", "Scientific Research Center", "مركز البحث العلمي", "research"),
    _it("সেমিনার হল", "Seminar Hall", "قاعة الندوات", "seminar"),
    _it("কুল্লিয়াতুল কুরআনিল কারীম ওয়াদ-দিরাসাতিল ইসলামিয়্যাহ (বিএ, এমএ)", "Kulliyatul Quranil Kareem Waddirasatil Islamiyah (BA, MA)", "كلية القرآن الكريم والدراسات الإسلامية (بكالوريوس، ماجستير)", "education"),
    _it("আরবি ভাষা ইনস্টিটিউট", "Arabic Language Institute", "معهد اللغة العربية", "arabic"),
    _it("কুল্লিয়াতুল কুরআন মডেল মাদরাসা", "Kulliyatul Quran Model Madrasah", "مدرسة كلية القرآن النموذجية", "school"),
    _it("কুল্লিয়াতুল কুরআন আফটার স্কুল", "Kulliyatul Quran After School", "برنامج كلية القرآن بعد المدرسة", "clock")]
_fb["academic-2"]["items"] = [
    _it("কুল্লিয়াতুল কুরআন মডেল মাদরাসা (গার্লস সেকশন)", "Kulliyatul Quran Model Madrasah (Girls' Section)", "مدرسة كلية القرآن النموذجية (قسم البنات)", "school"),
    _it("কুল্লিয়াতুল কুরআন গার্লস হায়ার সেকশন (ইসলামী আরবি বিশ্ববিদ্যালয়ের অধিভুক্ত হবে)", "Kulliyatul Quran Girls' Higher Section (to be affiliated with the Islamic Arabic University)", "القسم العالي للبنات (سيُلحق بالجامعة الإسلامية العربية)", "education"),
    _it("টিচার্স ট্রেনিং ইনস্টিটিউট", "Teachers Training Institute", "معهد تدريب المعلمين", "teacher"),
    _it("গার্লস হোস্টেল", "Girls' Hostel", "سكن الطالبات", "hostel")]
_fb["academic-3"]["items"] = [
    _it("ছাত্র হোস্টেল", "Boys' Hostel", "سكن الطلاب", "hostel"),
    _it("ইসলামিক স্কুল (ইংলিশ মিডিয়াম)", "Islamic School (English Medium)", "مدرسة إسلامية (إنجليزية)", "school"),
    _it("ইসলামিক স্কুল (এনসিটিবি)", "Islamic School (NCTB)", "مدرسة إسلامية (المنهج الوطني)", "school"),
    _it("ইয়ুথ ইসলামিক ক্লাব", "Youth Islamic Club", "النادي الإسلامي للشباب", "youth"),
    _it("সিনিয়র সিটিজেন ক্লাব", "Senior Citizen Club", "نادي كبار السن", "senior"),
    _it("সিনিয়র সিটিজেন হাউস", "Senior Citizen House", "دار كبار السن", "home"),
    _it("শিক্ষক ডরমিটরি", "Teachers' Dormitory", "سكن المعلمين", "hostel")]
_fb["taibah-tower"]["items"] = [
    _it("তাইবাহ একাডেমি", "Taibah Academy", "أكاديمية طيبة", "education"),
    _it("তাইবাহ পাবলিশার", "Taibah Publisher", "دار طيبة للنشر", "book"),
    _it("তাইবাহ আইটি", "Taibah IT", "طيبة لتقنية المعلومات", "code"),
    _it("ইসলামিক মিউজিয়াম", "Islamic Museum", "المتحف الإسلامي", "museum")]

# ---------- catalogues ----------
C["reports"] = [
  {"title": T("ইমাম বুখারী ট্রাস্ট ক্যাটালগ ২০২৬", "Imam Bukhari Trust Catalogue 2026", "كتيّب وقف الإمام البخاري 2026"), "type": "publication", "year": "2026", "url": "files/IBT_Catalog_2026.pdf", "cover": "img/catalog-2026.webp", "pages": 16, "size": "13.5 MB"},
  {"title": T("ইমাম বুখারী ট্রাস্ট ক্যাটালগ ২০২৫", "Imam Bukhari Trust Catalogue 2025", "كتيّب وقف الإمام البخاري 2025"), "type": "publication", "year": "2025", "url": "files/IBT_Catalog_2025.pdf", "cover": "img/catalog-2025.webp", "pages": 12, "size": "12.9 MB"},
  {"title": T("ইমাম বুখারী ট্রাস্ট ক্যাটালগ ২০২৪", "Imam Bukhari Trust Catalogue 2024", "كتيّب وقف الإمام البخاري 2024"), "type": "publication", "year": "2024", "url": "files/IBT_Catalog_2024.pdf", "cover": "img/catalog-2024.webp", "pages": 6, "size": "2.2 MB"}]
for _y in ("2024", "2025"):
    if not any(d.get("file") == "files/IBT_Catalog_%s.pdf" % _y for d in C.get("transparencyDocs", [])):
        C["transparencyDocs"].insert(1, {"title": T("ইমাম বুখারী ট্রাস্ট ক্যাটালগ " + {"2025": "২০২৫", "2024": "২০২৪"}[_y], "Imam Bukhari Trust Catalogue " + _y, "كتيّب وقف الإمام البخاري " + _y),
                                         "file": "files/IBT_Catalog_%s.pdf" % _y, "cat": "annual", "status": "available", "period": _y})

# ---------- links ----------
C["settings"]["askForm"] = "https://forms.gle/VQqVhNxSZoJL5nFG9"
C["settings"]["officeMapQuery"] = "House 17, Road 6/A, Sector 5, Uttara, Dhaka 1230, Bangladesh"
U["nav_campus"] = T("মাসজিদ ও একাডেমিক ক্যাম্পাস (চলমান)", "Masjid & academic campus (ongoing)", "المسجد والحرم الأكاديمي (جارٍ)")
U["nav_model_village"] = T("মডেল ভিলেজ (প্রস্তাবিত)", "Model Village (proposed)", "القرية النموذجية (مقترح)")
U["ask_form_title"] = T("আমাদের আলেমদের প্রশ্ন করুন", "Ask our scholars", "اسأل علماءنا")
U["ask_form_text"] = T("আপনার প্রশ্নটি নিম্নের ফর্মটিতে লিখে পাঠান।", "Write your question in the form below and send it.", "اكتب سؤالك في النموذج أدناه وأرسله.")
U["ask_form_btn"] = T("প্রশ্ন পাঠানোর ফর্ম", "Open the question form", "نموذج إرسال السؤال")

# ---------- Qur'an and hadith (Arabic copied from quran.com API / sunnah.com) ----------
_V = _json.load(open("data/verses_src.json", encoding="utf-8"))
_Q, _H = _V["Q"], _V["H"]
def _cut(s, i=0, j=None):
    # whole words i..j-1 of the source text, so the Arabic is never retyped
    w = s.split(); return " ".join(w[i:j]).rstrip("،,")
def _q(key, ar, bn, en, sbn, sen, sar, part=False):
    n = key.split(":")
    return {"type": "quran", "ar": ar.strip(), "part": part, "tr": T(bn, en, ""), "ref": T("সূরা %s %s" % (sbn, key.translate(str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯"))), "%s %s" % (sen, key), "سورة %s %s" % (sar, key))}
def _h(ar, bn, en, rbn, ren, rar, part=False):
    return {"type": "hadith", "ar": ar, "part": part, "tr": T(bn, en, ""), "ref": T(rbn, ren, rar)}
_q918 = _Q["9:18"]["ar"]; _q5811 = _Q["58:11"]["ar"]; _q16125 = _Q["16:125"]["ar"]; _q2261 = _Q["2:261"]["ar"]
_q52 = _Q["5:2"]["ar"]; _q1643 = _Q["16:43"]["ar"]; _q20114 = _Q["20:114"]["ar"]; _q2110 = _Q["2:110"]["ar"]
C["verses"] = {
  "q_masjid": _q("9:18", _cut(_q918, 0, 9), "তারাই তো আল্লাহ্‌র মসজিদের আবাদ করবে, যারা ঈমান আনে আল্লাহ্‌ ও শেষ দিনের প্রতি …", "The mosques of Allāh are only to be maintained by those who believe in Allāh and the Last Day …", "আত-তাওবাহ", "At-Tawbah", "التوبة", True),
  "q_read": _q("96:1", _Q["96:1"]["ar"], "পড়ুন আপনার রবের নামে, যিনি সৃষ্টি করেছেন।", "Recite in the name of your Lord who created.", "আল-আলাক", "Al-ʿAlaq", "العلق"),
  "q_knowledge": _q("58:11", _cut(_q5811, 18, 27), "তোমাদের মধ্যে যারা ঈমান এনেছে এবং যাদেরকে জ্ঞান দান করা হয়েছে আল্লাহ্‌ তাদেরকে মর্যাদায় উন্নত করবেন।", "Allāh will raise those who have believed among you and those who were given knowledge, by degrees.", "আল-মুজাদালাহ", "Al-Mujādilah", "المجادلة", True),
  "q_dawah": _q("16:125", _cut(_q16125, 0, 7), "আপনি মানুষকে দা’ওয়াত দিন আপনার রবের পথে হিকমত ও সদুপদেশ দ্বারা।", "Invite to the way of your Lord with wisdom and good instruction.", "আন-নাহল", "An-Naḥl", "النحل", True),
  "q_spend": _q("2:261", _cut(_q2261, 0, 17), "যারা নিজেদের ধন সম্পদ আল্লাহ্‌র পথে ব্যয় করে তাদের উপমা একটি বীজের মত, যা সাতটি শীষ উৎপাদন করে, প্রত্যেক শীষে একশ শস্যদানা।", "The example of those who spend their wealth in the way of Allāh is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains.", "আল-বাকারাহ", "Al-Baqarah", "البقرة", True),
  "q_coop": _q("5:2", _cut(_q52, 40, 50), "নেককাজ ও তাকওয়ায় তোমরা পরস্পর সাহায্য করবে এবং পাপ ও সীমালংঘনে একে অন্যের সাহায্য করবে না।", "And cooperate in righteousness and piety, but do not cooperate in sin and aggression.", "আল-মায়িদাহ", "Al-Māʾidah", "المائدة", True),
  "q_ask": _q("16:43", _cut(_q1643, 9), "সুতরাং তোমরা জ্ঞানীদেরকে জিজ্ঞেস কর যদি না জান।", "So ask the people of the message if you do not know.", "আন-নাহল", "An-Naḥl", "النحل", True),
  "q_ilm": _q("20:114", _cut(_q20114, 15), "বলুন, ‘হে আমার রব! আমাকে জ্ঞানে সমৃদ্ধ করুন।’", "And say, “My Lord, increase me in knowledge.”", "ত্বা-হা", "Ṭā-Hā", "طه", True),
  "q_khair": _q("3:104", _Q["3:104"]["ar"], "আর তোমাদের মধ্যে এমন একটি দল যেন থাকে যারা কল্যাণের দিকে আহবান করবে এবং সৎকাজের নির্দেশ দেবে ও অসৎকাজে নিষেধ করবে; আর তারাই সফলকাম।", "And let there be [arising] from you a nation inviting to [all that is] good, enjoining what is right and forbidding what is wrong, and those will be the successful.", "আলে ইমরান", "Āl ʿImrān", "آل عمران"),
  "q_feed": _q("76:8", _Q["76:8"]["ar"], "আর তারা খাবারের প্রতি ভালোবাসা থাকা সত্ত্বেও অভাবগ্রস্ত, ইয়াতীম ও বন্দীকে খাবার দান করে।", "And they give food in spite of love for it to the needy, the orphan, and the captive.", "আল-ইনসান", "Al-Insān", "الإنسان"),
  "q_good": _q("2:110", _cut(_q2110, 5, 13), "তোমরা উত্তম কাজের যা কিছু নিজেদের জন্য পেশ করবে আল্লাহ্‌র কাছে তা পাবে।", "Whatever good you put forward for yourselves, you will find it with Allāh.", "আল-বাকারাহ", "Al-Baqarah", "البقرة", True),
  "h_masjid": _h(_H["muslim:533b"]["matn"], "যে ব্যক্তি আল্লাহর জন্য একটি মাসজিদ নির্মাণ করে, আল্লাহ জান্নাতে তার জন্য অনুরূপ একটি ঘর নির্মাণ করেন।", "He who built a mosque for Allah, Allah would build a house for him like it in Paradise.", "সহীহ মুসলিম ৫৩৩", "Sahih Muslim 533", "صحيح مسلم 533"),
  "h_jariyah": _h(_H["muslim:1631"]["matn"], "মানুষ মারা গেলে তার সব আমল বন্ধ হয়ে যায়, তিনটি ছাড়া: সাদাকায়ে জারিয়া, এমন জ্ঞান যা দ্বারা উপকার পাওয়া যায়, অথবা নেক সন্তান যে তার জন্য দু‘আ করে।", "When a man dies, his acts come to an end, but three: recurring charity, or knowledge by which people benefit, or a pious child who prays for him.", "সহীহ মুসলিম ১৬৩১", "Sahih Muslim 1631", "صحيح مسلم 1631"),
  "h_ilm": _h(_cut(_H["muslim:2699a"]["matn"], 44, 57), "যে ব্যক্তি জ্ঞানের সন্ধানে কোনো পথে চলে, আল্লাহ এর বিনিময়ে তার জন্য জান্নাতের পথ সহজ করে দেন।", "He who treads the path in search of knowledge, Allah would make that path easy, leading to Paradise for him.", "সহীহ মুসলিম ২৬৯৯", "Sahih Muslim 2699", "صحيح مسلم 2699", True),
  "h_quran": _h(_H["bukhari:5027"]["matn"], "তোমাদের মধ্যে ঐ ব্যক্তি সবচেয়ে উত্তম যে কুরআন শিখে এবং অন্যকে শিখায়।", "The best among you are those who learn the Qur'an and teach it.", "সহীহ বুখারী ৫০২৭", "Sahih al-Bukhari 5027", "صحيح البخاري 5027"),
  "h_convey": _h(_cut(_H["bukhari:3461"]["matn"], 0, 4), "আমার কথা পৌঁছিয়ে দাও, যদি তা এক আয়াতও হয়।", "Convey (my teachings) to the people even if it were a single sentence.", "সহীহ বুখারী ৩৪৬১", "Sahih al-Bukhari 3461", "صحيح البخاري 3461", True),
  "h_body": _h(_H["muslim:2586a"]["matn"], "পারস্পরিক ভালোবাসা, দয়া ও সহানুভূতিতে মু’মিনদের দৃষ্টান্ত একটি দেহের মতো; দেহের কোনো অঙ্গ অসুস্থ হলে পুরো দেহ নিদ্রাহীনতা ও জ্বরে তার সঙ্গী হয়।", "The similitude of believers in regard to mutual love, affection and fellow-feeling is that of one body; when any limb of it aches, the whole body aches, because of sleeplessness and fever.", "সহীহ মুসলিম ২৫৮৬", "Sahih Muslim 2586", "صحيح مسلم 2586"),
  "h_fiqh": _h(_cut(_H["bukhari:71"]["matn"], 0, 8), "আল্লাহ যার কল্যাণ চান, তাকে দ্বীনের গভীর জ্ঞান দান করেন।", "If Allah wants to do good to a person, He makes him comprehend the religion.", "সহীহ বুখারী ৭১", "Sahih al-Bukhari 71", "صحيح البخاري 71", True),
}
C["versesNote"] = T("কুরআনের অনুবাদ: ড. আবু বকর মুহাম্মাদ যাকারিয়া", "Qur'an translation: Saheeh International", "")

# ---------- history: a picture for each step ----------
_HIMG = {"2017-10-01": "img/first-prayer.webp", "2021": "img/halaqa-class.webp", "2022-07": "img/model-madrasa.webp", "2023-01": "img/site-signboard.webp", "2024": "img/construction-piling.webp", "2026": "img/construction-masjid-2026-10.webp"}
for _x in C.get("history", []):
    if _x.get("date") in _HIMG and not _x.get("image"): _x["image"] = _HIMG[_x["date"]]
