/* IBT "ইসলামিক জিজ্ঞাসা": search verified fatwa archives (IslamQA, Islamweb) and ask IBT's scholars */
(function () {
  "use strict";
  var IBT = window.IBT, h = IBT.H, P = IBT.P;
  var $ = h.$, $$ = h.$$, esc = h.esc, tr = h.tr, T = h.T, U = h.U, Uraw = h.Uraw, icon = h.icon, C = h.C, st = h.state, num = h.num;
  function L(o) { return tr(o); }

  var SRC = {
    "iqa-bn": { name: "IslamQA", lang: "বাংলা", url: function (i) { return "https://islamqa.info/bn/answers/" + i; }, col: "#3E7C3A" },
    "iqa-en": { name: "IslamQA", lang: "English", url: function (i) { return "https://islamqa.info/en/answers/" + i; }, col: "#3E7C3A" },
    "iw-en": { name: "Islamweb", lang: "English", url: function (i, slug) { return "https://www.islamweb.net/en/fatwa/" + i + "/" + (slug || ""); }, col: "#1F6FA8", frame: true }
  };
  var TOPICS = [
    ["salah", { bn: "সালাত", en: "Prayer", ar: "الصلاة" }, "pray", "নামাজ সালাত নামায prayer salah صلاة"],
    ["tahara", { bn: "পবিত্রতা ও ওযু", en: "Purity & wudu", ar: "الطهارة" }, "drop", "ওযু অজু গোসল পবিত্রতা তায়াম্মুম wudu ghusl purity وضوء طهارة"],
    ["sawm", { bn: "সাওম", en: "Fasting", ar: "الصيام" }, "moon", "রোজা রোযা সিয়াম সাওম ইফতার সাহরি fasting ramadan صيام"],
    ["zakat", { bn: "যাকাত ও সাদাকা", en: "Zakat & charity", ar: "الزكاة" }, "coin", "যাকাত জাকাত সাদাকা ফিতরা zakat sadaqah زكاة صدقة"],
    ["hajj", { bn: "হজ্জ ও উমরাহ", en: "Hajj & Umrah", ar: "الحج والعمرة" }, "kaaba", "হজ্জ হজ উমরাহ উমরা hajj umrah حج عمرة"],
    ["nikah", { bn: "বিবাহ ও পরিবার", en: "Marriage & family", ar: "النكاح والأسرة" }, "home", "বিবাহ বিয়ে তালাক স্বামী স্ত্রী মোহর marriage divorce نكاح طلاق"],
    ["money", { bn: "লেনদেন ও ব্যবসা", en: "Money & trade", ar: "المعاملات" }, "coin", "সুদ ব্যবসা লেনদেন ব্যাংক ঋণ বীমা interest riba business loan ربا بيع"],
    ["aqidah", { bn: "আকীদা", en: "Creed", ar: "العقيدة" }, "book", "আকীদা ঈমান তাওহীদ শিরক বিদআত aqeedah tawheed shirk عقيدة توحيد"],
    ["dua", { bn: "দুআ ও যিকর", en: "Dua & dhikr", ar: "الدعاء والذكر" }, "heart", "দুআ দোয়া যিকির জিকির dua dhikr دعاء ذكر"],
    ["women", { bn: "নারী", en: "Women", ar: "المرأة" }, "user", "নারী মহিলা হায়েয পর্দা হিজাব women hijab menses المرأة حجاب"],
    ["quran", { bn: "কুরআন ও হাদীস", en: "Quran & Hadith", ar: "القرآن والحديث" }, "quran", "কুরআন হাদীস হাদিস তাফসীর quran hadith tafsir قرآن حديث"],
    ["food", { bn: "খাদ্য ও পোশাক", en: "Food & dress", ar: "الأطعمة واللباس" }, "leaf", "হালাল হারাম খাবার পোশাক halal haram food clothing حلال حرام"]
  ];
  // spelling variants people type in Bangla, mapped to one form so search finds both
  var SYN = [["নামায", "নামাজ"], ["সালাত", "নামাজ"], ["নামাযে", "নামাজে"], ["অজু", "ওযু"], ["ওজু", "ওযু"], ["রোযা", "রোজা"], ["সিয়াম", "রোজা"], ["সাওম", "রোজা"], ["জাকাত", "যাকাত"], ["হজ", "হজ্জ"], ["উমরা", "উমরাহ"], ["বিয়ে", "বিবাহ"], ["দোয়া", "দুআ"], ["দোআ", "দুআ"], ["জিকির", "যিকর"], ["যিকির", "যিকর"], ["হাদিস", "হাদীস"], ["কোরআন", "কুরআন"], ["কোরান", "কুরআন"], ["আল্লাহর", "আল্লাহ"], ["নবীজি", "নবী"], ["রাসূল", "রাসুল"], ["ঈদ", "ইদ"], ["জুম্মা", "জুমা"], ["জুমআ", "জুমা"], ["জুমার", "জুমা"], ["মোহর", "মাহর"], ["তালাক", "তালাক"], ["গোসল", "গোসল"], ["ফরজ", "ফরয"], ["সুন্নাত", "সুন্নাহ"], ["সুন্নত", "সুন্নাহ"], ["প্রার্থনা", "দুআ"]];
  var STOP = { "কি": 1, "কী": 1, "কিভাবে": 1, "কীভাবে": 1, "এর": 1, "ও": 1, "এবং": 1, "কোন": 1, "করা": 1, "করে": 1, "করতে": 1, "যায়": 1, "যাবে": 1, "হবে": 1, "আছে": 1, "জন্য": 1, "সম্পর্কে": 1, "বিধান": 1, "হুকুম": 1, "একটি": 1, "the": 1, "is": 1, "of": 1, "a": 1, "to": 1, "in": 1, "and": 1, "what": 1, "can": 1, "for": 1, "it": 1, "ruling": 1, "on": 1, "i": 1, "do": 1, "my": 1, "في": 1, "من": 1, "ما": 1, "حكم": 1, "هل": 1, "على": 1 };
  function norm(s) {
    s = String(s || "").toLowerCase().normalize("NFC").replace(/[ً-ٰٟ]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
      .replace(/[।,.!?؟،;:()"'“”‘’\-–—/\\[\]{}]+/g, " ");
    var w = s.split(/\s+/).filter(Boolean).map(function (x) { for (var i = 0; i < SYN.length; i++) if (x.indexOf(SYN[i][0]) === 0) return SYN[i][1] + x.slice(SYN[i][0].length); return x; });
    return w.join(" ");
  }
  function terms(q) { return norm(q).split(" ").filter(function (w) { return w.length > 1 && !STOP[w]; }); }

  /* ---------- index ---------- */
  var DB = null, loading = null;
  function loadDB() {
    if (DB) return Promise.resolve(DB);
    if (loading) return loading;
    loading = fetch("data/qa.json?d=" + new Date().toISOString().slice(0, 10)).then(function (r) { if (!r.ok) throw new Error("qa"); return r.json(); }).then(function (j) {
      j.items.forEach(function (it) { it.n = " " + norm(it[2]) + " "; });
      DB = j; return j;
    });
    loading.catch(function () { loading = null; });
    return loading;
  }
  function wantSrc() {
    var on = ls("ibt_qa_src"); if (on) try { return JSON.parse(on); } catch (e) { }
    return st.lang === "bn" ? ["iqa-bn", "iqa-en", "iw-en"] : ["iqa-en", "iw-en", "iqa-bn"];
  }
  function ls(k, v) { return h.ls(k, v); }
  function search(q, srcs, limit) {
    var t = terms(q); if (!t.length || !DB) return [];
    var allow = {}; srcs.forEach(function (s) { allow[s] = 1; });
    var out = [];
    for (var i = 0; i < DB.items.length; i++) {
      var it = DB.items[i]; if (!allow[it[0]]) continue;
      var s = 0, hit = 0;
      for (var k = 0; k < t.length; k++) {
        var w = t[k], p = it.n.indexOf(" " + w);
        if (p >= 0) { hit++; s += w.length > 3 ? 3 : 2; if (it.n.indexOf(" " + w + " ") >= 0) s += 1; }
        else if (w.length > 4 && it.n.indexOf(w.slice(0, w.length - 1)) >= 0) { hit++; s += 1; }
      }
      if (!hit) continue;
      if (hit === t.length) s += 4 + t.length;
      s += (srcs.length - srcs.indexOf(it[0])) * 0.15;
      out.push([s, it]);
    }
    out.sort(function (a, b) { return b[0] - a[0]; });
    return out.slice(0, limit || 40).map(function (x) { return x[1]; });
  }
  function hl(title, q) {
    var t = terms(q), s = esc(title);
    t.forEach(function (w) { if (w.length < 2) return; try { s = s.replace(new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>"); } catch (e) { } });
    return s;
  }

  /* ---------- page ---------- */
  var S = { q: "", topic: "", n: 12 };
  P.ask = function () {
    var A = C().askPage || {}, own = (C().qa || []).filter(function (x) { return x.show !== false; });
    var srcs = wantSrc();
    return '<section class="ask-hero"><div class="wrap">' + h.crumbs([[U("nav_ask")]]) +
      '<div class="ask-top"><span class="eyebrow">' + icon("chat") + " " + U("ask_eyebrow") + '</span><h1 class="h-display">' + U("ask_title") + '</h1><p class="lead">' + U("ask_lead") + "</p>" +
      '<form class="ask-search" id="askForm" role="search"><span class="ic">' + icon("search") + '</span><input id="askQ" type="search" autocomplete="off" enterkeyhint="search" placeholder="' + esc(Uraw("ask_ph")) + '" value="' + esc(S.q) + '" aria-label="' + esc(Uraw("ask_ph")) + '"><button class="btn primary" type="submit">' + U("search") + "</button></form>" +
      '<div class="ask-meta" id="askMeta"><span class="chip"><span class="dot"></span><span id="askCount">' + U("ask_loading") + '</span></span><span class="ask-srcs">' + Object.keys(SRC).filter(function (k) { return !DB || (DB.counts || {})[k]; }).map(function (k) { return '<label class="src-t" style="--c:' + SRC[k].col + '"><input type="checkbox" data-src="' + k + '"' + (srcs.indexOf(k) >= 0 ? " checked" : "") + "><span>" + SRC[k].name + " · " + SRC[k].lang + "</span></label>"; }).join("") + "</span></div>" +
      '<div class="topics" id="askTopics">' + TOPICS.map(function (t) { return '<button type="button" data-topic="' + t[0] + '" aria-pressed="' + (S.topic === t[0]) + '"><span class="ic">' + icon(t[2]) + "</span>" + esc(L(t[1])) + "</button>"; }).join("") + "</div></div></div></section>" +
      '<section class="section tight"><div class="wrap ask-grid"><div class="ask-main"><div id="askRes" aria-live="polite"></div></div>' +
      '<aside class="ask-side"><div class="ask-card rv" id="askIbt"><div class="ask-card-h"><span class="ic">' + icon("user") + "</span><div><h3>" + U("ask_ibt_title") + '</h3><p class="faint">' + U("ask_ibt_text") + "</p></div></div>" + askForm() + "</div>" +
      '<div class="ask-note rv">' + icon("info") + "<div><b>" + U("ask_note_t") + "</b><p>" + U("ask_note") + "</p></div></div></aside></div></section>" +
      (own.length ? '<section class="section tight"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">IBT</span><h2 class="h-section">' + U("ask_own") + '</h2></div></div><div class="own-qa">' + own.map(function (x, i) {
        return '<details class="oqa rv"' + (i === 0 ? " open" : "") + "><summary><span class=\"q\">" + icon("chat") + "<b>" + T(x.q) + '</b></span><span class="tg">' + T(x.category || "") + "</span></summary><div class=\"a\">" + T(x.a) + (x.scholar ? '<p class="by">— ' + T(x.scholar) + (x.date ? " · " + h.fdate(x.date) : "") + "</p>" : "") + (x.ref ? '<p class="faint">' + U("source") + ": " + T(x.ref) + "</p>" : "") + "</div></details>";
      }).join("") + "</div></div></section>" : "");
  };
  function askForm() {
    return '<form class="form" id="askIbtForm"><div class="field"><label for="aq_q">' + U("ask_your_q") + ' *</label><textarea class="input" id="aq_q" name="question" required rows="4" maxlength="1500" placeholder="' + esc(Uraw("ask_q_ph")) + '"></textarea></div>' +
      '<div class="row2"><div class="field"><label for="aq_cat">' + U("ask_topic") + '</label><select class="input" id="aq_cat" name="topic"><option value="">—</option>' + TOPICS.map(function (t) { return "<option>" + esc(L(t[1])) + "</option>"; }).join("") + '</select></div><div class="field"><label for="aq_name">' + U("name") + '</label><input class="input" id="aq_name" name="name" autocomplete="name"></div></div>' +
      '<div class="field"><label for="aq_ct">' + U("ask_contact") + ' *</label><input class="input" id="aq_ct" name="contact" required autocomplete="email" placeholder="01XXXXXXXXX / you@mail.com"></div>' +
      '<label class="chk"><input type="checkbox" name="private" value="yes"> <span>' + U("ask_private") + "</span></label>" +
      '<button class="btn primary block" type="submit">' + icon("send") + U("ask_send") + '</button><div class="out" aria-live="polite"></div></form>';
  }
  function topicQ(id) { var t = TOPICS.filter(function (x) { return x[0] === id; })[0]; return t ? t[3] : ""; }
  function draw() {
    var box = $("#askRes"); if (!box) return;
    if (!DB) { box.innerHTML = '<div class="ask-skel">' + "<i></i>".repeat(5) + "</div>"; return; }
    var srcs = $$("input[data-src]").filter(function (c) { return c.checked; }).map(function (c) { return c.dataset.src; });
    if (!srcs.length) srcs = wantSrc();
    var q = S.q || (S.topic ? topicQ(S.topic) : "");
    if (!q) { box.innerHTML = popular(srcs); return; }
    var res = S.q ? search(S.q, srcs, 60) : searchAny(q, srcs);
    if (!res.length) { box.innerHTML = '<div class="ask-empty"><div class="ic">' + icon("search") + "</div><h3>" + U("ask_none") + "</h3><p class=\"muted\">" + U("ask_none_t") + '</p><div class="ask-ext">' + extLinks(S.q) + '</div><button class="btn primary" data-scrollto="askIbt">' + icon("send") + U("ask_ibt_title") + "</button></div>"; return; }
    box.innerHTML = '<div class="ask-head"><b>' + num(res.length) + (res.length >= 60 ? "+" : "") + "</b> " + U("ask_found") + (S.q ? ' <span class="faint">“' + esc(S.q) + "”</span>" : "") + "</div>" +
      '<ol class="qa-list">' + res.slice(0, S.n).map(function (it, i) { return row(it, i); }).join("") + "</ol>" +
      (res.length > S.n ? '<div style="text-align:center;margin-top:14px"><button class="btn" id="askMore">' + U("load_more") + "</button></div>" : "") +
      '<div class="ask-ext-row"><span class="faint">' + U("ask_more_on") + "</span>" + extLinks(S.q) + "</div>";
  }
  function searchAny(words, srcs) {
    // topic browse: any of the topic words, best matches first
    var t = norm(words).split(" "), out = [];
    DB.items.forEach(function (it) { if (srcs.indexOf(it[0]) < 0) return; var s = 0; t.forEach(function (w) { if (w.length > 1 && it.n.indexOf(" " + w) >= 0) s++; }); if (s) out.push([s + (srcs.length - srcs.indexOf(it[0])) * 0.1 - it[2].length / 400, it]); });
    out.sort(function (a, b) { return b[0] - a[0]; });
    return out.slice(0, 60).map(function (x) { return x[1]; });
  }
  function row(it, i) {
    var s = SRC[it[0]] || SRC["iqa-bn"], u = s.url(it[1], it[3]);
    return '<li class="qa-row" style="--c:' + s.col + ';animation-delay:' + Math.min(i, 12) * 30 + 'ms"><a class="qa-open" href="' + esc(u) + '" target="_blank" rel="noopener"' + (s.frame ? ' data-read="' + esc(u) + '"' : "") + ' data-t="' + esc(it[2]) + '" data-sname="' + esc(s.name + " · " + s.lang) + '"><span class="qa-badge">' + esc(s.name) + "<small>" + esc(s.lang) + '</small></span><span class="qa-t">' + hl(it[2], S.q) + '</span><span class="qa-id ltr">#' + esc(String(it[1])) + '</span><span class="qa-go">' + U("ask_read") + (s.frame ? h.ARROW : icon("external")) + "</span></a></li>";
  }
  function popular(srcs) {
    var pick = (DB.featured || []).filter(function (it) { return srcs.indexOf(it[0]) >= 0; }).slice(0, 10);
    if (!pick.length) pick = DB.items.filter(function (it) { return srcs.indexOf(it[0]) >= 0; }).slice(0, 10);
    return '<div class="ask-head"><b>' + U("ask_recent") + '</b></div><ol class="qa-list">' + pick.map(function (it, i) { return row(it, i); }).join("") + "</ol>";
  }
  function extLinks(q) {
    var e = encodeURIComponent(q || "");
    var lang = st.lang === "ar" ? "ar" : st.lang === "en" ? "en" : "bn";
    return '<a class="btn sm" target="_blank" rel="noopener" href="https://islamqa.info/' + lang + '/search?q=' + e + '">IslamQA ' + icon("external") + '</a><a class="btn sm" target="_blank" rel="noopener" href="https://www.islamweb.net/' + (lang === "ar" ? "ar" : "en") + '/fatwa/search/?q=' + e + '">Islamweb ' + icon("external") + "</a>";
  }

  /* ---------- reader sheet ---------- */
  function openReader(u, t, src) {
    closeReader();
    document.body.insertAdjacentHTML("beforeend", '<div class="reader" id="reader" role="dialog" aria-modal="true" aria-label="' + esc(t) + '"><div class="reader-bg" data-rclose></div><div class="reader-sheet"><header><div><small>' + esc(src) + "</small><b>" + esc(t) + '</b></div><a class="btn sm" target="_blank" rel="noopener" href="' + esc(u) + '">' + U("ask_newtab") + " " + icon("external") + '</a><button class="icon-btn" data-rclose aria-label="close">' + icon("x") + '</button></header><div class="reader-body"><iframe src="' + esc(u) + '" title="' + esc(t) + '" referrerpolicy="no-referrer-when-downgrade"></iframe><div class="reader-fb">' + icon("external") + "<p>" + U("ask_iframe_fb") + '</p><a class="btn primary" target="_blank" rel="noopener" href="' + esc(u) + '">' + U("ask_newtab") + "</a></div></div></div></div>");
    document.documentElement.classList.add("noscroll");
    var fr = $("#reader iframe"), fb = $("#reader .reader-fb");
    fr.addEventListener("load", function () { fb.classList.add("gone"); });
  }
  function closeReader() { var r = $("#reader"); if (r) r.remove(); document.documentElement.classList.remove("noscroll"); }

  /* ---------- events ---------- */
  var tmr = 0;
  function go(q) { S.q = q; S.topic = ""; S.n = 12; $$("#askTopics [data-topic]").forEach(function (b) { b.setAttribute("aria-pressed", "false"); }); loadDB().then(draw, failed); draw(); }
  function failed() { var b = $("#askRes"); if (b) b.innerHTML = '<div class="ask-empty"><h3>' + U("ask_offline") + '</h3><div class="ask-ext">' + extLinks(S.q) + "</div></div>"; var c = $("#askCount"); if (c) c.textContent = "IslamQA · Islamweb"; }
  document.addEventListener("input", function (e) { if (e.target.id !== "askQ") return; clearTimeout(tmr); var v = e.target.value; tmr = setTimeout(function () { go(v.trim()); }, 220); });
  document.addEventListener("submit", function (e) {
    if (e.target.id === "askForm") { e.preventDefault(); go($("#askQ").value.trim()); var r = $("#askRes"); if (r && matchMedia("(max-width:900px)").matches) r.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (e.target.id === "askIbtForm") {
      e.preventDefault(); var f = e.target, out = $(".out", f), data = {}, btn = $("button[type=submit]", f);
      new FormData(f).forEach(function (v, k) { data[k] = String(v).slice(0, 1500); });
      btn.disabled = true;
      IBT.submit("question", data.topic || "", data).then(function () { out.innerHTML = '<div class="notice ok">' + U("ask_sent") + "</div>"; f.reset(); }, function () {
        var c = (C().settings || {}).contact || {}, body = encodeURIComponent((data.question || "") + "\n\n" + (data.topic ? "Topic: " + data.topic + "\n" : "") + (data.name ? "Name: " + data.name + "\n" : "") + "Contact: " + (data.contact || ""));
        out.innerHTML = '<div class="notice">' + U("ask_mail_fb") + '<div class="ask-ext" style="margin-top:8px"><a class="btn sm primary" href="mailto:' + esc(c.email || "bukharimasjid.bd@gmail.com") + "?subject=" + encodeURIComponent("Islamic question (website)") + "&body=" + body + '">' + icon("mail") + U("email_us") + '</a><a class="btn sm" href="tel:' + esc(((c.phones || [])[0] || "").replace(/[^\d+]/g, "")) + '">' + icon("phone") + U("call") + "</a></div></div>";
      }).then(function () { btn.disabled = false; });
    }
  });
  document.addEventListener("change", function (e) { var c = e.target.closest("input[data-src]"); if (!c || !$("#askRes")) return; ls("ibt_qa_src", JSON.stringify($$("input[data-src]").filter(function (x) { return x.checked; }).map(function (x) { return x.dataset.src; }))); S.n = 12; draw(); });
  document.addEventListener("click", function (e) {
    var t = e.target, b;
    if ((b = t.closest("[data-topic]"))) { var on = b.getAttribute("aria-pressed") !== "true"; $$("#askTopics [data-topic]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b && on)); }); S.topic = on ? b.dataset.topic : ""; S.q = ""; var i = $("#askQ"); if (i) i.value = ""; S.n = 12; draw(); return; }
    if ((b = t.closest("[data-read]"))) { e.preventDefault(); openReader(b.dataset.read, b.dataset.t, b.dataset.sname); return; }
    if (t.closest("[data-rclose]")) { closeReader(); return; }
    if (t.closest("#askMore")) { S.n += 12; draw(); return; }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && $("#reader")) closeReader(); });
  IBT.beforeHooks.push(closeReader);
  IBT.afterHooks.push(function (route) {
    if (route !== "ask") return;
    if (S.q) loadDB().then(draw, failed);
    draw();
    loadDB().then(function (j) {
      var c = $("#askCount"); if (c) c.textContent = num(j.items.length) + " " + Uraw("ask_count");
      $$("input[data-src]").forEach(function (x) { if (!(j.counts || {})[x.dataset.src]) x.closest("label").remove(); else x.closest("label").title = num(j.counts[x.dataset.src]); });
      draw();
    }, failed);
  });
  /* ---------- home promo band ---------- */
  var DEMO = [{ bn: "সফরে কসর নামাজ", en: "Prayer while travelling", ar: "قصر الصلاة" }, { bn: "যাকাতের নিসাব", en: "Nisab of zakat", ar: "نصاب الزكاة" }, { bn: "রোজা অবস্থায় ইনজেকশন", en: "Injection while fasting", ar: "الإبرة للصائم" }, { bn: "মোহরের পরিমাণ", en: "Amount of mahr", ar: "مقدار المهر" }, { bn: "ব্যাংকের সুদ", en: "Bank interest", ar: "فوائد البنوك" }, { bn: "তাহাজ্জুদের সময়", en: "Time of tahajjud", ar: "وقت التهجد" }];
  function promo() {
    return '<section class="section tight"><div class="wrap"><div class="ask-promo rv"><div class="ap-copy"><span class="eyebrow">' + icon("chat") + " " + U("ask_eyebrow") + '</span><h2 class="h-section">' + U("ask_promo_t") + '</h2><p class="muted">' + U("ask_promo") + '</p><form class="ask-search sm" id="askPromo" role="search"><span class="ic">' + icon("search") + '</span><input id="askPromoQ" type="search" placeholder="' + esc(Uraw("ask_ph")) + '" aria-label="' + esc(Uraw("ask_ph")) + '"><button class="btn primary" type="submit">' + U("search") + '</button></form><div class="ap-src"><span>IslamQA</span><span>Islamweb</span><span>IBT</span></div></div>' +
      '<div class="ap-float" aria-hidden="true">' + DEMO.map(function (d, i) { return '<button type="button" tabindex="-1" class="ap-q" style="--i:' + i + '" data-askq="' + esc(L(d)) + '">' + icon("chat") + esc(L(d)) + "</button>"; }).join("") + "</div></div></div></section>";
  }
  document.addEventListener("submit", function (e) { if (e.target.id !== "askPromo") return; e.preventDefault(); S.q = $("#askPromoQ").value.trim(); S.topic = ""; location.hash = "#ask"; });
  document.addEventListener("click", function (e) { var b = e.target.closest("[data-askq]"); if (!b) return; S.q = b.dataset.askq; S.topic = ""; location.hash = "#ask"; });
  IBT.afterHooks.push(function (route) {
    if (route !== "home") return;
    var secs = $$("#main > section"); var at = secs[2] || secs[secs.length - 1]; if (!at) return;
    at.insertAdjacentHTML("afterend", promo()); var el = $(".ask-promo"); if (el) setTimeout(function () { el.classList.add("in"); }, 50);
  });
  IBT.qa = { load: loadDB, search: function (q, n) { return search(q, wantSrc(), n || 3); }, url: function (it) { return (SRC[it[0]] || SRC["iqa-bn"]).url(it[1], it[3]); }, src: SRC };
})();
