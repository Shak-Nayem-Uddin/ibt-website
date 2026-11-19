# v3 overrides: only information with a known source.
# Sources: kulliyatulquran.com (course pages, Nov 2026), imambukharitrust.com, IBT YouTube channels,
# IBT Facebook page (donation channels post, May 2026), IBT Catalog 2026.
# Executed from build_content.py after the base content is built (T() is defined there).

KQ = "https://www.kulliyatulquran.com"

def fee(bn, en, ar, amount):
    return {"label": T(bn, en, ar), "amount": amount}

C["registrations"] = [
    {"id": "kq-general-arabic", "slug": "general-arabic", "type": "course", "entity": "courses", "image": "img/halaqa-class.jpg",
     "status": "open", "opens": "", "closes": "", "mode": "link", "formUrl": "https://forms.gle/StKr9sHnQUhz2i3c6",
     "title": T("জেনারেল আরবি ভাষা কোর্স", "General Arabic Language Course", "دورة اللغة العربية العامة"),
     "text": T("কুল্লিয়াতুল কুরআনিল কারীমের আরবি ভাষা ইনস্টিটিউটের ‘দাওরাতুল লুগা আল-আরাবিয়্যাহ আল-‘আম্মাহ’। আরবির প্রাথমিক জ্ঞান আছে এমন যে কারও জন্য।",
               "‘Dawrat al-Lughah al-‘Arabiyyah al-‘Ammah’ of the Kulliyatul Quranil Kareem Arabic Language Institute, for anyone with basic Arabic.",
               "دورة اللغة العربية العامة بمعهد اللغة العربية في كلية القرآن الكريم، لمن لديه معرفة أساسية بالعربية."),
     "facts": [
         T("মেয়াদ ১ বছর: ৪ মাস করে ৩টি সেমিস্টার", "1 year: three 4-month semesters", "سنة واحدة: ثلاثة فصول مدة كل منها 4 أشهر"),
         T("সেমিস্টারে প্রায় ১৩৫–১৪০টি ক্লাস", "About 135–140 classes per semester", "نحو 135–140 حصة في الفصل"),
         T("সপ্তাহে ৩ দিন, প্রতিদিন ৩ ঘণ্টা", "3 days a week, 3 hours a day", "3 أيام أسبوعيًا، 3 ساعات يوميًا"),
         T("ক্যাম্পাসে সরাসরি ক্লাস; টেক্সট বুক ও সার্টিফিকেট প্রদান", "In-person classes on campus; textbooks and a certificate are provided", "دروس حضورية في الحرم؛ تُقدَّم الكتب والشهادة")],
     "eligibility": [T("আরবি ভাষার প্রাথমিক ও মৌলিক জ্ঞান থাকতে হবে", "Basic knowledge of Arabic is required", "يُشترط معرفة أساسية باللغة العربية")],
     "fees": [fee("ভর্তি ফি", "Admission fee", "رسوم القبول", "৳5,000"), fee("সেমিস্টার ফি", "Semester fee", "رسوم الفصل", "৳20,000 (৳5,000 × 4)")],
     "feeNote": T("প্রথম ৩০ জনের জন্য ৫০%–৬০% ছাড়। কুল্লিয়ার অফিস থেকেও ভর্তি ফরম সংগ্রহ করা যাবে।", "50%–60% discount for the first 30 applicants. Forms are also available at the Kulliya office.", "خصم 50%–60% لأول 30 متقدمًا. تتوفر الاستمارة أيضًا في مكتب الكلية."),
     "venue": T("কুল্লিয়াতুল কুরআন ক্যাম্পাস, উত্তরা, ঢাকা", "Kulliyatul Quran campus, Uttara, Dhaka", "حرم كلية القرآن، أُتّرا، دكا"),
     "source": KQ + "/courses/general-arabic-language"},

    {"id": "kq-academic-arabic", "slug": "academic-arabic", "type": "course", "entity": "courses", "image": "img/program-corporate.jpg",
     "status": "info", "opens": "", "closes": "", "mode": "link", "formUrl": "",
     "title": T("একাডেমিক আরবি ভাষা কোর্স", "Academic Arabic Language Course", "دورة اللغة العربية للأغراض الأكاديمية"),
     "text": T("‘দাওরাতুল লুগা আল-আরাবিয়্যাহ লিল আগরাদ আল-একাডেমিয়্যাহ’। কোর্স শেষে যোগ্যতা অনুযায়ী সানাবিয়্যাহ বা কুল্লিয়ায় ভর্তির সুযোগ।",
               "‘Dawrat al-Lughah al-‘Arabiyyah lil-Aghrad al-Academiyyah’. On completion, students may enter Sanabiyyah or Kulliya according to their qualifications.",
               "دورة اللغة العربية للأغراض الأكاديمية. بعد إتمامها يمكن الالتحاق بالسنابية أو الكلية حسب المؤهل."),
     "facts": [
         T("মেয়াদ ১ বছর: ৬ মাস করে ২টি সেমিস্টার", "1 year: two 6-month semesters", "سنة واحدة: فصلان مدة كل منهما 6 أشهر"),
         T("প্রথম সেমিস্টারে প্রায় ৩০০টি, দ্বিতীয়তে প্রায় ৩৮০টি ক্লাস", "About 300 classes in the first semester and 380 in the second", "نحو 300 حصة في الفصل الأول و380 في الثاني"),
         T("সপ্তাহে ৫ দিন ক্লাস; টেক্সট বুক ও সার্টিফিকেট প্রদান", "Classes 5 days a week; textbooks and a certificate are provided", "الدروس 5 أيام أسبوعيًا؛ تُقدَّم الكتب والشهادة")],
     "eligibility": [T("দাখিল / মুতাওয়াসসিতাহ / কাফিয়া পর্যায়ের জ্ঞান", "Dakhil / Mutawassitah / Kafiyah level", "مستوى الداخل / المتوسطة / الكافية")],
     "fees": [fee("ভর্তি ফি", "Admission fee", "رسوم القبول", "৳5,000"), fee("সেমিস্টার ফি", "Semester fee", "رسوم الفصل", "৳30,000 (৳5,000 × 6)")],
     "feeNote": T("প্রথম ৩০ জনের জন্য ৫০% ছাড়।", "50% discount for the first 30 applicants.", "خصم 50% لأول 30 متقدمًا."),
     "venue": T("কুল্লিয়াতুল কুরআন ক্যাম্পাস, উত্তরা, ঢাকা", "Kulliyatul Quran campus, Uttara, Dhaka", "حرم كلية القرآن، أُتّرا، دكا"),
     "source": KQ + "/courses/academic-arabic-language"},

    {"id": "kq-sanabiyyah", "slug": "sanabiyyah", "type": "admission", "entity": "kulliyatul-quran", "image": "img/scholars-visit-group.jpg",
     "status": "info", "opens": "", "closes": "", "mode": "link", "formUrl": "",
     "title": T("সানাবিয়্যাহ (উচ্চ মাধ্যমিক) ভর্তি", "Sanabiyyah (higher secondary) admission", "القبول في المرحلة السنابية (الثانوية)"),
     "text": T("আরবি ভাষায় পড়া, লেখা ও বলার দক্ষতা এবং দেশের স্বনামধন্য বিশ্ববিদ্যালয়ে উচ্চশিক্ষার প্রস্তুতি।", "Reading, writing and speaking Arabic, and preparation for higher study at leading universities.", "إتقان القراءة والكتابة والمحادثة بالعربية والاستعداد للدراسة الجامعية."),
     "facts": [
         T("ভর্তি পরীক্ষা: ১ম পর্ব ডিসেম্বর/মার্চ/জুলাই, ২য় পর্ব জানুয়ারি/এপ্রিল/আগস্ট (সম্ভাব্য)", "Entrance exam (tentative): part 1 in December/March/July, part 2 in January/April/August", "اختبار القبول (مبدئيًا): الجزء الأول في ديسمبر/مارس/يوليو، والثاني في يناير/أبريل/أغسطس"),
         T("প্রতি বছর ২০ জন মেধাবীকে বৃত্তি", "Scholarships for 20 high achievers every year", "منح دراسية لـ20 طالبًا متفوقًا كل عام"),
         T("আরবিতে যথেষ্ট দক্ষতা না থাকলে আরবি ভাষা কোর্স বাধ্যতামূলক (আলাদা ভর্তি ফি নেই)", "An Arabic course is compulsory if Arabic is not yet strong enough (no separate admission fee)", "دورة العربية إلزامية لمن لم يتقن العربية بعد (دون رسوم قبول إضافية)")],
     "eligibility": [T("দাখিল / মুতাওয়াসসিতাহ / কাফিয়া / এসএসসি পাস", "Dakhil / Mutawassitah / Kafiyah / SSC", "الداخل / المتوسطة / الكافية / الثانوية العامة"),
                     T("ভর্তি পরীক্ষায় উত্তীর্ণ ও পূর্ণকালীন শিক্ষার্থী হতে হবে", "Pass the entrance exam and study full-time", "النجاح في اختبار القبول والدراسة بدوام كامل")],
     "fees": [fee("ভর্তি ফি", "Admission fee", "رسوم القبول", "৳5,000"), fee("মাসিক বেতন", "Monthly fee", "الرسوم الشهرية", "৳2,500"), fee("সেশন ফি", "Session fee", "رسوم العام", "৳5,000"),
              fee("লাইব্রেরি ফি (প্রতি সেমিস্টার)", "Library fee (per semester)", "رسوم المكتبة (لكل فصل)", "৳1,000"), fee("পরীক্ষার ফি (প্রতি সেমিস্টার)", "Exam fee (per semester)", "رسوم الاختبار (لكل فصل)", "৳1,000"),
              fee("কম্পিউটার ল্যাব ফি", "Computer lab fee", "رسوم المختبر", "৳500"), fee("উন্নয়ন ফি", "Development fee", "رسوم التطوير", "৳1,000"), fee("পরিচয়পত্র", "ID card", "بطاقة الهوية", "৳200")],
     "venue": T("কুল্লিয়াতুল কুরআন ক্যাম্পাস, উত্তরা, ঢাকা", "Kulliyatul Quran campus, Uttara, Dhaka", "حرم كلية القرآن، أُتّرا، دكا"),
     "video": "0HUA17Zek58", "source": KQ + "/courses/sanabiyah"},

    {"id": "kq-kulliya", "slug": "kulliya", "type": "admission", "entity": "kulliyatul-quran", "image": "img/chairman-speech.jpg",
     "status": "info", "opens": "", "closes": "", "mode": "link", "formUrl": "",
     "title": T("কুল্লিয়া (ব্যাচেলর ইন ইসলামিক স্টাডিজ) ভর্তি", "Kulliya (Bachelor in Islamic Studies) admission", "القبول في الكلية (بكالوريوس الدراسات الإسلامية)"),
     "text": T("ইসলামী শারিয়া ও আরবি ভাষায় পূর্ণ দক্ষতা, কমপক্ষে ৫ পারা হিফয, বক্তৃতা-বিতর্ক-লেখনী প্রশিক্ষণ এবং বিদেশি বিশ্ববিদ্যালয়ে ক্রেডিট ট্রান্সফারের সুযোগ।", "Full command of Shari'ah sciences and Arabic, memorising at least 5 juz', training in speaking, debate and writing, and credit transfer to universities abroad.", "إتقان العلوم الشرعية والعربية، وحفظ خمسة أجزاء على الأقل، والتدريب على الخطابة والمناظرة والكتابة، وإمكانية معادلة الساعات مع جامعات خارجية."),
     "facts": [T("ভর্তি পরীক্ষা: ১ম পর্ব ডিসেম্বর/মার্চ/জুলাই, ২য় পর্ব জানুয়ারি/এপ্রিল/আগস্ট (সম্ভাব্য)", "Entrance exam (tentative): part 1 in December/March/July, part 2 in January/April/August", "اختبار القبول (مبدئيًا): الجزء الأول في ديسمبر/مارس/يوليو، والثاني في يناير/أبريل/أغسطس")],
     "eligibility": [T("আলিম / সানাবিয়্যাহ / মেশকাত / এইচএসসি পাস", "Alim / Sanabiyyah / Mishkat / HSC", "العالم / السنابية / المشكاة / الثانوية العليا"),
                     T("ভর্তি পরীক্ষায় উত্তীর্ণ ও পূর্ণকালীন শিক্ষার্থী হতে হবে", "Pass the entrance exam and study full-time", "النجاح في اختبار القبول والدراسة بدوام كامل")],
     "fees": [fee("ভর্তি ফি", "Admission fee", "رسوم القبول", "৳5,000"), fee("মাসিক বেতন", "Monthly fee", "الرسوم الشهرية", "৳5,000"), fee("সেশন ফি", "Session fee", "رسوم العام", "৳5,000"),
              fee("লাইব্রেরি ফি (প্রতি সেমিস্টার)", "Library fee (per semester)", "رسوم المكتبة (لكل فصل)", "৳1,000"), fee("পরীক্ষার ফি (প্রতি সেমিস্টার)", "Exam fee (per semester)", "رسوم الاختبار (لكل فصل)", "৳1,000"),
              fee("কম্পিউটার ল্যাব ফি", "Computer lab fee", "رسوم المختبر", "৳500"), fee("উন্নয়ন ফি", "Development fee", "رسوم التطوير", "৳1,000"), fee("পরিচয়পত্র", "ID card", "بطاقة الهوية", "৳200")],
     "venue": T("কুল্লিয়াতুল কুরআন ক্যাম্পাস, উত্তরা, ঢাকা", "Kulliyatul Quran campus, Uttara, Dhaka", "حرم كلية القرآن، أُتّرا، دكا"),
     "source": KQ + "/courses/kulliya"},

    {"id": "kq-intensive-arabic", "slug": "arabic-2-months", "type": "course", "entity": "courses", "image": "img/halaqa-class.jpg",
     "status": "info", "opens": "", "closes": "", "mode": "link", "formUrl": "",
     "title": T("দাখিল ফলপ্রার্থীদের জন্য আলট্রা পদ্ধতিতে ২ মাসে আরবি ভাষা কোর্স", "2-month ‘Ultra method’ Arabic course for Dakhil candidates", "الدورة المكثفة في اللغة العربية لطلاب الداخل (شهران)"),
     "text": T("الدَّوْرَةُ المُكَثَّفَةُ فِي اللُّغَةِ العَرَبِيَّةِ: কুল্লিয়াতুল কুরআনের ওয়েবসাইটে ‘চলমান কোর্স’ হিসেবে তালিকাভুক্ত। ভর্তির বিস্তারিত জানতে অফিসে যোগাযোগ করুন।", "Listed as a current course on the Kulliyatul Quran website. Contact the office for admission details.", "مدرجة ضمن الدورات الحالية في موقع كلية القرآن. للتفاصيل يُرجى التواصل مع المكتب."),
     "facts": [], "eligibility": [], "fees": [],
     "venue": T("কুল্লিয়াতুল কুরআন ক্যাম্পাস, উত্তরা, ঢাকা", "Kulliyatul Quran campus, Uttara, Dhaka", "حرم كلية القرآن، أُتّرا، دكا"),
     "video": "nU09L0hWldI", "source": KQ + "/courses"},

    {"id": "model-madrasa", "slug": "model-madrasa", "type": "admission", "entity": "model-madrasa", "image": "img/model-madrasa.jpg",
     "status": "info", "opens": "", "closes": "", "mode": "link", "formUrl": "",
     "title": T("কুল্লিয়াতুল কুরআন মডেল মাদরাসা: ভর্তি", "Kulliyatul Quran Model Madrasa: admission", "مدرسة كلية القرآن النموذجية: القبول"),
     "text": T("ভর্তির সময়সূচি, শ্রেণি ও ফি অ্যাডমিন প্যানেল থেকে যোগ হবে। এখন জানতে অফিসে যোগাযোগ করুন।", "Admission dates, classes and fees will be added from the admin panel. Please contact the office for now.", "ستُضاف مواعيد القبول والصفوف والرسوم من لوحة الإدارة. يُرجى التواصل مع المكتب حاليًا."),
     "facts": [], "eligibility": [], "fees": [],
     "venue": T("উত্তরা, ঢাকা", "Uttara, Dhaka", "أُتّرا، دكا"), "source": KQ + "/p/kulliyatul-quran-model-madrasah", "needsInfo": True},

    {"id": "after-school", "slug": "after-school", "type": "course", "entity": "after-school", "image": "img/program-women-children.jpg",
     "status": "info", "opens": "", "closes": "", "mode": "link", "formUrl": "",
     "title": T("কুল্লিয়াতুল কুরআন আফটার স্কুল", "Kulliyatul Quran After School", "برنامج كلية القرآن بعد المدرسة"),
     "text": T("ব্যাচ, সময় ও ফি অ্যাডমিন প্যানেল থেকে যোগ হবে। এখন জানতে অফিসে যোগাযোগ করুন।", "Batches, timings and fees will be added from the admin panel. Please contact the office for now.", "ستُضاف الدفعات والمواعيد والرسوم من لوحة الإدارة. يُرجى التواصل مع المكتب حاليًا."),
     "facts": [], "eligibility": [], "fees": [],
     "venue": T("উত্তরা, ঢাকা", "Uttara, Dhaka", "أُتّرا، دكا"), "source": KQ + "/p/kulliyatul-quran-after-school", "needsInfo": True},

    {"id": "teachers-training", "slug": "teachers", "type": "training", "entity": "teachers-training", "image": "img/chairman-speech.jpg",
     "status": "info", "opens": "", "closes": "", "mode": "link", "formUrl": "",
     "title": T("শিক্ষক প্রশিক্ষণ কোর্স", "Teacher training course", "دورة تدريب المعلمين"),
     "text": T("কুল্লিয়াতুল কুরআনের শিক্ষক প্রশিক্ষণ কার্যক্রম। পরবর্তী ব্যাচের তথ্য অ্যাডমিন প্যানেল থেকে যোগ হবে।", "Kulliyatul Quran's teacher training programme. Details of the next batch will be added from the admin panel.", "برنامج تدريب المعلمين في كلية القرآن. ستُضاف تفاصيل الدفعة القادمة من لوحة الإدارة."),
     "facts": [], "eligibility": [], "fees": [],
     "venue": T("ঢাকা", "Dhaka", "دكا"), "source": KQ + "/courses", "needsInfo": True},

    {"id": "volunteer", "slug": "volunteer", "type": "volunteer", "entity": "", "image": "img/event-gettogether.jpg",
     "status": "open", "opens": "", "closes": "", "mode": "native", "formUrl": "",
     "title": T("স্বেচ্ছাসেবক হিসেবে যুক্ত হোন", "Join as a volunteer", "انضم متطوعًا"),
     "text": T("ইভেন্ট, ত্রাণ, ডিজিটাল দাওয়াহ ও প্রশাসনিক কাজে আপনার সময় ও দক্ষতা দিন। ফরম পূরণ করলে টিম যোগাযোগ করবে।", "Give your time and skills to events, relief, digital Dawah and administration. Fill in the form and the team will contact you.", "قدّم وقتك ومهاراتك في الفعاليات والإغاثة والدعوة الرقمية والإدارة. املأ الاستمارة وسيتواصل معك الفريق."),
     "facts": [], "eligibility": [], "fees": [],
     "venue": T("ঢাকা", "Dhaka", "دكا"), "source": ""}
]

C["settings"]["announcement"] = {"show": True,
    "text": T("জেনারেল আরবি ভাষা কোর্সে ভর্তি চলছে · অনলাইনে আবেদন করুন", "General Arabic Language Course: admission open · apply online", "دورة اللغة العربية العامة: القبول مفتوح · قدّم إلكترونيًا"),
    "link": "#reg-kq-general-arabic"}

# Recurring programmes and announced events. Dated items are added by the admin when confirmed.
C["events"] = [
    {"id": "ilmi-majlis", "recurring": T("সাপ্তাহিক", "Weekly", "أسبوعي"), "date": "", "time": "", "type": "halaqa",
     "title": T("সাপ্তাহিক ইলমী মাজলিস", "Weekly Ilmi Majlis", "المجلس العلمي الأسبوعي"),
     "venue": T("লাইভ ও রেকর্ড: IBT YouTube চ্যানেল", "Live and recorded on the IBT YouTube channel", "بث مباشر وتسجيل على قناة الوقف في يوتيوب"),
     "link": "https://www.youtube.com/channel/UCm8It2AWLRt3N22-fL89K_w/streams", "registration": ""},
    {"id": "ask-elahi", "recurring": T("ধারাবাহিক প্রশ্নোত্তর", "Q&A series", "سلسلة أسئلة وأجوبة"), "date": "", "time": "", "type": "qa",
     "title": T("Ask Dr Monzur E Elahi: প্রশ্নোত্তর পর্ব", "Ask Dr Monzur E Elahi: Q&A episodes", "اسأل د. منظور إلهي: حلقات أسئلة وأجوبة"),
     "venue": T("IBT YouTube চ্যানেল", "IBT YouTube channel", "قناة الوقف في يوتيوب"),
     "link": "https://www.youtube.com/channel/UCm8It2AWLRt3N22-fL89K_w", "registration": ""},
    {"id": "get-together-2026", "recurring": T("তারিখ ঘোষণা সাপেক্ষে", "Date to be announced", "يُعلن الموعد لاحقًا"), "date": "", "time": "", "type": "event",
     "title": T("IBT ৪র্থ গেট টুগেদার ২০২৬: শাইখদের সান্নিধ্যে একটি দিন", "IBT 4th Get-Together 2026: a day with the Shaikhs", "اللقاء الرابع للوقف 2026: يوم مع المشايخ"),
     "venue": T("বিস্তারিত ভিডিওতে", "Details in the video", "التفاصيل في الفيديو"),
     "video": "8MlFKh__zNg", "registration": ""}
]

C["news"] = [
    {"id": "get-together-2026", "date": "2026-11", "image": "yt:8MlFKh__zNg", "video": "8MlFKh__zNg",
     "title": T("আসছে IBT ৪র্থ গেট টুগেদার ২০২৬", "IBT's 4th Get-Together 2026 is coming", "اللقاء الرابع للوقف 2026 قريبًا"),
     "summary": T("‘শাইখদের সান্নিধ্যে একটি দিন’: সমর্থক ও শুভাকাঙ্ক্ষীদের নিয়ে ইমাম বুখারী ট্রাস্টের চতুর্থ গেট টুগেদার।", "‘A day with the Shaikhs’: Imam Bukhari Trust's fourth get-together for supporters and well-wishers.", "«يوم مع المشايخ»: اللقاء الرابع لوقف الإمام البخاري مع الداعمين والمحبين."),
     "source": "YouTube"},
    {"id": "construction-2026-10", "date": "2026-10", "image": "yt:ViHzrqAKvO8", "video": "ViHzrqAKvO8",
     "title": T("মাসজিদ ও একাডেমিক ভবনের কাজ চলমান", "Work continues on the masjid and academic building", "تواصل العمل في المسجد والمبنى الأكاديمي"),
     "summary": T("নিউ ঢাকা সিটিতে ইমাম বুখারী জামে মাসজিদ ও একাডেমিক ভবনের নির্মাণকাজের সর্বশেষ চিত্র।", "The latest footage of construction of the Imam Bukhari Jame Masjid and academic building at New Dhaka City.", "أحدث مشاهد أعمال بناء جامع الإمام البخاري والمبنى الأكاديمي في مدينة دكا الجديدة."),
     "source": "YouTube"},
    {"id": "pile-cap-2026", "date": "2026-10", "image": "yt:GW_HDHAsbyM", "video": "GW_HDHAsbyM",
     "title": T("একাডেমিক ভবনের পাইল ক্যাপ ঢালাই চলমান", "Pile-cap casting under way for the academic building", "صب رؤوس الخوازيق للمبنى الأكاديمي"),
     "summary": T("১৫৮টি পাইলের ওপর একাডেমিক ভবনের পাইল ক্যাপ ঢালাইয়ের কাজ চলছে।", "Pile caps are being cast over the academic building's 158 piles.", "يجري صب رؤوس الخوازيق فوق 158 خازوقًا للمبنى الأكاديمي."),
     "source": "YouTube · IBT Catalog 2026"},
    {"id": "welfare-2026", "date": "2026-10", "image": "yt:g9lRiceVtBY", "video": "g9lRiceVtBY",
     "title": T("সামাজিক জনকল্যাণমূলক কাজের খণ্ডচিত্র", "Glimpses of our social welfare work", "لقطات من أعمالنا الاجتماعية"),
     "summary": T("ত্রাণ, শীতবস্ত্র, ইফতার ও কুরবানিসহ ইমাম বুখারী ট্রাস্টের জনকল্যাণমূলক কার্যক্রমের ভিডিও।", "A video of IBT's welfare work, including relief, winter clothing, iftar and qurbani.", "فيديو لأعمال الوقف الخيرية من إغاثة وكسوة شتاء وإفطار وأضاحٍ."),
     "source": "YouTube"},
    {"id": "first-prayer", "date": "2026", "image": "img/first-prayer.jpg",
     "title": T("নির্মাণাধীন মাসজিদে সালাত", "Prayer in the masjid under construction", "الصلاة في المسجد قيد الإنشاء"),
     "summary": T("ছাদ ঢালাইয়ের পর নির্মাণাধীন ইমাম বুখারী জামে মাসজিদে জামাআতে সালাত আদায় শুরু হয়েছে, আলহামদুলিল্লাহ।", "Since the roof slabs were cast, congregational prayer has begun in the Imam Bukhari Jame Masjid under construction, alhamdulillah.", "بعد صب الأسقف بدأت صلاة الجماعة في جامع الإمام البخاري قيد الإنشاء، والحمد لله."),
     "source": "IBT Catalog 2026"},
    {"id": "scholars-visit", "date": "2026", "image": "img/scholars-visit.jpg",
     "title": T("নির্মাণকাজ পরিদর্শনে সম্মানিত আলেমগণ", "Respected scholars visit the construction", "علماء أفاضل يزورون موقع البناء"),
     "summary": T("সম্মানিত আলেমগণ ইমাম বুখারী জামে মাসজিদ কমপ্লেক্সের নির্মাণকাজ পরিদর্শন করেন।", "Respected scholars visited the construction of the Imam Bukhari Jame Masjid Complex.", "زار علماء أفاضل أعمال بناء مجمع جامع الإمام البخاري."),
     "source": "IBT Catalog 2026"},
    {"id": "winter-2024", "date": "2024", "image": "img/winter-2024-distribution.jpg",
     "title": T("শীতবস্ত্র বিতরণ ২০২৪", "Winter clothing distribution 2024", "توزيع كسوة الشتاء 2024"),
     "summary": T("শীতার্ত মানুষের মধ্যে শীতবস্ত্র বিতরণ করা হয়।", "Winter clothing was distributed to people in need.", "وُزّعت كسوة الشتاء على المحتاجين."),
     "source": "Google Drive · IBT"},
    {"id": "flood-2024", "date": "2024", "image": "img/relief-flood-1.jpg",
     "title": T("বন্যার্তদের পাশে ইমাম বুখারী ট্রাস্ট", "Standing with flood victims", "إلى جانب منكوبي الفيضانات"),
     "summary": T("২০২৪ সালের বন্যায় ক্ষতিগ্রস্ত এলাকায় ত্রাণ ও পুনর্বাসন সহায়তা দেওয়া হয়।", "Relief and rehabilitation support was provided in areas hit by the 2024 floods.", "قُدّمت الإغاثة ودعم إعادة التأهيل في المناطق المتضررة من فيضانات 2024."),
     "source": "IBT Catalog 2026 · Google Drive"},
    {"id": "sunnah-conf", "date": "2024", "image": "img/sunnah-conference-2024.jpg", "video": "J0WR-qV5Omg",
     "title": T("সুন্নাহ কনফারেন্স বাংলাদেশ ২০২৪", "Sunnah Conference Bangladesh 2024", "مؤتمر السنة في بنغلاديش 2024"),
     "summary": T("কুল্লিয়াতুল কুরআনের আয়োজনে সুন্নাহ কনফারেন্স বাংলাদেশ ২০২৪।", "Sunnah Conference Bangladesh 2024, organised by Kulliyatul Quran.", "مؤتمر السنة في بنغلاديش 2024 بتنظيم كلية القرآن."),
     "source": "YouTube · IBT Catalog 2026"},
    {"id": "kq-academic-inauguration", "date": "2023", "image": "yt:4brggmfTVzc", "video": "4brggmfTVzc",
     "title": T("কুল্লিয়াতুল কুরআনের একাডেমিক ভবন নির্মাণকাজের শুভ উদ্বোধন", "Construction of Kulliyatul Quran's academic building inaugurated", "افتتاح أعمال بناء المبنى الأكاديمي لكلية القرآن"),
     "summary": T("প্রফেসর ড. মোহাম্মদ মানজুরে ইলাহীর উপস্থিতিতে একাডেমিক ভবনের নির্মাণকাজের উদ্বোধন।", "The start of construction of the academic building, with Prof. Dr. Mohammad Manzur-e-Elahi.", "افتتاح أعمال بناء المبنى الأكاديمي بحضور أ.د. محمد منظور إلهي."),
     "source": "YouTube"}
]

C["reports"] = [
    {"title": T("ইমাম বুখারী ট্রাস্ট ক্যাটালগ ২০২৬", "Imam Bukhari Trust Catalog 2026", "كتيّب وقف الإمام البخاري 2026"), "type": "publication", "year": "2026", "url": "files/IBT_Catalog_2026.pdf", "note": T("PDF ডাউনলোড", "Download PDF", "تحميل PDF")}
]

C["payment"]["channels"] = [
    {"type": "bkash", "name": T("বিকাশ ১ (মার্চেন্ট)", "bKash 1 (Merchant)", "بيكاش 1 (تاجر)"), "number": "01898-940943", "note": T("বিকাশ অ্যাপে “Payment” অপশন ব্যবহার করুন", "Use the “Payment” option in the bKash app", "استخدم خيار «Payment» في تطبيق بيكاش"), "show": True},
    {"type": "bkash", "name": T("বিকাশ ২ (মার্চেন্ট)", "bKash 2 (Merchant)", "بيكاش 2 (تاجر)"), "number": "01852-808554", "note": T("বিকাশ অ্যাপে “Payment” অপশন ব্যবহার করুন", "Use the “Payment” option in the bKash app", "استخدم خيار «Payment» في تطبيق بيكاش"), "show": True},
    {"type": "nagad", "name": T("নগদ (পার্সোনাল)", "Nagad (Personal)", "نقد (شخصي)"), "number": "01306-746437", "note": T("“Send Money” করুন", "Use “Send Money”", "استخدم «إرسال المال»"), "show": True},
    {"type": "rocket", "name": T("রকেট (পার্সোনাল)", "Rocket (Personal)", "روكيت (شخصي)"), "number": "01306-746437", "note": T("“Send Money” করুন", "Use “Send Money”", "استخدم «إرسال المال»"), "show": True},
    {"type": "bank", "name": T("ইসলামী ব্যাংক বাংলাদেশ লিমিটেড", "Islami Bank Bangladesh Ltd.", "بنك إسلامي بنغلاديش المحدود"), "number": "2050 2230 2018 75016",
     "note": T("হিসাবের নাম: IMAM BUKHARI JAME MASJID COMPLEX, BANGLADESH · ভিআইপি রোড শাখা, ঢাকা · SWIFT: IBBLBDDH223 · রাউটিং: 125276856",
               "Account name: IMAM BUKHARI JAME MASJID COMPLEX, BANGLADESH · VIP Road Branch, Dhaka · SWIFT: IBBLBDDH223 · Routing: 125276856",
               "اسم الحساب: IMAM BUKHARI JAME MASJID COMPLEX, BANGLADESH · فرع طريق VIP، دكا · SWIFT: IBBLBDDH223 · رقم التوجيه: 125276856"), "show": True}
]
C["payment"]["source"] = "https://www.facebook.com/imambukharitrustbd"
C["payment"]["review"] = False

C["donateCopy"]["transparency"] = T(
    "দান করার সময় খাত (তহবিল) বেছে নিন। দান জানানোর ফরমে খাত ও ট্রানজেকশন আইডি দিলে হিসাব বিভাগ সেই খাতে লিপিবদ্ধ করে।",
    "Choose a fund when you give. When you report your donation with the fund and transaction ID, the accounts team records it against that fund.",
    "اختر الصندوق عند التبرع. وعند إبلاغنا بالتبرع مع الصندوق ورقم العملية، يسجله قسم الحسابات في ذلك الصندوق.")

C["faqs"][0] = {"q": T("আমার দান নির্দিষ্ট খাতে দিতে চাইলে কী করব?", "How do I give to a specific fund?", "كيف أتبرع لصندوق محدد؟"),
                "a": T("দানের পর ‘দান জানান’ ফরমে খাত, পরিমাণ ও ট্রানজেকশন আইডি দিন। বিস্তারিত জানতে +880 1852-808554 নম্বরে যোগাযোগ করুন।", "After giving, use the ‘Report your donation’ form with the fund, amount and transaction ID. For details call +880 1852-808554.", "بعد التبرع استخدم نموذج «أبلغ عن تبرعك» مع الصندوق والمبلغ ورقم العملية. للتفاصيل اتصل على ‎+880 1852-808554.")}
C["faqs"][1] = {"q": T("আপনাদের কি অনলাইন কোর্স আছে?", "Do you offer online courses?", "هل لديكم دورات عن بُعد؟"),
                "a": T("কুল্লিয়াতুল কুরআনের কোর্সগুলো বর্তমানে অফলাইনে, ক্যাম্পাসে সরাসরি। আলোচনা ও প্রশ্নোত্তর YouTube চ্যানেলে দেখা যায়।", "Kulliyatul Quran's courses are currently held in person on campus. Talks and Q&A sessions are available on YouTube.", "دورات كلية القرآن حاليًا حضورية في الحرم، والدروس وجلسات الأسئلة متاحة على يوتيوب.")}

# remove the unsourced completion target from the documentary
for s in C["stories"]:
    for ch in s.get("chapters", []):
        if "২০২৭" in ch.get("text", {}).get("bn", ""):
            ch["text"] = T("মাসজিদের ওপরের তলাগুলো ও একাডেমিক ভবনের কাজ সামনে। আপনার সাদাকাহ এই যাত্রার অংশ হতে পারে।",
                           "The masjid's upper floors and the academic building lie ahead. Your sadaqah can be part of this journey.",
                           "أمامنا الطوابق العليا للمسجد والمبنى الأكاديمي، وصدقتك يمكن أن تكون جزءًا من هذه الرحلة.")

C["ui"].update({
    "reg_info": T("বিস্তারিত তথ্য", "Details", "التفاصيل"),
    "reg_needs_info": T("তথ্য শীঘ্রই যোগ হবে", "Details coming soon", "التفاصيل قريبًا"),
    "fees": T("ফি কাঠামো", "Fees", "الرسوم"),
    "eligibility": T("ভর্তির যোগ্যতা", "Eligibility", "شروط القبول"),
    "course_facts": T("কোর্স পরিচিতি", "About the course", "عن الدورة"),
    "contact_office": T("ভর্তি ও বিস্তারিত তথ্যের জন্য যোগাযোগ করুন", "Contact us for admission and details", "تواصل معنا للقبول والتفاصيل"),
    "official_page": T("অফিসিয়াল পেজ", "Official page", "الصفحة الرسمية"),
    "programmes": T("নিয়মিত কার্যক্রম", "Regular programmes", "البرامج المنتظمة"),
    "watch": T("ভিডিও দেখুন", "Watch video", "شاهد الفيديو"),
    "all_videos": T("সব ভিডিও", "All videos", "كل الفيديوهات"),
    "live": T("লাইভ", "Live", "مباشر"),
    "load_more": T("আরও দেখুন", "Load more", "عرض المزيد"),
    "search_videos": T("ভিডিও খুঁজুন…", "Search videos…", "ابحث في الفيديوهات…"),
    "playlists": T("প্লেলিস্ট", "Playlists", "قوائم التشغيل"),
    "latest_videos": T("সাম্প্রতিক ভিডিও", "Latest videos", "أحدث الفيديوهات"),
    "subscribe": T("সাবস্ক্রাইব", "Subscribe", "اشترك"),
    "video_count": T("টি ভিডিও", " videos", " فيديو"),
    "photo_story": T("ছবিতে", "In pictures", "بالصور"),
    "open_youtube": T("YouTube-এ খুলুন", "Open on YouTube", "افتح في يوتيوب")
})

# Home: real photos for each area of work, and a facts strip with sources
_pimg = {"research": "img/sunnah-conference-2024.jpg", "education": "img/halaqa-class.jpg", "dawah": "img/chairman-speech.jpg",
         "masjid": "img/first-prayer.jpg", "social": "img/winter-2024-distribution.jpg"}
for p in C["home"]["pillars"]:
    p["image"] = _pimg.get(p["icon"], p.get("image", ""))
C["home"]["facts"] = [
    {"value": "2017", "plain": True, "label": T("সালে আনুষ্ঠানিক যাত্রা শুরু", "formal work began", "انطلاق العمل رسميًا")},
    {"value": "225", "label": T("পাইলের কাজ সম্পন্ন (মাসজিদ ও একাডেমিক ভবন)", "piles completed (masjid & academic building)", "خازوقًا مكتملًا (المسجد والمبنى الأكاديمي)")},
    {"value": "16800", "label": T("ঘণ্টা কুরআন-সুন্নাহভিত্তিক লেকচার ও দারস", "hours of Qur'an-and-Sunnah lectures", "ساعة من الدروس والمحاضرات")},
    {"value": "6", "label": T("জন শিক্ষার্থী আন্তর্জাতিক বিশ্ববিদ্যালয়ে উচ্চশিক্ষায়", "students admitted to international universities", "طلاب قُبلوا في جامعات دولية")}
]
C["home"]["factsSource"] = T("সূত্র: IBT ক্যাটালগ ২০২৬", "Source: IBT Catalog 2026", "المصدر: كتيّب الوقف 2026")

# Kulliyatul Quran academic committee (kulliyatulquran.com/members); photos are served from the Kulliyatul Quran website
_up = "https://api.kulliyatulquran.com/uploads/"
C["scholars"] = [
    {"name": T("শাইখ প্রফেসর ড. মোহাম্মদ মানজুরে ইলাহী", "Shaikh Prof. Dr. Mohammad Manzur-e-Elahi"), "role": T("পিএইচডি, মদিনা ইসলামী বিশ্ববিদ্যালয়", "PhD, Islamic University of Madinah"), "photo": _up + "dr_manzureelahi_71cac0175c.jpeg"},
    {"name": T("শাইখ ড. আবু বকর মুহাম্মাদ যাকারিয়া", "Shaikh Dr. Abu Bakr Muhammad Zakaria"), "role": T("পিএইচডি, মদিনা ইসলামী বিশ্ববিদ্যালয়", "PhD, Islamic University of Madinah"), "photo": _up + "dr_abu_bakr_zakaria_28c19fd192.jpeg"},
    {"name": T("শাইখ ড. মুহাম্মাদ সাইফুল্লাহ", "Shaikh Dr. Muhammad Saifullah"), "role": T("পিএইচডি, মদিনা ইসলামী বিশ্ববিদ্যালয়", "PhD, Islamic University of Madinah"), "photo": _up + "dr_saifullah_6167b03d72.jpeg"},
    {"name": T("শাইখ ড. ইমাম হোসাইন", "Shaikh Dr. Imam Hossain"), "role": T("সহযোগী অধ্যাপক, আরবি বিভাগ, জাতীয় বিশ্ববিদ্যালয়", "Associate Professor of Arabic, National University"), "photo": _up + "dr_imam_hossain_f3a718f49e.jpeg"},
    {"name": T("শাইখ ড. রেজাউল করীম", "Shaikh Dr. Rezaul Karim"), "role": T("পিএইচডি, মদিনা ইসলামী বিশ্ববিদ্যালয়", "PhD, Islamic University of Madinah"), "photo": _up + "dr_reza_22239af86a.jpeg"},
    {"name": T("শাইখ ড. আব্দুল্লাহিল কাফী বিন লুৎফর রহমান", "Shaikh Dr. Abdullahil Kafi bin Lutfor Rahman"), "role": T("পিএইচডি, মদিনা ইসলামী বিশ্ববিদ্যালয়", "PhD, Islamic University of Madinah"), "photo": _up + "dr_abdullah_hil_kafi_6d3082bcb6.jpeg"},
    {"name": T("এম. এম. ফজলে রাব্বি", "M. M. Fazle Rabbi"), "role": T("সহকারী অধ্যাপক, বাংলাদেশ ইউনিভার্সিটি অব বিজনেস অ্যান্ড টেকনোলজি", "Assistant Professor, Bangladesh University of Business and Technology"), "photo": _up + "fazle_rabbi_7fde53b4cc.jpeg"},
    {"name": T("ড. মোহাম্মদ নাছির উদ্দীন", "Dr. Mohammad Nasir Uddin"), "role": T("অধ্যাপক, ইসলামী বিশ্ববিদ্যালয়, কুষ্টিয়া", "Professor, Islamic University, Kushtia"), "photo": _up + "Prof_Dr_Nasir_Uddin_12763fb144.jpg"}
]
C["ui"].update({
    "academic_committee": T("একাডেমিক কমিটি", "Academic committee", "اللجنة الأكاديمية"),
    "construction_progress": T("নির্মাণ অগ্রগতি", "Construction progress", "تقدم البناء"),
    "our_work": T("আমাদের কাজ", "Our work", "أعمالنا"),
    "activities": T("সাম্প্রতিক কার্যক্রম", "Recent activities", "الأنشطة الأخيرة"),
    "give_now": T("এখনই দান করুন", "Give now", "تبرّع الآن"),
    "donate_band": T("মাসজিদ ও শিক্ষা কার্যক্রমে আপনার সাদাকাহ", "Your sadaqah for the masjid and education", "صدقتك للمسجد والتعليم"),
    "newest": T("নতুন", "New", "جديد")
})

# Masjid floors: a video from July 2026 shows the second roof slab; floors above are not yet confirmed
C["floors"]["mosque"][3]["status"] = "planned"
C["floors"]["asOf"] = "2026-10"
C["news"].insert(4, {"id": "second-roof-2026", "date": "2026-07", "image": "yt:UpmANHHV-NQ", "video": "UpmANHHV-NQ",
    "title": T("মাসজিদের দ্বিতীয় ছাদের বর্তমান অবস্থা", "The masjid's second roof slab", "السقف الثاني للمسجد"),
    "summary": T("ইমাম বুখারী জামে মাসজিদের দ্বিতীয় ছাদের কাজের ভিডিও আপডেট।", "A video update on the Imam Bukhari Jame Masjid's second roof slab.", "تحديث مصوّر عن السقف الثاني لجامع الإمام البخاري."),
    "source": "YouTube"})
C["ui"]["chairman_title"] = T("চেয়ারম্যান", "Chairman", "رئيس مجلس الإدارة")
