# v9 (21 Nov 2026): content audit. House style, consistent terminology, clearer institutional copy.
# No new facts: wording, consistency and status labels only. Items that need management sign-off are flagged in docs.
import re as _re

# ---- 1. house-style terminology, applied to every Bangla/English string (names, URLs and ids untouched) ----
BN_RULES = [(r"ইসলামি(?![কয়])", "ইসলামী"), (r"দীনি", "দ্বীনি"), (r"তাফসির", "তাফসীর"), (r"শাইখ", "শায়খ"), (r"শরীয়াহ", "শরিয়াহ"), (r"শারিয়াহ", "শরিয়াহ")]
EN_RULES = [(r"(?<!Kulliyatul )(?<!Kulliyat )\bQuran\b(?!\.com|il)", "Qur'an"), (r"\bAl-Qur'an\b", "The Qur'an"), (r"\bdawah\b", "Dawah"), (r"\bDīnī\b", "dini")]
def _style(o, key=None):
    if isinstance(o, dict):
        if "bn" in o and "en" in o and all(isinstance(o.get(k, ""), str) for k in ("bn", "en")):
            bn, en = o["bn"], o["en"]
            if not bn.startswith(("http", "#", "img/")):
                for a, b in BN_RULES: bn = _re.sub(a, b, bn)
            if not en.startswith(("http", "#", "img/")):
                for a, b in EN_RULES: en = _re.sub(a, b, en)
            o = dict(o); o["bn"], o["en"] = bn, en
            return o
        return {k: _style(v, k) for k, v in o.items()}
    if isinstance(o, list): return [_style(v) for v in o]
    return o
for _k in list(C.keys()):
    if _k not in ("masterplan",): C[_k] = _style(C[_k])

# ---- 2. institutional copy: same facts, clearer writing ----
H = C["home"]
H["aboutText"] = T(
  "ইমাম বুখারী ট্রাস্ট একটি অলাভজনক, বহুমুখী ইসলামী প্রতিষ্ঠান। কুরআন ও বিশুদ্ধ সুন্নাহর আলোকে শিক্ষা, গবেষণা, দাওয়াহ ও সমাজকল্যাণের মাধ্যমে আমরা ইসলামের প্রকৃত শিক্ষা মানুষের কাছে পৌঁছে দিতে, দৈনন্দিন জীবনে এর ব্যবহারিক প্রয়োগ দৃশ্যমান করতে এবং প্রতিটি প্রজন্মের কাছে ইসলামকে প্রাসঙ্গিক রাখতে কাজ করি। ১ অক্টোবর ২০১৭ ধলেশ্বরী নদীর তীরে ট্রাস্টের আনুষ্ঠানিক কার্যক্রম শুরু হয়।",
  "Imam Bukhari Trust is a non-profit, multi-disciplinary Islamic institution. Guided by the Qur'an and authentic Sunnah, it works through education, research, Dawah and social welfare to share the authentic teachings of Islam, make their practice visible in daily life and keep Islam relevant to every generation. The Trust formally began its work on 1 October 2017 on the bank of the Dhaleshwari River.",
  "وقف الإمام البخاري مؤسسة إسلامية غير ربحية متعددة المجالات، تعمل في ضوء القرآن والسنة الصحيحة من خلال التعليم والبحث والدعوة والرعاية الاجتماعية، لنشر تعاليم الإسلام الصحيحة وإظهار تطبيقها في الحياة اليومية وإبقاء الإسلام حاضرًا لدى كل جيل. بدأ الوقف أعماله رسميًا في 1 أكتوبر 2017 على ضفة نهر دهاليشوري.")
H["visionTitle"] = T("আমাদের ভিশন", "Our vision", "رؤيتنا")
H["visionText"] = T(
  "এমন একটি জ্ঞানভিত্তিক সমাজ, যেখানে শিক্ষা, গবেষণা, গবেষণাভিত্তিক দাওয়াহ এবং সামাজিক ও শিক্ষামূলক উদ্যোগ মানুষকে কুরআন ও সুন্নাহর সঠিক উপলব্ধি, অনুশীলন ও নৈতিকতার পথে এগিয়ে নেবে।",
  "A knowledge-based society in which education, research, research-based Dawah and social and educational initiatives lead people to a sound understanding and practice of the Qur'an and Sunnah and to the ethics they teach.",
  "مجتمع قائم على المعرفة، يقود فيه التعليم والبحث والدعوة القائمة على البحث والمبادرات الاجتماعية والتعليمية الناسَ إلى الفهم الصحيح للقرآن والسنة والعمل بهما والتخلق بأخلاقهما.")
H["spotlightText"] = T(
  "“আল্লাহর কাছে সবচেয়ে প্রিয় স্থান মাসজিদ।” মদীনায় পৌঁছে রাসূলুল্লাহ ﷺ প্রথমেই মাসজিদ নির্মাণের কাজ শুরু করেছিলেন। এই অনুপ্রেরণায়, সুন্নাহর আলোকে একটি মাসজিদকেন্দ্রিক দ্বীনি কমিউনিটি গড়ার লক্ষ্যে কমপ্লেক্সটির নির্মাণকাজ চলছে। ইনশাআল্লাহ এটি হবে দাওয়াহ, শিক্ষা, সেবা ও তারবিয়াহর কেন্দ্র।",
  "“The most beloved places to Allah are the masjids.” On reaching Madinah, the Messenger of Allah ﷺ first began building a masjid. In that spirit, the complex is being built to form a masjid-centred community in the light of the Sunnah. In sha Allah it will be a centre for Dawah, education, service and tarbiyah.",
  "المساجد أحب البقاع إلى الله كما أخبر النبي ﷺ، وأول ما بدأ به رسول الله ﷺ حين وصل المدينة بناء المسجد. وعلى هذا النهج يُبنى المجمع لتكوين مجتمع متمحور حول المسجد في ضوء السنة، ليكون بإذن الله مركزًا للدعوة والتعليم والخدمة والتربية.")
for p in H.get("pillars", []):
    if p["title"]["en"] in ("Social Development", "Social development"): p["title"] = T("সমাজকল্যাণ", "Social welfare", "الرعاية الاجتماعية")

for x in C["history"]:
    if x["date"] == "2026":
        x["title"] = T("মাসজিদের কাঠামো উঠছে", "The masjid structure rises", "ارتفاع هيكل المسجد")
        x["text"] = T(
          "২২৫টি পাইল সম্পন্ন; মাসজিদের ১ম ও ২য় তলার ছাদ ঢালাই সম্পন্ন (জুলাই ২০২৬); নির্মাণাধীন মাসজিদে সালাত শুরু; একাডেমিক ভবনের ফাউন্ডেশনের কাজ প্রায় শেষ (নভেম্বর ২০২৬)।",
          "All 225 piles completed; the masjid's 1st- and 2nd-floor slabs cast (July 2026); prayers begin in the masjid under construction; the academic building's foundation nearly complete (November 2026).",
          "اكتمال 225 خازوقًا؛ صب سقفي الطابقين الأول والثاني للمسجد (يوليو 2026)؛ بدء الصلاة في المسجد قيد الإنشاء؛ أساسات المبنى الأكاديمي قاربت الاكتمال (نوفمبر 2026).")

# Zakat: the fund must not claim an approved policy that is not yet published
for f in C["funds"]:
    if f["id"] == "zakat":
        f["text"] = T(
          "যাকাতের অর্থ সম্পূর্ণ আলাদা হিসাবে রাখা হয় এবং শুধু শরিয়াহসম্মত খাতে ব্যয় হয়। যাকাত নীতিমালা শরিয়াহ কর্তৃপক্ষের অনুমোদনের পর প্রকাশ করা হবে।",
          "Zakat is held in a fully separate account and spent only on eligible categories. The Zakat policy will be published once approved by the Shariah authority.",
          "تُحفظ أموال الزكاة في حساب مستقل تمامًا وتُصرف في مصارفها الشرعية فقط، وتُنشر سياسة الزكاة بعد اعتماد الهيئة الشرعية.")

# ---- 3. status vocabulary: one set of labels everywhere ----
U = C["ui"]
U["status_running"] = T("চলমান", "Ongoing", "قائم")
U["status_ongoing"] = T("চলমান", "Ongoing", "جارٍ")
U["status_done"] = T("সম্পন্ন", "Completed", "مكتمل")
U["status_planned"] = T("পরিকল্পিত", "Planned", "مخطط")
U["status_proposed"] = T("প্রস্তাবিত", "Proposed", "مقترح")
U["status_establishing"] = T("প্রতিষ্ঠাধীন", "Being established", "قيد التأسيس")
U["status_construction"] = T("নির্মাণাধীন", "Under construction", "قيد الإنشاء")
U["status_legend"] = T("অবস্থার ধরন: সম্পন্ন · চলমান · নির্মাণাধীন · প্রতিষ্ঠাধীন · প্রস্তাবিত (মাস্টারপ্ল্যানভুক্ত, এখনো নির্মাণ শুরু হয়নি)",
                       "Status key: Completed · Ongoing · Under construction · Being established · Proposed (in the master plan, construction not yet started)",
                       "دليل الحالة: مكتمل · جارٍ · قيد الإنشاء · قيد التأسيس · مقترح (ضمن المخطط العام ولم يبدأ البناء)")
for b in C["future"]["buildings"]:
    if b["status"] == "planned":
        b["status"] = "proposed"; b["statusText"] = T("প্রস্তাবিত · মাস্টারপ্ল্যানভুক্ত", "Proposed · in the master plan", "مقترح · ضمن المخطط العام")
U["nav_quran"] = T("আল-কুরআন", "The Qur'an", "القرآن الكريم")

# Arabic for the scholars panel: roles translated, names transliterated (flagged for management review)
_AR_NAMES = ["الشيخ الأستاذ الدكتور محمد منظور إلهي", "الشيخ الدكتور أبو بكر محمد زكريا", "الشيخ الدكتور محمد سيف الله", "الشيخ الدكتور إمام حسين", "الشيخ الدكتور رضاء الكريم", "الشيخ الدكتور عبد الله الكافي بن لطف الرحمن", "م. م. فضل ربي", "الدكتور محمد ناصر الدين"]
_AR_ROLE = {"PhD, Islamic University of Madinah": "دكتوراه، الجامعة الإسلامية بالمدينة المنورة", "Associate Professor of Arabic, National University": "أستاذ مشارك، قسم اللغة العربية، الجامعة الوطنية", "Assistant Professor, Bangladesh University of Business and Technology": "أستاذ مساعد، جامعة بنغلاديش للأعمال والتكنولوجيا", "Professor, Islamic University, Kushtia": "أستاذ، الجامعة الإسلامية، كوشتيا"}
for _i, _s in enumerate(C.get("scholars", [])):
    if not _s["name"].get("ar") and _i < len(_AR_NAMES): _s["name"]["ar"] = _AR_NAMES[_i]
    if not _s["role"].get("ar"): _s["role"]["ar"] = _AR_ROLE.get(_s["role"]["en"], "")

U["inst_lead"] = T("ইমাম বুখারী ট্রাস্টের অধীনে পরিচালিত ও প্রতিষ্ঠাধীন শিক্ষা ও দ্বীনি প্রতিষ্ঠানসমূহ। প্রতিটি কার্ডে প্রতিষ্ঠানের বর্তমান অবস্থা উল্লেখ করা আছে।",
                   "Educational and religious institutions run by, or being established under, Imam Bukhari Trust. Each card shows the institution's current status.",
                   "المؤسسات التعليمية والدينية التي يديرها وقف الإمام البخاري أو التي هي قيد التأسيس. تُظهر كل بطاقة الحالة الراهنة للمؤسسة.")
U["proj_lead"] = T("ট্রাস্টের অবকাঠামো ও সমাজ উন্নয়ন প্রকল্পসমূহ। চলমান প্রকল্পের কাজ মাঠপর্যায়ে চলছে; প্রস্তাবিত প্রকল্প এখনো পরিকল্পনা ও তহবিল সংগ্রহের পর্যায়ে।",
                   "The Trust's infrastructure and community development projects. Ongoing projects are under way on site; proposed projects are still at the planning and fundraising stage.",
                   "مشاريع الوقف في البنية التحتية وتنمية المجتمع. المشاريع الجارية قيد التنفيذ في الموقع، أما المقترحة فما زالت في مرحلة التخطيط وجمع التمويل.")
U["init_lead"] = T("শিক্ষা, দাওয়াহ, গবেষণা ও সমাজকল্যাণে ট্রাস্টের কার্যক্রমের ক্ষেত্রসমূহ। নির্দিষ্ট কর্মসূচির সময়সূচি ও অবস্থা সংশ্লিষ্ট পাতায় এবং সংবাদ ও ইভেন্ট অংশে প্রকাশ করা হয়।",
                   "The Trust's areas of activity in education, Dawah, research and social welfare. Schedules and the status of specific programmes are published on their own pages and under News and Events.",
                   "مجالات عمل الوقف في التعليم والدعوة والبحث والرعاية الاجتماعية. تُنشر مواعيد البرامج المحددة وحالتها في صفحاتها الخاصة وفي قسم الأخبار والفعاليات.")
