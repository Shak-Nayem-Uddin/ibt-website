# v11 (22 Nov 2026): chairman designation and portrait, sister concerns, social-welfare programmes,
# programme & course archive (titles and dates from IBT's Program Participate Data sheet; no personal data).
C["chairman"]["photo"] = "img/chairman.webp"
C["chairman"]["designation"] = T("প্রফেসর, জাতীয় বিশ্ববিদ্যালয়, বাংলাদেশ", "Professor, National University, Bangladesh", "أستاذ، الجامعة الوطنية، بنغلاديش")
C["chairman"]["role"] = T("চেয়ারম্যান, ইমাম বুখারী ট্রাস্ট · প্রফেসর, জাতীয় বিশ্ববিদ্যালয়, বাংলাদেশ · প্রতিষ্ঠাতা, কুল্লিয়াতুল কুরআন",
                          "Chairman, Imam Bukhari Trust · Professor, National University, Bangladesh · Founder, Kulliyatul Quran",
                          "رئيس وقف الإمام البخاري · أستاذ، الجامعة الوطنية، بنغلاديش · مؤسس كلية القرآن")

C["sisters"] = [
  {"id": "kulliyatul-quran", "logo": "img/logo-kq.png", "url": "https://www.kulliyatulquran.com", "inst": "kulliyatul-quran",
   "name": T("কুল্লিয়াতুল কুরআনিল কারীম ওয়াদ-দিরাসাতিল ইসলামিয়্যাহ", "Kulliyatul Quranil Kareem Waddirasatil Islamiyah", "كلية القرآن الكريم والدراسات الإسلامية"),
   "text": T("কুরআন ও সুন্নাহভিত্তিক উচ্চতর ইসলামী শিক্ষা: সানাবিয়্যাহ, কুল্লিয়্যাহ ও বিভিন্ন কোর্স।", "Higher Islamic education based on the Qur'an and Sunnah: Sanabiyyah, Kulliyyah and courses.", "تعليم إسلامي عالٍ على الكتاب والسنة: الثانوية والكلية والدورات.")},
  {"id": "model-madrasa", "logo": "img/logo-kq.png", "url": "https://www.kulliyatulquran.com/p/kulliyatul-quran-model-madrasah", "inst": "model-madrasa",
   "name": T("কুল্লিয়াতুল কুরআন মডেল মাদরাসা", "Kulliyatul Quran Model Madrasah", "مدرسة كلية القرآن النموذجية"),
   "text": T("শিশুদের জন্য কুরআন, আদব ও আধুনিক শিক্ষার সমন্বিত মাদরাসা।", "An integrated madrasah for children: Qur'an, adab and modern subjects.", "مدرسة متكاملة للأطفال: القرآن والأدب والعلوم الحديثة.")},
  {"id": "after-school", "logo": "img/logo-kq.png", "url": "https://www.kulliyatulquran.com/p/kulliyatul-quran-after-school", "inst": "after-school",
   "name": T("কুল্লিয়াতুল কুরআন আফটার স্কুল", "Kulliyatul Quran After School", "برنامج ما بعد المدرسة لكلية القرآن"),
   "text": T("স্কুলগামী শিক্ষার্থীদের জন্য তা'লীমুল কুরআন, হিফজ, তারবিয়াহ ও আরবি ভাষা।", "Ta'limul Qur'an, hifz, tarbiyah and Arabic for school-going students.", "تعليم القرآن والتحفيظ والتربية والعربية لطلاب المدارس.")},
  {"id": "taibah-academy", "logo": "img/logo-taibah-academy.png", "url": "https://taibahacademy.com",
   "name": T("তাইবাহ একাডেমি", "Taibah Academy", "أكاديمية طيبة"),
   "text": T("বাংলা ভাষায় বিশুদ্ধ ইসলামী জ্ঞান অর্জনের অনলাইন শিক্ষা প্ল্যাটফর্ম।", "An online learning platform for authentic Islamic knowledge in Bengali.", "منصة تعليمية إلكترونية للعلم الشرعي باللغة البنغالية.")},
  {"id": "taibah-publisher", "logo": "", "url": "", "mono": "ت",
   "name": T("তাইবাহ পাবলিশার", "Taibah Publisher", "دار طيبة للنشر"),
   "text": T("ইসলামী গ্রন্থ ও শিক্ষা উপকরণ প্রকাশনা।", "Publishing Islamic books and learning materials.", "نشر الكتب الإسلامية والمواد التعليمية.")},
]

C["welfareProgs"] = [
  {"id": "winter", "icon": "heart", "image": "img/winter-2024-distribution.webp", "fund": "winter", "stat": "400+",
   "title": T("শীতবস্ত্র বিতরণ", "Winter clothing", "كسوة الشتاء"),
   "statLabel": T("পরিবার শীতবস্ত্র পেয়েছে", "families received winter clothes", "أسرة تلقت كسوة الشتاء"),
   "text": T("শীতপ্রবণ ও প্রত্যন্ত অঞ্চলে অসহায় পরিবারের মাঝে কম্বল ও শীতবস্ত্র বিতরণ।", "Blankets and warm clothes for families in need in cold and remote areas.", "توزيع البطانيات والملابس الشتوية على الأسر المحتاجة في المناطق الباردة والنائية.")},
  {"id": "iftar", "icon": "moon", "image": "img/doc-iftar.webp", "fund": "iftar", "stat": "300+",
   "title": T("ইফতার ও খাদ্য সহায়তা", "Iftar and food support", "الإفطار والدعم الغذائي"),
   "statLabel": T("দরিদ্র পরিবার ইফতার/খাদ্য সহায়তা পেয়েছে", "poor families received iftar or food", "أسرة فقيرة تلقت إفطارًا أو غذاءً"),
   "text": T("রমাদানে গ্রামীণ দরিদ্র পরিবার ও রোজাদারদের জন্য ইফতার ও খাদ্যসামগ্রী।", "Iftar and food packs in Ramadan for poor rural families and those fasting.", "وجبات إفطار وسلال غذائية في رمضان للأسر الريفية الفقيرة والصائمين.")},
  {"id": "relief", "icon": "relief", "image": "img/relief-flood-1.webp", "fund": "relief", "stat": "100+",
   "title": T("বন্যা ত্রাণ ও পুনর্বাসন", "Flood relief and rehabilitation", "إغاثة الفيضانات وإعادة التأهيل"),
   "statLabel": T("বন্যার্ত পরিবার সহায়তা পেয়েছে", "flood-affected families supported", "أسرة متضررة من الفيضانات تلقت الدعم"),
   "text": T("নৌকায় করে আটকে পড়া পরিবারের কাছে ত্রাণ; বন্যার পর ঘর নির্মাণ সামগ্রী, টিউবওয়েল, গবাদি পশু ও আর্থিক সহায়তা।", "Relief by boat to stranded families; after the flood, building materials, tube-wells, livestock and cash support.", "إغاثة بالقوارب للأسر المحاصرة، وبعد الفيضان مواد بناء وآبار وماشية ودعم مالي.")},
  {"id": "qurbani", "icon": "heart", "image": "", "fund": "sadaqah", "stat": "90+",
   "title": T("কুরবানি প্রকল্প", "Qurbani project", "مشروع الأضاحي"),
   "statLabel": T("পরিবার কুরবানির মাংস পেয়েছে", "families received qurbani meat", "أسرة تلقت لحم الأضاحي"),
   "text": T("ঈদুল আযহায় অসচ্ছল পরিবারের কাছে কুরবানির মাংস পৌঁছে দেওয়া।", "Qurbani meat delivered to families in need at Eid al-Adha.", "إيصال لحوم الأضاحي إلى الأسر المحتاجة في عيد الأضحى.")},
  {"id": "medical", "icon": "relief", "image": "img/doc-july-medical.webp", "fund": "sadaqah", "stat": "20+",
   "title": T("চিকিৎসা সহায়তা", "Medical support", "الدعم الطبي"),
   "statLabel": T("চিকিৎসা সেবা প্রদান", "medical cases supported", "حالة علاجية مدعومة"),
   "text": T("অসহায় রোগীদের চিকিৎসা খরচে সহায়তা, জুলাই ২০২৪-এ আহত শিক্ষার্থীদের চিকিৎসা খরচ এবং আলেমদের স্বাস্থ্যসেবা।", "Help with treatment costs for patients in need, including students injured in July 2024, and healthcare for scholars.", "المساعدة في تكاليف العلاج للمرضى المحتاجين، ومنهم الطلاب المصابون في يوليو 2024، والرعاية الصحية للعلماء.")},
  {"id": "july", "icon": "heart", "image": "img/doc-july-relief.webp", "fund": "sadaqah", "stat": "",
   "title": T("দুর্যোগ ও জরুরি সহায়তা", "Emergency support", "الدعم الطارئ"),
   "statLabel": T("", "", ""),
   "text": T("জুলাই ২০২৪-এর পর ট্রাফিকের দায়িত্বে থাকা শিক্ষার্থীদের মাঝে নাস্তা ও পানি বিতরণসহ জরুরি মুহূর্তে মানুষের পাশে দাঁড়ানো।", "Standing with people in emergencies, including snacks and water for students directing traffic after July 2024.", "الوقوف مع الناس في الطوارئ، ومنه توزيع الوجبات والماء على الطلاب المنظمين للمرور بعد يوليو 2024.")},
  {"id": "scholarship", "icon": "education", "image": "", "fund": "scholarship", "stat": "",
   "title": T("শিক্ষাবৃত্তি ও শিক্ষার্থী সহায়তা", "Scholarships and student support", "المنح ودعم الطلاب"),
   "statLabel": T("", "", ""),
   "text": T("মেধাবী ও অসচ্ছল শিক্ষার্থীদের পড়াশোনা চালিয়ে যেতে শিক্ষাবৃত্তি ও সহায়তা।", "Scholarships and support so that able students in need can continue their studies.", "منح ودعم ليواصل الطلاب المتفوقون المحتاجون دراستهم.")},
  {"id": "trees", "icon": "leaf", "image": "", "fund": "sadaqah", "stat": "",
   "title": T("বৃক্ষরোপণ ও সাদাকাহ", "Tree planting and sadaqah", "التشجير والصدقة"),
   "statLabel": T("", "", ""),
   "text": T("বৃক্ষরোপণ কর্মসূচি এবং দরিদ্রদের জন্য নিয়মিত সাদাকাহ।", "Tree-planting drives and regular sadaqah for the poor.", "حملات تشجير وصدقة منتظمة للفقراء.")},
]

U = C["ui"]
U["nav_sisters"] = T("সহযোগী প্রতিষ্ঠান", "Sister concerns", "المؤسسات الشقيقة")
U["nav_programs"] = T("কর্মসূচি ও কোর্স আর্কাইভ", "Programmes & courses archive", "أرشيف البرامج والدورات")
