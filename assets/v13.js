/* IBT v13: Qur'an verses and hadith (verified text from data), picture-led journey page, clearer projects
   section, catalogues that open, Google Form for questions, office map, slow cross-fading photos,
   uncropped building renders. */
(function () {
  "use strict";
  var IBT = window.IBT, h = IBT.H, P = IBT.P;
  var $ = h.$, $$ = h.$$, esc = h.esc, tr = h.tr, T = h.T, U = h.U, icon = h.icon, C = h.C;
  function L(o) { return tr(o); }
  function sec(inner, cls, id) { return '<section class="section tight' + (cls ? " " + cls : "") + '"' + (id ? ' id="' + id + '"' : "") + '><div class="wrap">' + inner + "</div></section>"; }
  function im(src) { return esc(h.img(src)); }
  var ext = ' target="_blank" rel="noopener"';
  function lang() { return (h.state && h.state.lang) || document.documentElement.lang || "bn"; }

  /* ---------- Qur'an and hadith ---------- */
  function vfig(id) {
    var v = (C().verses || {})[id]; if (!v) return "";
    var q = v.type === "quran", trn = lang() === "ar" ? "" : T(v.tr);
    return '<figure class="vq-c ' + (q ? "is-q" : "is-h") + '"><span class="vq-k">' + icon(q ? "quran" : "book") + (q ? L({ bn: "আল-কুরআন", en: "The Qur'an", ar: "القرآن الكريم" }) : L({ bn: "হাদীস", en: "Hadith", ar: "الحديث الشريف" })) + "</span>" +
      '<p class="vq-ar" lang="ar" dir="rtl">' + (q ? "﴿" : "«") + esc(v.ar) + (v.part ? " …" : "") + (q ? "﴾" : "»") + "</p>" +
      "<figcaption>" + (trn ? '<p class="vq-tr">' + (q ? "" : L({ bn: "রাসূলুল্লাহ ﷺ বলেছেন: ", en: "The Prophet ﷺ said: ", ar: "" })) + "“" + esc(trn) + "”</p>" : "") + "<cite>" + T(v.ref) + (v.part ? L({ bn: " (অংশ)", en: " (excerpt)", ar: " (جزء)" }) : "") + "</cite></figcaption></figure>";
  }
  function verses(ids) {
    ids = ids.filter(function (id) { return (C().verses || {})[id]; }); if (!ids.length) return "";
    return '<section class="section tight vq-sec"><div class="wrap"><div class="vq' + (ids.length > 1 ? " two" : "") + ' rv">' + ids.map(vfig).join('<span class="vq-div" aria-hidden="true"></span>') + "</div></div></section>";
  }
  IBT.verses = verses;
  var VPLACE = {
    home: [["q_khair"], "#main .intro-sec", "afterend"],
    about: [["q_khair", "h_convey"], "#main .ab-nums-s", "afterend"],
    "activity-education": [["q_knowledge", "h_ilm"], "#main .ph-hero", "afterend"],
    "activity-dawah": [["q_dawah", "h_convey"], "#main .ph-hero", "afterend"],
    "activity-research": [["q_ilm", "h_fiqh"], "#main .ph-hero", "afterend"],
    "activity-welfare": [["q_feed", "h_body"], "#main .ph-hero", "afterend"],
    "activity-community": [["q_coop"], "#main .ph-hero", "afterend"],
    projects: [["q_masjid", "h_masjid"], "#main .ph-hero", "afterend"],
    "project-ibjmc": [["q_masjid", "h_masjid"], "#main .page-hero", "afterend"],
    "academic-building": [["q_knowledge", "h_ilm"], "#main .page-hero", "afterend"],
    future: [["q_good"], "#main .page-hero", "afterend"],
    funds: [["h_jariyah"], "#main .page-hero", "afterend"],
    donate: [["h_jariyah"], "#main .page-hero", "afterend"],
    ask: [["q_ask", "h_fiqh"], "#main #askSeries", "afterend"],
    institutions: [["q_read", "h_quran"], "#main .page-hero", "afterend"],
    "inst-kulliyatul-quran": [["q_read", "h_quran"], "#main .page-hero", "afterend"],
    programs: [["h_ilm"], "#main .page-hero", "afterend"],
    documentaries: [["h_convey"], "#main .ph-hero", "afterend"],
    history: [["q_good"], "#main .ph-hero", "afterend"]
  };
  var STQ = { education: "q_knowledge", dawah: "q_dawah", research: "q_ilm", welfare: "q_feed", community: "q_coop" };

  /* ---------- slow cross-fading photos ---------- */
  function xfade(imgs, cls, alt) {
    imgs = imgs.filter(Boolean);
    return '<div class="xf ' + (cls || "") + '"' + (imgs.length > 1 ? ' data-xf="1"' : "") + ">" + imgs.map(function (s, i) { return '<img src="' + im(s) + '" alt="' + (i ? "" : esc(alt || "")) + '"' + (i ? ' loading="lazy" aria-hidden="true"' : "") + (i ? "" : ' class="on"') + ">"; }).join("") + (imgs.length > 1 ? '<span class="xf-dots" aria-hidden="true">' + imgs.map(function (s, i) { return "<i" + (i ? "" : ' class="on"') + "></i>"; }).join("") + "</span>" : "") + "</div>";
  }
  IBT.xfade = xfade;
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  setInterval(function () {
    if (reduced || document.hidden) return;
    $$("[data-xf]").forEach(function (x) {
      var r = x.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
      var ims = $$("img", x), dots = $$(".xf-dots i", x), i = ims.findIndex(function (e) { return e.classList.contains("on"); }), n = (i + 1) % ims.length;
      if (ims[n].loading === "lazy") ims[n].loading = "eager";
      ims.forEach(function (e, k) { e.classList.toggle("on", k === n); }); dots.forEach(function (e, k) { e.classList.toggle("on", k === n); });
    });
  }, 5200);

  /* ---------- show whole building renders instead of cropping them ---------- */
  var FIT = ".cover, .card .media, .cause .media, .inst-c .ph, .photo, .upd .ph, .xf, .wf-m";
  function fitCheck(img) {
    var box = img.parentNode; if (!box || !img.naturalWidth || !box.clientWidth || !box.clientHeight) return;
    if (img.closest(".ph-bg, .hero, .slides, .ax-mosaic, .work")) return;
    var ir = img.naturalWidth / img.naturalHeight, br = box.clientWidth / box.clientHeight;
    var tall = /render-|design-|catalog-|bld-|campus-3d/.test(img.getAttribute("src") || "");
    if (tall && ir < br * 0.82) { img.classList.add("fit"); box.classList.add("has-fit"); box.style.setProperty("--fitbg", "url('" + (img.currentSrc || img.src) + "')"); }
  }
  document.addEventListener("load", function (e) { var t = e.target; if (t && t.tagName === "IMG" && t.closest && t.closest(FIT)) fitCheck(t); }, true);
  function fitAll(root) { $$("img", root).forEach(function (i) { if (i.closest(FIT) && i.complete) fitCheck(i); }); }

  /* ---------- journey (history) ---------- */
  P.history = function () {
    var Hs = (C().history || []).slice().sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
    var M = C().milestones || [];
    var years = new Date().getFullYear() - 2017;
    var hero = '<section class="ph-hero"><img class="ph-bg" src="' + im("img/first-prayer.webp") + '" alt="" fetchpriority="high"><div class="wrap ph-in">' + h.crumbs([[U("nav_about"), "#about"], [U("history")]]) + '<div class="eyebrow">' + L({ bn: "২০১৭ থেকে আজ", en: "2017 to today", ar: "من 2017 إلى اليوم" }) + '</div><h1 class="h-display">' + U("history") + '</h1><p class="lead">' + L({ bn: "ধলেশ্বরীর তীরে একটি স্বপ্ন থেকে মাসজিদকেন্দ্রিক জ্ঞানভিত্তিক ক্যাম্পাসের পথে: প্রতিটি ধাপ আল্লাহর অনুগ্রহ ও শুভাকাঙ্ক্ষীদের সহযোগিতায়।", en: "From a dream on the bank of the Dhaleshwari to a masjid-centred campus of knowledge: every step by the grace of Allah and the support of well-wishers.", ar: "من حلم على ضفة نهر دهاليشوري إلى حرم معرفي محوره المسجد: كل خطوة بفضل الله ثم بدعم المحسنين." }) + "</p>" +
      '<div class="jr-stats"><div><b>' + h.num(years) + "+</b><span>" + L({ bn: "বছরের পথচলা", en: "years of work", ar: "سنوات من العمل" }) + "</span></div><div><b>" + h.num(Hs.length) + "</b><span>" + L({ bn: "বড় মাইলফলক", en: "major milestones", ar: "محطات رئيسية" }) + "</span></div><div><b>" + h.num(225) + "</b><span>" + L({ bn: "পাইল সম্পন্ন", en: "piles completed", ar: "خازوقًا مكتملًا" }) + "</span></div><div><b>" + h.num(h.pct("mosque")) + "%</b><span>" + L({ bn: "মাসজিদের কাঠামো", en: "masjid structure", ar: "هيكل المسجد" }) + "</span></div></div></div></section>";
    var tl = '<ol class="jr">' + Hs.map(function (x, i) {
      var y = String(x.date).slice(0, 4);
      return '<li class="jr-i rv' + (i % 2 ? " r" : "") + '"><span class="jr-dot" aria-hidden="true">' + h.digits(y) + '</span><div class="jr-card">' + (x.image ? '<div class="jr-ph"><img src="' + im(x.image) + '" alt="" loading="lazy"></div>' : "") + '<div class="jr-b"><span class="jr-d">' + esc(h.fdate(x.date)) + "</span><h3>" + T(x.title) + "</h3><p>" + T(x.text) + "</p></div></div></li>";
    }).join("") + '<li class="jr-i jr-next rv' + (Hs.length % 2 ? " r" : "") + '"><span class="jr-dot" aria-hidden="true">' + icon("arrow") + '</span><div class="jr-card"><div class="jr-b"><span class="jr-d">' + L({ bn: "সামনের পথ", en: "The road ahead", ar: "الطريق إلى الأمام" }) + "</span><h3>" + L({ bn: "পূর্ণাঙ্গ ক্যাম্পাস: পাঁচটি ভবন", en: "The complete campus: five buildings", ar: "الحرم المتكامل: خمسة مبانٍ" }) + "</h3><p>" + T((C().future || {}).intro) + '</p><a class="btn sm primary" href="#future">' + icon("cube") + U("nav_future") + h.ARROW + "</a></div></div></li></ol>";
    var ms = M.length ? sec('<div class="sec-head"><div><span class="eyebrow">' + L({ bn: "নির্মাণ", en: "Construction", ar: "البناء" }) + '</span><h2 class="h-section">' + L({ bn: "নির্মাণের মাইলফলক", en: "Construction milestones", ar: "معالم البناء" }) + '</h2></div><a class="btn sm" href="#project-ibjmc">' + U("nav_masjid_complex") + h.ARROW + '</a></div><ol class="jr-ms">' + M.map(function (m) { return '<li class="' + esc(m.status || "") + '"><span class="d">' + (m.date ? esc(h.fdate(m.date)) : L({ bn: "আসন্ন", en: "Upcoming", ar: "قادم" })) + "</span><span>" + T(m.text).replace(/ ?\((?:IBT ক্যাটালগ ২০২৬|IBT Catalog 2026)\)| ?; IBT (?:ক্যাটালগ ২০২৬|Catalog 2026)/g, "") + "</span></li>"; }).join("") + "</ol>") : "";
    return hero + sec(tl, "jr-sec") + ms;
  };

  /* ---------- projects ---------- */
  function buildRow(kind, name, spec) {
    return '<div class="pj-b"><span class="pj-ring">' + h.pctRing(kind) + '</span><div><b>' + name + '</b><span class="muted">' + T(spec) + "</span></div></div>";
  }
  P.projects = function () {
    var c = C(), p = h.find(c.projects || [], "ibjmc") || {}, mv = h.find(c.projects || [], "model-village"), F = c.floors || {}, Fu = c.future || {};
    var hero = '<section class="ph-hero"><img class="ph-bg" src="' + im("img/design-night-2.webp") + '" alt="" fetchpriority="high"><div class="wrap ph-in">' + h.crumbs([[U("nav_projects")]]) + '<div class="eyebrow">' + U("nav_projects") + '</div><h1 class="h-display">' + L({ bn: "আমাদের প্রকল্প", en: "Our projects", ar: "مشاريعنا" }) + '</h1><p class="lead">' + L({ bn: "এক নজরে: কোন প্রকল্পের কাজ চলছে, মাস্টারপ্ল্যানে কী কী আছে এবং কোনগুলো প্রস্তাবিত।", en: "At a glance: what is being built now, what the master plan holds, and what is proposed.", ar: "في لمحة: ما يُبنى الآن، وما يتضمنه المخطط العام، وما هو مقترح." }) + "</p>" +
      '<div class="pj-steps"><a href="#pj-now"><b>' + h.num(1) + "</b>" + L({ bn: "চলমান", en: "Ongoing", ar: "جارٍ" }) + '</a><a href="#pj-plan"><b>' + h.num(3) + "</b>" + L({ bn: "মাস্টারপ্ল্যানের পরবর্তী ভবন", en: "next master-plan buildings", ar: "مبانٍ قادمة" }) + '</a><a href="#pj-prop"><b>' + h.num(mv ? 1 : 0) + "</b>" + L({ bn: "প্রস্তাবিত", en: "Proposed", ar: "مقترح" }) + "</a></div></div></section>";
    var now = '<section class="section tight" id="pj-now"><div class="wrap"><div class="sec-head"><div><span class="eyebrow"><span class="dot-live"></span>' + L({ bn: "চলমান প্রকল্প", en: "Ongoing project", ar: "مشروع جارٍ" }) + '</span><h2 class="h-section">' + T(p.name) + '</h2></div></div><article class="pj-now rv">' +
      xfade([F.photos && F.photos.mosque, "img/render-mosque.webp", F.photos && F.photos.academic, "img/render-academic.webp", "img/design-side.webp"], "pj-media", L(p.name)) +
      '<div class="pj-body"><p class="pj-loc">' + icon("pin") + T(p.location) + "</p><p>" + T(p.summary) + "</p>" + buildRow("mosque", L({ bn: "ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স (৬ তলা)", en: "Imam Bukhari Jame Masjid Complex (6 storeys)", ar: "مجمع جامع الإمام البخاري (6 طوابق)" }), (F.headline || {}).mosque) + buildRow("academic", L({ bn: "আইবিটি একাডেমিক কমপ্লেক্স (১০ তলা)", en: "IBT Academic Complex (10 storeys)", ar: "المجمع الأكاديمي (10 طوابق)" }), (F.headline || {}).academic) +
      '<div class="pj-cta"><a class="btn primary" href="#project-ibjmc">' + L({ bn: "অগ্রগতি ও বিস্তারিত", en: "Progress and details", ar: "التقدم والتفاصيل" }) + h.ARROW + '</a><a class="btn" href="#fund-mosque">' + icon("heart") + U("give_to_fund") + "</a></div></div></article></div></section>";
    var plan = '<section class="section tight" id="pj-plan"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">' + L({ bn: "মাস্টারপ্ল্যান", en: "Master plan", ar: "المخطط العام" }) + '</span><h2 class="h-section">' + T(Fu.title) + '</h2><p class="muted" style="max-width:64ch">' + T(Fu.intro) + '</p></div><a class="btn sm" href="#future">' + icon("cube") + U("explore_3d") + h.ARROW + '</a></div><div class="pj-plan">' +
      (Fu.buildings || []).filter(function (b) { return b.status === "proposed"; }).map(function (b) {
        return '<a class="pj-p rv" href="#future"><span class="pj-p-img"><img src="' + im(b.image) + '" alt="" loading="lazy"></span><span class="pj-p-b"><span class="chip muted"><span class="dot"></span>' + T(b.statusText) + "</span><b>" + T(b.name) + '</b><ul>' + (b.items || []).slice(0, 5).map(function (it) { return "<li>" + T(it.name) + "</li>"; }).join("") + ((b.items || []).length > 5 ? "<li>…</li>" : "") + "</ul></span></a>";
      }).join("") + "</div></div></section>";
    var prop = mv ? '<section class="section tight" id="pj-prop"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">' + L({ bn: "প্রস্তাবিত সমাজ উন্নয়ন প্রকল্প", en: "Proposed community project", ar: "مشروع مجتمعي مقترح" }) + '</span><h2 class="h-section">' + T(mv.name) + '</h2></div></div><a class="pj-mv rv" href="#project-model-village">' + xfade([mv.image, "img/flood-2024-rehab-feni.webp", "img/doc-flood-rehab-1.webp"], "pj-mv-m", L(mv.name)) + '<span class="pj-mv-b"><span class="chip warn"><span class="dot"></span>' + U("status_proposed") + "</span><b>" + T(mv.summary) + "</b><span class=\"muted\">" + T(mv.body) + '</span><span class="linkarrow">' + U("learn_more") + h.ARROW + "</span></span></a></div></section>" : "";
    return hero + now + plan + prop;
  };

  /* ---------- publications: catalogues that open ---------- */
  function catalogues() {
    var R = (C().reports || []).filter(function (r) { return r.url; });
    return '<div class="cat-grid">' + R.map(function (r) {
      return '<article class="cat rv"><a class="cat-cv" href="' + esc(r.url) + '"' + ext + ' aria-label="' + esc(L(r.title)) + '"><img src="' + im(r.cover) + '" alt="" loading="lazy"><span class="cat-y">' + h.digits(r.year) + '</span></a><div class="cat-b"><h3>' + T(r.title) + '</h3><p class="muted">' + h.digits(r.pages || "") + " " + L({ bn: "পৃষ্ঠা", en: "pages", ar: "صفحة" }) + " · PDF · " + esc(h.digits(r.size || "")) + '</p><div class="cat-a"><a class="btn sm primary" href="' + esc(r.url) + '"' + ext + ">" + icon("eye") + L({ bn: "পড়ুন", en: "Read", ar: "اقرأ" }) + '</a><a class="btn sm" href="' + esc(r.url) + '" download>' + icon("doc") + L({ bn: "ডাউনলোড", en: "Download", ar: "تحميل" }) + "</a></div></div></article>";
    }).join("") + "</div>";
  }

  /* ---------- header: projects menu without overlapping items ---------- */
  (IBT.NAVG || []).forEach(function (g) {
    if (g[0] === "projects") g[2] = [["projects", "nav_all_projects"], ["project-ibjmc", "nav_campus"], ["future", "nav_future"], ["project-model-village", "nav_model_village"], ["funds", "nav_funds"]];
  });
  var STIMG = {
    education: ["img/model-madrasa.webp", "img/teachers-training.webp", "img/halaqa-class.webp"],
    dawah: ["img/chairman-speech.webp", "img/program-women.webp", "img/halaqa-class.webp"],
    research: ["img/sunnah-conference-2024.webp", "img/program-corporate.webp", "img/scholars-visit-group.webp"],
    welfare: ["img/winter-2024-distribution.webp", "img/doc-iftar.webp", "img/winter-2024-queue.webp", "img/flood-2024-rehab-feni.webp"],
    community: ["img/event-gettogether.webp", "img/program-women-children.webp", "img/first-prayer.webp"]
  };

  /* ---------- placements ---------- */
  IBT.afterHooks.push(function (route) {
    var main = $("#main"); if (!main) return;
    // verses
    var vp = VPLACE[route];
    if (vp && !$("#main .vq-sec")) {
      var go = function () { var at = $(vp[1]); at = at && (at.matches("section") ? at : at.closest("section")); if (at && !$("#main .vq-sec")) at.insertAdjacentHTML(vp[2], verses(vp[0])); };
      if (route === "ask") setTimeout(function () { var tries = 0; (function w() { if ($("#main #askSeries") || tries++ > 20) { if (!$("#main #askSeries")) vp = [vp[0], "#main .ask-hero", "afterend"]; go(); } else setTimeout(w, 200); })(); }, 0); else go();
    }
    if (route === "home" && !$("#main .vq-home2")) {
      var cs = $("#main .causes"); cs = cs && cs.closest("section");
      if (cs) { cs.insertAdjacentHTML("beforebegin", verses(["h_masjid", "h_jariyah"])); var added = cs.previousElementSibling; if (added) added.classList.add("vq-home2"); }
    }
    if (route === "activities") {
      var ks = Object.keys(STQ);
      $$("#main .stream .st-body").forEach(function (b, i) {
        var v = (C().verses || {})[STQ[ks[i]]]; if (!v || $(".st-q", b)) return;
        var p = $("p", b); if (p) p.insertAdjacentHTML("afterend", '<blockquote class="st-q"><span lang="ar" dir="rtl">﴿' + esc(v.ar) + (v.part ? " …" : "") + "﴾</span><cite>" + T(v.ref) + "</cite></blockquote>");
      });
    }
    // Q&A: questions go through the Google Form
    if (route === "ask") {
      var url = (C().settings || {}).askForm;
      var card = $("#main #askIbt");
      if (url && card && !$(".gf-cta", card)) {
        card.innerHTML = '<div class="gf-cta"><span class="ic">' + icon("chat") + "</span><h3>" + U("ask_form_title") + "</h3><p>" + U("ask_form_text") + '</p><a class="btn primary" href="' + esc(url) + '"' + ext + ">" + icon("send") + U("ask_form_btn") + icon("ext") + '</a><p class="faint">' + L({ bn: "উত্তর আমাদের আলেমগণ কুরআন ও সুন্নাহর আলোকে দেবেন। প্রয়োজনে আপনার দেওয়া যোগাযোগ নম্বর বা ইমেইলে জানানো হবে।", en: "Our scholars answer in the light of the Qur'an and Sunnah, and reply on the contact you give if needed.", ar: "يجيب علماؤنا في ضوء الكتاب والسنة، ويُرد عليك عبر وسيلة التواصل التي تذكرها عند الحاجة." }) + "</p></div>";
      }
      var form = $("#main #askForm");
      if (url && form && !$("#main .gf-hero")) form.insertAdjacentHTML("afterend", '<p class="gf-hero"><a class="btn sm" href="' + esc(url) + '"' + ext + ">" + icon("send") + L({ bn: "উত্তর না পেলে আলেমদের কাছে প্রশ্ন পাঠান", en: "Can't find it? Send your question to our scholars", ar: "لم تجد الجواب؟ أرسل سؤالك إلى علمائنا" }) + icon("ext") + "</a></p>");
    }
    // contact: office on Google Maps
    if (route === "contact" && !$("#main .map-sec")) {
      var q = (C().settings || {}).officeMapQuery, c = (C().settings || {}).contact || {};
      if (q) main.insertAdjacentHTML("beforeend", sec('<div class="sec-head"><div><span class="eyebrow">' + icon("pin") + " " + U("office") + '</span><h2 class="h-section">' + L({ bn: "আমাদের অফিসে আসুন", en: "Visit our office", ar: "زر مكتبنا" }) + '</h2><p class="muted">' + T(c.office) + '</p></div><a class="btn sm" href="' + esc((C().settings || {}).officeMapUrl || ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q))) + '"' + ext + ">" + icon("pin") + L({ bn: "Google Maps-এ খুলুন", en: "Open in Google Maps", ar: "افتح في خرائط جوجل" }) + icon("ext") + '</a></div><div class="map-f"><iframe title="' + esc(L({ bn: "ইমাম বুখারী ট্রাস্ট অফিসের মানচিত্র", en: "Map of the Imam Bukhari Trust office", ar: "خريطة مكتب الوقف" })) + '" src="https://www.google.com/maps?q=' + encodeURIComponent((C().settings || {}).officeMapLL || q) + '&z=17&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>', "map-sec"));
    }
    // publications
    if (route === "publications" && !$("#main .cat-grid")) {
      var g = $("#main .pubc"); g = g && g.closest(".grid");
      if (g) g.outerHTML = catalogues(); else { var ph = $("#main .page-hero"); if (ph) ph.insertAdjacentHTML("afterend", sec(catalogues())); }
    }
    // project page cover: several photos, slowly changing
    if (route === "project-ibjmc" || route === "academic-building") {
      var cv = $("#main .cover"); var F = C().floors || {};
      if (cv && !$(".xf", cv)) { cv.innerHTML = xfade([F.photos && F.photos.mosque, "img/design-side.webp", F.photos && F.photos.academic, "img/render-campus.webp", "img/design-front.webp"], "", L((h.find(C().projects || [], "ibjmc") || {}).name)); }
    }
    // activities: each stream's main photo slowly changes
    if (route === "activities") {
      var keys = Object.keys(STIMG);
      $$("#main .stream .st-main").forEach(function (img, i) { var k = keys[i]; if (!k || img.tagName !== "IMG") return; img.outerHTML = xfade(STIMG[k], "st-main", ""); });
    }
    if (/^activity-/.test(route)) {
      var k2 = route.slice(9), bg = $("#main .ph-hero > img.ph-bg");
      if (bg && STIMG[k2]) bg.outerHTML = xfade(STIMG[k2], "ph-bg", "");
    }
    fitAll(main);
  });
})();
