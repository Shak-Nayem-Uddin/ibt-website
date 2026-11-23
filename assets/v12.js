/* IBT v12: picture-led Activities and About pages, documentaries page (IBT All Documentary playlist),
   "Ask Dr. Monzur-E-Elahi" Q&A video series on the Q&A page. Video lists come from data/playlists.json,
   which the YouTube workflow keeps up to date. */
(function () {
  "use strict";
  var IBT = window.IBT, h = IBT.H, P = IBT.P;
  var $ = h.$, $$ = h.$$, esc = h.esc, tr = h.tr, T = h.T, U = h.U, icon = h.icon, C = h.C;
  function L(o) { return tr(o); }
  function sec(inner, cls, id) { return '<section class="section tight' + (cls ? " " + cls : "") + '"' + (id ? ' id="' + id + '"' : "") + '><div class="wrap">' + inner + "</div></section>"; }
  function im(src) { return esc(h.img(src)); }
  function lang() { return document.documentElement.lang || "bn"; }
  var ext = ' target="_blank" rel="noopener"';

  /* ---------- playlist data ---------- */
  var PL = null, plReq = null;
  function loadPL() {
    if (plReq) return plReq;
    plReq = fetch("data/playlists.json?h=" + Math.floor(Date.now() / 36e5)).then(function (r) { return r.json(); }).then(function (d) { PL = d || { lists: {} }; return PL; }, function () { PL = { lists: {} }; return PL; });
    return plReq;
  }
  function list(k) { return ((PL && PL.lists[k]) || {}).items || []; }
  function plId(k) { return ((PL && PL.lists[k]) || {}).id || ""; }
  var PROG = null, progReq = null;
  function loadProg() {
    if (progReq) return progReq;
    progReq = fetch("data/programs.json?v=1").then(function (r) { return r.json(); }).then(function (d) { PROG = d || []; return PROG; }, function () { PROG = []; return PROG; });
    return progReq;
  }
  function thumb(id, big) { return "https://i.ytimg.com/vi/" + encodeURIComponent(id) + (big ? "/sddefault.jpg" : "/mqdefault.jpg"); }
  // thumbnails that do not exist (sddefault on older uploads) fall back to hqdefault
  document.addEventListener("error", function (e) {
    var t = e.target; if (!t || t.tagName !== "IMG" || !t.dataset || !t.dataset.yt || t.dataset.fb) return;
    t.dataset.fb = "1"; t.src = "https://i.ytimg.com/vi/" + encodeURIComponent(t.dataset.yt) + "/hqdefault.jpg";
  }, true);
  function secs(len) { var p = String(len || "").split(":").map(Number), s = 0; p.forEach(function (x) { s = s * 60 + (x || 0); }); return s; }
  function cleanAskTitle(t) { return String(t || "").replace(/\s+/g, " ").replace(/Ask Dr\.? *Monzur[ -]?E[ -]?Elahi/i, "").replace(/[()\-–]/g, " ").replace(/\s+/g, " ").trim(); }
  function playBtn(v, cls, inner) { return '<button type="button" class="' + cls + '" data-play="' + esc(v.id) + '" data-title="' + esc(v.title) + '">' + inner + "</button>"; }
  function vthumb(v, big) {
    return '<span class="v2-th"><img loading="lazy" src="' + esc(thumb(v.id, big)) + '" data-yt="' + esc(v.id) + '" alt=""><span class="v2-pl">' + icon("play") + "</span>" + (v.len ? '<span class="v2-len">' + esc(h.digits(v.len)) + "</span>" : "") + "</span>";
  }
  function dcard(v) {
    return playBtn(v, "v2", vthumb(v) + '<span class="v2-t" lang="' + (/[ঀ-৿]/.test(v.title) ? "bn" : "en") + '">' + esc(v.title) + '</span><span class="v2-d">' + (v.date ? esc(h.fdate(v.date)) : "") + "</span>");
  }
  function ytBtn(id, label) { return id ? '<a class="btn sm" href="https://www.youtube.com/playlist?list=' + encodeURIComponent(id) + '"' + ext + ">" + icon("youtube") + label + icon("ext") + "</a>" : ""; }
  function photoHero(img, eyebrow, title, lead, crumbs, extra) {
    return '<section class="ph-hero"><img class="ph-bg" src="' + im(img) + '" alt="" fetchpriority="high"><div class="wrap ph-in">' + h.crumbs(crumbs) + (eyebrow ? '<div class="eyebrow">' + eyebrow + "</div>" : "") + '<h1 class="h-display">' + title + "</h1>" + (lead ? '<p class="lead">' + lead + "</p>" : "") + (extra || "") + "</div></section>";
  }
  function stat(n, suf, label) { return '<div class="ns"><b data-n="' + n + '" data-suf="' + (suf || "") + '">' + h.num(n) + (suf || "") + "</b><span>" + label + "</span></div>"; }
  function impactItem(i) { return ((C().home || {}).impact2 || {}).items ? C().home.impact2.items[i] : null; }

  /* ---------- streams of work ---------- */
  var ST = [
    { k: "education", icon: "education", img: "img/model-madrasa.webp", inset: "img/teachers-training.webp", kinds: ["Course", "Workshop", "Training"],
      text: { bn: "শিশু থেকে উচ্চশিক্ষা পর্যন্ত কুরআন-সুন্নাহভিত্তিক শিক্ষা: মডেল মাদরাসা, আফটার স্কুল, সানাবিয়্যাহ ও কুল্লিয়্যাহ, আরবি ভাষা ও বিভিন্ন কোর্স।", en: "Qur'an-and-Sunnah-based education from childhood to higher studies: model madrasa, after school, Sanabiyyah and Kulliyyah, Arabic and short courses.", ar: "تعليم قائم على الكتاب والسنة من الطفولة إلى الدراسات العليا: المدرسة النموذجية وما بعد المدرسة والثانوية والكلية والعربية والدورات." },
      links: [["inst-kulliyatul-quran", "nav_kq"], ["inst-model-madrasa", null, "model-madrasa"], ["inst-after-school", null, "after-school"], ["inst-teachers-training", null, "teachers-training"]],
      unit: { bn: "টি কোর্স, কর্মশালা ও প্রশিক্ষণ (২০২২ থেকে)", en: "courses, workshops and trainings since 2022", ar: "دورة وورشة وتدريبًا منذ 2022" } },
    { k: "dawah", icon: "dawah", img: "img/chairman-speech.webp", inset: "img/program-women.webp", kinds: ["Halaqa"],
      text: { bn: "সাপ্তাহিক ইলমী মাজলিস, হালাকা, কনফারেন্স, প্রশিক্ষণ এবং ডিজিটাল মাধ্যমে বিশুদ্ধ দ্বীনের দাওয়াহ।", en: "Dawah through the weekly Ilmi Majlis, halaqas, conferences, trainings and digital media.", ar: "الدعوة عبر المجلس العلمي الأسبوعي والحلقات والمؤتمرات والدورات والإعلام الرقمي." },
      links: [["init-dawah", null, null, "dawah"], ["init-women", null, null, "women"], ["init-digital", null, null, "digital"], ["ask", "nav_ask"]],
      unit: { bn: "টি হালাকা (২০২২ থেকে)", en: "halaqas since 2022", ar: "حلقة منذ 2022" } },
    { k: "research", icon: "research", img: "img/sunnah-conference-2024.webp", inset: "img/program-corporate.webp", kinds: ["Seminar", "Conference"],
      text: { bn: "সমসাময়িক বিষয়ে কুরআন-সুন্নাহভিত্তিক গবেষণা, সেমিনার, সুন্নাহ কনফারেন্স ও নীতিনির্ধারণী সংলাপ।", en: "Qur'an-and-Sunnah-based research on contemporary issues, seminars, the Sunnah Conference and policy dialogue.", ar: "بحوث معاصرة في ضوء الكتاب والسنة وندوات ومؤتمر السنة وحوار السياسات." },
      links: [["init-research", null, null, "research"], ["init-economy", null, null, "economy"], ["publications", "nav_publications"]],
      unit: { bn: "টি সেমিনার ও কনফারেন্স (২০২২ থেকে)", en: "seminars and conferences since 2022", ar: "ندوة ومؤتمرًا منذ 2022" } },
    { k: "welfare", icon: "social", img: "img/winter-2024-distribution.webp", inset: "img/relief-flood-1.webp",
      text: { bn: "শীতবস্ত্র, ইফতার, বন্যা ত্রাণ ও পুনর্বাসন, কুরবানি, চিকিৎসা সহায়তা ও শিক্ষাবৃত্তি।", en: "Winter clothing, iftar, flood relief and rehabilitation, qurbani, medical aid and scholarships.", ar: "كسوة الشتاء والإفطار وإغاثة الفيضانات وإعادة التأهيل والأضاحي والمساعدة الطبية والمنح." },
      links: [["fund-winter", null, null, null, "winter"], ["fund-iftar", null, null, null, "iftar"], ["fund-relief", null, null, null, "relief"], ["fund-scholarship", null, null, null, "scholarship"]],
      fixed: [400, "+", { bn: "পরিবার পেয়েছে শীতবস্ত্র", en: "families received winter clothing", ar: "أسرة تلقت كسوة الشتاء" }] },
    { k: "community", icon: "family", img: "img/event-gettogether.webp", inset: "img/program-women-children.webp", kinds: ["Special Program"],
      text: { bn: "মাসজিদকে কেন্দ্র করে একটি দ্বীনি কমিউনিটি: পরিবার, যুবক ও প্রবীণদের জন্য আয়োজন, গেট-টুগেদার ও ফ্যামিলি প্রোগ্রাম।", en: "A dini community around the masjid: programmes for families, youth and elders, get-togethers and family events.", ar: "مجتمع ديني حول المسجد: برامج للأسر والشباب وكبار السن ولقاءات عائلية." },
      links: [["init-community", null, null, "community"], ["init-family", null, null, "family"], ["register", "nav_events"]],
      unit: { bn: "টি বিশেষ আয়োজন (২০২২ থেকে)", en: "special programmes since 2022", ar: "برنامجًا خاصًا منذ 2022" } }
  ];
  function linkLabel(l) {
    var c = C();
    if (l[1]) return U(l[1]);
    if (l[2]) { var i = h.find(c.institutions || [], l[2]); return i ? T(i.navName || i.name) : ""; }
    if (l[3]) { var n = h.find(c.initiatives || [], l[3]); return n ? T(n.name) : ""; }
    if (l[4]) { var f = h.find(c.funds || [], l[4]); return f ? T(f.name) : ""; }
    return "";
  }
  function chips(s) { return '<div class="st-chips">' + s.links.map(function (l) { var t = linkLabel(l); return t ? '<a href="#' + l[0] + '">' + t + "</a>" : ""; }).join("") + "</div>"; }
  function streamCount(s) {
    if (s.fixed) return '<span class="st-n"><b>' + h.num(s.fixed[0]) + s.fixed[1] + "</b> " + L(s.fixed[2]) + "</span>";
    return '<span class="st-n" data-kinds="' + s.kinds.join("|") + '" data-unit="' + esc(L(s.unit)) + '"></span>';
  }
  function fillCounts() {
    loadProg().then(function (all) {
      $$("#main .st-n[data-kinds]").forEach(function (el) {
        var k = el.dataset.kinds.split("|"), n = all.filter(function (p) { return k.indexOf(p.k) > -1; }).length;
        if (n) el.innerHTML = "<b>" + h.num(n) + "</b> " + esc(el.dataset.unit);
      });
    });
  }

  P.activities = function () {
    var i1 = impactItem(1), i2 = impactItem(2), i0 = impactItem(0);
    var nums = '<div class="ns-row">' + (i1 ? stat(i1.n, i1.suf, T(i1.label)) : "") + (i2 ? stat(i2.n, i2.suf, T(i2.label)) : "") + (i0 ? stat(i0.n, i0.suf, T(i0.label)) : "") + "</div>";
    var mosaic = '<div class="ax-mosaic" aria-hidden="true">' + ST.map(function (s, i) { return '<a class="axm axm' + i + '" href="#activity-' + s.k + '" tabindex="-1"><img src="' + im(s.img) + '" alt="" loading="' + (i < 2 ? "eager" : "lazy") + '"><span>' + U("act_" + s.k) + "</span></a>"; }).join("") + "</div>";
    var hero = '<section class="ax-hero"><div class="wrap ax-in"><div class="ax-t">' + h.crumbs([[U("nav_activities")]]) + '<div class="eyebrow">' + L({ bn: "আমাদের কাজ", en: "Our work", ar: "أعمالنا" }) + '</div><h1 class="h-display">' + U("nav_activities") + '</h1><p class="lead">' + L({ bn: "শিক্ষা, দাওয়াহ, গবেষণা, সমাজকল্যাণ ও কমিউনিটি: কুরআন ও সুন্নাহর আলোকে পাঁচটি ধারায় ইমাম বুখারী ট্রাস্টের কাজ।", en: "Education, Dawah, research, social welfare and community: Imam Bukhari Trust's work in five streams, in the light of the Qur'an and Sunnah.", ar: "التعليم والدعوة والبحث والرعاية الاجتماعية والمجتمع: أعمال الوقف في خمسة مسارات في ضوء الكتاب والسنة." }) + "</p>" + nums + "</div>" + mosaic + "</div></section>";
    var pills = '<nav class="st-pills" aria-label="' + esc(L({ bn: "কার্যক্রমের ধারা", en: "Streams of work", ar: "مسارات العمل" })) + '">' + ST.map(function (s) { return '<a href="#activity-' + s.k + '">' + icon(s.icon) + U("act_" + s.k) + "</a>"; }).join("") + "</nav>";
    var streams = ST.map(function (s, i) {
      return '<article class="stream rv' + (i % 2 ? " rev" : "") + '"><a class="st-media" href="#activity-' + s.k + '" tabindex="-1" aria-hidden="true"><img class="st-main" src="' + im(s.img) + '" alt="" loading="lazy"><img class="st-inset" src="' + im(s.inset) + '" alt="" loading="lazy"><span class="st-no">' + h.digits("0" + (i + 1)) + "</span></a>" +
        '<div class="st-body"><span class="st-ic">' + icon(s.icon) + '</span><h2><a href="#activity-' + s.k + '">' + U("act_" + s.k) + "</a></h2><p>" + L(s.text) + "</p>" + streamCount(s) + chips(s) +
        '<a class="btn primary" href="#activity-' + s.k + '">' + L({ bn: "বিস্তারিত দেখুন", en: "Explore", ar: "استكشف" }) + h.ARROW + "</a></div></article>";
    }).join("");
    var gal = [["img/halaqa-class.webp", { bn: "সাপ্তাহিক দারস", en: "Weekly dars", ar: "الدرس الأسبوعي" }], ["img/first-prayer.webp", { bn: "নির্মাণাধীন মাসজিদে প্রথম জামাত", en: "First congregation at the masjid site", ar: "أول جماعة في موقع المسجد" }], ["img/teachers-training.webp", { bn: "শিক্ষক প্রশিক্ষণ কর্মশালা", en: "Teachers' training workshop", ar: "ورشة تدريب المعلمين" }], ["img/winter-2024-queue.webp", { bn: "শীতবস্ত্র বিতরণ ২০২৪", en: "Winter clothing distribution 2024", ar: "توزيع كسوة الشتاء 2024" }], ["img/scholars-visit-group.webp", { bn: "আলেমদের প্রকল্প পরিদর্শন", en: "Scholars visit the project", ar: "زيارة العلماء للمشروع" }], ["img/doc-iftar.webp", { bn: "ইফতার আয়োজন", en: "Iftar programme", ar: "برنامج الإفطار" }]];
    var gallery = sec('<div class="sec-head"><div><span class="eyebrow">' + L({ bn: "ছবিতে", en: "In pictures", ar: "بالصور" }) + '</span><h2 class="h-section">' + L({ bn: "কার্যক্রমের মুহূর্ত", en: "Moments from our work", ar: "لحظات من أعمالنا" }) + '</h2></div><a class="btn sm" href="#documentaries">' + icon("video") + U("nav_docs") + h.ARROW + '</a></div><div class="ax-gal">' + gal.map(function (g, i) { return '<figure class="rv g' + i + '"><img src="' + im(g[0]) + '" alt="' + esc(L(g[1])) + '" loading="lazy"><figcaption>' + L(g[1]) + "</figcaption></figure>"; }).join("") + "</div>");
    var cta = sec('<div class="ax-cta"><div><h2 class="h-section">' + L({ bn: "এই কাজে আপনিও যুক্ত হোন", en: "Be part of this work", ar: "كن جزءًا من هذا العمل" }) + "</h2><p>" + L({ bn: "কোর্স ও আয়োজনে অংশ নিন, স্বেচ্ছাসেবক হোন অথবা একটি খাতে দান করুন।", en: "Join a course or programme, volunteer, or support a cause.", ar: "شارك في دورة أو برنامج، أو تطوع، أو ادعم أحد المجالات." }) + '</p></div><div class="ax-cta-b"><a class="btn light" href="#register">' + icon("cal") + U("nav_events") + '</a><a class="btn gold" href="#donate">' + icon("heart") + U("donate") + "</a></div></div>");
    setTimeout(fillCounts, 0);
    return hero + sec(pills, "st-sec") + '<section class="section tight"><div class="wrap streams">' + streams + "</div></section>" + gallery + cta;
  };

  /* ---------- activity sub-pages: photo header, key figure, related videos ---------- */
  var SUBVID = {
    education: { pl: ["PLPoR2UQBlssKtx2zvXCovKSZVOBkY1j8j", "PLPoR2UQBlssK4bjJfgEdyJRgNVur06MvR"] },
    dawah: { pl: ["PLPoR2UQBlssIHK2FmgHitpjKuz7uoH-GI", "PLPoR2UQBlssLxQeu2VbjV6zIeQ7Nflu1v"] },
    research: { pl: ["PLPoR2UQBlssJFePGOHjrDCOZR6ouDp7dH"] },
    welfare: { doc: ["g9lRiceVtBY"] },
    community: { doc: ["cW4p5VQGSYo", "3VOmNTynoZg", "np9M6nVfdjE"], pl: ["PLPoR2UQBlssJYUTdLKv0uRQtuxHkUN2z-"] }
  };
  ST.forEach(function (s) {
    var orig = P["activity-" + s.k]; if (!orig) return;
    P["activity-" + s.k] = function () {
      var html = orig.apply(this, arguments);
      var m = html.match(/^<section class="page-hero"><div class="wrap">([\s\S]*?)<\/div><\/section>/);
      if (!m) return html;
      setTimeout(fillCounts, 0);
      return '<section class="ph-hero"><img class="ph-bg" src="' + im(s.img) + '" alt="" fetchpriority="high"><div class="wrap ph-in"><span class="ph-ic">' + icon(s.icon) + "</span>" + m[1].replace(/ rv"/g, '"') + '<div class="ph-meta">' + streamCount(s) + "</div></div></section>" + html.slice(m[0].length);
    };
  });
  function relatedVideos(k) {
    var cfg = SUBVID[k]; if (!cfg) return;
    function draw() {
      var V = IBT.V ? IBT.V() : {}, out = [], seen = {};
      (cfg.doc || []).forEach(function (id) { var d = list("documentary").filter(function (x) { return x.id === id; })[0]; if (d && !seen[id]) { seen[id] = 1; out.push(d); } });
      (cfg.pl || []).forEach(function (pid) {
        var p = (V.playlists || []).filter(function (x) { return x.id === pid; })[0]; if (!p) return;
        var byId = {}; (V.videos || []).forEach(function (v) { byId[v.id] = v; });
        p.videos.slice(0, 8).forEach(function (id) { var v = byId[id]; if (v && !seen[id]) { seen[id] = 1; out.push({ id: id, title: v.title, date: v.date || v.approx || "" }); } });
      });
      var el = $("#main #relVid"); if (!el) return;
      if (!out.length) { el.closest("section").remove(); return; }
      el.innerHTML = out.slice(0, 10).map(dcard).join("");
    }
    var tries = 0;
    (function wait() { var V = IBT.V ? IBT.V() : null; if ((V && (V.videos || []).length) || tries++ > 20) loadPL().then(draw); else setTimeout(wait, 250); })();
  }

  /* ---------- documentaries ---------- */
  function docFeature(v, sideLabel) {
    return '<div class="df">' + playBtn(v, "df-m", vthumb(v, true)) + '<div class="df-b"><span class="chip">' + icon("video") + sideLabel + '</span><h2 lang="' + (/[ঀ-৿]/.test(v.title) ? "bn" : "en") + '">' + esc(v.title) + '</h2><p class="muted">' + (v.date ? esc(h.fdate(v.date)) : "") + (v.len ? " · " + esc(h.digits(v.len)) : "") + "</p>" + playBtn(v, "btn primary", icon("play") + L({ bn: "এখনই দেখুন", en: "Watch now", ar: "شاهد الآن" })) + "</div></div>";
  }
  function stories() {
    var S = C().stories || []; if (!S.length) return "";
    return '<h3 class="sub-h">' + L({ bn: "ইন্টারঅ্যাক্টিভ গল্প", en: "Interactive stories", ar: "قصص تفاعلية" }) + '</h3><div class="grid g2" style="margin-top:14px">' + S.map(function (s) { return '<button class="card glass" style="text-align:start;padding:0;cursor:pointer;color:inherit" data-story="' + esc(s.id) + '"><div class="media" style="aspect-ratio:16/8"><img loading="lazy" src="' + im(s.cover) + '" alt=""><span class="chip gold">' + h.digits((s.chapters || []).length) + " " + U("chapter") + '</span></div><div class="body"><h3>' + T(s.title) + '</h3><span class="linkarrow">' + icon("play") + U("enter_story") + "</span></div></button>"; }).join("") + "</div>";
  }
  P.documentaries = function () {
    loadPL().then(function () {
      var el = $("#main #docAll"); if (!el) return;
      var L0 = list("documentary");
      if (!L0.length) { el.innerHTML = '<p class="muted">' + L({ bn: "ভিডিও লোড করা যায়নি। ইউটিউবে দেখুন।", en: "Could not load the videos. Please watch on YouTube.", ar: "تعذر تحميل الفيديوهات. شاهدها على يوتيوب." }) + "</p>"; return; }
      var total = L0.reduce(function (a, v) { return a + secs(v.len); }, 0);
      el.innerHTML = docFeature(L0[0], L({ bn: "সর্বশেষ ডকুমেন্টারি", en: "Latest documentary", ar: "أحدث فيلم وثائقي" })) +
        '<div class="sec-head" style="margin-top:34px"><div><h2 class="h-section">' + L({ bn: "সব ডকুমেন্টারি", en: "All documentaries", ar: "كل الأفلام الوثائقية" }) + '</h2><p class="faint">' + h.num(L0.length) + " " + L({ bn: "টি ভিডিও", en: "videos", ar: "فيديو" }) + " · " + h.num(Math.round(total / 60)) + " " + L({ bn: "মিনিট", en: "minutes", ar: "دقيقة" }) + "</p></div>" + ytBtn(plId("documentary"), L({ bn: "ইউটিউবে প্লেলিস্ট", en: "Playlist on YouTube", ar: "قائمة التشغيل على يوتيوب" })) + "</div>" +
        '<div class="v2-grid">' + L0.slice(1).map(dcard).join("") + "</div>";
    });
    return photoHero("img/design-night-2.webp", U("nav_resources"), U("nav_docs"), L({ bn: "মাসজিদ কমপ্লেক্স, শিক্ষা, দাওয়াহ ও সমাজকল্যাণ: ইমাম বুখারী ট্রাস্টের কাজের গল্প ভিডিওতে।", en: "The masjid complex, education, Dawah and welfare: the story of Imam Bukhari Trust on film.", ar: "مجمع المسجد والتعليم والدعوة والرعاية: قصة الوقف بالصور المتحركة." }), [[U("nav_resources")], [U("nav_docs")]]) +
      sec('<div id="docAll"><div class="df skel"></div></div>') + sec(stories());
  };

  /* ---------- Q&A series ---------- */
  function askSeries() {
    var A = list("ask"); if (!A.length) return "";
    var total = A.reduce(function (a, v) { return a + secs(v.len); }, 0), latest = A[0];
    function ep(v) { return v.ep ? L({ bn: "পর্ব ", en: "Episode ", ar: "الحلقة " }) + h.digits(v.ep) : ""; }
    function row(v) { return playBtn(v, "qs-row", '<span class="qs-rth"><img loading="lazy" src="' + esc(thumb(v.id)) + '" data-yt="' + esc(v.id) + '" alt=""><span class="v2-pl">' + icon("play") + '</span></span><span class="qs-rt"><b>' + ep(v) + "</b><span>" + esc(h.fdate(v.date)) + " · " + esc(h.digits(v.len)) + "</span></span>"); }
    function card(v) { return playBtn(v, "v2 qs-c", vthumb(v) + '<span class="qs-ep">' + h.digits(v.ep || "") + '</span><span class="v2-t">' + ep(v) + (cleanAskTitle(v.title) && !/^episode/i.test(cleanAskTitle(v.title)) ? " · " + esc(cleanAskTitle(v.title)) : "") + '</span><span class="v2-d">' + esc(h.fdate(v.date)) + "</span>"); }
    return '<section class="section tight qs" id="askSeries"><div class="wrap"><div class="qs-box">' +
      '<div class="qs-head"><div><span class="eyebrow">' + L({ bn: "ভিডিও প্রশ্নোত্তর সিরিজ", en: "Video Q&A series", ar: "سلسلة أسئلة وأجوبة مرئية" }) + '</span><h2 class="h-section">Ask Dr. Monzur-E-Elahi</h2><p class="muted">' + L({ bn: "দর্শকদের পাঠানো প্রশ্নের উত্তর দিচ্ছেন ড. মোহাম্মদ মানজুরে ইলাহী: ইবাদত, পরিবার, লেনদেন ও সমসাময়িক বিষয়ে কুরআন-সুন্নাহভিত্তিক আলোচনা।", en: "Prof. Dr. Mohammad Monzur-E-Elahi answers questions sent by viewers on worship, family, dealings and current issues, in the light of the Qur'an and Sunnah.", ar: "يجيب الأستاذ الدكتور محمد منظور إلهي عن أسئلة المشاهدين في العبادة والأسرة والمعاملات والقضايا المعاصرة في ضوء الكتاب والسنة." }) + "</p></div>" +
      '<div class="qs-stats"><div><b>' + h.num(A.length) + "</b><span>" + L({ bn: "পর্ব", en: "episodes", ar: "حلقة" }) + "</span></div><div><b>" + h.num(Math.round(total / 3600)) + "+</b><span>" + L({ bn: "ঘণ্টা আলোচনা", en: "hours of answers", ar: "ساعة" }) + "</span></div>" + ytBtn(plId("ask"), L({ bn: "পুরো প্লেলিস্ট", en: "Full playlist", ar: "القائمة كاملة" })) + "</div></div>" +
      '<div class="qs-feat">' + playBtn(latest, "df-m", vthumb(latest, true) + '<span class="qs-new">' + L({ bn: "নতুন পর্ব", en: "New episode", ar: "حلقة جديدة" }) + " · " + ep(latest) + "</span>") + '<div class="qs-side">' + A.slice(1, 5).map(row).join("") + "</div></div>" +
      '<div class="v2-grid qs-grid" id="qsGrid">' + A.slice(5, 13).map(card).join("") + "</div>" +
      (A.length > 13 ? '<div style="text-align:center;margin-top:18px"><button class="btn" type="button" id="qsMore">' + L({ bn: "আরও পর্ব দেখুন", en: "More episodes", ar: "مزيد من الحلقات" }) + " (" + h.num(A.length - 13) + ")</button></div>" : "") +
      "</div></div></section>";
    // the "more" button is wired in the after-hook
  }
  function wireMore() {
    var b = $("#qsMore"); if (!b) return;
    b.addEventListener("click", function () {
      var A = list("ask"), g = $("#qsGrid");
      function ep(v) { return v.ep ? L({ bn: "পর্ব ", en: "Episode ", ar: "الحلقة " }) + h.digits(v.ep) : ""; }
      g.insertAdjacentHTML("beforeend", A.slice(13).map(function (v) { return playBtn(v, "v2 qs-c", vthumb(v) + '<span class="qs-ep">' + h.digits(v.ep || "") + '</span><span class="v2-t">' + ep(v) + '</span><span class="v2-d">' + esc(h.fdate(v.date)) + "</span>"); }).join(""));
      b.parentNode.remove();
    });
  }

  /* ---------- About ---------- */
  P.about = function () {
    var Hm = C().home || {}, A = C().about || {}, ch = C().chairman || {};
    var Hs = (C().history || []).slice().sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
    var i0 = impactItem(0), i1 = impactItem(1), i2 = impactItem(2);
    var hero = photoHero("img/design-night-1.webp", U("nav_about"), T(Hm.aboutTitle), T(Hm.visionText), [[U("nav_about")]],
      '<div class="ph-cta"><a class="btn light" href="#activities">' + icon("book") + U("nav_activities") + '</a><a class="btn ghost-light" href="#project-ibjmc">' + icon("masjid") + U("nav_masjid_complex") + "</a></div>");
    var intro = sec('<div class="ab-intro"><div class="ab-txt rv"><span class="eyebrow">' + L({ bn: "আমাদের পরিচয়", en: "Who we are", ar: "من نحن" }) + '</span><h2 class="h-section">' + L({ bn: "কুরআন ও সুন্নাহর আলোকে জ্ঞান, দাওয়াহ ও সেবা", en: "Knowledge, Dawah and service in the light of the Qur'an and Sunnah", ar: "العلم والدعوة والخدمة في ضوء الكتاب والسنة" }) + "</h2><p>" + T(Hm.aboutText) + '</p><p class="muted">' + T(A.approach) + '</p><div class="ab-since"><span class="ic">' + icon("cal") + "</span><div><b>" + esc(h.fdate("2017-10-01")) + "</b><span>" + L({ bn: "আনুষ্ঠানিক কার্যক্রম শুরু", en: "Formal operations began", ar: "بدء العمل الرسمي" }) + "</span></div></div></div>" +
      '<div class="ab-col rv" aria-hidden="true"><img class="c1" src="' + im("img/chairman-speech.webp") + '" alt="" loading="lazy"><img class="c2" src="' + im("img/halaqa-class.webp") + '" alt="" loading="lazy"><img class="c3" src="' + im("img/winter-2024-distribution.webp") + '" alt="" loading="lazy"><span class="ab-badge"><b>' + h.num(225) + "</b>" + L({ bn: "পাইল সম্পন্ন", en: "piles completed", ar: "خازوقًا مكتملًا" }) + "</span></div></div>");
    var nums = sec('<div class="ab-nums">' + (i1 ? stat(i1.n, i1.suf, T(i1.label)) : "") + (i2 ? stat(i2.n, i2.suf, T(i2.label)) : "") + (i0 ? stat(i0.n, i0.suf, T(i0.label)) : "") + stat(h.pct("mosque"), "%", L({ bn: "মাসজিদের কাঠামো সম্পন্ন", en: "of the masjid structure built", ar: "من هيكل المسجد" })) + "</div>", "ab-nums-s");
    var mv = sec('<div class="ab-mv"><div class="ab-mv-c rv"><span class="ic">' + icon("globe") + '</span><span class="eyebrow">' + L({ bn: "ভিশন", en: "Vision", ar: "الرؤية" }) + "</span><p>" + T(Hm.visionText) + '</p></div><div class="ab-mv-c alt rv"><span class="ic">' + icon("check") + '</span><span class="eyebrow">' + L({ bn: "মিশন", en: "Mission", ar: "الرسالة" }) + "</span><p>" + T(A.mission) + "</p></div></div>" +
      '<div class="ab-vals">' + (A.values || []).map(function (v) { return '<div class="ab-val rv"><span class="ic">' + icon(v.icon) + "</span><b>" + T(v.title) + "</b><span>" + T(v.text) + "</span></div>"; }).join("") + "</div>");
    var work = sec('<div class="sec-head"><div><span class="eyebrow">' + L({ bn: "পাঁচটি ধারা", en: "Five streams", ar: "خمسة مسارات" }) + '</span><h2 class="h-section">' + L({ bn: "আমরা যা করি", en: "What we do", ar: "ما نقوم به" }) + '</h2></div><a class="btn sm" href="#activities">' + U("nav_activities") + h.ARROW + '</a></div><div class="ab-work">' + ST.map(function (s) { return '<a class="abw rv" href="#activity-' + s.k + '"><img src="' + im(s.img) + '" alt="" loading="lazy"><span class="abw-t"><span class="ic">' + icon(s.icon) + "</span><b>" + U("act_" + s.k) + "</b></span></a>"; }).join("") + "</div>");
    var film = '<section class="section tight"><div class="wrap"><div class="ab-film" id="abFilm"></div></div></section>';
    var journey = sec('<div class="sec-head"><div><span class="eyebrow">' + L({ bn: "পথচলা", en: "Our journey", ar: "مسيرتنا" }) + '</span><h2 class="h-section">' + U("history") + '</h2></div><a class="btn sm" href="#history">' + L({ bn: "পূর্ণ ইতিহাস", en: "Full history", ar: "التاريخ الكامل" }) + h.ARROW + '</a></div><ol class="ab-tl">' + Hs.map(function (x) { return '<li class="rv"><span class="d">' + esc(h.fdate(x.date)) + "</span><b>" + T(x.title) + "</b></li>"; }).join("") + "</ol>");
    var explore = [["mission", "nav_mission", "check"], ["history", "history", "cal"], ["chairman", "chairman_title", "user"], ["governance", "nav_governance", "doc"], ["sister-concerns", "nav_sisters", "school"], ["programs", "nav_programs", "education"]];
    var exp = sec('<h2 class="h-section">' + L({ bn: "আরও জানুন", en: "Learn more", ar: "اعرف المزيد" }) + '</h2><div class="ab-exp">' + explore.map(function (e) {
      var isCh = e[0] === "chairman";
      return '<a class="abx rv' + (isCh ? " ch" : "") + '" href="#' + e[0] + '">' + (isCh && ch.photo ? '<img src="' + im(ch.photo) + '" alt="" loading="lazy">' : '<span class="ic">' + icon(e[2]) + "</span>") + "<b>" + U(e[1]) + "</b>" + (isCh ? '<span class="muted">' + T(ch.name) + "</span>" : "") + h.ARROW + "</a>";
    }).join("") + "</div>");
    var cells = sec('<h2 class="h-section">' + U("cells") + '</h2><div class="ab-cells">' + (C().cells || []).map(function (c, i) { var ic = ["masjid", "school", "maktab", "dawah", "social", "studio", "home", "research"][i] || "doc"; return '<a class="abc rv" href="' + esc(c.link || "#") + '"><span class="ic">' + icon(ic) + "</span><b>" + T(c.name) + "</b><span>" + T(c.text) + "</span></a>"; }).join("") + "</div>");
    loadPL().then(function () {
      var el = $("#main #abFilm"); if (!el) return;
      var d = list("documentary"), v = d.filter(function (x) { return x.id === "np9M6nVfdjE"; })[0] || d[0];
      if (!v) { el.closest("section").remove(); return; }
      el.innerHTML = docFeature(v, L({ bn: "এক নজরে ইমাম বুখারী ট্রাস্ট", en: "Imam Bukhari Trust at a glance", ar: "الوقف في لمحة" })) + '<p style="margin-top:14px"><a class="btn sm" href="#documentaries">' + icon("video") + L({ bn: "সব ডকুমেন্টারি", en: "All documentaries", ar: "كل الأفلام الوثائقية" }) + h.ARROW + "</a></p>";
    });
    return hero + intro + nums + mv + work + film + journey + exp + cells;
  };

  /* ---------- count-up (final values already in markup) ---------- */
  function countUp(root) {
    if (!("IntersectionObserver" in window) || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        var el = e.target, n = +el.dataset.n, suf = el.dataset.suf || "", t0 = null;
        if (!n || n < 10) return;
        function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1200), v = Math.round(n * (1 - Math.pow(1 - p, 3))); el.textContent = h.num(v) + suf; if (p < 1) requestAnimationFrame(step); }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    $$(".ns [data-n]", root).forEach(function (el) { io.observe(el); });
  }

  /* ---------- placements ---------- */
  IBT.afterHooks.push(function (route) {
    var main = $("#main"); if (!main) return;
    if (route === "activities" || route === "about") countUp(main);
    if (/^activity-/.test(route)) {
      var k = route.slice(9);
      if (SUBVID[k] && !$("#main #relVid")) {
        var html = sec('<div class="sec-head"><div><span class="eyebrow">YouTube</span><h2 class="h-section">' + L({ bn: "সংশ্লিষ্ট ভিডিও", en: "Related videos", ar: "فيديوهات ذات صلة" }) + '</h2></div><a class="btn sm" href="#media">' + U("nav_videos") + h.ARROW + '</a></div><div class="v2-rail" id="relVid" tabindex="0" role="region" aria-label="' + esc(L({ bn: "সংশ্লিষ্ট ভিডিও", en: "Related videos", ar: "فيديوهات ذات صلة" })) + '"></div>');
        var spot = $("#main #prgSpot"); spot = spot && spot.closest("section");
        if (spot) spot.insertAdjacentHTML("beforebegin", html); else main.insertAdjacentHTML("beforeend", html);
        relatedVideos(k);
      }
    }
    if (route === "ask" && !$("#main #askSeries")) {
      loadPL().then(function () {
        if (h.state.route !== "ask" || $("#main #askSeries")) return;
        var hero = $("#main .ask-hero"), s = askSeries(); if (!s) return;
        if (hero) hero.insertAdjacentHTML("afterend", s); else $("#main").insertAdjacentHTML("afterbegin", s);
        wireMore();
      });
    }
    if (route === "media" && !$("#main #mDocs")) {
      var st = $$("#main [data-story]")[0], stSec = st && st.closest("section");
      loadPL().then(function () {
        if (h.state.route !== "media" || $("#main #mDocs")) return;
        var D = list("documentary"); if (!D.length) return;
        var html = '<section class="section tight" id="mDocs"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">' + L({ bn: "প্লেলিস্ট", en: "Playlist", ar: "قائمة تشغيل" }) + '</span><h2 class="h-section">' + U("nav_docs") + '</h2></div><a class="btn sm" href="#documentaries">' + L({ bn: "সব ডকুমেন্টারি", en: "All documentaries", ar: "كل الأفلام الوثائقية" }) + " (" + h.num(D.length) + ")" + h.ARROW + '</a></div><div class="v2-grid">' + D.slice(0, 8).map(dcard).join("") + "</div></div></section>";
        if (stSec) {
          stSec.insertAdjacentHTML("beforebegin", html);
          var hd = stSec.querySelector(".h-section"); if (hd) hd.textContent = L({ bn: "ইন্টারঅ্যাক্টিভ গল্প", en: "Interactive stories", ar: "قصص تفاعلية" });
        } else {
          var ph = $("#main .page-hero"); if (ph) ph.insertAdjacentHTML("afterend", html);
        }
      });
    }
  });
  loadPL();
})();
