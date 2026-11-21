/* IBT v5 extras: live broadcast, Facebook feed, website assistant (chatbot), interactive touches */
(function () {
  "use strict";
  var IBT = window.IBT, h = IBT.H, P = IBT.P;
  var $ = h.$, $$ = h.$$, esc = h.esc, tr = h.tr, T = h.T, U = h.U, Uraw = h.Uraw, icon = h.icon, C = h.C, st = h.state;
  function L(o) { return tr(o); }
  var YT_CH = "UCm8It2AWLRt3N22-fL89K_w";
  var FB_URL = "https://www.facebook.com/imambukharitrustbd";
  function phone() { return (((C().settings || {}).contact || {}).phones || ["+880 1852-808554"])[0]; }
  function email() { return ((C().settings || {}).contact || {}).email || "bukharimasjid.bd@gmail.com"; }

  /* ================= live status ================= */
  var live = { items: [], checked: 0 };
  function cmsLive() { var l = (C() || {}).live || {}; return l.show && (l.youtube || l.facebook || l.zoom) ? l : null; }
  function liveNow() { return live.items.filter(function (x) { return x.status === "live"; })[0] || null; }
  function isLive() { return !!(liveNow() || cmsLive()); }
  function markLive() { document.documentElement.classList.toggle("is-live", isLive()); var b = $("#liveBar"); if (b) b.remove(); }
  function pollLive() {
    fetch("data/live.json?m=" + Math.floor(Date.now() / 120000)).then(function (r) { return r.ok ? r.json() : { items: [] }; }).then(function (j) {
      var was = isLive(); live = j || { items: [] }; markLive();
      if (st.route === "live" && was !== isLive()) IBT.rerender();
    }, function () { markLive(); });
  }
  pollLive(); setInterval(pollLive, 120000);

  function ytId(u) { var m = String(u || "").match(/(?:v=|youtu\.be\/|\/live\/|\/embed\/|shorts\/)([\w-]{11})/); return m ? m[1] : ""; }
  function fbEmbed(u) { return "https://www.facebook.com/plugins/video.php?href=" + encodeURIComponent(u) + "&show_text=false&autoplay=true"; }
  function frame(src, title) { return '<div class="live-frame"><iframe src="' + esc(src) + '" title="' + esc(title || "Live") + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>'; }

  P.live = function () {
    var cl = cmsLive(), ln = liveNow(), up = live.items.filter(function (x) { return x.status === "upcoming"; });
    var body = "";
    if (ln || (cl && (cl.youtube || cl.facebook))) {
      var vid = ln ? ln.videoId : ytId(cl && cl.youtube), title = ln ? ln.title : L((cl || {}).title) || Uraw("live_title");
      var src = vid ? "https://www.youtube.com/embed/" + vid + "?autoplay=1&rel=0" : cl && cl.facebook ? fbEmbed(cl.facebook) : "https://www.youtube.com/embed/live_stream?channel=" + YT_CH + "&autoplay=1";
      body += '<div class="live-card"><div class="live-head"><span class="live-pill"><span></span>' + U("live_now") + '</span><h2 class="h-section" style="margin:0">' + esc(title) + "</h2></div>" + frame(src, title) +
        '<div class="live-acts">' + (vid ? '<a class="btn" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=' + vid + '">' + icon("youtube") + U("watch_yt") + "</a>" : "") + (cl && cl.facebook ? '<a class="btn" target="_blank" rel="noopener" href="' + esc(cl.facebook) + '">' + icon("facebook") + U("watch_fb") + "</a>" : "") + (cl && cl.zoom ? zoomBtn(cl) : "") + "</div>" + (cl && L(cl.note) ? '<p class="muted">' + T(cl.note) + "</p>" : "") + "</div>";
    } else if (cl && cl.zoom) {
      body += '<div class="live-card"><div class="live-head"><span class="live-pill"><span></span>' + U("live_now") + '</span><h2 class="h-section" style="margin:0">' + T(cl.title) + '</h2></div><div class="zoom-box">' + icon("video") + "<div>" + (cl.zoomId ? "<p>Meeting ID: <b class=\"ltr\">" + esc(cl.zoomId) + "</b>" + (cl.zoomPass ? " · Passcode: <b class=\"ltr\">" + esc(cl.zoomPass) + "</b>" : "") + "</p>" : "") + zoomBtn(cl) + "</div></div>" + (L(cl.note) ? '<p class="muted">' + T(cl.note) + "</p>" : "") + "</div>";
    } else {
      body += '<div class="live-off"><div class="live-ic">' + icon("video") + '</div><h2 class="h-section">' + U("live_off") + '</h2><p class="muted">' + U("live_off_text") + "</p>" +
        (up.length ? '<div class="live-up">' + up.map(function (u) { return '<a class="live-upc" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=' + esc(u.videoId) + '"><img src="' + esc(h.ytThumb(u.videoId, true)) + '" alt=""><span><small>' + U("live_upcoming") + (u.start ? " · " + esc(new Date(u.start).toLocaleString(h.LOC[st.lang], { dateStyle: "medium", timeStyle: "short" })) : "") + "</small><b>" + esc(u.title) + "</b></span></a>"; }).join("") + "</div>" : "") +
        '<div class="live-acts" style="justify-content:center"><a class="btn primary" href="#media">' + icon("play") + U("nav_media") + '</a><a class="btn" target="_blank" rel="noopener" href="https://www.youtube.com/channel/' + YT_CH + '/streams">' + icon("youtube") + "YouTube</a><a class=\"btn\" target=\"_blank\" rel=\"noopener\" href=\"" + FB_URL + "/live\">" + icon("facebook") + "Facebook</a></div></div>";
    }
    return h.pageHead(U("nav_media"), U("live_title"), U("live_intro"), h.crumbs([[U("nav_live")]])) + '<section class="section tight" style="padding-top:0"><div class="wrap">' + body + "</div></section>" +
      '<section class="section tight"><div class="wrap">' + fbSection() + "</div></section>";
  };
  function zoomBtn(cl) { return '<a class="btn primary" target="_blank" rel="noopener" href="' + esc(cl.zoom) + '">' + icon("video") + U("join_zoom") + "</a>"; }

  /* ================= Facebook page feed (Page Plugin; updates on its own) ================= */
  function fbSection() {
    return '<div class="fb-sec rv"><div class="fb-copy"><span class="eyebrow">' + icon("facebook") + ' Facebook</span><h2 class="h-section">' + U("fb_title") + '</h2><p class="muted">' + U("fb_text") + '</p><a class="btn" target="_blank" rel="noopener" href="' + FB_URL + '">' + icon("facebook") + U("open_fb") + ARROW() + '</a></div><div class="fb-box" id="fbBox"><div class="fb-wait">' + icon("facebook") + "</div></div></div>";
  }
  function ARROW() { return h.ARROW || ""; }
  function mountFb() {
    var box = $("#fbBox"); if (!box || box.dataset.on) return; box.dataset.on = "1";
    function go() {
      var w = Math.max(180, Math.min(500, Math.floor(box.clientWidth))), ht = Math.min(720, Math.max(520, Math.round(window.innerHeight * 0.8)));
      var src = "https://www.facebook.com/plugins/page.php?href=" + encodeURIComponent(FB_URL) + "&tabs=timeline&width=" + w + "&height=" + ht + "&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&locale=" + ({ bn: "bn_IN", en: "en_US", ar: "ar_AR" })[st.lang];
      box.innerHTML = '<iframe title="Facebook" src="' + src + '" width="' + w + '" height="' + ht + '" style="border:0;overflow:hidden;max-width:100%" scrolling="no" frameborder="0" allow="encrypted-media; clipboard-write" loading="lazy"></iframe><p class="fb-fail">' + U("fb_blocked") + ' <a target="_blank" rel="noopener" href="' + FB_URL + '">' + U("open_fb") + "</a></p>";
    }
    if ("IntersectionObserver" in window) { var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); go(); } }, { rootMargin: "300px" }); io.observe(box); } else go();
  }

  /* ================= website assistant ================= */
  var BOT_OPEN = false, history = [];
  function norm(s) { return String(s || "").toLowerCase().replace(/[।,.!?؟،;:()"'“”‘’\-–—/\\]+/g, " ").replace(/\s+/g, " ").trim(); }
  function has(q, words) { for (var i = 0; i < words.length; i++) if (q.indexOf(words[i]) >= 0) return true; return false; }
  function link(href, label) { return '<a class="bot-link" href="' + esc(href) + '">' + label + "</a>"; }
  function contactHtml() {
    var p = phone();
    return '<div class="bot-contact"><a class="btn sm primary" href="tel:' + esc(p.replace(/[^\d+]/g, "")) + '">' + icon("phone") + U("call") + ' <span class="ltr">' + esc(p) + '</span></a><a class="btn sm" href="mailto:' + esc(email()) + '">' + icon("mail") + U("email_us") + "</a></div>";
  }
  function payHtml(type) {
    var chs = (((C().payment || {}).channels) || []).filter(function (c) { return c.show && (!type || c.type === type); });
    return "<ul class=\"bot-list\">" + chs.map(function (c) { return "<li><b>" + esc(tr(c.name)) + ":</b> <span class=\"ltr\">" + esc(c.number) + "</span>" + (c.acname ? "<br><small>" + esc(c.acname) + (c.branch ? " · " + esc(tr(c.branch, "en")) : "") + (c.routing ? " · Routing " + esc(c.routing) : "") + "</small>" : "") + "</li>"; }).join("") + "</ul>";
  }
  function floorsTxt(kind) {
    var F = C().floors || {}, list = F[kind] || [];
    var done = list.filter(function (f) { return f.status === "done"; }).length;
    return T((F.headline || {})[kind]) + (list.length ? " (" + h.num(done) + "/" + h.num(list.length) + ")" : "");
  }
  function joinUrl() { return ((C() || {}).settings || {}).joinUrl || ""; }
  var INTENTS = [
    { k: ["সদস্য", "মেম্বার", "member", "যুক্ত হ", "join", "পরিবারের সঙ্গে", "স্বেচ্ছাসেব", "volunteer", "انضم", "عضو", "تطوع"], a: function () { return U("join_text") + '<div class="bot-contact"><a class="btn sm primary" target="_blank" rel="noopener" href="' + esc(joinUrl()) + '">' + icon("user") + U("join_btn") + "</a></div>"; } },
    { k: ["সালাম", "assalam", "salam", "hello", "hi ", "হাই", "হ্যালো", "السلام", "مرحبا"], a: function () { return U("bot_hello"); } },
    { k: ["bank", "ব্যাংক", "ব্যাংক", "একাউন্ট", "অ্যাকাউন্ট", "account", "routing", "swift", "بنك", "حساب"], a: function () { return L({ bn: "ব্যাংকের মাধ্যমে দান করতে পারেন:", en: "You can give by bank transfer:", ar: "يمكنك التبرع بالتحويل البنكي:" }) + payHtml("bank") + link("#donate", U("donate_now")); } },
    { k: ["bkash", "বিকাশ", "nagad", "নগদ", "rocket", "রকেট", "বিকাশ", "بيكاش"], a: function (q) { var t = has(q, ["nagad", "নগদ"]) ? "nagad" : has(q, ["rocket", "রকেট"]) ? "rocket" : "bkash"; return L({ bn: "এই নম্বরে পাঠাতে পারেন:", en: "You can send to:", ar: "يمكنك الإرسال إلى:" }) + payHtml(t) + L({ bn: "ধাপে ধাপে নির্দেশনা দান পেজে আছে। ", en: "Step-by-step guidance is on the giving page. ", ar: "الخطوات التفصيلية في صفحة التبرع. " }) + link("#donate", U("donate_now")); } },
    { k: ["যাকাত দি", "যাকাত দেব", "যাকাত পাঠা", "জাকাত দি", "zakat to ibt", "pay zakat", "give zakat", "دفع الزكاة"], a: function () { var f = h.find(C().funds || [], "zakat"); return (f ? T(f.text) + " " : "") + link("#fund-zakat", U("give_to_fund")); } },
    { k: ["দান", "ডোনেশন", "donat", "give", "sadaq", "সদকা", "সাদাকা", "contribut", "টাকা পাঠা", "تبرع", "صدقة"], a: function () { return L({ bn: "চার ধাপে দান করতে পারেন: খাত বাছুন → পরিমাণ → বিকাশ/নগদ/রকেট/ব্যাংকে পাঠান → ফরমে জানান।", en: "Give in four steps: choose a cause → amount → send by bKash/Nagad/Rocket/bank → tell us on the form.", ar: "تبرّع في أربع خطوات: اختر المجال ← المبلغ ← أرسل عبر بيكاش/نقد/روكيت/البنك ← أبلغنا عبر النموذج." }) + payHtml() + link("#donate", U("donate_now")) + " " + link("#funds", U("nav_funds")); } },
    { k: ["নির্মাণ", "construct", "progress", "অগ্রগতি", "ছাদ", "ঢালাই", "slab", "floor", "তলা", "কাজ কত", "building status", "بناء", "إنشاء"], a: function () { return "<b>" + U("masjid") + ":</b> " + floorsTxt("mosque") + "<br><b>" + U("academic_bld") + ":</b> " + floorsTxt("academic") + "<br>" + link("#project-ibjmc", L({ bn: "নির্মাণের হালনাগাদ", en: "Construction update", ar: "آخر أخبار البناء" })) + " " + link("#future", U("nav_future")); } },
    { k: ["taibah", "তাইবাহ", "তায়বাহ", "museum", "জাদুঘর", "academic complex", "একাডেমিক কমপ্লেক্স", "future", "ভবিষ্যৎ", "প্রকল্প", "master plan", "মাস্টারপ্ল্যান", "hostel", "হোস্টেল", "مشروع"], a: function () { var B = (C().future || {}).buildings || []; return L({ bn: "মাস্টারপ্ল্যানে পাঁচটি অংশ আছে:", en: "The master plan has five parts:", ar: "يضم المخطط العام خمسة أجزاء:" }) + '<ul class="bot-list">' + B.map(function (b) { return "<li><b>" + T(b.name) + "</b>: " + (b.items || []).slice(0, 4).map(function (i) { return T(i.name); }).join(", ") + "</li>"; }).join("") + "</ul>" + link("#future", U("nav_future")); } },
    { k: ["নামাজের সময়", "নামাযের সময়", "সালাতের সময়", "নামাজের ওয়াক্ত", "prayer time", "salah time", "azan", "adhan", "আযান", "আজান", "আজকের নামাজ", "مواقيت"], a: function () { return L({ bn: "আপনার শহর বা লোকেশন অনুযায়ী আজকের নামাজের সময় এখানে দেখুন:", en: "See today's prayer times for your city or location here:", ar: "اطلع على مواقيت الصلاة لمدينتك أو موقعك هنا:" }) + " " + link("#prayer", U("nav_prayer")); } },
    { k: ["কুরআন পড়", "কুরআন শুন", "quran reader", "read quran", "listen quran", "তিলাওয়াত শুন", "recit", "تلاوة"], a: function () { return L({ bn: "সাইটেই কুরআন পড়ুন ও শুনুন: অনুবাদ, তাফসীর ও পছন্দের ক্বারী।", en: "Read and listen to the Quran on the site, with translation, tafsir and your choice of reciter.", ar: "اقرأ القرآن واستمع إليه في الموقع مع الترجمة والتفسير واختيار القارئ." }) + " " + link("#quran", U("nav_quran")); } },
    { k: ["live", "লাইভ", "zoom", "জুম", "সরাসরি", "مباشر", "بث"], a: function () { return (isLive() ? "<b>" + U("live_now") + "</b> " : U("live_off") + ". ") + link("#live", U("live_title")); } },
    { k: ["ঠিকানা", "address", "office", "অফিস", "কোথায়", "location", "where", "উত্তরা", "map", "عنوان", "أين"], a: function () { var c = (C().settings || {}).contact || {}; return "<b>" + L({ bn: "অফিস", en: "Office", ar: "المكتب" }) + ":</b> " + T(c.office) + "<br><b>" + L({ bn: "প্রকল্প", en: "Project site", ar: "موقع المشروع" }) + ":</b> " + T(c.site) + "<br>" + T(c.hours) + contactHtml(); } },
    { k: ["ফোন", "phone", "call", "কল", "যোগাযোগ", "contact", "নম্বর", "number", "email", "ইমেইল", "মেইল", "whatsapp", "هاتف", "تواصل", "بريد"], a: function () { var c = (C().settings || {}).contact || {}; return T(c.hours) + contactHtml(); } },
    { k: ["চেয়ারম্যান", "chairman", "মানজুর", "manzur", "elahi", "ইলাহী", "رئيس"], a: function () { var ch = C().chairman || {}; return T(ch.name || "") + (ch.role ? " · " + T(ch.role) : "") + " " + link("#chairman", U("chairman_title")); } },
    { k: ["হিসাব", "অডিট", "audit", "report", "রিপোর্ট", "transparen", "স্বচ্ছতা", "ক্যাটালগ", "catalog", "تقرير", "شفافية"], a: function () { return L({ bn: "রিপোর্ট, ক্যাটালগ ও দানের হিসাব এখানে:", en: "Reports, the catalogue and giving records are here:", ar: "التقارير والكتالوج وسجلات التبرع هنا:" }) + " " + link("#transparency", U("nav_transparency")); } },
    { k: ["ভর্তি", "admission", "course", "কোর্স", "class", "ক্লাস", "register", "রেজিস্ট্রেশন", "আবেদন", "apply", "ফি", "fee", "বেতন", "মাদ্রাসা", "madras", "আরবি", "arabic", "কুল্লিয়া", "kulliy", "قبول", "دورة", "تسجيل"], a: function (q) { return regAnswer(q); } }
  ];
  function regAnswer(q) {
    var R = (C().registrations || []).filter(function (r) { return r.status !== "hidden"; });
    var best = rank(q, R.map(function (r) { return { o: r, t: [L(r.title), L(r.text)].concat((r.facts || []).map(L)).join(" ") }; }))[0];
    if (best && best.s >= 2) return regCard(best.o);
    return L({ bn: "এখন যেসব কোর্স ও ভর্তিতে আবেদন করা যায়:", en: "Courses and admissions you can apply for:", ar: "الدورات والقبول المتاحة:" }) + '<ul class="bot-list">' + R.map(function (r) { return "<li>" + link("#reg-" + r.id, T(r.title)) + (r.status === "open" ? ' <span class="chip">' + L({ bn: "ভর্তি চলছে", en: "Open", ar: "مفتوح" }) + "</span>" : "") + "</li>"; }).join("") + "</ul>";
  }
  function regCard(r) { return "<b>" + T(r.title) + "</b><br>" + T(r.text) + '<ul class="bot-list">' + (r.facts || []).slice(0, 6).map(function (f) { return "<li>" + T(f) + "</li>"; }).join("") + "</ul>" + link("#reg-" + r.id, L({ bn: "বিস্তারিত ও আবেদন", en: "Details and apply", ar: "التفاصيل والتقديم" })); }
  function toks(s) { return norm(s).split(" ").filter(function (w) { return w.length > 1; }); }
  function rank(q, docs) {
    var qt = toks(q);
    return docs.map(function (d) { var t = " " + norm(d.t) + " ", s = 0; qt.forEach(function (w) { if (t.indexOf(" " + w) >= 0) s += w.length > 3 ? 2 : 1; }); d.s = s; return d; }).filter(function (d) { return d.s > 0; }).sort(function (a, b) { return b.s - a.s; });
  }
  function custom(q) {
    var it = ((C().chatbot || {}).items || []).filter(function (x) { return (x.keys || "").split(",").some(function (k) { k = norm(k); return k && q.indexOf(k) >= 0; }); })[0];
    return it ? T(it.a) : "";
  }
  function search(q) {
    var docs = [];
    (C().faqs || []).forEach(function (f) { docs.push({ t: L(f.q) + " " + L(f.a), a: "<b>" + T(f.q) + "</b><br>" + T(f.a) }); });
    (C().funds || []).forEach(function (f) { docs.push({ t: L(f.name) + " " + L(f.tagline) + " " + L(f.text), a: "<b>" + T(f.name) + "</b><br>" + T(f.text) + "<br>" + link("#fund-" + f.id, U("give_to_fund")) }); });
    (C().institutions || []).forEach(function (i) { docs.push({ t: L(i.name) + " " + L(i.short || "") + " " + L(i.summary || i.text || ""), a: "<b>" + T(i.name) + "</b><br>" + T(i.summary || i.text || "") + "<br>" + link("#inst-" + i.id, L({ bn: "বিস্তারিত", en: "Details", ar: "التفاصيل" })) }); });
    (C().initiatives || []).forEach(function (i) { docs.push({ t: L(i.name || i.title) + " " + L(i.summary || i.text || ""), a: "<b>" + T(i.name || i.title) + "</b><br>" + T(i.summary || i.text || "") + "<br>" + link("#init-" + i.id, L({ bn: "বিস্তারিত", en: "Details", ar: "التفاصيل" })) }); });
    (C().registrations || []).forEach(function (r) { docs.push({ t: L(r.title) + " " + L(r.text), a: regCard(r) }); });
    var r = rank(q, docs)[0];
    return r && r.s >= 3 ? r.a : "";
  }
  function answer(text) {
    var q = " " + norm(text) + " ";
    if (q.trim().length < 2) return "";
    var c = custom(q); if (c) return c;
    var cands = INTENTS.filter(function (it) { return has(q, it.k); });
    if (cands.length) { var a0 = cands[0]; if (a0.k[0] === "সালাম" && cands.length > 1) a0 = cands[1]; return a0.a(q); }
    var s = search(q); if (s) return s;
    return U("bot_unknown") + contactHtml();
  }
  var SUGG = [
    { bn: "কীভাবে দান করব?", en: "How can I donate?", ar: "كيف أتبرع؟" },
    { bn: "নির্মাণকাজ কতদূর?", en: "How far is construction?", ar: "إلى أين وصل البناء؟" },
    { bn: "কোন কোর্সে ভর্তি চলছে?", en: "Which courses are open?", ar: "ما الدورات المتاحة؟" },
    { bn: "ব্যাংক একাউন্ট নম্বর", en: "Bank account details", ar: "بيانات الحساب البنكي" },
    { bn: "অফিসের ঠিকানা ও ফোন", en: "Office address and phone", ar: "عنوان المكتب والهاتف" },
    { bn: "সফরে নামাজ কসর", en: "Shortening prayer when travelling", ar: "قصر الصلاة في السفر" }
  ];
  function botShell() {
    if ($("#bot")) return;
    document.body.insertAdjacentHTML("beforeend", '<button class="bot-fab" id="botFab" aria-label="' + esc(Uraw("bot_open")) + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg><span>' + U("bot_open") + '</span></button>' +
      '<section class="bot" id="bot" role="dialog" aria-label="' + esc(Uraw("bot_title")) + '" hidden><header><img src="img/logo-color-mark.png" alt=""><div><b>' + U("bot_title") + "</b><small>" + U("bot_sub") + '</small></div><button class="icon-btn" id="botX" aria-label="close">' + icon("x") + '</button></header><div class="bot-log" id="botLog" aria-live="polite"></div><div class="bot-sugg" id="botSugg"></div><form id="botForm" class="bot-in"><input id="botQ" autocomplete="off" placeholder="' + esc(Uraw("bot_ph")) + '" maxlength="300"><button class="btn primary sm" aria-label="' + esc(Uraw("send")) + '">' + icon("send") + '</button></form><p class="bot-note">' + U("bot_note") + "</p></section>");
  }
  function say(who, html) {
    var log = $("#botLog"); if (!log) return;
    log.insertAdjacentHTML("beforeend", '<div class="msg from-' + who + '">' + html + "</div>"); log.scrollTop = log.scrollHeight;
  }
  function openBot(on) {
    BOT_OPEN = on; var b = $("#bot"); if (!b) return; b.hidden = !on; document.documentElement.classList.toggle("bot-on", on);
    if (on && !$("#botLog").children.length) { say("bot", T((C().chatbot || {}).greeting) || U("bot_hello")); drawSugg(); }
    if (on) setTimeout(function () { var i = $("#botQ"); if (i && matchMedia("(hover:hover)").matches) i.focus(); }, 50);
  }
  function drawSugg() { var s = $("#botSugg"); if (s) s.innerHTML = SUGG.map(function (x) { return '<button type="button" data-ask="' + esc(L(x)) + '">' + esc(L(x)) + "</button>"; }).join(""); }
  function ask(q) {
    q = String(q || "").trim(); if (!q) return;
    say("me", esc(q)); var a = answer(q); history.push([q, a]);
    if (a.indexOf(Uraw("bot_unknown").slice(0, 12)) >= 0 && IBT.qa) {
      // not about IBT itself: try the Islamic Q&A archive
      IBT.qa.load().then(function () {
        var r = IBT.qa.search(q, 3);
        if (!r.length) return say("bot", a);
        say("bot", L({ bn: "এ বিষয়ে প্রকাশিত প্রশ্নোত্তর:", en: "Published answers on this:", ar: "إجابات منشورة حول هذا:" }) + '<ul class="bot-list">' + r.map(function (it) { var s = IBT.qa.src[it[0]] || {}; return '<li><a target="_blank" rel="noopener" href="' + esc(IBT.qa.url(it)) + '">' + esc(it[2]) + "</a> <small>(" + esc(s.name + " · " + s.lang) + ")</small></li>"; }).join("") + "</ul>" + link("#ask", U("nav_ask")) + "<br><small>" + L({ bn: "নিজের প্রশ্ন আমাদের আলেমদেরও পাঠাতে পারেন।", en: "You can also send your question to our scholars.", ar: "يمكنك أيضًا إرسال سؤالك لعلمائنا." }) + "</small>");
      }, function () { say("bot", a); });
      return;
    }
    setTimeout(function () { say("bot", a); }, 260);
  }
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest("#botFab")) { openBot(!BOT_OPEN); return; }
    if (t.closest("#botX")) { openBot(false); return; }
    var s = t.closest("[data-ask]"); if (s) { ask(s.dataset.ask); return; }
    if (t.closest(".bot a.bot-link") && matchMedia("(max-width:700px)").matches) openBot(false);
  });
  document.addEventListener("submit", function (e) { if (e.target.id !== "botForm") return; e.preventDefault(); var i = $("#botQ"); ask(i.value); i.value = ""; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && BOT_OPEN) openBot(false); });

  /* ================= interactive touches ================= */
  function tilt(sel) {
    if (document.documentElement.classList.contains("nomotion") || !matchMedia("(hover:hover)").matches) return;
    $$(sel).forEach(function (el) {
      if (el._tilt) return; el._tilt = 1; el.classList.add("tilt3d");
      el.addEventListener("pointermove", function (e) { var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; el.style.transform = "perspective(900px) rotateY(" + (x * 6).toFixed(2) + "deg) rotateX(" + (-y * 6).toFixed(2) + "deg) translateY(-3px)"; el.style.setProperty("--mx", ((x + 0.5) * 100).toFixed(1) + "%"); el.style.setProperty("--my", ((y + 0.5) * 100).toFixed(1) + "%"); });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }
  function rings() {
    $$(".ring[data-p]").forEach(function (r) { var p = Math.max(0, Math.min(100, +r.dataset.p)); r.style.setProperty("--p", p); });
  }

  IBT.afterHooks = (IBT.afterHooks || []).concat([function (route) {
    botShell(); markLive();
    if (route === "home" || route === "media") {
      var anchor = route === "home" ? ($(".donate-band") || {}).closest && $(".donate-band").closest("section") : null;
      var sec = '<section class="section tight"><div class="wrap">' + fbSection() + "</div></section>";
      if (anchor) anchor.insertAdjacentHTML("beforebegin", sec); else $("#main").insertAdjacentHTML("beforeend", sec);
      var el = $(".fb-sec"); if (el) el.classList.add("in");
    }
    if (route === "home" && joinUrl() && !$(".join-band")) {
      var at = $(".fb-sec"); at = at && at.closest("section");
      var band = '<section class="section tight"><div class="wrap"><div class="join-band rv in"><div class="jb-ic">' + icon("user") + '</div><div class="jb-tx"><h2 class="h-section">' + U("join_t") + '</h2><p class="muted">' + U("join_text") + '</p></div><a class="btn primary lg" target="_blank" rel="noopener" href="' + esc(joinUrl()) + '">' + U("join_btn") + h.ARROW + "</a></div></div></section>";
      if (at) at.insertAdjacentHTML("beforebegin", band); else $("#main").insertAdjacentHTML("beforeend", band);
    }
    var ft = $(".footer"); if (ft && joinUrl() && !$(".ft-join", ft)) { var fl = $(".footer .wrap"); if (fl) fl.insertAdjacentHTML("afterbegin", '<div class="ft-join"><span>' + U("join_t") + '</span><a class="btn sm primary" target="_blank" rel="noopener" href="' + esc(joinUrl()) + '">' + U("join_btn") + h.ARROW + "</a></div>"); }
    if ($("#fbBox")) mountFb();
    tilt(".cause, .fbld, .upd, .card.glass, .fact, .inst-card");
    rings();
  }]);
  IBT.bot = { answer: answer, open: openBot };
})();
