/* IBT v14: information from IBT's project documents (facts, interiors, reasons, funding, sponsorship,
   South Asian significance, Kulliyatul Quran details, Darul Hadith madrasah). */
(function () {
  "use strict";
  var IBT = window.IBT, h = IBT.H;
  var $ = h.$, $$ = h.$$, esc = h.esc, tr = h.tr, T = h.T, U = h.U, icon = h.icon, C = h.C;
  function L(o) { return tr(o); }
  function sec(inner, cls, id) { return '<section class="section tight' + (cls ? " " + cls : "") + '"' + (id ? ' id="' + id + '"' : "") + '><div class="wrap">' + inner + "</div></section>"; }
  function head(eb, title, lead, side) { return '<div class="sec-head"><div>' + (eb ? '<span class="eyebrow">' + eb + "</span>" : "") + '<h2 class="h-section">' + title + "</h2>" + (lead ? '<p class="muted" style="max-width:66ch;margin:6px 0 0">' + lead + "</p>" : "") + "</div>" + (side || "") + "</div>"; }
  function im(s) { return esc(h.img(s)); }
  function tk(n) { // taka, in lakh / crore words
    var bn = lang() === "bn";
    if (n >= 10000000) return h.digits(String(+(n / 10000000).toFixed(2))) + (bn ? " কোটি টাকা" : " crore BDT");
    if (n >= 100000) return h.digits(String(+(n / 100000).toFixed(2))) + (bn ? " লাখ টাকা" : " lakh BDT");
    return (bn ? "৳ " : "BDT ") + h.num(n);
  }
  function lang() { return (h.state && h.state.lang) || "bn"; }
  function crore(n) { return h.digits(String(n)) + " " + L({ bn: "কোটি", en: "crore", ar: "كرور" }); }

  /* ---------- masjid complex & academic campus ---------- */
  function factsBlock(I) {
    function col(kind, title, ic) {
      return '<div class="fx-c rv"><div class="fx-h"><span class="ic">' + icon(ic) + "</span><b>" + title + '</b></div><dl class="fx-l">' + (I.facts[kind] || []).map(function (f) { return "<div><dt>" + T(f[0]) + "</dt><dd>" + T(f[1]) + "</dd></div>"; }).join("") + "</dl></div>";
    }
    return sec(head(L({ bn: "এক নজরে", en: "At a glance", ar: "في لمحة" }), L({ bn: "প্রকল্পের বিবরণ", en: "Project description", ar: "وصف المشروع" }), T(I.dream)) +
      '<div class="fx">' + col("mosque", L({ bn: "ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স", en: "Imam Bukhari Jame Masjid Complex", ar: "مجمع جامع الإمام البخاري" }), "masjid") + col("academic", L({ bn: "আইবিটি একাডেমিক কমপ্লেক্স", en: "IBT Academic Complex", ar: "المجمع الأكاديمي" }), "school") +
      '<div class="fx-c fx-loc rv"><div class="fx-h"><span class="ic">' + icon("pin") + "</span><b>" + L({ bn: "অবস্থান", en: "Location", ar: "الموقع" }) + '</b></div><ul class="fx-pins">' + (I.location || []).map(function (x) { return "<li>" + icon("arrow") + T(x) + "</li>"; }).join("") + '</ul><a class="btn sm" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent("New Dhaka City Palashpur Dhaka Mawa Expressway") + '" target="_blank" rel="noopener">' + icon("pin") + "Google Maps" + icon("ext") + "</a></div></div>", "fx-sec");
  }
  function interiors(I) {
    var tabs = [["mosque", L({ bn: "মাসজিদ কমপ্লেক্স", en: "Masjid complex", ar: "مجمع المسجد" })], ["academic", L({ bn: "একাডেমিক ক্যাম্পাস", en: "Academic campus", ar: "الحرم الأكاديمي" })]];
    function grid(k) { return '<div class="ig" data-ig="' + k + '"' + (k === "mosque" ? "" : " hidden") + ">" + (I.interiors[k] || []).map(function (x, i) { return '<figure class="' + (i === 0 ? "big" : "") + '"><img src="' + im(x[0]) + '" alt="' + esc(L(x[1])) + '" loading="lazy"><figcaption>' + T(x[1]) + "</figcaption></figure>"; }).join("") + "</div>"; }
    return sec(head(L({ bn: "৩ডি নকশা", en: "3D design", ar: "تصميم ثلاثي الأبعاد" }), L({ bn: "ভেতরের নকশা", en: "Inside the buildings", ar: "من الداخل" }), "", '<div class="seg ig-tabs" role="tablist">' + tabs.map(function (t, i) { return '<button type="button" role="tab" aria-selected="' + (i === 0) + '" data-igt="' + t[0] + '">' + t[1] + "</button>"; }).join("") + "</div>") + grid("mosque") + grid("academic"));
  }
  function why(I) {
    return sec(head(L({ bn: "কেন এই মাসজিদ", en: "Why this masjid", ar: "لماذا هذا المسجد" }), L({ bn: "শুধু সালাতের জায়গা নয়, একটি পূর্ণাঙ্গ কমিউনিটি কেন্দ্র", en: "Not only a place of prayer, a complete community centre", ar: "ليس مكانًا للصلاة فقط بل مركزًا مجتمعيًا متكاملًا" })) +
      '<div class="wy">' + (I.why || []).map(function (w, i) { return '<div class="wy-c rv"><span class="wy-n" aria-hidden="true" data-n="' + h.digits(String(i + 1).padStart(2, "0")) + '"></span><span class="ic">' + icon(w[0]) + "</span><b>" + T(w[1]) + "</b><p>" + T(w[2]) + "</p></div>"; }).join("") + "</div>");
  }
  function timeline(I) {
    return sec(head(L({ bn: "নির্মাণ পরিকল্পনা", en: "Construction plan", ar: "خطة البناء" }), L({ bn: "কী হয়েছে, কী চলছে, কী বাকি", en: "Done, under way, and still to come", ar: "ما أُنجز وما يجري وما تبقّى" })) +
      '<ol class="ct">' + (I.timeline || []).map(function (t) { return '<li class="ct-i ' + esc(t.status) + ' rv"><div class="ct-ph"><img src="' + im(t.img) + '" alt="" loading="lazy"><span class="ct-when">' + T(t.when) + '</span></div><div class="ct-b"><span class="chip ' + (t.status === "done" ? "" : t.status === "progress" ? "gold" : "muted") + '"><span class="dot"></span>' + U("status_" + (t.status === "planned" ? "planned" : t.status)) + "</span><b>" + T(t.title) + "</b>" + (t.items.length ? '<ul class="check">' + t.items.map(function (x) { return "<li>" + T(x) + "</li>"; }).join("") + "</ul>" : "") + "</div></li>"; }).join("") + "</ol>");
  }
  function funding(I, compact) {
    var F = I.funding || {}; if (!F.total) return "";
    var tot = F.total + F.done, pct = Math.round(F.done / tot * 100);
    var cards = '<div class="fu">' +
      '<div class="fu-c done"><span>' + L({ bn: "সম্পন্ন কাজ", en: "Work completed", ar: "أعمال منجزة" }) + "</span><b>" + L({ bn: "প্রায় ", en: "about ", ar: "نحو " }) + crore(F.done) + "</b></div>" +
      '<div class="fu-c"><span>' + L({ bn: "মাসজিদ কমপ্লেক্সে প্রয়োজন", en: "Needed for the masjid complex", ar: "المطلوب لمجمع المسجد" }) + "</span><b>" + crore(F.mosque) + "</b></div>" +
      '<div class="fu-c"><span>' + L({ bn: "একাডেমিক ক্যাম্পাসে প্রয়োজন", en: "Needed for the academic campus", ar: "المطلوب للحرم الأكاديمي" }) + "</span><b>" + crore(F.academic) + "</b></div>" +
      '<div class="fu-c tot"><span>' + L({ bn: "মোট বাকি", en: "Total remaining", ar: "إجمالي المتبقي" }) + "</span><b>" + crore(F.total) + "</b></div></div>" +
      '<div class="fu-bar" role="img" aria-label="' + pct + '%"><i style="width:' + Math.max(pct, 3) + '%"></i></div><p class="faint fu-note">' + T(F.note) + "</p>";
    if (compact) return cards;
    return sec(head(L({ bn: "অর্থায়ন", en: "Funding", ar: "التمويل" }), L({ bn: "প্রকল্প সম্পন্ন করতে যা প্রয়োজন", en: "What it takes to complete the project", ar: "ما يلزم لإتمام المشروع" }), "", '<a class="btn primary" href="#donate">' + icon("heart") + U("donate") + "</a>") + cards + '<p class="muted" style="margin-top:10px">' + icon("check") + " " + T((I.sponsor || {}).note) + "</p>", "fu-sec");
    var S = I.sponsor || {};
    function list(k, title, ic) { return '<div class="sp-c"><div class="fx-h"><span class="ic">' + icon(ic) + "</span><b>" + title + '</b></div><ul class="sp-l">' + (S[k] || []).map(function (x) { return "<li><span>" + T(x[0]) + "</span><b>" + tk(x[1]) + "</b></li>"; }).join("") + "</ul></div>"; }
    return sec(head(L({ bn: "অর্থায়ন", en: "Funding", ar: "التمويل" }), L({ bn: "প্রকল্প সম্পন্ন করতে যা প্রয়োজন", en: "What it takes to complete the project", ar: "ما يلزم لإتمام المشروع" }), "", '<a class="btn primary" href="#donate">' + icon("heart") + U("donate") + "</a>") + cards +
      '<h3 class="sub-h">' + L({ bn: "যে অংশের দায়িত্ব নিতে পারেন", en: "What you can sponsor", ar: "ما يمكنك كفالته" }) + '</h3><div class="sp">' + list("mosque", L({ bn: "মাসজিদ কমপ্লেক্স", en: "Masjid complex", ar: "مجمع المسجد" }), "masjid") + list("academic", L({ bn: "একাডেমিক ক্যাম্পাস", en: "Academic campus", ar: "الحرم الأكاديمي" }), "school") + '</div><p class="muted" style="margin-top:12px">' + icon("check") + " " + T(S.note) + "</p>", "fu-sec");
  }
  function southAsia(I, teaser) {
    var S = I.southAsia; if (!S) return "";
    var pts = teaser ? S.points.slice(0, 4) : S.points;
    return '<section class="section sa-sec"><div class="wrap"><div class="sa rv"><div class="sa-l"><span class="eyebrow">' + L({ bn: "দক্ষিণ এশিয়ার প্রেক্ষাপট", en: "The South Asian context", ar: "سياق جنوب آسيا" }) + '</span><h2 class="h-section">' + L({ bn: "কেন এই প্রকল্প গুরুত্বপূর্ণ", en: "Why this project matters", ar: "لماذا هذا المشروع مهم" }) + '</h2><div class="sa-big"><b>' + h.digits("60") + L({ bn: " কোটি+", en: "0M+", ar: "0 مليون+" }) + "</b><span>" + L({ bn: "মুসলিম দক্ষিণ এশিয়ায়", en: "Muslims in South Asia", ar: "مسلم في جنوب آسيا" }) + "</span></div><p>" + T(S.lead) + "</p>" + (teaser ? '<a class="btn light" href="#project-ibjmc">' + L({ bn: "প্রকল্পটি দেখুন", en: "See the project", ar: "اطلع على المشروع" }) + h.ARROW + "</a>" : '<p class="sa-close">' + T(S.close) + "</p>") + '</div><div class="sa-r">' + pts.map(function (p) { return '<div class="sa-p"><span class="ic">' + icon(p[0]) + "</span><div><b>" + T(p[1]) + "</b><span>" + T(p[2]) + "</span></div></div>"; }).join("") + "</div></div></div></section>";
  }

  /* ---------- Kulliyatul Quran ---------- */
  function kqBlocks() {
    var K = C().kqInfo; if (!K) return "";
    return sec('<div class="kq-vm"><div class="kq-v rv"><span class="eyebrow">' + L({ bn: "ভিশন", en: "Vision", ar: "الرؤية" }) + "</span><p>" + T(K.vision) + '</p></div><div class="kq-m rv"><span class="eyebrow">' + L({ bn: "মিশন", en: "Mission", ar: "الرسالة" }) + '</span><ul class="check">' + K.mission.map(function (m) { return "<li>" + T(m) + "</li>"; }).join("") + "</ul></div></div>") +
      sec(head(L({ bn: "কুল্লিয়াতুল কুরআন", en: "Kulliyatul Qur'an", ar: "كلية القرآن" }), L({ bn: "কেন কুল্লিয়াতুল কুরআন", en: "Why Kulliyatul Qur'an", ar: "لماذا كلية القرآن" })) + '<div class="wy">' + K.why.map(function (w, i) { return '<div class="wy-c rv"><span class="wy-n" aria-hidden="true" data-n="' + h.digits(String(i + 1).padStart(2, "0")) + '"></span><span class="ic">' + icon(w[0]) + "</span><b>" + T(w[1]) + "</b><p>" + T(w[2]) + "</p></div>"; }).join("") + "</div>") +
      sec('<div class="kq-3"><div class="kq-b rv"><h3>' + L({ bn: "চলমান কার্যক্রম (অস্থায়ী ভাড়া করা ক্যাম্পাসে)", en: "Running programmes (temporary rented premises)", ar: "البرامج الجارية (مقر مؤقت مستأجر)" }) + '</h3><ul class="check">' + K.running.map(function (x) { return "<li>" + T(x) + "</li>"; }).join("") + '</ul></div><div class="kq-b rv"><h3>' + L({ bn: "যেসব বিশ্ববিদ্যালয়ের সাথে MOU করার পরিকল্পনা", en: "Universities planned for MOUs", ar: "جامعات مخطط لإبرام مذكرات تفاهم معها" }) + '</h3><ul class="kq-u">' + K.mou.map(function (x) { return '<li lang="en">' + esc(x) + "</li>"; }).join("") + '</ul></div><div class="kq-b rv"><h3>' + L({ bn: "কুল্লিয়্যাহর প্রস্তাবিত বিভাগ", en: "Recommended departments of the Kulliyyah", ar: "الأقسام المقترحة للكلية" }) + '</h3><div class="kq-d">' + K.depts.map(function (x) { return '<span lang="en">' + esc(x) + "</span>"; }).join("") + "</div></div></div>");
  }
  function darulHadith() {
    var D = C().darulHadith; if (!D) return "";
    return '<article class="dh rv"><span class="dh-ic">' + icon("school") + '</span><div><span class="chip warn"><span class="dot"></span>' + U("status_proposed") + "</span><h3>" + T(D.name) + "</h3><p>" + T(D.text) + '</p><div class="kq-d">' + D.subjects.map(function (x) { return "<span>" + T(x) + "</span>"; }).join("") + "</div></div></article>";
  }

  /* ---------- reveal for parts added after the page was drawn ----------
     app.js starts its reveal observer before the page hooks run, so anything added later
     (verses, project facts, Q&A series ...) stayed transparent. Watch #main and reveal those too. */
  (function () {
    var main = document.getElementById("main"); if (!main || !window.MutationObserver) return;
    var nomo = document.documentElement.classList.contains("nomotion") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
    var io = !nomo && "IntersectionObserver" in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.08 }) : null;
    function scan(root) {
      var list = [];
      if (root.classList && root.classList.contains("rv")) list.push(root);
      if (root.querySelectorAll) list = list.concat([].slice.call(root.querySelectorAll(".rv:not(.in)")));
      list.forEach(function (el) { if (el.classList.contains("in")) return; if (io) io.observe(el); else el.classList.add("in"); });
    }
    new MutationObserver(function (ms) { ms.forEach(function (m) { [].forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) scan(n); }); }); }).observe(main, { childList: true, subtree: true });
    IBT.afterHooks.push(function () { scan(main); });
    // safety net: anything still hidden a moment after it is on screen becomes visible
    setInterval(function () { [].forEach.call(main.querySelectorAll(".rv:not(.in)"), function (el) { var r = el.getBoundingClientRect(); if (r.top < innerHeight) el.classList.add("in"); }); }, 1500);
  })();

  /* ---------- placements ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-igt]"); if (!b) return;
    var box = b.closest("section"); if (!box) return;
    $$("[data-igt]", box).forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
    $$("[data-ig]", box).forEach(function (g) { g.hidden = g.dataset.ig !== b.dataset.igt; });
  });
  IBT.afterHooks.push(function (route) {
    var main = $("#main"), I = C().ibjmcInfo; if (!main || !I) return;
    if ((route === "project-ibjmc" || route === "academic-building") && !$("#main .fx-sec")) {
      var tk0 = $("#main #tracker") || $$("#main section").slice(-1)[0];
      var dash = $("#main #dash"); if (dash) dash.remove();
      var html = factsBlock(I) + interiors(I) + why(I) + timeline(I) + southAsia(I, false);
      if (tk0) tk0.insertAdjacentHTML("afterend", html); else main.insertAdjacentHTML("beforeend", html);
      var sr = $("#main .support-row"); sr = sr && sr.closest("section");
      if (sr) sr.insertAdjacentHTML("beforebegin", funding(I)); else { var sa = $("#main .sa-sec"); if (sa) sa.insertAdjacentHTML("beforebegin", funding(I)); }
    }
    if (route === "projects" && !$("#main .fu")) {
      var now = $("#main .pj-now"); if (now) now.insertAdjacentHTML("afterend", '<div class="pj-fund rv">' + funding(I, true) + "</div>");
      var prop = $("#main #pj-prop .wrap"); if (prop) prop.insertAdjacentHTML("beforeend", darulHadith());
      else { var pl = $("#main #pj-plan"); if (pl) pl.insertAdjacentHTML("afterend", sec(darulHadith())); }
    }
    if (route === "home" && !$("#main .sa-sec")) {
      var v2 = $("#main .vq-home2") || ($("#main .causes") && $("#main .causes").closest("section"));
      if (v2) v2.insertAdjacentHTML("beforebegin", southAsia(I, true));
    }
    if (route === "inst-kulliyatul-quran" && !$("#main .kq-vm")) {
      var body = $("#main .prose"); body = body && body.closest("section");
      if (body) body.insertAdjacentHTML("afterend", kqBlocks()); else main.insertAdjacentHTML("beforeend", kqBlocks());
    }
  });
})();
