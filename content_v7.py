# v7 (21 Nov 2026): Get-Together 16 Dec registration (from IBT's Facebook post), Model Madrasa & After School admission open
GT_URL = "https://forms.gle/eGeHpiT1T27tfw9i6"
GT_TITLE = T("বার্ষিক দ্বীনি ফ্যামিলি গেট-টুগেদার ২০২৬ (IBT ৪র্থ গেট টুগেদার)", "Annual Family Get-Together 2026 (IBT's 4th)", "اللقاء العائلي السنوي 2026 (اللقاء الرابع للوقف)")
GT_TEXT = T("শহরের ব্যস্ততা থেকে দূরে, সবুজ প্রকৃতির মাঝে শায়খগণ ও দ্বীনি পরিবারগুলোর সঙ্গে একটি আনন্দময় ও শিক্ষণীয় দিন: ইলম, সোহবত ও ভ্রাতৃত্বের আয়োজন। সপরিবারে অংশ নিতে রেজিস্ট্রেশন করুন।",
            "A joyful, learning-filled day with the Shaikhs and practising families, away from the city in green surroundings: knowledge, companionship and brotherhood. Register to attend with your family.",
            "يوم مبهج ونافع مع المشايخ والأسر المتدينة بعيدًا عن صخب المدينة وسط الطبيعة: علم وصحبة وأخوّة. سجّل لتحضر مع أسرتك.")
GT_VENUE = T("নিউ ঢাকা সিটি রিসোর্ট, পলাশপুর, ঢাকা–মাওয়া হাইওয়ে", "New Dhaka City Resort, Palashpur, Dhaka–Mawa Highway", "منتجع مدينة دكا الجديدة، بلاشبور، طريق دكا–ماوا")
C["registrations"].insert(0, {"id": "get-together-2026", "slug": "get-together-2026", "type": "event", "entity": "", "image": "img/event-gettogether.jpg", "status": "open", "opens": "", "closes": "2026-12-16",
  "mode": "link", "formUrl": GT_URL, "title": GT_TITLE, "text": GT_TEXT,
  "facts": [T("তারিখ: ১৬ ডিসেম্বর ২০২৬, বুধবার", "Date: Wednesday, 16 December 2026", "التاريخ: الأربعاء 16 ديسمبر 2026"),
            T("সময়: সকাল ৬:৩০ থেকে", "Time: from 6:30 am", "الوقت: من 6:30 صباحًا"),
            T("সপরিবারে অংশগ্রহণের সুযোগ", "Families are welcome", "الأسر مرحّب بها"),
            T("যোগাযোগ: 01898-940943, 01852-808554", "Contact: 01898-940943, 01852-808554", "للتواصل: 01898-940943، 01852-808554")],
  "eligibility": [], "fees": [], "venue": GT_VENUE, "source": "https://www.facebook.com/imambukharitrustbd"})
for e in C["events"]:
    if e["id"] == "get-together-2026":
        e.update({"date": "2026-12-16", "time": "06:30", "recurring": T("", "", ""), "venue": GT_VENUE, "registration": GT_URL, "title": GT_TITLE})
C["settings"]["announcement"] = {"show": True, "link": "#reg-get-together-2026",
  "text": T("১৬ ডিসেম্বর বার্ষিক দ্বীনি ফ্যামিলি গেট-টুগেদার · রেজিস্ট্রেশন চলছে", "16 Dec Family Get-Together · registration open", "اللقاء العائلي 16 ديسمبر · التسجيل مفتوح")}

ADM_FIELDS = [["student", "text", True, None, "student_name"], ["guardian", "text", True, None, "guardian_name"], ["phone", "tel", True], ["age_class", "text", True, None, "age_class"], ["message", "textarea", False]]
for r in C["registrations"]:
    if r["id"] == "model-madrasa":
        r.update({"status": "open", "mode": "native", "needsInfo": False, "formType": "admission",
          "text": T("কুল্লিয়াতুল কুরআন মডেল মাদরাসায় ভর্তি চলছে। নিচের ফরমে শিক্ষার্থীর তথ্য দিন; অফিস থেকে যোগাযোগ করে শ্রেণি, আসন ও ফি জানানো হবে।",
                    "Admission to Kulliyatul Quran Model Madrasa is open. Submit the student's details below and the office will contact you about class, seats and fees.",
                    "القبول في مدرسة كلية القرآن النموذجية مفتوح. أرسل بيانات الطالب وسيتواصل المكتب معك بشأن الصف والمقاعد والرسوم.")})
    if r["id"] == "after-school":
        r.update({"status": "open", "mode": "native", "needsInfo": False, "type": "admission", "fields": ADM_FIELDS,
          "title": T("কুল্লিয়াতুল কুরআন আফটার স্কুল: ভর্তি", "Kulliyatul Quran After School: admission", "برنامج كلية القرآن بعد المدرسة: القبول"),
          "text": T("স্কুলের পাশাপাশি কুরআন ও দ্বীনি শিক্ষার জন্য আফটার স্কুলে ভর্তি চলছে। ফরম পূরণ করুন; ব্যাচ, সময় ও ফি অফিস থেকে জানানো হবে।",
                    "Admission is open for After School, Quran and Islamic learning alongside regular school. Fill in the form and the office will share batches, timings and fees.",
                    "القبول مفتوح في برنامج ما بعد المدرسة لتعلم القرآن والعلوم الشرعية. املأ النموذج وسيرسل المكتب الدفعات والمواعيد والرسوم.")})
U = C["ui"]
U["student_name"] = T("শিক্ষার্থীর নাম", "Student's name", "اسم الطالب")
U["guardian_name"] = T("অভিভাবকের নাম", "Guardian's name", "اسم ولي الأمر")
U["age_class"] = T("বয়স / যে শ্রেণিতে ভর্তি হতে চায়", "Age / class sought", "العمر / الصف المطلوب")
U["send_by_email"] = T("ইমেইলে পাঠান", "Send by email", "أرسل بالبريد")
U["at_a_glance"] = T("এক নজরে", "At a glance", "نظرة سريعة")
