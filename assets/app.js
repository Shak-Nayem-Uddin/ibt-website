/* Imam Bukhari Trust: public site runtime (router, i18n, themes, pages, cloud content). */
(function () {
  "use strict";
  var IBT = window.IBT = {};
  var DEF = null;          // bundled defaults (data/content.json)
  var C = null;            // live content = defaults + published cloud overrides
  var cloud = { db: null, user: null, assets: null, canEdit: false, uid: null, ready: false };
  var CMS_KEYS = ["settings", "home", "chairman", "cells", "history", "institutions", "floors", "projects", "initiatives", "impact", "funds", "supportItems", "payment", "donateCopy", "registrations", "events", "news", "videos", "stories", "reports", "faqs", "ui", "scholars", "live", "chatbot", "qa"];
  var V = { videos: [], playlists: [], channels: [] }; // data/videos.json (auto-updated from YouTube)
  IBT.CMS_KEYS = CMS_KEYS;
  var state = { lang: "bn", theme: "", themePref: "auto", route: "home", preview: false, drafts: {} };
  IBT.state = state; IBT.cloud = cloud;

  // ---------- utils ----------
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  IBT.esc = esc;
  function tr(o, lang) {
    if (o == null) return "";
    if (typeof o === "string") return o;
    var l = lang || state.lang;
    return o[l] || o.en || o.bn || "";
  }
  function isFallback(o) { return o && typeof o === "object" && !o[state.lang] && (o.en || o.bn); }
  function T(o) { var s = esc(tr(o)); return isFallback(o) && state.lang === "ar" ? '<span lang="' + (o.en ? "en" : "bn") + '" dir="ltr">' + s + "</span>" : s; }
  function U(k) { return T((C.ui || {})[k]) || k; }
  function Uraw(k) { return tr((C.ui || {})[k]) || k; }
  IBT.tr = tr; IBT.T = T; IBT.U = U;
  function img(ref) {
    if (!ref) return "";
    if (ref.indexOf("yt:") === 0) return ytThumb(ref.slice(3));
    if (ref.indexOf("asset:gh/") === 0) return ref.slice(9);
    if (ref.indexOf("asset:") === 0) return window.IBT_GAS ? window.IBT_GAS.assetUrl(ref.slice(6)) : "/_blob/" + ref.slice(6);
    return ref;
  }
  function ytThumb(id, small) { return "https://i.ytimg.com/vi/" + encodeURIComponent(id) + (small ? "/mqdefault.jpg" : "/hqdefault.jpg"); }
  IBT.img = img;
  var LOC = { bn: "bn-BD", en: "en-GB", ar: "ar-SA" };
  function num(n) { try { return new Intl.NumberFormat(LOC[state.lang]).format(n); } catch (e) { return String(n); } }
  function money(n) { return "৳" + num(n); }
  function digits(s) { s = String(s); if (state.lang === "bn") return s.replace(/\d/g, function (d) { return "০১২৩৪৫৬৭৮৯"[d]; }); if (state.lang === "ar") return s.replace(/\d/g, function (d) { return "٠١٢٣٤٥٦٧٨٩"[d]; }); return s; }
  function parseDate(s) { if (!s) return null; var p = String(s).split("-"); if (p.length === 1) return new Date(+p[0], 0, 1); return new Date(+p[0], (+p[1] || 1) - 1, +p[2] || 1); }
  function fdate(s, opt) {
    var d = parseDate(s); if (!d || isNaN(d)) return esc(s || "");
    var parts = String(s).split("-").length;
    var o = opt || (parts === 1 ? { year: "numeric" } : parts === 2 ? { year: "numeric", month: "long" } : { year: "numeric", month: "long", day: "numeric" });
    try { return new Intl.DateTimeFormat(LOC[state.lang], o).format(d); } catch (e) { return s; }
  }
  function hijri(s) {
    var d = parseDate(s); if (!d) return "";
    try { return new Intl.DateTimeFormat((state.lang === "en" ? "en" : state.lang === "bn" ? "bn" : "ar") + "-u-ca-islamic-umalqura", { day: "numeric", month: "long", year: "numeric" }).format(d).replace(/\s*যুগ$/, " হিজরি"); } catch (e) { return ""; }
  }
  IBT.fdate = fdate; IBT.num = num; IBT.hijri = hijri;
  function toast(msg) { var t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 2600); }
  IBT.toast = toast;
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  IBT.clone = clone;
  function find(list, id) { return (list || []).filter(function (x) { return x.id === id; })[0]; }

  // ---------- icons ----------
  var I = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.5.2-.7.6-.7 1.1M12 15.5h.01"/>', info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>', pray: '<path d="M12 3c-3 4-6 6-6 10a6 6 0 0 0 12 0c0-4-3-6-6-10z"/><path d="M12 13v4"/>', drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>', kaaba: '<path d="M4 8l8-4 8 4v10l-8 3-8-3z"/><path d="M4 8l8 3 8-3M12 11v10M4 12l8 3 8-3"/>', leaf: '<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>', video: '<rect x="2.5" y="6" width="13" height="12" rx="2.5"/><path d="M15.5 10.5 21.5 7v10l-6-3.5"/>', send: '<path d="M21 3 10 14"/><path d="M21 3l-7 18-4-7-7-4 18-7z"/>', moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>', heart: '<path d="M12 21s-7-4.4-9.3-8.6C1.1 9.3 2.8 5.5 6.4 5.1 8.6 4.9 10.3 6 12 8c1.7-2 3.4-3.1 5.6-2.9 3.6.4 5.3 4.2 3.7 7.3C19 16.6 12 21 12 21z"/>',
    research: '<circle cx="10" cy="10" r="6"/><path d="M20 20l-5.5-5.5M7 10h6M10 7v6"/>', education: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    dawah: '<path d="M4 5h16v10H8l-4 4z"/><path d="M8 9h8M8 12h5"/>', masjid: '<path d="M12 3c3 2 5 4 5 7H7c0-3 2-5 5-7z"/><path d="M5 21V10h14v11M3 21h18M10 21v-4a2 2 0 0 1 4 0v4"/><path d="M12 3V1"/>',
    social: '<path d="M12 21s-7-4.4-9.3-8.6C1.1 9.3 2.8 5.5 6.4 5.1 8.6 4.9 10.3 6 12 8c1.7-2 3.4-3.1 5.6-2.9 3.6.4 5.3 4.2 3.7 7.3C19 16.6 12 21 12 21z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 13h18"/>', family: '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21c0-4 3-7 6-7s6 3 6 7M13 21c0-3 2-5 4-5s4 2 4 5"/>',
    women: '<circle cx="12" cy="7" r="4"/><path d="M5 21c0-5 3-8 7-8s7 3 7 8"/>', globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v12"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8z" fill="currentColor" stroke="none"/>', youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"/>', x2: '<path d="M4 4l16 16M20 4L4 20"/>',
    phone: '<path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>', cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>', copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    doc: '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h8"/>', cube: '<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 22V12M21 7l-9 5-9-5"/>',
    star8: '<path d="M12 1l2.6 6.4L21 6l-1.4 6.4L24 17l-6.4.6L12 23l-3-5.4L2 17l3.4-4.6L3 6l6.4 1.4z" fill="none"/>', gear: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/>',
    auto: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/>',
    winter: '<path d="M12 2v20M4.9 7l14.2 10M4.9 17L19.1 7M9 4l3 2 3-2M9 20l3-2 3 2"/>', relief: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M12 14c-1.5-1.6-4-.6-3 1.5.6 1.2 3 3 3 3s2.4-1.8 3-3c1-2.1-1.5-3.1-3-1.5z"/>',
    scholar: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>', iftar: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/><path d="M16 3l.7 1.6L18.3 5l-1.6.7L16 7.3l-.7-1.6L13.7 5l1.6-.4z"/>',
    library: '<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="M16 5l3.8-1 2.2 15.8-3.8 1z"/>', maktab: '<path d="M4 19V6a2 2 0 0 1 2-2h12v15H6a2 2 0 0 0-2 2"/><path d="M8 8h6M8 11h4"/>',
    quran: '<path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5c-3-.5-6 0-8 1.5z"/><path d="M12 6v14.5"/>', studio: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>',
    seminar: '<rect x="3" y="4" width="18" height="11" rx="1"/><path d="M8 20l4-5 4 5M12 15v-2"/>', arabic: '<path d="M4 6h16M4 12h10M4 18h7"/><circle cx="18" cy="17" r="3"/>',
    school: '<path d="M3 21h18M5 21V10l7-5 7 5v11"/><path d="M10 21v-5h4v5M12 5V2l3 1.5"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    teacher: '<circle cx="8" cy="6" r="3"/><path d="M3 21v-4a5 5 0 0 1 10 0v4M13 10h8v7h-6"/>', hostel: '<path d="M3 20V8l9-5 9 5v12M3 20h18"/><path d="M7 20v-6h10v6M7 11h2M15 11h2"/>',
    youth: '<circle cx="9" cy="7" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M3 20c0-4 3-6.5 6-6.5s6 2.5 6 6.5M14.5 14c3 0 6.5 1.5 6.5 6"/>', senior: '<circle cx="11" cy="5" r="2.5"/><path d="M11 8v7l-3 6M11 15l3 6M7 11l4-2 4 2M17 12v9"/>',
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>', museum: '<path d="M3 21h18M4 10h16M12 3l9 5H3zM6 10v8M10 10v8M14 10v8M18 10v8"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>', code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    slab: '<path d="M2 18h20M4 18V9h16v9M2 9h20M7 9V5h10v4"/>', musalla: '<rect x="6" y="2" width="12" height="20" rx="1.5"/><path d="M9 9c0-2 1.3-3.5 3-4 1.7.5 3 2 3 4v4H9zM8 17h8"/>',
    wudu: '<path d="M12 3c3 4 5 6.5 5 9.5a5 5 0 0 1-10 0C7 9.5 9 7 12 3z"/>', sqft: '<path d="M4 4h16v16H4z"/><path d="M4 9h5M15 4v5M4 15h4M20 15h-5"/>',
    cement: '<path d="M6 4h12l2 4v12H4V8z"/><path d="M4 8h16M9 13h6"/>', brick: '<rect x="2" y="5" width="9" height="5" rx="1"/><rect x="13" y="5" width="9" height="5" rx="1"/><rect x="7" y="12" width="10" height="5" rx="1"/><rect x="2" y="12" width="3" height="5"/><rect x="19" y="12" width="3" height="5"/>',
    rod: '<path d="M3 17L17 3M7 21L21 7M5 19L19 5"/>', classroom: '<rect x="3" y="3" width="18" height="11" rx="1"/><path d="M7 21v-3h10v3M12 14v4"/>',
    play2: '<path d="M8 5v14l11-7z"/>', pause: '<path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" stroke="none"/>', prev: '<path d="M18 6L8 12l10 6zM6 6v12"/>', next: '<path d="M6 6l10 6-10 6zM18 6v12"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', locate: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="7"/>',
    research2: '<circle cx="10" cy="10" r="6"/><path d="M20 20l-5.5-5.5"/>', check: '<path d="M5 12l5 5L20 7"/>',
    qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M21 14v7h-4M17 21h0"/>'
  };
  function icon(n, cls) { return '<svg class="i ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[n] || I.arrow) + "</svg>"; }
  IBT.icon = icon;
  var ARROW = icon("arrow", "flip-rtl");

  // ---------- theme & language ----------
  var darkMQ = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  function resolveTheme(pref) { return pref === "light" || pref === "dark" ? pref : (darkMQ && darkMQ.matches ? "dark" : "light"); }
  function applyTheme(pref) {
    state.themePref = pref || "auto"; var t = resolveTheme(state.themePref);
    var changed = state.theme !== t;
    state.theme = t; document.documentElement.setAttribute("data-theme", t);
    var b = $("#themeBtn"); if (b) { b.innerHTML = icon(state.themePref === "auto" ? "auto" : t === "dark" ? "moon" : "sun") + (state.themePref === "auto" ? '<span class="lbl">A</span>' : ""); b.setAttribute("aria-label", Uraw("theme_" + state.themePref)); b.title = Uraw("theme_" + state.themePref); }
    if (changed && IBT._themeInit) scenes.forEach(function (s) { s && s.setTheme && s.setTheme(t); });
    if (IBT._scenes) IBT._scenes.forEach(function (s) { s && s.setTheme(t); });
    IBT._themeInit = true;
    var m = $('meta[name="theme-color"]'); if (m) m.content = t === "dark" ? "#0E1513" : "#FAF8F3";
  }
  function applyLang(l) {
    state.lang = l;
    document.documentElement.lang = l; document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    $$(".lang-switch button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === l ? "true" : "false"); });
  }
  IBT.setLang = function (l) { ls("ibt_lang", l); applyLang(l); renderAll(); };
  IBT.setTheme = function (t) { ls("ibt_theme", t); applyTheme(t); };
  if (darkMQ) { var mqh = function () { if (state.themePref === "auto") applyTheme("auto"); }; if (darkMQ.addEventListener) darkMQ.addEventListener("change", mqh); else if (darkMQ.addListener) darkMQ.addListener(mqh); }

  // ---------- chrome (header/footer) ----------
  var NAV = [["home", "nav_home"], ["about", "nav_about"], ["ask", "nav_ask"], ["projects", "nav_projects"], ["future", "nav_future"], ["funds", "nav_funds"], ["quran", "nav_quran"], ["prayer", "nav_prayer"], ["live", "nav_live"], ["media", "nav_media"], ["institutions", "nav_institutions"], ["initiatives", "nav_initiatives"], ["news", "nav_news"], ["register", "nav_register"], ["chairman", "chairman_title"], ["transparency", "nav_transparency"], ["contact", "nav_contact"]];
  IBT.NAV = NAV;
  // grouped navigation (institutional structure); every older page stays reachable from a group or an internal link
  var NAVG = [
    ["about", "nav_about", [["about", "nav_overview"], ["history", "history"], ["mission", "nav_mission"], ["chairman", "chairman_title"], ["governance", "nav_governance"]]],
    ["activities", "nav_activities", [["activity-education", "act_education"], ["activity-dawah", "act_dawah"], ["activity-research", "act_research"], ["activity-welfare", "act_welfare"], ["activity-community", "act_community"], ["initiatives", "nav_all_initiatives"]]],
    ["projects", "nav_projects", [["project-ibjmc", "nav_masjid_complex"], ["academic-building", "nav_academic_bld"], ["future", "nav_future"], ["projects", "nav_all_projects"]]],
    ["institutions", "nav_institutions", [["inst-kulliyatul-quran", "nav_kq"], ["institutions", "nav_other_inst"]]],
    ["resources", "nav_resources", [["quran", "nav_quran"], ["ask", "nav_ask"], ["prayer", "nav_prayer"], ["media", "nav_videos"], ["live", "nav_live"], ["publications", "nav_publications"], ["news", "nav_news"], ["register", "nav_events"]]],
    ["transparency", "nav_transparency", [["transparency-annual", "tr_annual"], ["transparency-financial", "tr_financial"], ["transparency-projects", "tr_projects"], ["transparency", "tr_accountability"]]],
    ["contact", "nav_contact"]
  ];
  IBT.NAVG = NAVG;
  function navGroupsHtml() {
    return NAVG.map(function (g) {
      if (!g[2]) return '<a class="ng-top" href="#' + g[0] + '" data-nav="' + g[0] + '">' + U(g[1] + "_s") + "</a>";
      return '<div class="ng" data-g="' + g[0] + '"><button class="ng-btn" type="button" aria-expanded="false" aria-haspopup="true">' + U(g[1] + "_s") + '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button><div class="ng-menu" role="menu">' +
        g[2].map(function (c) { return '<a role="menuitem" href="#' + c[0] + '" data-nav="' + c[0] + '">' + (c[0] === "live" ? '<span class="live-dot" aria-hidden="true"></span>' : "") + U(c[1]) + "</a>"; }).join("") + "</div></div>";
    }).join("");
  }
  function langSwitch() { return '<div class="lang-switch" role="group" aria-label="Language"><button data-l="bn" lang="bn">বাংলা</button><button data-l="en" lang="en">EN</button><button data-l="ar" lang="ar">عربي</button></div>'; }
  function renderHeader() {
    var S = C.settings, a = S.announcement || {};
    var ann = (a.show && tr(a.text) && ls("ibt_ann_hide") !== tr(a.text)) ? '<div class="announce" id="announce"><a href="' + esc(a.link || "#register") + '"><span class="dot pulse" style="color:var(--accent);margin-inline-end:8px"></span>' + T(a.text) + '</a><button class="x" aria-label="' + Uraw("close") + '" data-act="hide-ann">×</button></div>' : "";
    $("#chrome-top").innerHTML = ann +
      '<header class="header"><div class="wrap"><div class="bar">' +
      '<a class="brand" href="#home" aria-label="' + esc(tr(S.siteName)) + '"><span class="mark"></span><span class="bt"><b>' + T(S.siteName) + "</b><small>" + T(S.tagline) + "</small></span></a>" +
      '<nav class="nav gnav" aria-label="Main">' + navGroupsHtml() + "</nav>" +
      '<div class="hd-actions"><button class="icon-btn" id="searchBtn" aria-label="' + Uraw("search") + '">' + icon("search") + "</button>" + langSwitch() +
      '<div class="lang-mini" id="langMini"><button class="icon-btn" id="langMiniBtn" aria-haspopup="true" aria-label="' + ({ bn: "বাং", en: "EN", ar: "ع" })[state.lang] + ' · Language"><span>' + ({ bn: "বাং", en: "EN", ar: "ع" })[state.lang] + '</span></button><div class="lang-mini-menu">' + [["bn", "বাংলা"], ["en", "English"], ["ar", "العربية"]].map(function (l) { return '<button data-l="' + l[0] + '" lang="' + l[0] + '" aria-pressed="' + (state.lang === l[0]) + '">' + l[1] + "</button>"; }).join("") + "</div></div>" +
      '<button class="icon-btn theme-btn" id="themeBtn"></button>' + (cloud.canEdit ? '<a class="icon-btn" href="#admin" aria-label="' + Uraw("admin") + '" title="' + Uraw("admin") + '">' + icon("gear") + "</a>" : "") +
      '<a class="btn primary sm donate-hd" href="#donate">' + icon("heart") + U("donate") + '</a><button class="icon-btn menu-btn" id="menuBtn" aria-label="' + Uraw("menu") + '">' + icon("menu") + "</button></div>" +
      "</div></div></header>";
    document.documentElement.classList.toggle("has-ann", !!ann);
    $("#drawer .panel").innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><span class="brand"><span class="mark"></span><span class="bt"><b>' + T(S.siteName) + '</b></span></span><button class="icon-btn" data-act="close-drawer" aria-label="' + Uraw("close") + '">' + icon("x") + "</button></div>" + langSwitch() +
      '<a class="nl" href="#home">' + U("nav_home") + ARROW + "</a>" + NAVG.map(function (g) {
        if (!g[2]) return '<a class="nl" href="#' + g[0] + '">' + U(g[1]) + ARROW + "</a>";
        return '<details class="dg"><summary class="nl">' + U(g[1]) + '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></summary><div class="dg-in">' + g[2].map(function (c) { return '<a href="#' + c[0] + '">' + U(c[1]) + "</a>"; }).join("") + "</div></details>";
      }).join("") + '<a class="nl" href="#funds">' + U("nav_funds") + ARROW + "</a>" +
      (cloud.canEdit ? '<a class="nl" href="#admin">' + U("admin") + icon("gear") + "</a>" : "") +
      '<a class="btn primary" style="justify-content:center;margin-top:10px" href="#donate">' + icon("heart") + U("donate") + "</a>";
    applyTheme(state.themePref); applyLang(state.lang);
    var si = $("#searchInput"); if (si) si.placeholder = Uraw("search_ph");
    fitNav();
    $("#mdonate").innerHTML = '<a class="btn primary" href="#donate">' + icon("heart") + U("donate") + "</a>";
    document.documentElement.style.setProperty("--logo", 'url("' + new URL(img(S.logo), location.href).href + '")');
    document.documentElement.style.setProperty("--logo-color", 'url("' + new URL(img(S.logoColor || S.logo), location.href).href + '")');
  }
  // Priority nav: hide trailing items that do not fit (they stay in the drawer)
  function fitNav() {
    var nav = $(".header .nav"), hd = $(".header"); if (!nav || !hd) return;
    hd.classList.remove("collapsed");
    if (getComputedStyle(nav).display === "none") return;
    if (nav.scrollWidth > nav.clientWidth + 1) hd.classList.add("collapsed");
  }
  window.addEventListener("resize", function () { clearTimeout(fitNav._t); fitNav._t = setTimeout(fitNav, 120); });
  if (document.fonts) { document.fonts.ready.then(function () { fitNav(); }); if (document.fonts.addEventListener) document.fonts.addEventListener("loadingdone", function () { fitNav(); }); }
  setTimeout(fitNav, 1500);
  function renderFooter() {
    var S = C.settings, c = S.contact || {};
    $("#chrome-bottom").innerHTML = '<footer class="footer"><div class="wrap"><div class="cols">' +
      '<div><a class="brand" href="#home"><span class="mark"></span><span class="bt"><b>' + T(S.siteName) + "</b><small>" + T(S.motto) + '</small></span></a><p class="muted" style="margin-top:14px;max-width:340px">' + U("footer_note") + '</p><div class="socials">' + (S.social || []).map(function (s) { return '<a class="icon-btn" href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.name) + '">' + icon(s.icon === "x" ? "x2" : s.icon) + "</a>"; }).join("") + "</div></div>" +
      "<div><h4>" + U("nav_about") + "</h4><ul>" + NAVG[0][2].concat([["projects", "nav_projects"], ["institutions", "nav_institutions"], ["initiatives", "nav_activities"]]).map(function (n) { return '<li><a href="#' + n[0] + '">' + U(n[1]) + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h4>" + U("nav_resources") + "</h4><ul>" + [["donate", "donate"], ["funds", "nav_funds"], ["ask", "nav_ask"], ["quran", "nav_quran"], ["prayer", "nav_prayer"], ["register", "nav_events"], ["transparency", "nav_transparency"]].map(function (n) { return '<li><a href="#' + n[0] + '">' + U(n[1]) + "</a></li>"; }).join("") + (S.relatedSites || []).map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + T(s.name) + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h4>" + U("nav_contact") + '</h4><ul class="muted"><li style="display:flex;gap:8px">' + icon("pin") + "<span>" + T(c.office) + '</span></li><li style="display:flex;gap:8px">' + icon("phone") + '<span class="ltr">' + (c.phones || []).map(esc).join("<br>") + '</span></li><li style="display:flex;gap:8px">' + icon("mail") + '<span class="ltr">' + esc(c.email) + (c.email2 ? "<br>" + esc(c.email2) : "") + "</span></li></ul></div>" +
      '</div><div class="bottom"><span>© ' + digits(new Date().getFullYear()) + " " + T(S.siteName) + " · " + esc(hijri(new Date().toISOString().slice(0, 10)).replace(/^.*?(\d{4}|[০-৯]{4}|[٠-٩]{4}).*$/, "$1")) + (state.lang === "en" ? " AH" : state.lang === "bn" ? " হি." : " هـ") + '</span><span class="ft-links"><a href="#privacy">' + U("privacy") + '</a> · <a href="#terms">' + U("terms") + '</a> · <a href="#transparency">' + U("nav_transparency") + "</a></span></div></div></footer>";
  }

  // ---------- page helpers ----------
  function crumbs(items) { return '<nav class="crumbs" aria-label="Breadcrumb"><a href="#home">' + U("nav_home") + "</a>" + items.map(function (i) { return "<span>/</span>" + (i[1] ? '<a href="' + i[1] + '">' + i[0] + "</a>" : "<span>" + i[0] + "</span>"); }).join("") + "</nav>"; }
  function pageHead(eyebrow, title, lead, cr) { return '<section class="page-hero"><div class="wrap">' + (cr || "") + (eyebrow ? '<div class="eyebrow">' + eyebrow + "</div>" : "") + '<h1 class="h-display rv">' + title + "</h1>" + (lead ? '<p class="lead rv" style="max-width:760px">' + lead + "</p>" : "") + "</div></section>"; }
  function statusChip(s) { var map = { running: "", ongoing: "", construction: "gold", establishing: "gold", planned: "muted", proposed: "warn", done: "", progress: "gold" }; return '<span class="chip ' + (map[s] || "") + '"><span class="dot"></span>' + U("status_" + s) + "</span>"; }
  function reviewNote(o) { return (o && o.review && cloud.canEdit) ? '<div class="pending">⚠ review: approval pending (visible to editors only)</div>' : ""; }
  function regStatus(r) { if (!r.opens && !r.closes) return ["open", "soon", "closed", "info"].indexOf(r.status) > -1 ? r.status : "info"; var now = new Date(), o = parseDate(r.opens), c = parseDate(r.closes); if (c) c.setHours(23, 59, 59); if (o && now < o) return "soon"; if (c && now > c) return "closed"; return "open"; }
  IBT.regStatus = regStatus;
  function regChip(r) { var s = regStatus(r); return '<span class="chip ' + (s === "open" ? "" : s === "soon" ? "gold" : "muted") + '">' + (s === "open" ? '<span class="dot pulse"></span>' : "") + U(s === "info" && r.needsInfo ? "reg_needs_info" : "reg_" + s) + "</span>"; }
  function vnorm(v) {
    if (v.youtubeId) return { id: v.youtubeId, title: tr(v.title), sub: v.speaker || v.channel || "", date: v.date || "", live: false };
    var ch = (V.channels || []).filter(function (c) { return c.id === v.channel; })[0];
    return { id: v.id, title: v.title, sub: ch ? ch.name : "", date: v.date || v.approx || "", live: v.kind === "live" };
  }
  function vcard(v) {
    var n = vnorm(v);
    return '<button class="vcard" type="button" data-play="' + esc(n.id) + '" data-title="' + esc(n.title) + '"><div class="vthumb"><img loading="lazy" src="' + esc(ytThumb(n.id, true)) + '" alt=""><div class="pl">' + icon("play") + '</div><div class="vt"><span>' + (n.live ? '<span class="chip muted" style="background:#c62828;color:#fff">' + U("live") + "</span>" : "") + "</span><span>" + (n.date ? fdate(n.date) : "") + '</span></div></div><div class="t">' + esc(n.title) + '</div><div class="s">' + esc(n.sub) + "</div></button>";
  }
  IBT.V = function () { return V; };
  function card(o) {
    return '<a class="card glass" href="' + o.href + '"><div class="media">' + (o.image ? '<img loading="lazy" src="' + esc(img(o.image)) + '" alt="' + esc(o.alt || "") + '">' : "") + (o.chip || "") + '</div><div class="body"><h3>' + o.title + "</h3>" + (o.text ? "<p>" + o.text + "</p>" : "") + '<div class="foot"><span class="linkarrow">' + (o.cta || U("learn_more")) + ARROW + "</span>" + (o.meta || "") + "</div></div></a>";
  }

  // ---------- pages ----------
  var P = {};
  IBT.P = P;
  IBT.H = { $: $, $$: $$, esc: esc, tr: tr, T: T, U: U, Uraw: Uraw, img: img, ytThumb: ytThumb, icon: icon, num: num, money: money, digits: digits, fdate: fdate, hijri: hijri, parseDate: parseDate,
    crumbs: crumbs, pageHead: pageHead, statusChip: statusChip, card: card, find: find, vcard: vcard, toast: toast, ls: ls, submitForm: function () { return submitForm.apply(null, arguments); },
    impactSection: function () { return impactSection(); }, sortedNews: function () { return sortedNews(); }, actRow: function (n) { return actRow(n); }, slideCap: function (s) { return slideCap(s); },
    scenes: function () { return scenes; }, state: state, ARROW: ARROW, LOC: LOC, regStatus: function (r) { return regStatus(r); }, C: function () { return C; }, V: function () { return V; } };
  P.home = function () {
    var H = C.home, S = C.settings;
    var regs = (C.registrations || []).filter(function (r) { return regStatus(r) === "open"; });
    var news = sortedNews().slice(0, 5);
    var slides = (H.heroSlides || []).length ? H.heroSlides : [{ image: H.heroImage, caption: "" }];
    var latest = (V.videos || []).filter(function (v) { return v.channel === "ibt"; })[0];
    var html = '<section class="hero hero-photo" id="hero"><div class="slides" aria-hidden="true">' + slides.map(function (sl, i) { return '<div class="slide' + (i ? "" : " on") + '"><img src="' + esc(img(sl.image)) + '" alt=""' + (i ? ' loading="lazy"' : "") + "></div>"; }).join("") + "</div>" +
      '<div class="wrap"><div class="content"><div class="eyebrow">' + T(H.heroEyebrow) + '</div><h1 class="h-display">' + T(H.heroTitle) + '</h1><p class="lead">' + T(H.heroText) + '</p><div class="ctas"><a class="btn light" href="#activities">' + icon("book") + U("explore_work") + '</a><a class="btn ghost-light" href="#projects">' + icon("masjid") + U("discover_projects") + '</a><a class="btn gold" href="#donate">' + icon("heart") + U("support_mission") + '</a><button class="btn ghost-light icon-only" data-story="' + esc(H.heroStory || "ibjmc") + '" aria-label="' + esc(tr(H.heroCta1)) + '">' + icon("play") + "</button></div></div>" +
      '<div class="hero-foot"><div><div class="cap" id="heroCap">' + slideCap(slides[0]) + '</div><div class="dots" role="tablist">' + slides.map(function (sl, i) { return '<button role="tab" aria-label="' + (i + 1) + '" aria-current="' + (i ? "false" : "true") + '" data-slide="' + i + '"></button>'; }).join("") + "</div></div>" +
      (latest ? '<button class="latest-vid" data-play="' + esc(latest.id) + '" data-title="' + esc(latest.title) + '"><img src="' + esc(ytThumb(latest.id, true)) + '" alt=""><span><small>' + U("latest_videos") + " · YouTube</small><b>" + esc(latest.title) + "</b></span></button>" : "") + "</div></div></section>";
    if (regs.length) html += '<div class="regbar"><div class="wrap"><span class="chip"><span class="dot pulse"></span>' + U("reg_open") + '</span>' + regs.slice(0, 3).map(function (r) { return '<a href="#reg-' + esc(r.id) + '">' + T(r.title) + ARROW + "</a>"; }).join("") + "</div></div>";
    html += '<section class="section tight"><div class="wrap"><div class="facts rv">' + (H.facts || []).map(function (f) { return '<div><b data-count="' + esc(f.value) + '"' + (f.plain ? ' data-plain="1"' : "") + ">" + (f.plain ? digits(f.value) : num(+f.value)) + "</b><span>" + T(f.label) + "</span></div>"; }).join("") + '</div><div class="src">' + T(H.factsSource) + "</div></div></section>";
    html += '<section class="section"><div class="wrap split"><div class="rv"><div class="eyebrow">' + U("nav_about") + '</div><h2 class="h-section">' + T(H.aboutTitle) + '</h2><p class="lead">' + T(H.aboutText) + '</p><p class="muted"><b>' + T(H.visionTitle) + ":</b> " + T(H.visionText) + '</p><a class="linkarrow" href="#about">' + U("learn_more") + ARROW + '</a></div><div class="photo rv" style="aspect-ratio:4/3"><img loading="lazy" src="' + esc(img(H.aboutImage || "img/first-prayer.jpg")) + '" alt=""></div></div></section>';
    html += '<section class="section" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">' + T(S.tagline) + '</div><h2 class="h-section">' + U("our_work") + '</h2></div></div><div class="work-grid">' + (H.pillars || []).map(function (p, i) { return '<a class="work rv' + (i === 0 ? " wide" : "") + '" href="' + esc(p.link || "#initiatives") + '"><img loading="lazy" src="' + esc(img(p.image)) + '" alt=""><div class="in"><h3>' + T(p.title) + "</h3><p>" + T(p.text) + "</p></div></a>"; }).join("") + "</div></div></section>";
    html += progressBand();
    var vids = (V.videos || []).filter(function (v) { return v.channel === "ibt"; }).slice(0, 8);
    if (vids.length) html += '<section class="section" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">YouTube</div><h2 class="h-section">' + U("latest_videos") + '</h2></div><a class="linkarrow" href="#media">' + U("all_videos") + ARROW + '</a></div><div class="grid g4">' + vids.map(vcard).join("") + "</div></div></section>";
    html += '<section class="section" style="padding-top:0"><div class="wrap"><div class="sec-head"><h2 class="h-section">' + U("activities") + '</h2><a class="linkarrow" href="#news">' + U("view_all") + ARROW + '</a></div><div class="acts">' + news.map(actRow).join("") + "</div></div></section>";
    html += '<section class="section" style="padding-top:0"><div class="wrap split rev"><div class="photo rv" style="aspect-ratio:4/5;max-height:560px"><img loading="lazy" src="' + esc(img(C.chairman.photo2 || C.chairman.photo)) + '" alt="' + esc(tr(C.chairman.name)) + '"></div><div class="rv"><div class="eyebrow">' + U("chairman_title") + '</div><h2 class="h-section">' + T(C.chairman.name) + '</h2><p class="muted">' + T(C.chairman.role) + '</p><p class="lead" style="font-size:1.05rem">' + T(C.chairman.message).slice(0, 420) + '…</p><a class="btn" href="#chairman">' + U("read_message") + ARROW + "</a></div></div></section>";
    html += donateBand();
    return html;
  };
  function slideCap(sl) { return sl && tr(sl.caption) ? (sl.kind === "design" ? '<span class="chip">' + U("illustrative") + "</span>" : "") + "<span>" + T(sl.caption) + "</span>" : ""; }
  function sortedNews() { return (C.news || []).slice().sort(function (a, b) { return String(b.date || "").localeCompare(String(a.date || "")); }); }
  function actRow(n) {
    var parts = String(n.date || "").split("-");
    var when = parts.length >= 2 ? new Intl.DateTimeFormat(LOC[state.lang], { month: "short" }).format(parseDate(n.date)) + "<small>" + digits(parts[0]) + "</small>" : digits(parts[0] || "");
    return '<a class="act rv" href="#news-' + esc(n.id) + '"><div class="when">' + when + "</div><div><b>" + T(n.title) + '</b><span class="muted">' + T(n.summary) + "</span></div>" + (n.image ? '<img loading="lazy" src="' + esc(img(n.image)) + '" alt="">' : "") + "</a>";
  }
  function progressBand() {
    var F = C.floors || {}; if (!F.mosque) return "";
    function row(k) { var fl = F[k] || []; var done = fl.filter(function (f) { return f.status === "done"; }).length; return '<div class="row"><b><span>' + U(k) + "</span><span>" + digits(done) + "/" + digits(fl.length) + '</span></b><div class="track">' + fl.map(function (f) { return '<i class="' + esc(f.status) + '" title="' + esc(tr(f.label)) + " · " + esc(tr(f.use)) + '"></i>'; }).join("") + "</div></div>"; }
    return '<section class="section" style="padding-top:0"><div class="wrap progress-band"><div class="pics rv"><div class="photo"><img loading="lazy" src="img/construction-structure.jpg" alt=""></div><div class="photo"><img loading="lazy" src="img/construction-piling.jpg" alt=""></div><div class="photo"><img loading="lazy" src="img/first-prayer.jpg" alt=""></div></div><div class="rv"><div class="eyebrow">' + U("construction_progress") + '</div><h2 class="h-section">' + T(((C.projects || [])[0] || {}).name || C.settings.siteName) + '</h2><p class="muted">' + T(((C.projects || [])[0] || {}).summary) + '</p><div class="bars">' + row("mosque") + row("academic") + '</div><div class="src">' + U("source") + ": " + T(F.source) + '</div><div class="ctas" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><a class="btn primary" href="#project-ibjmc">' + U("learn_more") + ARROW + '</a><a class="btn" href="#donate" data-fund="ibjmc">' + icon("heart") + U("donate") + "</a></div></div></div></section>";
  }
  function donateBand() {
    var ch = ((C.payment || {}).channels || []).filter(function (c) { return c.show && c.type !== "bank"; });
    return '<section class="section" style="padding-top:0"><div class="wrap"><div class="donate-band rv"><div><h2 class="h-section">' + U("donate_band") + "</h2><p>" + T((C.donateCopy || {}).transparency) + '</p><a class="btn light" href="#donate">' + icon("heart") + U("give_now") + ARROW + '</a></div><div class="chs">' + ch.map(function (c) { return '<div class="ch"><span>' + T(c.name) + "</span><span>" + esc(c.number) + "</span></div>"; }).join("") + "</div></div></div></section>";
  }
  function mountSlides(hero) {
    var slides = $$(".slide", hero), dots = $$(".dots button", hero), cur = 0, t = null;
    var data = (C.home.heroSlides || []);
    if (slides.length < 2) return null;
    function go(i) { cur = (i + slides.length) % slides.length; slides.forEach(function (s, k) { s.classList.toggle("on", k === cur); }); dots.forEach(function (d, k) { d.setAttribute("aria-current", k === cur ? "true" : "false"); }); var c = $("#heroCap"); if (c) c.innerHTML = slideCap(data[cur]); }
    function start() { stop(); if (!document.documentElement.classList.contains("nomotion")) t = setInterval(function () { go(cur + 1); }, 6500); }
    function stop() { if (t) clearInterval(t); t = null; }
    hero.addEventListener("click", function (e) { var d = e.target.closest("[data-slide]"); if (d) { go(+d.dataset.slide); start(); } });
    start();
    return { setTheme: function () { }, destroy: stop };
  }
  // 3D ring carousel built from IBT's real architectural renders (CSS 3D, no WebGL)
  function mountRing(stage) {
    var ring = $("#ring", stage), cards = $$(".rc", ring), n = cards.length; if (!n) return null;
    var nomo = document.documentElement.classList.contains("nomotion");
    var rtl = document.documentElement.dir === "rtl", dir = rtl ? -1 : 1;
    var step = 360 / n, angle = 0, vel = 0, target = null, dragging = false, lastX = 0, hover = false, front = -1, raf = 0, running = false, last = 0, R = 0;
    function layout() {
      var w = stage.clientWidth, h = stage.clientHeight;
      var cw = Math.min(560, Math.max(230, w * (w < 700 ? 0.66 : 0.62))), ch = cw * 0.64;
      if (ch > h * 0.62) { ch = h * 0.62; cw = ch / 0.64; }
      R = Math.round((cw / 2) / Math.tan(Math.PI / n) * 1.12);
      stage.style.setProperty("--w", cw + "px"); stage.style.setProperty("--h", ch + "px");
      cards.forEach(function (c, i) { c.style.transform = "rotateY(" + (i * step) + "deg) translateZ(" + R + "px)"; });
      paint();
    }
    function norm(a) { a = a % 360; return a < 0 ? a + 360 : a; }
    function paint() {
      ring.style.transform = "translateZ(" + (-R) + "px) rotateX(-4deg) rotateY(" + (-angle * dir) + "deg)";
      var best = -1, bestCos = -2;
      cards.forEach(function (c, i) {
        var rel = norm(i * step - angle * dir) * Math.PI / 180, cs = Math.cos(rel);
        c.style.opacity = (0.18 + 0.82 * Math.max(0, (cs + 0.35) / 1.35)).toFixed(3);
        c.style.filter = "brightness(" + (0.45 + 0.55 * Math.max(0, cs)).toFixed(3) + ") saturate(" + (0.6 + 0.4 * Math.max(0, cs)).toFixed(3) + ")";
        c.style.zIndex = Math.round(cs * 100) + 100;
        if (cs > bestCos) { bestCos = cs; best = i; }
      });
      if (best !== front) {
        front = best; cards.forEach(function (c, i) { c.classList.toggle("front", i === best); });
        var bg = $("#heroBg"); if (bg) { bg.style.opacity = "0"; setTimeout(function () { bg.src = cards[best].querySelector("img").src; bg.style.opacity = ""; }, 250); }
      }
    }
    function frame(now) {
      raf = 0; if (!running) return;
      var dt = Math.min(50, now - (last || now)); last = now;
      if (target !== null) { var d = target - angle; angle += d * Math.min(1, dt * 0.008); if (Math.abs(d) < 0.05) { angle = target; target = null; } }
      else if (!dragging) { if (Math.abs(vel) > 0.002) { angle += vel * dt; vel *= 0.94; } else if (!hover && !nomo) angle += dt * 0.0075; }
      paint(); raf = requestAnimationFrame(frame);
    }
    function start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(frame); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
    function goTo(i) { var cur = angle, want = i * step; var d = norm(want - cur); if (d > 180) d -= 360; target = cur + d; vel = 0; start(); }
    stage.addEventListener("pointerdown", function (e) { if (e.target.closest(".ring-ctl")) return; dragging = true; lastX = e.clientX; vel = 0; target = null; stage.setPointerCapture(e.pointerId); stage._moved = 0; });
    stage.addEventListener("pointermove", function (e) { if (!dragging) return; var dx = e.clientX - lastX; lastX = e.clientX; stage._moved += Math.abs(dx); var dA = -dx * 0.25 * dir; angle += dA; vel = dA / 16; });
    function up(e) { if (!dragging) return; dragging = false; if (stage._moved < 6) { var c = e.target.closest(".rc"); if (c) { var i = +c.dataset.i; if (i === front) { var L = $("#lightbox"); L.innerHTML = '<img src="' + esc(c.querySelector("img").src) + '" alt="">'; L.classList.add("open"); } else goTo(i); } } }
    stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
    stage.addEventListener("pointerenter", function () { hover = true; }); stage.addEventListener("pointerleave", function () { hover = false; });
    stage.addEventListener("click", function (e) { var b = e.target.closest("[data-ring]"); if (b) goTo(front + (+b.dataset.ring)); });
    stage.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") goTo(front + (rtl ? -1 : 1)); if (e.key === "ArrowLeft") goTo(front + (rtl ? 1 : -1)); });
    stage.tabIndex = 0;
    var io = new IntersectionObserver(function (es) { es[0].isIntersecting && !document.hidden ? start() : stop(); }, { threshold: 0.01 }); io.observe(stage);
    function vis() { document.hidden ? stop() : start(); }
    document.addEventListener("visibilitychange", vis);
    var ro = new ResizeObserver(layout); ro.observe(stage);
    layout(); start();
    return { setTheme: function () { }, destroy: function () { stop(); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", vis); } };
  }
  function starSvg() { return '<svg class="star" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.2"><rect x="20" y="20" width="60" height="60"/><rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)"/><circle cx="50" cy="50" r="18"/><circle cx="50" cy="50" r="42"/></g></svg>'; }
  function floorSummary() {
    var F = C.floors || {};
    function row(k) { var fl = F[k] || []; var done = fl.filter(function (f) { return f.status === "done"; }).length, prog = fl.filter(function (f) { return f.status === "progress"; }).length; return '<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-weight:600"><span>' + U(k) + '</span><span class="faint" style="color:rgba(242,245,247,.7)">' + digits(done) + "/" + digits(fl.length) + '</span></div><div style="display:flex;gap:3px;margin-top:8px">' + fl.map(function (f) { return '<i title="' + esc(tr(f.label)) + '" style="flex:1;height:10px;border-radius:3px;' + (f.status === "done" ? "background:#68983C" : f.status === "progress" ? "background:#E0B252;box-shadow:0 0 8px #E0B252" : "border:1px dashed rgba(255,255,255,.4)") + '"></i>'; }).join("") + "</div></div>"; }
    return '<div style="font-size:.85rem;color:rgba(242,245,247,.7);margin-bottom:10px">' + U("tracker_title") + " · " + U("as_of") + " " + fdate(F.asOf) + "</div>" + row("mosque") + row("academic");
  }
  function impactSection() {
    var M = C.impact; if (!M) return "";
    return '<section class="section" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">' + U("as_of") + " " + fdate(M.asOf) + '</div><h2 class="h-section">' + U("impact_title") + '</h2></div></div><div class="grid g3">' + (M.groups || []).map(function (g) { return '<div class="impact-group glass rv"><h3>' + T(g.title) + "</h3>" + (g.items || []).map(function (it) { return '<div class="stat"><b data-count="' + esc(it.value) + '" data-suffix="' + esc(it.suffix || "") + '">' + num(+it.value) + esc(it.suffix || "") + "</b><span>" + T(it.label) + "</span></div>"; }).join("") + "</div>"; }).join("") + '</div><div class="source-line"><span class="chip muted">' + U("source") + ": " + T(M.source) + "</span>" + (M.qualitative || []).map(function (q) { return '<span class="chip">' + T(q) + "</span>"; }).join("") + "</div></div></section>";
  }
  function newsCard(n) { return card({ href: "#news-" + n.id, image: n.image, title: T(n.title), text: T(n.summary), meta: '<span class="faint">' + fdate(n.date) + "</span>", chip: n.video ? '<span class="chip">' + icon("play") + "YouTube</span>" : "" }); }

  P.about = function () {
    var H = C.home;
    return pageHead(U("nav_about"), T(H.aboutTitle), T(H.visionText), crumbs([[U("nav_about")]])) +
      '<section class="section tight"><div class="wrap split"><div class="prose rv"><p>' + T(H.aboutText) + '</p><div class="glass" style="padding:20px;margin-top:16px"><div class="eyebrow">' + T(H.visionTitle) + "</div><p style='margin:0'>" + T(H.visionText) + '</p></div></div><div class="photo rv" style="aspect-ratio:4/3"><img src="' + esc(img("img/scholars-visit-group.jpg")) + '" alt=""></div></div></section>' +
      '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("cells") + '</h2><div class="grid g4" style="margin-top:20px">' + (C.cells || []).map(function (c) { return '<a class="glass rv" style="padding:18px;color:var(--text);display:flex;flex-direction:column;gap:6px" href="' + esc(c.link || "#") + '"><b>' + T(c.name) + '</b><span class="muted" style="font-size:.93rem">' + T(c.text) + "</span></a>"; }).join("") + "</div></div></section>" +
      '<section class="section tight"><div class="wrap split"><div><h2 class="h-section">' + U("history") + '</h2><div class="timeline" style="margin-top:20px">' + (C.history || []).map(function (h) { return '<div class="tl-item rv"><div class="d">' + fdate(h.date) + "</div><h4>" + T(h.title) + "</h4><p>" + T(h.text) + "</p></div>"; }).join("") + '</div></div><div class="glass rv" style="padding:24px;align-self:start"><div class="eyebrow">' + U("chairman_title") + '</div><div style="display:flex;gap:16px;align-items:center"><img src="' + esc(img(C.chairman.photo)) + '" alt="" style="width:84px;height:84px;border-radius:50%;object-fit:cover"><div><h3 style="margin:0">' + T(C.chairman.name) + '</h3><span class="muted">' + T(C.chairman.role) + '</span></div></div><a class="btn" style="margin-top:16px" href="#chairman">' + U("read_message") + ARROW + "</a></div></div></section>" +
      faqSection();
  };
  function faqSection() { return '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("faq") + '</h2><div class="grid" style="margin-top:18px">' + (C.faqs || []).map(function (f) { return '<details class="glass rv" style="padding:16px 18px"><summary style="cursor:pointer;font-weight:600">' + T(f.q) + '</summary><p class="muted" style="margin:10px 0 0">' + T(f.a) + "</p></details>"; }).join("") + "</div></div></section>"; }

  P.chairman = function () {
    var M = C.chairman;
    var links = (M.links || []).filter(function (l) { return l.url; });
    return pageHead(U("chairman_title"), T(M.name), T(M.role), crumbs([[U("nav_about"), "#about"], [U("chairman_title")]])) +
      '<section class="section tight"><div class="wrap split"><div class="photo rv" style="aspect-ratio:1"><img src="' + esc(img(M.photo)) + '" alt="' + esc(tr(M.name)) + '"></div><div class="prose rv"><p>' + T(M.bio) + '</p><div class="glass" style="padding:22px;margin-top:10px"><div class="eyebrow">' + U("message") + '</div><p style="margin:0;font-size:1.1rem">' + T(M.message) + "</p></div>" + reviewNote(M) +
      (links.length ? '<div style="display:flex;gap:10px;margin-top:16px">' + links.map(function (l) { return '<a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + icon(l.name.toLowerCase()) + esc(l.name) + "</a>"; }).join("") + "</div>" : "") + "</div></div></section>" +
      '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("videos") + '</h2><div class="grid g4" style="margin-top:16px">' + (V.videos || []).filter(function (v) { return /elahi|ইলাহী/i.test(v.title); }).slice(0, 8).map(vcard).join("") + "</div></div></section>";
  };

  P.institutions = function () {
    return pageHead(U("nav_institutions"), U("nav_institutions"), U("inst_lead"), crumbs([[U("nav_institutions")]])) +
      '<section class="section tight"><div class="wrap grid g3">' + (C.institutions || []).map(function (i) { return card({ href: i.link || "#inst-" + i.id, image: i.image, title: T(i.name), text: T(i.summary), chip: statusChip(i.status) }); }).join("") + '</div><div class="wrap">' + '<p class="faint status-key">' + U("status_legend") + '</p>' + "</div></section>";
  };
  P.inst = function (id) {
    var i = find(C.institutions, id); if (!i) return P.notfound();
    var regs = (C.registrations || []).filter(function (r) { return (i.registrations || []).indexOf(r.id) > -1 || r.entity === i.id; });
    var vids = (C.videos || []).filter(function (v) { return v.entity === i.id; });
    var story = find(C.stories, i.id);
    return pageHead(statusChip(i.status), T(i.name), T(i.summary) + (i.formerName ? '<br><span class="chip muted" style="margin-top:10px">' + T(i.formerName) + "</span>" : ""), crumbs([[U("nav_institutions"), "#institutions"], [T(i.name)]])) +
      '<section class="section tight" style="padding-top:0"><div class="wrap"><div class="cover rv"><img src="' + esc(img(i.image)) + '" alt=""></div></div></section>' +
      '<section class="section tight"><div class="wrap split" style="align-items:start"><div class="prose rv">' + (i.body ? "<p>" + T(i.body) + "</p>" : "") + reviewNote(i) + (story ? '<button class="btn primary" data-story="' + esc(story.id) + '">' + icon("play") + U("enter_story") + "</button> " : "") + (i.website ? '<a class="btn" href="' + esc(i.website) + '" target="_blank" rel="noopener">' + esc(i.website.replace(/^https?:\/\//, "").replace(/\/$/, "")) + icon("ext") + "</a>" : "") + '</div><div class="glass rv" style="padding:22px"><h3>' + U("features") + '</h3><ul class="check">' + (i.features || []).map(function (f) { return "<li>" + T(f) + "</li>"; }).join("") + "</ul></div></div></section>" +
      ((i.programs || []).length ? '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("programs") + '</h2><div class="grid g2" style="margin-top:16px">' + i.programs.map(function (p) { return '<div class="glass rv" style="padding:18px"><b>' + T(p.name) + '</b><p class="muted" style="margin:6px 0 0">' + T(p.text) + "</p></div>"; }).join("") + "</div></div></section>" : "") +
      (regs.length ? '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("nav_register") + '</h2><div class="grid" style="margin-top:16px">' + regs.map(regCard).join("") + "</div></div></section>" : "") +
      (vids.length ? '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("videos") + '</h2><div class="grid g4" style="margin-top:16px">' + vids.map(vcard).join("") + "</div></div></section>" : "") +
      (i.id === "kulliyatul-quran" && (C.scholars || []).length ? '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("academic_committee") + '</h2><div class="people" style="margin-top:18px">' + C.scholars.map(function (p) { return '<div class="person rv"><img loading="lazy" src="' + esc(img(p.photo)) + '" alt="" onerror="this.style.visibility=\'hidden\'"><b>' + T(p.name) + "</b><small>" + T(p.role) + "</small></div>"; }).join("") + '</div><div class="src">' + U("source") + ': <a href="https://www.kulliyatulquran.com/members" target="_blank" rel="noopener">kulliyatulquran.com</a></div></div></section>' : "");
  };

  P.projects = function () {
    return pageHead(U("nav_projects"), U("nav_projects"), U("proj_lead"), crumbs([[U("nav_projects")]])) +
      '<section class="section tight"><div class="wrap grid g2">' + (C.projects || []).filter(function (p) { return !p.hidden; }).map(function (p) { return card({ href: "#project-" + p.id, image: p.image, title: T(p.name), text: T(p.summary), chip: statusChip(p.status), meta: '<span class="faint">' + T(p.location) + "</span>" }); }).join("") + '</div><div class="wrap">' + '<p class="faint status-key">' + U("status_legend") + '</p>' + "</div></section>";
  };
  P.project = function (id) {
    var p = find(C.projects, id); if (!p) return P.notfound();
    var F = C.floors || {};
    var html = pageHead(statusChip(p.status), T(p.name), T(p.summary), crumbs([[U("nav_projects"), "#projects"], [T(p.name)]])) +
      '<section class="section tight" style="padding-top:0"><div class="wrap"><div class="cover rv"><img src="' + esc(img(p.image)) + '" alt=""><span class="chip muted" style="position:absolute;bottom:14px;inset-inline-start:14px;background:rgba(6,24,42,.6);color:#fff">' + U("illustrative") + "</span></div></div></section>" +
      '<section class="section tight"><div class="wrap split" style="align-items:start"><div class="prose rv"><p>' + T(p.body) + "</p>" + reviewNote(p) + '<div style="display:flex;gap:10px;flex-wrap:wrap">' + (p.story ? '<button class="btn primary" data-story="' + esc(p.story) + '">' + icon("play") + U("enter_story") + "</button>" : "") + (p.fund ? '<a class="btn" href="#donate" data-fund="' + esc(p.fund) + '">' + icon("heart") + U("donate") + "</a>" : "") + '</div></div><div class="glass rv" style="padding:22px"><dl class="kv"><dt>' + U("location") + "</dt><dd>" + T(p.location) + "</dd><dt>" + U("status") + "</dt><dd>" + statusChip(p.status) + "</dd></dl>" + ((p.objectives || []).length ? '<h3 style="margin-top:18px">' + U("objectives") + '</h3><ul class="check">' + p.objectives.map(function (o) { return "<li>" + T(o) + "</li>"; }).join("") + "</ul>" : "") + "</div></div></section>";
    if (p.tracker) {
      html += '<section class="section tight" id="tracker"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">' + U("as_of") + " " + fdate(F.asOf) + " · " + U("source") + ": " + T(F.source) + '</div><h2 class="h-section">' + U("tracker_title") + '</h2></div><span class="faint">' + U("tracker_hint") + '</span></div><div class="tracker"><div class="stage glass"><canvas id="trackerCanvas" aria-label="3D"></canvas><div class="legend"><span class="chip muted"><i class="sw st-done" style="width:10px;height:10px;border-radius:3px;display:inline-block"></i>' + U("status_done") + '</span><span class="chip muted"><i class="sw st-progress" style="width:10px;height:10px;border-radius:3px;display:inline-block"></i>' + U("status_progress") + '</span><span class="chip muted"><i class="sw st-planned" style="width:10px;height:10px;border-radius:3px;display:inline-block"></i>' + U("status_planned") + '</span></div><div class="tip glass dense" id="floorTip"></div><img id="trackerFallback" src="' + esc(img("img/render-campus.jpg")) + '" alt="" style="display:none;width:100%;height:100%;object-fit:cover;position:absolute;inset:0"></div><div class="glass"><div class="floor-list" id="floorList">' + floorList() + "</div></div></div>" + reviewNote(F) + "</div></section>";
      var si = C.supportItems;
      if (si) html += '<section class="section tight"><div class="wrap split" style="align-items:start"><div><h2 class="h-section">' + U("support_items") + '</h2><p class="faint">' + U("as_of") + " " + fdate(si.asOf) + '</p><a class="btn primary" href="#donate">' + icon("heart") + U("donate") + '</a></div><div class="glass" style="padding:8px 22px">' + (si.items || []).map(function (s) { return '<div class="support-row"><span>' + T(s.name) + "</span><b>" + (s.status === "done" ? '<span class="chip">' + U("completed") + "</span>" : money(s.amount)) + "</b></div>"; }).join("") + "</div></div></section>";
    }
    if ((p.design || []).length) html += '<section class="section tight"><div class="wrap"><div class="sec-head"><h2 class="h-section">' + U("design_gallery") + '</h2><span class="chip muted">' + icon("cube") + " " + U("illustrative") + '</span></div><div class="rail design-rail">' + p.design.map(function (g) { return '<figure class="photo" data-lightbox="' + esc(img(g)) + '" style="margin:0;aspect-ratio:16/10;cursor:zoom-in"><img loading="lazy" src="' + esc(img(g)) + '" alt="' + esc(U("illustrative").replace(/<[^>]+>/g, "")) + '"></figure>'; }).join("") + "</div></div></section>";
    if ((p.gallery || []).length) html += '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("gallery") + '</h2><div class="masonry" style="margin-top:16px">' + p.gallery.map(function (g) { return '<figure data-lightbox="' + esc(img(g)) + '"><img loading="lazy" src="' + esc(img(g)) + '" alt=""></figure>'; }).join("") + "</div></div></section>";
    return html;
  };
  function floorList() {
    var F = C.floors || {};
    return ["mosque", "academic"].map(function (k) { return '<div style="padding:6px 6px 2px;font-weight:700">' + U(k) + "</div>" + (F[k] || []).map(function (f, i) { return '<div class="floor-row" data-floor="' + k + ":" + i + '"><i class="sw st-' + esc(f.status) + '"></i><div><b>' + T(f.label) + "</b><small>" + T(f.use) + "</small></div>" + '<span class="faint">' + U("status_" + f.status) + "</span></div>"; }).join(""); }).join("");
  }

  P.initiatives = function () {
    return pageHead(U("nav_initiatives"), U("nav_initiatives"), U("init_lead"), crumbs([[U("nav_initiatives")]])) +
      '<section class="section tight"><div class="wrap grid g3">' + (C.initiatives || []).map(function (i) { return card({ href: "#init-" + i.id, image: i.image, title: T(i.name), text: T(i.summary) }); }).join("") + "</div></section>";
  };
  P.init = function (id) {
    var i = find(C.initiatives, id); if (!i) return P.notfound();
    var vids = (C.videos || []).filter(function (v) { return v.entity === i.id || v.topic === i.id; });
    return pageHead(U("nav_initiatives"), T(i.name), T(i.summary), crumbs([[U("nav_initiatives"), "#initiatives"], [T(i.name)]])) +
      '<section class="section tight"><div class="wrap split" style="align-items:start"><div class="prose rv"><p>' + T(i.body) + '</p><a class="btn primary" href="#donate">' + icon("heart") + U("donate") + '</a> <a class="btn" href="#register">' + U("nav_register") + ARROW + '</a></div><div class="photo rv" style="aspect-ratio:4/3"><img src="' + esc(img(i.image)) + '" alt=""></div></div></section>' +
      (vids.length ? '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("videos") + '</h2><div class="rail" style="margin-top:16px">' + vids.map(vcard).join("") + "</div></div></section>" : "");
  };

  P.media = function () {
    var chans = V.channels || [];
    return pageHead("YouTube", U("nav_media"), "", crumbs([[U("nav_media")]])) +
      '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("documentaries") + '</h2><div class="grid g2" style="margin-top:16px">' + (C.stories || []).map(function (s) { return '<button class="card glass" style="text-align:start;padding:0;cursor:pointer;color:inherit" data-story="' + esc(s.id) + '"><div class="media" style="aspect-ratio:16/8"><img loading="lazy" src="' + esc(img(s.cover)) + '" alt=""><span class="chip gold">' + digits((s.chapters || []).length) + " " + U("chapter") + '</span></div><div class="body"><h3>' + T(s.title) + '</h3><span class="linkarrow">' + icon("play") + U("enter_story") + "</span></div></button>"; }).join("") + "</div></div></section>" +
      '<section class="section tight"><div class="wrap"><div class="sec-head"><div><h2 class="h-section">' + U("all_videos") + '</h2><p class="faint" id="vcount"></p></div><div style="display:flex;gap:8px;flex-wrap:wrap">' + chans.map(function (y) { return '<a class="btn sm" href="' + esc(y.url) + '?sub_confirmation=1" target="_blank" rel="noopener">' + icon("youtube") + esc(y.name) + "</a>"; }).join("") + '</div></div>' +
      '<div class="vfilter"><div class="tabs" id="vch"><button aria-pressed="true" data-ch="">' + U("all") + "</button>" + chans.map(function (c) { return '<button aria-pressed="false" data-ch="' + esc(c.id) + '">' + esc(c.name) + "</button>"; }).join("") + '<button aria-pressed="false" data-ch="live">' + U("live") + '</button></div><select class="input" id="vpl" aria-label="Playlist" style="max-width:260px"><option value="">' + U("playlists") + "</option>" + (V.playlists || []).map(function (p) { return '<option value="' + esc(p.id) + '">' + esc(p.name) + " (" + digits((p.videos || []).length) + ")</option>"; }).join("") + '</select><input class="input" id="vq" type="search" placeholder="' + esc(Uraw("search_videos")) + '"></div>' +
      '<div class="grid g4" id="vgrid"></div><div style="text-align:center;margin-top:22px"><button class="btn" id="vmore">' + U("load_more") + "</button></div></div></section>";
  };
  var vstate = { ch: "", pl: "", q: "", n: 24 };
  function renderVideos() {
    var g = $("#vgrid"); if (!g) return;
    var pl = vstate.pl ? ((V.playlists || []).filter(function (p) { return p.id === vstate.pl; })[0] || {}).videos || [] : null;
    var q = vstate.q.toLowerCase();
    var list = (V.videos || []).filter(function (v) {
      if (vstate.ch === "live" && v.kind !== "live") return false;
      if (vstate.ch && vstate.ch !== "live" && v.channel !== vstate.ch) return false;
      if (pl && pl.indexOf(v.id) < 0) return false;
      if (q && String(v.title).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    g.innerHTML = list.length ? list.slice(0, vstate.n).map(vcard).join("") : '<div class="empty glass" style="grid-column:1/-1">' + U("no_results") + "</div>";
    $("#vmore").style.display = list.length > vstate.n ? "" : "none";
    $("#vcount").textContent = num(list.length) + Uraw("video_count");
  }
  function openPlayer(id, title) {
    var p = $("#player");
    p.innerHTML = '<button class="icon-btn px" data-act="close-player" aria-label="' + Uraw("close") + '">' + icon("x") + '</button><div class="frame"><iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0" title="' + esc(title || "YouTube") + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div><div class="ptitle"><b>' + esc(title || "") + '</b><a href="https://www.youtube.com/watch?v=' + encodeURIComponent(id) + '" target="_blank" rel="noopener">' + U("open_youtube") + " ↗</a></div>";
    p.classList.add("open"); document.body.style.overflow = "hidden";
  }
  function closePlayer() { var p = $("#player"); if (!p.classList.contains("open")) return; p.classList.remove("open"); p.innerHTML = ""; document.body.style.overflow = ""; }
  IBT.openPlayer = openPlayer;

  P.news = function () {
    var today = new Date(new Date().toDateString());
    var ev = (C.events || []).filter(function (e) { return !e.date || parseDate(e.date) >= today; }).sort(function (a, b) { return String(a.date || "9999").localeCompare(String(b.date || "9999")); });
    return pageHead(U("nav_news"), U("nav_news"), "", crumbs([[U("nav_news")]])) +
      '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("programmes") + '</h2><div class="grid" style="margin-top:16px">' + (ev.length ? ev.map(eventRow).join("") : '<div class="empty glass">—</div>') + "</div></div></section>" +
      '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("activities") + '</h2><div class="grid g3" style="margin-top:16px">' + sortedNews().map(newsCard).join("") + "</div></div></section>";
  };
  function eventRow(e) {
    var d = e.date ? parseDate(e.date) : null, action = "";
    var head = d ? '<b>' + new Intl.DateTimeFormat(LOC[state.lang], { day: "numeric" }).format(d) + "</b><small>" + new Intl.DateTimeFormat(LOC[state.lang], { month: "short" }).format(d) + "</small>" : icon(e.type === "qa" ? "dawah" : e.type === "event" ? "cal" : "education");
    if (e.registration) action += '<a class="btn sm primary" href="#reg-' + esc(e.registration) + '">' + U("register_now") + "</a>";
    if (e.video) action += '<button class="btn sm" data-play="' + esc(e.video) + '" data-title="' + esc(tr(e.title)) + '">' + icon("play") + U("watch") + "</button>";
    if (e.link) action += '<a class="btn sm" href="' + esc(e.link) + '" target="_blank" rel="noopener">' + icon("youtube") + U("open_youtube") + "</a>";
    if (d) { var ics = "data:text/calendar;charset=utf-8," + encodeURIComponent("BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:" + e.date.replace(/-/g, "") + "T" + (e.time || "09:00").replace(":", "") + "00\nSUMMARY:" + tr(e.title) + "\nLOCATION:" + tr(e.venue) + "\nEND:VEVENT\nEND:VCALENDAR"); action += '<a class="btn sm" href="' + ics + '" target="_blank" rel="noopener" aria-label="Calendar">' + icon("cal") + "</a>"; }
    return '<div class="ev glass rv"><div class="dt">' + head + '</div><div><b>' + T(e.title) + '</b><div class="muted" style="font-size:.92rem">' + (e.recurring ? '<span class="chip muted">' + T(e.recurring) + "</span> " : "") + T(e.venue) + (e.time ? " · " + digits(e.time) : "") + "</div>" + (d ? '<div class="faint" style="font-size:.85rem">' + U("hijri") + ": " + esc(hijri(e.date)) + "</div>" : "") + '</div><div style="display:flex;gap:8px;flex-wrap:wrap">' + action + "</div></div>";
  }
  P.newsItem = function (id) {
    var n = find(C.news, id); if (!n) return P.notfound();
    var full = String(n.date || "").split("-").length === 3;
    var media = n.video ? '<button class="cover vcover" data-play="' + esc(n.video) + '" data-title="' + esc(tr(n.title)) + '"><img src="' + esc(img(n.image || "yt:" + n.video)) + '" alt=""><span class="pl">' + icon("play") + "</span></button>" : (n.image ? '<div class="cover"><img src="' + esc(img(n.image)) + '" alt=""></div>' : "");
    return pageHead(fdate(n.date) + (full ? " · " + esc(hijri(n.date)) : ""), T(n.title), "", crumbs([[U("nav_news"), "#news"], [T(n.title)]])) +
      '<section class="section tight" style="padding-top:0"><div class="wrap">' + media + '<div class="prose" style="margin-top:24px"><p class="lead">' + T(n.summary) + "</p>" + (n.body ? "<p>" + T(n.body) + "</p>" : "") + (n.source ? '<div class="src">' + U("source") + ": " + esc(n.source) + "</div>" : "") + reviewNote(n) + "</div></div></section>";
  };

  function regCard(r) {
    var st = regStatus(r), fees = r.fees || [];
    var meta = (r.closes ? "<span>" + icon("cal") + " " + U("closes") + ": " + fdate(r.closes) + "</span>" : "") + "<span>" + icon("pin") + " " + T(r.venue) + "</span>" + (fees.length ? "<span>" + T(fees[0].label) + ": <b>" + esc(fees[0].amount) + "</b></span>" : "");
    return '<div class="reg glass rv"><div class="media"><img loading="lazy" src="' + esc(img(r.image)) + '" alt=""></div><div class="body"><div style="display:flex;gap:8px;flex-wrap:wrap">' + regChip(r) + '</div><h3 style="margin:0">' + T(r.title) + '</h3><p class="muted" style="margin:0">' + T(r.text) + '</p><div class="meta">' + meta + '</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px"><a class="btn sm ' + (st === "open" ? "primary" : "") + '" href="#reg-' + esc(r.id) + '">' + (st === "open" ? U("register_now") : U("learn_more")) + ARROW + "</a></div></div></div>";
  }
  P.register = function () {
    var regs = (C.registrations || []).slice().sort(function (a, b) { var o = { open: 0, soon: 1, info: 2, closed: 3 }; return o[regStatus(a)] - o[regStatus(b)]; });
    return pageHead(U("nav_register"), U("nav_register"), "", crumbs([[U("nav_register")]])) + '<section class="section tight"><div class="wrap grid">' + regs.map(regCard).join("") + "</div></section>";
  };
  P.reg = function (id) {
    var r = find(C.registrations, id) || (C.registrations || []).filter(function (x) { return x.slug === id; })[0]; if (!r) return P.notfound();
    var st = regStatus(r), c = C.settings.contact;
    var share = location.href.split("#")[0] + "#r-" + (r.slug || r.id);
    var action = "";
    if (st === "open") {
      if (r.mode !== "native" && r.formUrl) action = '<a class="btn primary" href="' + esc(prefill(r)) + '" target="_blank" rel="noopener">' + U("open_form") + icon("ext") + '</a><p class="faint" style="margin-top:10px">Google Forms</p>';
      else action = (r.mode !== "native" ? '<div class="notice info" style="margin-bottom:14px">' + U("form_pending") + "</div>" : "") + submitForm("registration", r.id, r.fields && r.fields.length ? r.fields : r.formType === "admission" ? [["student", "text", true, null, "student_name"], ["guardian", "text", true, null, "guardian_name"], ["phone", "tel", true], ["age_class", "text", true, null, "age_class"], ["message", "textarea", false]] : [["name", "text", true], ["phone", "tel", true], ["email", "email", false], ["message", "textarea", false]]);
    } else if (st === "info") action = '<div class="notice info"><b>' + U("contact_office") + '</b><div class="ltr" style="margin-top:6px">' + (c.phones || []).map(function (p) { return '<a href="tel:' + esc(p.replace(/[^+\d]/g, "")) + '">' + esc(p) + "</a>"; }).join(" · ") + "</div></div>";
    else action = '<div class="notice info">' + U("reg_" + st) + (st === "soon" && r.opens ? " · " + U("opens") + ": " + fdate(r.opens) : "") + "</div>";
    var kv = (r.opens ? "<dt>" + U("opens") + "</dt><dd>" + fdate(r.opens) + "</dd>" : "") + (r.closes ? "<dt>" + U("closes") + "</dt><dd>" + fdate(r.closes) + (st === "open" ? ' <span class="countdown" data-until="' + esc(r.closes) + '"></span>' : "") + "</dd>" : "") + "<dt>" + U("venue") + "</dt><dd>" + T(r.venue) + "</dd>";
    var list = function (title, arr) { return arr && arr.length ? '<h3 style="font-size:1.05rem;margin:20px 0 8px">' + U(title) + '</h3><ul class="check">' + arr.map(function (x) { return "<li>" + T(x) + "</li>"; }).join("") + "</ul>" : ""; };
    var fees = (r.fees || []).length ? '<h3 style="font-size:1.05rem;margin:20px 0 8px">' + U("fees") + '</h3><table class="fees">' + r.fees.map(function (f) { return "<tr><td>" + T(f.label) + '</td><td class="ltr">' + esc(f.amount) + "</td></tr>"; }).join("") + "</table>" + (r.feeNote ? '<p class="faint" style="margin-top:8px">' + T(r.feeNote) + "</p>" : "") : "";
    return pageHead(regChip(r), T(r.title), T(r.text), crumbs([[U("nav_register"), "#register"], [T(r.title)]])) +
      '<section class="section tight" style="padding-top:0"><div class="wrap split" style="align-items:start"><div class="glass" style="padding:24px"><dl class="kv">' + kv + "</dl>" + list(r.type === "event" || r.type === "membership" ? "at_a_glance" : "course_facts", r.facts) + list("eligibility", r.eligibility) + fees + (r.source ? '<div class="src">' + U("source") + ': <a href="' + esc(r.source) + '" target="_blank" rel="noopener">' + esc(r.source.replace(/^https?:\/\/(www\.)?/, "")) + "</a></div>" : "") + '<hr style="border:0;border-top:1px solid var(--line);margin:18px 0">' + action + "</div><div>" +
      (r.video ? '<button class="cover vcover" data-play="' + esc(r.video) + '" data-title="' + esc(tr(r.title)) + '" style="aspect-ratio:16/9"><img src="' + esc(ytThumb(r.video)) + '" alt=""><span class="pl">' + icon("play") + "</span></button>" : '<div class="photo" style="aspect-ratio:16/10"><img src="' + esc(img(r.image)) + '" alt=""></div>') +
      '<div class="glass" style="padding:18px;margin-top:16px;display:flex;gap:16px;align-items:center;flex-wrap:wrap"><div class="qr" id="qrBox" data-url="' + esc(share) + '"></div><div style="flex:1;min-width:200px"><b>' + U("share_link") + '</b><div class="faint ltr" style="word-break:break-all;margin:6px 0">' + esc(share) + '</div><button class="btn sm" data-copy="' + esc(share) + '">' + icon("copy") + U("copy") + "</button></div></div></div></div></section>";
  };
  function prefill(r) {
    var u = r.formUrl || ""; if (!u) return "";
    var map = r.prefill || {}; var q = [];
    Object.keys(map).forEach(function (entry) { var v = map[entry]; v = v === "{lang}" ? state.lang : v === "{source}" ? "website" : v === "{title}" ? tr(r.title) : v; q.push(encodeURIComponent(entry) + "=" + encodeURIComponent(v)); });
    q.push("utm_source=website");
    return u + (u.indexOf("?") > -1 ? "&" : "?") + q.join("&");
  }
  function submitForm(kind, ref, fields) {
    return '<form class="form" data-submit="' + kind + '" data-ref="' + esc(ref || "") + '">' + fields.map(function (f) {
      var id = "f_" + kind + "_" + f[0];
      var input = f[1] === "textarea" ? '<textarea class="input" id="' + id + '" name="' + f[0] + '"' + (f[2] ? " required" : "") + "></textarea>" : f[1] === "select" ? '<select class="input" id="' + id + '" name="' + f[0] + '">' + f[3].map(function (o) { return '<option value="' + esc(o[0]) + '">' + o[1] + "</option>"; }).join("") + "</select>" : '<input class="input" id="' + id + '" name="' + f[0] + '" type="' + f[1] + '"' + (f[2] ? " required" : "") + (f[1] === "tel" ? ' dir="ltr" inputmode="tel"' : "") + ">";
      return '<div class="field"><label for="' + id + '">' + U(f[4] || f[0]) + (f[2] ? " *" : "") + "</label>" + input + "</div>";
    }).join("") + '<button class="btn primary" type="submit">' + U("submit") + '</button><div class="out" aria-live="polite"></div></form>';
  }

  P.donate = function () {
    var funds = C.funds || [], pay = C.payment || {}, D = C.donateCopy || {};
    var f0 = state.fund || (funds[0] && funds[0].id);
    var html = pageHead(U("donate"), tr({ bn: "আপনার সাদাকাহ, স্থায়ী কল্যাণ", en: "Your sadaqah, a lasting good", ar: "صدقتك خيرٌ باقٍ" }), T(D.transparency), crumbs([[U("donate")]]));
    html += '<section class="section tight" style="padding-top:0"><div class="wrap split" style="align-items:start"><div class="glass donate-box rv" id="donateBox"><h2 style="font-size:1.3rem">' + U("choose_fund") + '</h2><div class="fund-grid" role="group">' + funds.map(function (f) { return '<button class="fund-opt" aria-pressed="' + (f.id === f0) + '" data-fund-pick="' + esc(f.id) + '">' + T(f.name) + "</button>"; }).join("") + '</div><div id="fundDesc" class="muted" style="margin:14px 0"></div><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:14px"><div class="seg" role="group"><button aria-pressed="true" data-freq="once">' + U("one_time") + '</button><button aria-pressed="false" data-freq="monthly">' + U("monthly") + '</button></div></div><div class="amts" id="amts"></div><div class="field" style="margin-top:12px"><label for="amt">' + U("amount") + '</label><input class="input" id="amt" type="number" min="10" inputmode="numeric" dir="ltr"></div><div class="notice info" style="margin-top:14px">' + (pay.gatewayLive ? "" : U("gateway_soon")) + '</div><div id="autopay" class="glass" style="padding:14px;margin-top:12px;display:none"><b>' + U("autopay_title") + '</b><p class="muted" style="margin:6px 0 0;font-size:.93rem">' + U("autopay_text") + '</p></div></div><div class="grid rv"><h2 style="font-size:1.3rem;margin:0">' + U("pay_channels") + "</h2>" +
      (pay.channels || []).filter(function (c) { return c.show; }).map(function (c) { var col = { bkash: "#e2136e", nagad: "#f7941d", rocket: "#8c3494", bank: "#0b5d3b" }[c.type] || "#334"; return '<div class="channel glass"><div class="logo" style="background:' + col + '">' + esc(c.type.toUpperCase().slice(0, 5)) + '</div><div><b>' + T(c.name) + '</b><div class="num">' + esc(c.number) + '</div><div class="faint">' + T(c.note) + '</div></div><button class="icon-btn" data-copy="' + esc(c.number.replace(/\s/g, "")) + '" aria-label="' + Uraw("copy") + '">' + icon("copy") + "</button></div>"; }).join("") + reviewNote(pay) + "</div></div></section>";
    html += '<section class="section tight"><div class="wrap split" style="align-items:start"><div class="glass rv" style="padding:24px"><h2 style="font-size:1.3rem">' + U("report_donation") + '</h2><p class="muted">' + U("report_donation_text") + "</p>" + submitForm("donation", "", [["name", "text", true], ["phone", "tel", true], ["amount", "number", true, null, "amount"], ["channel", "select", true, (pay.channels || []).map(function (c) { return [c.type, tr(c.name)]; }), "channel"], ["txn", "text", true, null, "txn_id"], ["date", "date", true], ["fund", "select", true, funds.map(function (f) { return [f.id, tr(f.name)]; }), "choose_fund"]]) + '</div><div class="grid">' + (D.motivations || []).map(function (m) { return '<div class="glass rv" style="padding:20px"><h3 style="font-size:1.1rem">' + T(m.title) + '</h3><p style="margin:0">' + T(m.text) + '</p><cite class="faint" style="font-style:normal">' + T(m.ref) + "</cite></div>"; }).join("") + reviewNote(D) + "</div></div></section>";
    var si = C.supportItems;
    if (si) html += '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("support_items") + '</h2><div class="grid g3" style="margin-top:16px">' + (si.items || []).map(function (s) { return '<div class="glass rv" style="padding:18px;display:flex;justify-content:space-between;gap:10px;align-items:center"><span>' + T(s.name) + "</span><b>" + (s.status === "done" ? '<span class="chip">' + U("completed") + "</span>" : money(s.amount)) + "</b></div>"; }).join("") + '</div><p class="faint" style="margin-top:12px">' + U("as_of") + " " + fdate(si.asOf) + "</p></div></section>";
    return html;
  };
  function wireDonate() {
    var funds = C.funds || []; if (!$("#donateBox")) return;
    var cur = state.fund || (funds[0] && funds[0].id), freq = "once";
    function upd() {
      var f = find(funds, cur) || funds[0]; if (!f) return;
      $$("[data-fund-pick]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.fundPick === cur ? "true" : "false"); });
      $("#fundDesc").innerHTML = T(f.text);
      $("#amts").innerHTML = (f.suggested || []).map(function (a) { return '<button data-amt="' + a + '" aria-pressed="false">' + money(a) + "</button>"; }).join("");
      $("#autopay").style.display = freq === "monthly" ? "block" : "none";
    }
    $("#donateBox").addEventListener("click", function (e) {
      var b = e.target.closest("[data-fund-pick]"); if (b) { cur = b.dataset.fundPick; state.fund = cur; upd(); }
      var q = e.target.closest("[data-freq]"); if (q) { freq = q.dataset.freq; $$("[data-freq]").forEach(function (x) { x.setAttribute("aria-pressed", x === q ? "true" : "false"); }); upd(); }
      var a = e.target.closest("[data-amt]"); if (a) { $$("[data-amt]").forEach(function (x) { x.setAttribute("aria-pressed", x === a ? "true" : "false"); }); $("#amt").value = a.dataset.amt; }
    });
    upd();
  }

  P.transparency = function () {
    return pageHead(U("nav_transparency"), tr({ bn: "স্বচ্ছতা, জবাবদিহিতা ও প্রাতিষ্ঠানিক দায়বদ্ধতা", en: "Transparency, accountability & institutional responsibility", ar: "الشفافية والمساءلة والمسؤولية المؤسسية" }), T((C.donateCopy || {}).transparency), crumbs([[U("nav_transparency")]])) +
      impactSection() +
      '<section class="section tight"><div class="wrap"><h2 class="h-section">' + U("reports") + '</h2><div class="grid g2" style="margin-top:16px">' + (C.reports || []).map(function (r) { return '<div class="glass rv" style="padding:18px;display:flex;gap:14px;align-items:center"><span class="icon-btn" style="flex:none">' + icon("doc") + '</span><div style="flex:1"><b>' + T(r.title) + '</b><div class="faint">' + digits(r.year) + " · " + esc(r.type) + "</div></div>" + (r.url ? '<a class="btn sm" href="' + esc(img(r.url)) + '" target="_blank" rel="noopener">PDF ' + icon("ext") + "</a>" : '<span class="chip muted">' + T(r.note) + "</span>") + "</div>"; }).join("") + "</div></div></section>";
  };

  P.contact = function () {
    var c = C.settings.contact;
    return pageHead(U("nav_contact"), U("contact_form"), "", crumbs([[U("nav_contact")]])) +
      '<section class="section tight" style="padding-top:0"><div class="wrap split" style="align-items:start"><div class="glass rv" style="padding:24px">' + submitForm("contact", "", [["name", "text", true], ["phone", "tel", false], ["email", "email", false], ["message", "textarea", true]]) + '</div><div class="grid rv"><div class="glass" style="padding:20px"><h3>' + U("office") + '</h3><p class="muted">' + T(c.office) + '</p><p class="muted">' + T(c.hours) + '</p></div><div class="glass" style="padding:20px"><h3>' + U("project_site") + '</h3><p class="muted">' + T(c.site) + '</p><a class="btn sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=New+Dhaka+City+Palashpur+Dhaka+Mawa+Expressway">' + icon("pin") + " Google Maps" + icon("ext") + '</a></div><div class="glass" style="padding:20px"><div class="ltr" style="display:grid;gap:6px">' + (c.phones || []).map(function (p) { return "<span>" + icon("phone") + " " + esc(p) + "</span>"; }).join("") + "<span>" + icon("mail") + " " + esc(c.email) + "</span>" + (c.email2 ? "<span>" + icon("mail") + " " + esc(c.email2) + "</span>" : "") + '</div><div class="socials" style="margin-top:12px">' + (C.settings.social || []).map(function (s) { return '<a class="btn sm" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + icon(s.icon === "x" ? "x2" : s.icon) + esc(s.name) + "</a>"; }).join("") + "</div></div></div></div></section>";
  };
  P.notfound = function () { return pageHead("404", tr({ bn: "পেজটি পাওয়া যায়নি", en: "Page not found", ar: "الصفحة غير موجودة" }), '<a class="btn" href="#home">' + U("nav_home") + "</a>"); };
  P.admin = function () {
    if (!window.IBTAdmin) return pageHead("", "Admin", "Loading…");
    return '<div id="adminRoot"></div>';
  };

  // ---------- story mode ----------
  var storyIdx = 0, storyCur = null;
  IBT.openStory = function (id) {
    var s = find(C.stories, id); if (!s) return;
    storyCur = s; storyIdx = Math.min(+ls("ibt_story_" + id) || 0, (s.chapters || []).length - 1);
    var el = $("#story");
    el.innerHTML = '<aside class="rail-ch"><h3>' + T(s.title) + "</h3>" + s.chapters.map(function (c, i) { return '<button data-ch="' + i + '"><span class="n">' + digits(i + 1) + '</span><span class="t">' + T(c.title) + "</span></button>"; }).join("") + '</aside><div class="stage">' + s.chapters.map(function (c, i) { return '<div class="slide" data-slide="' + i + '"><img src="' + esc(img(c.image)) + '" alt=""><div class="cap glass dense"><div class="num">' + U("chapter") + " " + digits(i + 1) + " / " + digits(s.chapters.length) + "</div><h2>" + T(c.title) + "</h2><p>" + T(c.text) + "</p>" + (c.video ? '<a class="btn sm" style="color:#fff;background:rgba(255,255,255,.1)" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=' + esc(c.video) + (c.start ? "&t=" + (+c.start) + "s" : "") + '">' + icon("youtube") + U("watch_youtube") + (c.start ? " · " + U("watch_from") + " " + digits(Math.floor(c.start / 60) + ":" + ("0" + c.start % 60).slice(-2)) : "") + "</a>" : "") + "</div></div>"; }).join("") +
      '<div class="viz"><span class="chip gold">' + T(s.title) + '</span></div><div class="ctrl"><button class="btn sm" data-sp="-1">' + U("prev") + '</button><div class="prog"><i></i></div><button class="btn sm" data-sp="1">' + U("next") + '</button></div><div class="x"><button class="icon-btn" data-act="close-story" aria-label="' + Uraw("close") + '">' + icon("x") + "</button></div></div>";
    el.classList.add("open"); el.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
    storyGo(storyIdx); $("[data-act=close-story]", el).focus();
  };
  function storyGo(i) {
    var s = storyCur; if (!s) return; var n = s.chapters.length; storyIdx = Math.max(0, Math.min(n - 1, i));
    $$("#story .slide").forEach(function (sl, k) { sl.classList.toggle("on", k === storyIdx); });
    $$("#story [data-ch]").forEach(function (b, k) { b.setAttribute("aria-current", k === storyIdx ? "true" : "false"); });
    $("#story .prog i").style.width = ((storyIdx + 1) / n * 100) + "%";
    ls("ibt_story_" + s.id, String(storyIdx));
  }
  function closeStory() { var el = $("#story"); el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); el.innerHTML = ""; document.body.style.overflow = ""; storyCur = null; }

  // ---------- search ----------
  function searchIndex() {
    var out = [];
    (C.institutions || []).forEach(function (i) { out.push([tr(i.name), tr(i.summary), i.link || "#inst-" + i.id]); });
    (C.projects || []).forEach(function (i) { out.push([tr(i.name), tr(i.summary), "#project-" + i.id]); });
    (C.initiatives || []).forEach(function (i) { out.push([tr(i.name), tr(i.summary), "#init-" + i.id]); });
    (C.registrations || []).forEach(function (i) { out.push([tr(i.title), tr(i.text), "#reg-" + i.id]); });
    (C.news || []).forEach(function (i) { out.push([tr(i.title), tr(i.summary), "#news-" + i.id]); });
    (V.videos || []).forEach(function (v) { out.push([v.title, "YouTube" + (v.approx ? " · " + v.approx : ""), "yt:" + v.id]); });
    (C.funds || []).forEach(function (f) { out.push([tr(f.name), tr(f.text), "#donate"]); });
    return out;
  }
  function doSearch(q) {
    q = q.trim().toLowerCase(); var res = $("#searchRes");
    if (!q) { res.innerHTML = ""; return; }
    var hits = searchIndex().filter(function (r) { return (r[0] + " " + r[1]).toLowerCase().indexOf(q) > -1; }).slice(0, 20);
    res.innerHTML = hits.length ? hits.map(function (h) { var yt = h[2].indexOf("yt:") === 0, ext = h[2].indexOf("http") === 0; return '<a href="' + (yt ? "#media" : esc(h[2])) + '"' + (yt ? ' data-play="' + esc(h[2].slice(3)) + '" data-title="' + esc(h[0]) + '"' : "") + (ext ? ' target="_blank" rel="noopener"' : "") + "><b>" + esc(h[0]) + "</b><small>" + esc(h[1].slice(0, 120)) + "</small></a>"; }).join("") : '<div class="empty">' + U("no_results") + "</div>";
  }

  // ---------- router ----------
  var scenes = IBT._scenes = [];
  function route() {
    if (!C) return;
    var h = (location.hash || "#home").slice(1) || "home";
    if (h.indexOf("r-") === 0) { var r = (C.registrations || []).filter(function (x) { return x.slug === h.slice(2) || x.id === h.slice(2); })[0]; if (r) { location.replace("#reg-" + r.id); return; } }
    if (h.indexOf("story-") === 0) { IBT.openStory(h.slice(6)); return; }
    if (h === "hero" || h === "tracker" || h === "main") return;
    state.route = h; renderMain();
  }
  function renderMain() {
    scenes.forEach(function (s) { s && s.destroy && s.destroy(); }); scenes.length = 0;
    (IBT.beforeHooks || []).forEach(function (fn) { try { fn(); } catch (e) { } });
    var h = state.route, html;
    var m = h.match(/^(inst|project|init|news|reg|fund)-(.+)$/);
    if (m) html = (m[1] === "news" ? P.newsItem : P[m[1]])(m[2]);
    else html = (P[h] || P.notfound)();
    var main = $("#main"); main.innerHTML = html;
    $$(".ng").forEach(function (g) { g.classList.toggle("active", !!$$(".ng-menu a", g).filter(function (x) { var n = x.dataset.nav; return h === n || (n !== "transparency" && h.indexOf(n + "-") === 0); }).length); });
    $$(".nav a, .more-menu a").forEach(function (a) { a.classList.toggle("active", h.indexOf(a.dataset.nav) === 0 || (a.dataset.nav === "institutions" && h.indexOf("inst-") === 0) || (a.dataset.nav === "projects" && h.indexOf("project-") === 0) || (a.dataset.nav === "initiatives" && h.indexOf("init-") === 0) || (a.dataset.nav === "register" && h.indexOf("reg-") === 0)); });
    if (!IBT._noscroll) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    IBT._noscroll = false;
    $("#drawer").classList.remove("open");
    afterRender();
    var titles = { home: "", donate: Uraw("donate") }; document.title = tr(C.settings.siteName) + (h !== "home" ? " · " + (($("h1") || {}).textContent || titles[h] || "") : " · " + tr(C.settings.tagline));
    if (h === "admin" && window.IBTAdmin) window.IBTAdmin.render($("#adminRoot"));
    (IBT.afterHooks || []).forEach(function (fn) { try { fn(h); } catch (e) { if (window.console) console.error(e); } });
  }
  function renderAll() { renderHeader(); renderFooter(); IBT._noscroll = true; renderMain(); }
  IBT.rerender = renderAll;

  function afterRender() {
    // reveal + counters
    var nomo = document.documentElement.classList.contains("nomotion");
    var io = ("IntersectionObserver" in window && !nomo) ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); countIn(e.target); } }); }, { threshold: 0.12 }) : null;
    $$(".rv").forEach(function (el) { if (io) io.observe(el); else { el.classList.add("in"); countIn(el); } });
    // tilt
    if (false) $$(".tilt").forEach(function (el) {
      el.addEventListener("pointermove", function (e) { var r = el.getBoundingClientRect(); var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; el.style.transform = "perspective(800px) rotateY(" + (x * 8) + "deg) rotateX(" + (-y * 8) + "deg) translateZ(6px)"; });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
    // 3D hero
    var hp = $(".hero-photo"); if (hp) { var sl = mountSlides(hp); if (sl) scenes.push(sl); }
    var tc = $("#trackerCanvas");
    if (tc) {
      var s2 = window.IBT3D && !document.documentElement.classList.contains("lowfx") ? window.IBT3D.mount(tc, { mode: "tracker", floors: C.floors, theme: state.theme, night: state.theme === "dark", onPick: showFloor }) : null;
      if (s2) scenes.push(s2); else { tc.remove(); $("#trackerFallback").style.display = "block"; }
    }
    wireDonate();
    if ($("#vgrid") && state.route === "media") { vstate = { ch: "", pl: "", q: "", n: 24 }; renderVideos(); }
    var qb = $("#qrBox"); if (qb) makeQR(qb);
    $$(".countdown").forEach(function (el) { var d = parseDate(el.dataset.until); d.setHours(23, 59, 59); var days = Math.ceil((d - new Date()) / 864e5); el.textContent = "· " + digits(days) + " " + tr({ bn: "দিন বাকি", en: "days left", ar: "يومًا متبقيًا" }); });
  }
  function allDone() { var F = C.floors || {}; function m(a) { return (a || []).map(function (f) { return { status: "done", label: f.label }; }); } return { mosque: m(F.mosque), academic: m(F.academic) }; }
  function showFloor(kind, idx) {
    var f = ((C.floors || {})[kind] || [])[idx]; if (!f) return;
    var tip = $("#floorTip"); tip.innerHTML = "<b>" + U(kind) + " · " + T(f.label) + '</b><div class="muted">' + T(f.use) + '</div><div style="margin-top:6px">' + statusChip(f.status) + "</div>"; tip.classList.add("show");
    $$(".floor-row").forEach(function (r) { r.classList.toggle("sel", r.dataset.floor === kind + ":" + idx); });
    var row = $('.floor-row[data-floor="' + kind + ":" + idx + '"]'); if (row) row.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  function countIn(root) {
    $$("[data-count]", root).forEach(function (el) {
      if (el._done) return; el._done = true;
      // statistics are shown at their recorded value; no counting animation (it showed wrong numbers mid-way)
      if (el.dataset.plain || true) { if (!el.textContent.trim() || el.textContent === digits(0)) el.textContent = num(parseFloat(el.dataset.count) || 0) + (el.dataset.suffix || ""); return; }
      var to = parseFloat(el.dataset.count) || 0, suf = el.dataset.suffix || "", t0 = performance.now(), dur = document.documentElement.classList.contains("nomotion") ? 1 : 1400;
      (function step(now) { var p = Math.min(1, (now - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - p, 3))); el.textContent = num(v) + suf; if (p < 1) requestAnimationFrame(step); })(t0);
    });
  }
  function makeQR(box) {
    function draw() { try { box.innerHTML = ""; new window.QRCode(box, { text: box.dataset.url, width: 128, height: 128, correctLevel: window.QRCode.CorrectLevel.M }); } catch (e) { box.style.display = "none"; } }
    if (window.QRCode) return draw();
    var sc = document.createElement("script"); sc.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"; sc.onload = draw; sc.onerror = function () { box.style.display = "none"; }; document.head.appendChild(sc);
  }

  // ---------- events ----------
  document.addEventListener("click", function (e) {
    var t = e.target;
    var pv = t.closest("[data-play]"); if (pv) { e.preventDefault(); $("#search").classList.remove("open"); openPlayer(pv.dataset.play, pv.dataset.title); return; }
    if (t.closest("[data-act=close-player]") || t === $("#player")) { closePlayer(); return; }
    var vc = t.closest("#vch [data-ch]"); if (vc) { $$("#vch button").forEach(function (b) { b.setAttribute("aria-pressed", b === vc ? "true" : "false"); }); vstate.ch = vc.dataset.ch; vstate.n = 24; renderVideos(); return; }
    if (t.closest("#vmore")) { vstate.n += 24; renderVideos(); return; }
    var st = t.closest("[data-story]"); if (st) { e.preventDefault(); IBT.openStory(st.dataset.story); return; }
    var lb = t.closest("[data-lightbox]"); if (lb) { var L = $("#lightbox"); L.innerHTML = '<img src="' + esc(lb.dataset.lightbox) + '" alt="">'; L.classList.add("open"); return; }
    if (t.closest("#lightbox")) { $("#lightbox").classList.remove("open"); return; }
    var ch = t.closest("#story [data-ch]"); if (ch) { storyGo(+ch.dataset.ch); return; }
    var sp = t.closest("#story [data-sp]"); if (sp) { storyGo(storyIdx + (+sp.dataset.sp)); return; }
    if (t.closest("[data-act=close-story]")) { closeStory(); if (location.hash.indexOf("#story-") === 0) history.replaceState(null, "", "#" + state.route); return; }
    var lb2 = t.closest(".lang-switch button, .lang-mini-menu button"); if (lb2) { var lm = $("#langMini"); if (lm) lm.classList.remove("open"); IBT.setLang(lb2.dataset.l); return; }
    if (t.closest("#themeBtn")) { var order = ["auto", "light", "dark"]; IBT.setTheme(order[(order.indexOf(state.themePref || "auto") + 1) % 3]); toast(Uraw("theme_" + state.themePref)); return; }
    if (t.closest("#menuBtn")) { $("#drawer").classList.add("open"); return; }
    if (t.closest("#langMiniBtn")) { $("#langMini").classList.toggle("open"); return; }
    var lmo = $("#langMini"); if (lmo && lmo.classList.contains("open") && !t.closest("#langMini [data-l]")) lmo.classList.remove("open");
    var ngb = t.closest(".ng-btn");
    $$(".ng.open").forEach(function (g) { if (!ngb || g !== ngb.parentElement) { g.classList.remove("open"); $(".ng-btn", g).setAttribute("aria-expanded", "false"); } });
    if (ngb) { var gg = ngb.parentElement, op2 = !gg.classList.contains("open"); gg.classList.toggle("open", op2); ngb.setAttribute("aria-expanded", String(op2)); return; }
    var mb = t.closest("#moreBtn"); var mo = $("#more");
    if (mb) { var op = !mo.classList.contains("open"); mo.classList.toggle("open", op); mb.setAttribute("aria-expanded", String(op)); return; }
    if (mo && mo.classList.contains("open")) { mo.classList.remove("open"); $("#moreBtn").setAttribute("aria-expanded", "false"); }
    if (t.closest("[data-act=close-drawer]") || t.closest("#drawer .scrim")) { $("#drawer").classList.remove("open"); return; }
    if (t.closest("#drawer a")) { $("#drawer").classList.remove("open"); }
    if (t.closest("#searchBtn")) { $("#search").classList.add("open"); setTimeout(function () { $("#searchInput").focus(); }, 30); return; }
    if (t === $("#search")) { $("#search").classList.remove("open"); return; }
    if (t.closest("#search a")) $("#search").classList.remove("open");
    if (t.closest("[data-act=hide-ann]")) { ls("ibt_ann_hide", tr(C.settings.announcement.text)); $("#announce").remove(); document.documentElement.classList.remove("has-ann"); return; }
    var cp = t.closest("[data-copy]"); if (cp) { e.preventDefault(); var txt = cp.dataset.copy; (navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { toast(Uraw("copied") + ": " + txt); }, function () { toast(txt); }); return; }
    var fr = t.closest("[data-floor]"); if (fr) { var p = fr.dataset.floor.split(":"); showFloor(p[0], +p[1]); scenes.forEach(function (s) { s.setSelected && s.setSelected(p[0], +p[1]); }); return; }
    var vt = t.closest("#vtabs [data-topic]"); if (vt) { $$("#vtabs button").forEach(function (b) { b.setAttribute("aria-pressed", b === vt ? "true" : "false"); }); $$("#vgrid > div").forEach(function (d) { d.style.display = vt.dataset.topic === "all" || d.dataset.topic === vt.dataset.topic ? "" : "none"; }); return; }
    var df = t.closest("a[data-fund]"); if (df) state.fund = df.dataset.fund;
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { var mo2 = $("#more"); if (mo2) mo2.classList.remove("open"); $$(".ng.open").forEach(function (g) { g.classList.remove("open"); }); closePlayer(); if ($("#story").classList.contains("open")) closeStory(); $("#search").classList.remove("open"); $("#drawer").classList.remove("open"); $("#lightbox").classList.remove("open"); }
    if ($("#story").classList.contains("open")) { var rtl = state.lang === "ar"; if (e.key === "ArrowRight") storyGo(storyIdx + (rtl ? -1 : 1)); if (e.key === "ArrowLeft") storyGo(storyIdx + (rtl ? 1 : -1)); }
    if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName))) { e.preventDefault(); $("#search").classList.add("open"); $("#searchInput").focus(); }
  });
  document.addEventListener("input", function (e) { if (e.target.id === "searchInput") doSearch(e.target.value); if (e.target.id === "vq") { vstate.q = e.target.value; vstate.n = 24; renderVideos(); } });
  document.addEventListener("change", function (e) { if (e.target.id === "vpl") { vstate.pl = e.target.value; vstate.n = 24; renderVideos(); } });
  document.addEventListener("submit", function (e) {
    var f = e.target.closest("form[data-submit]"); if (!f) return; e.preventDefault();
    var out = $(".out", f), data = {}; new FormData(f).forEach(function (v, k) { data[k] = String(v).slice(0, 2000); });
    var btn = $("button[type=submit]", f); btn.disabled = true;
    IBT.submit(f.dataset.submit, f.dataset.ref, data).then(function () { out.innerHTML = '<div class="notice ok">' + U("sent_ok") + "</div>"; f.reset(); }, function () {
      var c = C.settings.contact, title = (($("h1") || {}).textContent || "").trim(), body = Object.keys(data).map(function (k) { return k + ": " + data[k]; }).join("\n");
      out.innerHTML = '<div class="notice">' + U("send_fail") + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><a class="btn sm primary" href="mailto:' + esc(c.email) + "?subject=" + encodeURIComponent("[Website] " + title) + "&body=" + encodeURIComponent(body) + '">' + icon("mail") + U("send_by_email") + '</a>' + (c.phones || []).map(function (p) { return '<a class="btn sm ltr" href="tel:' + esc(p.replace(/[^+\d]/g, "")) + '">' + icon("phone") + esc(p) + "</a>"; }).join("") + "</div></div>";
    }).then(function () { btn.disabled = false; });
  });
  window.addEventListener("hashchange", route);
  window.addEventListener("scroll", function () { var h = $(".header"); if (h) h.classList.toggle("scrolled", window.scrollY > 10); var md = $("#mdonate"); if (md) md.classList.toggle("show", window.scrollY > 500); }, { passive: true });

  // ---------- cloud (claude artifact runtime) ----------
  IBT.submit = function (kind, ref, data) {
    if (!cloud.db || !cloud.uid) return Promise.reject(new Error("offline"));
    var docRef = cloud.db.doc("submissions/" + cloud.uid);
    var item = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), kind: kind, ref: ref || "", data: data, lang: state.lang, at: new Date().toISOString(), status: "new" };
    return docRef.get().then(function (snap) {
      var body = snap.exists ? IBT.clone(snap.data()) : { items: [] };
      body.items = (body.items || []).concat([item]).slice(-200);
      return docRef.set(body);
    });
  };
  function mergeCloud(docs) {
    var merged = clone(DEF);
    CMS_KEYS.forEach(function (k) { if (docs[k] && docs[k].data !== undefined) merged[k] = docs[k].data; });
    if (state.preview) CMS_KEYS.forEach(function (k) { if (state.drafts[k] && state.drafts[k].data !== undefined) merged[k] = state.drafts[k].data; });
    C = merged; IBT.C = C;
  }
  IBT.getContent = function () { return C; };
  IBT.refreshAuth = function () { try { cloud.canEdit = !!(cloud.user && cloud.user.canEdit()); } catch (e) { cloud.canEdit = false; } return Promise.resolve(cloud.user && cloud.user.id ? cloud.user.id() : null).then(function (id) { cloud.uid = id || cloud.uid; renderHeader(); }); };
  IBT.getDefaults = function () { return DEF; };
  IBT.published = {};
  IBT.applyCloud = function () { mergeCloud(IBT.published); if (state.route === "admin") { renderHeader(); renderFooter(); } else renderAll(); };
  function initCloud() {
    if (!window.claude || typeof window.claude.use !== "function") return;
    var timer = setTimeout(function () { cloud.ready = true; }, 10000);
    Promise.all([window.claude.use("db"), window.claude.use("user"), window.claude.use("assets")]).then(function (r) {
      cloud.db = r[0]; cloud.user = r[1]; cloud.assets = r[2];
      if (cloud.user) {
        try { cloud.canEdit = !!cloud.user.canEdit(); } catch (e) { cloud.canEdit = false; }
        Promise.resolve(cloud.user.id && cloud.user.id()).then(function (id) { cloud.uid = id || null; }, function () { });
      }
      if (!cloud.db) { clearTimeout(timer); if (cloud.canEdit) renderAll(); return; }
      var first = true;
      cloud.db.collection("cms").onSnapshot(function (snap) {
        var docs = {}; snap.docs.forEach(function (d) { if (d.exists) docs[d.id] = d.data(); });
        IBT.published = docs; clearTimeout(timer); cloud.ready = true;
        if (Object.keys(docs).length || first || cloud.canEdit) { mergeCloud(docs); if (state.route !== "admin" || first) renderAll(); else { renderHeader(); renderFooter(); } }
        first = false;
        if (window.IBTAdmin && window.IBTAdmin.onPublished) window.IBTAdmin.onPublished(docs);
      }, function () { clearTimeout(timer); if (cloud.canEdit) renderAll(); });
    }, function () { clearTimeout(timer); });
  }

  // ---------- boot ----------
  function boot(def) {
    DEF = def; C = clone(def); IBT.C = C;
    var nomo = matchMedia("(prefers-reduced-motion: reduce)").matches; if (nomo) document.documentElement.classList.add("nomotion");
    if (window.IBT3D && window.IBT3D.lowEnd()) document.documentElement.classList.add("lowfx");
    var l = ls("ibt_lang") || (C.settings.defaultLang || "bn");
    var t = ls("ibt_theme") || C.settings.defaultTheme || "auto";
    state.lang = ["bn", "en", "ar"].indexOf(l) > -1 ? l : "bn";
    applyLang(state.lang); applyTheme(["auto", "light", "dark"].indexOf(t) > -1 ? t : "auto");
    renderHeader(); renderFooter();
    route();
    initCloud();
  }
  var vReq = fetch("data/videos.json?h=" + Math.floor(Date.now() / 36e5)).then(function (r) { return r.json(); }).then(function (d) { V = d || V; }, function () { });
  fetch("data/content.json?v=5.0").then(function (r) { return r.json(); }).then(function (d) { return vReq.then(function () { boot(d); }); }).catch(function () {
    $("#main").innerHTML = '<div class="wrap section"><h1>Imam Bukhari Trust</h1><p>Content could not be loaded. Please refresh.</p></div>';
  });
})();
