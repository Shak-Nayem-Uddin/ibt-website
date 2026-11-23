/* IBT Admin Panel: schema-driven CMS on the artifact db + assets capabilities.
   Workflow: edit → Save draft → Preview → Publish (with audit log). */
(function () {
  "use strict";
  var IBT = window.IBT, esc = function (s) { return IBT.esc(s); }, icon = function (n) { return IBT.icon(n); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var BUNDLED = ["img/logo-mark.png", "img/logo-color-mark.png", "img/design-night-1.jpg", "img/design-night-2.jpg", "img/design-night-3.jpg", "img/design-front.jpg", "img/design-side.jpg", "img/design-aerial.jpg", "img/design-aerial-2.jpg", "img/design-courtyard.jpg", "img/design-plaza.jpg", "img/design-entrance.jpg", "img/design-landscape.jpg", "img/design-street.jpg", "img/design-portal.jpg", "img/design-colonnade.jpg", "img/design-masjid-front.jpg", "img/design-corner.jpg", "img/render-campus.jpg", "img/render-birdseye.jpg", "img/render-mosque.jpg", "img/render-academic.jpg", "img/site-signboard.jpg", "img/construction-piling.jpg", "img/construction-formwork.jpg", "img/construction-structure.jpg", "img/first-prayer.jpg", "img/scholars-visit.jpg", "img/scholars-visit-group.jpg", "img/chairman.jpg", "img/chairman-speech.jpg", "img/halaqa-class.jpg", "img/model-madrasa.jpg", "img/program-women-children.jpg", "img/program-women.jpg", "img/program-corporate.jpg", "img/event-gettogether.jpg", "img/sunnah-conference-2024.jpg", "img/relief-flood-1.jpg", "img/relief-flood-2.jpg"];
  var ICONS = ["research", "education", "dawah", "masjid", "social", "briefcase", "family", "women", "globe", "coin", "play", "heart", "doc"];
  var STAT = ["running", "construction", "establishing", "planned"];

  // ---------- schema ----------
  function L(item, title) { return { type: "list", item: item, title: title }; }
  var tl = { type: "tl" }, t = { type: "t" }, s = { type: "s" }, url = { type: "url" }, im = { type: "img" }, bool = { type: "bool" }, dt = { type: "date" }, nm = { type: "num" };
  function sel(o) { return { type: "sel", opts: o }; }
  var SCHEMA = {
    settings: { label: "সাইট সেটিংস", group: "site", fields: { siteName: t, shortName: s, tagline: t, motto: t, logo: im, logoColor: im, defaultLang: sel(["bn", "en", "ar"]), defaultTheme: sel(["auto", "light", "dark"]),
      announcement: { type: "obj", fields: { show: bool, text: t, link: s } },
      contact: { type: "obj", fields: { phones: { type: "strs" }, email: s, email2: s, office: t, site: t, hours: t } },
      social: L({ name: s, url: url, icon: sel(["facebook", "youtube", "linkedin", "x"]) }, "name"),
      relatedSites: L({ name: t, url: url }, "name"),
      youtubeChannels: L({ name: s, channelId: s, url: url }, "name"), joinUrl: url, askForm: url, officeMapUrl: url, officeMapLL: s } },
    home: { label: "হোমপেজ", group: "pages", fields: { heroEyebrow: t, heroTitle: t, heroText: tl, heroCta1: t, heroCta2: t, heroImage: im, heroImageLight: im, heroSlides: L({ image: im, caption: t, kind: sel(["photo", "design"]) }, "caption"), heroGalleryNight: { type: "imgs" }, heroGallery: { type: "imgs" }, heroStory: s, facts: L({ value: s, plain: bool, label: t }, "label"), factsSource: t, aboutTitle: t, aboutText: tl, aboutImage: im, visionTitle: t, visionText: tl,
      pillars: L({ icon: sel(ICONS), title: t, text: tl, link: s, image: im }, "title"), spotlightTitle: t, spotlightText: tl, spotlightImage: im, quote: { type: "obj", fields: { text: tl, ref: t, review: bool } }, impact2: { type: "json" } } },
    chairman: { label: "চেয়ারম্যান", group: "pages", fields: { name: t, role: t, photo: im, photo2: im, bio: tl, message: tl, links: L({ name: s, url: url }, "name"), review: bool } },
    cells: { label: "সেল ও বিভাগ", group: "pages", list: L({ name: t, text: tl, link: s }, "name") },
    history: { label: "ইতিহাস / টাইমলাইন", group: "pages", list: L({ date: s, title: t, text: tl }, "title") },
    faqs: { label: "FAQ", group: "pages", list: L({ q: t, a: tl }, "q") },
    institutions: { label: "প্রতিষ্ঠানসমূহ", group: "org", list: L({ id: s, type: s, status: sel(STAT), name: t, formerName: t, summary: tl, body: tl, image: im, link: s, website: url, features: { type: "tlist" }, programs: L({ name: t, text: tl }, "name"), registrations: { type: "strs" }, review: bool }, "name") },
    projects: { label: "প্রকল্প", group: "org", list: L({ id: s, category: sel(["infrastructure", "education", "social", "residential"]), status: sel(["ongoing", "proposed", "planned", "done"]), name: t, location: t, summary: tl, body: tl, image: im, objectives: { type: "tlist" }, design: { type: "imgs" }, gallery: { type: "imgs" }, tracker: bool, story: s, fund: s, review: bool, hidden: bool }, "name") },
    floors: { label: "নির্মাণ অগ্রগতি (3D)", group: "org", fields: { asOf: dt, source: t, note: t, mosque: L({ label: t, use: t, status: sel(["done", "progress", "planned"]) }, "label"), academic: L({ label: t, use: t, status: sel(["done", "progress", "planned"]) }, "label"), review: bool } },
    initiatives: { label: "উদ্যোগসমূহ", group: "programs", list: L({ id: s, icon: sel(ICONS), image: im, name: t, summary: tl, body: tl }, "name") },
    registrations: { label: "রেজিস্ট্রেশন", group: "programs", list: L({ id: s, slug: s, type: sel(["admission", "course", "training", "event", "volunteer", "membership"]), entity: s, image: im, title: t, text: tl, status: sel(["open", "soon", "closed", "info"]), needsInfo: bool, opens: dt, closes: dt, mode: sel(["link", "native"]), formType: sel(["general", "admission"]), formUrl: url, prefill: { type: "kv" }, venue: t, facts: { type: "tlist" }, eligibility: { type: "tlist" }, fees: L({ label: t, amount: s }, "label"), feeNote: tl, video: { type: "yt" }, source: url }, "title") },
    events: { label: "ইভেন্ট ও নিয়মিত কার্যক্রম", group: "programs", list: L({ id: s, date: dt, time: s, recurring: t, title: t, venue: t, type: sel(["halaqa", "qa", "event", "training"]), registration: s, video: { type: "yt" }, link: url }, "title") },
    news: { label: "সংবাদ ও কার্যক্রম", group: "programs", list: L({ id: s, date: s, image: im, video: { type: "yt" }, title: t, summary: tl, body: tl, source: s, review: bool }, "title") },
    scholars: { label: "একাডেমিক কমিটি (কুল্লিয়াতুল কুরআন)", group: "org", list: L({ name: t, role: t, photo: im }, "name") },
    impact: { label: "ইমপ্যাক্ট (সংখ্যা)", group: "programs", fields: { asOf: dt, source: t, groups: L({ title: t, items: L({ value: s, suffix: s, label: t }, "label") }, "title"), qualitative: { type: "tlist" } } },
    funds: { label: "তহবিল (ফান্ড)", group: "money", list: L({ id: s, head: s, featured: bool, icon: s, image: im, cover: im, name: t, tagline: t, text: tl, status: t, video: { type: "yt" }, suggested: { type: "nums" }, shares: L({ name: t, amount: nm, icon: s }, "name"), story: L({ title: t, text: tl, image: im, video: { type: "yt" } }, "title") }, "name") },
    future: { label: "ভবিষ্যৎ প্রকল্প (৫টি ভবন)", group: "org", fields: { title: t, intro: tl, note: tl, buildings: L({ id: s, status: s, image: im, illustrative: bool, color: s, fund: s, name: t, statusText: t, items: L({ name: t, icon: s }, "name") }, "name") } },
    payment: { label: "দানের মাধ্যম", group: "money", fields: { channels: L({ type: sel(["bkash", "nagad", "rocket", "bank", "card"]), name: t, number: s, note: tl, show: bool }, "name"), gatewayLive: bool, autopayLive: bool, review: bool } },
    supportItems: { label: "নির্মাণ সহযোগিতার খাত", group: "money", fields: { asOf: dt, items: L({ name: t, amount: nm, status: sel(["open", "done"]) }, "name") } },
    qa: { label: "ইসলামিক জিজ্ঞাসা: আমাদের উত্তর", group: "pages", list: L({ q: t, a: tl, category: t, scholar: t, date: s, ref: t, show: bool }, "q") },
    live: { label: "লাইভ সম্প্রচার", group: "media", fields: { show: bool, title: t, note: t, youtube: url, facebook: url, zoom: url, zoomId: s, zoomPass: s, start: s } },
    chatbot: { label: "চ্যাটবট উত্তর", group: "site", fields: { greeting: t, items: L({ keys: s, a: tl }, "keys") } },
    donateCopy: { label: "দানের পেজের লেখা", group: "money", fields: { motivations: L({ title: t, text: tl, ref: t }, "title"), transparency: tl, review: bool } },
    videos: { label: "ভিডিও", group: "media", list: L({ youtubeId: { type: "yt" }, title: t, topic: sel(["ibt", "kulliya", "courses", "research", "dawah"]), channel: s, entity: s, speaker: s }, "title") },
    stories: { label: "ডকুমেন্টারি (Story Mode)", group: "media", list: L({ id: s, entity: s, title: t, cover: im, chapters: L({ title: t, text: tl, image: im, video: { type: "yt" }, start: nm }, "title") }, "title") },
    reports: { label: "রিপোর্ট ও প্রকাশনা", group: "media", list: L({ title: t, type: sel(["annual", "financial", "audit", "progress", "activity", "publication", "newsletter"]), year: s, url: { type: "file" }, cover: im, pages: nm, size: s, note: t }, "title") },
    about: { label: "আমাদের সম্পর্কে: মিশন, মূল্যবোধ", group: "pages", fields: { mission: t, approach: tl, objectives: { type: "tlist" }, values: L({ icon: sel(["heart", "book", "social", "check", "education", "dawah", "research", "family", "globe"]), title: t, text: tl }, "title") } },
    governance: { label: "পরিচালনা ও সুশাসন", group: "org", fields: { intro: tl, committee: L({ name: t, role: t }, "name"), registrationStatus: sel(["pending", "available"]), registration: tl, policies: L({ name: t, status: sel(["available", "pending", "notpub"]), link: s }, "name") } },
    sisters: { label: "সহযোগী প্রতিষ্ঠান (লোগো ও লিংক)", group: "org", list: L({ id: s, name: t, text: tl, logo: im, url: url, inst: s }, "name") },
    welfareProgs: { label: "সমাজকল্যাণ কার্যক্রম", group: "programs", list: L({ id: s, icon: sel(["heart", "winter", "relief", "iftar", "scholar", "social", "family", "home"]), image: im, title: t, text: tl, stat: s, statLabel: t, fund: s }, "title") },
    milestones: { label: "নির্মাণের মাইলফলক", group: "org", list: L({ date: s, status: sel(["done", "progress", "next", "planned"]), text: t }, "text") },
    transparencyDocs: { label: "স্বচ্ছতা: নথি ও প্রতিবেদন", group: "money", list: L({ title: t, cat: sel(["annual", "financial", "projects"]), status: sel(["available", "pending", "notpub"]), period: s, published: s, authority: t, file: { type: "file" }, link: s }, "title") },
    verses: { label: "কুরআনের আয়াত ও হাদীস", group: "pages", json: true, help: "প্রতিটি আয়াত/হাদীস: type (quran/hadith), ar (আরবি), tr (অনুবাদ bn/en), ref (রেফারেন্স), part (অংশ হলে true)। আরবি লেখা যাচাই করা উৎস (quran.com, sunnah.com) থেকে কপি করুন।" },
    ibjmcInfo: { label: "মাসজিদ কমপ্লেক্স: তথ্য, অর্থায়ন, ভেতরের নকশা", group: "org", json: true, help: "প্রকল্পের মূল তথ্য (facts), অবস্থান, কেন এই মাসজিদ (why), ভেতরের নকশা (interiors), নির্মাণ পরিকল্পনা (timeline), অর্থায়ন (funding: কোটি টাকায়) ও দক্ষিণ এশিয়া অংশ।" },
    kqInfo: { label: "কুল্লিয়াতুল কুরআন: ভিশন, কারণ, MOU", group: "org", json: true },
    darulHadith: { label: "দারুল হাদীস আরবি মাদরাসা (প্রস্তাবিত)", group: "org", fields: { name: t, text: tl, subjects: { type: "tlist" } } },
    masterplan: { label: "3D মাস্টারপ্ল্যান (ভবনের অবস্থান ও নাম)", group: "org", json: true, help: "groups → parts: প্রতিটি ভবনের x, z (অবস্থান), w, d (মাপ), ghostFloors (তলা), name (ছাদে লেখা নাম)। context: আশপাশের প্লট।" },
    finance: { label: "আর্থিক সারসংক্ষেপ", group: "money", json: true },
    meta: { label: "সার্চ ইঞ্জিন ও শেয়ার তথ্য (SEO)", group: "adv", json: true },
    versesNote: { label: "কুরআন অনুবাদের উৎস", group: "adv", json: true },
    ui: { label: "ইন্টারফেসের লেখা (মেনু, বাটন)", group: "site", map: true }
  };
  function ensureSchema() { try { var d = (window.IBT && IBT.getDefaults && IBT.getDefaults()) || {}; Object.keys(d).forEach(function (k) { if (!SCHEMA[k]) SCHEMA[k] = { label: k, group: "adv", json: true }; }); } catch (e) { } }
  var GROUPS = [["site", "সাইট"], ["pages", "পেজ ও কনটেন্ট"], ["org", "প্রতিষ্ঠান ও প্রকল্প"], ["programs", "প্রোগ্রাম, রেজিস্ট্রেশন ও সংবাদ"], ["money", "দান ও তহবিল"], ["media", "মিডিয়া ও প্রকাশনা"], ["adv", "উন্নত সম্পাদনা (সব অংশ)"]];
  var LBL = { __items: "আইটেমসমূহ", askForm: "প্রশ্ন পাঠানোর Google Form লিংক", officeMapUrl: "অফিসের Google Maps লিংক", officeMapLL: "অফিসের অবস্থান (lat,lng)", impact2: "হোমপেজের সংখ্যা (JSON)", pages: "পৃষ্ঠা", size: "ফাইলের আকার", logo: "লোগো", inst: "প্রতিষ্ঠান আইডি", stat: "সংখ্যা", statLabel: "সংখ্যার বিবরণ", fund: "দানের খাত আইডি", cat: "ধরন", period: "সময়কাল", published: "প্রকাশ", authority: "দায়িত্বপ্রাপ্ত", file: "ফাইল", subjects: "বিষয়সমূহ", objectives: "লক্ষ্য", values: "মূল্যবোধ", approach: "কর্মপদ্ধতি", mission: "মিশন", committee: "কমিটি", policies: "নীতিমালা", registrationStatus: "নিবন্ধন তথ্য", registration: "নিবন্ধন", joinUrl: "IBT পরিবারে যুক্ত হওয়ার ফরম (লিংক)", formType: "ফরমের ধরন (general = নাম/ফোন, admission = শিক্ষার্থী/অভিভাবক)", cover: "কভার ছবি", status: "অবস্থা", shares: "অংশভিত্তিক দান (যেমন ১ বস্তা সিমেন্ট)", amount: "পরিমাণ (৳)", story: "ডকুমেন্টারি অধ্যায়", statusText: "অবস্থার লেখা", illustrative: "প্রতীকী চিত্র", color: "রং (#hex)", fund: "সংশ্লিষ্ট ফান্ড আইডি", buildings: "ভবনসমূহ", intro: "ভূমিকা", siteName: "সাইটের নাম", shortName: "সংক্ষিপ্ত নাম", tagline: "ট্যাগলাইন", motto: "মূলমন্ত্র", logo: "লোগো: ডার্ক মোড (সাদা, স্বচ্ছ PNG)", logoColor: "লোগো: লাইট মোড (রঙিন)", email2: "দ্বিতীয় ইমেইল", heroImageLight: "হিরো ছবি (লাইট মোড)", design: "স্থাপত্য নকশার ছবি", heroGalleryNight: "হিরো 3D ছবি (ডার্ক মোড)", heroGallery: "হিরো 3D ছবি (লাইট মোড)", defaultLang: "ডিফল্ট ভাষা", defaultTheme: "ডিফল্ট থিম", announcement: "ঘোষণা বার", show: "দেখাবে", text: "লেখা", link: "লিংক (#page বা URL)", contact: "যোগাযোগ", phones: "ফোন নম্বর", email: "ইমেইল", office: "অফিস ঠিকানা", site: "প্রকল্প ঠিকানা", hours: "অফিস সময়", social: "সোশ্যাল মিডিয়া", name: "নাম", url: "URL", icon: "আইকন", relatedSites: "সংশ্লিষ্ট সাইট", youtubeChannels: "YouTube চ্যানেল", youtube: "YouTube লাইভ লিংক (খালি রাখলে চ্যানেল থেকে স্বয়ংক্রিয়)", facebook: "Facebook লাইভ ভিডিও লিংক", zoom: "Zoom মিটিং লিংক", zoomId: "Zoom মিটিং আইডি", zoomPass: "Zoom পাসকোড", start: "শুরুর সময় (যেমন 2026-11-28T20:00)", greeting: "শুরুর বার্তা", q: "প্রশ্ন", scholar: "উত্তরদাতা আলেম", ref: "দলিল/সূত্র", category: "বিষয়", keys: "কীওয়ার্ড (কমা দিয়ে)", a: "উত্তর", note: "নোট", channelId: "চ্যানেল আইডি",
    heroEyebrow: "হিরো: উপরের ছোট লেখা", heroTitle: "হিরো: শিরোনাম", heroText: "হিরো: বিবরণ", heroCta1: "বাটন ১ (গল্প)", heroCta2: "বাটন ২ (দান)", heroImage: "হিরো ছবি (3D না চললে)", heroStory: "হিরো ডকুমেন্টারি আইডি", aboutTitle: "পরিচিতি: শিরোনাম", aboutText: "পরিচিতি: লেখা", aboutImage: "পরিচিতি: ছবি", visionTitle: "ভিশন: শিরোনাম", visionText: "ভিশন: লেখা", pillars: "পাঁচ স্তম্ভ", title: "শিরোনাম", spotlightTitle: "স্পটলাইট: শিরোনাম", spotlightText: "স্পটলাইট: লেখা", spotlightImage: "স্পটলাইট: ছবি", quote: "উদ্ধৃতি / হাদীস", ref: "রেফারেন্স", review: "অনুমোদন বাকি (শুধু এডিটররা সতর্কতা দেখবে)",
    role: "পদবি", photo: "ছবি", photo2: "দ্বিতীয় ছবি", bio: "পরিচিতি", message: "বার্তা", links: "লিংক", date: "তারিখ", q: "প্রশ্ন", a: "উত্তর", id: "আইডি (ইংরেজি, স্পেস ছাড়া)", type: "ধরন", status: "অবস্থা", formerName: "পূর্বনাম", summary: "সারাংশ", body: "বিস্তারিত", image: "ছবি", website: "ওয়েবসাইট", features: "বৈশিষ্ট্য", programs: "প্রোগ্রাম", registrations: "রেজিস্ট্রেশন আইডি", category: "ক্যাটাগরি", location: "অবস্থান", objectives: "লক্ষ্য", gallery: "গ্যালারি ছবি", tracker: "3D ট্র্যাকার দেখাবে", story: "ডকুমেন্টারি আইডি", fund: "ফান্ড আইডি", hidden: "লুকানো", asOf: "যে তারিখ অনুযায়ী", source: "সূত্র", note: "নোট", mosque: "মাসজিদ ভবনের তলা", academic: "একাডেমিক ভবনের তলা", label: "লেবেল", use: "ব্যবহার",
    slug: "শর্ট লিংক নাম", entity: "সংশ্লিষ্ট পেজ আইডি", opens: "শুরুর তারিখ", closes: "শেষ তারিখ", mode: "পদ্ধতি (link = Google Form, native = সাইটের ফর্ম)", formUrl: "Google Form লিংক", prefill: "Pre-fill (entry.xxx = মান; {lang} {source} {title})", fee: "ফি", venue: "স্থান", time: "সময়", registration: "রেজিস্ট্রেশন আইডি",
    groups: "গ্রুপ", items: "আইটেম", value: "সংখ্যা", suffix: "শেষে (+, K+, M+)", qualitative: "গুণগত অর্জন", head: "হিসাবের খাত (Accounts sheet)", featured: "প্রধান", suggested: "প্রস্তাবিত পরিমাণ", channels: "মাধ্যম", number: "নম্বর / অ্যাকাউন্ট", gatewayLive: "অনলাইন গেটওয়ে চালু", autopayLive: "বিকাশ অটো-পে চালু", amount: "পরিমাণ (৳)", motivations: "অনুপ্রেরণা", transparency: "স্বচ্ছতার বিবৃতি",
    youtubeId: "YouTube লিংক বা আইডি", heroSlides: "হিরো স্লাইড (আসল ছবি)", caption: "ক্যাপশন", kind: "ধরন (photo = আসল ছবি, design = নকশা)", facts: "মূল তথ্য", plain: "সংখ্যা ফরম্যাট ছাড়া (যেমন সাল)", factsSource: "সংখ্যার সূত্র", needsInfo: "তথ্য বাকি", fees: "ফি কাঠামো", amount: "পরিমাণ", feeNote: "ফি সংক্রান্ত নোট", eligibility: "ভর্তির যোগ্যতা", recurring: "নিয়মিত (যেমন: সাপ্তাহিক)", link: "লিংক", scholars: "একাডেমিক কমিটি", topic: "বিষয়", channel: "চ্যানেল", speaker: "বক্তা", cover: "কভার ছবি", chapters: "অধ্যায়", video: "YouTube ভিডিও", start: "শুরুর সেকেন্ড", year: "বছর" };
  function lbl(k) { return LBL[k] || k; }

  // ---------- state ----------
  var A = { key: "home", work: {}, dirty: {}, drafts: {}, published: {}, root: null, view: "edit", assetsCache: null, uid: null };
  function C() { return IBT.getContent(); }
  function cloud() { return IBT.cloud; }
  function baseFor(key) {
    if (A.drafts[key]) return IBT.clone(A.drafts[key].data);
    if (A.published[key]) return IBT.clone(A.published[key].data);
    return IBT.clone(IBT.getDefaults()[key]);
  }
  function W(key) { if (!(key in A.work)) A.work[key] = baseFor(key); return A.work[key]; }

  // ---------- paths ----------
  function getP(obj, path) { return path.reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj); }
  function setP(obj, path, v) { var o = obj; for (var i = 0; i < path.length - 1; i++) { if (o[path[i]] == null) o[path[i]] = typeof path[i + 1] === "number" ? [] : {}; o = o[path[i]]; } o[path[path.length - 1]] = v; }
  function pid(path) { return esc(JSON.stringify(path)); }

  // ---------- field renderers ----------
  function blank(sch) {
    if (!sch || typeof sch !== "object") return "";
    switch (sch.type) { case "t": case "tl": return { bn: "", en: "", ar: "" }; case "bool": return false; case "num": return 0; case "json": return {}; case "list": case "strs": case "tlist": case "imgs": case "nums": return []; case "obj": var o = {}; Object.keys(sch.fields).forEach(function (k) { o[k] = blank(sch.fields[k]); }); return o; case "kv": return {}; case "sel": return sch.opts[0]; default: return ""; }
  }
  function blankItem(item) { var o = {}; Object.keys(item).forEach(function (k) { o[k] = blank(item[k]); }); return o; }
  function field(key, sch, val, path) {
    var id = "fld_" + path.join("_");
    var head = '<label class="a-lbl" for="' + id + '">' + esc(lbl(key)) + "</label>";
    switch (sch.type) {
      case "t": case "tl":
        val = val && typeof val === "object" ? val : { bn: val || "", en: "", ar: "" };
        return '<div class="a-field a-tri">' + head + '<div class="a-tri-row">' + ["bn", "en", "ar"].map(function (l) {
          var p = path.concat([l]), attrs = ' data-p="' + pid(p) + '" lang="' + l + '" dir="' + (l === "ar" ? "rtl" : "ltr") + '"' + (l === "bn" ? ' id="' + id + '"' : "");
          return '<div class="a-lang"><span class="a-tag">' + l.toUpperCase() + "</span>" + (sch.type === "tl" ? '<textarea class="input"' + attrs + ' rows="3">' + esc(val[l] || "") + "</textarea>" : '<input class="input"' + attrs + ' value="' + esc(val[l] || "") + '">') + "</div>";
        }).join("") + "</div></div>";
      case "s": case "url": case "date":
        return '<div class="a-field">' + head + '<input class="input" id="' + id + '" type="' + (sch.type === "date" ? "date" : "text") + '" data-p="' + pid(path) + '" value="' + esc(val || "") + '" dir="ltr"></div>';
      case "yt":
        return '<div class="a-field">' + head + '<input class="input" id="' + id + '" data-yt="1" data-p="' + pid(path) + '" value="' + esc(val || "") + '" dir="ltr" placeholder="https://youtu.be/…"><small class="faint">' + (val ? '<a href="https://www.youtube.com/watch?v=' + esc(val) + '" target="_blank" rel="noopener">▶ ' + esc(val) + "</a>" : "") + "</small></div>";
      case "num":
        return '<div class="a-field">' + head + '<input class="input" id="' + id + '" type="number" data-num="1" data-p="' + pid(path) + '" value="' + esc(val == null ? "" : val) + '" dir="ltr"></div>';
      case "bool":
        return '<div class="a-field a-bool"><label><input type="checkbox" data-bool="1" data-p="' + pid(path) + '"' + (val ? " checked" : "") + "> " + esc(lbl(key)) + "</label></div>";
      case "sel":
        return '<div class="a-field">' + head + '<select class="input" id="' + id + '" data-p="' + pid(path) + '">' + sch.opts.map(function (o) { return '<option' + (o === val ? " selected" : "") + ">" + esc(o) + "</option>"; }).join("") + "</select></div>";
      case "img": case "file":
        var u = IBT.img(val || "");
        return '<div class="a-field">' + head + '<div class="a-img">' + (val && sch.type === "img" ? '<img src="' + esc(u) + '" alt="">' : '<div class="a-noimg">' + (val ? icon("doc") : "—") + "</div>") + '<div class="a-img-ctl"><input class="input" data-p="' + pid(path) + '" value="' + esc(val || "") + '" dir="ltr" placeholder="img/... বা asset:..."><div class="a-btns"><button class="btn sm" data-upload="' + pid(path) + '" data-accept="' + (sch.type === "img" ? "image/*" : "application/pdf,image/*") + '">' + icon("ext") + "আপলোড</button>" + (sch.type === "img" ? '<button class="btn sm" data-pick="' + pid(path) + '">লাইব্রেরি</button>' : "") + '<button class="btn sm ghost" data-clear="' + pid(path) + '">মুছুন</button></div></div></div></div>';
      case "obj":
        return '<fieldset class="a-obj"><legend>' + esc(lbl(key)) + "</legend>" + Object.keys(sch.fields).map(function (k) { return field(k, sch.fields[k], (val || {})[k], path.concat([k])); }).join("") + "</fieldset>";
      case "strs": case "nums":
        val = val || [];
        return '<div class="a-field">' + head + '<input class="input" id="' + id + '" data-csv="' + sch.type + '" data-p="' + pid(path) + '" value="' + esc(val.join(", ")) + '" dir="ltr"><small class="faint">কমা দিয়ে আলাদা করুন</small></div>';
      case "kv":
        val = val || {};
        return '<div class="a-field">' + head + '<textarea class="input" data-kv="1" data-p="' + pid(path) + '" dir="ltr" rows="3" placeholder="entry.123456 = {source}">' + esc(Object.keys(val).map(function (k) { return k + " = " + val[k]; }).join("\n")) + "</textarea></div>";
      case "tlist":
        val = val || [];
        return '<div class="a-field"><div class="a-lbl">' + esc(lbl(key)) + '</div><div class="a-sub">' + val.map(function (v, i) { return '<div class="a-li">' + field("#" + (i + 1), { type: "t" }, v, path.concat([i])) + listCtl(path, i) + "</div>"; }).join("") + '<button class="btn sm" data-add="' + pid(path) + '" data-kind="t">+ যোগ করুন</button></div></div>';
      case "imgs":
        val = val || [];
        return '<div class="a-field"><div class="a-lbl">' + esc(lbl(key)) + '</div><div class="a-gal">' + val.map(function (v, i) { return '<div class="a-gi"><img src="' + esc(IBT.img(v)) + '" alt="">' + listCtl(path, i) + "</div>"; }).join("") + '<button class="btn sm" data-addimg="' + pid(path) + '">+ ছবি</button></div></div>';
      case "json":
        return '<div class="a-field">' + head + '<textarea class="input a-json" id="' + id + '" data-json="1" data-p="' + pid(path) + '" dir="ltr" rows="' + Math.min(28, Math.max(6, JSON.stringify(val == null ? null : val, null, 2).split("\n").length + 1)) + '" spellcheck="false">' + esc(JSON.stringify(val == null ? null : val, null, 2)) + '</textarea><small class="faint a-json-msg">JSON ফরম্যাটে লিখুন। ভুল হলে লাল দেখাবে এবং সংরক্ষিত হবে না। লেখা সাধারণত {"bn": "…", "en": "…", "ar": "…"} আকারে থাকে।</small></div>';
      case "list":
        val = val || [];
        return '<div class="a-field"><div class="a-lbl">' + esc(lbl(key)) + ' <span class="chip muted">' + val.length + '</span></div><div class="a-sub">' + val.map(function (it, i) {
          var tt = it && sch.title ? IBT.tr(it[sch.title], "bn") || IBT.tr(it[sch.title], "en") : "";
          return '<details class="a-item"' + (A.open && A.open === JSON.stringify(path.concat([i])) ? " open" : "") + '><summary><span class="a-num">' + (i + 1) + "</span><span>" + esc(tt || it.id || "(নতুন)") + "</span>" + listCtl(path, i) + '</summary><div class="a-item-body">' + Object.keys(sch.item).map(function (k) { return field(k, sch.item[k], (it || {})[k], path.concat([i, k])); }).join("") + "</div></details>";
        }).join("") + '<button class="btn sm" data-add="' + pid(path) + '">+ নতুন আইটেম</button></div></div>';
    }
    return "";
  }
  function listCtl(path, i) { var p = pid(path); return '<span class="a-ctl"><button class="icon-btn" title="উপরে" data-mv="' + p + '" data-i="' + i + '" data-d="-1">↑</button><button class="icon-btn" title="নিচে" data-mv="' + p + '" data-i="' + i + '" data-d="1">↓</button><button class="icon-btn" title="কপি" data-dup="' + p + '" data-i="' + i + '">⧉</button><button class="icon-btn a-del" title="মুছুন" data-del="' + p + '" data-i="' + i + '">✕</button></span>'; }
  function schemaAt(key, path) {
    var sc = SCHEMA[key], node = sc.json ? { type: "json" } : sc.list ? sc.list : sc.map ? { type: "map" } : { type: "obj", fields: sc.fields };
    for (var i = 0; i < path.length; i++) {
      var k = path[i];
      if (node.type === "list") { node = typeof k === "number" ? { type: "obj", fields: node.item } : node; continue; }
      if (node.type === "obj") { node = node.fields[k]; continue; }
      if (node.type === "tlist" || node.type === "imgs") { node = { type: node.type === "tlist" ? "t" : "img" }; continue; }
      if (node.type === "map") { node = { type: "t" }; continue; }
    }
    return node;
  }

  // ---------- views ----------
  function shell() {
    var cl = cloud();
    if (!cl.db) return '<div class="wrap section"><div class="glass" style="padding:28px;max-width:720px"><h1>অ্যাডমিন প্যানেল</h1><p class="muted">ব্যাকএন্ড সংযুক্ত নেই। claude.ai-তে Owner/Editor হিসেবে খুলুন, অথবা GitHub সংস্করণে <code>assets/config.js</code>-এ Apps Script URL বসান।</p><p class="faint">No backend in this view. Open on claude.ai as owner/editor, or set the Apps Script URL in assets/config.js.</p></div></div>';
    if (!cl.canEdit && window.IBT_GH) return '<div class="wrap section"><form class="a-login glass form" id="ghLogin"><div class="a-brand"><span class="mark"></span><b>IBT CMS · লগইন</b></div><p class="muted" style="margin:0">ওয়েবসাইটের লেখা, ছবি, রেজিস্ট্রেশন, দানের তথ্য সবকিছু এখান থেকে বদলানো যায়। প্রবেশের জন্য GitHub অ্যাক্সেস টোকেন দিন।</p><div class="field"><label for="ghTok">GitHub টোকেন</label><input class="input" id="ghTok" type="password" required autocomplete="off" dir="ltr" placeholder="github_pat_…"></div><label class="chk"><input type="checkbox" id="ghKeep"> <span>এই ডিভাইসে মনে রাখো</span></label><button class="btn primary" type="submit">প্রবেশ করুন</button><div class="out"></div><details class="a-help"><summary>টোকেন কীভাবে পাবেন?</summary><ol><li>GitHub-এ লগইন করে <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">Fine-grained token</a> পেজ খুলুন।</li><li>Repository access: শুধু <b>' + esc(window.IBT_GH.owner + "/" + window.IBT_GH.repo) + '</b>।</li><li>Permissions → Repository → <b>Contents: Read and write</b>।</li><li>Generate করে টোকেনটি এখানে বসান। টোকেন শুধু আপনার ব্রাউজারে থাকে।</li></ol><p class="faint">প্রকাশ করার ১–২ মিনিট পর সাইটে পরিবর্তন দেখা যায়।</p></details></form></div>';
    if (!cl.canEdit && window.IBT_GAS) return '<div class="wrap section"><form class="glass form" id="gasLogin" style="padding:28px;max-width:440px;margin:0 auto"><div class="a-brand"><span class="mark"></span><b>IBT CMS · লগইন</b></div><div class="field"><label for="gName">আপনার নাম</label><input class="input" id="gName" required autocomplete="name"></div><div class="field"><label for="gPass">পাসওয়ার্ড</label><input class="input" id="gPass" type="password" required autocomplete="current-password"></div><button class="btn primary" type="submit">প্রবেশ করুন</button><div class="out"></div></form></div>';
    if (!cl.canEdit) return '<div class="wrap section"><div class="glass" style="padding:28px;max-width:720px"><h1>অ্যাডমিন প্যানেল</h1><p class="muted">এই অংশে প্রবেশের জন্য Editor বা Owner অনুমতি প্রয়োজন।</p></div></div>';
    return '<div class="admin"><aside class="a-side glass dense"><div class="a-brand"><span class="mark"></span><b>IBT CMS</b></div>' +
      '<input class="input a-find" id="aFind" type="search" placeholder="অংশ খুঁজুন…" aria-label="অংশ খুঁজুন">' +
      '<select class="input a-pick" id="aPick" aria-label="অংশ বাছুন"><option value="view:dash">ড্যাশবোর্ড</option>' + GROUPS.map(function (g) { return '<optgroup label="' + esc(g[1]) + '">' + Object.keys(SCHEMA).filter(function (k) { return SCHEMA[k].group === g[0]; }).map(function (k) { return '<option value="key:' + k + '">' + esc(SCHEMA[k].label) + "</option>"; }).join("") + "</optgroup>"; }).join("") + '<optgroup label="টুলস"><option value="view:inbox">ইনবক্স</option><option value="view:assets">মিডিয়া লাইব্রেরি</option><option value="view:help">সহায়িকা</option></optgroup></select>' +
      '<button class="a-nav" data-view="dash">' + icon("cube") + "ড্যাশবোর্ড</button>" +
      GROUPS.map(function (g) { return '<div class="a-group">' + esc(g[1]) + "</div>" + Object.keys(SCHEMA).filter(function (k) { return SCHEMA[k].group === g[0]; }).map(function (k) { return '<button class="a-nav" data-key="' + k + '">' + esc(SCHEMA[k].label) + '<i class="a-flag" data-flag="' + k + '"></i></button>'; }).join(""); }).join("") +
      (window.IBT_GAS || window.IBT_GH ? '<button class="a-nav" data-a="logout">' + icon("x") + "লগআউট</button>" : "") +
      '<div class="a-group">টুলস</div><button class="a-nav" data-view="inbox">' + icon("mail") + 'ইনবক্স (ফর্ম জমা)</button><button class="a-nav" data-view="assets">' + icon("doc") + 'মিডিয়া লাইব্রেরি</button><button class="a-nav" data-view="audit">' + icon("cal") + 'অডিট লগ</button><button class="a-nav" data-view="io">' + icon("copy") + 'ইমপোর্ট / এক্সপোর্ট</button><button class="a-nav" data-view="help">' + icon("dawah") + "সহায়িকা</button>" +
      '</aside><section class="a-main"><div class="a-top glass"><div><div class="a-title" id="aTitle"></div><div class="faint" id="aStatus"></div></div><div class="a-actions" id="aActions"></div></div><div id="aBody"></div></section></div><div class="a-modal" id="aModal"></div><input type="file" id="aFile" hidden>';
  }
  function setView(v, key) {
    A.view = v; if (key) A.key = key;
    var pk = $("#aPick", A.root); if (pk) pk.value = v === "edit" ? "key:" + A.key : "view:" + v;
    $$(".a-nav", A.root).forEach(function (b) { b.classList.toggle("on", (v === "edit" && b.dataset.key === A.key) || b.dataset.view === v); });
    if (v === "edit") renderEditor(); else if (v === "inbox") renderInbox(); else if (v === "assets") renderAssets(); else if (v === "audit") renderAudit(); else if (v === "io") renderIO(); else if (v === "help") renderHelp(); else renderDash();
    flags();
  }
  function flags() { Object.keys(SCHEMA).forEach(function (k) { var f = $('[data-flag="' + k + '"]', A.root); if (!f) return; f.className = "a-flag" + (A.dirty[k] ? " dirty" : A.drafts[k] ? " draft" : A.published[k] ? " pub" : ""); f.title = A.dirty[k] ? "অসংরক্ষিত পরিবর্তন" : A.drafts[k] ? "ড্রাফট আছে" : A.published[k] ? "প্রকাশিত" : "ডিফল্ট"; }); }
  function when(o) { return o && o.at ? new Date(o.at).toLocaleString("bn-BD") : "—"; }
  function renderEditor() {
    var key = A.key, sc = SCHEMA[key], w = W(key);
    $("#aTitle").textContent = sc.label;
    $("#aStatus").innerHTML = "প্রকাশিত: " + when(A.published[key]) + " · ড্রাফট: " + when(A.drafts[key]) + (A.dirty[key] ? ' · <b style="color:var(--warn)">অসংরক্ষিত পরিবর্তন</b>' : "");
    $("#aActions").innerHTML = '<button class="btn sm" data-a="save">ড্রাফট সেভ</button><button class="btn sm" data-a="preview">' + (IBT.state.preview ? "প্রিভিউ বন্ধ" : "প্রিভিউ") + '</button><button class="btn sm primary" data-a="publish">প্রকাশ করুন</button><button class="btn sm ghost" data-a="discard" title="ড্রাফট বাতিল">বাতিল</button><button class="btn sm ghost" data-a="reset" title="মূল কনটেন্টে ফেরত">রিসেট</button>';
    var body;
    if (sc.map) {
      var q = A.uiFilter || "";
      body = '<div class="a-field"><input class="input" id="uiFilter" placeholder="খুঁজুন…" value="' + esc(q) + '"></div>' + Object.keys(w).filter(function (k) { return !q || (k + JSON.stringify(w[k])).toLowerCase().indexOf(q.toLowerCase()) > -1; }).map(function (k) { return field(k, { type: "t" }, w[k], [k]); }).join("");
    } else if (sc.json) body = '<p class="muted" style="margin:0 0 10px">' + esc(sc.help || "এই অংশটি উন্নত সম্পাদনা (JSON) দিয়ে বদলানো যায়।") + "</p>" + field(sc.label, { type: "json" }, w, []);
    else if (sc.list) body = field("__items", sc.list, w, []);
    else body = Object.keys(sc.fields).map(function (k) { return field(k, sc.fields[k], w[k], [k]); }).join("");
    $("#aBody").innerHTML = '<div class="a-form glass">' + body + "</div>";
  }
  function renderDash() {
    var c = C();
    $("#aTitle").textContent = "ড্যাশবোর্ড"; $("#aStatus").textContent = "সাইটের বর্তমান অবস্থা"; $("#aActions").innerHTML = '<a class="btn sm" href="#home">সাইট দেখুন</a>';
    var regsOpen = (c.registrations || []).filter(function (r) { return IBT.regStatus(r) === "open"; });
    var pending = Object.keys(SCHEMA).filter(function (k) { return A.drafts[k]; });
    var rev = []; Object.keys(SCHEMA).forEach(function (k) { var v = c[k]; (Array.isArray(v) ? v : [v]).forEach(function (o) { if (o && o.review) rev.push(SCHEMA[k].label + ": " + (IBT.tr(o.name || o.title, "bn") || "")); }); });
    $("#aBody").innerHTML = '<div class="grid g4">' + [["চলমান রেজিস্ট্রেশন", regsOpen.length], ["ড্রাফট (প্রকাশের অপেক্ষায়)", pending.length], ["অনুমোদন বাকি", rev.length], ["ভিডিও", (c.videos || []).length]].map(function (x) { return '<div class="glass" style="padding:18px"><div class="faint">' + x[0] + '</div><div style="font-size:2rem;font-weight:800">' + IBT.num(x[1]) + "</div></div>"; }).join("") + "</div>" +
      '<div class="grid g2" style="margin-top:16px"><div class="glass" style="padding:18px"><h3>অনুমোদনের অপেক্ষায় (review)</h3><ul class="check">' + (rev.length ? rev.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") : "<li>—</li>") + '</ul></div><div class="glass" style="padding:18px"><h3>ড্রাফট</h3><ul class="check">' + (pending.length ? pending.map(function (k) { return '<li><a href="#admin" data-key="' + k + '">' + esc(SCHEMA[k].label) + "</a> · " + when(A.drafts[k]) + "</li>"; }).join("") : "<li>—</li>") + "</ul></div></div>" +
      '<div class="glass" style="padding:18px;margin-top:16px"><h3>দ্রুত কাজ</h3><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" data-key="registrations">+ নতুন রেজিস্ট্রেশন</button><button class="btn sm" data-key="news">+ সংবাদ</button><button class="btn sm" data-key="videos">+ ভিডিও</button><button class="btn sm" data-key="floors">নির্মাণ অগ্রগতি হালনাগাদ</button><button class="btn sm" data-view="inbox">ইনবক্স দেখুন</button></div></div>';
  }
  function renderHelp() {
    $("#aTitle").textContent = "সহায়িকা"; $("#aStatus").textContent = "কীভাবে ব্যবহার করবেন"; $("#aActions").innerHTML = "";
    $("#aBody").innerHTML = '<div class="glass prose" style="padding:24px"><ol style="display:grid;gap:10px;color:var(--text-2)"><li>বাম পাশ থেকে একটি অংশ বেছে নিন (যেমন <b>রেজিস্ট্রেশন</b>)। প্রতিটি লেখা তিন ভাষায় (BN / EN / AR) আলাদা ঘরে লিখুন।</li><li>ছবি বদলাতে <b>আপলোড</b> চাপুন অথবা <b>লাইব্রেরি</b> থেকে বেছে নিন। আপলোড করা ছবি সাইটে সাথে সাথে ব্যবহারযোগ্য।</li><li><b>ড্রাফট সেভ</b> করলে শুধু এডিটররা দেখবেন। <b>প্রিভিউ</b> চালু করে সাইটে ঘুরে দেখুন।</li><li>অনুমোদনের পর <b>প্রকাশ করুন</b> চাপুন। প্রতিটি প্রকাশ অডিট লগে লিপিবদ্ধ হয়।</li><li>নতুন রেজিস্ট্রেশন: আইডি, শুরু-শেষ তারিখ, Google Form লিংক দিন। শর্ট লিংক ও QR কোড স্বয়ংক্রিয়ভাবে তৈরি হবে।</li><li>নির্মাণ অগ্রগতি: <b>নির্মাণ অগ্রগতি (3D)</b> থেকে প্রতিটি তলার অবস্থা done / progress / planned করুন। 3D মডেল নিজে থেকে হালনাগাদ হবে।</li><li>ভিডিও যোগ করতে YouTube লিংক পেস্ট করুন; আইডি নিজে থেকে বের হবে।</li><li>“অনুমোদন বাকি” টিক থাকলে এডিটররা সাইটে সতর্কতা দেখবেন; অনুমোদনের পর টিক তুলে দিন।</li></ol><p class="faint">কুরআনের আয়াত বা হাদীসের মূল আরবি টেক্সট শুধুমাত্র যাচাইকৃত উৎস থেকে কপি করে বসাবেন এবং রেফারেন্স নম্বর মিলিয়ে নেবেন।</p></div>';
  }

  // inbox
  function renderInbox() {
    if (window.IBT_GH) { $("#aTitle").textContent = "ইনবক্স"; $("#aStatus").textContent = "ফর্ম জমা"; $("#aActions").innerHTML = ""; $("#aBody").innerHTML = '<div class="glass prose" style="padding:22px"><p>এই সংস্করণে ওয়েবসাইটের ফরম (যোগাযোগ, রেজিস্ট্রেশন, দান রিপোর্ট, ইসলামিক প্রশ্ন) পূরণ করলে তথ্যসহ ইমেইল তৈরি হয়ে <b>' + esc(((C().settings || {}).contact || {}).email || "") + '</b> ঠিকানায় যায়। Google Form-ভিত্তিক রেজিস্ট্রেশনের উত্তর সংশ্লিষ্ট Google Form-এর Responses অংশে দেখুন।</p><p class="faint">Apps Script সংযুক্ত করলে সব ফরম জমা এখানেই এক জায়গায় দেখা যাবে।</p></div>'; return; }
    $("#aTitle").textContent = "ইনবক্স"; $("#aStatus").textContent = "যোগাযোগ, রেজিস্ট্রেশন ও দান রিপোর্ট"; $("#aActions").innerHTML = '<button class="btn sm" data-a="csv">CSV কপি</button><button class="btn sm" data-a="reload-inbox">রিফ্রেশ</button>';
    $("#aBody").innerHTML = '<div class="glass" style="padding:18px">লোড হচ্ছে…</div>';
    var db = cloud().db;
    Promise.all([db.collection("submissions").get(), db.doc("inboxstate/main").get()]).then(function (r) {
      var items = []; r[0].docs.forEach(function (d) { ((d.data() || {}).items || []).forEach(function (it) { items.push(it); }); });
      var handled = (r[1].exists && r[1].data().handled) || {};
      items.sort(function (a, b) { return (b.at || "").localeCompare(a.at || ""); }); A.inbox = items; A.handled = handled;
      var kinds = ["all", "contact", "registration", "donation"]; var f = A.inboxKind || "all";
      $("#aBody").innerHTML = '<div class="tabs">' + kinds.map(function (k) { return '<button data-ikind="' + k + '" aria-pressed="' + (k === f) + '">' + { all: "সব", contact: "যোগাযোগ", registration: "রেজিস্ট্রেশন", donation: "দান রিপোর্ট" }[k] + "</button>"; }).join("") + '</div><div class="grid">' + (items.filter(function (i) { return f === "all" || i.kind === f; }).map(function (i) {
        var d = i.data || {};
        return '<div class="glass" style="padding:14px 16px;display:grid;grid-template-columns:1fr auto;gap:10px;opacity:' + (handled[i.id] ? 0.55 : 1) + '"><div><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><span class="chip">' + esc(i.kind) + "</span>" + (i.ref ? '<span class="chip muted">' + esc(i.ref) + "</span>" : "") + '<span class="faint">' + new Date(i.at).toLocaleString("bn-BD") + '</span></div><div style="margin-top:6px">' + Object.keys(d).map(function (k) { return '<span class="faint">' + esc(k) + ":</span> " + esc(d[k]); }).join(" · ") + '</div></div><button class="btn sm" data-handle="' + esc(i.id) + '">' + (handled[i.id] ? "আবার খুলুন" : "সম্পন্ন") + "</button></div>";
      }).join("") || '<div class="empty glass">কোনো জমা নেই</div>') + "</div>";
    }, function () { $("#aBody").innerHTML = '<div class="notice err">ইনবক্স লোড করা যায়নি।</div>'; });
  }
  function toggleHandled(id) {
    A.handled[id] = !A.handled[id]; if (!A.handled[id]) delete A.handled[id];
    cloud().db.doc("inboxstate/main").set({ handled: A.handled }).then(renderInbox, function () { IBT.toast("সেভ হয়নি"); });
  }
  function csv() {
    var rows = [["at", "kind", "ref", "name", "phone", "email", "amount", "channel", "txn", "fund", "date", "message"]];
    (A.inbox || []).forEach(function (i) { var d = i.data || {}; rows.push([i.at, i.kind, i.ref, d.name, d.phone, d.email, d.amount, d.channel, d.txn, d.fund, d.date, d.message]); });
    var text = rows.map(function (r) { return r.map(function (c) { c = c == null ? "" : String(c); return /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; }).join(","); }).join("\n");
    modal('<h3>CSV</h3><p class="faint">কপি করে Google Sheets-এ পেস্ট করুন।</p><textarea class="input" rows="12" dir="ltr" readonly>' + esc(text) + '</textarea><div style="display:flex;gap:8px;margin-top:10px"><button class="btn primary sm" data-copytext>কপি</button><button class="btn sm" data-close>বন্ধ</button></div>');
  }

  // assets
  function loadAssets() {
    var as = cloud().assets; if (!as) return Promise.resolve({ assets: [] });
    return as.list().then(function (r) { A.assetsCache = r; return r; });
  }
  function renderAssets() {
    $("#aTitle").textContent = "মিডিয়া লাইব্রেরি"; $("#aStatus").textContent = "ছবি, PDF ও অন্যান্য ফাইল"; $("#aActions").innerHTML = '<button class="btn sm primary" data-upload-lib>' + icon("ext") + "আপলোড</button>";
    $("#aBody").innerHTML = '<div class="glass" style="padding:18px">লোড হচ্ছে…</div>';
    loadAssets().then(function (r) {
      var list = r.assets || [];
      $("#aBody").innerHTML = (r.usage ? '<p class="faint">ব্যবহৃত: ' + Math.round((r.usage.bytes || r.usage.usedBytes || 0) / 1048576) + " MB</p>" : "") + '<h3>আপলোড করা ফাইল</h3><div class="a-lib">' + (list.length ? list.map(function (a) { var isImg = /^image\//.test(a.contentType || ""); return '<div class="a-li2 glass">' + (isImg ? '<img src="' + esc(a.url || "/_blob/" + a.id) + '" alt="">' : '<div class="a-noimg">' + icon("doc") + "</div>") + '<div class="faint ltr" style="font-size:.75rem;word-break:break-all">asset:' + esc(a.id) + '</div><div class="a-btns"><button class="btn sm" data-copy="asset:' + esc(a.id) + '">কপি</button><button class="btn sm ghost a-del" data-delasset="' + esc(a.id) + '">মুছুন</button></div></div>'; }).join("") : '<div class="empty">এখনো কিছু আপলোড হয়নি</div>') + '</div><h3 style="margin-top:20px">বিল্ট-ইন ছবি (IBT ক্যাটালগ থেকে)</h3><div class="a-lib">' + BUNDLED.map(function (b) { return '<div class="a-li2 glass"><img src="' + esc(b) + '" alt=""><div class="faint ltr" style="font-size:.75rem">' + esc(b) + "</div></div>"; }).join("") + "</div>";
    }, function () { $("#aBody").innerHTML = '<div class="notice err">লাইব্রেরি লোড করা যায়নি।</div>'; });
  }
  function upload(file) {
    var as = cloud().assets; if (!as) { IBT.toast("আপলোড এই ভিউতে উপলব্ধ নয়"); return Promise.reject(); }
    if (file.size > 20 * 1048576) { IBT.toast("২০ MB-এর বেশি ফাইল আপলোড করা যাবে না"); return Promise.reject(); }
    IBT.toast("আপলোড হচ্ছে…");
    return prepImage(file).then(function (blob) { return as.upload(blob); }).then(function (r) { A.assetsCache = null; IBT.toast("আপলোড সম্পন্ন"); return r; }, function (e) { IBT.toast("আপলোড ব্যর্থ"); throw e; });
  }
  function prepImage(file) {
    // Downscale large photos to max 2000px & strip EXIF (privacy) by re-encoding
    if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 400 * 1024) return Promise.resolve(file);
    return new Promise(function (res) {
      var im = new Image(), u = URL.createObjectURL(file);
      im.onload = function () { var m = 2000, w = im.naturalWidth, h = im.naturalHeight, k = Math.min(1, m / Math.max(w, h)); var c = document.createElement("canvas"); c.width = Math.round(w * k); c.height = Math.round(h * k); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); c.toBlob(function (b) { URL.revokeObjectURL(u); res(b && b.size < file.size ? new File([b], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }) : file); }, "image/jpeg", 0.84); };
      im.onerror = function () { res(file); }; im.src = u;
    });
  }
  function pickImage(cb) {
    loadAssets().then(function (r) {
      var list = (r.assets || []).filter(function (a) { return /^image\//.test(a.contentType || ""); });
      modal('<h3>ছবি বেছে নিন</h3><div class="a-lib" style="max-height:60vh;overflow:auto">' + list.map(function (a) { return '<button class="a-li2 glass" data-choose="asset:' + esc(a.id) + '"><img src="' + esc(a.url || "/_blob/" + a.id) + '" alt=""></button>'; }).join("") + BUNDLED.map(function (b) { return '<button class="a-li2 glass" data-choose="' + esc(b) + '"><img src="' + esc(b) + '" alt=""></button>'; }).join("") + '</div><div style="margin-top:10px"><button class="btn sm" data-close>বন্ধ</button></div>');
      A.chooseCb = cb;
    });
  }

  // audit
  function audit(action, key) {
    var db = cloud().db, day = new Date().toISOString().slice(0, 10), ref = db.doc("audit/" + day);
    return ref.get().then(function (s) { var b = s.exists ? IBT.clone(s.data()) : { entries: [] }; b.entries = (b.entries || []).concat([{ at: new Date().toISOString(), by: A.uid || "editor", action: action, key: key }]).slice(-500); return ref.set(b); }).catch(function () { });
  }
  function renderAudit() {
    $("#aTitle").textContent = "অডিট লগ"; $("#aStatus").textContent = "কে কখন কী প্রকাশ/পরিবর্তন করেছেন"; $("#aActions").innerHTML = "";
    var db = cloud().db;
    db.collection("audit").get().then(function (snap) {
      var all = []; snap.docs.forEach(function (d) { ((d.data() || {}).entries || []).forEach(function (e) { all.push(e); }); });
      all.sort(function (a, b) { return b.at.localeCompare(a.at); });
      var ids = all.map(function (e) { return e.by; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; });
      var u = cloud().user;
      (u && u.profiles ? u.profiles(ids).catch(function () { return {}; }) : Promise.resolve({})).then(function (ps) {
        $("#aBody").innerHTML = '<div class="glass" style="padding:8px 18px">' + (all.length ? all.slice(0, 200).map(function (e) { return '<div class="support-row"><span>' + esc({ publish: "প্রকাশ", draft: "ড্রাফট", discard: "ড্রাফট বাতিল", reset: "রিসেট", import: "ইমপোর্ট" }[e.action] || e.action) + " · <b>" + esc((SCHEMA[e.key] || {}).label || e.key) + '</b></span><span class="faint">' + esc((ps[e.by] && ps[e.by].name) || "Editor") + " · " + new Date(e.at).toLocaleString("bn-BD") + "</span></div>"; }).join("") : '<div class="empty">কোনো এন্ট্রি নেই</div>') + "</div>";
      });
    }, function () { $("#aBody").innerHTML = '<div class="notice err">লোড করা যায়নি।</div>'; });
  }

  // import/export
  function renderIO() {
    $("#aTitle").textContent = "ইমপোর্ট / এক্সপোর্ট"; $("#aStatus").textContent = "সম্পূর্ণ কনটেন্ট JSON (Phase 2 কোডবেসে স্থানান্তরের জন্য)"; $("#aActions").innerHTML = "";
    var json = JSON.stringify(C(), null, 1);
    $("#aBody").innerHTML = '<div class="glass" style="padding:18px"><h3>এক্সপোর্ট</h3><textarea class="input" rows="10" dir="ltr" readonly id="ioOut">' + esc(json) + '</textarea><button class="btn sm" style="margin-top:8px" data-copy-io>কপি</button></div><div class="glass" style="padding:18px;margin-top:16px"><h3>ইমপোর্ট (ড্রাফট হিসেবে)</h3><p class="faint">JSON পেস্ট করুন; প্রতিটি অংশ ড্রাফট হিসেবে সেভ হবে, এরপর যাচাই করে প্রকাশ করুন।</p><textarea class="input" rows="8" dir="ltr" id="ioIn"></textarea><button class="btn sm primary" style="margin-top:8px" data-a="import">ড্রাফট হিসেবে ইমপোর্ট</button></div>';
  }

  // ---------- actions ----------
  function saveDraft(key) {
    var db = cloud().db; return db.doc("drafts/" + key).set({ data: W(key), at: new Date().toISOString(), by: A.uid || "" }).then(function () { A.drafts[key] = { data: IBT.clone(W(key)), at: new Date().toISOString() }; A.dirty[key] = false; audit("draft", key); if (IBT.state.preview) applyPreview(); });
  }
  function publish(key) {
    var db = cloud().db, body = { data: W(key), at: new Date().toISOString(), by: A.uid || "" };
    return db.doc("cms/" + key).set(body).then(function () { A.published[key] = body; A.dirty[key] = false; return db.doc("drafts/" + key).delete(); }).then(function () { delete A.drafts[key]; audit("publish", key); });
  }
  function applyPreview() { IBT.state.drafts = A.drafts; IBT.applyCloud(); }
  function act(a) {
    var key = A.key;
    if (a === "save") return saveDraft(key).then(function () { IBT.toast("ড্রাফট সেভ হয়েছে"); renderEditor(); flags(); }, err);
    if (a === "publish") return confirmBox("“" + SCHEMA[key].label + "” প্রকাশ করবেন? সবাই পরিবর্তন দেখতে পাবে।", function () { publish(key).then(function () { IBT.toast("প্রকাশিত হয়েছে"); IBT.published[key] = A.published[key]; IBT.applyCloud(); renderEditor(); flags(); }, err); });
    if (a === "discard") return confirmBox("ড্রাফট বাতিল করবেন?", function () { cloud().db.doc("drafts/" + key).delete().then(function () { delete A.drafts[key]; delete A.work[key]; A.dirty[key] = false; audit("discard", key); renderEditor(); flags(); }, err); });
    if (a === "reset") return confirmBox("মূল (ক্যাটালগ-ভিত্তিক) কনটেন্টে ফিরে যাবেন? এটি ড্রাফট হিসেবে লোড হবে।", function () { A.work[key] = IBT.clone(IBT.getDefaults()[key]); A.dirty[key] = true; renderEditor(); flags(); });
    if (a === "preview") { IBT.state.preview = !IBT.state.preview; applyPreview(); IBT.toast(IBT.state.preview ? "প্রিভিউ চালু: সাইটে ড্রাফট দেখা যাচ্ছে (শুধু আপনার জন্য)" : "প্রিভিউ বন্ধ"); return; }
    if (a === "logout") { (window.IBT_GAS || window.IBT_GH).logout(); IBT.refreshAuth().then(function () { window.IBTAdmin.render(A.root); }); return; }
    if (a === "csv") return csv();
    if (a === "reload-inbox") return renderInbox();
    if (a === "import") {
      var data; try { data = JSON.parse($("#ioIn").value); } catch (e) { IBT.toast("JSON সঠিক নয়"); return; }
      var keys = Object.keys(SCHEMA).filter(function (k) { return data[k] !== undefined; });
      return keys.reduce(function (p, k) { return p.then(function () { A.work[k] = data[k]; return saveDraft(k); }); }, Promise.resolve()).then(function () { audit("import", "all"); IBT.toast(keys.length + "টি অংশ ড্রাফট হিসেবে ইমপোর্ট হয়েছে"); flags(); }, err);
    }
  }
  function err(e) { IBT.toast("ব্যর্থ: " + ((e && (e.code || e.message)) || "অজানা ত্রুটি")); }
  function modal(html) { var m = $("#aModal"); m.innerHTML = '<div class="a-modal-in glass dense">' + html + "</div>"; m.classList.add("open"); }
  function closeModal() { $("#aModal").classList.remove("open"); $("#aModal").innerHTML = ""; }
  function confirmBox(msg, ok) { modal("<p>" + esc(msg) + '</p><div style="display:flex;gap:8px"><button class="btn primary sm" data-ok>হ্যাঁ</button><button class="btn sm" data-close>না</button></div>'); A.okCb = ok; }

  function markDirty() { A.dirty[A.key] = true; var st = $("#aStatus"); if (st && !/অসংরক্ষিত/.test(st.innerHTML)) st.innerHTML += ' · <b style="color:var(--warn)">অসংরক্ষিত পরিবর্তন</b>'; flags(); }
  function ytId(v) { var m = String(v).match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/); return m ? m[1] : String(v).trim(); }
  function onInput(e) {
    var el = e.target; if (el.id === "uiFilter") { A.uiFilter = el.value; clearTimeout(A._uf); A._uf = setTimeout(function () { renderEditor(); var f = $("#uiFilter"); f.focus(); f.setSelectionRange(f.value.length, f.value.length); }, 250); return; }
    if (!el.dataset.p) return;
    var path = JSON.parse(el.dataset.p), v;
    if (el.dataset.bool) v = el.checked;
    else if (el.dataset.num) v = el.value === "" ? 0 : +el.value;
    else if (el.dataset.csv) v = el.value.split(",").map(function (x) { return x.trim(); }).filter(Boolean).map(function (x) { return el.dataset.csv === "nums" ? +x || 0 : x; });
    else if (el.dataset.kv) { v = {}; el.value.split("\n").forEach(function (ln) { var i = ln.indexOf("="); if (i > 0) v[ln.slice(0, i).trim()] = ln.slice(i + 1).trim(); }); }
    else if (el.dataset.json) {
      try { v = JSON.parse(el.value); el.classList.remove("bad"); var mg = el.parentNode.querySelector(".a-json-msg"); if (mg) mg.textContent = "ঠিক আছে"; }
      catch (er) { el.classList.add("bad"); var mg2 = el.parentNode.querySelector(".a-json-msg"); if (mg2) mg2.textContent = "JSON ভুল: " + er.message; return; }
      if (!path.length) { A.work[A.key] = v; markDirty(); return; }
    }
    else if (el.dataset.yt) v = ytId(el.value);
    else v = el.value;
    setP(W(A.key), path, v); markDirty();
    if (el.closest(".a-img")) { var im = el.closest(".a-img").querySelector("img"); if (im) im.src = IBT.img(v); }
  }
  function onClick(e) {
    var t = e.target, b;
    if ((b = t.closest("[data-key]")) && A.root.contains(b)) { e.preventDefault(); setView("edit", b.dataset.key); return; }
    if ((b = t.closest("[data-view]"))) { setView(b.dataset.view); return; }
    if ((b = t.closest("[data-a]"))) { act(b.dataset.a); return; }
    if (t.closest("[data-close]") || t === $("#aModal")) { closeModal(); return; }
    if (t.closest("[data-ok]")) { closeModal(); A.okCb && A.okCb(); return; }
    if ((b = t.closest("[data-choose]"))) { closeModal(); A.chooseCb && A.chooseCb(b.dataset.choose); return; }
    if (t.closest("[data-copytext]")) { var ta = $("#aModal textarea"); ta.select(); try { navigator.clipboard.writeText(ta.value).then(function () { IBT.toast("কপি হয়েছে"); }); } catch (x) { } return; }
    if (t.closest("[data-copy-io]")) { var o = $("#ioOut"); o.select(); try { navigator.clipboard.writeText(o.value).then(function () { IBT.toast("কপি হয়েছে"); }); } catch (x) { } return; }
    if ((b = t.closest("[data-handle]"))) { toggleHandled(b.dataset.handle); return; }
    if ((b = t.closest("[data-ikind]"))) { A.inboxKind = b.dataset.ikind; renderInbox(); return; }
    if (t.closest("[data-upload-lib]")) { fileDialog("image/*,application/pdf,video/*", function (f) { upload(f).then(renderAssets, function () { }); }); return; }
    if ((b = t.closest("[data-delasset]"))) { var id = b.dataset.delasset; confirmBox("ফাইলটি স্থায়ীভাবে মুছবেন? যেখানে ব্যবহার হয়েছে সেখানে ছবি দেখাবে না।", function () { cloud().assets.delete(id).then(renderAssets, err); }); return; }
    var path;
    if ((b = t.closest("[data-upload]"))) { e.preventDefault(); path = JSON.parse(b.dataset.upload); fileDialog(b.dataset.accept, function (f) { upload(f).then(function (r) { setP(W(A.key), path, "asset:" + r.id); markDirty(); renderEditor(); }, function () { }); }); return; }
    if ((b = t.closest("[data-pick]"))) { e.preventDefault(); path = JSON.parse(b.dataset.pick); pickImage(function (v) { setP(W(A.key), path, v); markDirty(); renderEditor(); }); return; }
    if ((b = t.closest("[data-clear]"))) { e.preventDefault(); setP(W(A.key), JSON.parse(b.dataset.clear), ""); markDirty(); renderEditor(); return; }
    if ((b = t.closest("[data-addimg]"))) { e.preventDefault(); path = JSON.parse(b.dataset.addimg); pickImage(function (v) { var arr = getP(W(A.key), path) || []; arr.push(v); setP(W(A.key), path, arr); markDirty(); renderEditor(); }); return; }
    if ((b = t.closest("[data-add]"))) {
      e.preventDefault(); path = JSON.parse(b.dataset.add); var w = W(A.key); var arr = path.length ? getP(w, path) : w; if (!Array.isArray(arr)) { arr = []; if (path.length) setP(w, path, arr); }
      var sch = path.length ? schemaAt(A.key, path) : SCHEMA[A.key].list;
      arr.push(b.dataset.kind === "t" ? { bn: "", en: "", ar: "" } : blankItem(sch.item)); A.open = JSON.stringify(path.concat([arr.length - 1])); markDirty(); renderEditor(); return;
    }
    if ((b = t.closest("[data-mv],[data-dup],[data-del]"))) {
      e.preventDefault(); e.stopPropagation();
      path = JSON.parse(b.dataset.mv || b.dataset.dup || b.dataset.del); var i = +b.dataset.i; var w2 = W(A.key); var a2 = path.length ? getP(w2, path) : w2;
      if (b.dataset.mv) { var j = i + (+b.dataset.d); if (j < 0 || j >= a2.length) return; var x = a2[i]; a2[i] = a2[j]; a2[j] = x; }
      else if (b.dataset.dup) { var cp = IBT.clone(a2[i]); if (cp && cp.id) cp.id += "-copy"; a2.splice(i + 1, 0, cp); }
      else { confirmBox("এই আইটেমটি মুছবেন?", function () { a2.splice(i, 1); markDirty(); renderEditor(); }); return; }
      markDirty(); renderEditor(); return;
    }
  }
  function fileDialog(accept, cb) { var f = $("#aFile"); f.accept = accept || "*/*"; f.value = ""; f.onchange = function () { if (f.files[0]) cb(f.files[0]); }; f.click(); }

  // ---------- load ----------
  function loadAll() {
    var db = cloud().db;
    return Promise.all([db.collection("cms").get(), db.collection("drafts").get()]).then(function (r) {
      A.published = {}; r[0].docs.forEach(function (d) { if (d.exists) A.published[d.id] = d.data(); });
      A.drafts = {}; r[1].docs.forEach(function (d) { if (d.exists) A.drafts[d.id] = d.data(); });
      A.work = {}; A.dirty = {};
    });
  }
  window.IBTAdmin = {
    render: function (root) { ensureSchema();
      if (!root) return; A.root = root; root.innerHTML = shell();
      var gl = $("#ghLogin", root);
      if (gl) gl.addEventListener("submit", function (e) { e.preventDefault(); var out = $(".out", gl); out.innerHTML = '<div class="notice info">যাচাই হচ্ছে…</div>'; window.IBT_GH.login($("#ghTok").value, $("#ghKeep").checked).then(function () { return IBT.refreshAuth(); }).then(function () { window.IBTAdmin.render(root); }, function (er) { out.innerHTML = '<div class="notice err">' + (er && er.message === "no-write" ? "এই টোকেনে রিপোজিটরিতে লেখার অনুমতি নেই (Contents: Read and write দিন)।" : "টোকেন সঠিক নয় বা মেয়াদ শেষ।") + "</div>"; }); });
      var lf = $("#gasLogin", root);
      if (lf) lf.addEventListener("submit", function (e) { e.preventDefault(); var out = $(".out", lf); out.innerHTML = '<div class="notice info">যাচাই হচ্ছে…</div>'; window.IBT_GAS.login($("#gName").value, $("#gPass").value).then(function () { return IBT.refreshAuth(); }).then(function () { window.IBTAdmin.render(root); }, function (er) { out.innerHTML = '<div class="notice err">' + (er.code === "wrong_password" ? "পাসওয়ার্ড সঠিক নয়" : "লগইন ব্যর্থ: " + esc(er.message)) + "</div>"; }); });
      if (!cloud().db || !cloud().canEdit) return;
      Promise.resolve(cloud().user && cloud().user.id ? cloud().user.id() : null).then(function (id) { A.uid = id; });
      var fd = $("#aFind", root); if (fd) fd.addEventListener("input", function () { var q = fd.value.trim().toLowerCase(); $$(".a-side .a-nav[data-key]", root).forEach(function (b) { b.style.display = !q || (b.textContent + b.dataset.key).toLowerCase().indexOf(q) > -1 ? "" : "none"; }); });
      var pk = $("#aPick", root); if (pk) pk.addEventListener("change", function () { var v = pk.value.split(":"); if (v[0] === "key") setView("edit", v[1]); else setView(v[1]); window.scrollTo(0, 0); });
      if (!A.bound) { document.addEventListener("input", function (e) { if (A.root && A.root.contains(e.target)) onInput(e); }); document.addEventListener("change", function (e) { if (A.root && A.root.contains(e.target) && (e.target.type === "checkbox" || e.target.tagName === "SELECT")) onInput(e); }); document.addEventListener("click", function (e) { if (A.root && document.body.contains(A.root) && (A.root.contains(e.target) || e.target.closest("#aModal"))) onClick(e); }); A.bound = true; }
      $("#aBody", root).innerHTML = '<div class="glass" style="padding:18px">লোড হচ্ছে…</div>';
      loadAll().then(function () { setView("dash"); }, function () { $("#aBody", root).innerHTML = '<div class="notice err">ডাটাবেস লোড করা যায়নি।</div>'; });
    },
    onPublished: function (docs) { A.published = docs; if (A.root && document.body.contains(A.root)) flags(); }
  };
  window.addEventListener("beforeunload", function (e) { if (Object.keys(A.dirty).some(function (k) { return A.dirty[k]; })) { e.preventDefault(); e.returnValue = ""; } });
})();
