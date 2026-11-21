# Builds data/content.json, the bundled default content for the IBT site.
# Every text field is trilingual: {"bn":..., "en":..., "ar":...}
import json

def T(bn, en, ar=""):
    return {"bn": bn, "en": en, "ar": ar}

C = {}

C["meta"] = {
    "version": "proto-1.0",
    "contentAsOf": "2026-11-19",
    "notes": "Default content built from the IBT Catalog 2026, the official English deck, imambukharitrust.com and kulliyatulquran.com. Items marked review=true need management approval."
}

C["settings"] = {
    "siteName": T("ইমাম বুখারী ট্রাস্ট", "Imam Bukhari Trust", "وقف الإمام البخاري"),
    "shortName": "IBT",
    "tagline": T("ঈমান · ইলম · খিদমাহ", "Faith · Knowledge · Service", "إيمانٌ · علمٌ · خدمة"),
    "motto": T("সুন্নাহর মহিমায়, ইসলামের অগ্রযাত্রায় একসাথে", "Together in the advancement of Islam, in the light of the Sunnah", "معًا في مسيرة الإسلام على نور السنة"),
    "logo": "img/logo-mark.png",
    "logoColor": "img/logo-color-mark.png",
    "defaultLang": "bn",
    "defaultTheme": "dark",
    "announcement": {
        "show": True,
        "text": T("কুল্লিয়াতুল কুরআন: জেনারেল আরবি ভাষা কোর্সে ভর্তি ফরম অনলাইনে", "Kulliyatul Quran: General Arabic Language Course admission form is online", "كلية القرآن: استمارة القبول في دورة اللغة العربية العامة متاحة إلكترونيًا"),
        "link": "#reg-kq-general-arabic"
    },
    "contact": {
        "phones": ["+880 1852-808554", "+880 1306-746437"],
        "email": "bukharimasjid.bd@gmail.com",
        "email2": "",
        "office": T("হাউস ১৭ (১ম তলা), রোড ৬/এ, সেক্টর ৫, উত্তরা, ঢাকা ১২৩০", "House 17 (1st Floor), Road 6/A, Sector 5, Uttara, Dhaka 1230", "منزل 17، الطريق 6/أ، القطاع 5، أُتّرا، دكا 1230"),
        "site": T("নিউ ঢাকা সিটি, পলাশপুর, ঢাকা–মাওয়া এক্সপ্রেসওয়ে সংলগ্ন, ঢাকা", "New Dhaka City, Palashpur, adjacent to the Dhaka–Mawa Expressway, Dhaka", "مدينة دكا الجديدة، بلاشبور، بجوار طريق دكا–ماوا السريع، دكا"),
        "hours": T("অফিস: শনি–বৃহস্পতি, সকাল ৯টা–বিকাল ৫টা", "Office: Saturday–Thursday, 9 am–5 pm", "المكتب: السبت–الخميس، 9 صباحًا–5 مساءً")
    },
    "social": [
        {"name": "Facebook", "url": "https://www.facebook.com/imambukharitrustbd", "icon": "facebook"},
        {"name": "YouTube", "url": "https://www.youtube.com/channel/UCm8It2AWLRt3N22-fL89K_w", "icon": "youtube"}
    ],
    "relatedSites": [
        {"name": T("কুল্লিয়াতুল কুরআন ওয়েবসাইট", "Kulliyatul Quran website", "موقع كلية القرآن"), "url": "https://www.kulliyatulquran.com/"},
        {"name": T("কুল্লিয়াতুল কুরআন ইউটিউব", "Kulliyatul Quran YouTube", "يوتيوب كلية القرآن"), "url": "https://www.youtube.com/@kulliyatulquranbd"},
        {"name": T("পুরনো ওয়েবসাইট", "Previous website", "الموقع السابق"), "url": "https://www.imambukharitrust.com/"}
    ],
    "youtubeChannels": [
        {"name": "Imam Bukhari Trust", "channelId": "UCm8It2AWLRt3N22-fL89K_w", "url": "https://www.youtube.com/channel/UCm8It2AWLRt3N22-fL89K_w"},
        {"name": "Kulliyatul Quran BD", "channelId": "UCBTHMWdAFuQ5ynEryDIWdRw", "url": "https://www.youtube.com/@kulliyatulquranbd"}
    ]
}

C["home"] = {
    "heroEyebrow": T("২০১৭ সাল থেকে · ঢাকা, বাংলাদেশ", "Since 2017 · Dhaka, Bangladesh", "منذ 2017 · دكا، بنغلاديش"),
    "heroTitle": T("ঈমান, ইলম ও খিদমাহর মাধ্যমে একটি জ্ঞানভিত্তিক সমাজ গড়ার পথে", "Building a knowledge-based society through faith, knowledge and service", "نحو مجتمعٍ قائمٍ على المعرفة بالإيمان والعلم والخدمة"),
    "heroText": T("ইমাম বুখারী ট্রাস্ট কুরআন ও বিশুদ্ধ সুন্নাহর আলোকে গবেষণাভিত্তিক শিক্ষা, দাওয়াহ, মাসজিদকেন্দ্রিক দ্বীনি কমিউনিটি ও সমাজকল্যাণে কাজ করছে।", "Imam Bukhari Trust works in research-based education, Dawah, masjid-centred community building and social welfare, guided by the Qur'an and the authentic Sunnah.", "يعمل وقف الإمام البخاري في التعليم القائم على البحث والدعوة وبناء مجتمعٍ متمحورٍ حول المسجد والعمل الاجتماعي، على هدي القرآن والسنة الصحيحة."),
    "heroCta1": T("আমাদের গল্প দেখুন", "Watch our story", "شاهد قصتنا"),
    "heroCta2": T("মাসজিদ নির্মাণে অংশ নিন", "Support the Masjid", "ساهم في بناء المسجد"),
    "heroImage": "img/design-night-1.jpg",
    "heroSlides": [
        {"image": "img/design-night-1.jpg", "caption": T("ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স · স্থাপত্য নকশা", "Imam Bukhari Jame Masjid Complex · architectural design", "مجمع جامع الإمام البخاري · التصميم المعماري"), "kind": "design"},
        {"image": "img/first-prayer.jpg", "caption": T("নির্মাণাধীন মাসজিদে সালাত", "Prayer in the masjid under construction", "الصلاة في المسجد قيد الإنشاء"), "kind": "photo"},
        {"image": "img/design-aerial.jpg", "caption": T("মাসজিদ ও একাডেমিক ক্যাম্পাস · স্থাপত্য নকশা", "Masjid and academic campus · architectural design", "المسجد والحرم الأكاديمي · التصميم المعماري"), "kind": "design"},
        {"image": "img/winter-2024-distribution.jpg", "caption": T("শীতবস্ত্র বিতরণ প্রকল্প ২০২৪", "Winter clothing distribution 2024", "توزيع كسوة الشتاء 2024"), "kind": "photo"},
        {"image": "img/halaqa-class.jpg", "caption": T("কুল্লিয়াতুল কুরআনে ক্লাস", "A class at Kulliyatul Quran", "درس في كلية القرآن"), "kind": "photo"},
        {"image": "img/construction-structure.jpg", "caption": T("নির্মাণকাজ, নিউ ঢাকা সিটি", "Construction at New Dhaka City", "أعمال البناء في مدينة دكا الجديدة"), "kind": "photo"}
    ],
    "heroGalleryNight": ["img/design-night-1.jpg", "img/design-night-2.jpg", "img/design-night-3.jpg", "img/design-front.jpg", "img/design-aerial.jpg", "img/design-portal.jpg", "img/design-courtyard.jpg", "img/design-landscape.jpg"],
    "heroGallery": ["img/design-front.jpg", "img/design-side.jpg", "img/design-aerial.jpg", "img/design-portal.jpg", "img/design-entrance.jpg", "img/design-courtyard.jpg", "img/design-plaza.jpg", "img/design-landscape.jpg", "img/design-night-1.jpg"],
    "heroStory": "ibjmc",
    "aboutTitle": T("ইমাম বুখারী ট্রাস্ট সম্পর্কে", "About Imam Bukhari Trust", "عن وقف الإمام البخاري"),
    "aboutText": T("ইমাম বুখারী ট্রাস্ট একটি বহুমুখী ইসলামী উদ্যোগ। ব্যাপক ও সর্বাঙ্গীণ কার্যক্রমের মাধ্যমে আজকের ফিতনাহ-সংকুল বিশ্বে প্রকৃত ইসলামের শিক্ষা ছড়িয়ে দেওয়া, ইসলামের ব্যবহারিক প্রয়োগ আরও দৃশ্যমান করে প্রতিটি প্রজন্মের কাছে ইসলামকে প্রাসঙ্গিক রাখা এবং কুরআন-সুন্নাহর পথনির্দেশনায় মুসলিম জীবনে সমৃদ্ধি আনাই আমাদের লক্ষ্য। ১ অক্টোবর ২০১৭ সালে ধলেশ্বরী নদীর তীরে আনুষ্ঠানিক কার্যক্রম শুরু হয়।", "Imam Bukhari Trust is a multi-dimensional Islamic initiative. Through broad and integrated work, it spreads the true teachings of Islam in today's world of fitnah, makes the practice of Islam more visible so that it stays relevant to every generation, and helps Muslim life flourish under the guidance of the Qur'an and Sunnah. Formal operations began on 1 October 2017 on the bank of the Dhaleshwari River.", "وقف الإمام البخاري مبادرة إسلامية متعددة الجوانب، تعمل من خلال برامج شاملة على نشر تعاليم الإسلام الصحيحة في عالمٍ كثرت فيه الفتن، وإبراز التطبيق العملي للإسلام ليبقى حاضرًا في حياة كل جيل، وإثراء حياة المسلمين بهدي القرآن والسنة. بدأ الوقف أعماله رسميًا في 1 أكتوبر 2017 على ضفاف نهر دهاليشوري."),
    "aboutImage": "img/chairman-speech.jpg",
    "visionTitle": T("আমাদের স্বপ্ন", "Our vision", "رؤيتنا"),
    "visionText": T("এমন একটি জ্ঞানভিত্তিক সমাজ, যেখানে শিক্ষা, গবেষণা, গবেষণাভিত্তিক দাওয়াহ এবং সামাজিক ও শিক্ষামূলক উদ্যোগ কুরআন ও সুন্নাহর সঠিক বোঝাপড়া, প্রয়োগ ও নৈতিকতার দিকে জাতিকে এগিয়ে নেবে।", "A knowledge-based society where education, research, research-based Dawah and social and educational initiatives move the nation toward the correct understanding, practice and morality of the Qur'an and Sunnah.", "مجتمعٌ قائمٌ على المعرفة، يكون فيه التعليم والبحث والدعوة القائمة على البحث والمبادرات الاجتماعية والتعليمية سبيلًا لنهوض الأمة نحو الفهم الصحيح للقرآن والسنة وتطبيقهما والتخلق بأخلاقهما."),
    "pillars": [
        {"icon": "research", "title": T("গবেষণা", "Research", "البحث"), "text": T("সমকালীন বিষয়ে কুরআন-সুন্নাহভিত্তিক গবেষণা, সেমিনার ও নীতিনির্ধারণী সংলাপ।", "Qur'an-and-Sunnah-based research on contemporary issues, seminars and policy dialogue.", "بحوث في القضايا المعاصرة على ضوء الكتاب والسنة، وندوات وحوار في السياسات."), "link": "#init-research"},
        {"icon": "education", "title": T("ইসলামী শিক্ষা", "Islamic Education", "التعليم الإسلامي"), "text": T("শিশু থেকে উচ্চশিক্ষা পর্যন্ত বিশুদ্ধ আকীদাভিত্তিক ও আরবি ভাষাকেন্দ্রিক শিক্ষা।", "Authentic, Arabic-centred Islamic education from childhood to higher studies.", "تعليم إسلامي أصيل محوره اللغة العربية من الطفولة إلى الدراسات العليا."), "link": "#institutions"},
        {"icon": "dawah", "title": T("দাওয়াহ", "Dawah", "الدعوة"), "text": T("সাপ্তাহিক হালাকা, প্রশ্নোত্তর, কোর্স ও ডিজিটাল দাওয়াহর মাধ্যমে ইলম পৌঁছে দেওয়া।", "Weekly halaqa, Q&A, courses and digital Dawah that bring knowledge to people.", "حلقات أسبوعية وأسئلة وأجوبة ودورات ودعوة رقمية لإيصال العلم إلى الناس."), "link": "#init-dawah"},
        {"icon": "masjid", "title": T("মাসজিদ কমপ্লেক্স", "Masjid Complex", "مجمع المسجد"), "text": T("মাসজিদ আন-নববীর আদলে মাসজিদকেন্দ্রিক দ্বীনি কমিউনিটি গড়ে তোলা।", "Building a masjid-centred community in the light of Masjid an-Nabawi.", "بناء مجتمعٍ إيماني متمحورٍ حول المسجد على هدي المسجد النبوي."), "link": "#project-ibjmc"},
        {"icon": "social", "title": T("সমাজকল্যাণ", "Social Development", "التنمية الاجتماعية"), "text": T("ত্রাণ, পুনর্বাসন, কুরবানি, ইফতার ও শীতবস্ত্রের মাধ্যমে ইসলামের সৌন্দর্য দৃশ্যমান করা।", "Relief, rehabilitation, Qurbani, iftar and winter support that make the beauty of Islam visible.", "إغاثة وإعادة تأهيل وأضاحٍ وإفطار وكسوة شتاء تُظهر جمال الإسلام."), "link": "#init-welfare"}
    ],
    "spotlightTitle": T("ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স", "Imam Bukhari Jame Masjid Complex", "مجمع جامع الإمام البخاري"),
    "spotlightText": T("“আল্লাহর কাছে সবচেয়ে প্রিয় স্থান মাসজিদ”, আর মদীনায় এসে রাসূলুল্লাহ ﷺ সর্বপ্রথম মাসজিদ নির্মাণের কাজে হাত দিয়েছিলেন। এই অনুপ্রেরণায় মাসজিদ আন-নববীর আদলে, সুন্নাহর আলোকে একটি উদ্ভাসিত দ্বীনি কমিউনিটি গড়ার লক্ষ্যে এই কমপ্লেক্সের নির্মাণ চলছে। এটি হবে দাওয়াহ, শিক্ষা, সেবা ও তারবিয়াহসহ সব দ্বীনি কার্যক্রমের কেন্দ্র, ইনশাআল্লাহ।", "“The most beloved places to Allah are the masjids”, and on arriving in Madinah the Messenger of Allah ﷺ first set about building a masjid. In that spirit the complex is being built to grow a radiant community around the masjid, in the light of Masjid an-Nabawi and the Sunnah. It will be the centre of Dawah, education, service and tarbiyah, in sha Allah.", "«أحب البلاد إلى الله مساجدها»، وأول ما بدأ به رسول الله ﷺ في المدينة بناء المسجد. وعلى هذا الهدي يُشيَّد المجمع لبناء مجتمعٍ إيمانيٍّ مشرقٍ حول المسجد على هدي المسجد النبوي والسنة، ليكون مركزًا للدعوة والتعليم والخدمة والتربية بإذن الله."),
    "spotlightImage": "img/design-masjid-front.jpg",
    "quote": {
        "text": T("“যে ব্যক্তি আল্লাহর সন্তুষ্টির জন্য একটি মাসজিদ নির্মাণ করে, আল্লাহ তার জন্য জান্নাতে অনুরূপ একটি ঘর নির্মাণ করেন।”", "“Whoever builds a masjid seeking the pleasure of Allah, Allah will build for him a house like it in Paradise.”", ""),
        "ref": T("সহীহ বুখারী ৪৫০; সহীহ মুসলিম ৫৩৩", "Sahih al-Bukhari 450; Sahih Muslim 533", "صحيح البخاري 450؛ صحيح مسلم 533"),
        "review": True
    }
}

C["chairman"] = {
    "name": T("প্রফেসর ড. মোহাম্মদ মানজুরে ইলাহী", "Prof. Dr. Mohammad Manzur-e-Elahi", "الأستاذ الدكتور محمد منظور إلهي"),
    "role": T("চেয়ারম্যান, ইমাম বুখারী ট্রাস্ট · প্রতিষ্ঠাতা, কুল্লিয়াতুল কুরআন", "Chairman, Imam Bukhari Trust · Founder, Kulliyatul Quran", "رئيس وقف الإمام البخاري · مؤسس كلية القرآن"),
    "photo": "img/chairman.jpg",
    "photo2": "img/chairman-speech.jpg",
    "bio": T("অধ্যাপক ড. মোহাম্মদ মানজুরে ইলাহী একাধারে গবেষক, শিক্ষাবিদ, ইসলামিক স্কলার ও লেখক। তিনি একজন দা‘ঈ ইলাল্লাহ এবং সুপরিচিত মিডিয়া ব্যক্তিত্ব; ইসলামী গবেষণা, দাওয়াহ কার্যক্রম ও গণমাধ্যমে ইসলামী আলোচনার মাধ্যমে তিনি জাতীয় ও আন্তর্জাতিক অঙ্গনে পরিচিত। বর্তমানে তিনি জাতীয় বিশ্ববিদ্যালয়ের ইসলামিক স্টাডিজ বিভাগের অধ্যাপক। তিনি মদীনা ইসলামী বিশ্ববিদ্যালয় থেকে কৃতিত্বের সাথে ব্যাচেলর, মাস্টার্স ও পিএইচডি ডিগ্রি অর্জন করেন এবং সেখান থেকে পিএইচডি অর্জনকারী প্রথম বাংলাদেশি নাগরিক। বিশুদ্ধ ও বস্তুনিষ্ঠ ইসলামী শিক্ষা সবার কাছে পৌঁছে দিতে তিনি কুল্লিয়াতুল কুরআনিল কারীম ওয়াদ-দিরাসাতিল ইসলামিয়্যাহ ও তাইবাহ একাডেমি প্রতিষ্ঠা করেন।", "Prof. Dr. Mohammad Manzur-e-Elahi is a researcher, educationist, Islamic scholar and author. A da'i and a well-known media personality, he is known nationally and internationally for his research, Dawah and Islamic programmes in the media. He is a Professor in the Department of Islamic Studies at National University. He earned his Bachelor's, Master's and PhD with distinction from the Islamic University of Madinah, and is the first Bangladeshi citizen to receive a PhD from that university. To bring authentic, objective Islamic education to everyone, he founded Kulliyatul Quranil Kareem wad-Dirasatil Islamiyyah and Taibah Academy.", "الأستاذ الدكتور محمد منظور إلهي باحثٌ ومربٍّ وعالمٌ ومؤلف، وداعيةٌ إلى الله وشخصيةٌ إعلامية معروفة على المستويين الوطني والدولي من خلال البحث العلمي والدعوة والبرامج الإسلامية في وسائل الإعلام. يعمل أستاذًا في قسم الدراسات الإسلامية بالجامعة الوطنية في بنغلاديش. حصل على البكالوريوس والماجستير والدكتوراه بتفوق من الجامعة الإسلامية بالمدينة المنورة، وهو أول مواطن بنغلاديشي يحصل على الدكتوراه منها. أسس كلية القرآن الكريم والدراسات الإسلامية وأكاديمية طيبة لإيصال العلم الشرعي الأصيل إلى الجميع."),
    "message": T("২০১৭ সালে ইমাম বুখারী ট্রাস্ট শিক্ষা, সমাজ উন্নয়ন ও দীনি কার্যক্রমকে সামনে রেখে প্রতিষ্ঠিত হয়। এর সর্বপ্রথম প্রকল্প হলো ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স বাংলাদেশ এবং দ্বিতীয় প্রকল্প হলো কুল্লিয়াতুল কুরআনিল কারীমসহ একগুচ্ছ একাডেমিক কার্যক্রম। জ্ঞানার্জন ও জ্ঞানের সাধনা এবং জ্ঞান বিতরণই একটি জাতির সমৃদ্ধির প্রধান কারণ; তাই শিক্ষার্জন ও শিক্ষাদান মুসলিম জাতির সবচেয়ে বড় অগ্রাধিকার। পাশাপাশি সমাজের সকল বয়সী অবহেলিত-বঞ্চিত মানুষদের পাশে দাঁড়ানো আমাদের নৈতিক ও মানবিক কর্তব্য। আমরা আশা করছি, মুসলিম সমাজের ভাই-বোনেরা এই মহান কাজে এগিয়ে আসবেন, অংশগ্রহণ করবেন এবং সাহায্যের হাত বাড়িয়ে দেবেন। আল্লাহ আমাদের সকল প্রচেষ্টা কবুল করুন।", "Imam Bukhari Trust was founded in 2017 with education, social development and religious work in view. Its first project is the Imam Bukhari Jame Masjid Complex Bangladesh, and its second is a group of academic programmes including Kulliyatul Quranil Kareem. Seeking, pursuing and spreading knowledge is the main cause of a nation's prosperity, so learning and teaching are the Muslim community's highest priority. Standing beside the neglected and deprived of every age is also our moral and human duty. We hope our brothers and sisters will come forward, take part and lend a helping hand in this great work. May Allah accept all our efforts.", "تأسس وقف الإمام البخاري عام 2017 واضعًا نصب عينيه التعليم والتنمية الاجتماعية والعمل الدعوي. وأول مشروعاته مجمع جامع الإمام البخاري في بنغلاديش، والثاني مجموعة من البرامج الأكاديمية منها كلية القرآن الكريم. إن طلب العلم والاجتهاد فيه ونشره هو السبب الأول لنهضة الأمم، ولذا فالتعلم والتعليم أولى أولويات الأمة المسلمة. كما أن الوقوف إلى جانب المحرومين من كل الأعمار واجب أخلاقي وإنساني. ونرجو أن يتقدم الإخوة والأخوات للمشاركة في هذا العمل العظيم ومدّ يد العون. تقبّل الله منا جميعًا."),
    "messageSource": "https://www.imambukharitrust.com/chairman-message",
    "links": [
        {"name": "Facebook", "url": ""},
        {"name": "YouTube", "url": ""}
    ],
    "review": True
}

C["cells"] = [
    {"name": T("ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স", "Imam Bukhari Jame Masjid Complex", "مجمع جامع الإمام البخاري"), "text": T("মাসজিদকেন্দ্রিক দ্বীনি কমিউনিটির প্রাণকেন্দ্র (নির্মাণাধীন)।", "The heart of the masjid-centred community (under construction).", "قلب المجتمع المتمحور حول المسجد (قيد الإنشاء)."), "link": "#project-ibjmc"},
    {"name": T("কুল্লিয়াতুল কুরআনিল কারীম ওয়াদ-দিরাসাতিল ইসলামিয়্যাহ", "Kulliyatul Quranil Kareem wad-Dirasatil Islamiyyah", "كلية القرآن الكريم والدراسات الإسلامية"), "text": T("উচ্চতর ইসলামী শিক্ষা, গবেষণা ও দাওয়াহ (স্থায়ী ক্যাম্পাস নির্মাণাধীন)।", "Higher Islamic education, research and Dawah (permanent campus under construction).", "تعليم إسلامي عالٍ وبحث ودعوة (الحرم الدائم قيد الإنشاء)."), "link": "#inst-kulliyatul-quran"},
    {"name": T("কুল্লিয়াতুল কুরআন মডেল মাদরাসা ও ইভিনিং মাদরাসা", "Kulliyatul Quran Model Madrasa & Evening Madrasa", "مدرسة كلية القرآن النموذجية والمدرسة المسائية"), "text": T("শৈশব থেকেই জ্ঞান, আদব ও নৈতিকতায় গড়ে ওঠা প্রজন্ম।", "A generation raised in knowledge, adab and character from childhood.", "جيلٌ ينشأ على العلم والأدب والأخلاق منذ الصغر."), "link": "#inst-model-madrasa"},
    {"name": T("দাওয়াহ ও ইভেন্ট সেল", "Dawah & Event Cell", "خلية الدعوة والفعاليات"), "text": T("হালাকা, প্রশ্নোত্তর, কোর্স, কর্মশালা ও অনুষ্ঠান।", "Halaqa, Q&A, courses, workshops and events.", "الحلقات والأسئلة والدورات وورش العمل والفعاليات."), "link": "#init-dawah"},
    {"name": T("সামাজিক কল্যাণ ও সেবামূলক দাওয়াহ সেল", "Social Welfare & Service-Dawah Cell", "خلية الرعاية الاجتماعية والدعوة بالخدمة"), "text": T("ত্রাণ, ইফতার, শীতবস্ত্র, কুরবানি ও চিকিৎসা সহায়তা।", "Relief, iftar, winter clothes, Qurbani and medical support.", "الإغاثة والإفطار وكسوة الشتاء والأضاحي والدعم الطبي."), "link": "#init-welfare"},
    {"name": T("ডিজিটাল কনটেন্ট ও কমিউনিকেশন সেল", "Digital Content & Communication Cell", "خلية المحتوى الرقمي والتواصل"), "text": T("ভিডিও, সোশ্যাল মিডিয়া, প্রকাশনা ও স্টুডিও।", "Video, social media, publications and the studio.", "الفيديو ووسائل التواصل والنشر والاستوديو."), "link": "#init-digital"},
    {"name": T("ইমাম বুখারী আবাসন ও কমিউনিটি বিল্ডিং", "Imam Bukhari Housing & Community Building", "إسكان الإمام البخاري وبناء المجتمع"), "text": T("মাসজিদকে ঘিরে দ্বীনদার পরিবারের কমিউনিটি (দানের তহবিল থেকে আলাদা)।", "A community of practising families around the masjid (separate from donation funds).", "مجتمعٌ من الأسر الملتزمة حول المسجد (منفصل عن أموال التبرعات)."), "link": "#init-community"},
    {"name": T("ফোরাম ফর স্ট্র্যাটেজিক ডায়ালগ (FSD)", "Forum for Strategic Dialogue (FSD)", "منتدى الحوار الاستراتيجي"), "text": T("ইমাম বুখারী ট্রাস্টের পৃষ্ঠপোষকতায় গবেষণা, নীতি-প্রস্তাব ও কৌশলগত পরিকল্পনার প্ল্যাটফর্ম।", "A platform for research, policy proposals and strategic planning under the patronage of IBT.", "منصة للبحث ومقترحات السياسات والتخطيط الاستراتيجي برعاية الوقف."), "link": "#init-research"}
]

C["history"] = [
    {"date": "2017-10-01", "title": T("আনুষ্ঠানিক কার্যক্রম শুরু", "Formal operations begin", "بدء الأعمال رسميًا"), "text": T("ধলেশ্বরী নদীর তীরবর্তী পলাশপুরে ইমাম বুখারী ট্রাস্টের আনুষ্ঠানিক কার্যক্রম শুরু।", "Imam Bukhari Trust formally begins its work at Palashpur, on the bank of the Dhaleshwari.", "بدء أعمال وقف الإمام البخاري رسميًا في بلاشبور على ضفاف نهر دهاليشوري."), "source": "imambukharitrust.com"},
    {"date": "2021", "title": T("কুল্লিয়াতুল কুরআন প্রতিষ্ঠা", "Kulliyatul Quran founded", "تأسيس كلية القرآن"), "text": T("২০২১ খ্রি. / ১৪৪২ হি. উচ্চতর ইসলামী শিক্ষা ও গবেষণা প্রতিষ্ঠান হিসেবে স্থাপিত।", "Established in 2021 / 1442 AH as a higher Islamic education and research institution.", "تأسست عام 2021م / 1442هـ مؤسسةً للتعليم الإسلامي العالي والبحث."), "source": "kulliyatulquran.com"},
    {"date": "2022-07", "title": T("উত্তরায় ক্লাস শুরু", "Classes begin in Uttara", "بدء الدراسة في أُتّرا"), "text": T("অস্থায়ী ক্যাম্পাসে আরবি ভাষা ও সানাবিয়্যাহ পর্যায়ের ক্লাস শুরু।", "Arabic language and Sanabiyyah classes begin at the temporary campus in Uttara.", "بدء دروس اللغة العربية والمرحلة الثانوية في الحرم المؤقت بأُتّرا."), "source": "imambukharitrust.com"},
    {"date": "2023-01", "title": T("স্থায়ী ক্যাম্পাসের কাজ শুরু", "Work on the permanent campus begins", "بدء العمل في الحرم الدائم"), "text": T("নিউ ঢাকা সিটিতে কুল্লিয়াতুল কুরআনের স্থায়ী ক্যাম্পাসের কাজ শুরু।", "Work begins on Kulliyatul Quran's permanent campus at New Dhaka City.", "بدء العمل في الحرم الدائم لكلية القرآن في مدينة دكا الجديدة."), "source": "imambukharitrust.com"},
    {"date": "2024", "title": T("পাইলিং ও সুন্নাহ কনফারেন্স বাংলাদেশ ২০২৪", "Piling and Sunnah Conference Bangladesh 2024", "الخوازيق ومؤتمر السنة في بنغلاديش 2024"), "text": T("মাসজিদ ও একাডেমিক ভবনের পাইলিং শুরু; সুন্নাহ কনফারেন্স বাংলাদেশ ২০২৪ আয়োজন।", "Piling begins for the masjid and academic building; Sunnah Conference Bangladesh 2024 is held.", "بدء أعمال الخوازيق للمسجد والمبنى الأكاديمي، وانعقاد مؤتمر السنة في بنغلاديش 2024."), "source": "IBT Catalog 2026 · YouTube"},
    {"date": "2026", "title": T("মাসজিদের কাঠামো উঠছে", "The masjid structure rises", "ارتفاع هيكل المسجد"), "text": T("২২৫টি পাইল ও মাসজিদের ছাদ ঢালাই সম্পন্ন; নির্মাণাধীন মাসজিদে সালাত শুরু; একাডেমিক ভবনের পাইল ক্যাপ ঢালাই চলমান।", "All 225 piles and the masjid's roof slabs are cast; prayers begin in the masjid under construction; pile-cap casting for the academic building is under way.", "اكتمال 225 خازوقًا وصب أسقف المسجد، وبدء الصلاة في المسجد قيد الإنشاء، ويجري صب رؤوس الخوازيق للمبنى الأكاديمي."), "source": "IBT Catalog 2026 · YouTube"}
]

C["institutions"] = [
    {
        "id": "ibjmc", "type": "masjid", "status": "construction",
        "name": T("ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স", "Imam Bukhari Jame Masjid Complex", "مجمع جامع الإمام البخاري"),
        "summary": T("মাসজিদ আন-নববীর আদলে মাসজিদকেন্দ্রিক দ্বীনি কমিউনিটির কেন্দ্র (নির্মাণাধীন)।", "The centre of a masjid-centred community modelled on Masjid an-Nabawi (under construction).", "مركزٌ لمجتمعٍ متمحورٍ حول المسجد على هدي المسجد النبوي (قيد الإنشاء)."),
        "image": "img/render-mosque.jpg",
        "link": "#project-ibjmc",
        "features": [
            T("সুন্নাহভিত্তিক প্রতিষ্ঠান: মাসজিদুল হারামের আদলে পরিকল্পনা ও নির্মাণ", "A Sunnah-based institution, planned in the spirit of Masjid al-Haram", "مؤسسة على السنة، مخططة على هدي المسجد الحرام"),
            T("দ্বীনি শিক্ষা: স্কলারদের সাহচর্যে দ্বীন শেখার সুযোগ", "Learning the deen in the company of scholars", "تعلم الدين في صحبة العلماء"),
            T("আন্তর্জাতিক মানের লাইব্রেরি: মাসজিদ আন-নববীর আদলে সমৃদ্ধ পাঠাগার", "An international-standard library modelled on Masjid an-Nabawi's", "مكتبة بمستوى دولي على غرار مكتبة المسجد النبوي"),
            T("আধুনিক প্রযুক্তির দাওয়াহ সেন্টার ও রেকর্ডিং স্টুডিও", "A technology-enabled Dawah centre and recording studio", "مركز دعوة ومرسم تسجيل بتقنيات حديثة"),
            T("তাহফীযুল কুরআন, শিশু ও বয়স্ক শিক্ষা", "Tahfiz al-Qur'an and learning for children and adults", "تحفيظ القرآن وتعليم الصغار والكبار"),
            T("ভাষা শিক্ষাকেন্দ্র, কর্মশালা, সেমিনার ও সিম্পোজিয়াম", "Language centre, workshops, seminars and symposia", "مركز لغات وورش وندوات"),
            T("বোনদের জন্য সালাত ও হালাকায় অংশগ্রহণের সুব্যবস্থা", "Proper facilities for sisters to join prayers and halaqas", "مرافق مناسبة للأخوات للصلاة والحلقات"),
            T("সুন্নাহ অনুযায়ী বিবাহ ও ওয়ালিমা আয়োজনের ব্যবস্থা", "Facilities for marriages and walimas according to the Sunnah", "تيسير عقود الزواج والولائم على السنة")
        ]
    },
    {
        "id": "kulliyatul-quran", "type": "higher", "status": "running",
        "name": T("কুল্লিয়াতুল কুরআনিল কারীম ওয়াদ-দিরাসাতিল ইসলামিয়্যাহ", "Kulliyatul Quranil Kareem wad-Dirasatil Islamiyyah", "كلية القرآن الكريم والدراسات الإسلامية"),
        "summary": T("মদীনা বিশ্ববিদ্যালয়ের আদলে বিশুদ্ধ আকীদাভিত্তিক উচ্চতর ইসলামী শিক্ষা, গবেষণা ও দাওয়াহ প্রতিষ্ঠান।", "A higher Islamic education, research and Dawah institution on sound creed, modelled on the University of Madinah.", "مؤسسة للتعليم الإسلامي العالي والبحث والدعوة على العقيدة الصحيحة، على غرار الجامعة الإسلامية بالمدينة."),
        "image": "img/halaqa-class.jpg",
        "body": T("২০২১ খ্রি. / ১৪৪২ হি. প্রতিষ্ঠিত কুল্লিয়াতুল কুরআন ইমাম বুখারী ট্রাস্টের একটি একাডেমিক উদ্যোগ। এখানে উচ্চমাধ্যমিক (সানাবিয়্যাহ), ব্যাচেলর (কুল্লিয়া) ও মাস্টার্স পর্যায়ের শিক্ষা দেওয়া হবে। ঢাকার উত্তরায় অস্থায়ী ক্যাম্পাসে শিক্ষা কার্যক্রম চলমান; স্থায়ী ক্যাম্পাসের নির্মাণকাজ চলছে নিউ ঢাকা সিটি, পলাশপুরে।", "Founded in 2021 / 1442 AH, Kulliyatul Quran is an academic initiative of Imam Bukhari Trust offering higher-secondary (Sanabiyyah), bachelor's (Kulliya) and master's level education. Classes run at a temporary campus in Uttara, Dhaka, while the permanent campus is being built at New Dhaka City, Palashpur.", "كلية القرآن مبادرة أكاديمية لوقف الإمام البخاري تأسست عام 2021م / 1442هـ، وتقدم التعليم في المرحلة الثانوية (السنابية) والبكالوريوس (الكلية) والماجستير. تجري الدراسة في حرمٍ مؤقت في أُتّرا بدكا، ويُبنى الحرم الدائم في مدينة دكا الجديدة."),
        "features": [
            T("মদীনা, আল-আযহারসহ শীর্ষ ইসলামী বিশ্ববিদ্যালয় থেকে ডিগ্রিপ্রাপ্ত শিক্ষকদের পাঠদান", "Teachers with degrees from Madinah, al-Azhar and other leading Islamic universities", "أساتذة متخرجون في المدينة والأزهر وغيرهما من الجامعات الإسلامية الكبرى"),
            T("আরবি ভাষায় দক্ষতা: বিদেশের নামকরা বিশ্ববিদ্যালয়ে উচ্চশিক্ষার প্রস্তুতি", "Arabic proficiency that prepares students for leading universities abroad", "إتقان العربية استعدادًا للدراسة في الجامعات العالمية"),
            T("আন্তর্জাতিক বিশ্ববিদ্যালয়ের সাথে একাডেমিক ইকুইভ্যালেন্স", "Academic equivalence with international universities", "معادلة أكاديمية مع جامعات دولية"),
            T("সৌদি আরব, মিশর, মালয়েশিয়া, মরক্কো ও ইন্দোনেশিয়ায় স্কলারশিপের প্রস্তুতি ও সহায়তা", "Preparation and support for scholarships in Saudi Arabia, Egypt, Malaysia, Morocco and Indonesia", "إعداد ودعم للمنح في السعودية ومصر وماليزيا والمغرب وإندونيسيا"),
            T("আরবি, ইংরেজি ও বাংলায় সমৃদ্ধ ফিজিক্যাল ও ডিজিটাল লাইব্রেরি", "A physical and digital library in Arabic, English and Bangla", "مكتبة ورقية ورقمية بالعربية والإنجليزية والبنغالية"),
            T("নারীদের জন্য পৃথক উচ্চশিক্ষার ব্যবস্থা", "Separate higher-education arrangements for women", "ترتيبات منفصلة لتعليم المرأة العالي")
        ],
        "programs": [
            {"name": T("কুল্লিয়া (ব্যাচেলর ইন ইসলামিক স্টাডিজ)", "Kulliya (Bachelor in Islamic Studies)", "الكلية (بكالوريوس الدراسات الإسلامية)"), "text": T("যোগ্যতা: সানাবিয়্যাহ, আলিম বা এইচএসসি পাস।", "Entry: Sanabiyyah, Alim or HSC.", "شرط القبول: السنابية أو العالم أو الثانوية العامة.")},
            {"name": T("সানাবিয়্যাহ (উচ্চমাধ্যমিক)", "Sanabiyyah (Higher Secondary)", "السنابية (المرحلة الثانوية)"), "text": T("যোগ্যতা: দাখিল, মিশকাত বা এসএসসি পাস। এসএসসি পাসদের জন্য আগে আরবি ভাষা কোর্স।", "Entry: Dakhil, Mishkat or SSC. SSC students first take the Arabic language courses.", "شرط القبول: الداخل أو المشكاة أو الشهادة المتوسطة، ويسبقها مقرر اللغة العربية لحملة الشهادة المتوسطة.")},
            {"name": T("একাডেমিক আরবি ভাষা কোর্স", "Academic Arabic Language Course", "دورة اللغة العربية للأغراض الأكاديمية"), "text": T("দাওরাতুল লুগাতিল আরাবিয়্যাহ লিল-আগরাদিল আকাদিমিয়্যাহ।", "Offered by the institute's Arabic Language Institute.", "تقدمها معهد اللغة العربية التابع للكلية.")},
            {"name": T("জেনারেল আরবি ভাষা কোর্স", "General Arabic Language Course", "دورة اللغة العربية العامة"), "text": T("সাধারণ শিক্ষার্থী ও ইংরেজি মাধ্যমের শিক্ষার্থীদের জন্য।", "For general learners and English-medium students.", "للدارسين عمومًا وطلاب المدارس الإنجليزية.")}
        ],
        "website": "https://kulliyatulquran.com/",
        "registrations": ["kq-admission-2027"]
    },
    {
        "id": "model-madrasa", "type": "school", "status": "running",
        "name": T("কুল্লিয়াতুল কুরআন মডেল মাদরাসা", "Kulliyatul Quran Model Madrasa", "مدرسة كلية القرآن النموذجية"),
        "formerName": T("পূর্বনাম: দারুল হাদীস অ্যারাবিক মাদরাসা", "Formerly: Darul Hadith Arabic Madrasa", "الاسم السابق: مدرسة دار الحديث العربية"),
        "summary": T("শৈশব থেকেই জ্ঞান, আদব ও নৈতিকতায় ইসলামকে ধারণ করা একটি প্রজন্ম গড়ার মাদরাসা; সাথে ইভিনিং মাদরাসা।", "A madrasa that raises children to hold Islam through knowledge, adab and character, with an Evening Madrasa.", "مدرسة تربي الأطفال على حمل الإسلام علمًا وأدبًا وخلقًا، ومعها مدرسة مسائية."),
        "image": "img/model-madrasa.jpg",
        "body": T("বাংলাদেশে দ্বীনের অগ্রযাত্রাকে টেকসই করতে শৈশব থেকেই এমন এক প্রজন্ম প্রয়োজন, যারা ইসলামকে কেবল আবেগে নয়, বরং জ্ঞান, আদব ও নৈতিকতায় ধারণ করবে। আধুনিক শিক্ষার চ্যালেঞ্জ ও ডিজিটাল ফিতনার ভিড়ে শিশুদের সঠিক তারবিয়াহ ও কুরআনি মূল্যবোধের সাথে সংযোগ ক্রমেই দুর্বল হয়ে পড়ছে। এই শূন্যতা পূরণে আমরা এমন একটি সমন্বিত কারিকুলাম ও পরিবেশ নিশ্চিত করছি, যেখানে শিশুরা সুন্নাহভিত্তিক শিষ্টাচার ও দ্বীনি আমানতদারিতার সাথে বেড়ে উঠবে।", "To make the progress of the deen in Bangladesh lasting, we need a generation that holds Islam not only through emotion but through knowledge, adab and character, from childhood. Amid the challenges of modern schooling and digital fitnah, children's link with proper tarbiyah and Qur'anic values keeps weakening. To fill this gap we provide an integrated curriculum and environment where children grow up with Sunnah-based manners and a sense of trust toward the deen.", "لكي يدوم تقدم الدين في بنغلاديش لا بد من جيلٍ يحمل الإسلام علمًا وأدبًا وخلقًا لا عاطفةً فحسب. ومع تحديات التعليم الحديث والفتن الرقمية تضعف صلة الأطفال بالتربية الصحيحة وقيم القرآن، لذا نوفر منهجًا متكاملًا وبيئة ينشأ فيها الأطفال على آداب السنة والأمانة الدينية."),
        "features": [
            T("কুরআন, হিফয ও তা‘লীমুল কুরআন", "Qur'an, Hifz and Ta'limul Quran", "القرآن والتحفيظ وتعليم القرآن"),
            T("আরবি, ইংরেজি ও বাংলা ভাষায় গুরুত্ব", "Emphasis on Arabic, English and Bangla", "عناية باللغات العربية والإنجليزية والبنغالية"),
            T("ইসলামী শিক্ষা, গণিত, বিজ্ঞান ও সামাজিক বিজ্ঞান", "Islamic studies, mathematics, science and social science", "التربية الإسلامية والرياضيات والعلوم والدراسات الاجتماعية"),
            T("সুন্নাহভিত্তিক তারবিয়াহ ও সহশিক্ষা কার্যক্রম", "Sunnah-based tarbiyah and co-curricular activities", "تربية على السنة وأنشطة لا صفية"),
            T("ইভিনিং মাদরাসা: স্কুলগামী শিশুদের জন্য সন্ধ্যাকালীন দ্বীনি শিক্ষা", "Evening Madrasa: evening Islamic classes for school-going children", "المدرسة المسائية: تعليم ديني مسائي لتلاميذ المدارس")
        ],
        "registrations": ["model-madrasa-2027"],
        "review": True
    },
    {
        "id": "after-school", "type": "school", "status": "running",
        "name": T("কুল্লিয়াতুল কুরআন আফটার স্কুল", "Kulliyatul Quran After School", "برنامج كلية القرآن بعد المدرسة"),
        "summary": T("সাধারণ স্কুলে পড়া শিশুদের জন্য স্কুলের পর কুরআন, আরবি ও ইসলামী আদব শিক্ষা।", "Qur'an, Arabic and Islamic manners after school hours for children in general schools.", "تعليم القرآن والعربية والآداب الإسلامية بعد الدوام لأطفال المدارس العامة."),
        "image": "img/program-women-children.jpg",
        "body": T("যেসব শিশু সাধারণ বা ইংরেজি মাধ্যম স্কুলে পড়ে, তাদের জন্য স্কুলের পর নির্ধারিত সময়ে কুরআন তিলাওয়াত, হিফয, আরবি ভাষা, আকীদা, সীরাহ ও দৈনন্দিন সুন্নাহ শেখানোর কার্যক্রম। বয়সভিত্তিক ব্যাচ, সময়সূচি ও ফি বিস্তারিত রেজিস্ট্রেশন পেজে।", "For children in general or English-medium schools: Qur'an recitation, hifz, Arabic, aqeedah, seerah and everyday Sunnah, taught at set times after school. Age groups, timings and fees are on the registration page.", "لأطفال المدارس العامة ومدارس اللغة الإنجليزية: تلاوة القرآن وحفظه والعربية والعقيدة والسيرة والسنن اليومية في أوقات محددة بعد المدرسة. الفئات العمرية والمواعيد والرسوم في صفحة التسجيل."),
        "features": [
            T("বয়সভিত্তিক ছোট ব্যাচ", "Small age-based batches", "مجموعات صغيرة حسب العمر"),
            T("কুরআন তিলাওয়াত ও হিফয", "Qur'an recitation and hifz", "التلاوة والتحفيظ"),
            T("আরবি ভাষার ভিত্তি", "Foundations of Arabic", "أساسيات العربية"),
            T("আকীদা, সীরাহ ও আদব", "Aqeedah, seerah and adab", "العقيدة والسيرة والآداب")
        ],
        "registrations": ["after-school-2027"],
        "review": True
    },
    {
        "id": "courses", "type": "courses", "status": "running",
        "name": T("কোর্সসমূহ", "Courses", "الدورات"),
        "summary": T("আরবি ভাষা, ডিপ্লোমা-সার্টিফিকেট এবং ব্যবহারিক ইসলামী প্রশিক্ষণ কোর্স।", "Arabic language, diploma and certificate courses, and practical Islamic training.", "دورات اللغة العربية والدبلومات والشهادات والتدريب الإسلامي العملي."),
        "image": "img/program-corporate.jpg",
        "body": T("কুল্লিয়াতুল কুরআন ও ইমাম বুখারী ট্রাস্টের কোর্সগুলোতে আরবি ভাষা থেকে শুরু করে সালাত, হজ্জ-উমরাহ, যাকাত হিসাব, প্যারেন্টিং এবং মৃতের গোসল-কাফন-দাফনের মতো ব্যবহারিক বিষয় শেখানো হয়।", "Courses at Kulliyatul Quran and Imam Bukhari Trust range from Arabic language to practical subjects such as salah, Hajj and Umrah, zakat calculation, parenting and the ghusl, kafan and burial of the deceased.", "تتنوع دورات كلية القرآن ووقف الإمام البخاري من اللغة العربية إلى الموضوعات العملية كالصلاة والحج والعمرة وحساب الزكاة والتربية الأسرية وتغسيل الميت وتكفينه ودفنه."),
        "programs": [
            {"name": T("২ মাসের নিবিড় আরবি কোর্স (দাখিল পরীক্ষার্থীদের জন্য)", "2-month intensive Arabic (for Dakhil candidates)", "دورة عربية مكثفة لشهرين (لطلاب الداخل)"), "text": T("চলমান", "Ongoing", "جارية")},
            {"name": T("জেনারেল ও একাডেমিক আরবি ভাষা কোর্স", "General and Academic Arabic courses", "دورات العربية العامة والأكاديمية"), "text": T("এক বছর মেয়াদি", "One year each", "مدة كل منها عام")},
            {"name": T("ফিকহুস সালাত ও ফিকহুস সিয়াম", "Fiqh of Salah and Fiqh of Fasting", "فقه الصلاة وفقه الصيام"), "text": T("সংক্ষিপ্ত কোর্স", "Short courses", "دورات قصيرة")},
            {"name": T("হজ্জ ও উমরাহ প্রশিক্ষণ", "Hajj and Umrah training", "تدريب الحج والعمرة"), "text": T("প্রতি বছর হজ্জের আগে", "Every year before Hajj", "سنويًا قبل الحج")},
            {"name": T("যাকাত হিসাব ও ব্যবসায় যাকাত কর্মশালা", "Zakat calculation and Zakat on business workshop", "ورشة حساب الزكاة وزكاة التجارة"), "text": T("ব্যবসায়ী ও পেশাজীবীদের জন্য", "For business people and professionals", "لرجال الأعمال والمهنيين")},
            {"name": T("প্যারেন্টিং ও পারিবারিক সমস্যা ব্যবস্থাপনা", "Parenting and family problem management", "التربية الأسرية وحل المشكلات الأسرية"), "text": T("কর্মশালা", "Workshops", "ورش عمل")},
            {"name": T("মৃতের গোসল, কাফন ও দাফন প্রশিক্ষণ", "Ghusl, kafan and burial training", "تدريب على تغسيل الميت وتكفينه ودفنه"), "text": T("নারী ও পুরুষের জন্য আলাদা সেশন", "Separate sessions for men and women", "جلسات منفصلة للرجال والنساء")},
            {"name": T("ডিপ্লোমা ও সার্টিফিকেট কোর্স", "Diploma and certificate courses", "دبلومات وشهادات"), "text": T("বিভিন্ন বিষয়ে", "Various subjects", "في موضوعات متعددة")}
        ],
        "registrations": ["arabic-intensive", "hajj-course-2027"]
    },
    {
        "id": "teachers-training", "type": "training", "status": "establishing",
        "name": T("টিচার্স ট্রেনিং ইনস্টিটিউট", "Teachers Training Institute", "معهد تدريب المعلمين"),
        "summary": T("ইমাম ও শিক্ষকদের জ্ঞান, নেতৃত্ব, পাঠদান পদ্ধতি ও কমিউনিটি এনগেজমেন্টে দক্ষ করে গড়ে তোলা।", "Training imams and teachers in scholarship, leadership, teaching methods and community engagement.", "إعداد الأئمة والمعلمين علمًا وقيادةً وطرقَ تدريسٍ وتواصلًا مع المجتمع."),
        "image": "img/sunnah-conference-2024.jpg",
        "body": T("সমাজের জন্য জ্ঞানী, দক্ষ ও দূরদর্শী নেতৃত্ব গড়তে ইমাম ও শিক্ষক প্রশিক্ষণ ইনস্টিটিউট প্রতিষ্ঠা করা হচ্ছে। ইতোমধ্যে টিচার্স ট্রেনিং কোর্স চলছে; যেমন ১৪ নভেম্বর ২০২৬-এ অনুষ্ঠিত দিনব্যাপী কর্মশালা “Effective Teaching: Integrating Modern and Islamic Perspectives”।", "The Imam and Teachers Training Institute is being established to develop knowledgeable, skilled and visionary leaders for the community. The Teachers Training Course is already running, for example the day-long workshop “Effective Teaching: Integrating Modern and Islamic Perspectives” held on 14 November 2026.", "يُنشأ معهد تدريب الأئمة والمعلمين لإعداد قيادات عالمة ماهرة بعيدة النظر للمجتمع. وتجري حاليًا دورة تدريب المعلمين، ومنها ورشة «التدريس الفعّال: الدمج بين المنظورين الحديث والإسلامي» في 14 نوفمبر 2026."),
        "features": [
            T("কার্যকর পাঠদান পদ্ধতি", "Effective teaching methods", "طرق التدريس الفعال"),
            T("ইমামতি ও খুতবা প্রশিক্ষণ", "Imamate and khutbah training", "تدريب الإمامة والخطابة"),
            T("শ্রেণিকক্ষ ব্যবস্থাপনা ও মূল্যায়ন", "Classroom management and assessment", "إدارة الصف والتقويم"),
            T("দা‘ঈ প্রশিক্ষণ কর্মসূচি", "Da'i training programme", "برنامج إعداد الدعاة")
        ],
        "registrations": ["teachers-training"]
    }
]

C["floors"] = {
    "asOf": "2026-11",
    "source": T("IBT ক্যাটালগ ২০২৬ ও নির্মাণ অগ্রগতির ভিডিও", "IBT Catalog 2026 and construction-progress videos", "كتيّب الوقف 2026 ومقاطع تقدم البناء"),
    "note": T("তথ্য হালনাগাদ করতে অ্যাডমিন প্যানেল ব্যবহার করুন।", "Update from the admin panel as work progresses.", "تُحدَّث البيانات من لوحة الإدارة."),
    "mosque": [
        {"label": T("ফাউন্ডেশন ও পাইলিং", "Foundation & piling", "الأساسات والخوازيق"), "use": T("৬৭টি পাইল", "67 piles", "67 خازوقًا"), "status": "done"},
        {"label": T("নিচতলা", "Ground floor", "الطابق الأرضي"), "use": T("মহিলা মাসজিদ ও ওযুখানা", "Sisters' prayer area & wudu", "مصلى النساء والمتوضأ"), "status": "done"},
        {"label": T("১ম তলা", "1st floor", "الطابق الأول"), "use": T("মূল মাসজিদ", "Main prayer hall", "قاعة الصلاة"), "status": "done"},
        {"label": T("২য় তলা", "2nd floor", "الطابق الثاني"), "use": T("মাসজিদ ও ই‘তিকাফ", "Prayer hall & i'tikaf", "الصلاة والاعتكاف"), "status": "done"},
        {"label": T("৩য় তলা", "3rd floor", "الطابق الثالث"), "use": T("মাসজিদ", "Prayer hall", "قاعة الصلاة"), "status": "planned"},
        {"label": T("৪র্থ তলা", "4th floor", "الطابق الرابع"), "use": T("মাসজিদ ও খাদেম কক্ষ", "Prayer hall & khadim room", "الصلاة وغرفة الخادم"), "status": "planned"},
        {"label": T("৫ম তলা", "5th floor", "الطابق الخامس"), "use": T("লাইব্রেরি, ইমাম কক্ষ", "Library & imam's room", "المكتبة وغرفة الإمام"), "status": "planned"},
        {"label": T("৬ষ্ঠ তলা", "6th floor", "الطابق السادس"), "use": T("ডাইনিং ও ছাদ-বারান্দা", "Dining & terrace", "قاعة الطعام والشرفة"), "status": "planned"}
    ],
    "academic": [
        {"label": T("ফাউন্ডেশন ও পাইলিং", "Foundation & piling", "الأساسات والخوازيق"), "use": T("১৫৮টি পাইল · পাইল ক্যাপ ঢালাই চলমান", "158 piles · pile caps being cast", "158 خازوقًا · صب رؤوس الخوازيق جارٍ"), "status": "progress"},
        {"label": T("নিচতলা", "Ground floor", "الطابق الأرضي"), "use": T("অভিভাবক কক্ষ, ডিসপ্লে, ক্যান্টিন", "Parents' lounge, display, canteen", "استراحة أولياء الأمور والمعرض والمقصف"), "status": "progress"},
        {"label": T("১ম তলা", "1st floor", "الطابق الأول"), "use": T("কনফারেন্স ও প্রশাসন", "Conference & administration", "المؤتمرات والإدارة"), "status": "planned"},
        {"label": T("২য় তলা", "2nd floor", "الطابق الثاني"), "use": T("শ্রেণিকক্ষ", "Classrooms", "فصول"), "status": "planned"},
        {"label": T("৩য় তলা", "3rd floor", "الطابق الثالث"), "use": T("শ্রেণিকক্ষ ও লাইব্রেরি", "Classrooms & library", "فصول ومكتبة"), "status": "planned"},
        {"label": T("৪র্থ তলা", "4th floor", "الطابق الرابع"), "use": T("শ্রেণিকক্ষ", "Classrooms", "فصول"), "status": "planned"},
        {"label": T("৫ম তলা", "5th floor", "الطابق الخامس"), "use": T("শ্রেণিকক্ষ", "Classrooms", "فصول"), "status": "planned"},
        {"label": T("৬ষ্ঠ তলা", "6th floor", "الطابق السادس"), "use": T("শ্রেণিকক্ষ", "Classrooms", "فصول"), "status": "planned"},
        {"label": T("৭ম তলা", "7th floor", "الطابق السابع"), "use": T("শ্রেণিকক্ষ", "Classrooms", "فصول"), "status": "planned"},
        {"label": T("৮ম তলা", "8th floor", "الطابق الثامن"), "use": T("শ্রেণিকক্ষ", "Classrooms", "فصول"), "status": "planned"},
        {"label": T("৯ম তলা", "9th floor", "الطابق التاسع"), "use": T("শ্রেণিকক্ষ", "Classrooms", "فصول"), "status": "planned"}
    ],
    "review": True
}

C["projects"] = [
    {
        "id": "ibjmc", "category": "infrastructure", "status": "ongoing",
        "name": T("ইমাম বুখারী জামে মাসজিদ ও একাডেমিক ক্যাম্পাস", "Imam Bukhari Jame Masjid & Academic Campus", "جامع الإمام البخاري والحرم الأكاديمي"),
        "location": T("নিউ ঢাকা সিটি, পলাশপুর, ঢাকা–মাওয়া এক্সপ্রেসওয়ে সংলগ্ন, ঢাকা", "New Dhaka City, Palashpur, by the Dhaka–Mawa Expressway, Dhaka", "مدينة دكا الجديدة، بلاشبور، بجوار طريق دكا–ماوا السريع"),
        "summary": T("ধলেশ্বরী নদীর তীরে মাসজিদ কমপ্লেক্স ও কুল্লিয়াতুল কুরআনের স্থায়ী একাডেমিক ক্যাম্পাস নির্মাণ।", "Building the masjid complex and Kulliyatul Quran's permanent academic campus on the bank of the Dhaleshwari.", "بناء مجمع المسجد والحرم الأكاديمي الدائم لكلية القرآن على ضفاف نهر دهاليشوري."),
        "image": "img/design-side.jpg",
        "body": T("জমি ক্রয় ও রেজিস্ট্রেশন, নির্মাণ অনুমোদন, মাটি পরীক্ষা, স্থাপত্য নকশা ও প্রাক-নির্মাণ কাজ সম্পন্ন হয়েছে। ২২৫টি পাইল এবং মাসজিদের ছাদ ঢালাই সম্পন্ন হয়েছে, আলহামদুলিল্লাহ; একাডেমিক ভবনের পাইল ক্যাপ ঢালাই চলমান। মাসজিদ ভবন: বি+জি+৫, প্রায় ৬১,২৯৪ বর্গফুট, মোট নামাজের স্থান ২০,৭৪১ বর্গফুট। একাডেমিক ভবন: বি+জি+৯, প্রায় ১,৮০,৭৯৯ বর্গফুট, ৭০টি শ্রেণিকক্ষ, ২,১০০ শিক্ষার্থীর ধারণক্ষমতা। প্রকল্পটি জিরো পয়েন্ট থেকে প্রায় ১৫ কিমি দূরে।", "Land purchase and registration, construction approval, soil testing, architectural design and pre-construction work are complete. All 225 piles and the masjid's roof slabs have been cast, alhamdulillah, and pile caps for the academic building are being cast. Masjid building: B+G+5, about 61,294 sq ft, with 20,741 sq ft of prayer space. Academic building: B+G+9, about 180,799 sq ft, 70 classrooms for 2,100 students. The site is about 15 km from Zero Point.", "اكتمل شراء الأرض وتسجيلها، والحصول على ترخيص البناء، وفحص التربة، والتصميم المعماري، وأعمال ما قبل البناء. واكتمل تنفيذ 225 خازوقًا وصب أسقف المسجد، والحمد لله، ويجري صب رؤوس الخوازيق للمبنى الأكاديمي. مبنى المسجد: قبو وأرضي وخمسة طوابق بنحو 61,294 قدمًا مربعًا ومساحة صلاة 20,741 قدمًا مربعًا. المبنى الأكاديمي: قبو وأرضي وتسعة طوابق بنحو 180,799 قدمًا مربعًا و70 فصلًا تتسع لـ2,100 طالب. يبعد الموقع نحو 15 كم عن النقطة الصفرية."),
        "objectives": [
            T("মাসজিদ আন-নববীর আদলে মাসজিদকেন্দ্রিক জ্ঞানভিত্তিক কমিউনিটি", "A knowledge-based, masjid-centred community on the model of Masjid an-Nabawi", "مجتمع معرفي متمحور حول المسجد على هدي المسجد النبوي"),
            T("কুল্লিয়াতুল কুরআনের স্থায়ী ক্যাম্পাস", "A permanent campus for Kulliyatul Quran", "حرم دائم لكلية القرآن"),
            T("আবাসিক স্কলার: কমিউনিটির জন্য সার্বক্ষণিক দ্বীনি অভিভাবক", "Resident scholars as the community's ongoing guides", "علماء مقيمون مرشدون دائمون للمجتمع"),
            T("নারী ও শিশুদের জন্য উন্নত সুবিধা", "Excellent facilities for women and children", "مرافق متميزة للنساء والأطفال")
        ],
        "design": ["img/design-front.jpg", "img/design-night-1.jpg", "img/design-aerial.jpg", "img/design-portal.jpg", "img/design-entrance.jpg", "img/design-courtyard.jpg", "img/design-plaza.jpg", "img/design-colonnade.jpg", "img/design-landscape.jpg", "img/design-night-2.jpg", "img/design-street.jpg", "img/design-aerial-2.jpg", "img/design-masjid-front.jpg", "img/design-night-3.jpg", "img/design-corner.jpg"],
        "gallery": [ "img/flood-2024-rehab-feni.jpg", "img/site-signboard.jpg", "img/construction-piling.jpg", "img/construction-formwork.jpg", "img/construction-structure.jpg", "img/first-prayer.jpg", "img/scholars-visit.jpg", "img/scholars-visit-group.jpg"],
        "tracker": True,
        "story": "ibjmc",
        "fund": "mosque"
    },
    {
        "id": "model-village", "category": "social", "status": "proposed",
        "name": T("মডেল ভিলেজ প্রকল্প", "Model Village Project", "مشروع القرية النموذجية"),
        "location": T("পাইলট গ্রাম নির্বাচন প্রক্রিয়াধীন", "Pilot village to be selected", "اختيار القرية التجريبية قيد الدراسة"),
        "summary": T("“দ্বীন, মর্যাদা ও টেকসই জীবিকায় গ্রাম গড়ি”: ত্রাণ থেকে আত্মনির্ভর ইসলামী কমিউনিটির পথে।", "“Building villages with deen, dignity and sustainability”: from relief to a self-reliant Islamic community.", "«قرى بالدين والكرامة والاستدامة»: من الإغاثة إلى مجتمع إسلامي مكتفٍ بذاته."),
        "image": "img/relief-flood-2.jpg",
        "body": T("প্রস্তাবিত পর্যায়। একটি পাইলট গ্রামে স্বল্পমেয়াদে জরুরি সহায়তা, মধ্যমেয়াদে মাছ চাষ, ক্ষুদ্র ব্যবসা ও বৃক্ষরোপণের মতো আয়বর্ধক প্রকল্প এবং দীর্ঘমেয়াদে আত্মনির্ভর দ্বীনি কমিউনিটি গড়ার পরিকল্পনা।", "Proposal stage. In one pilot village: immediate relief in the short term; income projects such as fish farming, small businesses and tree planting in the medium term; and a self-reliant Islamic community in the long term.", "مرحلة المقترح. في قرية تجريبية: إغاثة عاجلة على المدى القصير، ومشروعات مدرّة للدخل كتربية الأسماك والمشروعات الصغيرة والتشجير على المدى المتوسط، ومجتمع إسلامي مكتفٍ بذاته على المدى الطويل."),
        "review": True, "hidden": False
    }
]

C["initiatives"] = [
    {"id": "dawah", "icon": "dawah", "image": "img/halaqa-class.jpg",
     "name": T("দাওয়াহ ও হালাকা", "Dawah & Halaqa", "الدعوة والحلقات"),
     "summary": T("সাপ্তাহিক ইলমী মজলিস, প্রশ্নোত্তর, সিরিজ প্রোগ্রাম ও পডকাস্ট।", "Weekly ilmi majlis, Q&A, series programmes and podcasts.", "مجلس علمي أسبوعي وأسئلة وأجوبة وبرامج متسلسلة وبودكاست."),
     "body": T("নিয়মিত সাপ্তাহিক ইলমী মজলিস সশরীরে এবং Zoom, YouTube ও Facebook-এ সম্প্রচারিত হয়। সাপ্তাহিক প্রশ্নোত্তর সেশনে মানুষ কুরআন-সুন্নাহর আলোকে বাস্তব জীবনের প্রশ্নের উত্তর পান।", "The weekly ilmi majlis is held in person and broadcast on Zoom, YouTube and Facebook. In the weekly Q&A sessions people get answers to real-life questions in the light of the Qur'an and Sunnah.", "يُعقد المجلس العلمي الأسبوعي حضوريًا ويُبث عبر زوم ويوتيوب وفيسبوك، وفي جلسات الأسئلة الأسبوعية يجد الناس أجوبة لأسئلة حياتهم على ضوء الكتاب والسنة.")},
    {"id": "practical", "icon": "education", "image": "img/program-corporate.jpg",
     "name": T("বাস্তবমুখী ইসলামী প্রশিক্ষণ", "Practical Islamic Training", "التدريب الإسلامي العملي"),
     "summary": T("সালাত, হজ্জ-উমরাহ, যাকাত হিসাব, প্যারেন্টিং, মৃতের গোসল-কাফন-দাফন।", "Salah, Hajj and Umrah, zakat calculation, parenting, ghusl, kafan and burial.", "الصلاة والحج والعمرة وحساب الزكاة والتربية وتغسيل الميت وتكفينه ودفنه."),
     "body": T("ইসলামকে শুধু তাত্ত্বিক নসীহতে সীমাবদ্ধ না রেখে, নবী ﷺ-এর আদর্শ অনুসরণ করে ব্যবহারিক শিক্ষা দেওয়া হয়, যাতে মুসলিম পরিবার শান্তিপূর্ণ ও কল্যাণময় হয়।", "Rather than keeping Islam to theory, we teach its practice following the example of the Prophet ﷺ, so that Muslim families can live in peace and goodness.", "لا نقتصر على الوعظ النظري، بل نعلّم التطبيق العملي على هدي النبي ﷺ لتنعم الأسرة المسلمة بالسكينة والخير.")},
    {"id": "corporate", "icon": "briefcase", "image": "img/program-corporate.jpg",
     "name": T("কর্পোরেট ও পেশাজীবী প্রশিক্ষণ", "Corporate & Professional Training", "تدريب الموظفين والمهنيين"),
     "summary": T("কর্মজীবনে ইসলাম চর্চা, যাকাত ব্যবস্থাপনা ও সম্পদ-পরিশুদ্ধি।", "Practising Islam at work, zakat management and purifying wealth.", "ممارسة الإسلام في بيئة العمل وإدارة الزكاة وتطهير المال."),
     "body": T("বহু মুসলিম কর্মজীবী দীর্ঘ সময় কর্পোরেট পরিবেশে কাটান, যেখানে সময়ের চাপ ও নানা প্রলোভনের মাঝে ইসলাম আঁকড়ে থাকা কঠিন। এই প্রশিক্ষণে সেক্যুলার কর্মপরিবেশেও ইসলাম চর্চার ব্যবহারিক দিকনির্দেশনা দেওয়া হয়।", "Many Muslims spend long hours in corporate settings where time pressure and temptation make holding on to Islam hard. This training gives practical guidance for practising Islam even in secular workplaces.", "يقضي كثير من المسلمين ساعات طويلة في بيئات العمل حيث يصعب التمسك بالدين بين ضغط الوقت والمغريات، ويقدم هذا التدريب إرشادًا عمليًا لممارسة الإسلام فيها.")},
    {"id": "family", "icon": "family", "image": "img/program-women-children.jpg",
     "name": T("শক্তিশালী পরিবার, সফল প্রজন্ম", "Strong Families, Successful Generations", "أسرٌ قوية وأجيالٌ ناجحة"),
     "summary": T("পরিবারভিত্তিক কার্যক্রম, বিবাহ পরামর্শ এবং তরুণদের নেতৃত্ব ও চরিত্র গঠন।", "Family programmes, marriage counselling, and leadership and character training for youth.", "برامج أسرية واستشارات زواج وتدريب الشباب على القيادة وبناء الشخصية."),
     "body": T("মুসলিম পরিবার উম্মাহর ভিত্তি এবং তরুণরা তার ভবিষ্যৎ। পরিবারভিত্তিক ইসলামী কার্যক্রম, বিবাহ পরামর্শ এবং নৈতিক ও আত্মিক প্রশিক্ষণের মাধ্যমে পরিবারগুলোকে সুদৃঢ় করা হচ্ছে।", "Muslim families are the foundation of the Ummah and the young are its future. Families are strengthened through family-based programmes, marriage counselling and moral and spiritual training.", "الأسرة المسلمة أساس الأمة والشباب مستقبلها، ونقوّي الأسر عبر البرامج الأسرية واستشارات الزواج والتدريب الأخلاقي والروحي.")},
    {"id": "women", "icon": "women", "image": "img/program-women.jpg",
     "name": T("নারীদের জন্য বিশেষ গুরুত্ব", "Special Focus on Women", "عناية خاصة بالمرأة"),
     "summary": T("বোনদের জন্য হালাকা, প্রশ্নোত্তর, মানসিক স্বাস্থ্য ও ব্যবহারিক প্রশিক্ষণ।", "Halaqas, Q&A, mental health and practical training for sisters.", "حلقات وأسئلة وصحة نفسية وتدريب عملي للأخوات."),
     "body": T("নারীদের হাত ধরেই পরিবার গড়ে ওঠে। তাঁদের বিশুদ্ধ ইসলামী জ্ঞান অর্জন ও ফিতনাহ থেকে সুরক্ষায় বিশেষভাবে পরিকল্পিত কর্মসূচি নেওয়া হয়েছে, যার অনেকগুলো ইতোমধ্যে সফলভাবে সম্পন্ন হয়েছে।", "Families are built by women. Programmes designed specially for women help them gain authentic Islamic knowledge and protection from fitnah; many have already been completed.", "بالمرأة تُبنى الأسرة، وقد أُعدت برامج خاصة تعينها على تحصيل العلم الشرعي الأصيل والوقاية من الفتن، وقد أُنجز كثير منها.")},
    {"id": "research", "icon": "research", "image": "img/sunnah-conference-2024.jpg",
     "name": T("ইসলামী গবেষণা ও নীতিনির্ধারণী অংশগ্রহণ", "Islamic Research & Policy Engagement", "البحث الإسلامي والمشاركة في السياسات"),
     "summary": T("FSD, সুন্নাহ কনফারেন্স, “সুন্নাহর প্রামাণিকতা” আন্তর্জাতিক সেমিনার।", "FSD, the Sunnah Conference and the international seminar on “The Authenticity of the Sunnah”.", "منتدى الحوار الاستراتيجي ومؤتمر السنة وندوة «حجية السنة» الدولية."),
     "body": T("ইমাম বুখারী ট্রাস্টের পৃষ্ঠপোষকতায় Forum for Strategic Dialogue (FSD) গড়ে উঠেছে, যা গবেষণা, নীতি-প্রস্তাব, কৌশলগত পরিকল্পনা ও জনসচেতনতার মাধ্যমে কাজ করছে। “সুন্নাহর প্রামাণিকতা” বিষয়ে আন্তর্জাতিক সেমিনার আয়োজিত হয়েছে এবং সংবিধান সংশোধন কমিটির সাথে বৈঠক করে লিখিত পরামর্শ দেওয়া হয়েছে। National Dawah Strategy Blueprint প্রণয়ন চলছে।", "Under the patronage of Imam Bukhari Trust, the Forum for Strategic Dialogue (FSD) works through research, policy proposals, strategic planning and public awareness. An international seminar on “The Authenticity of the Sunnah” has been held, written recommendations were given to the constitution reform committee, and a National Dawah Strategy Blueprint is being prepared.", "برعاية الوقف نشأ منتدى الحوار الاستراتيجي الذي يعمل بالبحث ومقترحات السياسات والتخطيط الاستراتيجي والتوعية، وقد عُقدت ندوة دولية عن «حجية السنة»، وقُدمت توصيات مكتوبة للجنة تعديل الدستور، ويجري إعداد مخطط الاستراتيجية الوطنية للدعوة.")},
    {"id": "nonmuslim", "icon": "globe", "image": "img/event-gettogether.jpg",
     "name": T("অমুসলিমদের প্রতি দাওয়াহ", "Dawah to Non-Muslims", "دعوة غير المسلمين"),
     "summary": T("প্রজ্ঞা ও সদাচরণের সাথে ইসলামের সৌন্দর্য ও সত্যতা তুলে ধরা।", "Presenting the beauty and truth of Islam with wisdom and kindness.", "عرض جمال الإسلام وصدقه بالحكمة والإحسان."),
     "body": T("ভুল ধারণা দূর করা, ইসলামের সঠিক দৃষ্টিভঙ্গি উপস্থাপন এবং সত্যের আহ্বানে উদ্বুদ্ধ করতে লক্ষ্যভিত্তিক দাওয়াহ কার্যক্রম।", "Targeted Dawah that clears misconceptions, presents Islam's view correctly and invites people to the truth.", "دعوة موجهة لإزالة الشبهات وعرض الإسلام عرضًا صحيحًا والدعوة إلى الحق.")},
    {"id": "economy", "icon": "coin", "image": "img/program-corporate.jpg",
     "name": T("আর্থিক ক্ষমতায়ন ও হালাল অর্থনীতি", "Economic Empowerment & Halal Economy", "التمكين الاقتصادي والاقتصاد الحلال"),
     "summary": T("হালাল ব্যবসা প্রশিক্ষণ, পুনর্বাসন ও ব্যবসায় যাকাত ব্যবস্থাপনা।", "Halal business training, rehabilitation and zakat management for businesses.", "تدريب على التجارة الحلال وإعادة التأهيل وإدارة زكاة الشركات."),
     "body": T("হালাল ব্যবসা গড়ে তুলতে প্রশিক্ষণ ও পরামর্শ, পুনর্বাসনের ব্যবস্থা, এবং কর্মশালার মাধ্যমে ব্যবসায়িক প্রতিষ্ঠানগুলোকে যাকাত ব্যবস্থাপনা ও সম্পদ-পরিশুদ্ধিতে দিকনির্দেশনা দেওয়া হয়।", "Training and advice for building halal businesses, rehabilitation support, and workshops guiding businesses on zakat management and purifying wealth.", "تدريب واستشارات لبناء تجارة حلال، ودعم لإعادة التأهيل، وورش لإرشاد الشركات في إدارة الزكاة وتطهير المال.")},
    {"id": "digital", "icon": "play", "image": "img/chairman-speech.jpg",
     "name": T("ডিজিটাল প্রকাশনা ও দাওয়াহ", "Digital Publication & Dawah", "النشر والدعوة الرقمية"),
     "summary": T("ভিডিও, গবেষণা, প্রবন্ধ, বই এবং উন্নত প্রযুক্তির স্টুডিও।", "Video, research, articles, books and a high-tech studio.", "فيديو وبحوث ومقالات وكتب واستوديو حديث."),
     "body": T("সোশ্যাল মিডিয়া ও ডিজিটাল মাধ্যম ব্যবহার করে সঠিক ইসলামী শিক্ষা ছড়ানো এখন সময়ের দাবি। অসংখ্য ইসলামী কনটেন্ট প্রচারিত হয়েছে এবং একটি উন্নত প্রযুক্তির স্টুডিও তৈরির কাজ চলছে।", "Spreading authentic Islamic teaching through social and digital media is a need of our time. A great deal of content has been published and a high-tech studio is being built.", "نشر العلم الصحيح عبر وسائل التواصل والإعلام الرقمي ضرورة العصر، وقد نُشر محتوى كثير ويجري إنشاء استوديو بتقنيات متقدمة.")},
    {"id": "welfare", "icon": "social", "image": "img/relief-flood-1.jpg",
     "name": T("সামাজিক কল্যাণমূলক কর্মসূচি", "Social Welfare Programmes", "برامج الرعاية الاجتماعية"),
     "summary": T("খাদ্য ও শীতবস্ত্র, ইফতার, বন্যা ত্রাণ, চিকিৎসা সেবা, বৃক্ষরোপণ।", "Food and winter clothes, iftar, flood relief, medical support, tree planting.", "الغذاء وكسوة الشتاء والإفطار وإغاثة الفيضانات والدعم الطبي والتشجير."),
     "body": T("সুন্নাহভিত্তিক সমাজকল্যাণমূলক কার্যক্রম: খাদ্য ও শীতবস্ত্র বিতরণ, অসচ্ছলদের জন্য ইফতার, বন্যার্তদের সহায়তা, অসহায়দের চিকিৎসা সেবা, বৃক্ষরোপণ, আলেমদের স্বাস্থ্যসেবা ও দরিদ্রদের জন্য সাদাকাহ। লক্ষ্য আল্লাহর সন্তুষ্টি অর্জন এবং ইসলামের সৌন্দর্য মানুষের সামনে তুলে ধরা।", "Sunnah-based welfare: food and winter-clothes distribution, iftar for those in need, flood relief, medical care for the helpless, tree planting, healthcare for scholars and sadaqah for the poor, seeking Allah's pleasure and showing people the beauty of Islam.", "عمل اجتماعي على السنة: توزيع الغذاء وكسوة الشتاء، وإفطار المحتاجين، وإغاثة المنكوبين بالفيضانات، وعلاج الضعفاء، والتشجير، والرعاية الصحية للعلماء، والصدقة على الفقراء، ابتغاء مرضاة الله وإظهارًا لجمال الإسلام.")},
    {"id": "community", "icon": "masjid", "image": "img/event-gettogether.jpg",
     "name": T("দ্বীনি কমিউনিটি গঠন", "Building a Dīnī Community", "بناء المجتمع الإيماني"),
     "summary": T("ফ্যামিলি গেট-টুগেদার, ইফতার প্রোগ্রাম ও মাসজিদকেন্দ্রিক কমিউনিটি ভিশন।", "Family get-togethers, iftar programmes and the masjid-centred community vision.", "لقاءات عائلية وبرامج إفطار ورؤية مجتمع حول المسجد."),
     "body": T("সমর্থক পরিবারগুলোর বার্ষিক গেট-টুগেদার, ইফতার মাহফিল এবং মাসজিদকে ঘিরে দ্বীনদার পরিবারের কমিউনিটি গড়ার উদ্যোগ। আবাসন সংক্রান্ত তথ্য দানের তহবিল থেকে সম্পূর্ণ আলাদা।", "Annual get-togethers for supporting families, iftar gatherings and the effort to build a community of practising families around the masjid. Housing information is kept fully separate from donation funds.", "لقاءات سنوية للأسر الداعمة، وموائد إفطار، ومسعى لبناء مجتمع من الأسر الملتزمة حول المسجد، مع فصل معلومات السكن تمامًا عن أموال التبرعات.")}
]

C["impact"] = {
    "asOf": "2026-02-15",
    "source": T("IBT ক্যাটালগ ২০২৬", "IBT Catalog 2026", "كتيّب الوقف 2026"),
    "groups": [
        {"title": T("শিক্ষা, দাওয়াহ ও প্রশিক্ষণ", "Education, Dawah & Training", "التعليم والدعوة والتدريب"), "items": [
            {"value": "16800", "suffix": "", "label": T("ঘণ্টা কুরআন-সুন্নাহভিত্তিক লেকচার ও দারস", "hours of Qur'an-and-Sunnah lectures and dars", "ساعة من الدروس والمحاضرات")},
            {"value": "340", "suffix": "+", "label": T("জন ইসলামিক শর্ট-কোর্স সম্পন্ন", "completed Islamic short courses", "أتموا دورات قصيرة")},
            {"value": "18", "suffix": "", "label": T("জন সানাবিয়্যাহ সম্পন্ন", "completed Sanabiyyah", "أتموا المرحلة الثانوية")},
            {"value": "6", "suffix": "", "label": T("জন আন্তর্জাতিক বিশ্ববিদ্যালয়ে ভর্তি", "admitted to international universities", "قُبلوا في جامعات دولية")},
            {"value": "50", "suffix": "", "label": T("জন কর্পোরেট/পেশাজীবী প্রশিক্ষিত", "corporate professionals trained", "مهنيًا تلقوا التدريب")}
        ]},
        {"title": T("সামাজিক কল্যাণ", "Social Welfare", "الرعاية الاجتماعية"), "items": [
            {"value": "400", "suffix": "+", "label": T("পরিবার শীতবস্ত্র সহায়তা পেয়েছে", "families received winter clothes", "أسرة تلقت كسوة الشتاء")},
            {"value": "300", "suffix": "+", "label": T("দরিদ্র পরিবার ইফতার/খাদ্য সহায়তা পেয়েছে", "poor families received iftar or food", "أسرة فقيرة تلقت إفطارًا أو غذاءً")},
            {"value": "100", "suffix": "+", "label": T("বন্যার্ত পরিবার সহায়তা পেয়েছে", "flood-affected families supported", "أسرة منكوبة بالفيضان")},
            {"value": "90", "suffix": "+", "label": T("পরিবার কুরবানির গোশত পেয়েছে", "families received Qurbani meat", "أسرة تلقت لحوم الأضاحي")},
            {"value": "20", "suffix": "+", "label": T("চিকিৎসা সেবা প্রদান", "medical support cases", "حالة دعم طبي")}
        ]},
        {"title": T("ডিজিটাল দাওয়াহ ও কমিউনিটি", "Digital Dawah & Community", "الدعوة الرقمية والمجتمع"), "items": [
            {"value": "30", "suffix": "M+", "label": T("ফেসবুকে কনটেন্ট ভিউ", "content views on Facebook", "مشاهدة على فيسبوك")},
            {"value": "232", "suffix": "K+", "label": T("ইউটিউবে কনটেন্ট ভিউ", "content views on YouTube", "مشاهدة على يوتيوب")},
            {"value": "660", "suffix": "+", "label": T("ইসলামিক ভিডিও/ডিজিটাল কনটেন্ট", "Islamic videos and digital content", "فيديو ومحتوى رقمي")},
            {"value": "16", "suffix": "", "label": T("সক্রিয় WhatsApp দ্বীনি কমিউনিটি গ্রুপ", "active WhatsApp community groups", "مجموعة واتساب نشطة")},
            {"value": "42", "suffix": "", "label": T("পরিবার কমিউনিটি ভিশনের আওতায় যুক্ত", "families joined the community vision", "أسرة انضمت إلى رؤية المجتمع")}
        ]}
    ],
    "qualitative": [
        T("১টি আন্তর্জাতিক সেমিনার: “সুন্নাহর প্রামাণিকতা”", "1 international seminar: “The Authenticity of the Sunnah”", "ندوة دولية: «حجية السنة»"),
        T("সংবিধান কমিটিতে লিখিত ইনপুট", "Written input to the constitution committee", "مساهمة مكتوبة للجنة الدستور"),
        T("৩টি বৃহৎ দ্বীনি ফ্যামিলি গেট-টুগেদার ও ৪টি ইফতার প্রোগ্রাম", "3 large family get-togethers and 4 iftar programmes", "3 لقاءات عائلية كبرى و4 برامج إفطار"),
        T("National Dawah Strategy Blueprint প্রণয়ন (চলমান)", "National Dawah Strategy Blueprint (in progress)", "مخطط الاستراتيجية الوطنية للدعوة (قيد الإعداد)")
    ]
}

C["funds"] = [
    {"id": "mosque", "head": "Mosque", "featured": True, "image": "img/render-mosque.jpg",
     "name": T("মাসজিদ নির্মাণ তহবিল", "Masjid Construction Fund", "صندوق بناء المسجد"),
     "text": T("ইমাম বুখারী জামে মাসজিদ কমপ্লেক্সের নির্মাণ। এটি এক সাদাকায়ে জারিয়াহ।", "Building the Imam Bukhari Jame Masjid Complex: a continuing charity (sadaqah jariyah).", "بناء مجمع جامع الإمام البخاري، صدقة جارية."), "suggested": [1000, 5000, 35000, 100000]},
    {"id": "academy", "head": "Academy Fund", "featured": True, "image": "img/render-academic.jpg",
     "name": T("একাডেমিক ভবন তহবিল", "Academic Building Fund", "صندوق المبنى الأكاديمي"),
     "text": T("কুল্লিয়াতুল কুরআনের স্থায়ী একাডেমিক ভবন: শ্রেণিকক্ষ, লাইব্রেরি ও দাওয়াহ সেন্টার।", "Kulliyatul Quran's permanent academic building: classrooms, library and Dawah centre.", "المبنى الأكاديمي الدائم لكلية القرآن: الفصول والمكتبة ومركز الدعوة."), "suggested": [1000, 5000, 25000, 150000]},
    {"id": "sadaqah", "head": "Sadaqa", "featured": True, "image": "img/event-gettogether.jpg",
     "name": T("সাধারণ সাদাকাহ তহবিল", "General Sadaqah Fund", "صندوق الصدقة العامة"),
     "text": T("যেখানে প্রয়োজন সবচেয়ে বেশি, সেখানে ট্রাস্টের সব দ্বীনি কার্যক্রমে ব্যয় হবে।", "Used across all of the Trust's work, wherever the need is greatest.", "يُصرف في جميع أعمال الوقف حيث الحاجة أشد."), "suggested": [500, 1000, 5000, 10000]},
    {"id": "zakat", "head": "Zakat", "featured": True, "image": "img/relief-flood-1.jpg",
     "name": T("যাকাত তহবিল", "Zakat Fund", "صندوق الزكاة"),
     "text": T("সম্পূর্ণ আলাদা হিসাবে রাখা হয় এবং শরীয়াহসম্মত খাতে ব্যয় হয় (আলেমগণের অনুমোদিত নীতিমালা অনুযায়ী)।", "Kept fully separate and spent only on eligible categories, under a policy approved by scholars.", "يُحفظ في حساب مستقل ويُصرف في مصارفه الشرعية وفق سياسة يقرها العلماء."), "suggested": [1000, 5000, 10000, 50000]},
    {"id": "monthly", "head": "Monthly", "featured": False, "image": "img/scholars-visit-group.jpg",
     "name": T("মাসিক দাতা সদস্য", "Monthly Donor Membership", "عضوية المتبرع الشهري"),
     "text": T("প্রতি মাসে নির্দিষ্ট অবদান রেখে ট্রাস্টের নিয়মিত কাজের ভিত মজবুত করুন।", "Strengthen the Trust's regular work with a fixed monthly contribution.", "ادعم أعمال الوقف المنتظمة بمساهمة شهرية ثابتة."), "suggested": [500, 1000, 2000, 5000]},
    {"id": "kulliya", "head": "Kulliya", "featured": False, "image": "img/halaqa-class.jpg",
     "name": T("কুল্লিয়াতুল কুরআন তহবিল", "Kulliyatul Quran Fund", "صندوق كلية القرآن"),
     "text": T("শিক্ষার্থী বৃত্তি, শিক্ষক ও শিক্ষা কার্যক্রম (মডেল মাদরাসা ও আফটার স্কুলসহ)।", "Student scholarships, teachers and academic programmes (including the Model Madrasa and After School).", "منح الطلاب والمعلمين والبرامج التعليمية (ومنها المدرسة النموذجية وبرنامج ما بعد المدرسة)."), "suggested": [1000, 3000, 6000, 12000]},
    {"id": "social", "head": "Social Development", "featured": False, "image": "img/relief-flood-2.jpg",
     "name": T("সমাজকল্যাণ তহবিল", "Social Welfare Fund", "صندوق الرعاية الاجتماعية"),
     "text": T("ত্রাণ, ইফতার, শীতবস্ত্র, চিকিৎসা ও পুনর্বাসন।", "Relief, iftar, winter clothes, medical care and rehabilitation.", "الإغاثة والإفطار وكسوة الشتاء والعلاج وإعادة التأهيل."), "suggested": [500, 1000, 3000, 10000]},
    {"id": "dawah", "head": "Da'wa & Events", "featured": False, "image": "img/chairman-speech.jpg",
     "name": T("দাওয়াহ ও ইভেন্ট তহবিল", "Dawah & Events Fund", "صندوق الدعوة والفعاليات"),
     "text": T("হালাকা, কোর্স, কর্মশালা ও ডিজিটাল দাওয়াহ।", "Halaqas, courses, workshops and digital Dawah.", "الحلقات والدورات والورش والدعوة الرقمية."), "suggested": [500, 1000, 5000, 10000]},
    {"id": "research", "head": "Research", "featured": False, "image": "img/sunnah-conference-2024.jpg",
     "name": T("গবেষণা তহবিল", "Research Fund", "صندوق البحث العلمي"),
     "text": T("গবেষণা, সেমিনার ও প্রকাশনা।", "Research, seminars and publications.", "البحث والندوات والنشر."), "suggested": [1000, 5000, 10000, 25000]}
]

C["supportItems"] = {
    "asOf": "2026-02-15",
    "items": [
        {"name": T("২২৫টি পাইল নির্মাণ", "Construction of 225 piles", "تنفيذ 225 خازوقًا"), "amount": 0, "status": "done"},
        {"name": T("মাসজিদের প্রথম ছাদ ঢালাই", "The masjid's first roof slab", "صب السقف الأول للمسجد"), "amount": 0, "status": "done"},
        {"name": T("একজন মুসল্লির জায়গা", "Space for one musalli", "مكان مصلٍّ واحد"), "amount": 35000, "status": "open"},
        {"name": T("প্রতি বর্গফুট নির্মাণ", "One square foot of construction", "قدم مربع من البناء"), "amount": 3200, "status": "open"},
        {"name": T("একটি ওযুখানা", "One wudu (ablution) point", "موضع وضوء واحد"), "amount": 15000, "status": "open"},
        {"name": T("১০০ ব্যাগ সিমেন্ট", "100 bags of cement", "100 كيس إسمنت"), "amount": 51000, "status": "open"},
        {"name": T("২,০০০ ইট", "2,000 bricks", "2000 طوبة"), "amount": 26000, "status": "open"},
        {"name": T("এক টন রড", "One ton of steel rod", "طن من حديد التسليح"), "amount": 93000, "status": "open"},
        {"name": T("একটি শ্রেণিকক্ষ", "One classroom", "فصل دراسي"), "amount": 1500000, "status": "open"},
        {"name": T("দাওয়াহ সেন্টার", "The Dawah centre", "مركز الدعوة"), "amount": 5000000, "status": "open"},
        {"name": T("মাসজিদের প্রতি ছাদ ঢালাই", "Each roof slab of the masjid", "صب كل سقف للمسجد"), "amount": 5580000, "status": "open"}
    ]
}

C["payment"] = {
    "channels": [
        {"type": "bkash", "name": T("বিকাশ (মার্চেন্ট)", "bKash (Merchant)", "بيكاش (تاجر)"), "number": "01852-808554", "note": T("“Payment” অপশন ব্যবহার করুন। শীঘ্রই অনলাইন পেমেন্ট ও মাসিক অটো-পে।", "Use the “Payment” option. Online checkout and monthly auto-pay coming soon.", "استخدم خيار «الدفع». الدفع الإلكتروني والخصم الشهري التلقائي قريبًا."), "show": True},
        {"type": "nagad", "name": T("নগদ (পার্সোনাল)", "Nagad (Personal)", "نقد (شخصي)"), "number": "01306-746437", "note": T("“Send Money” করুন", "Use “Send Money”", "استخدم «إرسال المال»"), "show": True},
        {"type": "rocket", "name": T("রকেট (পার্সোনাল)", "Rocket (Personal)", "روكيت (شخصي)"), "number": "01306-746437", "note": T("“Send Money” করুন", "Use “Send Money”", "استخدم «إرسال المال»"), "show": True},
        {"type": "bank", "name": T("ব্যাংক একাউন্ট", "Bank account", "حساب بنكي"), "number": "2050 2230 2018 75016", "note": T("IMAM BUKHARY JAME MOSJID COMPLEX, BANGLADESH · Islami Bank Bangladesh Ltd., VIP Road Br., Dhaka · SWIFT: IBBLBDDH223 · Routing: 125276856", "IMAM BUKHARY JAME MOSJID COMPLEX, BANGLADESH · Islami Bank Bangladesh Ltd., VIP Road Branch, Dhaka · SWIFT: IBBLBDDH223 · Routing: 125276856", "IMAM BUKHARY JAME MOSJID COMPLEX, BANGLADESH · بنك إسلامي بنغلاديش، فرع طريق VIP، دكا · SWIFT: IBBLBDDH223"), "show": True}
    ],
    "gatewayLive": False,
    "autopayLive": False,
    "review": True
}

C["donateCopy"] = {
    "motivations": [
        {"title": T("জান্নাতে আপনার জন্য একটি ঘর", "A house for you in Paradise", "بيتٌ لك في الجنة"),
         "text": T("রাসূলুল্লাহ ﷺ বলেছেন: “যে ব্যক্তি আল্লাহর জন্য একটি মাসজিদ নির্মাণ করে, আল্লাহ তার জন্য জান্নাতে একটি ঘর নির্মাণ করেন।”", "The Prophet ﷺ said: “Whoever builds a masjid for Allah, Allah will build for him a house in Paradise.”", ""),
         "ref": T("সহীহ বুখারী ৪৫০; সহীহ মুসলিম ৫৩৩", "Sahih al-Bukhari 450; Sahih Muslim 533", "صحيح البخاري 450؛ صحيح مسلم 533")},
        {"title": T("পিতামাতার জন্য স্থায়ী সওয়াব", "Lasting reward for your parents", "أجرٌ دائمٌ لوالديك"),
         "text": T("রাসূলুল্লাহ ﷺ বলেছেন: “মানুষ মারা গেলে তার সব আমল বন্ধ হয়ে যায়, তিনটি ছাড়া: সাদাকায়ে জারিয়াহ, উপকারী ইলম, অথবা নেক সন্তান যে তার জন্য দু‘আ করে।”", "The Prophet ﷺ said: “When a person dies, his deeds come to an end except for three: a continuing charity, beneficial knowledge, or a righteous child who prays for him.”", ""),
         "ref": T("সহীহ মুসলিম ১৬৩১", "Sahih Muslim 1631", "صحيح مسلم 1631")},
        {"title": T("সওয়াবের বীজ বপন করুন", "Sow a seed of reward", "ازرع بذرة الأجر"),
         "text": T("আল্লাহর পথে যারা ব্যয় করে, তাদের উদাহরণ একটি শস্যদানার মতো, যা থেকে সাতটি শীষ জন্মায়, প্রতিটি শীষে একশত দানা।", "Those who spend in the way of Allah are like a grain that grows seven ears, with a hundred grains in each ear.", ""),
         "ref": T("সূরা আল-বাকারা ২:২৬১", "Surah al-Baqarah 2:261", "سورة البقرة 2:261")}
    ],
    "transparency": T("প্রতিটি দান নির্দিষ্ট তহবিলের হিসাবে আলাদাভাবে লিপিবদ্ধ হয়। যাকাত, সাদাকাহ ও প্রকল্পভিত্তিক দান কখনো মেশানো হয় না। প্রতিটি দানের জন্য রসিদ দেওয়া হয় এবং বার্ষিক প্রতিবেদনে হিসাব প্রকাশ করা হয়।", "Every donation is recorded separately against its fund. Zakat, sadaqah and project donations are never mixed. Every donation receives a receipt, and accounts are published in the annual report.", "تُسجَّل كل تبرعة في حساب صندوقها مستقلةً، ولا تُخلط الزكاة بالصدقة ولا بتبرعات المشاريع، ولكل تبرعٍ إيصال، وتُنشر الحسابات في التقرير السنوي."),
    "review": True
}

C["registrations"] = [
    {"id": "kq-admission-2027", "type": "admission", "entity": "kulliyatul-quran", "image": "img/halaqa-class.jpg",
     "title": T("কুল্লিয়াতুল কুরআন ভর্তি: সেশন ২০২৭ (সানাবিয়্যাহ ও কুল্লিয়া)", "Kulliyatul Quran admission: Session 2027 (Sanabiyyah & Kulliya)", "القبول في كلية القرآن: العام الدراسي 2027 (السنابية والكلية)"),
     "text": T("দাখিল/এসএসসি বা আলিম/এইচএসসি উত্তীর্ণ শিক্ষার্থীদের জন্য। ভর্তি পরীক্ষা, পূর্ণকালীন অধ্যয়ন ও আবাসিক সুবিধা।", "For students who have passed Dakhil/SSC or Alim/HSC. Admission test, full-time study and residential facilities.", "لخريجي الداخل/الثانوية المتوسطة أو العالم/الثانوية العامة. اختبار قبول ودراسة بدوام كامل وسكن طلابي."),
     "opens": "2026-11-01", "closes": "2027-01-15", "mode": "link", "formUrl": "", "fee": T("ফরম ফি প্রযোজ্য", "Form fee applies", "توجد رسوم استمارة"), "venue": T("উত্তরা ক্যাম্পাস, ঢাকা", "Uttara campus, Dhaka", "حرم أُتّرا، دكا"), "slug": "kq-2027"},
    {"id": "model-madrasa-2027", "type": "admission", "entity": "model-madrasa", "image": "img/model-madrasa.jpg",
     "title": T("কুল্লিয়াতুল কুরআন মডেল মাদরাসা: ভর্তি ২০২৭", "Kulliyatul Quran Model Madrasa: admission 2027", "مدرسة كلية القرآن النموذجية: القبول 2027"),
     "text": T("শিশু শ্রেণি থেকে বিভিন্ন শ্রেণিতে ভর্তি। আসন সীমিত।", "Admission from the early years upward. Limited seats.", "القبول من مرحلة الطفولة المبكرة فما فوق. المقاعد محدودة."),
     "opens": "2026-11-01", "closes": "2026-12-31", "mode": "link", "formUrl": "", "fee": T("বিস্তারিত অফিসে", "Details at the office", "التفاصيل في المكتب"), "venue": T("উত্তরা, ঢাকা", "Uttara, Dhaka", "أُتّرا، دكا"), "slug": "madrasa-2027"},
    {"id": "after-school-2027", "type": "course", "entity": "after-school", "image": "img/program-women-children.jpg",
     "title": T("কুল্লিয়াতুল কুরআন আফটার স্কুল: নতুন ব্যাচ", "Kulliyatul Quran After School: new batch", "برنامج ما بعد المدرسة: دفعة جديدة"),
     "text": T("স্কুলগামী শিশুদের জন্য কুরআন, আরবি ও আদব।", "Qur'an, Arabic and adab for school-going children.", "القرآن والعربية والآداب لتلاميذ المدارس."),
     "opens": "2026-11-01", "closes": "2027-01-31", "mode": "link", "formUrl": "", "fee": T("মাসিক ফি", "Monthly fee", "رسوم شهرية"), "venue": T("উত্তরা, ঢাকা", "Uttara, Dhaka", "أُتّرا، دكا"), "slug": "after-school"},
    {"id": "arabic-intensive", "type": "course", "entity": "courses", "image": "img/program-corporate.jpg",
     "title": T("২ মাসের নিবিড় আরবি ভাষা কোর্স", "2-month intensive Arabic course", "دورة عربية مكثفة لشهرين"),
     "text": T("দাখিল পরীক্ষার্থী ও আরবি ভাষায় ভিত্তি গড়তে আগ্রহীদের জন্য।", "For Dakhil candidates and anyone building a foundation in Arabic.", "لطلاب الداخل ولكل من يريد تأسيسًا في العربية."),
     "opens": "2026-11-10", "closes": "2026-12-20", "mode": "link", "formUrl": "", "fee": T("কোর্স ফি প্রযোজ্য", "Course fee applies", "توجد رسوم"), "venue": T("উত্তরা ক্যাম্পাস", "Uttara campus", "حرم أُتّرا"), "slug": "arabic-2m"},
    {"id": "hajj-course-2027", "type": "course", "entity": "courses", "image": "img/scholars-visit-group.jpg",
     "title": T("হজ্জ ও উমরাহ প্রশিক্ষণ কোর্স ২০২৭", "Hajj & Umrah training course 2027", "دورة الحج والعمرة 2027"),
     "text": T("হজ্জযাত্রীদের জন্য সুন্নাহভিত্তিক ব্যবহারিক প্রশিক্ষণ।", "Sunnah-based practical training for pilgrims.", "تدريب عملي على السنة للحجاج."),
     "opens": "2027-02-01", "closes": "2027-04-15", "mode": "link", "formUrl": "", "fee": T("ফ্রি", "Free", "مجاني"), "venue": T("অনলাইন ও সশরীরে", "Online and in person", "عن بُعد وحضوريًا"), "slug": "hajj-2027"},
    {"id": "teachers-training", "type": "training", "entity": "teachers-training", "image": "img/sunnah-conference-2024.jpg",
     "title": T("টিচার্স ট্রেনিং: Effective Teaching (পরবর্তী ব্যাচ)", "Teachers Training: Effective Teaching (next batch)", "تدريب المعلمين: التدريس الفعّال (الدفعة القادمة)"),
     "text": T("মাদরাসা ও স্কুল শিক্ষকদের জন্য দিনব্যাপী কর্মশালা: আধুনিক ও ইসলামী দৃষ্টিভঙ্গির সমন্বয়।", "A day-long workshop for madrasa and school teachers, integrating modern and Islamic perspectives.", "ورشة ليوم كامل لمعلمي المدارس، تجمع بين المنظورين الحديث والإسلامي."),
     "opens": "2026-12-01", "closes": "2027-01-20", "mode": "link", "formUrl": "", "fee": T("নিবন্ধন ফি প্রযোজ্য", "Registration fee applies", "توجد رسوم تسجيل"), "venue": T("ঢাকা", "Dhaka", "دكا"), "slug": "teachers"},
    {"id": "volunteer", "type": "volunteer", "entity": "", "image": "img/event-gettogether.jpg",
     "title": T("স্বেচ্ছাসেবক হিসেবে যুক্ত হোন", "Join as a volunteer", "انضم متطوعًا"),
     "text": T("ইভেন্ট, ত্রাণ, ডিজিটাল দাওয়াহ ও প্রশাসনিক কাজে আপনার সময় ও দক্ষতা দিন।", "Give your time and skills to events, relief, digital Dawah and administration.", "قدّم وقتك ومهاراتك في الفعاليات والإغاثة والدعوة الرقمية والإدارة."),
     "opens": "2026-01-01", "closes": "2027-12-31", "mode": "native", "formUrl": "", "fee": T("—", "—", "—"), "venue": T("ঢাকা ও সারাদেশ", "Dhaka and nationwide", "دكا وجميع أنحاء البلاد"), "slug": "volunteer"}
]

C["events"] = [
    {"date": "2026-11-21", "time": "17:00", "title": T("সাপ্তাহিক ইলমী মজলিস", "Weekly ilmi majlis", "المجلس العلمي الأسبوعي"), "venue": T("উত্তরা ও অনলাইন", "Uttara and online", "أُتّرا وعن بُعد"), "type": "halaqa", "registration": ""},
    {"date": "2026-11-28", "time": "17:00", "title": T("সাপ্তাহিক ইলমী মজলিস", "Weekly ilmi majlis", "المجلس العلمي الأسبوعي"), "venue": T("উত্তরা ও অনলাইন", "Uttara and online", "أُتّرا وعن بُعد"), "type": "halaqa", "registration": ""},
    {"date": "2026-12-05", "time": "20:30", "title": T("প্রশ্নোত্তর সেশন (অনলাইন)", "Q&A session (online)", "جلسة أسئلة وأجوبة (عن بُعد)"), "venue": T("Zoom ও Facebook Live", "Zoom and Facebook Live", "زوم وبث فيسبوك"), "type": "qa", "registration": ""},
    {"date": "2027-01-20", "time": "09:00", "title": T("টিচার্স ট্রেনিং: Effective Teaching", "Teachers Training: Effective Teaching", "تدريب المعلمين: التدريس الفعّال"), "venue": T("ঢাকা", "Dhaka", "دكا"), "type": "training", "registration": "teachers-training"}
]

C["news"] = [
    {"id": "first-prayer", "date": "2026-02-10", "image": "img/first-prayer.jpg",
     "title": T("নির্মাণাধীন মাসজিদে প্রথম সালাত", "First prayer in the masjid under construction", "أول صلاة في المسجد قيد الإنشاء"),
     "summary": T("প্রথম ছাদ ঢালাইয়ের পর নির্মাণাধীন ইমাম বুখারী জামে মাসজিদে প্রথমবারের মতো জামাআতে সালাত আদায় করা হয়েছে, আলহামদুলিল্লাহ।", "After the first roof slab was cast, the first congregational prayer was held in the Imam Bukhari Jame Masjid, alhamdulillah.", "بعد صب السقف الأول أُقيمت أول صلاة جماعة في جامع الإمام البخاري، والحمد لله."), "review": True},
    {"id": "scholars-visit", "date": "2026-01-20", "image": "img/scholars-visit.jpg",
     "title": T("নির্মাণাধীন মাসজিদ পরিদর্শনে সম্মানিত স্কলারগণ", "Respected scholars visit the masjid site", "علماء أفاضل يزورون موقع المسجد"),
     "summary": T("দেশের সম্মানিত আলেমগণ ইমাম বুখারী জামে মাসজিদ ও একাডেমিক ক্যাম্পাসের নির্মাণকাজ পরিদর্শন করেন এবং দু‘আ করেন।", "Respected scholars visited the construction of the Jame Masjid and academic campus and made du'a.", "زار علماء أفاضل موقع بناء الجامع والحرم الأكاديمي ودعوا بالخير."), "review": True},
    {"id": "teachers-workshop", "date": "2026-11-14", "image": "img/sunnah-conference-2024.jpg",
     "title": T("দিনব্যাপী শিক্ষক প্রশিক্ষণ কর্মশালা সম্পন্ন", "Day-long teacher training workshop held", "انعقاد ورشة تدريب المعلمين"),
     "summary": T("“Effective Teaching: Integrating Modern and Islamic Perspectives” শীর্ষক কর্মশালায় প্রফেসর ড. মোহাম্মদ মানজুরে ইলাহী সেশন পরিচালনা করেন।", "Prof. Dr. Mohammad Manzur-e-Elahi led sessions at the workshop “Effective Teaching: Integrating Modern and Islamic Perspectives”.", "قاد الأستاذ الدكتور محمد منظور إلهي جلسات ورشة «التدريس الفعال: الدمج بين المنظورين الحديث والإسلامي»."), "review": True},
    {"id": "flood-relief", "date": "2024-09-01", "image": "img/relief-flood-1.jpg",
     "title": T("বন্যার্তদের পাশে ইমাম বুখারী ট্রাস্ট", "Imam Bukhari Trust stands by flood victims", "الوقف إلى جانب منكوبي الفيضانات"),
     "summary": T("বন্যাকবলিত এলাকায় নৌকায় করে খাদ্য ও জরুরি সামগ্রী পৌঁছে দেওয়া হয়।", "Food and emergency supplies were delivered by boat to flood-hit areas.", "إيصال الغذاء والمستلزمات العاجلة بالقوارب إلى المناطق المنكوبة."), "review": True},
    {"id": "sunnah-conf", "date": "2024-06-01", "image": "img/sunnah-conference-2024.jpg",
     "title": T("সুন্নাহ কনফারেন্স বাংলাদেশ ২০২৪", "Sunnah Conference Bangladesh 2024", "مؤتمر السنة في بنغلاديش 2024"),
     "summary": T("“সুন্নাহর প্রামাণিকতা ও সংরক্ষণ” বিষয়ে দেশি-বিদেশি গবেষক ও শিক্ষাবিদদের অংশগ্রহণে আন্তর্জাতিক কনফারেন্স।", "An international conference on the authenticity and preservation of the Sunnah with researchers and academics from home and abroad.", "مؤتمر دولي عن حجية السنة وحفظها بمشاركة باحثين وأكاديميين من الداخل والخارج."), "review": True}
]

C["videos"] = [
    {"youtubeId": "C-g--nnudKU", "title": T("এক নজরে ইমাম বুখারী ট্রাস্ট", "Imam Bukhari Trust at a glance", "وقف الإمام البخاري في لمحة"), "topic": "ibt", "channel": "IBT", "entity": "ibjmc"},
    {"youtubeId": "LFhTlxXXcQ8", "title": T("যে স্বপ্ন বুকে নিয়ে যাত্রা শুরু করেছিল কুল্লিয়াতুল কুরআন", "The dream with which Kulliyatul Quran began", "الحلم الذي انطلقت به كلية القرآن"), "topic": "kulliya", "channel": "Kulliyatul Quran", "entity": "kulliyatul-quran", "speaker": "Prof. Dr. Mohammad Manzur-e-Elahi"},
    {"youtubeId": "u42dSG1ojQI", "title": T("কুল্লিয়াতুল কুরআনের লক্ষ্য, উদ্দেশ্য ও ছাত্রদের প্রতি নাসীহা", "Kulliyatul Quran's aims and advice to students", "أهداف كلية القرآن ونصيحة للطلاب"), "topic": "kulliya", "channel": "Kulliyatul Quran", "entity": "kulliyatul-quran"},
    {"youtubeId": "41kY5uKj5tc", "title": T("গুরুত্বপূর্ণ দিকনির্দেশনা ও নাসীহা: প্রফেসর ড. মোহাম্মদ অলী উল্যাহ", "Guidance and advice: Prof. Dr. Mohammad Oliullah", "توجيهات ونصائح: أ.د. محمد ولي الله"), "topic": "kulliya", "channel": "Kulliyatul Quran", "entity": "kulliyatul-quran"},
    {"youtubeId": "J0WR-qV5Omg", "title": T("সুন্নাহ কনফারেন্স বাংলাদেশ ২০২৪", "Sunnah Conference Bangladesh 2024", "مؤتمر السنة في بنغلاديش 2024"), "topic": "research", "channel": "Kulliyatul Quran", "entity": "research"},
    {"youtubeId": "nU09L0hWldI", "title": T("আল্ট্রা পদ্ধতিতে ২ মাসে আরবি ভাষা কোর্স", "Arabic in 2 months with the Ultra method", "العربية في شهرين بطريقة الألترا"), "topic": "courses", "channel": "Kulliyatul Quran", "entity": "courses", "speaker": "Prof. Dr. Mohammad Manzur-e-Elahi"},
    {"youtubeId": "tRIv-YZPLLo", "title": T("অ্যারাবিক ডিপ্লোমা কোর্স: আরব ও ইসলামী বিশ্ববিদ্যালয়ে ভর্তির জন্য", "Arabic Diploma course for admission to Arab and Islamic universities", "دبلوم اللغة العربية للالتحاق بالجامعات العربية والإسلامية"), "topic": "courses", "channel": "Kulliyatul Quran", "entity": "courses"},
    {"youtubeId": "0HUA17Zek58", "title": T("সানাবিয়্যাহ ও আলিম স্তরে ভর্তি শুরু", "Sanabiyyah and Alim admissions open", "بدء القبول في السنابية والعالم"), "topic": "kulliya", "channel": "Kulliyatul Quran", "entity": "kulliyatul-quran", "speaker": "Dr. Muhammad Saifullah"},
    {"youtubeId": "8nMIfc2xoyE", "title": T("আন্তর্জাতিক ইসলামী বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি কর্মশালা", "Workshop on admission to international Islamic universities", "ورشة الاستعداد للالتحاق بالجامعات الإسلامية الدولية"), "topic": "courses", "channel": "Kulliyatul Quran", "entity": "courses"},
    {"youtubeId": "nmqatOZpe6Q", "title": T("দাখিল ফলপ্রার্থীদের জন্য বিশেষ আরবি ভাষা কোর্স", "Special Arabic course for Dakhil candidates", "دورة عربية خاصة لطلاب الداخل"), "topic": "courses", "channel": "Kulliyatul Quran", "entity": "courses"},
    {"youtubeId": "aIpzvGC-9r0", "title": T("সানাবিয়্যাহ (আলিম) ক্লাস: শাইখ সালেম আল-আজহারী", "Sanabiyyah (Alim) class: Shaikh Salem al-Azhari", "درس السنابية: الشيخ سالم الأزهري"), "topic": "kulliya", "channel": "Kulliyatul Quran", "entity": "kulliyatul-quran"},
    {"youtubeId": "15hOaC8ipp8", "title": T("সানাবিয়্যাহ কোর্সে ভর্তি চলছে", "Sanabiyyah admissions are open", "القبول في السنابية مفتوح"), "topic": "kulliya", "channel": "Kulliyatul Quran", "entity": "kulliyatul-quran", "speaker": "Prof. Dr. Mohammad Manzur-e-Elahi"}
]

C["stories"] = [
    {"id": "ibjmc", "entity": "ibjmc",
     "title": T("স্বপ্ন থেকে মাসজিদকেন্দ্রিক কমিউনিটি", "From a dream to a masjid-centred community", "من الحلم إلى مجتمعٍ حول المسجد"),
     "cover": "img/design-night-1.jpg",
     "chapters": [
         {"title": T("স্বপ্ন", "The dream", "الحلم"), "image": "img/render-campus.jpg", "video": "C-g--nnudKU", "start": 0,
          "text": T("মাসজিদ আন-নববীর আদলে, সুন্নাহর আলোকে একটি উদ্ভাসিত দ্বীনি কমিউনিটি, যার কেন্দ্রে থাকবে মাসজিদ, ইলম ও খিদমাহ।", "A radiant community in the light of the Sunnah and Masjid an-Nabawi, with the masjid, knowledge and service at its heart.", "مجتمعٌ إيمانيٌّ مشرق على هدي السنة والمسجد النبوي، في قلبه المسجد والعلم والخدمة.")},
         {"title": T("ভূমি ও অবস্থান", "The land", "الأرض والموقع"), "image": "img/site-signboard.jpg",
          "text": T("ঢাকা–মাওয়া এক্সপ্রেসওয়ে সংলগ্ন নিউ ঢাকা সিটিতে, ধলেশ্বরী নদীর তীরে জমি ক্রয় ও রেজিস্ট্রেশন সম্পন্ন।", "Land at New Dhaka City by the Dhaka–Mawa Expressway, on the Dhaleshwari, was purchased and registered.", "شراء الأرض وتسجيلها في مدينة دكا الجديدة بجوار طريق دكا–ماوا على ضفاف نهر دهاليشوري.")},
         {"title": T("নকশা", "The design", "التصميم"), "image": "img/design-front.jpg",
          "text": T("মাসজিদ ভবন, একাডেমিক ভবন, লাইব্রেরি, দাওয়াহ সেন্টার ও নারীদের জন্য পৃথক সুবিধার স্থাপত্য পরিকল্পনা। (স্থাপত্য ভিজ্যুয়ালাইজেশন)", "Architectural plans for the masjid, academic building, library, Dawah centre and separate facilities for women. (Architectural visualisation)", "مخططات معمارية للمسجد والمبنى الأكاديمي والمكتبة ومركز الدعوة ومرافق خاصة بالنساء. (تصور معماري)")},
         {"title": T("ভিত্তি: ২২৫টি পাইল", "Foundations: 225 piles", "الأساسات: 225 خازوقًا"), "image": "img/construction-piling.jpg",
          "text": T("২০২৪ সালে পাইলিং শুরু হয়ে ২২৫টি পাইলের কাজ সম্পন্ন হয়েছে, আলহামদুলিল্লাহ।", "Piling began in 2024 and all 225 piles have been completed, alhamdulillah.", "بدأت أعمال الخوازيق عام 2024 واكتمل 225 خازوقًا، والحمد لله.")},
         {"title": T("কাঠামো উঠছে", "The structure rises", "ارتفاع الهيكل"), "image": "img/construction-formwork.jpg",
          "text": T("মাসজিদের প্রথম ছাদ ঢালাই সম্পন্ন; একাডেমিক ভবনের ভিত্তির কাজ চলমান।", "The masjid's first roof slab is complete; work on the academic building's foundation continues.", "اكتمل صب السقف الأول للمسجد، وتتواصل أعمال أساسات المبنى الأكاديمي.")},
         {"title": T("প্রথম সালাত", "The first prayer", "أول صلاة"), "image": "img/first-prayer.jpg",
          "text": T("নির্মাণাধীন মাসজিদে প্রথমবারের মতো জামাআতে সালাত, এক আবেগঘন মুহূর্ত।", "The first congregational prayer in the masjid under construction: a moving moment.", "أول صلاة جماعة في المسجد قيد الإنشاء، لحظة مؤثرة.")},
         {"title": T("স্কলারদের পরিদর্শন", "Scholars visit", "زيارة العلماء"), "image": "img/scholars-visit.jpg",
          "text": T("দেশের সম্মানিত আলেমগণ নির্মাণকাজ পরিদর্শন করে দু‘আ ও পরামর্শ দেন।", "Respected scholars visited the site and offered du'a and advice.", "زار علماء أفاضل الموقع ودعوا وقدّموا نصائحهم.")},
         {"title": T("সামনের পথ", "The road ahead", "الطريق إلى الأمام"), "image": "img/design-night-2.jpg",
          "text": T("২০২৭–২০২৮ সালের মধ্যে বাকি কাজ সম্পন্ন করার লক্ষ্য। আপনার সাদাকাহ এই যাত্রার অংশ হতে পারে।", "The goal is to complete the remaining work in 2027–2028. Your sadaqah can be part of this journey.", "الهدف إتمام بقية الأعمال خلال 2027–2028، ويمكن لصدقتك أن تكون جزءًا من هذه المسيرة.")}
     ]},
    {"id": "kulliyatul-quran", "entity": "kulliyatul-quran",
     "title": T("আগামীর স্কলার গড়ার পথে", "Cultivating the scholars of tomorrow", "نحو إعداد علماء الغد"),
     "cover": "img/halaqa-class.jpg",
     "chapters": [
         {"title": T("প্রতিষ্ঠা", "Founding", "التأسيس"), "image": "img/chairman-speech.jpg", "video": "LFhTlxXXcQ8", "start": 0,
          "text": T("২০২১ খ্রি. / ১৪৪২ হি. যে স্বপ্ন নিয়ে কুল্লিয়াতুল কুরআনের যাত্রা শুরু।", "The dream with which Kulliyatul Quran began in 2021 / 1442 AH.", "الحلم الذي انطلقت به كلية القرآن عام 2021م / 1442هـ.")},
         {"title": T("আরবি-কেন্দ্রিক শিক্ষা", "Arabic-first learning", "التعليم المرتكز على العربية"), "image": "img/halaqa-class.jpg", "video": "tRIv-YZPLLo", "start": 0,
          "text": T("বিদেশে উচ্চশিক্ষার প্রধান বাধা আরবি ভাষা। তাই কারিকুলামের কেন্দ্রে আরবি।", "Arabic is the main barrier to higher study abroad, so it sits at the centre of the curriculum.", "اللغة العربية أكبر عائق أمام الدراسة في الخارج، لذا جُعلت محور المنهج.")},
         {"title": T("গবেষণা ও কনফারেন্স", "Research & conference", "البحث والمؤتمر"), "image": "img/sunnah-conference-2024.jpg", "video": "J0WR-qV5Omg", "start": 0,
          "text": T("সায়েন্টিফিক রিসার্চ সেন্টার ও আন্তর্জাতিক সুন্নাহ কনফারেন্স ২০২৪।", "The Scientific Research Centre and the international Sunnah Conference 2024.", "مركز البحث العلمي ومؤتمر السنة الدولي 2024.")},
         {"title": T("বিশ্ব পর্যায়ের পথ", "Pathways abroad", "طريق إلى الجامعات العالمية"), "image": "img/scholars-visit-group.jpg", "video": "8nMIfc2xoyE", "start": 0,
          "text": T("ইতোমধ্যে ৬ জন শিক্ষার্থী আন্তর্জাতিক বিশ্ববিদ্যালয়ে উচ্চশিক্ষায় ভর্তি হয়েছেন।", "Six students have already been admitted to international universities.", "قُبل ستة طلاب حتى الآن في جامعات دولية.")}
     ]}
]

C["reports"] = [
    {"title": T("ইমাম বুখারী ট্রাস্ট ক্যাটালগ ২০২৬", "Imam Bukhari Trust Catalog 2026", "كتيّب وقف الإمام البخاري 2026"), "type": "publication", "year": "2026", "url": "", "note": T("শীঘ্রই ডাউনলোড", "Download coming soon", "التحميل قريبًا")},
    {"title": T("বার্ষিক প্রতিবেদন ২০২৫", "Annual Report 2025", "التقرير السنوي 2025"), "type": "annual", "year": "2025", "url": "", "note": T("প্রস্তুত হচ্ছে", "In preparation", "قيد الإعداد")},
    {"title": T("নির্মাণ অগ্রগতি প্রতিবেদন", "Construction progress report", "تقرير تقدم البناء"), "type": "progress", "year": "2026", "url": "", "note": T("অনুমোদনের অপেক্ষায়", "Awaiting approval", "بانتظار الاعتماد")},
    {"title": T("অডিট রিপোর্ট", "Audit report", "تقرير التدقيق"), "type": "audit", "year": "2025", "url": "", "note": T("অডিট প্রক্রিয়াধীন", "Audit in progress", "التدقيق جارٍ")}
]

C["faqs"] = [
    {"q": T("আমার দান কোন খাতে ব্যয় হবে তা কীভাবে নিশ্চিত হবো?", "How can I be sure my donation goes to the fund I choose?", "كيف أتأكد أن تبرعي يذهب إلى الصندوق الذي اخترته؟"), "a": T("প্রতিটি দান নির্বাচিত তহবিলের হিসাবে আলাদাভাবে লিপিবদ্ধ হয় এবং আপনি রসিদ পান। যাকাত সম্পূর্ণ পৃথক হিসাবে রাখা হয়।", "Every donation is recorded against the fund you choose and you receive a receipt. Zakat is kept in a completely separate account.", "تُسجَّل كل تبرعة في حساب الصندوق المختار وتتلقى إيصالًا، وتُحفظ الزكاة في حساب مستقل تمامًا.")},
    {"q": T("আমি কি প্রতি মাসে নিয়মিত দান করতে পারি?", "Can I give every month?", "هل يمكنني التبرع شهريًا؟"), "a": T("হ্যাঁ, মাসিক দাতা সদস্য হতে পারেন। শীঘ্রই বিকাশ অটো-পে চালু হবে, তখন প্রতি মাসে স্বয়ংক্রিয়ভাবে দান হবে।", "Yes, you can become a monthly donor member. bKash auto-pay is coming soon, so your gift will go through automatically each month.", "نعم، يمكنك أن تصبح عضوًا متبرعًا شهريًا، وسيتوفر قريبًا الخصم التلقائي عبر بيكاش.")},
    {"q": T("কুল্লিয়াতুল কুরআনে ভর্তির যোগ্যতা কী?", "What are the entry requirements for Kulliyatul Quran?", "ما شروط القبول في كلية القرآن؟"), "a": T("সানাবিয়্যাহর জন্য দাখিল, মিশকাত বা এসএসসি পাস; কুল্লিয়ার জন্য সানাবিয়্যাহ, আলিম বা এইচএসসি পাস। ভর্তি পরীক্ষা ও পূর্ণকালীন উপস্থিতি আবশ্যক।", "For Sanabiyyah: Dakhil, Mishkat or SSC. For Kulliya: Sanabiyyah, Alim or HSC. An entrance exam and full-time attendance are required.", "للسنابية: الداخل أو المشكاة أو الثانوية المتوسطة. وللكلية: السنابية أو العالم أو الثانوية العامة، مع اختبار قبول ودوام كامل.")},
    {"q": T("মাসজিদের প্রকল্প এলাকায় কীভাবে যাবো?", "How do I get to the masjid site?", "كيف أصل إلى موقع المسجد؟"), "a": T("ঢাকা–মাওয়া এক্সপ্রেসওয়ে ধরে নিউ ঢাকা সিটি, পলাশপুর। জিরো পয়েন্ট থেকে প্রায় ১৫ কিমি। পরিদর্শনের আগে অফিসে যোগাযোগ করুন।", "Take the Dhaka–Mawa Expressway to New Dhaka City, Palashpur, about 15 km from Zero Point. Please contact the office before visiting.", "عبر طريق دكا–ماوا السريع إلى مدينة دكا الجديدة في بلاشبور، على بعد نحو 15 كم من النقطة الصفرية. يرجى التواصل مع المكتب قبل الزيارة.")}
]

C["ui"] = {
    "nav_home": T("হোম", "Home", "الرئيسية"),
    "nav_about": T("আমাদের সম্পর্কে", "About", "من نحن"),
    "nav_institutions": T("প্রতিষ্ঠানসমূহ", "Institutions", "المؤسسات"),
    "nav_projects": T("প্রকল্প", "Projects", "المشاريع"),
    "nav_initiatives": T("উদ্যোগ", "Initiatives", "المبادرات"),
    "nav_media": T("মিডিয়া", "Media", "الإعلام"),
    "nav_news": T("সংবাদ ও ইভেন্ট", "News & Events", "الأخبار والفعاليات"),
    "nav_register": T("রেজিস্ট্রেশন", "Registration", "التسجيل"),
    "nav_transparency": T("স্বচ্ছতা", "Transparency", "الشفافية"),
    "nav_contact": T("যোগাযোগ", "Contact", "اتصل بنا"),
    "donate": T("দান করুন", "Donate", "تبرّع"),
    "learn_more": T("আরও জানুন", "Learn more", "اعرف المزيد"),
    "view_all": T("সব দেখুন", "View all", "عرض الكل"),
    "enter_story": T("গল্পে প্রবেশ করুন", "Enter the story", "ادخل القصة"),
    "register_now": T("রেজিস্ট্রেশন করুন", "Register now", "سجّل الآن"),
    "reg_open": T("রেজিস্ট্রেশন চলছে", "Registration open", "التسجيل مفتوح"),
    "reg_closed": T("রেজিস্ট্রেশন বন্ধ", "Registration closed", "التسجيل مغلق"),
    "reg_soon": T("শীঘ্রই শুরু", "Opening soon", "يفتح قريبًا"),
    "closes": T("শেষ তারিখ", "Closes", "آخر موعد"),
    "opens": T("শুরু", "Opens", "يبدأ"),
    "as_of": T("যে তারিখ অনুযায়ী", "As of", "حتى تاريخ"),
    "source": T("সূত্র", "Source", "المصدر"),
    "status_running": T("চলমান", "Running", "قائمة"),
    "status_construction": T("নির্মাণাধীন", "Under construction", "قيد الإنشاء"),
    "status_establishing": T("প্রতিষ্ঠাধীন", "Being established", "قيد التأسيس"),
    "status_planned": T("পরিকল্পিত", "Planned", "مخطط"),
    "status_ongoing": T("চলমান", "Ongoing", "جارٍ"),
    "status_proposed": T("প্রস্তাবিত", "Proposed", "مقترح"),
    "status_done": T("সম্পন্ন", "Complete", "مكتمل"),
    "status_progress": T("কাজ চলছে", "In progress", "قيد التنفيذ"),
    "impact_title": T("এক নজরে আমাদের কাজ", "Our work at a glance", "أعمالنا في لمحة"),
    "latest_videos": T("সর্বশেষ ভিডিও", "Latest videos", "أحدث الفيديوهات"),
    "watch_youtube": T("YouTube-এ দেখুন", "Watch on YouTube", "شاهد على يوتيوب"),
    "tracker_title": T("নির্মাণ অগ্রগতি", "Construction progress", "تقدم البناء"),
    "tracker_hint": T("৩D মডেলে কোনো তলায় ক্লিক করুন", "Click a floor on the 3D model", "انقر على طابق في النموذج ثلاثي الأبعاد"),
    "mosque": T("মাসজিদ ভবন", "Masjid building", "مبنى المسجد"),
    "academic": T("একাডেমিক ভবন", "Academic building", "المبنى الأكاديمي"),
    "choose_fund": T("তহবিল নির্বাচন করুন", "Choose a fund", "اختر الصندوق"),
    "amount": T("পরিমাণ (৳)", "Amount (৳)", "المبلغ (৳)"),
    "one_time": T("এককালীন", "One-time", "مرة واحدة"),
    "monthly": T("মাসিক", "Monthly", "شهري"),
    "pay_channels": T("দানের মাধ্যম", "Ways to give", "طرق التبرع"),
    "report_donation": T("দান করেছেন? জানিয়ে দিন", "Already donated? Let us know", "تبرعت؟ أخبرنا"),
    "report_donation_text": T("বিকাশ, নগদ, রকেট বা ব্যাংকে দান করে থাকলে তথ্য দিন; আমরা রসিদ পাঠিয়ে দেবো।", "If you gave by bKash, Nagad, Rocket or bank, send us the details and we will send your receipt.", "إن تبرعت عبر بيكاش أو نقد أو روكيت أو البنك فأرسل التفاصيل وسنرسل لك الإيصال."),
    "name": T("নাম", "Name", "الاسم"),
    "phone": T("মোবাইল", "Mobile", "الجوال"),
    "email": T("ইমেইল", "Email", "البريد الإلكتروني"),
    "message": T("বার্তা", "Message", "الرسالة"),
    "txn_id": T("ট্রানজেকশন আইডি / রেফারেন্স", "Transaction ID / reference", "رقم العملية / المرجع"),
    "channel": T("মাধ্যম", "Channel", "الوسيلة"),
    "date": T("তারিখ", "Date", "التاريخ"),
    "submit": T("জমা দিন", "Submit", "إرسال"),
    "sent_ok": T("ধন্যবাদ! আপনার তথ্য জমা হয়েছে।", "Thank you! Your details have been received.", "شكرًا! تم استلام بياناتك."),
    "send_fail": T("এই মুহূর্তে জমা দেওয়া যাচ্ছে না। অনুগ্রহ করে ফোন বা ইমেইলে যোগাযোগ করুন।", "We could not submit right now. Please contact us by phone or email.", "تعذّر الإرسال الآن. يرجى التواصل هاتفيًا أو بالبريد."),
    "copy": T("কপি", "Copy", "نسخ"),
    "copied": T("কপি হয়েছে", "Copied", "تم النسخ"),
    "gateway_soon": T("অনলাইন পেমেন্ট গেটওয়ে শীঘ্রই চালু হচ্ছে। এখন নিচের যেকোনো মাধ্যমে দান করুন।", "The online payment gateway is launching soon. For now, please give through any channel below.", "بوابة الدفع الإلكتروني قريبًا. تبرّع الآن عبر إحدى الوسائل أدناه."),
    "autopay_title": T("বিকাশ অটো-পে (শীঘ্রই)", "bKash auto-pay (coming soon)", "الخصم التلقائي عبر بيكاش (قريبًا)"),
    "autopay_text": T("একবার বিকাশ অ্যাকাউন্ট যুক্ত করলেই প্রতি মাসে নির্ধারিত দিনে স্বয়ংক্রিয়ভাবে দান হবে। যেকোনো সময় বন্ধ করা যাবে।", "Link your bKash account once and your gift goes through automatically on your chosen day each month. Stop any time.", "اربط حساب بيكاش مرة واحدة ليُخصم تبرعك تلقائيًا في يومٍ تختاره كل شهر، ويمكنك الإيقاف متى شئت."),
    "support_items": T("নির্মাণকাজে সহযোগিতার খাতসমূহ", "Ways to support the construction", "أبواب المساهمة في البناء"),
    "completed": T("সম্পন্ন, আলহামদুলিল্লাহ", "Completed, alhamdulillah", "اكتمل، والحمد لله"),
    "gallery": T("গ্যালারি", "Gallery", "معرض الصور"),
    "objectives": T("লক্ষ্যসমূহ", "Objectives", "الأهداف"),
    "features": T("বৈশিষ্ট্যসমূহ", "Features", "المميزات"),
    "programs": T("প্রোগ্রামসমূহ", "Programmes", "البرامج"),
    "location": T("অবস্থান", "Location", "الموقع"),
    "status": T("অবস্থা", "Status", "الحالة"),
    "chapter": T("অধ্যায়", "Chapter", "الفصل"),
    "close": T("বন্ধ করুন", "Close", "إغلاق"),
    "next": T("পরবর্তী", "Next", "التالي"),
    "prev": T("পূর্ববর্তী", "Previous", "السابق"),
    "upcoming_events": T("আসন্ন ইভেন্ট", "Upcoming events", "الفعاليات القادمة"),
    "latest_news": T("সর্বশেষ সংবাদ", "Latest news", "آخر الأخبار"),
    "documentaries": T("ডকুমেন্টারি", "Documentaries", "الأفلام الوثائقية"),
    "videos": T("ভিডিও", "Videos", "الفيديوهات"),
    "all": T("সব", "All", "الكل"),
    "reports": T("প্রতিবেদন ও প্রকাশনা", "Reports & publications", "التقارير والمنشورات"),
    "cells": T("আমাদের সেল ও বিভাগ", "Our cells & departments", "خلايانا وأقسامنا"),
    "history": T("আমাদের পথচলা", "Our journey", "مسيرتنا"),
    "chairman_title": T("প্রতিষ্ঠাতা ও চেয়ারম্যান", "Founder & Chairman", "المؤسس والرئيس"),
    "read_message": T("পূর্ণ বার্তা পড়ুন", "Read the full message", "اقرأ الرسالة كاملة"),
    "faq": T("সচরাচর জিজ্ঞাসা", "Frequently asked questions", "الأسئلة الشائعة"),
    "contact_form": T("আমাদের লিখুন", "Write to us", "راسلنا"),
    "office": T("অফিস", "Office", "المكتب"),
    "project_site": T("প্রকল্প এলাকা", "Project site", "موقع المشروع"),
    "follow": T("আমাদের অনুসরণ করুন", "Follow us", "تابعنا"),
    "related_sites": T("সংশ্লিষ্ট প্রতিষ্ঠান", "Related sites", "مواقع ذات صلة"),
    "theme_light": T("লাইট মোড", "Light mode", "الوضع الفاتح"),
    "theme_dark": T("ডার্ক মোড", "Dark mode", "الوضع الداكن"),
    "illustrative": T("স্থাপত্য ভিজ্যুয়ালাইজেশন", "Architectural visualisation", "تصور معماري"),
    "footer_note": T("কুরআন ও বিশুদ্ধ সুন্নাহর আলোকে শিক্ষা, দাওয়াহ ও সমাজকল্যাণ।", "Education, Dawah and social welfare in the light of the Qur'an and authentic Sunnah.", "تعليم ودعوة ورعاية اجتماعية على هدي القرآن والسنة الصحيحة."),
    "open_form": T("ফর্ম খুলুন", "Open the form", "افتح الاستمارة"),
    "form_pending": T("ফর্মের লিংক শীঘ্রই যুক্ত হবে। আগ্রহী হলে নিচে তথ্য দিন, আমরা যোগাযোগ করবো।", "The form link will be added soon. If you are interested, leave your details below and we will contact you.", "سيُضاف رابط الاستمارة قريبًا. اترك بياناتك وسنتواصل معك."),
    "share_link": T("শেয়ার লিংক ও QR", "Share link & QR", "رابط المشاركة ورمز QR"),
    "fee": T("ফি", "Fee", "الرسوم"),
    "venue": T("স্থান", "Venue", "المكان"),
    "search": T("অনুসন্ধান", "Search", "بحث"),
    "search_ph": T("প্রকল্প, কোর্স, ভিডিও খুঁজুন…", "Search projects, courses, videos…", "ابحث في المشاريع والدورات والفيديوهات…"),
    "no_results": T("কিছু পাওয়া যায়নি", "No results", "لا نتائج"),
    "translation_pending": T("এই অংশের অনুবাদ পর্যালোচনাধীন", "Translation of this section is under review", "ترجمة هذا القسم قيد المراجعة"),
    "hijri": T("হিজরি", "Hijri", "هجري"),
    "skip": T("মূল কনটেন্টে যান", "Skip to content", "انتقل إلى المحتوى"),
    "menu": T("মেনু", "Menu", "القائمة"),
    "watch_from": T("থেকে দেখুন", "Watch from", "شاهد من"),
    "admin": T("অ্যাডমিন", "Admin", "الإدارة"),
    "design_gallery": T("স্থাপত্য নকশা", "Architectural design", "التصميم المعماري")
}

exec(open("content_v3.py", encoding="utf-8").read())
exec(open("content_v4.py", encoding="utf-8").read())
exec(open("content_v5.py", encoding="utf-8").read())
exec(open("content_v6.py", encoding="utf-8").read())
exec(open("content_v7.py", encoding="utf-8").read())
exec(open("content_v8.py", encoding="utf-8").read())

# serve WebP where a smaller WebP copy exists (originals stay in the repo)
import os as _os
def _webp(o):
    if isinstance(o, dict): return {k: _webp(v) for k, v in o.items()}
    if isinstance(o, list): return [_webp(v) for v in o]
    if isinstance(o, str) and o.startswith("img/") and o.lower().endswith((".jpg", ".jpeg", ".png")):
        w = _os.path.splitext(o)[0] + ".webp"
        if _os.path.exists(w): return w
    return o
C = _webp(C)

with open("data/content.json", "w", encoding="utf-8") as f:
    json.dump(C, f, ensure_ascii=False, indent=1)
print("ok", len(json.dumps(C, ensure_ascii=False)) // 1024, "KB")
