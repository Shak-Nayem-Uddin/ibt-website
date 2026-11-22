/* IBT v8: institutional pages (about, mission, history, governance, activities, publications, transparency,
   privacy, terms), project dashboard, donation declaration upgrades, Uttara default for prayer times, SEO metadata. */
(function () {
  "use strict";
  var IBT = window.IBT, h = IBT.H, P = IBT.P;
  var $ = h.$, $$ = h.$$, esc = h.esc, tr = h.tr, T = h.T, U = h.U, Uraw = h.Uraw, icon = h.icon, C = h.C, st = h.state;
  function L(o) { return tr(o); }
  function head(eyebrow, title, lead, crumbs) { return h.pageHead(eyebrow, title, lead, h.crumbs(crumbs)); }
  function sec(inner, cls) { return '<section class="section tight' + (cls ? " " + cls : "") + '"><div class="wrap">' + inner + "</div></section>"; }
  function badge(status) {
    var m = { available: ["ok", Uraw("available")], pending: ["pend", Uraw("pending_approval")], notpub: ["pend", Uraw("not_published")] }[status] || ["pend", Uraw("pending_approval")];
    return '<span class="sbadge ' + m[0] + '">' + esc(m[1]) + "</span>";
  }
  function pendingNote(txt) { return '<div class="pnote">' + icon("info") + "<span>" + txt + "</span></div>"; }
  var ABOUT = function () { return [[U("nav_about"), "#about"]]; };

  /* ---------- About (overview) ---------- */
  P.about = function () {
    var Hm = C().home, A = C().about || {};
    return head(U("nav_about"), T(Hm.aboutTitle), T(Hm.visionText), [[U("nav_about")]]) +
      sec('<div class="split"><div class="prose"><p>' + T(Hm.aboutText) + '</p><p class="muted">' + T(A.approach) + '</p><div class="sublinks">' + IBT.NAVG[0][2].filter(function (c) { return c[0].charAt(0) !== "@"; }).slice(1).map(function (c) { return '<a class="btn sm" href="#' + c[0] + '">' + U(c[1]) + h.ARROW + "</a>"; }).join("") + '</div></div><div class="photo" style="aspect-ratio:4/3"><img src="' + esc(h.img(Hm.aboutImage)) + '" alt="' + esc(L(Hm.aboutTitle)) + '" loading="lazy"></div></div>') +
      valuesBlock() +
      sec('<h2 class="h-section">' + L({ bn: "প্রতিষ্ঠানের কাঠামো", en: "Institutional structure", ar: "الهيكل المؤسسي" }) + '</h2><p class="muted" style="max-width:70ch">' + L({ bn: "কার্যক্রমগুলো পাঁচ ভাগে সাজানো: মূল প্রাতিষ্ঠানিক কাজ, উন্নয়ন প্রকল্প, সামাজিক কার্যক্রম, সংশ্লিষ্ট শিক্ষাপ্রতিষ্ঠান এবং প্রস্তাবিত ভবিষ্যৎ উদ্যোগ।", en: "IBT's work falls into five groups: core institutional functions, development projects, social programmes, associated educational institutions and proposed future initiatives.", ar: "تنقسم أعمال الوقف إلى خمس مجموعات: الوظائف المؤسسية، ومشاريع التطوير، والبرامج الاجتماعية، والمؤسسات التعليمية، والمبادرات المستقبلية المقترحة." }) + "</p>" + structure()) +
      sec('<h2 class="h-section">' + U("cells") + '</h2><div class="grid g4" style="margin-top:16px">' + (C().cells || []).map(function (c) { return '<a class="card-s cellc" href="' + esc(c.link || "#") + '"><b>' + T(c.name) + "</b><span class=\"muted\">" + T(c.text) + "</span></a>"; }).join("") + "</div>");
  };
  function structure() {
    var g = [
      [L({ bn: "ক. মূল প্রাতিষ্ঠানিক কাজ", en: "A. Core functions", ar: "أ. الوظائف الأساسية" }), [["activity-education", "act_education"], ["activity-research", "act_research"], ["activity-dawah", "act_dawah"]]],
      [L({ bn: "খ. উন্নয়ন প্রকল্প", en: "B. Development projects", ar: "ب. مشاريع التطوير" }), [["project-ibjmc", "nav_masjid_complex"], ["academic-building", "nav_academic_bld"]]],
      [L({ bn: "গ. সামাজিক কার্যক্রম", en: "C. Social programmes", ar: "ج. البرامج الاجتماعية" }), [["activity-welfare", "act_welfare"], ["activity-community", "act_community"]]],
      [L({ bn: "ঘ. সংশ্লিষ্ট শিক্ষাপ্রতিষ্ঠান", en: "D. Associated institutions", ar: "د. المؤسسات التابعة" }), [["inst-kulliyatul-quran", "nav_kq"], ["institutions", "nav_other_inst"]]],
      [L({ bn: "ঙ. প্রস্তাবিত ভবিষ্যৎ উদ্যোগ", en: "E. Proposed future initiatives", ar: "هـ. المبادرات المستقبلية المقترحة" }), [["future", "nav_future"]]]];
    return '<div class="struct">' + g.map(function (x) { return '<div class="struct-c"><h3>' + x[0] + "</h3>" + x[1].map(function (l) { return '<a href="#' + l[0] + '">' + U(l[1]) + h.ARROW + "</a>"; }).join("") + "</div>"; }).join("") + "</div>";
  }
  function valuesBlock() {
    var A = C().about || {};
    return sec('<div class="mv"><div class="mv-c"><span class="eyebrow">' + L({ bn: "মিশন", en: "Mission", ar: "الرسالة" }) + "</span><p>" + T(A.mission) + "</p>" + "" + '</div><div class="mv-c"><span class="eyebrow">' + L({ bn: "ভিশন", en: "Vision", ar: "الرؤية" }) + "</span><p>" + T(C().home.visionText) + "</p></div></div>" +
      '<div class="vals">' + (A.values || []).map(function (v) { return '<div class="val"><span class="ic">' + icon(v.icon) + "</span><b>" + T(v.title) + "</b><span>" + T(v.text) + "</span></div>"; }).join("") + "</div>");
  }
  P.mission = function () {
    var A = C().about || {};
    return head(U("nav_about"), U("nav_mission"), "", ABOUT().concat([[U("nav_mission")]])) + valuesBlock() +
      sec('<h2 class="h-section">' + L({ bn: "লক্ষ্য ও উদ্দেশ্য", en: "Objectives", ar: "الأهداف" }) + '</h2><ol class="objs">' + (A.objectives || []).map(function (o) { return "<li>" + T(o) + "</li>"; }).join("") + "</ol>") +
      sec('<h2 class="h-section">' + L({ bn: "কর্মপদ্ধতি", en: "Our approach", ar: "منهجنا" }) + '</h2><p class="lead" style="max-width:70ch">' + T(A.approach) + "</p>");
  };
  P.history = function () {
    var Hs = (C().history || []).slice().sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
    return head(U("nav_about"), U("history"), L({ bn: "১ অক্টোবর ২০১৭ থেকে আজ পর্যন্ত গুরুত্বপূর্ণ ধাপগুলো।", en: "Key steps since 1 October 2017.", ar: "أهم المحطات منذ 1 أكتوبر 2017." }), ABOUT().concat([[U("history")]])) +
      sec('<ol class="htl">' + Hs.map(function (x) { return '<li><span class="d">' + esc(h.fdate(x.date)) + "</span><h3>" + T(x.title) + "</h3><p>" + T(x.text) + "</p></li>"; }).join("") + "</ol>");
  };
  P.governance = function () {
    var G = C().governance || {}, ch = C().chairman || {}, sch = C().scholars || [];
    return head(U("nav_about"), U("nav_governance"), T(G.intro), ABOUT().concat([[U("nav_governance")]])) +
      sec('<div class="gov"><a class="gov-c lead-c" href="#chairman"><img src="' + esc(h.img(ch.photo)) + '" alt="' + esc(L(ch.name)) + '" loading="lazy"><span><small>' + U("chairman_title") + "</small><b>" + T(ch.name) + "</b><span class=\"muted\">" + T(ch.role) + '</span></span></a></div>') +
      ((G.committee || []).length || h.canEdit() ? sec('<h2 class="h-section">' + L({ bn: "পরিচালনা কমিটি", en: "Management committee", ar: "لجنة الإدارة" }) + "</h2>" + ((G.committee || []).length ? '<div class="grid g3">' + G.committee.map(function (m) { return '<div class="card-s" style="padding:16px"><b>' + T(m.name) + '</b><div class="muted">' + T(m.role) + "</div></div>"; }).join("") + "</div>" : pendingNote(L({ bn: "পরিচালনা কমিটির সদস্যদের নাম ও পদবি কর্তৃপক্ষের অনুমোদনের পর এখানে প্রকাশ করা হবে।", en: "Names and roles of committee members will be published here once approved by the authority.", ar: "تُنشر أسماء أعضاء اللجنة ومناصبهم هنا بعد الاعتماد." })))) : "") +
      (sch.length ? sec('<h2 class="h-section">' + L({ bn: "একাডেমিক কমিটি (কুল্লিয়াতুল কুরআন)", en: "Academic committee (Kulliyatul Quran)", ar: "اللجنة الأكاديمية (كلية القرآن)" }) + '</h2><div class="grid g3" style="margin-top:14px">' + sch.map(function (m) { return '<div class="card-s" style="padding:16px"><b>' + T(m.name) + '</b><div class="muted">' + T(m.role || m.title || "") + "</div></div>"; }).join("") + "</div>") : "") +
      (function () {
        var pol = (G.policies || []).filter(function (p) { return p.status === "available" || h.canEdit(); }), reg = G.registrationStatus !== "pending";
        if (!pol.length && !reg && !h.canEdit()) return "";
        return sec('<h2 class="h-section">' + L(reg ? { bn: "নিবন্ধন ও নীতিমালা", en: "Registration and policies", ar: "التسجيل والسياسات" } : { bn: "নীতিমালা", en: "Policies", ar: "السياسات" }) + "</h2>" + (reg ? "<p>" + T(G.registration) + "</p>" : h.canEdit() ? pendingNote(L({ bn: "আইনগত নিবন্ধনের তথ্য অনুমোদিত নথি থেকে যুক্ত করা হবে (শুধু এডিটররা দেখছেন)।", en: "Registration details pending (visible to editors only).", ar: "بيانات التسجيل معلقة (للمحررين فقط)." })) : "") +
          '<div class="pol-list">' + pol.map(function (p) { return (p.link ? '<a class="pol-i" href="' + esc(p.link) + '">' : '<div class="pol-i">') + icon("doc") + "<b>" + T(p.name) + "</b>" + (p.status === "available" ? icon("arrow") : badge(p.status)) + (p.link ? "</a>" : "</div>"); }).join("") + "</div>");
      })()
  };

  /* ---------- Activities ---------- */
  var ACTS = {
    education: { icon: "education", inits: ["practical", "corporate", "women", "family"], inst: ["kulliyatul-quran", "model-madrasa", "after-school", "courses", "teachers-training"], text: { bn: "শিশু থেকে উচ্চশিক্ষা পর্যন্ত কুরআন-সুন্নাহভিত্তিক শিক্ষা: মডেল মাদরাসা, আফটার স্কুল, সানাবিয়্যাহ ও কুল্লিয়্যাহ, আরবি ভাষা ও বিভিন্ন কোর্স।", en: "Qur'an-and-Sunnah-based education from childhood to higher studies: model madrasa, after school, Sanabiyyah and Kulliyyah, Arabic and short courses.", ar: "تعليم قائم على الكتاب والسنة من الطفولة إلى الدراسات العليا." } },
    dawah: { icon: "dawah", inits: ["dawah", "nonmuslim", "digital"], text: { bn: "সাপ্তাহিক হালাকা, কনফারেন্স, প্রশিক্ষণ এবং ডিজিটাল মাধ্যমে বিশুদ্ধ দ্বীনের দাওয়াহ।", en: "Dawah through the weekly halaqa, conferences, trainings and digital media.", ar: "الدعوة عبر الحلقة الأسبوعية والمؤتمرات والدورات والإعلام الرقمي." } },
    research: { icon: "research", inits: ["research", "economy"], text: { bn: "সমসাময়িক বিষয়ে কুরআন-সুন্নাহভিত্তিক গবেষণা, সেমিনার ও নীতিনির্ধারণী সংলাপ।", en: "Qur'an-and-Sunnah-based research on contemporary issues, seminars and policy dialogue.", ar: "بحوث معاصرة في ضوء الكتاب والسنة وندوات وحوار سياسات." } },
    welfare: { icon: "social", inits: ["welfare"], funds: ["winter", "relief", "scholarship", "iftar"], text: { bn: "ত্রাণ, শীতবস্ত্র, ইফতার, শিক্ষাবৃত্তি ও দুর্যোগ-পরবর্তী পুনর্বাসন।", en: "Relief, winter clothing, iftar, scholarships and post-disaster rehabilitation.", ar: "الإغاثة وكسوة الشتاء والإفطار والمنح وإعادة التأهيل." } },
    community: { icon: "family", inits: ["community", "family"], text: { bn: "মাসজিদকে কেন্দ্র করে একটি দ্বীনি কমিউনিটি: পরিবার, যুবক ও প্রবীণদের জন্য কার্যক্রম।", en: "A dini community around the masjid: programmes for families, youth and elders.", ar: "مجتمع ديني حول المسجد: برامج للأسر والشباب وكبار السن." } }
  };
  P.activities = function () {
    return head(U("nav_activities"), U("nav_activities"), L({ bn: "ইমাম বুখারী ট্রাস্টের কাজ পাঁচটি ধারায়।", en: "IBT's work runs in five streams.", ar: "تسير أعمال الوقف في خمسة مسارات." }), [[U("nav_activities")]]) +
      sec('<div class="actgrid">' + Object.keys(ACTS).map(function (k) { return '<a class="act-c" href="#activity-' + k + '"><span class="ic">' + icon(ACTS[k].icon) + "</span><b>" + U("act_" + k) + "</b><span class=\"muted\">" + L(ACTS[k].text) + "</span>" + h.ARROW + "</a>"; }).join("") + "</div>");
  };
  Object.keys(ACTS).forEach(function (k) {
    P["activity-" + k] = function () {
      var a = ACTS[k], c = C();
      var inits = (a.inits || []).map(function (id) { return h.find(c.initiatives || [], id); }).filter(Boolean);
      var insts = (a.inst || []).map(function (id) { return h.find(c.institutions || [], id); }).filter(Boolean);
      var funds = (a.funds || []).map(function (id) { return h.find(c.funds || [], id); }).filter(Boolean);
      return head(U("nav_activities"), U("act_" + k), L(a.text), [[U("nav_activities"), "#activities"], [U("act_" + k)]]) +
        (insts.length ? sec('<h2 class="h-section">' + U("nav_institutions") + '</h2><div class="grid g3" style="margin-top:14px">' + insts.map(function (i) { return h.card({ href: "#inst-" + i.id, image: i.image, title: T(i.name), text: T(i.summary), chip: h.statusChip(i.status) }); }).join("") + "</div>") : "") +
        (inits.length ? sec('<h2 class="h-section">' + L({ bn: "উদ্যোগ", en: "Initiatives", ar: "المبادرات" }) + '</h2><div class="grid g3" style="margin-top:14px">' + inits.map(function (i) { return h.card({ href: "#init-" + i.id, image: i.image, title: T(i.name), text: T(i.summary) }); }).join("") + "</div>") : "") +
        (funds.length ? sec('<h2 class="h-section">' + U("nav_funds") + '</h2><div class="grid g4" style="margin-top:14px">' + funds.map(function (f) { return h.card({ href: "#fund-" + f.id, image: f.image, title: T(f.name), text: T(f.tagline || "") }); }).join("") + "</div>") : "");
    };
  });

  /* ---------- Projects: academic alias + dashboard ---------- */
  P["academic-building"] = function () { IBT._focusAcademic = true; return P.project("ibjmc"); };
  function dashboard() {
    var F = C().floors || {}, M = C().milestones || [];
    function card(kind, label) {
      var l = F[kind] || [], done = l.filter(function (f) { return f.status === "done"; }).length - 1;
      return '<div class="pcard"><div class="pcard-top">' + h.pctRing(kind, "lg") + '<div><b>' + label + '</b><span class="muted">' + T((F.headline || {})[kind]) + '</span></div></div><div class="pbar"><i style="width:' + h.pct(kind) + '%"></i></div><div class="steps">' + l.map(function (f) { return '<i class="' + f.status + '" title="' + esc(L(f.label)) + '"></i>'; }).join("") + '</div><div class="pcard-f"><span>' + L({ bn: "ফাউন্ডেশন", en: "Foundation", ar: "الأساسات" }) + ": <b>" + U("status_" + ((l[0] || {}).status || "planned")) + "</b></span><span>" + L({ bn: "তলা সম্পন্ন", en: "Floors complete", ar: "طوابق مكتملة" }) + ": <b>" + h.num(Math.max(0, done + (((l[0] || {}).status === "done") ? 0 : 1))) + " / " + h.num(l.length - 1) + "</b></span></div></div>";
    }
    var piles = '<div class="pcard"><div class="pcard-top"><span class="pring lg" style="--p:100" role="img" aria-label="100%"><b>' + h.digits(100) + '<small>%</small></b></span><div><b>' + L({ bn: "পাইলিং", en: "Piling", ar: "الخوازيق" }) + '</b><span class="muted">' + L({ bn: "২২৫টি পাইল সম্পন্ন (মাসজিদ ও একাডেমিক ভবন)", en: "All 225 piles completed (masjid and academic building)", ar: "اكتمال 225 خازوقًا (المسجد والمبنى الأكاديمي)" }) + '</span></div></div><div class="pbar"><i style="width:100%"></i></div></div>';
    return '<section class="section tight" id="dash"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">' + L({ bn: "অগ্রগতি", en: "Progress", ar: "التقدم" }) + " · " + esc(h.fdate((F.asOf || "2026-11"))) + '</span><h2 class="h-section">' + L({ bn: "নির্মাণ অগ্রগতি এক নজরে", en: "Construction progress at a glance", ar: "تقدم البناء في لمحة" }) + '</h2></div></div>' +
      '<div class="pcards">' + card("mosque", U("masjid")) + card("academic", U("academic_bld")) + piles + "</div>" +
      '<h3 style="margin-top:30px">' + L({ bn: "মাইলফলক", en: "Milestones", ar: "المعالم" }) + '</h3><ol class="mst">' + M.map(function (m) { return '<li class="' + m.status + '"><span class="d">' + (m.date ? esc(h.fdate(m.date)) : L({ bn: "আসন্ন", en: "Upcoming", ar: "قادم" })) + "</span>" + T(m.text).replace(/ ?\((?:IBT ক্যাটালগ ২০২৬|IBT Catalog 2026)\)| ?; IBT (?:ক্যাটালগ ২০২৬|Catalog 2026)/g, "") + "</li>"; }).join("") + "</ol></div></section>";
  }

  /* ---------- Publications & transparency ---------- */
  function docTable(cat) {
    var D = (C().transparencyDocs || []).filter(function (d) { return (!cat || d.cat === cat) && (d.status === "available" || h.canEdit()); });
    if (!D.length) return soon();
    return '<div class="tscroll"><table class="rtable"><thead><tr><th>' + L({ bn: "নথি", en: "Document", ar: "الوثيقة" }) + "</th><th>" + L({ bn: "সময়কাল", en: "Period", ar: "الفترة" }) + "</th><th>" + L({ bn: "প্রকাশ", en: "Published", ar: "النشر" }) + "</th><th>" + L({ bn: "দায়িত্বপ্রাপ্ত", en: "Responsible", ar: "الجهة" }) + "</th><th>" + L({ bn: "অবস্থা", en: "Status", ar: "الحالة" }) + "</th><th></th></tr></thead><tbody>" +
      D.map(function (d) { return "<tr><td><b>" + T(d.title) + "</b></td><td>" + esc(h.digits(d.period || "—")) + "</td><td>" + (d.published ? esc(h.fdate(d.published)) : "—") + "</td><td>" + (d.authority ? T(d.authority) : "—") + "</td><td>" + badge(d.status) + "</td><td>" + (d.file ? '<a class="btn sm" href="' + esc(d.file) + '" target="_blank" rel="noopener">' + icon("doc") + "PDF</a>" : d.link ? '<a class="btn sm" href="' + esc(d.link) + '">' + L({ bn: "দেখুন", en: "View", ar: "عرض" }) + "</a>" : "") + "</td></tr>"; }).join("") + "</tbody></table></div>";
  }
  function soon() { return '<div class="soon">' + icon("doc") + "<span>" + L({ bn: "এই বিভাগের প্রতিবেদন প্রকাশিত হলে এখানে পাওয়া যাবে।", en: "Reports in this section will appear here once published.", ar: "ستظهر تقارير هذا القسم هنا عند نشرها." }) + "</span></div>"; }
  function finTable() {
    var F = C().finance || {};
    if (!h.canEdit() && !(F.rows || []).some(function (r) { return r.value; })) return "";
    return '<div class="tscroll"><table class="rtable"><thead><tr><th>' + L({ bn: "বিবরণ", en: "Item", ar: "البند" }) + "</th><th>" + L({ bn: "পরিমাণ (৳)", en: "Amount (BDT)", ar: "المبلغ (تاكا)" }) + "</th><th>" + L({ bn: "অবস্থা", en: "Status", ar: "الحالة" }) + "</th></tr></thead><tbody>" + (F.rows || []).map(function (r) { return "<tr><td>" + T(r) + '</td><td class="faint">—</td><td>' + badge("pending") + "</td></tr>"; }).join("") + "</tbody></table></div>" +
      pendingNote(L({ bn: "কোনো আর্থিক সংখ্যা অনুমান করে দেখানো হয় না। অনুমোদিত হিসাব ও নিরীক্ষিত প্রতিবেদন পাওয়া মাত্র অ্যাডমিন প্যানেল থেকে এগুলো প্রকাশ করা যাবে।", en: "No financial figure is estimated here. Approved accounts and audited reports can be published from the admin panel as soon as they are available.", ar: "لا تُعرض أرقام مالية تقديرية؛ تُنشر الحسابات المعتمدة والتقارير المدققة من لوحة الإدارة فور توفرها." }));
  }
  var TABS = [["transparency", "tr_accountability"], ["transparency-annual", "tr_annual"], ["transparency-financial", "tr_financial"], ["transparency-projects", "tr_projects"]];
  function trPage(route) {
    var tabs = '<div class="tabs trtabs" role="tablist">' + TABS.map(function (t) { return '<a role="tab" href="#' + t[0] + '" aria-selected="' + (t[0] === route) + '">' + U(t[1]) + "</a>"; }).join("") + "</div>";
    var body = route === "transparency-annual" ? docTable("annual") : route === "transparency-financial" ? finTable() + docTable("financial") : route === "transparency-projects" ? docTable("projects") :
      '<div class="acc"><div class="acc-c"><b>' + L({ bn: "খাতভিত্তিক দান", en: "Fund-specific giving", ar: "تبرع حسب المجال" }) + "</b><span>" + L({ bn: "প্রতিটি দান দাতার বেছে নেওয়া খাতে লিপিবদ্ধ হয় এবং সেই খাতেই ব্যয় হয়।", en: "Every gift is recorded against the cause the donor chose and spent on it.", ar: "يُسجل كل تبرع في المجال الذي اختاره المتبرع ويُصرف فيه." }) + '</span></div><div class="acc-c"><b>' + L({ bn: "রসিদ ও স্বীকৃতি", en: "Receipts", ar: "الإيصالات" }) + "</b><span>" + L({ bn: "দানের তথ্য জানালে দাতাকে রেফারেন্স নম্বরসহ মানি রিসিট পাঠানো হয়।", en: "Donors who declare a gift receive a money receipt with a reference number.", ar: "يتلقى المتبرع إيصالًا برقم مرجعي." }) + '</span></div><div class="acc-c"><b>' + L({ bn: "নির্মাণ অগ্রগতি", en: "Construction progress", ar: "تقدم البناء" }) + "</b><span>" + L({ bn: "ছবি ও তারিখসহ নিয়মিত হালনাগাদ প্রকাশিত হয়।", en: "Regular dated updates with photos are published.", ar: "تُنشر تحديثات منتظمة مؤرخة بالصور." }) + ' <a href="#project-ibjmc">' + L({ bn: "দেখুন", en: "View", ar: "عرض" }) + "</a></span></div></div>" + h.impactSection();
    return head(U("nav_transparency"), L({ bn: "স্বচ্ছতা ও জবাবদিহিতা", en: "Transparency & accountability", ar: "الشفافية والمساءلة" }), L({ bn: "কীভাবে দান ব্যবস্থাপনা করা হয়, অগ্রগতির হালনাগাদ এবং প্রকাশিত প্রতিবেদন এক জায়গায়।", en: "How gifts are managed, progress updates and published reports, in one place.", ar: "كيفية إدارة التبرعات وتحديثات التقدم والتقارير المنشورة في مكان واحد." }), [[U("nav_transparency"), "#transparency"]].concat(route === "transparency" ? [] : [[U(TABS.filter(function (t) { return t[0] === route; })[0][1])]])) +
      sec(tabs + '<div style="margin-top:18px">' + body + "</div>");
  }
  TABS.forEach(function (t) { P[t[0]] = function () { return trPage(t[0]); }; });
  P.publications = function () {
    var R = C().reports || [];
    return head(U("nav_resources"), U("nav_publications"), L({ bn: "ক্যাটালগ, প্রতিবেদন ও অন্যান্য প্রকাশনা।", en: "Catalogue, reports and other publications.", ar: "الكتالوج والتقارير والمنشورات الأخرى." }), [[U("nav_resources")], [U("nav_publications")]]) +
      sec('<div class="grid g2">' + R.map(function (r) { return '<div class="card-s pubc"><span class="ic">' + icon("doc") + "</span><div><b>" + T(r.title) + '</b><div class="muted">' + esc(h.digits(r.year || "")) + " " + T(r.text || "") + "</div></div>" + (r.file ? '<a class="btn sm primary" href="' + esc(r.file) + '" target="_blank" rel="noopener">PDF</a>' : "") + "</div>"; }).join("") + "</div>") + sec(docTable());
  };

  /* ---------- Privacy & terms (drafts pending management approval) ---------- */
  var DRAFT = function () { return '<p class="faint">' + L({ bn: "সর্বশেষ হালনাগাদ: ২১ নভেম্বর ২০২৬", en: "Last updated: 21 November 2026", ar: "آخر تحديث: 21 نوفمبر 2026" }) + "</p>"; };
  function policy(title, items) { return head("", title, "", [[title]]) + sec(DRAFT() + '<div class="prose pol">' + items.map(function (x) { return "<h2>" + L(x[0]) + "</h2><p>" + L(x[1]) + "</p>"; }).join("") + "</div>"); }
  P.privacy = function () {
    var em = esc(((C().settings || {}).contact || {}).email || "");
    return policy(Uraw("privacy"), [
      [{ bn: "আমরা কী তথ্য নিই", en: "What we collect", ar: "ما الذي نجمعه" }, { bn: "আপনি স্বেচ্ছায় ফরমে যা লেখেন শুধু সেটুকুই: নাম, মোবাইল/ইমেইল, বার্তা, দানের ঘোষণার তথ্য (খাত, পরিমাণ, ট্রানজেকশন আইডি)। ওয়েবসাইট কোনো পেমেন্ট নেয় না এবং কার্ড বা অ্যাকাউন্টের গোপন তথ্য চায় না।", en: "Only what you choose to type into a form: name, mobile/email, message, and donation declaration details (cause, amount, transaction ID). The website takes no payments and never asks for card or account secrets.", ar: "ما تكتبه طوعًا في النماذج فقط: الاسم والهاتف/البريد والرسالة وبيانات إعلان التبرع. لا يتلقى الموقع مدفوعات ولا يطلب بيانات سرية." }],
      [{ bn: "তথ্য কোথায় যায়", en: "Where it goes", ar: "إلى أين تذهب" }, { bn: "ফরমের তথ্য ইমেইলে বা গুগল ফরমের মাধ্যমে ইমাম বুখারী ট্রাস্টের অফিসে পৌঁছায় এবং শুধু রসিদ, যোগাযোগ ও হিসাব রাখার কাজে ব্যবহৃত হয়। আমরা কারও তথ্য বিক্রি বা প্রকাশ করি না।", en: "Form details reach the IBT office by email or Google Forms and are used only for receipts, replies and record-keeping. We never sell or publish anyone's data.", ar: "تصل البيانات إلى مكتب الوقف بالبريد أو نماذج جوجل وتُستخدم للإيصالات والرد والسجلات فقط، ولا تُباع ولا تُنشر." }],
      [{ bn: "ডিভাইসে সংরক্ষিত পছন্দ", en: "Settings stored on your device", ar: "الإعدادات على جهازك" }, { bn: "ভাষা, থিম, নামাজের শহর ও কুরআন পাঠের পছন্দ আপনার ব্রাউজারেই (localStorage) থাকে; আমাদের সার্ভারে যায় না। কোনো বিজ্ঞাপন বা ট্র্যাকিং কুকি ব্যবহার করা হয় না।", en: "Language, theme, prayer city and Qur'an reader choices stay in your browser (localStorage) and are not sent to us. No advertising or tracking cookies are used.", ar: "تبقى اللغة والسمة ومدينة الصلاة وتفضيلات القراءة في متصفحك، ولا تُستخدم ملفات تتبع إعلانية." }],
      [{ bn: "বাইরের সেবা", en: "Third-party services", ar: "خدمات خارجية" }, { bn: "ভিডিও (YouTube), ফেসবুক পোস্ট, কুরআন (Quran.com), প্রশ্নোত্তরের লিংক (IslamQA, Islamweb) ও সাইট হোস্টিং (GitHub Pages) নিজ নিজ প্রতিষ্ঠানের নীতিমালা অনুযায়ী চলে।", en: "Videos (YouTube), Facebook posts, the Qur'an (Quran.com), Q&A links (IslamQA, Islamweb) and hosting (GitHub Pages) follow their own providers' policies.", ar: "تخضع خدمات يوتيوب وفيسبوك وQuran.com وIslamQA وإسلام ويب واستضافة GitHub لسياسات مزوديها." }],
      [{ bn: "আপনার অধিকার ও যোগাযোগ", en: "Your rights and contact", ar: "حقوقك والتواصل" }, { bn: "আপনার দেওয়া তথ্য দেখতে, সংশোধন বা মুছে ফেলতে চাইলে " + em + " ঠিকানায় লিখুন।", en: "To see, correct or delete details you gave us, write to " + em + ".", ar: "لعرض بياناتك أو تصحيحها أو حذفها راسل " + em + "." }]]);
  };
  P.terms = function () {
    return policy(Uraw("terms"), [
      [{ bn: "ওয়েবসাইটের উদ্দেশ্য", en: "Purpose of the site", ar: "غرض الموقع" }, { bn: "এই ওয়েবসাইট ইমাম বুখারী ট্রাস্টের কার্যক্রম, প্রকল্প ও দানের মাধ্যম সম্পর্কে তথ্য দেয়।", en: "This website informs about Imam Bukhari Trust's work, projects and ways to give.", ar: "يعرّف هذا الموقع بأعمال الوقف ومشاريعه وطرق التبرع." }],
      [{ bn: "দান", en: "Donations", ar: "التبرعات" }, { bn: "দান সরাসরি বিকাশ, নগদ, রকেট বা ব্যাংকের মাধ্যমে হয়; ওয়েবসাইট শুধু নির্দেশনা দেয় ও দানের ঘোষণা গ্রহণ করে। ঘোষণা জমা দেওয়া মানে পেমেন্ট সম্পন্ন হওয়া নয়; অফিস যাচাই করে রসিদ পাঠায়।", en: "Gifts are sent directly by bKash, Nagad, Rocket or bank; the site only gives instructions and accepts declarations. Submitting a declaration is not a payment; the office verifies it and sends a receipt.", ar: "يتم التبرع مباشرة عبر بيكاش أو نقد أو روكيت أو البنك، والموقع يعطي التعليمات ويستقبل الإعلان فقط؛ يتحقق المكتب ويرسل الإيصال." }],
      [{ bn: "ইসলামিক প্রশ্নোত্তর", en: "Islamic Q&A", ar: "سؤال وجواب" }, { bn: "প্রশ্নোত্তর অংশে IslamQA ও Islamweb-এর প্রকাশিত উত্তরের লিংক দেওয়া হয়; সেসব উত্তর তাদের নিজস্ব। ব্যক্তিগত বা জটিল বিষয়ে সরাসরি আলেমের পরামর্শ নিন।", en: "The Q&A section links to answers published by IslamQA and Islamweb; those answers are theirs. For personal or complex matters, consult a scholar directly.", ar: "يربط قسم الأسئلة بإجابات IslamQA وإسلام ويب وهي ملك لهما؛ استشر عالمًا في المسائل الخاصة." }],
      [{ bn: "বিষয়বস্তুর ব্যবহার", en: "Use of content", ar: "استخدام المحتوى" }, { bn: "সূত্র উল্লেখ করে অবাণিজ্যিক দাওয়াহর কাজে লেখা ও ছবি শেয়ার করা যাবে। স্থাপত্য নকশা ও প্রতীকী চিত্রগুলো চূড়ান্ত নির্মাণের হুবহু রূপ নাও হতে পারে।", en: "Text and photos may be shared for non-commercial dawah with attribution. Architectural designs and illustrations may differ from the final buildings.", ar: "يجوز مشاركة المحتوى للدعوة غير التجارية مع ذكر المصدر، وقد تختلف التصاميم عن المباني النهائية." }],
      [{ bn: "দায়সীমা", en: "Limitations", ar: "حدود المسؤولية" }, { bn: "নামাজের সময় হিসাব করে দেখানো হয়, স্থানীয় মাসজিদের সময়সূচির সাথে কয়েক মিনিটের পার্থক্য হতে পারে। তথ্য হালনাগাদ রাখার চেষ্টা করা হয়; ভুল চোখে পড়লে জানান।", en: "Prayer times are calculated and may differ from local mosque timetables by a few minutes. We try to keep information current; please tell us about any error.", ar: "مواقيت الصلاة محسوبة وقد تختلف بدقائق عن جدول المسجد المحلي؛ نرحب بالإبلاغ عن أي خطأ." }]]);
  };

  /* ---------- donation: anonymous option, declaration, reference number ---------- */
  function refNo() { var d = new Date(); return "IBT-" + d.toISOString().slice(2, 10).replace(/-/g, "") + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(); }
  function upgradeDonateForm() {
    var f = $('#wiz form[data-submit="donation"]'); if (!f || f._v8) return; f._v8 = 1;
    var ref = refNo();
    f.insertAdjacentHTML("afterbegin", '<input type="hidden" name="reference" value="' + ref + '"><div class="refbox"><small>' + L({ bn: "আপনার রেফারেন্স নম্বর", en: "Your reference number", ar: "رقمك المرجعي" }) + '</small><b class="ltr">' + ref + "</b><span class=\"faint\">" + L({ bn: "রসিদ ও যোগাযোগে এই নম্বরটি ব্যবহার হবে", en: "Used on your receipt and in any follow-up", ar: "يُستخدم في الإيصال والمتابعة" }) + "</span></div>");
    var sub = $('button[type="submit"]', f);
    sub.insertAdjacentHTML("beforebegin", '<label class="chk"><input type="checkbox" name="anonymous" value="yes"> <span>' + L({ bn: "নাম প্রকাশ না করে দান (দাতার তালিকায় নাম দেখানো হবে না)", en: "Give anonymously (your name won't appear in any donor list)", ar: "تبرع دون ذكر الاسم" }) + '</span></label><label class="chk"><input type="checkbox" name="declaration" value="yes" required> <span>' + L({ bn: "আমি নিশ্চিত করছি যে উপরের পরিমাণ টাকা আমি পাঠিয়েছি এবং তথ্যগুলো সঠিক। আমি জানি এটি দানের ঘোষণা; অফিস যাচাই করে রসিদ পাঠাবে।", en: "I confirm I have sent this amount and the details are correct. I understand this is a declaration; the office will verify it and send a receipt.", ar: "أؤكد أنني أرسلت المبلغ وأن البيانات صحيحة، وأعلم أن هذا إعلان يتحقق منه المكتب ثم يرسل الإيصال." }) + "</span></label>");
  }
  document.addEventListener("click", function (e) { if (e.target.closest("[data-wiz], [data-wiz-go]")) setTimeout(upgradeDonateForm, 0); });

  /* ---------- SEO: per-page title, description, canonical, social tags, structured data ---------- */
  var BASE = "https://shak-nayem-uddin.github.io/ibt-website/";
  var STATIC = ["about", "mission", "history", "governance", "chairman", "activities", "projects", "project-ibjmc", "future", "institutions", "funds", "donate", "transparency", "publications", "news", "register", "ask", "quran", "prayer", "media", "contact", "privacy", "terms"];
  function meta(name, val, prop) { var sel = prop ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]', m = document.head.querySelector(sel); if (!m) { m = document.createElement("meta"); m.setAttribute(prop ? "property" : "name", name); document.head.appendChild(m); } m.setAttribute("content", val); }
  function canonical(u) { var l = document.head.querySelector('link[rel="canonical"]'); if (!l) { l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); } l.href = u; }
  function ld(id, obj) { var s = document.getElementById(id); if (!obj) { if (s) s.remove(); return; } if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.id = id; document.head.appendChild(s); } s.textContent = JSON.stringify(obj); }
  IBT.afterHooks.push(function (route) {
    var site = L((C().settings || {}).siteName) || "Imam Bukhari Trust", h1 = ($("#main h1") || {}).textContent || "", lead = ($("#main .lead") || $("#main p") || {}).textContent || "";
    var title = route === "home" ? site + " · " + L({ bn: "ঈমান · ইলম · খিদমাহ", en: "Faith · Knowledge · Service", ar: "إيمان · علم · خدمة" }) : (h1.trim() || site) + " · " + site;
    var desc = (lead || L(C().home.heroText)).replace(/\s+/g, " ").trim().slice(0, 158);
    document.title = title; meta("description", desc); meta("og:title", title, true); meta("og:description", desc, true); meta("twitter:card", "summary_large_image"); meta("twitter:title", title); meta("twitter:description", desc);
    var img = ($("#main .hero-photo img, #main .photo img, #main img") || {}).src; meta("og:image", img || BASE + "img/og-cover.jpg", true); meta("twitter:image", img || BASE + "img/og-cover.jpg");
    meta("og:locale", { bn: "bn_BD", en: "en_US", ar: "ar_AR" }[st.lang], true);
    canonical(BASE + (route === "home" ? "" : STATIC.indexOf(route) > -1 ? route + "/" : "#" + route));
    var r = route.indexOf("reg-") === 0 ? h.find(C().registrations || [], route.slice(4)) : null;
    ld("ld-event", r && r.type === "event" && r.closes ? { "@context": "https://schema.org", "@type": "Event", name: L(r.title), description: L(r.text), startDate: r.closes + "T06:30:00+06:00", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled", location: { "@type": "Place", name: L(r.venue), address: { "@type": "PostalAddress", addressCountry: "BD", addressRegion: "Dhaka" } }, image: [BASE + (r.image || "")], organizer: { "@type": "NGO", name: "Imam Bukhari Trust", url: BASE }, offers: r.formUrl ? { "@type": "Offer", url: r.formUrl, price: "0", priceCurrency: "BDT", availability: "https://schema.org/InStock" } : undefined } : null);
    var n = route.indexOf("news-") === 0 ? h.find(C().news || [], route.slice(5)) : null;
    ld("ld-article", n ? { "@context": "https://schema.org", "@type": "NewsArticle", headline: L(n.title), datePublished: String(n.date || ""), image: n.image ? [BASE + n.image] : undefined, publisher: { "@type": "NGO", name: "Imam Bukhari Trust" } } : null);
    ld("ld-crumbs", route !== "home" ? { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: Uraw("nav_home"), item: BASE }, { "@type": "ListItem", position: 2, name: h1.trim() || route, item: BASE + "#" + route }] } : null);
    // project dashboard + academic focus
    if (route === "project-ibjmc" || route === "academic-building") {
      if (!$("#dash")) { var at = $("#main .update") || $("#main section:nth-of-type(2)"); at = at && at.closest("section"); if (at) at.insertAdjacentHTML("afterend", dashboard()); else $("#main").insertAdjacentHTML("beforeend", dashboard()); }
      if (IBT._focusAcademic) { IBT._focusAcademic = false; var ac = $$("#main .upd")[1] || $("#dash"); if (ac) setTimeout(function () { ac.scrollIntoView({ behavior: "smooth", block: "start" }); }, 300); }
    }
    if (route === "donate") upgradeDonateForm();
    a11y();
    if (route === "prayer") setTimeout(function () { if (st.route !== "prayer" || window.adhan) return; var b = $("#ptSet") || $("#main .section"); if (b) b.insertAdjacentHTML("afterbegin", '<div class="notice err" role="alert">' + L({ bn: "নামাজের সময় হিসাব করার ফাইলটি লোড হয়নি। ইন্টারনেট সংযোগ দেখে পেজটি আবার খুলুন।", en: "The prayer-time calculator didn't load. Check your connection and reload the page.", ar: "لم تُحمَّل أداة حساب المواقيت. تحقق من الاتصال وأعد التحميل." }) + "</div>"); }, 8000);
  });
  // accessibility safety net: name unlabeled form controls from their visible label, make scroll rails keyboard-reachable
  function a11y() {
    $$("#main select, #main input, #main textarea").forEach(function (el) {
      if (el.getAttribute("aria-label") || el.labels && el.labels.length || el.type === "hidden") return;
      var lab = el.closest(".field") && $("label", el.closest(".field")); var t = lab ? lab.textContent.trim() : el.getAttribute("placeholder") || "";
      if (t) el.setAttribute("aria-label", t);
    });
    $$("#main .rail, #main .tscroll").forEach(function (el) { if (!el.hasAttribute("tabindex")) { el.setAttribute("tabindex", "0"); el.setAttribute("role", "region"); el.setAttribute("aria-label", (el.closest("section") && ($("h2", el.closest("section")) || {}).textContent) || "list"); } });
  }
  setInterval(function () { if (document.visibilityState === "visible") a11y(); }, 3000);
  IBT.v8 = { dashboard: dashboard, STATIC: STATIC };
})();
