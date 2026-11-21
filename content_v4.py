# v4: donation funds with documentaries and share-based giving (IBT Catalog 2026, p.15),
# future projects (list supplied by IBT), construction update (Nov 2026, from IBT),
# bank accounts from IBT's official construction video (ViHzrqAKvO8), contact fix.

# ---------- contact ----------
C["settings"]["contact"]["phones"] = ["+880 1852-808554"]
C["settings"]["defaultTheme"] = "auto"

# ---------- bank accounts (IBT video ViHzrqAKvO8, Oct 2026) ----------
_bank = lambda bank_bn, bank_en, acname, no, branch_bn, branch_en, routing, swift: {
    "type": "bank", "name": T(bank_bn, bank_en, bank_en), "number": no,
    "note": T("হিসাবের নাম: " + acname + " · " + branch_bn + " · রাউটিং: " + routing + (" · SWIFT: " + swift if swift else ""),
              "Account name: " + acname + " · " + branch_en + " · Routing: " + routing + (" · SWIFT: " + swift if swift else ""),
              "اسم الحساب: " + acname + " · " + branch_en + " · Routing: " + routing + (" · SWIFT: " + swift if swift else "")),
    "acname": acname, "branch": T(branch_bn, branch_en, branch_en), "routing": routing, "swift": swift, "show": True}
C["payment"]["channels"] = [c for c in C["payment"]["channels"] if c["type"] != "bank"] + [
    _bank("ইসলামী ব্যাংক বাংলাদেশ লিমিটেড", "Islami Bank Bangladesh Ltd.", "IMAM BUKHARI JAME MASJID COMPLEX, BANGLADESH", "2050 2230 2018 75016", "ভিআইপি রোড শাখা, ঢাকা", "VIP Road Branch, Dhaka", "125276856", "IBBLBDDH223"),
    _bank("আল-আরাফাহ ইসলামী ব্যাংক পিএলসি", "Al-Arafah Islami Bank PLC", "IMAM BUKHARI JAME MASJID COMPLEX, BANGLADESH", "0171 0201 48399", "উত্তরা মডেল টাউন শাখা", "Uttara Model Town Branch", "015264699", "ALARBDDYH082"),
    _bank("ইসলামী ব্যাংক বাংলাদেশ লিমিটেড", "Islami Bank Bangladesh Ltd.", "IMAM BUKHARI TRUST", "2050 4350 9000 01614", "কলেজ গেট শাখা, টঙ্গী, গাজীপুর", "College Gate Branch, Tongi, Gazipur", "125330413", ""),
]
C["payment"]["source"] = "IBT Facebook page (May 2026) · IBT YouTube (Oct 2026)"

# ---------- construction status (IBT, November 2026) ----------
M = C["floors"]["mosque"]
labels = [("ফাউন্ডেশন ও পাইলিং", "Foundation & piling", "الأساسات والخوازيق"), ("১ম তলা", "1st floor", "الطابق الأول"), ("২য় তলা", "2nd floor", "الطابق الثاني"),
          ("৩য় তলা", "3rd floor", "الطابق الثالث"), ("৪র্থ তলা", "4th floor", "الطابق الرابع"), ("৫ম তলা", "5th floor", "الطابق الخامس"), ("৬ষ্ঠ তলা", "6th floor", "الطابق السادس"), ("৭ম তলা", "7th floor", "الطابق السابع")]
for i, f in enumerate(M):
    if i < len(labels): f["label"] = T(*labels[i])
    f["status"] = "done" if i <= 2 else "planned"
M[1]["note"] = T("ছাদ ঢালাই সম্পন্ন", "Roof slab cast", "تم صب السقف")
M[2]["note"] = T("ছাদ ঢালাই সম্পন্ন", "Roof slab cast", "تم صب السقف")
A = C["floors"]["academic"]
A[0]["status"] = "progress"; A[0]["note"] = T("ফাউন্ডেশনের কাজ প্রায় শেষ", "Foundation work nearly complete", "أعمال الأساسات شارفت على الانتهاء")
A[1]["status"] = "next"; A[1]["note"] = T("ছাদ ঢালাইয়ের প্রস্তুতি চলছে", "Preparing for the roof slab", "التحضير لصب السقف")
for f in A[2:]: f["status"] = "planned"
C["floors"]["asOf"] = "2026-11"
C["floors"]["source"] = T("ইমাম বুখারী ট্রাস্ট, নভেম্বর ২০২৬", "Imam Bukhari Trust, November 2026", "وقف الإمام البخاري، نوفمبر 2026")
C["floors"]["headline"] = {
    "mosque": T("১ম ও ২য় তলার ছাদ ঢালাই সম্পন্ন, আলহামদুলিল্লাহ", "1st and 2nd floor roof slabs cast, alhamdulillah", "اكتمل صب سقفي الطابقين الأول والثاني، والحمد لله"),
    "academic": T("ফাউন্ডেশনের কাজ প্রায় শেষ, এখন ছাদ ঢালাইয়ের প্রস্তুতি চলছে", "Foundation nearly complete; preparing for the first roof slab", "الأساسات شارفت على الانتهاء، والتحضير لصب السقف جارٍ")}
C["floors"]["photos"] = {"mosque": "img/construction-masjid-2026-10.jpg", "academic": "img/construction-academic-2026-10.jpg"}
C["floors"]["specs"] = {"mosque": T("বি+জি+৫ · প্রায় ৬১,২৯৪ বর্গফুট · নামাজের স্থান ২০,৭৪১ বর্গফুট", "B+G+5 · about 61,294 sq ft · 20,741 sq ft of prayer space", "قبو+أرضي+5 · نحو 61,294 قدمًا مربعًا · مساحة صلاة 20,741 قدمًا مربعًا"),
                        "academic": T("বি+জি+৯ · প্রায় ১,৮০,৭৯৯ বর্গফুট · ৭০টি শ্রেণিকক্ষ · ২,১০০ শিক্ষার্থী", "B+G+9 · about 180,799 sq ft · 70 classrooms · 2,100 students", "قبو+أرضي+9 · نحو 180,799 قدمًا مربعًا · 70 فصلًا · 2,100 طالب")}
p0 = C["projects"][0]
p0["body"] = T(
    "জমি ক্রয় ও রেজিস্ট্রেশন, নির্মাণ অনুমোদন, মাটি পরীক্ষা, স্থাপত্য নকশা ও প্রাক-নির্মাণ কাজ সম্পন্ন হয়েছে। ২২৫টি পাইলের কাজ শেষ। মাসজিদ কমপ্লেক্সের ১ম ও ২য় তলার ছাদ ঢালাই সম্পন্ন হয়েছে, আলহামদুলিল্লাহ। একাডেমিক ভবনের ফাউন্ডেশনের কাজ প্রায় শেষ, এখন ছাদ ঢালাইয়ের প্রস্তুতি চলছে। মাসজিদ ভবন: বি+জি+৫, প্রায় ৬১,২৯৪ বর্গফুট, মোট নামাজের স্থান ২০,৭৪১ বর্গফুট। একাডেমিক ভবন: বি+জি+৯, প্রায় ১,৮০,৭৯৯ বর্গফুট, ৭০টি শ্রেণিকক্ষ, ২,১০০ শিক্ষার্থীর ধারণক্ষমতা।",
    "Land purchase and registration, construction approval, soil testing, architectural design and pre-construction work are complete, and all 225 piles are done. The roof slabs of the masjid complex's 1st and 2nd floors have been cast, alhamdulillah. The academic building's foundation is nearly complete and preparations for its first roof slab are under way. Masjid building: B+G+5, about 61,294 sq ft, with 20,741 sq ft of prayer space. Academic building: B+G+9, about 180,799 sq ft, 70 classrooms for 2,100 students.",
    "اكتمل شراء الأرض وتسجيلها، والترخيص، وفحص التربة، والتصميم المعماري، وأعمال ما قبل البناء، وتنفيذ 225 خازوقًا. وتم صب سقفي الطابقين الأول والثاني لمجمع المسجد، والحمد لله. وشارفت أساسات المبنى الأكاديمي على الانتهاء، ويجري التحضير لصب سقفه الأول. مبنى المسجد: قبو+أرضي+5 بنحو 61,294 قدمًا مربعًا ومساحة صلاة 20,741 قدمًا مربعًا. المبنى الأكاديمي: قبو+أرضي+9 بنحو 180,799 قدمًا مربعًا و70 فصلًا تتسع لـ2,100 طالب.")
for s in C["supportItems"]["items"]:
    if s["name"]["en"].startswith("The masjid's first roof"):
        s["name"] = T("মাসজিদের ১ম ও ২য় তলার ছাদ ঢালাই", "The masjid's 1st and 2nd floor roof slabs", "صب سقفي الطابقين الأول والثاني للمسجد")
C["supportItems"]["asOf"] = "2026-11"
for n in C["news"]:
    if n["id"] == "second-roof-2026":
        n["title"] = T("মাসজিদের ১ম ও ২য় তলার ছাদ ঢালাই সম্পন্ন", "Masjid's 1st and 2nd floor slabs cast", "اكتمال صب سقفي الطابقين الأول والثاني للمسجد")
C["news"].insert(0, {"id": "construction-2026-11", "date": "2026-11", "image": "img/construction-academic-2026-10.jpg",
    "title": T("একাডেমিক ভবনের ফাউন্ডেশন প্রায় শেষ, ছাদ ঢালাইয়ের প্রস্তুতি", "Academic building foundation nearly done; slab preparations begin", "أساسات المبنى الأكاديمي شارفت على الانتهاء"),
    "summary": T("মাসজিদ কমপ্লেক্সের ১ম ও ২য় তলার ছাদ ঢালাই সম্পন্ন হয়েছে। একাডেমিক ভবনের ফাউন্ডেশনের কাজ প্রায় শেষ, এখন ছাদ ঢালাইয়ের প্রস্তুতি চলছে।", "The masjid complex's 1st and 2nd floor slabs are cast. The academic building's foundation is nearly complete and slab preparations are under way.", "اكتمل صب سقفي الطابقين الأول والثاني لمجمع المسجد، وشارفت أساسات المبنى الأكاديمي على الانتهاء."),
    "source": "Imam Bukhari Trust"})

# ---------- funds (causes) with documentary and share-based giving ----------
def share(bn, en, ar, amount, icon):
    return {"name": T(bn, en, ar), "amount": amount, "icon": icon}
def ch(bn_t, en_t, ar_t, bn, en, ar, image="", video=""):
    return {"title": T(bn_t, en_t, ar_t), "text": T(bn, en, ar), "image": image, "video": video}

CEMENT = share("১০০ ব্যাগ সিমেন্ট", "100 bags of cement", "100 كيس إسمنت", 51000, "cement")
BRICKS = share("২,০০০ ইট", "2,000 bricks", "2,000 طوبة", 26000, "brick")
ROD = share("১ টন রড", "1 ton of steel rod", "طن حديد تسليح", 93000, "rod")

OLD = {f["id"]: f for f in C["funds"]}
def fund(id, **kw):
    f = dict(OLD.get(id, {"id": id}))
    f.update(kw)
    return f

C["funds"] = [
    fund("mosque", head="Mosque", featured=True, icon="masjid", image="img/render-mosque.jpg", cover="img/design-night-1.jpg",
         name=T("মাসজিদ নির্মাণ", "Masjid construction", "بناء المسجد"),
         tagline=T("আল্লাহর ঘর নির্মাণে শরিক হোন", "Take part in building a house of Allah", "شارك في بناء بيت من بيوت الله"),
         text=T("ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স (বি+জি+৫) নির্মাণ। ১ম ও ২য় তলার ছাদ ঢালাই সম্পন্ন হয়েছে; এখন ওপরের তলাগুলোর কাজ সামনে।", "Building the Imam Bukhari Jame Masjid Complex (B+G+5). The 1st and 2nd floor slabs are cast; the upper floors lie ahead.", "بناء مجمع جامع الإمام البخاري (قبو+أرضي+5). تم صب سقفي الطابقين الأول والثاني، والطوابق العليا هي المرحلة القادمة."),
         status=T("১ম ও ২য় তলার ছাদ ঢালাই সম্পন্ন", "1st & 2nd floor slabs cast", "اكتمل سقفا الطابقين الأول والثاني"), floors="mosque",
         video="ViHzrqAKvO8",
         shares=[share("মাসজিদের প্রতি ছাদ ঢালাই", "One roof slab of the masjid", "صب سقف واحد للمسجد", 5580000, "slab"),
                 share("একজন মুসল্লির জায়গা", "Space for one worshipper", "مكان مصلٍّ واحد", 35000, "musalla"),
                 share("একটি ওযুখানা", "One wudu point", "موضع وضوء واحد", 15000, "wudu"),
                 share("প্রতি বর্গফুট নির্মাণ", "One square foot", "قدم مربع واحد", 3200, "sqft"),
                 CEMENT, ROD, BRICKS],
         suggested=[1000, 3200, 15000, 35000],
         story=[ch("স্বপ্ন", "The dream", "الحلم", "মাসজিদ আন-নববীর আদলে মাসজিদকেন্দ্রিক একটি জ্ঞানভিত্তিক কমিউনিটি, যার কেন্দ্রে থাকবে মাসজিদ, ইলম ও খিদমাহ।", "A knowledge-based community centred on the masjid, on the model of Masjid an-Nabawi.", "مجتمع معرفي محوره المسجد على هدي المسجد النبوي.", "img/design-aerial.jpg"),
                ch("ভিত্তি", "The foundation", "الأساس", "নিউ ঢাকা সিটিতে ধলেশ্বরী নদীর তীরে মাসজিদ ও একাডেমিক ভবন মিলিয়ে ২২৫টি পাইলের কাজ সম্পন্ন হয়েছে।", "225 piles for the masjid and academic building have been completed at New Dhaka City, on the bank of the Dhaleshwari.", "اكتمل تنفيذ 225 خازوقًا للمسجد والمبنى الأكاديمي في مدينة دكا الجديدة على ضفاف نهر دهاليشوري.", "img/construction-piling.jpg"),
                ch("প্রথম সালাত", "The first prayer", "الصلاة الأولى", "ছাদ ঢালাইয়ের পর নির্মাণাধীন মাসজিদেই জামাআতে সালাত শুরু হয়েছে, আলহামদুলিল্লাহ।", "Once the slabs were cast, congregational prayer began in the masjid under construction, alhamdulillah.", "بعد صب الأسقف بدأت صلاة الجماعة في المسجد قيد الإنشاء، والحمد لله.", "img/first-prayer.jpg"),
                ch("আজকের অবস্থা", "Where we are today", "أين وصلنا اليوم", "১ম ও ২য় তলার ছাদ ঢালাই সম্পন্ন। ওপরের তলাগুলো নির্মাণে আপনার সাদাকাহ এক চলমান সাদাকায়ে জারিয়াহ হতে পারে।", "The 1st and 2nd floor slabs are cast. Your sadaqah towards the upper floors can be a continuing charity.", "اكتمل سقفا الطابقين الأول والثاني، وصدقتك للطوابق العليا صدقة جارية.", "img/construction-masjid-2026-10.jpg", "ViHzrqAKvO8")]),
    fund("academy", head="Academic Building", featured=True, icon="education", image="img/render-academic.jpg", cover="img/design-front.jpg",
         name=T("একাডেমিক ভবন", "Academic building", "المبنى الأكاديمي"),
         tagline=T("প্রজন্মের জন্য ইলমের ঘর", "A house of knowledge for generations", "دار علم للأجيال"),
         text=T("কুল্লিয়াতুল কুরআনের স্থায়ী ক্যাম্পাস (বি+জি+৯, ৭০টি শ্রেণিকক্ষ, ২,১০০ শিক্ষার্থী)। ফাউন্ডেশনের কাজ প্রায় শেষ, এখন ছাদ ঢালাইয়ের প্রস্তুতি চলছে।", "Kulliyatul Quran's permanent campus (B+G+9, 70 classrooms, 2,100 students). The foundation is nearly complete and slab preparations are under way.", "الحرم الدائم لكلية القرآن (قبو+أرضي+9، 70 فصلًا، 2,100 طالب). الأساسات شارفت على الانتهاء والتحضير لصب السقف جارٍ."),
         status=T("ফাউন্ডেশন প্রায় শেষ", "Foundation nearly complete", "الأساسات شارفت على الانتهاء"), floors="academic",
         video="GW_HDHAsbyM",
         shares=[share("একটি শ্রেণিকক্ষ", "One classroom", "فصل دراسي واحد", 1500000, "classroom"), CEMENT, ROD, BRICKS],
         suggested=[1000, 5000, 26000, 51000],
         story=[ch("নকশা", "The design", "التصميم", "এগারো তলার একাডেমিক ভবনে থাকবে শ্রেণিকক্ষ, লাইব্রেরি, কনফারেন্স হল ও প্রশাসনিক অংশ।", "The academic building will hold classrooms, a library, a conference hall and administration.", "سيضم المبنى الأكاديمي فصولًا ومكتبة وقاعة مؤتمرات وإدارة.", "img/render-academic.jpg"),
                ch("পাইল ক্যাপ ঢালাই", "Casting the pile caps", "صب رؤوس الخوازيق", "১৫৮টি পাইলের ওপর পাইল ক্যাপ ঢালাইয়ের কাজ এগিয়েছে।", "Pile caps have been cast over the building's 158 piles.", "تقدم صب رؤوس الخوازيق فوق 158 خازوقًا.", "img/construction-academic-2026-10.jpg", "GW_HDHAsbyM"),
                ch("পরবর্তী ধাপ", "Next step", "الخطوة التالية", "ফাউন্ডেশনের কাজ প্রায় শেষ; এখন প্রথম ছাদ ঢালাইয়ের প্রস্তুতি চলছে।", "The foundation is nearly complete; preparations for the first roof slab are under way.", "الأساسات شارفت على الانتهاء ويجري التحضير لصب السقف الأول.", "img/design-courtyard.jpg")]),
    fund("dawah", icon="dawah", image="img/chairman-speech.jpg", cover="img/sunnah-conference-2024.jpg",
         name=T("দাওয়াহ ও গবেষণা", "Dawah & research", "الدعوة والبحث"),
         tagline=T("কুরআন-সুন্নাহর সঠিক বার্তা সবার কাছে", "The message of the Qur'an and Sunnah, for everyone", "رسالة القرآن والسنة للجميع"),
         text=T("ইলমী মাজলিস, প্রশ্নোত্তর, কনফারেন্স, ডিজিটাল কনটেন্ট ও প্রকাশনা এবং দাওয়াহ সেন্টার নির্মাণ।", "Ilmi majlis, Q&A, conferences, digital content and publications, and building the Dawah centre.", "المجالس العلمية والأسئلة والمؤتمرات والمحتوى الرقمي والنشر وبناء مركز الدعوة."),
         shares=[share("দাওয়াহ সেন্টার নির্মাণ", "Building the Dawah centre", "بناء مركز الدعوة", 5000000, "dawah")],
         suggested=[500, 1000, 5000, 10000],
         story=[ch("সুন্নাহ কনফারেন্স", "Sunnah Conference", "مؤتمر السنة", "সুন্নাহ কনফারেন্স বাংলাদেশ ২০২৪-এ দেশের বিশিষ্ট আলেমগণ অংশ নেন।", "Leading scholars took part in Sunnah Conference Bangladesh 2024.", "شارك كبار العلماء في مؤتمر السنة في بنغلاديش 2024.", "img/sunnah-conference-2024.jpg", "J0WR-qV5Omg"),
                ch("হালাকা ও প্রশ্নোত্তর", "Halaqa and Q&A", "الحلقات والأسئلة", "সাপ্তাহিক ইলমী মাজলিস ও প্রশ্নোত্তর পর্ব নিয়মিত YouTube-এ প্রচারিত হয়।", "The weekly Ilmi Majlis and Q&A sessions are broadcast regularly on YouTube.", "يُبث المجلس العلمي الأسبوعي وجلسات الأسئلة بانتظام على يوتيوب.", "img/halaqa-class.jpg"),
                ch("ডিজিটাল দাওয়াহ", "Digital Dawah", "الدعوة الرقمية", "আধুনিক প্রজন্মের কাছে সঠিক ইসলাম পৌঁছে দিতে কনটেন্ট, প্রকাশনা ও প্রযুক্তি স্টুডিওর কাজ চলছে।", "Content, publications and a technology studio carry authentic Islam to a new generation.", "محتوى ونشر واستوديو تقني لإيصال الإسلام الصحيح للجيل الجديد.", "img/chairman-speech.jpg")]),
    fund("winter", head="Social Welfare", icon="winter", image="img/winter-2024-distribution.jpg", cover="img/doc-winter.jpg",
         name=T("শীতবস্ত্র বিতরণ", "Winter clothing", "كسوة الشتاء"),
         tagline=T("শীতার্ত মানুষের পাশে একটি কম্বল", "A blanket for someone in the cold", "بطانية لمن يعاني البرد"),
         text=T("প্রতি শীতে দরিদ্র ও শীতার্ত মানুষের মাঝে কম্বল ও শীতবস্ত্র বিতরণ।", "Each winter we distribute blankets and warm clothing to people in need.", "نوزع كل شتاء البطانيات والملابس الدافئة على المحتاجين."),
         suggested=[500, 1000, 2000, 5000],
         story=[ch("শীতে জর্জরিত মানুষ", "People hit by the cold", "ضحايا البرد", "শীতে জর্জরিত মানুষদের মাঝে কম্বল বিতরণ করা হয়।", "Blankets were distributed to people struggling in the cold.", "وُزعت البطانيات على من أنهكهم البرد.", "img/doc-winter.jpg", "g9lRiceVtBY"),
                ch("শীতবস্ত্র ২০২৪", "Winter 2024", "شتاء 2024", "লাইনে দাঁড়িয়ে শীতবস্ত্র গ্রহণ করছেন উপকারভোগীরা।", "Recipients queue for winter clothing.", "المستفيدون يصطفون لاستلام الكسوة.", "img/winter-2024-queue.jpg"),
                ch("আপনার অংশ", "Your part", "دورك", "এ শীতেও যেন কেউ উষ্ণতা থেকে বঞ্চিত না হয়।", "So that no one goes without warmth this winter.", "حتى لا يُحرم أحد من الدفء هذا الشتاء.", "img/winter-2024-distribution.jpg")]),
    fund("relief", head="Social Welfare", icon="relief", image="img/relief-flood-1.jpg", cover="img/doc-flood-relief.jpg",
         name=T("বন্যা ও দুর্যোগে ত্রাণ", "Flood & disaster relief", "إغاثة الفيضانات والكوارث"),
         tagline=T("দুর্যোগে ত্রাণ, দুর্যোগের পর পুনর্বাসন", "Relief in disaster, rehabilitation after it", "إغاثة في الكارثة وتأهيل بعدها"),
         text=T("বন্যার্তদের মাঝে ত্রাণসামগ্রী এবং পরবর্তী পুনর্বাসন: বাড়ি নির্মাণ সামগ্রী, টিউবওয়েল, গবাদি পশু ও আর্থিক সহায়তা।", "Relief for flood victims, then rehabilitation: house-building materials, tube-wells, livestock and financial support.", "إغاثة المتضررين من الفيضانات ثم التأهيل: مواد بناء المنازل والآبار الأنبوبية والمواشي والدعم المالي."),
         suggested=[1000, 2000, 5000, 10000],
         story=[ch("ত্রাণসামগ্রী", "Relief supplies", "المواد الإغاثية", "নৌকায় করে পানিবন্দি মানুষের কাছে ত্রাণসামগ্রী পৌঁছে দেওয়া হয়।", "Relief supplies were taken by boat to families cut off by the water.", "نُقلت المواد الإغاثية بالقوارب إلى العائلات المحاصرة.", "img/doc-flood-relief.jpg", "g9lRiceVtBY"),
                ch("পুনর্বাসন", "Rehabilitation", "إعادة التأهيل", "বন্যার পর বাড়ি নির্মাণ সামগ্রী, টিউবওয়েল ও গবাদি পশু দিয়ে পরিবারগুলোকে আবার দাঁড়াতে সাহায্য করা হয়।", "After the flood, families were helped back on their feet with building materials, tube-wells and livestock.", "بعد الفيضان ساعدنا الأسر بمواد البناء والآبار والمواشي.", "img/doc-flood-rehab-2.jpg"),
                ch("জীবিকা", "Livelihoods", "سبل العيش", "গবাদি পশু ও আর্থিক সহায়তা দিয়ে আয়ের পথ তৈরি।", "Livestock and financial support to restore an income.", "مواشٍ ودعم مالي لاستعادة مصدر الدخل.", "img/doc-flood-rehab-1.jpg")]),
    fund("scholarship", head="Kulliyatul Quran", icon="scholar", image="img/model-madrasa.jpg", cover="img/scholars-visit-group.jpg",
         name=T("শিক্ষাবৃত্তি ও শিক্ষার্থী সহায়তা", "Scholarships & student support", "المنح ودعم الطلاب"),
         tagline=T("মেধাবী ও অসচ্ছল শিক্ষার্থীর পাশে", "Standing by able students in need", "إلى جانب الطلاب المتفوقين المحتاجين"),
         text=T("কুল্লিয়াতুল কুরআনে প্রতি বছর ২০ জন মেধাবী শিক্ষার্থীকে বৃত্তি দেওয়া হয়। এ ছাড়া আহত ও অসচ্ছল শিক্ষার্থীদের চিকিৎসা ও পড়াশোনায় সহায়তা।", "Kulliyatul Quran awards scholarships to 20 high-achieving students every year, and helps injured and needy students with treatment and study costs.", "تمنح كلية القرآن منحًا لعشرين طالبًا متفوقًا كل عام، وتساعد الطلاب المصابين والمحتاجين في العلاج والدراسة."),
         suggested=[1000, 2500, 5000, 10000],
         story=[ch("মেধাবৃত্তি", "Merit scholarships", "منح التفوق", "সানাবিয়্যাহ পর্যায়ে প্রতি বছর ২০ জন মেধাবী শিক্ষার্থীকে বৃত্তি।", "Scholarships for 20 high achievers each year at Sanabiyyah level.", "منح لعشرين طالبًا متفوقًا سنويًا في المرحلة السنابية.", "img/model-madrasa.jpg"),
                ch("আহত শিক্ষার্থীদের চিকিৎসা", "Treatment for injured students", "علاج الطلاب المصابين", "জুলাই বিপ্লবে আহত শিক্ষার্থীদের চিকিৎসা খরচ প্রদান করা হয়।", "Medical costs were paid for students injured in the July uprising.", "تكفلنا بنفقات علاج الطلاب المصابين في ثورة يوليو.", "img/doc-july-medical.jpg", "g9lRiceVtBY"),
                ch("আন্তর্জাতিক উচ্চশিক্ষা", "Higher study abroad", "الدراسة في الخارج", "কুল্লিয়াতুল কুরআনের ৬ জন শিক্ষার্থী আন্তর্জাতিক বিশ্ববিদ্যালয়ে উচ্চশিক্ষায়।", "Six Kulliyatul Quran students are now at international universities.", "ستة من طلاب الكلية يدرسون في جامعات دولية.", "img/scholars-visit-group.jpg")]),
    fund("iftar", head="Social Welfare", icon="iftar", image="img/doc-iftar.jpg", cover="img/doc-iftar.jpg",
         name=T("রমাদানে ইফতার", "Ramadan iftar", "إفطار رمضان"),
         tagline=T("রোজাদারকে ইফতার করানোর সওয়াব", "The reward of feeding a fasting person", "أجر تفطير الصائم"),
         text=T("রমাদানে দরিদ্র রোজাদারদের মাঝে ইফতার ও খাদ্যসামগ্রী বিতরণ।", "Iftar and food packs for fasting people in need during Ramadan.", "توزيع الإفطار والسلال الغذائية على الصائمين المحتاجين في رمضان."),
         suggested=[500, 1000, 2500, 5000],
         story=[ch("ইফতার বিতরণ ১৪৪৬ হি.", "Iftar distribution 1446 AH", "توزيع الإفطار 1446هـ", "কামারজুরী, গাজীপুর মহানগরে ইমাম বুখারী ট্রাস্ট ও কুল্লিয়াতুল কুরআনের যৌথ ইফতার বিতরণ কর্মসূচি।", "A joint iftar distribution by Imam Bukhari Trust and Kulliyatul Quran at Kamarjuri, Gazipur.", "برنامج إفطار مشترك بين الوقف وكلية القرآن في كمارجوري، غازيبور.", "img/doc-iftar.jpg", "g9lRiceVtBY")]),
    fund("zakat", head="Zakat", icon="coin", image="img/relief-flood-2.jpg",
         name=T("যাকাত তহবিল", "Zakat fund", "صندوق الزكاة"),
         tagline=T("শরিয়াহসম্মত খাতে যাকাত বণ্টন", "Zakat distributed to its rightful recipients", "توزيع الزكاة على مستحقيها"),
         text=OLD["zakat"]["text"], suggested=OLD["zakat"].get("suggested", [5000, 10000, 25000, 50000])),
    fund("kulliya", icon="education", image="img/halaqa-class.jpg",
         name=T("কুল্লিয়াতুল কুরআন", "Kulliyatul Quran", "كلية القرآن"),
         tagline=T("বিশুদ্ধ ধারার উচ্চতর দ্বীনি শিক্ষা", "Higher Islamic education in the pure tradition", "تعليم شرعي عالٍ على المنهج الصحيح"),
         text=OLD["kulliya"]["text"], suggested=OLD["kulliya"].get("suggested", [1000, 2500, 5000, 10000])),
    fund("sadaqah", icon="heart", image="img/event-gettogether.jpg",
         name=T("সাধারণ সাদাকাহ", "General sadaqah", "صدقة عامة"),
         tagline=T("যেখানে প্রয়োজন সবচেয়ে বেশি", "Where the need is greatest", "حيث الحاجة أشد"),
         text=OLD["sadaqah"]["text"], suggested=OLD["sadaqah"].get("suggested", [500, 1000, 5000, 10000])),
    fund("monthly", icon="cal", image="img/scholars-visit-group.jpg",
         name=OLD["monthly"]["name"], tagline=T("প্রতি মাসে নিয়মিত সাদাকাহ", "A regular monthly sadaqah", "صدقة شهرية منتظمة"),
         text=OLD["monthly"]["text"], suggested=OLD["monthly"].get("suggested", [500, 1000, 2000, 5000])),
]
for f in C["funds"]:
    for k in ("head",):
        if k not in f and k in OLD.get(f["id"], {}): f[k] = OLD[f["id"]][k]

# ---------- future projects (list supplied by IBT, Nov 2026) ----------
def item(bn, en, ar, icon): return {"name": T(bn, en, ar), "icon": icon}
C["future"] = {
    "title": T("ইমাম বুখারী ট্রাস্টের ভবিষ্যৎ প্রকল্প", "IBT future projects", "مشاريع الوقف المستقبلية"),
    "intro": T("মাসজিদকে কেন্দ্র করে একটি পূর্ণাঙ্গ জ্ঞানভিত্তিক ক্যাম্পাস: পাঁচটি ভবনে শিক্ষা, গবেষণা, দাওয়াহ ও সমাজসেবার সমন্বয়।", "A complete knowledge campus centred on the masjid: education, research, Dawah and community service across five buildings.", "حرم معرفي متكامل محوره المسجد: تعليم وبحث ودعوة وخدمة مجتمعية في خمسة مبانٍ."),
    "note": T("ছবিগুলো স্থাপত্য নকশা ও প্রতীকী চিত্র।", "Images are architectural designs and illustrations.", "الصور تصاميم معمارية ورسوم توضيحية."),
    "buildings": [
        {"id": "masjid-complex", "status": "construction", "image": "img/render-mosque.jpg", "color": "#8EB69B", "fund": "mosque",
         "name": T("ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স", "Imam Bukhari Jame Masjid Complex", "مجمع جامع الإمام البخاري"),
         "statusText": T("নির্মাণাধীন · ১ম ও ২য় তলার ছাদ ঢালাই সম্পন্ন", "Under construction · 1st & 2nd floor slabs cast", "قيد الإنشاء · اكتمل سقفا الطابقين الأول والثاني"),
         "items": [item("দাওয়াহ ও রিসার্চ সেন্টার", "Dawah & Research Center", "مركز الدعوة والبحث", "dawah"), item("ইমাম বুখারী কেন্দ্রীয় লাইব্রেরি", "Imam Bukhari Central Library", "مكتبة الإمام البخاري المركزية", "library"),
                   item("সকাল ও সন্ধ্যার মক্তব", "Morning & Evening Maktab", "الكتّاب الصباحي والمسائي", "maktab"), item("তাহফিযুল কুরআন", "Tahfizul Quran", "تحفيظ القرآن", "quran"), item("আইবিটি স্টুডিও", "IBT Studio", "استوديو الوقف", "studio")]},
        {"id": "academic-1", "status": "construction", "image": "img/render-academic.jpg", "color": "#DAF1DE", "fund": "academy",
         "name": T("একাডেমিক কমপ্লেক্স ১", "Academic Complex 1", "المجمع الأكاديمي 1"),
         "statusText": T("নির্মাণাধীন · ফাউন্ডেশন প্রায় শেষ", "Under construction · foundation nearly complete", "قيد الإنشاء · الأساسات شارفت على الانتهاء"),
         "items": [item("রিসার্চ সেন্টার", "Research Center", "مركز البحث", "research"), item("সেমিনার হল", "Seminar Hall", "قاعة الندوات", "seminar"),
                   item("কুল্লিয়াতুল কুরআন উচ্চশিক্ষা", "Kulliyatul Quran Higher Education", "كلية القرآن للتعليم العالي", "education"), item("আরবি ভাষা ক্লাব", "Arabic Language Club", "نادي اللغة العربية", "arabic"),
                   item("কুল্লিয়াতুল কুরআন মডেল মাদরাসা", "Kulliyatul Quran Model Madrasah", "مدرسة كلية القرآن النموذجية", "school"), item("কুল্লিয়াতুল কুরআন আফটার স্কুল", "Kulliyatul Quran After School", "برنامج كلية القرآن بعد المدرسة", "clock")]},
        {"id": "academic-2", "status": "planned", "image": "img/design-courtyard.jpg", "color": "#C9B37E",
         "name": T("একাডেমিক কমপ্লেক্স ২", "Academic Complex 2", "المجمع الأكاديمي 2"),
         "statusText": T("পরিকল্পিত", "Planned", "مخطط"),
         "items": [item("কুল্লিয়াতুল কুরআন গার্লস মডেল মাদরাসা", "Kulliyatul Quran Girls' Model Madrasah", "مدرسة كلية القرآن النموذجية للبنات", "school"), item("কুল্লিয়াতুল কুরআন গার্লস উচ্চতর বিভাগ", "Kulliyatul Quran Girls' Higher Section", "القسم العالي للبنات", "education"),
                   item("টিচার্স ট্রেনিং ইনস্টিটিউট", "Teachers Training Institute", "معهد تدريب المعلمين", "teacher"), item("ছাত্রী হোস্টেল", "Girls' hostel", "سكن الطالبات", "hostel")]},
        {"id": "academic-3", "status": "planned", "image": "img/design-plaza.jpg", "color": "#9BB8C9",
         "name": T("একাডেমিক কমপ্লেক্স ৩", "Academic Complex 3", "المجمع الأكاديمي 3"),
         "statusText": T("পরিকল্পিত", "Planned", "مخطط"),
         "items": [item("ছাত্র হোস্টেল", "Boys' hostel", "سكن الطلاب", "hostel"), item("ইংলিশ মিডিয়াম ইসলামিক স্কুল", "English-medium Islamic School", "مدرسة إسلامية باللغة الإنجليزية", "school"),
                   item("ইয়ুথ ইসলামিক ক্লাব", "Youth Islamic Club", "النادي الإسلامي للشباب", "youth"), item("সিনিয়র সিটিজেন ক্লাব", "Senior Citizens' Club", "نادي كبار السن", "senior"),
                   item("সিনিয়র সিটিজেন হাউস", "Senior Citizens' House", "دار كبار السن", "home"), item("শিক্ষক ডরমিটরি", "Teachers' dormitory", "سكن المعلمين", "hostel")]},
        {"id": "taibah-tower", "status": "planned", "image": "img/design-night-2.jpg", "color": "#B9A6D9",
         "name": T("তাইবাহ একাডেমি টাওয়ার", "Taibah Academy Tower", "برج أكاديمية طيبة"),
         "statusText": T("পরিকল্পিত", "Planned", "مخطط"),
         "items": [item("ইসলামিক মিউজিয়াম", "Islamic Museum", "المتحف الإسلامي", "museum"), item("তাইবাহ একাডেমি", "Taibah Academy", "أكاديمية طيبة", "education"),
                   item("তাইবাহ পাবলিশার", "Taibah Publisher", "دار طيبة للنشر", "book"), item("তাইবাহ আইটি", "Taibah IT", "طيبة لتقنية المعلومات", "code")]}
    ]}

# ---------- UI strings ----------
C["ui"].update({
    "nav_future": T("ভবিষ্যৎ প্রকল্প", "Future projects", "المشاريع المستقبلية"),
    "nav_prayer": T("নামাজের সময়", "Prayer times", "مواقيت الصلاة"),
    "nav_quran": T("আল-কুরআন", "Al-Quran", "القرآن الكريم"),
    "nav_funds": T("দানের খাত", "Causes", "مجالات التبرع"),
    "theme_auto": T("স্বয়ংক্রিয়", "Auto", "تلقائي"),
    "theme_light": T("লাইট", "Light", "فاتح"),
    "theme_dark": T("ডার্ক", "Dark", "داكن"),
    "donate_now": T("এখনই দান করুন", "Donate now", "تبرّع الآن"),
    "give_to_fund": T("এই খাতে দান করুন", "Give to this cause", "تبرّع لهذا المجال"),
    "watch_documentary": T("ডকুমেন্টারি দেখুন", "Watch the documentary", "شاهد الفيلم"),
    "take_a_share": T("অংশ নিন", "Take a share", "شارك بحصة"),
    "share_hint": T("নির্মাণের যে অংশের দায়িত্ব নিতে চান সেটি বেছে নিন, পরিমাণ বাড়াতে পারবেন।", "Pick the part of the work you'd like to fund; you can change the quantity.", "اختر الجزء الذي تريد تمويله، ويمكنك تغيير الكمية."),
    "or_amount": T("অথবা নিজের পরিমাণ লিখুন", "Or enter your own amount", "أو أدخل مبلغًا من اختيارك"),
    "your_gift": T("আপনার দান", "Your gift", "تبرعك"),
    "step_fund": T("খাত বেছে নিন", "Choose a cause", "اختر المجال"),
    "step_amount": T("পরিমাণ", "Amount", "المبلغ"),
    "step_pay": T("পাঠানোর মাধ্যম", "How to send", "طريقة الإرسال"),
    "step_report": T("দান জানান", "Report your gift", "أبلغنا بتبرعك"),
    "pay_hint": T("নিচের যেকোনো মাধ্যমে টাকা পাঠিয়ে ফরমে ট্রানজেকশন আইডি দিন, তাহলে আপনার দান নির্দিষ্ট খাতে জমা হবে।", "Send the money by any channel below, then report the transaction ID so it is recorded against your chosen cause.", "أرسل المبلغ بأي وسيلة أدناه ثم أبلغنا برقم العملية ليُسجل في المجال الذي اخترته."),
    "account_name": T("হিসাবের নাম", "Account name", "اسم الحساب"),
    "branch": T("শাখা", "Branch", "الفرع"),
    "routing": T("রাউটিং", "Routing", "التوجيه"),
    "all_causes": T("সব খাত", "All causes", "كل المجالات"),
    "current_status": T("বর্তমান অবস্থা", "Current status", "الوضع الحالي"),
    "construction_update": T("নির্মাণ আপডেট", "Construction update", "تحديث البناء"),
    "explore_3d": T("৩ডি মডেলে ঘুরে দেখুন", "Explore in 3D", "استكشف بالأبعاد الثلاثية"),
    "drag_hint": T("ঘোরাতে টানুন · ভবনে ক্লিক করুন", "Drag to rotate · tap a building", "اسحب للتدوير · اضغط على مبنى"),
    "status_next": T("প্রস্তুতি চলছে", "Preparing", "قيد التحضير"),
    "status_construction": T("নির্মাণাধীন", "Under construction", "قيد الإنشاء"),
    "status_planned": T("পরিকল্পিত", "Planned", "مخطط"),
    "floors_done": T("তলা সম্পন্ন", "floors done", "طوابق مكتملة"),
    "what_inside": T("যা থাকবে", "What it will house", "ما سيضمه"),
    "masjid": T("মাসজিদ", "Masjid", "المسجد"),
    "academic_bld": T("একাডেমিক ভবন", "Academic building", "المبنى الأكاديمي"),
    # prayer
    "prayer_title": T("নামাজের সময়সূচি", "Prayer times", "مواقيت الصلاة"),
    "fajr": T("ফজর", "Fajr", "الفجر"), "sunrise": T("সূর্যোদয়", "Sunrise", "الشروق"), "dhuhr": T("যোহর", "Dhuhr", "الظهر"),
    "asr": T("আসর", "Asr", "العصر"), "maghrib": T("মাগরিব", "Maghrib", "المغرب"), "isha": T("এশা", "Isha", "العشاء"),
    "jumuah": T("জুমআ", "Jumu'ah", "الجمعة"),
    "next_prayer": T("পরবর্তী নামাজ", "Next prayer", "الصلاة القادمة"),
    "in_time": T("বাকি", "in", "متبقٍ"),
    "country": T("দেশ", "Country", "الدولة"), "city": T("শহর", "City", "المدينة"),
    "use_location": T("আমার লোকেশন", "Use my location", "موقعي"),
    "calc_method": T("হিসাব পদ্ধতি", "Calculation method", "طريقة الحساب"),
    "asr_method": T("আসরের হিসাব", "Asr calculation", "حساب العصر"),
    "asr_standard": T("স্ট্যান্ডার্ড (শাফেয়ী, মালেকী, হাম্বলী)", "Standard (Shafi'i, Maliki, Hanbali)", "الجمهور (الشافعي والمالكي والحنبلي)"),
    "asr_hanafi": T("হানাফী", "Hanafi", "الحنفي"),
    "sehri_iftar": T("সাহরি শেষ ও ইফতার", "Suhoor ends · Iftar", "نهاية السحور · الإفطار"),
    "prayer_note": T("সময় স্বয়ংক্রিয়ভাবে হিসাব করা হয় এবং প্রতিদিন হালনাগাদ হয়। স্থানীয় মাসজিদের সময়সূচির সাথে কয়েক মিনিটের পার্থক্য হতে পারে।", "Times are calculated automatically and update every day. They may differ by a few minutes from your local masjid.", "تُحسب المواقيت تلقائيًا وتتحدث يوميًا، وقد تختلف دقائق عن مسجدك المحلي."),
    "today": T("আজ", "Today", "اليوم"),
    "my_location": T("আমার অবস্থান", "My location", "موقعي"),
    # quran
    "quran_title": T("আল-কুরআনুল কারীম", "The Noble Qur'an", "القرآن الكريم"),
    "surah": T("সূরা", "Surah", "سورة"), "juz": T("পারা", "Juz", "الجزء"),
    "reciter": T("কারি", "Reciter", "القارئ"),
    "translation": T("অনুবাদ", "Translation", "الترجمة"),
    "tafsir": T("তাফসির", "Tafsir", "التفسير"),
    "show_tafsir": T("তাফসির দেখান", "Show tafsir", "إظهار التفسير"),
    "hide_tafsir": T("তাফসির লুকান", "Hide tafsir", "إخفاء التفسير"),
    "play_all": T("পুরো তিলাওয়াত শুনুন", "Play recitation", "تشغيل التلاوة"),
    "pause": T("বিরতি", "Pause", "إيقاف"),
    "ayah": T("আয়াত", "Ayah", "آية"),
    "makki": T("মাক্কী", "Makki", "مكية"), "madani": T("মাদানী", "Madani", "مدنية"),
    "font_size": T("অক্ষরের আকার", "Text size", "حجم الخط"),
    "bn_zakaria": T("বাংলা: ড. আবু বকর মুহাম্মাদ যাকারিয়া", "Bangla: Dr. Abu Bakr Muhammad Zakaria", "البنغالية: د. أبو بكر محمد زكريا"),
    "en_saheeh": T("ইংরেজি: Saheeh International", "English: Saheeh International", "الإنجليزية: صحيح إنترناشونال"),
    "tafsir_zakaria": T("তাফসীর আবু বকর যাকারিয়া (বাংলা)", "Tafsir Abu Bakr Zakaria (Bangla)", "تفسير أبو بكر زكريا (بنغالي)"),
    "tafsir_kathir": T("তাফসীর ইবনে কাসীর (ইংরেজি, সংক্ষিপ্ত)", "Tafsir Ibn Kathir (English, abridged)", "تفسير ابن كثير (إنجليزي، مختصر)"),
    "quran_source": T("কুরআনের পাঠ, অনুবাদ, তাফসির ও তিলাওয়াত: Quran.com", "Text, translations, tafsir and audio: Quran.com", "النص والترجمة والتفسير والتلاوة: Quran.com"),
    "loading": T("লোড হচ্ছে…", "Loading…", "جارٍ التحميل…"),
    "load_failed": T("লোড করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।", "Could not load. Check your connection and try again.", "تعذر التحميل. تحقق من الاتصال وأعد المحاولة."),
    "retry": T("আবার চেষ্টা", "Retry", "إعادة المحاولة"),
    "prev": T("আগের", "Previous", "السابق"), "next": T("পরের", "Next", "التالي"),
    "quick_links": T("দ্রুত লিংক", "Quick links", "روابط سريعة"),
})
_ord = [("১ম", "1st", "الأول"), ("২য়", "2nd", "الثاني"), ("৩য়", "3rd", "الثالث"), ("৪র্থ", "4th", "الرابع"), ("৫ম", "5th", "الخامس"), ("৬ষ্ঠ", "6th", "السادس"), ("৭ম", "7th", "السابع"), ("৮ম", "8th", "الثامن"), ("৯ম", "9th", "التاسع"), ("১০ম", "10th", "العاشر"), ("১১তম", "11th", "الحادي عشر")]
for i, f in enumerate(C["floors"]["academic"][1:]):
    b, e, a = _ord[i]
    f["label"] = T(b + " তলা", e + " floor", "الطابق " + a)
