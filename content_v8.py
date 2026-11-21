# v8 (21 Nov 2026): master-brief upgrade. Institutional structure, verified-only statistics, transparency registry,
# governance and policy pages. Nothing here invents facts: unknown items are marked as pending approval.
U = C["ui"]
def ui(k, bn, en, ar): U[k] = T(bn, en, ar)
for k, v in {
  "nav_overview": ("সংক্ষিপ্ত পরিচিতি", "Overview", "نظرة عامة"), "nav_mission": ("মিশন ও ভিশন", "Mission & vision", "الرسالة والرؤية"),
  "nav_governance": ("পরিচালনা ও সুশাসন", "Governance", "الحوكمة"), "nav_activities": ("আমাদের কার্যক্রম", "Our activities", "أنشطتنا"),
  "act_education": ("ইসলামী শিক্ষা", "Islamic education", "التعليم الإسلامي"), "act_dawah": ("দাওয়াহ", "Dawah", "الدعوة"),
  "act_research": ("গবেষণা", "Research", "البحث"), "act_welfare": ("সমাজকল্যাণ", "Social welfare", "الرعاية الاجتماعية"),
  "act_community": ("কমিউনিটি উন্নয়ন", "Community development", "تنمية المجتمع"), "nav_all_initiatives": ("সব উদ্যোগ", "All initiatives", "كل المبادرات"),
  "nav_masjid_complex": ("ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স", "Imam Bukhari Jame Masjid Complex", "مجمع جامع الإمام البخاري"),
  "nav_academic_bld": ("একাডেমিক ভবন", "Academic building", "المبنى الأكاديمي"), "nav_all_projects": ("সব প্রকল্প", "All projects", "كل المشاريع"),
  "nav_kq": ("কুল্লিয়াতুল কুরআন", "Kulliyatul Quran", "كلية القرآن"), "nav_other_inst": ("অন্যান্য প্রতিষ্ঠান", "Other institutions", "مؤسسات أخرى"),
  "nav_resources": ("মিডিয়া ও রিসোর্স", "Media & resources", "الإعلام والمصادر"), "nav_videos": ("ভিডিও", "Videos", "المرئيات"),
  "nav_publications": ("প্রকাশনা", "Publications", "المنشورات"), "nav_events": ("ইভেন্ট ও রেজিস্ট্রেশন", "Events & registration", "الفعاليات والتسجيل"),
  "tr_annual": ("বার্ষিক প্রতিবেদন", "Annual reports", "التقارير السنوية"), "tr_financial": ("আর্থিক প্রতিবেদন", "Financial reports", "التقارير المالية"),
  "tr_projects": ("প্রকল্প প্রতিবেদন", "Project reports", "تقارير المشاريع"), "tr_accountability": ("জবাবদিহিতা", "Accountability", "المساءلة"),
  "privacy": ("গোপনীয়তা নীতি", "Privacy policy", "سياسة الخصوصية"), "terms": ("ব্যবহারের শর্তাবলি", "Terms of use", "شروط الاستخدام"),
  "pending_approval": ("অনুমোদনের অপেক্ষায়", "Pending approval", "بانتظار الاعتماد"), "not_published": ("এখনো প্রকাশিত হয়নি", "Not yet published", "لم يُنشر بعد"),
  "available": ("প্রকাশিত", "Published", "منشور"), "verified": ("যাচাইকৃত", "Verified", "موثّق"),
  "explore_work": ("আমাদের কাজ দেখুন", "Explore our work", "تعرّف على عملنا"), "discover_projects": ("প্রকল্পগুলো দেখুন", "Discover our projects", "اكتشف مشاريعنا"),
  "support_mission": ("মিশনে সহায়তা করুন", "Support our mission", "ادعم رسالتنا"),
}.items(): ui(k, *v)

# hero: the brief's institutional headline (user-approved wording)
H = C["home"]
H["heroEyebrow"] = T("ইমাম বুখারী ট্রাস্ট · উত্তরা, ঢাকা · ২০১৭ থেকে", "Imam Bukhari Trust · Uttara, Dhaka · since 2017", "وقف الإمام البخاري · أُترا، دكا · منذ 2017")
H["heroTitle"] = T("ঈমান। ইলম। খিদমাহ।", "Faith. Knowledge. Service.", "إيمان. علم. خدمة.")
H["heroText"] = T("কুরআন ও বিশুদ্ধ সুন্নাহর আলোকে একটি জ্ঞানভিত্তিক সমাজ গড়ার লক্ষ্যে শিক্ষা, গবেষণা, দাওয়াহ, মাসজিদকেন্দ্রিক কমিউনিটি ও সমাজকল্যাণে কাজ করছে ইমাম বুখারী ট্রাস্ট।",
                  "Building a knowledge-based society through the Qur'an and authentic Sunnah: education, research, dawah, a masjid-centred community and social welfare.",
                  "نحو مجتمع قائم على المعرفة في ضوء القرآن والسنة الصحيحة: تعليم وبحث ودعوة ومجتمع حول المسجد ورعاية اجتماعية.")

# statistics: one authoritative record each (value, unit, description, as-of, source, verification)
for f in H.get("facts", []):
    f.update({"asOf": "2026-02", "source": T("IBT ক্যাটালগ ২০২৬", "IBT Catalog 2026", "كتالوج الوقف 2026"), "verified": True})

# About: institutional sections built from existing approved site text; unknowns flagged
C["about"] = {
  "mission": T("কুরআন ও বিশুদ্ধ সুন্নাহর আলোকে ঈমান, ইলম ও খিদমাহর মাধ্যমে একটি জ্ঞানভিত্তিক সমাজ গড়ে তোলা।",
               "To build a knowledge-based society through faith, knowledge and service, guided by the Qur'an and authentic Sunnah.",
               "بناء مجتمع قائم على المعرفة بالإيمان والعلم والخدمة في ضوء القرآن والسنة الصحيحة."),
  "missionStatus": "pending",
  "objectives": [
    T("গবেষণাভিত্তিক ইসলামী শিক্ষা: শিশু থেকে উচ্চশিক্ষা পর্যন্ত (কুল্লিয়াতুল কুরআন ও এর শাখা)", "Research-based Islamic education from childhood to higher studies (Kulliyatul Quran and its sections)", "تعليم إسلامي قائم على البحث من الطفولة إلى الدراسات العليا"),
    T("কুরআন-সুন্নাহভিত্তিক গবেষণা, সেমিনার ও নীতিনির্ধারণী সংলাপ", "Qur'an-and-Sunnah-based research, seminars and policy dialogue", "بحوث وندوات وحوار سياسات في ضوء الكتاب والسنة"),
    T("সাপ্তাহিক হালাকা, প্রশিক্ষণ, কোর্স ও ডিজিটাল মাধ্যমে দাওয়াহ", "Dawah through the weekly halaqa, trainings, courses and digital media", "الدعوة عبر الحلقة الأسبوعية والدورات والإعلام الرقمي"),
    T("ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স ও মাসজিদকেন্দ্রিক দ্বীনি কমিউনিটি গড়ে তোলা", "Building the Imam Bukhari Jame Masjid Complex and a masjid-centred community", "بناء مجمع جامع الإمام البخاري ومجتمع حول المسجد"),
    T("ত্রাণ, শীতবস্ত্র, শিক্ষাবৃত্তি ও পুনর্বাসনের মাধ্যমে সমাজকল্যাণ", "Social welfare through relief, winter aid, scholarships and rehabilitation", "الرعاية الاجتماعية بالإغاثة وكسوة الشتاء والمنح وإعادة التأهيل")],
  "values": [
    {"icon": "heart", "title": T("ঈমান", "Faith", "الإيمان"), "text": T("কুরআন ও বিশুদ্ধ সুন্নাহই সব কাজের ভিত্তি।", "The Qur'an and authentic Sunnah are the basis of all work.", "القرآن والسنة الصحيحة أساس كل عمل.")},
    {"icon": "book", "title": T("ইলম", "Knowledge", "العلم"), "text": T("গবেষণা ও প্রমাণনির্ভর শিক্ষা ও দাওয়াহ।", "Research and evidence-based education and dawah.", "تعليم ودعوة قائمان على البحث والدليل.")},
    {"icon": "social", "title": T("খিদমাহ", "Service", "الخدمة"), "text": T("মানুষ ও সমাজের কল্যাণে নিবেদিত কাজ।", "Work devoted to the good of people and society.", "عمل مكرّس لنفع الناس والمجتمع.")},
    {"icon": "check", "title": T("আমানতদারি", "Trustworthiness", "الأمانة"), "text": T("প্রতিটি দান নির্ধারিত খাতে ব্যয় ও তার হিসাব সংরক্ষণ।", "Each gift is spent on its chosen cause and recorded.", "صرف كل تبرع في مجاله وتوثيقه.")}],
  "approach": T("প্রতিটি কার্যক্রম কুরআন ও বিশুদ্ধ সুন্নাহর আলোকে, গবেষণা ও প্রমাণের ভিত্তিতে পরিচালিত হয়; শিক্ষা, দাওয়াহ ও সমাজকল্যাণকে একটি মাসজিদকেন্দ্রিক কমিউনিটির চারপাশে সংযুক্ত করা হয়।",
                "Every activity is guided by the Qur'an and authentic Sunnah and grounded in research and evidence; education, dawah and welfare are connected around a masjid-centred community.",
                "كل نشاط يسترشد بالقرآن والسنة الصحيحة ويقوم على البحث والدليل، وتترابط الأنشطة حول مجتمع محوره المسجد."),
}

# Governance: only approved facts (chairman; academic committee already on site). Committee list pending.
C["governance"] = {
  "intro": T("ইমাম বুখারী ট্রাস্ট একটি অলাভজনক ইসলামী প্রতিষ্ঠান। প্রতিষ্ঠানের নীতিনির্ধারণ ও তদারকি পরিচালনা কমিটির মাধ্যমে হয় এবং দৈনন্দিন কার্যক্রম পরিচালনা করে প্রশাসন ও অপারেশনস টিম।",
             "Imam Bukhari Trust is a non-profit Islamic institution. Policy and oversight sit with its management committee; daily work is run by the administration and operations team.",
             "وقف الإمام البخاري مؤسسة إسلامية غير ربحية؛ تتولى لجنة الإدارة السياسات والإشراف، ويدير فريق الإدارة والعمليات العمل اليومي."),
  "committeeStatus": "pending", "committee": [],
  "registrationStatus": "pending", "registration": T("", "", ""),
  "policies": [
    {"name": T("দান ও খাতভিত্তিক হিসাব নীতি", "Donation and fund-accounting policy", "سياسة التبرعات والمحاسبة حسب المجال"), "status": "pending"},
    {"name": T("যাকাত নীতিমালা (শারিয়াহ বোর্ডের অনুমোদন সাপেক্ষে)", "Zakat policy (subject to Shariah approval)", "سياسة الزكاة (بعد اعتماد الهيئة الشرعية)"), "status": "pending"},
    {"name": T("ক্রয় ও আর্থিক নিয়ন্ত্রণ নীতি", "Procurement and financial-control policy", "سياسة المشتريات والرقابة المالية"), "status": "pending"},
    {"name": T("তথ্য সুরক্ষা ও গোপনীয়তা নীতি", "Data protection and privacy policy", "سياسة حماية البيانات والخصوصية"), "status": "available", "link": "#privacy"}]
}

# Transparency registry: published items + clearly unavailable ones (no invented numbers)
C["transparencyDocs"] = [
  {"cat": "annual", "title": T("ইমাম বুখারী ট্রাস্ট ক্যাটালগ ২০২৬", "Imam Bukhari Trust Catalog 2026", "كتالوج وقف الإمام البخاري 2026"), "period": "2017–2026", "published": "2026-02", "status": "available", "authority": T("ইমাম বুখারী ট্রাস্ট", "Imam Bukhari Trust", "وقف الإمام البخاري"), "file": "files/IBT_Catalog_2026.pdf"},
  {"cat": "annual", "title": T("বার্ষিক প্রতিবেদন ২০২৫", "Annual report 2025", "التقرير السنوي 2025"), "period": "2025", "status": "pending"},
  {"cat": "financial", "title": T("আয়-ব্যয় ও খাতভিত্তিক তহবিল বিবরণী (রিসিপ্টস অ্যান্ড পেমেন্টস)", "Receipts & payments and fund-wise statement", "بيان المقبوضات والمدفوعات حسب المجال"), "period": "2025–26", "status": "pending"},
  {"cat": "financial", "title": T("নিরীক্ষা (অডিট) প্রতিবেদন", "External audit report", "تقرير التدقيق الخارجي"), "period": "2025–26", "status": "pending"},
  {"cat": "financial", "title": T("দান ব্যবহার প্রতিবেদন", "Donation utilisation report", "تقرير استخدام التبرعات"), "period": "2025–26", "status": "pending"},
  {"cat": "projects", "title": T("মাসজিদ কমপ্লেক্স ও একাডেমিক ভবন: নির্মাণ অগ্রগতি", "Masjid complex & academic building: construction progress", "مجمع المسجد والمبنى الأكاديمي: تقدم البناء"), "period": "নভেম্বর ২০২৬", "published": "2026-11", "status": "available", "authority": T("প্রশাসন ও অপারেশনস", "Administration & Operations", "الإدارة والعمليات"), "link": "#project-ibjmc"},
  {"cat": "projects", "title": T("নির্মাণ প্রকল্প: ব্যয় ও তহবিল সংগ্রহের অগ্রগতি", "Construction: expenditure and fundraising progress", "البناء: تقدم الإنفاق وجمع التبرعات"), "period": "2024–2026", "status": "pending"}]
C["finance"] = {"status": "pending", "rows": [
  T("মোট প্রাপ্ত দান", "Total donations received", "إجمالي التبرعات"), T("খাতভিত্তিক সংগ্রহ", "Collection by fund", "التحصيل حسب المجال"),
  T("খাতভিত্তিক ব্যয়", "Expenditure by fund", "الإنفاق حسب المجال"), T("তহবিলের প্রারম্ভিক ও সমাপনী স্থিতি", "Opening and closing fund balances", "الأرصدة الافتتاحية والختامية"),
  T("নির্মাণ ব্যয়", "Construction expenditure", "نفقات البناء"), T("সমাজকল্যাণ ব্যয়", "Social welfare expenditure", "نفقات الرعاية الاجتماعية"),
  T("প্রশাসনিক ব্যয় (অনুমোদন সাপেক্ষে)", "Administrative expenditure (where approved)", "النفقات الإدارية (عند الاعتماد)")]}

# Project milestones (from published updates on this site)
C["milestones"] = [
  {"date": "2023", "text": T("কুল্লিয়াতুল কুরআনের একাডেমিক ভবনের নির্মাণকাজ উদ্বোধন", "Construction of the Kulliyatul Quran academic building inaugurated", "افتتاح أعمال بناء المبنى الأكاديمي"), "status": "done"},
  {"date": "2024", "text": T("পাইলিং কাজ শুরু", "Piling work began", "بدء أعمال الخوازيق"), "status": "done"},
  {"date": "2026-02", "text": T("২২৫টি পাইল সম্পন্ন (মাসজিদ ও একাডেমিক ভবন; IBT ক্যাটালগ ২০২৬)", "225 piles completed (masjid & academic building; IBT Catalog 2026)", "اكتمال 225 خازوقًا"), "status": "done"},
  {"date": "2026-07", "text": T("মাসজিদ: ১ম ও ২য় তলার ছাদ ঢালাই সম্পন্ন", "Masjid: 1st- and 2nd-floor slabs cast", "المسجد: صب سقفي الطابقين الأول والثاني"), "status": "done"},
  {"date": "2026-10", "text": T("একাডেমিক ভবন: পাইল ক্যাপ ঢালাই", "Academic building: pile-cap casting", "المبنى الأكاديمي: صب رؤوس الخوازيق"), "status": "done"},
  {"date": "2026-11", "text": T("একাডেমিক ভবন: ফাউন্ডেশন প্রায় শেষ", "Academic building: foundation nearly complete", "المبنى الأكاديمي: الأساسات قاربت الاكتمال"), "status": "progress"},
  {"date": "", "text": T("একাডেমিক ভবন: ১ম তলার ছাদ ঢালাই (প্রস্তুতি চলছে)", "Academic building: 1st-floor slab (in preparation)", "المبنى الأكاديمي: سقف الطابق الأول (قيد التحضير)"), "status": "next"},
  {"date": "", "text": T("মাসজিদ: ৩য় থেকে ৭ম তলা", "Masjid: 3rd to 7th floors", "المسجد: الطوابق 3–7"), "status": "planned"}]
for k, v in {"nav_about_s": ("পরিচিতি", "About", "من نحن"), "nav_activities_s": ("কার্যক্রম", "Activities", "الأنشطة"), "nav_projects_s": ("প্রকল্প", "Projects", "المشاريع"),
             "nav_institutions_s": ("প্রতিষ্ঠান", "Institutions", "المؤسسات"), "nav_resources_s": ("মিডিয়া ও রিসোর্স", "Media & resources", "الإعلام والمصادر"),
             "nav_transparency_s": ("স্বচ্ছতা", "Transparency", "الشفافية"), "nav_contact_s": ("যোগাযোগ", "Contact", "اتصل بنا")}.items(): ui(k, *v)
