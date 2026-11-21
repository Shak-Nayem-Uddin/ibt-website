# v6: header "More" menu, live broadcast, Facebook feed, chatbot, master-plan campus strings
U = C["ui"]
def ui(k, bn, en, ar): U[k] = T(bn, en, ar)
ui("nav_live", "লাইভ", "Live", "البث المباشر")
ui("more", "আরও", "More", "المزيد")
ui("live_now", "এখন লাইভ", "Live now", "مباشر الآن")
ui("live_title", "লাইভ সম্প্রচার", "Live broadcast", "البث المباشر")
ui("live_intro", "ইমাম বুখারী ট্রাস্ট ও কুল্লিয়াতুল কুরআনের দারস, আলোচনা ও অনুষ্ঠান সরাসরি দেখুন: YouTube, Facebook বা Zoom যেখানেই সম্প্রচার হোক।", "Watch IBT and Kulliyatul Quran talks, classes and programmes live, whether they stream on YouTube, Facebook or Zoom.", "شاهد دروس وبرامج وقف الإمام البخاري وكلية القرآن مباشرة على يوتيوب أو فيسبوك أو زووم.")
ui("live_off", "এই মুহূর্তে কোনো লাইভ চলছে না", "Nothing is live right now", "لا يوجد بث مباشر الآن")
ui("live_off_text", "লাইভ শুরু হলে এই পেজেই স্বয়ংক্রিয়ভাবে দেখা যাবে এবং উপরের মেনুতে লাল চিহ্ন জ্বলবে। ততক্ষণ সাম্প্রতিক ভিডিওগুলো দেখুন।", "When a programme goes live it appears here automatically and a red dot lights up in the menu. Meanwhile, watch the latest videos.", "عند بدء البث يظهر هنا تلقائيًا وتضيء نقطة حمراء في القائمة. حتى ذلك الحين شاهد أحدث المقاطع.")
ui("live_upcoming", "আসন্ন লাইভ", "Upcoming live", "بث قادم")
ui("join_zoom", "Zoom-এ যোগ দিন", "Join on Zoom", "انضم عبر زووم")
ui("watch_fb", "Facebook-এ দেখুন", "Watch on Facebook", "شاهد على فيسبوك")
ui("watch_yt", "YouTube-এ দেখুন", "Watch on YouTube", "شاهد على يوتيوب")
ui("fb_title", "ফেসবুক পেজের সাম্প্রতিক পোস্ট", "Latest from our Facebook page", "أحدث منشورات صفحتنا على فيسبوك")
ui("fb_text", "পোস্টগুলো সরাসরি ফেসবুক পেজ থেকে আসে, নতুন পোস্ট দিলে এখানে নিজে থেকেই দেখা যায়।", "Posts come straight from the Facebook page, so new ones show up here on their own.", "تأتي المنشورات مباشرة من صفحة فيسبوك وتظهر الجديدة هنا تلقائيًا.")
ui("fb_blocked", "ফেসবুক ফিড লোড হয়নি (ব্রাউজারের প্রাইভেসি সেটিং বা ধীর নেট হতে পারে)।", "The Facebook feed didn't load (browser privacy settings or a slow connection may block it).", "لم تُحمَّل منشورات فيسبوك (قد تمنعها إعدادات الخصوصية أو بطء الاتصال).")
ui("open_fb", "ফেসবুক পেজ খুলুন", "Open the Facebook page", "افتح صفحة فيسبوك")
ui("bot_title", "IBT সহকারী", "IBT assistant", "مساعد الوقف")
ui("bot_sub", "সাধারণ প্রশ্নের দ্রুত উত্তর", "Quick answers to common questions", "إجابات سريعة عن الأسئلة الشائعة")
ui("bot_ph", "আপনার প্রশ্ন লিখুন…", "Type your question…", "اكتب سؤالك…")
ui("bot_hello", "আসসালামু আলাইকুম! আমি ইমাম বুখারী ট্রাস্টের ওয়েবসাইট সহকারী। দান, নির্মাণকাজ, কোর্স ও ভর্তি, যোগাযোগ বা নামাজের সময় নিয়ে জিজ্ঞেস করুন।", "Assalamu alaikum! I'm the Imam Bukhari Trust website assistant. Ask me about giving, construction, courses and admission, contact details or prayer times.", "السلام عليكم! أنا مساعد موقع وقف الإمام البخاري. اسألني عن التبرع أو البناء أو الدورات والقبول أو التواصل أو مواقيت الصلاة.")
ui("bot_unknown", "দুঃখিত, এ বিষয়ে নিশ্চিত তথ্য আমার কাছে নেই। অনুগ্রহ করে সরাসরি যোগাযোগ করুন, আমাদের প্রতিনিধি উত্তর দেবেন:", "Sorry, I don't have confirmed information on that. Please contact us directly and a team member will answer:", "عذرًا، ليست لدي معلومة مؤكدة عن ذلك. تواصل معنا مباشرة وسيجيبك أحد أعضاء الفريق:")
ui("bot_note", "স্বয়ংক্রিয় উত্তর ওয়েবসাইটের তথ্য থেকে দেওয়া হয়।", "Automatic answers are drawn from this website's information.", "الإجابات الآلية مأخوذة من معلومات هذا الموقع.")
ui("bot_open", "সহায়তা", "Help", "مساعدة")
ui("call", "কল করুন", "Call", "اتصل")
ui("email_us", "ইমেইল করুন", "Email", "راسلنا")
ui("send", "পাঠান", "Send", "إرسال")
ui("zoom_in", "কাছে", "Zoom in", "تكبير")
ui("campus_plan", "মাস্টারপ্ল্যান অনুযায়ী ক্যাম্পাস", "Campus as per the master plan", "الحرم وفق المخطط العام")
ui("illustrative", "প্রতীকী চিত্র", "Illustrative", "صورة توضيحية")

C["live"] = {"show": False, "title": T("", "", ""), "note": T("", "", ""), "youtube": "", "facebook": "", "zoom": "", "zoomId": "", "zoomPass": "", "start": ""}
C["chatbot"] = {"greeting": T("", "", ""), "items": []}

# Islamic Q&A (ইসলামিক জিজ্ঞাসা)
ui("nav_ask", "ইসলামিক জিজ্ঞাসা", "Islamic Q&A", "سؤال وجواب")
ui("ask_eyebrow", "ইসলামিক জিজ্ঞাসা ও জবাব", "Islamic Q&A", "سؤال وجواب")
ui("ask_title", "আপনার প্রশ্ন, নির্ভরযোগ্য উত্তর", "Your question, a trusted answer", "سؤالك وجواب موثوق")
ui("ask_lead", "IslamQA ও Islamweb-এর হাজারো প্রশ্নোত্তর থেকে মুহূর্তেই খুঁজে নিন। না পেলে সরাসরি ইমাম বুখারী ট্রাস্টের আলেমদের কাছে প্রশ্ন পাঠান।", "Search thousands of answered questions from IslamQA and Islamweb in an instant. Can't find yours? Send it to Imam Bukhari Trust's scholars.", "ابحث فورًا في آلاف الأسئلة المجاب عنها في IslamQA وإسلام ويب، وإن لم تجد سؤالك فأرسله إلى علماء الوقف.")
ui("ask_ph", "যেমন: সফরে নামাজ কসর করার নিয়ম", "e.g. shortening prayer while travelling", "مثال: قصر الصلاة في السفر")
ui("search", "খুঁজুন", "Search", "بحث")
ui("ask_loading", "সংগ্রহ লোড হচ্ছে…", "Loading the archive…", "جارٍ تحميل الأرشيف…")
ui("ask_count", "প্রশ্নোত্তর", "answered questions", "سؤالًا مجابًا")
ui("ask_found", "টি মিলেছে", "matches", "نتيجة")
ui("ask_recent", "সাম্প্রতিক প্রশ্নোত্তর", "Recently updated answers", "أحدث الإجابات")
ui("ask_read", "উত্তর পড়ুন", "Read answer", "اقرأ الجواب")
ui("ask_none", "হুবহু মিল পাওয়া যায়নি", "No close match found", "لم نجد تطابقًا")
ui("ask_none_t", "অন্য শব্দে চেষ্টা করুন, মূল সাইটে খুঁজুন, অথবা প্রশ্নটি আমাদের আলেমদের কাছে পাঠান।", "Try other words, search the source sites, or send the question to our scholars.", "جرّب كلمات أخرى أو ابحث في المواقع الأصلية أو أرسل السؤال إلى علمائنا.")
ui("ask_more_on", "মূল সাইটে আরও খুঁজুন:", "Search more on:", "ابحث أكثر في:")
ui("ask_offline", "প্রশ্নোত্তরের সংগ্রহ এই মুহূর্তে লোড হয়নি; সরাসরি মূল সাইটে খুঁজুন:", "The archive didn't load right now; search the source sites directly:", "تعذّر تحميل الأرشيف الآن؛ ابحث مباشرة في:")
ui("ask_ibt_title", "আমাদের আলেমদের প্রশ্ন করুন", "Ask our scholars", "اسأل علماءنا")
ui("ask_ibt_text", "উত্তর না পেলে প্রশ্ন পাঠান। কুল্লিয়াতুল কুরআনের আলেমগণ কুরআন-সুন্নাহর আলোকে উত্তর দেবেন; সাধারণ প্রশ্নগুলো নাম গোপন রেখে এখানে প্রকাশ হতে পারে।", "Send your question if you didn't find an answer. Kulliyatul Quran's scholars will reply in the light of the Quran and Sunnah; general questions may be published here without your name.", "أرسل سؤالك إن لم تجد الجواب، وسيجيب علماء كلية القرآن في ضوء الكتاب والسنة، وقد تُنشر الأسئلة العامة هنا دون اسمك.")
ui("ask_your_q", "আপনার প্রশ্ন", "Your question", "سؤالك")
ui("ask_q_ph", "প্রশ্নটি বিস্তারিত লিখুন…", "Write your question in detail…", "اكتب سؤالك بالتفصيل…")
ui("ask_topic", "বিষয়", "Topic", "الموضوع")
ui("ask_contact", "উত্তর পাঠানোর জন্য মোবাইল বা ইমেইল", "Mobile or email for the reply", "جوال أو بريد للرد")
ui("ask_private", "প্রশ্নটি ব্যক্তিগত; ওয়েবসাইটে প্রকাশ করবেন না", "This is private; don't publish it on the website", "السؤال خاص؛ لا تنشروه")
ui("ask_send", "প্রশ্ন পাঠান", "Send question", "أرسل السؤال")
ui("ask_sent", "জাযাকাল্লাহু খাইরান! আপনার প্রশ্ন পৌঁছেছে, ইনশাআল্লাহ উত্তর জানানো হবে।", "JazakAllahu khairan! Your question has reached us; we'll reply, in sha Allah.", "جزاك الله خيرًا! وصلنا سؤالك وسنجيبك إن شاء الله.")
ui("ask_mail_fb", "অনলাইন ফরম এই মুহূর্তে চালু নেই। এক ক্লিকে ইমেইলে প্রশ্নটি পাঠান (লেখা আগে থেকেই বসানো থাকবে) অথবা কল করুন:", "The online form isn't active right now. Send the question by email in one click (it's pre-filled) or call us:", "النموذج غير مفعّل الآن. أرسل السؤال بالبريد بنقرة (مكتوب مسبقًا) أو اتصل:")
ui("ask_note_t", "উত্তরগুলো কোথা থেকে আসে?", "Where do the answers come from?", "من أين تأتي الإجابات؟")
ui("ask_note", "প্রশ্নের শিরোনামগুলো IslamQA (islamqa.info) ও Islamweb (islamweb.net)-এর প্রকাশিত প্রশ্নোত্তর থেকে প্রতিদিন স্বয়ংক্রিয়ভাবে হালনাগাদ হয়; পূর্ণ উত্তর মূল সাইটেই পড়ুন। মাসআলায় আলেমদের মতভেদ থাকতে পারে; ব্যক্তিগত বা জটিল বিষয়ে সরাসরি আলেমের পরামর্শ নিন।", "Question titles are refreshed daily from the published answers of IslamQA (islamqa.info) and Islamweb (islamweb.net); read the full answer on the source site. Scholars may differ on some rulings; for personal or complex matters, consult a scholar directly.", "تُحدَّث عناوين الأسئلة يوميًا من إجابات IslamQA وإسلام ويب المنشورة، ويُقرأ الجواب كاملًا في الموقع الأصلي. قد يختلف العلماء في بعض المسائل؛ فاستشر عالمًا في الأمور الخاصة.")
ui("ask_own", "আমাদের আলেমদের উত্তর", "Answers from our scholars", "أجوبة علمائنا")
ui("ask_newtab", "মূল সাইটে খুলুন", "Open on source site", "افتح في الموقع")
ui("ask_iframe_fb", "উত্তরটি লোড হচ্ছে। না দেখালে মূল সাইটে খুলুন।", "Loading the answer. If it doesn't show, open it on the source site.", "جارٍ تحميل الجواب، وإن لم يظهر فافتحه في الموقع.")
ui("ask_promo_t", "দ্বীনের যেকোনো প্রশ্ন? এখানেই খুঁজুন", "A question about the deen? Search it here", "سؤال في الدين؟ ابحث هنا")
ui("ask_promo", "IslamQA ও Islamweb-এর হাজারো প্রমাণভিত্তিক প্রশ্নোত্তর এক জায়গায়, বাংলা ও ইংরেজিতে। না পেলে আমাদের আলেমদের প্রশ্ন করুন।", "Thousands of evidence-based answers from IslamQA and Islamweb in one place, in Bangla and English. Not there? Ask our scholars.", "آلاف الإجابات الموثقة من IslamQA وإسلام ويب في مكان واحد، وإن لم تجد فاسأل علماءنا.")
C["qa"] = []

# distinct illustrations for planned buildings (masjid & academic keep their architectural renders)
for _b in C["future"]["buildings"]:
    if _b["id"] in ("taibah-tower", "academic-2", "academic-3"):
        _b["image"] = "img/bld-%s.svg" % _b["id"]; _b["illustrative"] = True

# "Join the IBT family" (membership form from IBT, 21 Nov 2026)
JOIN_URL = "https://forms.gle/XkHeQR3oVGNRzpRh9"
C["settings"]["joinUrl"] = JOIN_URL
ui("join_t", "ইমাম বুখারী ট্রাস্টের পরিবারের সঙ্গে যুক্ত হোন", "Join the Imam Bukhari Trust family", "انضم إلى أسرة وقف الإمام البخاري")
ui("join_text", "নিয়মিত দাতা, স্বেচ্ছাসেবক বা শুভানুধ্যায়ী হিসেবে আমাদের সাথে থাকুন। ছোট একটি ফরম পূরণ করুন; প্রোগ্রাম, অগ্রগতি ও দাওয়াহর খবর আপনার কাছে পৌঁছে যাবে।", "Stay with us as a regular giver, volunteer or well-wisher. Fill in a short form and you'll hear about programmes, progress and da'wah work.", "كن معنا متبرعًا منتظمًا أو متطوعًا أو محبًا. املأ نموذجًا قصيرًا لتصلك أخبار البرامج والتقدم والدعوة.")
ui("join_btn", "যুক্ত হোন", "Join now", "انضم الآن")
C["registrations"].insert(0, {"id": "ibt-family", "slug": "ibt-family", "type": "membership", "entity": "", "image": "img/event-gettogether.jpg", "status": "open", "opens": "", "closes": "", "mode": "link", "formUrl": JOIN_URL,
  "title": T("ইমাম বুখারী ট্রাস্ট পরিবারের সদস্য হোন", "Join the IBT family", "انضم إلى أسرة الوقف"),
  "text": T("নিয়মিত দাতা, স্বেচ্ছাসেবক বা শুভানুধ্যায়ী হিসেবে ইমাম বুখারী ট্রাস্টের পরিবারের সঙ্গে যুক্ত হতে গুগল ফরমটি পূরণ করুন।", "Fill in the Google Form to join the Imam Bukhari Trust family as a regular giver, volunteer or well-wisher.", "املأ نموذج جوجل للانضمام إلى أسرة الوقف متبرعًا منتظمًا أو متطوعًا أو محبًا."),
  "facts": [], "eligibility": [], "fees": [], "venue": T("অনলাইন", "Online", "عبر الإنترنت"), "source": ""})
