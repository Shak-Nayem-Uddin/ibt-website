/* IBT v11: sister concerns, social-welfare programmes, programme & course archive
   (titles and dates only, from data/programs.json), chairman designation. */
(function () {
  "use strict";
  var IBT = window.IBT, h = IBT.H, P = IBT.P;
  var $ = h.$, $$ = h.$$, esc = h.esc, tr = h.tr, T = h.T, U = h.U, icon = h.icon, C = h.C;
  function L(o) { return tr(o); }
  function head(eyebrow, title, lead, crumbs) { return h.pageHead(eyebrow, title, lead, h.crumbs(crumbs)); }
  function sec(inner, cls) { return '<section class="section tight' + (cls ? " " + cls : "") + '"><div class="wrap">' + inner + "</div></section>"; }
  var ext = ' target="_blank" rel="noopener"';

  /* ---------- programme data (loaded once) ---------- */
  var PROG = null, progReq = null;
  function loadPrograms() {
    if (progReq) return progReq;
    progReq = fetch("data/programs.json?v=1").then(function (r) { return r.json(); }).then(function (d) { PROG = (d || []).slice().sort(function (a, b) { return b.d.localeCompare(a.d); }); return PROG; }, function () { PROG = []; return PROG; });
    return progReq;
  }
  var KIND = {
    "Halaqa": { bn: "হালাকা", en: "Halaqa", ar: "حلقة" },
    "Course": { bn: "কোর্স", en: "Course", ar: "دورة" },
    "Workshop": { bn: "কর্মশালা", en: "Workshop", ar: "ورشة" },
    "Training": { bn: "প্রশিক্ষণ", en: "Training", ar: "تدريب" },
    "Seminar": { bn: "সেমিনার", en: "Seminar", ar: "ندوة" },
    "Conference": { bn: "কনফারেন্স", en: "Conference", ar: "مؤتمر" },
    "Special Program": { bn: "বিশেষ আয়োজন", en: "Special programme", ar: "برنامج خاص" }
  };
  var KICON = { "Halaqa": "dawah", "Course": "education", "Workshop": "research", "Training": "research", "Seminar": "research", "Conference": "research", "Special Program": "family" };
  function kindLabel(k) { return L(KIND[k] || { bn: k, en: k, ar: k }); }
  function progRow(p) {
    return '<li class="prg"><span class="prg-d">' + esc(h.fdate(p.d)) + (p.e && p.e !== p.d ? " – " + esc(h.fdate(p.e)) : "") + '</span><span class="prg-k k-' + esc((p.k || "").split(" ")[0].toLowerCase()) + '">' + icon(KICON[p.k] || "doc") + esc(kindLabel(p.k)) + '</span><b class="prg-t" lang="' + (/[ঀ-৿]/.test(p.t) ? "bn" : "en") + '">' + esc(p.t) + "</b></li>";
  }
  function progList(list, more) { return '<ol class="prg-list">' + list.map(progRow).join("") + "</ol>" + (more ? '<p style="margin-top:14px"><a class="btn sm" href="#programs">' + U("nav_programs") + h.ARROW + "</a></p>" : ""); }
  function fill(sel, fn) { loadPrograms().then(function () { var el = $(sel); if (el) el.innerHTML = fn(PROG); }); }

  P.programs = function () {
    setTimeout(function () { loadPrograms().then(drawArchive); }, 0);
    return head(U("nav_resources"), U("nav_programs"), L({ bn: "২০২২ সাল থেকে ইমাম বুখারী ট্রাস্টের আয়োজিত হালাকা, কোর্স, কর্মশালা, সেমিনার ও বিশেষ আয়োজনের তালিকা।", en: "Halaqas, courses, workshops, seminars and special programmes organised by Imam Bukhari Trust since 2022.", ar: "الحلقات والدورات والورش والندوات والبرامج الخاصة التي نظمها الوقف منذ 2022." }), [[U("nav_resources")], [U("nav_programs")]]) +
      sec('<div id="prgStats" class="prg-stats"></div><div class="prg-tools"><div class="seg" role="group" id="prgKinds"></div><label class="prg-y"><select class="input" id="prgYear" aria-label="' + esc(L({ bn: "বছর", en: "Year", ar: "السنة" })) + '"></select></label><input class="input" id="prgQ" type="search" placeholder="' + esc(L({ bn: "শিরোনাম দিয়ে খুঁজুন", en: "Search by title", ar: "ابحث بالعنوان" })) + '" aria-label="search"></div><div id="prgOut"><p class="muted">…</p></div>');
  };
  var F = { k: "", y: "", q: "" };
  function drawArchive() {
    var all = PROG || [], st = $("#prgStats"); if (!st) return;
    var cnt = function (k) { return all.filter(function (p) { return p.k === k; }).length; };
    var part = all.reduce(function (s, p) { return s + (p.n || 0); }, 0);
    var firstY = all.length ? all[all.length - 1].d.slice(0, 4) : "";
    st.innerHTML = [[h.num(all.length), L({ bn: "মোট আয়োজন", en: "programmes", ar: "برنامجًا" })], [h.num(cnt("Halaqa")), L({ bn: "হালাকা", en: "halaqas", ar: "حلقة" })], [h.num(cnt("Course")), L({ bn: "কোর্স", en: "courses", ar: "دورة" })], [h.num(cnt("Workshop") + cnt("Training") + cnt("Seminar") + cnt("Conference")), L({ bn: "কর্মশালা, প্রশিক্ষণ ও সেমিনার", en: "workshops, trainings and seminars", ar: "ورشة وتدريب وندوة" })], [h.num(Math.floor(part / 100) * 100) + "+", L({ bn: "রেকর্ডকৃত অংশগ্রহণ", en: "recorded participations", ar: "مشاركة مسجلة" })]]
      .map(function (x) { return '<div class="ps"><b>' + x[0] + "</b><span>" + esc(x[1]) + "</span></div>"; }).join("");
    var kinds = ["", "Halaqa", "Course", "Workshop", "Seminar", "Special Program"];
    $("#prgKinds").innerHTML = kinds.map(function (k) { return '<button type="button" data-pk="' + esc(k) + '" aria-pressed="' + (F.k === k) + '">' + esc(k ? kindLabel(k) : L({ bn: "সব", en: "All", ar: "الكل" })) + "</button>"; }).join("");
    var years = []; all.forEach(function (p) { var y = p.d.slice(0, 4); if (years.indexOf(y) < 0) years.push(y); });
    $("#prgYear").innerHTML = '<option value="">' + esc(L({ bn: "সব বছর", en: "All years", ar: "كل السنوات" })) + "</option>" + years.map(function (y) { return '<option value="' + y + '"' + (F.y === y ? " selected" : "") + ">" + h.digits(y) + "</option>"; }).join("");
    drawList(); void firstY;
  }
  function drawList() {
    var out = $("#prgOut"); if (!out) return;
    var q = F.q.trim().toLowerCase();
    var list = (PROG || []).filter(function (p) {
      var kk = F.k === "Workshop" ? ["Workshop", "Training"] : F.k === "Seminar" ? ["Seminar", "Conference"] : [F.k];
      return (!F.k || kk.indexOf(p.k) > -1) && (!F.y || p.d.slice(0, 4) === F.y) && (!q || p.t.toLowerCase().indexOf(q) > -1);
    });
    out.innerHTML = list.length ? '<p class="muted prg-n">' + h.num(list.length) + " " + esc(L({ bn: "টি আয়োজন", en: "programmes", ar: "برنامجًا" })) + "</p>" + progList(list) : '<p class="muted">' + esc(L({ bn: "কিছু পাওয়া যায়নি।", en: "Nothing found.", ar: "لا توجد نتائج." })) + "</p>";
  }
  document.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-pk]"); if (!b) return; F.k = b.dataset.pk; $$("#prgKinds button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); }); drawList(); });
  document.addEventListener("change", function (e) { if (e.target.id === "prgYear") { F.y = e.target.value; drawList(); } });
  document.addEventListener("input", function (e) { if (e.target.id === "prgQ") { F.q = e.target.value; drawList(); } });

  /* ---------- sister concerns ---------- */
  function sisterCard(s) {
    var logo = s.logo ? '<span class="sc-logo"><img src="' + esc(h.img(s.logo)) + '" alt="" loading="lazy"></span>' : '<span class="sc-logo mono" aria-hidden="true"><b>' + esc(s.mono || "") + "</b><small>" + esc(L(s.name)) + "</small></span>";
    var links = (s.url ? '<a class="btn sm primary" href="' + esc(s.url) + '"' + ext + ">" + icon("pin") + L({ bn: "ওয়েবসাইট", en: "Website", ar: "الموقع" }) + ' <span aria-hidden="true">↗</span></a>' : "") + (s.inst ? '<a class="btn sm" href="#inst-' + esc(s.inst) + '">' + L({ bn: "বিস্তারিত", en: "Details", ar: "التفاصيل" }) + "</a>" : "");
    return '<article class="sc">' + logo + '<div class="sc-b"><h3>' + T(s.name) + '</h3><p class="muted">' + T(s.text) + "</p>" + (links ? '<div class="sc-l">' + links + "</div>" : "") + "</div></article>";
  }
  function sisterSection(compact) {
    var S = C().sisters || []; if (!S.length) return "";
    var hd = compact === "page" ? "" : '<div class="sec-head"><div><span class="eyebrow">' + L({ bn: "একই লক্ষ্যে একসাথে", en: "One mission, together", ar: "رسالة واحدة معًا" }) + '</span><h2 class="h-section">' + U("nav_sisters") + "</h2></div>" + (compact ? '<a class="link-arrow" href="#sister-concerns">' + L({ bn: "সব দেখুন", en: "See all", ar: "عرض الكل" }) + h.ARROW + "</a>" : "") + "</div>";
    return '<section class="section tight sisters"><div class="wrap">' + hd + '<div class="sc-grid">' + S.map(sisterCard).join("") + "</div></div></section>";
  }
  P["sister-concerns"] = function () {
    return head(U("nav_about"), U("nav_sisters"), L({ bn: "ইমাম বুখারী ট্রাস্টের সাথে একই চেতনায় শিক্ষা, দাওয়াহ ও প্রকাশনায় কাজ করা প্রতিষ্ঠানসমূহ।", en: "Institutions working in the same spirit as Imam Bukhari Trust in education, Dawah and publishing.", ar: "مؤسسات تعمل بروح الوقف نفسها في التعليم والدعوة والنشر." }), [[U("nav_about"), "#about"], [U("nav_sisters")]]) + sisterSection("page");
  };

  /* ---------- social welfare ---------- */
  P["activity-welfare"] = function () {
    var W = C().welfareProgs || [];
    var stats = W.filter(function (w) { return w.stat; });
    return head(U("nav_activities"), U("act_welfare"), L({ bn: "সুন্নাহর আলোকে মানুষের পাশে: শীতবস্ত্র, ইফতার, বন্যা ত্রাণ ও পুনর্বাসন, কুরবানি, চিকিৎসা সহায়তা ও শিক্ষাবৃত্তি। লক্ষ্য আল্লাহর সন্তুষ্টি এবং ইসলামের সৌন্দর্য সমাজে দৃশ্যমান করা।", en: "Standing with people in the light of the Sunnah: winter clothing, iftar, flood relief and rehabilitation, qurbani, medical support and scholarships, seeking Allah's pleasure and making the beauty of Islam visible.", ar: "الوقوف مع الناس على هدي السنة: كسوة الشتاء والإفطار وإغاثة الفيضانات والأضاحي والدعم الطبي والمنح، ابتغاء مرضاة الله وإظهارًا لجمال الإسلام." }), [[U("nav_activities"), "#activities"], [U("act_welfare")]]) +
      (stats.length ? sec('<div class="wf-stats">' + stats.map(function (w) { return '<div class="wf-s"><span class="ic">' + icon(w.icon) + "</span><b>" + h.digits(w.stat) + "</b><span>" + T(w.statLabel) + "</span></div>"; }).join("") + "</div>") : "") +
      sec('<h2 class="h-section">' + L({ bn: "আমাদের সমাজকল্যাণ কার্যক্রম", en: "Our welfare programmes", ar: "برامجنا الاجتماعية" }) + '</h2><div class="wf-grid">' + W.map(function (w, i) {
        var media = w.image ? '<img src="' + esc(h.img(w.image)) + '" alt="' + esc(L(w.title)) + '" loading="lazy">' : '<span class="wf-art" aria-hidden="true">' + icon(w.icon) + "</span>";
        return '<article class="wf' + (i === 0 ? " wide" : "") + '"><div class="wf-m">' + media + (w.stat ? '<span class="wf-badge">' + h.digits(w.stat) + "</span>" : "") + '</div><div class="wf-b"><h3>' + T(w.title) + "</h3><p>" + T(w.text) + "</p>" + (w.fund ? '<a class="btn sm primary" href="#fund-' + esc(w.fund) + '">' + icon("heart") + L({ bn: "এই খাতে দান করুন", en: "Give to this cause", ar: "تبرع لهذا المجال" }) + "</a>" : "") + "</div></article>";
      }).join("") + "</div>") +
      sec('<div class="wf-cta"><div><h2 class="h-section" style="margin:0">' + L({ bn: "আপনিও পাশে থাকুন", en: "Stand with us", ar: "كن معنا" }) + '</h2><p class="muted" style="margin:6px 0 0">' + L({ bn: "যাকাত আলাদা হিসাবে রাখা হয় এবং শুধু শরিয়াহসম্মত খাতে ব্যয় হয়।", en: "Zakat is kept in a separate account and spent only on eligible categories.", ar: "تُحفظ الزكاة في حساب مستقل وتُصرف في مصارفها الشرعية فقط." }) + '</p></div><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn primary" href="#donate">' + icon("heart") + U("donate") + '</a><a class="btn" href="#fund-zakat">' + L({ bn: "যাকাত দিন", en: "Give zakat", ar: "أدِّ الزكاة" }) + "</a></div></div>");
  };

  /* ---------- count-up for the impact mosaic (final values are already in the markup) ---------- */
  function countUp(root) {
    if (!("IntersectionObserver" in window) || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        var el = e.target, n = +el.dataset.n, suf = el.dataset.suf || "", t0 = null;
        if (!n || n < 10) return;
        function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1300), v = Math.round(n * (1 - Math.pow(1 - p, 3))); el.textContent = h.num(v) + suf; if (p < 1) requestAnimationFrame(step); }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    $$("[data-n]", root).forEach(function (el) { io.observe(el); });
  }

  /* ---------- placements ---------- */
  IBT.afterHooks.push(function (route) {
    var main = $("#main"); if (!main) return;
    if (route === "home" && !$("#main .sisters")) {
      var at = $("#main .trans-band"); at = at && at.closest("section");
      if (at) at.insertAdjacentHTML("beforebegin", sisterSection(true)); else main.insertAdjacentHTML("beforeend", sisterSection(true));
    }
    if (route === "home") countUp(main);
    if (route === "about" && !$("#main .sisters")) main.insertAdjacentHTML("beforeend", sisterSection(false));
    if (route === "chairman") {
      var ch = C().chairman || {}, lead = $("#main .page-hero .lead");
      if (lead && ch.designation && !$("#main .ch-desig")) lead.insertAdjacentHTML("afterend", '<p class="ch-desig"><span class="chip">' + icon("education") + T(ch.designation) + "</span></p>");
    }
    var spots = {
      "inst-courses": ["Course", "Workshop", "Training", "Seminar"],
      "activity-education": ["Course", "Workshop", "Training"],
      "activity-dawah": ["Halaqa"],
      "activity-community": ["Special Program"]
    };
    if (spots[route] && !$("#main #prgSpot")) {
      var kinds = spots[route], isCourse = kinds[0] === "Course";
      var title = isCourse ? L({ bn: "সম্পন্ন কোর্স ও প্রশিক্ষণ", en: "Courses and trainings held", ar: "الدورات والتدريبات المنعقدة" }) : kinds[0] === "Halaqa" ? L({ bn: "সাম্প্রতিক হালাকা", en: "Recent halaqas", ar: "أحدث الحلقات" }) : L({ bn: "বিশেষ আয়োজন", en: "Special programmes", ar: "البرامج الخاصة" });
      main.insertAdjacentHTML("beforeend", sec('<h2 class="h-section">' + title + '</h2><div id="prgSpot"><p class="muted">…</p></div>'));
      fill("#prgSpot", function (all) { var l = all.filter(function (p) { return kinds.indexOf(p.k) > -1; }); return progList(isCourse ? l : l.slice(0, 10), true); });
    }
  });
})();
