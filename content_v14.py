# v14 (23 Nov 2026): campus model follows the master plan exactly (IBT management, 23 Nov):
# the Taibah tower stands with the masjid and the other blocks with the academic building.
# The earlier masjid/academic exchange (v10) is undone and the plan is no longer mirrored (z is
# negated so that the model reads like the drawing, viewed from its lower edge).
_mp = C["masterplan"]; _g = {g["id"]: g for g in _mp["groups"]}
_pm = _g["masjid-complex"]["parts"][0]; _pa = [p for p in _g["academic-1"]["parts"] if p.get("status") == "academic"][0]
if _pm["z"] > _pa["z"]: _pm["z"], _pa["z"] = _pa["z"], _pm["z"]
for _gp in _mp["groups"]:
    for _p in _gp["parts"]: _p["z"] = round(-_p["z"], 2)
_mp["context"] = [[c[0], round(-c[1], 2)] + list(c[2:]) for c in _mp["context"]]

# ---------- information from IBT documents (PPT "IBT Eng version V4", Executive Summary,
# "Why this project is significant for the South Asian context", Masjid Complex donor brief) ----------
C["ibjmcInfo"] = {
  "dream": T("মাসজিদে নববী ও রাসূলুল্লাহ ﷺ-এর সীরাতের আলোকে একটি জ্ঞানভিত্তিক ইসলামী কমিউনিটি গড়ে তোলা।",
             "To create a knowledge-based Islamic community in the light of Masjid An-Nabawi and the Seerah of our beloved Prophet Muhammad ﷺ.",
             "إقامة مجتمع إسلامي قائم على العلم على هدي المسجد النبوي وسيرة النبي ﷺ."),
  "facts": {
    "mosque": [
      [T("ভবন", "Building", "المبنى"), T("৬ তলা", "6 storeys", "6 طوابق")],
      [T("মোট সালাতের জায়গা", "Total prayer space", "مساحة الصلاة"), T("২০,৭৪১ বর্গফুট", "20,741 sq ft", "20,741 قدم مربع")],
      [T("জমি", "Land", "الأرض"), T("১৩.৩৮ কাঠা (৯,৩৬০ বর্গফুট)", "13.38 katha (9,360 sq ft)", "13.38 كاثا (9,360 قدم مربع)")],
      [T("গ্রাউন্ড কভারেজ", "Ground coverage", "المساحة المبنية بالأرض"), T("৭,৩৬০ বর্গফুট", "7,360 sq ft", "7,360 قدم مربع")]],
    "academic": [
      [T("ভবন", "Building", "المبنى"), T("১০ তলা", "10 storeys", "10 طوابق")],
      [T("শ্রেণিকক্ষ", "Classrooms", "الفصول"), T("৭০টি, প্রতিটিতে ৩০ জন", "70, 30 students each", "70 فصلًا، 30 طالبًا لكل فصل")],
      [T("শিক্ষার্থী ধারণক্ষমতা", "Student capacity", "السعة"), T("২,১০০ জন", "2,100", "2,100 طالب")],
      [T("জমি", "Land", "الأرض"), T("২৬.৮১ কাঠা (১৯,৩০৫ বর্গফুট)", "26.81 katha (19,305 sq ft)", "26.81 كاثا (19,305 قدم مربع)")],
      [T("গ্রাউন্ড কভারেজ", "Ground coverage", "المساحة المبنية بالأرض"), T("১৩,২১১ বর্গফুট", "13,211 sq ft", "13,211 قدم مربع")]]},
  "location": [
    T("ঢাকার জিরো পয়েন্ট থেকে ১৫ কিমি", "15 km from Dhaka's Zero Point", "15 كم من النقطة صفر في دكا"),
    T("বাবুবাজার ব্রিজ থেকে ৮ কিমি", "8 km from Babubazar Bridge", "8 كم من جسر بابوبازار"),
    T("পদ্মা সেতু থেকে ২৬ কিমি", "26 km from the Padma Bridge", "26 كم من جسر بادما"),
    T("ধলেশ্বরী নদীর তীরে, নিউ ঢাকা সিটি", "On the bank of the Dhaleshwari, New Dhaka City", "على ضفة نهر دهاليشوري، مدينة دكا الجديدة")],
  "why": [
    ["quran", T("কুরআন ও বিশুদ্ধ সুন্নাহর ভিত্তিতে", "Built on the Qur'an and authentic Sunnah", "على الكتاب والسنة الصحيحة"), T("নির্ভরযোগ্য আলেমদের তত্ত্বাবধানে পরিচালিত হবে এবং কুরআন-সুন্নাহর বিশুদ্ধ জ্ঞান ছড়িয়ে দেবে।", "Run by authentic scholars, spreading sound knowledge of the Qur'an and Sunnah.", "")],
    ["education", T("শিক্ষা ও দাওয়াহ সেন্টার", "Education and Dawah centre", "مركز التعليم والدعوة"), T("শর্ট কোর্স, প্রশিক্ষণ, সেমিনার ও কনফারেন্স, হিফজুল কুরআন ও কুরআন শিক্ষা; নারী ও শিশুদের জন্য আলাদা কোর্স।", "Short courses, trainings, seminars and conferences, Hifzul Qur'an and Qur'an teaching, and separate courses for women and children.", "")],
    ["user", T("আবাসিক আলেম", "Residential scholar", "عالم مقيم"), T("সব বয়সের মানুষের পরামর্শ ও কাউন্সেলিংয়ের জন্য কমিউনিটিতে সার্বক্ষণিক একজন আলেম।", "A scholar living with the community, whom people of all ages can approach for advice and counselling.", "")],
    ["family", T("সামাজিক কার্যক্রম", "Social activities", "الأنشطة الاجتماعية"), T("গেট-টুগেদার, বিয়ের আয়োজন ও প্রতিযোগিতার মাধ্যমে হালাল সাংস্কৃতিক পরিবেশ।", "Get-togethers, wedding programmes and competitions that keep the community in a halal cultural environment.", "")],
    ["studio", T("প্রযুক্তিনির্ভর দাওয়াহ সেন্টার", "Technology-driven Dawah centre", "مركز دعوة تقني"), T("অনলাইন লেকচার, কর্মশালা, কোর্স ও সোশ্যাল মিডিয়ায় বিশ্বব্যাপী দর্শকের কাছে বিশুদ্ধ জ্ঞান।", "Online lectures, workshops, courses and social media to reach a global audience with authentic knowledge.", "")],
    ["home", T("মাসজিদকেন্দ্রিক কমিউনিটি", "A masjid-centred community", "مجتمع محوره المسجد"), T("রাসূলুল্লাহ ﷺ-এর আদর্শে ইবাদত, শিক্ষা, সমাজকল্যাণ ও ঐক্যের কেন্দ্র হিসেবে মাসজিদ।", "Following the Prophet ﷺ, the masjid as the centre of worship, education, welfare and unity.", "")],
    ["women", T("নারী ও শিশুদের জন্য চমৎকার সুবিধা", "Excellent facilities for women and children", "مرافق متميزة للنساء والأطفال"), T("নিবেদিত সালাতের স্থান, শিক্ষা কার্যক্রম ও পরিবারবান্ধব পরিবেশ।", "Dedicated prayer spaces, educational programmes and family-friendly amenities.", "")]],
  "interiors": {
    "mosque": [["img/int-masjid-prayer.webp", T("সালাতের স্থান", "Prayer hall", "مصلى")], ["img/int-masjid-mehrab.webp", T("মেহরাব", "Mihrab", "المحراب")], ["img/int-masjid-entrance.webp", T("মাসজিদের প্রবেশপথ", "Entrance of the masjid", "مدخل المسجد")], ["img/int-masjid-library.webp", T("লাইব্রেরি", "Library", "المكتبة")], ["img/int-masjid-seminar.webp", T("সেমিনার হল", "Seminar hall", "قاعة الندوات")]],
    "academic": [["img/int-acad-classroom.webp", T("শ্রেণিকক্ষ", "Classroom", "فصل دراسي")], ["img/int-acad-hall.webp", T("মাল্টিপারপাস হল", "Multipurpose hall", "قاعة متعددة الأغراض")], ["img/int-acad-teachers.webp", T("শিক্ষকদের কক্ষ", "Teachers' room", "غرفة المعلمين")], ["img/int-acad-meeting.webp", T("মিটিং রুম", "Meeting room", "غرفة الاجتماعات")], ["img/int-acad-reception.webp", T("অভ্যর্থনা", "Reception", "الاستقبال")]]},
  "timeline": [
    {"when": T("২০২৩", "2023", "2023"), "title": T("নির্মাণকাজের শুভ উদ্বোধন", "Construction inaugurated", "افتتاح أعمال البناء"), "status": "done", "img": "img/inaug-2023-2.webp",
     "items": [T("জমি ক্রয় ও রেজিস্ট্রেশন", "Land purchase and registration", ""), T("নির্মাণ অনুমোদন", "Construction approval", ""), T("মাটি পরীক্ষা", "Soil test", ""), T("স্থাপত্য নকশা", "Architectural design", ""), T("প্রাক-নির্মাণ কাজ", "Pre-construction work", ""), T("২২৫টি পাইল", "225 piles", "")]},
    {"when": T("২০২৬", "2026", "2026"), "title": T("ফাউন্ডেশন, ১ম ও ২য় তলা", "Foundation, 1st and 2nd floors", "الأساسات والطابقان الأول والثاني"), "status": "progress", "img": "img/construction-frame-a.webp",
     "items": [T("মাসজিদ: ফাউন্ডেশন, ১ম ও ২য় তলা", "Masjid: foundation, 1st and 2nd floors", ""), T("একাডেমিক ভবন: ফাউন্ডেশন, ১ম ও ২য় তলা", "Academic building: foundation, 1st and 2nd floors", "")]},
    {"when": T("২০২৭–২০২৮", "2027–2028", "2027–2028"), "title": T("বাকি কাজ সম্পন্ন হবে, ইনশাআল্লাহ", "The remaining work will be completed, in sha Allah", "استكمال بقية الأعمال إن شاء الله"), "status": "planned", "img": "img/design-birdseye-2026.webp", "items": []}],
  "funding": {"done": 3, "mosque": 14, "academic": 32, "total": 46,
    "note": T("আনুমানিক হিসাব (কোটি টাকায়), প্রকল্পের ডোনার ব্রিফ অনুযায়ী।", "Approximate figures (crore BDT), from the project donor brief.", "أرقام تقريبية (بالكرور تاكا) من ملخص المشروع للمتبرعين.")},
  "sponsor": {
    "mosque": [[T("একজন মুসল্লির জায়গা", "Space for one musalli", "مكان مصلٍّ"), 35000], [T("একটি ওযুখানা", "One ablution unit", "موضع وضوء"), 15000], [T("লাইব্রেরি", "Library", "المكتبة"), 5000000], [T("দাওয়াহ সেন্টার", "Dawah centre", "مركز الدعوة"), 5000000]],
    "academic": [[T("একটি শ্রেণিকক্ষ", "One classroom", "فصل دراسي"), 1500000], [T("প্রতি তলার ছাদ ঢালাই", "One floor's roof casting", "صب سقف طابق"), 9600000], [T("লাইব্রেরি", "Library", "المكتبة"), 10000000], [T("মাসজিদ ও ইসলাম বিষয়ক প্রদর্শনী", "Exhibition on masjids and Islam", "معرض عن المساجد والإسلام"), 10000000]],
    "note": T("নামকরণ, দাতা ফলক ও ওয়াকফের সুযোগ রয়েছে।", "Naming rights, donor plaques and Waqf options are available.", "تتوفر فرص التسمية ولوحات المتبرعين والوقف.")},
  "southAsia": {
    "lead": T("দক্ষিণ এশিয়ায় ৬০ কোটির বেশি মুসলিমের বাস, কিন্তু মানসম্পন্ন, গবেষণাভিত্তিক ইসলামী প্রতিষ্ঠান খুবই কম। এই প্রকল্প সেই শূন্যস্থান পূরণের একটি সমন্বিত মডেল।",
              "South Asia is home to more than 600 million Muslims, yet high-quality, research-based Islamic institutions are few. This project is an integrated model to fill that gap.",
              "يعيش في جنوب آسيا أكثر من 600 مليون مسلم، لكن المؤسسات الإسلامية البحثية عالية الجودة قليلة. هذا المشروع نموذج متكامل لسد هذه الفجوة."),
    "points": [
      ["research", T("গবেষণাভিত্তিক শিক্ষা", "Research-based learning", "تعليم قائم على البحث"), T("মদীনা, উম্মুল কুরা, আল-আযহার, মালয়েশিয়া ও মরক্কোর বিশ্ববিদ্যালয়ের মানের সাথে সামঞ্জস্যপূর্ণ শিক্ষাব্যবস্থা।", "An Islamic learning ecosystem aligned with universities such as Madinah, Umm al-Qura, Al-Azhar, Malaysia and Morocco.", "")],
      ["teacher", T("প্রশিক্ষিত ইমাম ও শিক্ষক", "Trained imams and teachers", "أئمة ومعلمون مدرَّبون"), T("ইমাম ও টিচার্স ট্রেনিং ইনস্টিটিউট, সায়েন্টিফিক রিসার্চ সেন্টার এবং আরবি-নিবিড় কারিকুলাম।", "An Imam & Teacher Training Institute, a Scientific Research Centre and an Arabic-intensive curriculum.", "")],
      ["check", T("ভারসাম্যপূর্ণ সঠিক দিকনির্দেশনা", "Balanced, authentic guidance", "توجيه متوازن صحيح"), T("কুরআন-সুন্নাহভিত্তিক জ্ঞান দিয়ে উগ্রতা, ভুল ব্যাখ্যা ও আদর্শিক বিভ্রান্তির জবাব।", "Knowledge from the Qur'an and Sunnah as an answer to extremism, misinterpretation and ideological confusion.", "")],
      ["women", T("নারী ও তরুণদের জন্য", "For women and youth", "للنساء والشباب"), T("নারীদের জন্য নিবেদিত তলা ও শ্রেণিকক্ষ, শিশু-কিশোর ও তরুণদের কার্যক্রম।", "Dedicated floors and classrooms for women, and programmes for children and youth.", "")],
      ["globe", T("অনুসরণযোগ্য মডেল", "A model to replicate", "نموذج قابل للتكرار"), T("মাসজিদ-একাডেমিক সমন্বিত কমপ্লেক্স, মাদরাসা সংস্কার ও গবেষণাভিত্তিক দাওয়াহর আঞ্চলিক দৃষ্টান্ত।", "A regional benchmark for integrated masjid-academic complexes, madrasah reform and research-led Dawah.", "")],
      ["heart", T("স্থায়ী সাদাকায়ে জারিয়া", "Lasting Sadaqah Jariyah", "صدقة جارية دائمة"), T("সালাত, ক্লাস, দাওয়াহ ও সমাজসেবা বছরের পর বছর চলতে থাকবে।", "Prayers, classes, Dawah and community services continue year after year.", "")]],
    "close": T("এটি শুধু একটি মাসজিদ নয়, শুধু একটি একাডেমিক ক্যাম্পাসও নয়; আগামী ৫০–১০০ বছরের জন্য পরিকল্পিত একটি প্রতিষ্ঠান।",
               "Not merely a masjid, not merely an academic campus, but an institution designed for the next 50–100 years.",
               "ليس مجرد مسجد ولا مجرد حرم أكاديمي، بل مؤسسة مصممة للخمسين إلى المئة عام القادمة.")}
}
C["kqInfo"] = {
  "vision": T("প্রজ্ঞা, সততা ও সমসাময়িক চ্যালেঞ্জের গভীর উপলব্ধিসহ বিশুদ্ধ ইসলামী জ্ঞান ধারণ ও প্রচারে দক্ষ ও মুখলিস আলেম তৈরি করা।",
              "To cultivate skilled and sincere scholars who uphold and propagate authentic Islamic knowledge with wisdom, integrity and a deep understanding of contemporary challenges.", ""),
  "mission": [T("আধুনিক প্রযুক্তিসমৃদ্ধ পূর্ণাঙ্গ ইসলামী শিক্ষার মাধ্যমে মেধাবী শিক্ষার্থীদের আলেম হিসেবে গড়ে তোলা।", "To nurture talented students into scholars through comprehensive Islamic education enriched with modern technology.", ""),
              T("ইসলামী জ্ঞান ও বিজ্ঞানের বিশুদ্ধতা ও প্রাসঙ্গিকতা রক্ষা করে সঠিক প্রচার নিশ্চিত করা।", "To ensure the accurate propagation of Islamic knowledge and sciences, preserving authenticity and relevance.", ""),
              T("প্রাচীন ও সমসাময়িক বিষয়ে ইসলামী জ্ঞানের আলোকে গবেষণা, যাতে সঠিক সিদ্ধান্ত নেওয়া সহজ হয়।", "To research ancient and contemporary issues in the light of Islamic knowledge, for informed and correct decisions.", "")],
  "why": [
    ["doc", T("স্বতন্ত্র কারিকুলাম", "Distinguished curriculum", "منهج متميز"), T("বিশ্বের বিভিন্ন ইসলামী বিশ্ববিদ্যালয়ের কারিকুলাম পর্যালোচনা করে একাডেমিক কমিটি প্রণীত; সিঙ্গাপুরের মাদরাসার পাঠদান পদ্ধতিও যুক্ত।", "Developed by the academic committee after reviewing Islamic university curricula worldwide, with methods from Singapore's madrasahs.", "")],
    ["globe", T("আন্তর্জাতিক বিশ্ববিদ্যালয়ে যাওয়ার পথ", "A pathway to international universities", "طريق إلى الجامعات الدولية"), T("আন্তর্জাতিক বিশ্ববিদ্যালয়ের সাথে একাডেমিক সমতা এবং সমঝোতা স্মারক (MOU) করার উদ্যোগ।", "Academic equivalence with international universities, and work towards MOUs with them.", "")],
    ["arabic", T("আরবি ভাষায় জোর", "Emphasis on Arabic", "التركيز على العربية"), T("উচ্চশিক্ষার প্রধান বাধা ভাষা, তাই আরবি ভাষাভিত্তিক কারিকুলাম।", "Language is the main barrier to higher study, so the curriculum is built around Arabic.", "")],
    ["scholar", T("যোগ্য শিক্ষকমণ্ডলী", "Qualified faculty", "هيئة تدريس مؤهلة"), T("মদীনা ইসলামী বিশ্ববিদ্যালয়সহ বিখ্যাত বিশ্ববিদ্যালয়ের পিএইচডিধারী আলেমগণ।", "Scholars including PhDs from the Islamic University of Madinah and other renowned universities.", "")],
    ["library", T("সমৃদ্ধ লাইব্রেরি", "A rich library", "مكتبة غنية"), T("৩ লক্ষাধিক বইয়ের ডিজিটাল লাইব্রেরি; স্থায়ী ক্যাম্পাসে একটি মডেল লাইব্রেরির স্বপ্ন।", "A digital library of more than 300,000 books, and a model physical library planned for the permanent campus.", "")],
    ["research", T("সায়েন্টিফিক রিসার্চ সেন্টার", "Scientific Research Centre", "مركز البحث العلمي"), T("সেমিনার, সিম্পোজিয়াম, রাউন্ড টেবিল, কনফারেন্স ও পিয়ার-রিভিউড জার্নাল।", "Seminars, symposia, round tables, conferences and a peer-reviewed journal.", "")],
    ["teacher", T("ইমাম ও টিচার্স ট্রেনিং ইনস্টিটিউট", "Imam & Teachers Training Institute", "معهد تدريب الأئمة والمعلمين"), T("ইসলামী জ্ঞান, নেতৃত্ব, কার্যকর পাঠদান ও কমিউনিটি এনগেজমেন্টে বিশেষায়িত প্রশিক্ষণ।", "Specialised training in Islamic scholarship, leadership, effective teaching and community engagement.", "")],
    ["briefcase", T("ভোকেশনাল ট্রেনিং ইনস্টিটিউট", "Vocational Training Institute", "معهد التدريب المهني"), T("ইসলামী মূল্যবোধ বজায় রেখে বিভিন্ন পেশায় হাতে-কলমে দক্ষতা ও স্বাবলম্বিতা।", "Practical skills in trades and professions for self-sufficiency, upholding Islamic values.", "")]],
  "running": [T("কুল্লিয়্যাহ (স্নাতক)", "Kulliyyah (undergraduate)", ""), T("সানাবিয়্যাহ (উচ্চ মাধ্যমিক)", "Sanabiyyah (higher secondary)", ""), T("আরবি ভাষা কোর্স", "Arabic language course", ""), T("ইমাম ও শিক্ষক প্রশিক্ষণ কোর্স", "Imam & teacher training course", ""), T("ডিপ্লোমা ও সার্টিফিকেট কোর্স", "Diploma and certificate courses", ""), T("সায়েন্টিফিক রিসার্চ সেন্টার", "Scientific Research Centre", ""), T("সহশিক্ষা কার্যক্রম", "Co-curricular activities", ""), T("ই-লাইব্রেরিকেন্দ্রিক শিক্ষা", "E-library-centred learning", "")],
  "mou": ["Islamic University of Madinah", "Umm al-Qura University, Makkah", "King Saud University, Riyadh", "Imam Muhammad bin Saud Islamic University, Riyadh", "King Abdulaziz University, Jeddah", "Al-Azhar University, Egypt", "Ain Shams University, Egypt", "University of Malaya, Malaysia", "International Islamic University Malaysia", "University of Algiers, Algeria", "Mohammed V University, Morocco", "Kuwait University, Kuwait"],
  "depts": ["Al-Qur'an and Islamic Studies", "Al-Hadith and Islamic Studies", "Arabic Language and Literature", "Fiqh and Usulul Fiqh", "Islam and Orientalism", "Shari'ah and Management", "Shari'ah and Islamic Finance", "Da'wah and IT/CSE/Journalism", "Halal Tourism and Hotel Management", "Da'wah and Islamic Culture", "Sirah and Islamic History", "Education", "Translation and Modern Languages", "World Religions", "Al-Firaq wal-Madhahib al-Islamiyyah", "Halal Industry Management", "Islamic Psychology"]
}
C["darulHadith"] = {
  "name": T("দারুল হাদীস আরবি মাদরাসা", "Darul Hadith Arabic Madrasah", "مدرسة دار الحديث العربية"),
  "text": T("ইমাম বুখারী ট্রাস্টের প্রস্তাবিত একটি বেসরকারি মাদরাসা: প্রাথমিক, মাধ্যমিক ও উচ্চ মাধ্যমিক শাখা; আরবি, ইংরেজি ও বাংলা তিন ভাষায় জোর; ছাত্র ও ছাত্রীদের জন্য আলাদা আবাসিক ও অনাবাসিক ব্যবস্থা।",
            "A proposed private madrasah of Imam Bukhari Trust: primary, secondary and higher-secondary sections; emphasis on Arabic, English and Bengali; separate residential and non-residential arrangements for boys and girls.", ""),
  "subjects": [T("হিফজুল কুরআন", "Hifzul Qur'an", ""), T("ইসলামী শিক্ষা", "Islamic education", ""), T("তা'লীমুল কুরআন", "Ta'limul Qur'an", ""), T("বাংলা, আরবি ও ইংরেজি", "Bengali, Arabic and English", ""), T("গণিত, বিজ্ঞান ও সমাজবিজ্ঞান", "Mathematics, science and social sciences", ""), T("কারিগরি শিক্ষা", "Technical education", "")]
}
for _x in C.get("history", []):
    if _x.get("date") == "2023-01": _x["image"] = "img/inaug-2023-2.webp"
# sponsorship items from the project brief that the list did not have yet (existing amounts are kept)
_si = C["supportItems"]["items"]; _have = {x["name"]["en"] for x in _si}
for _n, _a in [(T("মাসজিদের লাইব্রেরি", "The masjid library", "مكتبة المسجد"), 5000000),
               (T("একাডেমিক ভবনের প্রতি তলার ছাদ ঢালাই", "Each roof slab of the academic building", "صب كل سقف للمبنى الأكاديمي"), 9600000),
               (T("একাডেমিক ভবনের লাইব্রেরি", "The academic building's library", "مكتبة المبنى الأكاديمي"), 10000000),
               (T("মাসজিদ ও ইসলাম বিষয়ক প্রদর্শনী", "Exhibition on masjids and Islam", "معرض عن المساجد والإسلام"), 10000000)]:
    if _n["en"] not in _have: _si.append({"name": _n, "amount": _a, "status": "open"})
_pj = [p for p in C["projects"] if p["id"] == "ibjmc"][0]
for _d in ["img/design-birdseye-2026.webp", "img/design-night-ppt.webp"]:
    if _d not in _pj.get("design", []): _pj.setdefault("design", []).insert(0, _d)
for _d in ["img/inaug-2023-group.webp", "img/inaug-2023-1.webp", "img/inaug-2023-briefing.webp", "img/construction-frame-a.webp", "img/construction-frame-b.webp", "img/construction-materials.webp"]:
    if _d not in _pj.get("gallery", []): _pj.setdefault("gallery", []).insert(0, _d)
# office location supplied by IBT (Google Maps place "Imam Bukhari Trust", Uttara)
C["settings"]["officeMapUrl"] = "https://maps.app.goo.gl/WEHLhscz7LoNbkbS9"
C["settings"]["officeMapLL"] = "23.8632774,90.3903917"
