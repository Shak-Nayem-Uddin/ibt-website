/* IBT v4 pages: home, causes (funds) with documentaries and share-based giving, donate,
   future projects with the 3D campus, prayer times (adhan.js) and the Quran reader (Quran.com API). */
(function () {
  "use strict";
  var IBT = window.IBT, h = IBT.H, P = IBT.P;
  var $ = h.$, $$ = h.$$, esc = h.esc, tr = h.tr, T = h.T, U = h.U, Uraw = h.Uraw, img = h.img, icon = h.icon, num = h.num, money = h.money, digits = h.digits;
  var C = function () { return h.C(); };
  var st = h.state;
  var timers = [];
  IBT.beforeHooks = (IBT.beforeHooks || []).concat([function () { timers.forEach(clearInterval); timers = []; qAudioStop(); }]);
  function every(ms, fn) { fn(); timers.push(setInterval(fn, ms)); }
  function L(o) { return tr(o); }
  var ARROW = h.ARROW;

  /* ================= causes (funds) ================= */
  function funds() { return C().funds || []; }
  function fundById(id) { return h.find(funds(), id); }
  function causeCard(f) {
    return '<a class="cause rv" href="#fund-' + esc(f.id) + '"><div class="media"><img loading="lazy" src="' + esc(img(f.image)) + '" alt=""><span class="ic">' + icon(f.icon || "heart") + "</span>" + (f.status ? '<span class="chip st">' + T(f.status) + "</span>" : "") + '</div><div class="body"><h3>' + T(f.name) + "</h3><p>" + T(f.tagline || f.text) + '</p><div class="foot"><span class="linkarrow">' + U("learn_more") + ARROW + '</span><span class="btn sm primary" data-give="' + esc(f.id) + '">' + icon("heart") + U("donate") + "</span></div></div></a>";
  }
  function verseBlock() {
    return '<div class="verse rv"><div class="ar" lang="ar">مَّثَلُ ٱلَّذِينَ يُنفِقُونَ أَمْوَٰلَهُمْ فِى سَبِيلِ ٱللَّهِ كَمَثَلِ حَبَّةٍ أَنۢبَتَتْ سَبْعَ سَنَابِلَ فِى كُلِّ سُنۢبُلَةٍ مِّا۟ئَةُ حَبَّةٍ</div><p>' +
      L({ bn: "যারা আল্লাহর পথে নিজেদের সম্পদ ব্যয় করে, তাদের উপমা একটি শস্যদানার মতো, যা সাতটি শীষ উৎপন্ন করে, প্রতিটি শীষে একশো দানা।", en: "Those who spend their wealth in the way of Allah are like a seed that grows seven ears, in every ear a hundred grains.", ar: "" }) +
      "</p><small>" + L({ bn: "সূরা আল-বাকারাহ ২:২৬১", en: "Surah al-Baqarah 2:261", ar: "سورة البقرة ٢٦١" }) + "</small></div>";
  }
  P.funds = function () {
    return h.pageHead(U("donate"), U("nav_funds"), T((C().donateCopy || {}).transparency), h.crumbs([[U("nav_funds")]])) +
      '<section class="section tight" style="padding-top:0"><div class="wrap"><div class="causes">' + funds().map(causeCard).join("") + '</div></div></section><section class="section tight"><div class="wrap">' + verseBlock() + "</div></section>";
  };

  function chapterHtml(c, i) {
    var media = c.video ? '<button class="vcover" data-play="' + esc(c.video) + '" data-title="' + esc(L(c.title)) + '"><img loading="lazy" src="' + esc(img(c.image || "yt:" + c.video)) + '" alt=""><span class="pl">' + icon("play") + "</span></button>"
      : '<div class="photo" data-lightbox="' + esc(img(c.image)) + '" style="cursor:zoom-in"><img loading="lazy" src="' + esc(img(c.image)) + '" alt=""></div>';
    return '<div class="chap rv">' + media + '<div><div class="n">' + String(i + 1).padStart(2, "0") + "</div><h3>" + T(c.title) + "</h3><p>" + T(c.text) + "</p></div></div>";
  }
  function levelsHtml(kind) {
    var F = C().floors || {}, list = (F[kind] || []);
    return '<div class="levels">' + list.map(function (f) {
      return '<div class="lv ' + esc(f.status) + '"><span>' + T(f.label) + "</span><i></i><b>" + (f.note ? T(f.note) : U("status_" + f.status)) + "</b></div>";
    }).join("") + "</div>";
  }
  P.fund = function (id) {
    var f = fundById(id); if (!f) return P.notfound();
    var html = '<section class="fund-hero"><img src="' + esc(img(f.cover || f.image)) + '" alt=""><div class="wrap">' + h.crumbs([[U("nav_funds"), "#funds"], [T(f.name)]]) +
      '<div class="eyebrow">' + T(f.tagline || "") + '</div><h1 class="h-display">' + T(f.name) + '</h1><p class="lead">' + T(f.text) + '</p><div class="ctas"><button class="btn light lg" data-scrollto="give">' + icon("heart") + U("donate_now") + "</button>" +
      (f.video ? '<button class="btn on-dark lg" data-play="' + esc(f.video) + '" data-title="' + esc(L(f.name)) + '">' + icon("play") + U("watch_documentary") + "</button>" : "") + "</div></div></section>";
    html += '<section class="section"><div class="wrap fund-layout"><div>';
    if (f.floors) html += '<div class="upd rv" style="margin-bottom:40px"><div class="in"><div class="eyebrow" style="margin:0">' + U("current_status") + " · " + h.fdate((C().floors || {}).asOf) + '</div><div class="head">' + icon("check") + "<span>" + T(((C().floors || {}).headline || {})[f.floors]) + "</span></div>" + levelsHtml(f.floors) + '<div class="spec">' + T(((C().floors || {}).specs || {})[f.floors]) + "</div></div></div>";
    if ((f.story || []).length) html += '<h2 class="h-section" style="margin-bottom:28px">' + L({ bn: "ছবিতে ও ভিডিওতে", en: "In pictures and film", ar: "بالصور والفيديو" }) + '</h2><div class="doc">' + f.story.map(chapterHtml).join("") + "</div>";
    if ((f.shares || []).length) html += '<div style="margin-top:48px"><h2 class="h-section">' + U("take_a_share") + '</h2><p class="muted">' + U("share_hint") + '</p><div class="shares" style="margin-top:16px">' + f.shares.map(function (s, i) { return shareBtn(s, i); }).join("") + '</div><div class="src">' + L({ bn: "সূত্র: IBT ক্যাটালগ ২০২৬", en: "Source: IBT Catalog 2026", ar: "المصدر: كتيّب الوقف 2026" }) + "</div></div>";
    html += '</div><aside class="give-sticky" id="give">' + quickGive(f) + "</aside></div></section>";
    var others = funds().filter(function (x) { return x.id !== f.id; }).slice(0, 3);
    html += '<section class="section tight alt"><div class="wrap"><div class="sec-head"><h2 class="h-section">' + U("all_causes") + '</h2><a class="linkarrow" href="#funds">' + U("view_all") + ARROW + '</a></div><div class="causes">' + others.map(causeCard).join("") + "</div></div></section>";
    return html;
  };
  /* ---------- quick give card (cause pages) → opens the donate wizard ---------- */
  var give = { fund: null, share: null, qty: 1, amount: 0, freq: "once", method: "bkash", step: 1 };
  function quickGive(f) {
    var sug = f.suggested || [500, 1000, 5000, 10000];
    return '<div class="give"><h3>' + U("give_to_fund") + '</h3><p class="faint" style="margin:0">' + T(f.name) + '</p><div class="amts">' + sug.map(function (a, i) { return '<button type="button" data-qg="' + a + '" aria-pressed="' + (i === 1) + '">' + money(a) + "</button>"; }).join("") + '</div>' +
      '<button class="btn primary lg block" data-qg-go="' + esc(f.id) + '">' + icon("heart") + U("donate_now") + ARROW + '</button><p class="faint" style="margin:0;text-align:center">' + L({ bn: "বিকাশ, নগদ, রকেট বা ব্যাংকে পাঠাতে পারবেন", en: "Send by bKash, Nagad, Rocket or bank", ar: "عبر بيكاش أو نقد أو روكيت أو البنك" }) + "</p></div>";
  }
  function shareBtn(s, i) {
    return '<button class="share" type="button" data-share="' + i + '" aria-pressed="false"><span class="ic">' + icon(s.icon || "heart") + "</span><span><b>" + T(s.name) + "</b><span>" + money(s.amount) + "</span></span></button>";
  }
  document.addEventListener("click", function (e) {
    var q = e.target.closest("[data-qg]"); if (q) { $$("[data-qg]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === q)); }); return; }
    var go = e.target.closest("[data-qg-go]");
    if (go) { var f = fundById(go.dataset.qgGo), sel = $("[data-qg][aria-pressed=true]"); give = { fund: f.id, share: null, qty: 1, amount: sel ? +sel.dataset.qg : (f.suggested || [1000])[1], freq: "once", method: give.method || "bkash", step: 3 }; st.giveKeep = true; location.hash = "#donate"; return; }
    var sh = e.target.closest(".share[data-share]");
    if (sh && st.route && st.route.indexOf("fund-") === 0) { var fu = fundById(st.route.slice(5)); give = { fund: fu.id, share: +sh.dataset.share, qty: 1, amount: 0, freq: "once", method: give.method || "bkash", step: 2 }; st.giveKeep = true; location.hash = "#donate"; }
  });

  /* ---------- donate wizard: 1 cause → 2 amount → 3 send → 4 tell us ---------- */
  var STEPS = [["step_fund", "heart"], ["step_amount", "coin"], ["step_pay", "phone"], ["step_report", "check"]];
  P.donate = function () {
    if (!st.giveKeep) give = { fund: st.fund || null, share: null, qty: 1, amount: 0, freq: "once", method: "bkash", step: st.fund ? 2 : 1 };
    st.giveKeep = false;
    if (give.fund && !give.amount && give.share == null) give.amount = (fundById(give.fund).suggested || [1000])[1];
    return '<section class="page-hero donate-hero"><div class="wrap">' + h.crumbs([[U("donate")]]) + '<h1 class="h-display">' + L({ bn: "সহজে দান করুন", en: "Give in a few easy steps", ar: "تبرّع بخطوات سهلة" }) + '</h1><p class="lead">' + L({ bn: "খাত বাছুন, পরিমাণ ঠিক করুন, টাকা পাঠান, তারপর আমাদের জানিয়ে দিন। আপনার দান নির্দিষ্ট খাতেই জমা হবে।", en: "Choose a cause, pick an amount, send the money, then let us know. Your gift is recorded against the cause you chose.", ar: "اختر المجال والمبلغ، أرسل التبرع، ثم أبلغنا. يُسجَّل تبرعك في المجال الذي اخترته." }) + "</p></div></section>" +
      '<section class="section tight" style="padding-top:0"><div class="wrap"><ol class="wiz-steps" id="wizSteps">' + STEPS.map(function (s, i) { return '<li><button type="button" data-wiz-go="' + (i + 1) + '"><i>' + digits(i + 1) + "</i><span>" + U(s[0]) + "</span></button></li>"; }).join("") + '</ol><div class="wiz" id="wiz"></div>' +
      '<div class="wiz-help">' + icon("phone") + "<span>" + L({ bn: "দান করতে কোনো সমস্যা হলে কল করুন", en: "Need help giving? Call us", ar: "تحتاج مساعدة؟ اتصل بنا" }) + ' <a class="ltr" href="tel:+8801852808554">+880 1852-808554</a></span></div></div></section>' +
      '<section class="section tight"><div class="wrap">' + verseBlock() + "</div></section>";
  };
  function total() { var f = fundById(give.fund); if (f && give.share != null && f.shares && f.shares[give.share]) return f.shares[give.share].amount * give.qty; return give.amount || 0; }
  function summary() {
    var f = fundById(give.fund); if (!f) return "";
    return '<div class="wiz-sum"><img src="' + esc(img(f.image)) + '" alt=""><div><small>' + U("your_gift") + "</small><b>" + T(f.name) + (give.share != null && f.shares ? " · " + esc(L(f.shares[give.share].name)) + " × " + num(give.qty) : "") + '</b></div><strong>' + (total() ? money(total()) : "—") + (give.freq === "monthly" ? "<small> / " + U("monthly") + "</small>" : "") + "</strong></div>";
  }
  var PAYSTEPS = {
    bkash: { bn: ["বিকাশ অ্যাপ খুলুন", "“Payment” (পেমেন্ট) অপশনে যান", "মার্চেন্ট নম্বর দিন: {n}", "টাকার পরিমাণ দিন: {a}", "রেফারেন্সে খাতের নাম লিখুন: {f}", "পিন দিয়ে নিশ্চিত করুন এবং ট্রানজেকশন আইডি রেখে দিন"],
             en: ["Open the bKash app", "Tap “Payment”", "Enter the merchant number: {n}", "Enter the amount: {a}", "In the reference, write the cause: {f}", "Confirm with your PIN and keep the transaction ID"] },
    nagad: { bn: ["নগদ অ্যাপ খুলুন", "“Send Money” অপশনে যান", "নম্বর দিন: {n}", "টাকার পরিমাণ দিন: {a}", "রেফারেন্সে খাতের নাম লিখুন: {f}", "পিন দিয়ে নিশ্চিত করুন এবং ট্রানজেকশন আইডি রেখে দিন"],
             en: ["Open the Nagad app", "Tap “Send Money”", "Enter the number: {n}", "Enter the amount: {a}", "In the reference, write the cause: {f}", "Confirm with your PIN and keep the transaction ID"] },
    rocket: { bn: ["রকেট অ্যাপ খুলুন বা *322# ডায়াল করুন", "“Send Money” অপশনে যান", "নম্বর দিন: {n}", "টাকার পরিমাণ দিন: {a}", "রেফারেন্সে খাতের নাম লিখুন: {f}", "পিন দিয়ে নিশ্চিত করুন এবং ট্রানজেকশন আইডি রেখে দিন"],
              en: ["Open the Rocket app or dial *322#", "Choose “Send Money”", "Enter the number: {n}", "Enter the amount: {a}", "In the reference, write the cause: {f}", "Confirm with your PIN and keep the transaction ID"] }
  };
  var COL = { bkash: "#E2136E", nagad: "#EC1C24", rocket: "#8C3494", bank: "#235347" };
  function chs() { return ((C().payment || {}).channels || []).filter(function (c) { return c.show; }); }
  function bankCard(c) {
    return '<div class="bank"><div class="bn">' + esc(tr(c.name, "en")) + '</div><div class="acn">' + esc(c.acname || "") + '</div><div class="no"><span>' + esc(c.number) + '</span><button class="icon-btn" data-copy="' + esc(c.number.replace(/\s/g, "")) + '" aria-label="' + esc(Uraw("copy")) + '">' + icon("copy") + "</button></div><dl>" +
      (c.branch ? "<dt>" + U("branch") + "</dt><dd>" + esc(tr(c.branch, "en")) + "</dd>" : "") + (c.routing ? "<dt>" + U("routing") + "</dt><dd>" + esc(c.routing) + "</dd>" : "") + (c.swift ? "<dt>SWIFT</dt><dd>" + esc(c.swift) + "</dd>" : "") + "</dl></div>";
  }
  function drawWiz() {
    var w = $("#wiz"); if (!w) return;
    var f = fundById(give.fund), s = give.step, html = "";
    $$("#wizSteps li").forEach(function (li, i) { li.className = i + 1 < s ? "done" : i + 1 === s ? "on" : ""; });
    if (s > 1 && f) html += summary();
    if (s === 1) {
      html += '<h2 class="wiz-q">' + L({ bn: "কোন খাতে দান করতে চান?", en: "Which cause would you like to support?", ar: "أي مجال تود دعمه؟" }) + '</h2><div class="pick">' + funds().map(function (x) {
        return '<button type="button" class="pick-c" data-pick="' + esc(x.id) + '" aria-pressed="' + (x.id === give.fund) + '"><span class="ph"><img loading="lazy" src="' + esc(img(x.image)) + '" alt=""></span><span class="tx"><b>' + T(x.name) + "</b><small>" + T(x.tagline || "") + "</small></span></button>";
      }).join("") + "</div>";
    } else if (s === 2) {
      var sug = f.suggested || [500, 1000, 5000, 10000];
      html += '<h2 class="wiz-q">' + L({ bn: "কত টাকা দান করতে চান?", en: "How much would you like to give?", ar: "كم تود أن تتبرع؟" }) + '</h2><div class="amts big">' + sug.map(function (a) { return '<button type="button" data-amt="' + a + '" aria-pressed="' + (give.share == null && give.amount === a) + '">' + money(a) + "</button>"; }).join("") + "</div>" +
        '<label class="faint" for="wizAmt" style="display:block;margin-top:14px">' + U("or_amount") + '</label><div class="amount-in"><span>৳</span><input class="input" id="wizAmt" type="number" min="10" step="10" inputmode="numeric" value="' + (give.share == null && give.amount ? give.amount : "") + '"></div>' +
        ((f.shares || []).length ? '<details class="sharebox"' + (give.share != null ? " open" : "") + '><summary>' + icon("cube") + L({ bn: "অথবা নির্মাণের একটি অংশের দায়িত্ব নিন", en: "Or fund a specific part of the construction", ar: "أو موّل جزءًا محددًا من البناء" }) + '</summary><div class="shares">' + f.shares.map(function (x, i) { return '<button class="share" type="button" data-share="' + i + '" aria-pressed="' + (give.share === i) + '"><span class="ic">' + icon(x.icon || "heart") + "</span><span><b>" + T(x.name) + "</b><span>" + money(x.amount) + "</span></span></button>"; }).join("") + "</div>" +
          (give.share != null ? '<div class="qty"><span>' + L({ bn: "পরিমাণ (কয়টি)", en: "Quantity", ar: "الكمية" }) + '</span><span class="stepper"><button type="button" data-qty="-1" aria-label="-">−</button><b>' + num(give.qty) + '</b><button type="button" data-qty="1" aria-label="+">+</button></span></div>' : "") + "</details>" : "") +
        '<div class="seg" role="group" style="margin-top:16px"><button data-freq="once" aria-pressed="' + (give.freq === "once") + '">' + L({ bn: "এককালীন", en: "One-time", ar: "مرة واحدة" }) + '</button><button data-freq="monthly" aria-pressed="' + (give.freq === "monthly") + '">' + U("monthly") + "</button></div>" +
        (give.freq === "monthly" ? '<p class="faint" style="margin:8px 0 0">' + L({ bn: "প্রতি মাসে একই পরিমাণ পাঠাতে পারেন; বিকাশ অটো-পে চালু হলে এখানে জানানো হবে।", en: "Send the same amount each month; we'll announce here when bKash auto-pay is available.", ar: "يمكنك إرسال المبلغ نفسه شهريًا." }) + "</p>" : "");
    } else if (s === 3) {
      var list = chs(), types = ["bkash", "nagad", "rocket", "bank"].filter(function (t) { return list.some(function (c) { return c.type === t; }); });
      if (types.indexOf(give.method) < 0) give.method = types[0];
      html += '<h2 class="wiz-q">' + L({ bn: "কীভাবে টাকা পাঠাবেন?", en: "How would you like to send it?", ar: "كيف تود الإرسال؟" }) + '</h2><div class="methods">' + types.map(function (t) { return '<button type="button" data-method="' + t + '" aria-pressed="' + (t === give.method) + '"><span class="dotc" style="background:' + COL[t] + '"></span>' + ({ bkash: L({ bn: "বিকাশ", en: "bKash", ar: "بيكاش" }), nagad: L({ bn: "নগদ", en: "Nagad", ar: "نقد" }), rocket: L({ bn: "রকেট", en: "Rocket", ar: "روكيت" }), bank: L({ bn: "ব্যাংক", en: "Bank", ar: "بنك" }) })[t] + "</button>"; }).join("") + "</div>";
      var mine = list.filter(function (c) { return c.type === give.method; });
      if (give.method === "bank") html += '<div class="channels" style="margin-top:14px">' + mine.map(bankCard).join("") + '</div><p class="faint">' + L({ bn: "জমার স্লিপে বা ট্রান্সফারের রেফারেন্সে খাতের নাম লিখুন।", en: "Write the cause in the deposit slip or transfer reference.", ar: "اكتب اسم المجال في مرجع التحويل." }) + "</p>";
      else {
        var c0 = mine[0], lng = st.lang === "bn" ? "bn" : "en";
        var stepsTxt = (PAYSTEPS[give.method] || PAYSTEPS.nagad)[lng].map(function (x) { return "<li>" + esc(x).replace("{n}", '<b class="ltr">' + esc(c0.number) + "</b>").replace("{a}", "<b>" + money(total()) + "</b>").replace("{f}", "<b>" + esc(L(f.name)) + "</b>") + "</li>"; }).join("");
        html += '<div class="paycard" style="--pc:' + COL[give.method] + '"><div class="pc-top">' + mine.map(function (c) { return '<div class="pc-num"><small>' + T(c.name) + '</small><span class="ltr">' + esc(c.number) + '</span><button class="btn sm" data-copy="' + esc(c.number.replace(/[^\d]/g, "")) + '">' + icon("copy") + U("copy") + "</button></div>"; }).join("") + '</div><ol class="howto">' + stepsTxt + "</ol></div>";
      }
    } else if (s === 4) {
      var chOpts = chs().filter(function (c) { return c.type === give.method; });
      html += '<h2 class="wiz-q">' + L({ bn: "টাকা পাঠিয়েছেন? আমাদের জানিয়ে দিন", en: "Sent it? Let us know", ar: "أرسلت التبرع؟ أبلغنا" }) + '</h2><p class="muted">' + L({ bn: "শুধু তিনটি তথ্য দিন। এতে আপনার দান নির্দিষ্ট খাতে জমা হবে এবং আমরা নিশ্চিত করে জানাব।", en: "Just three details, so we can record your gift against the cause and confirm it.", ar: "ثلاث معلومات فقط لنسجل تبرعك ونؤكده." }) + "</p>" +
        '<form class="form" data-submit="donation" data-ref="' + esc(give.fund) + '"><input type="hidden" name="fund" value="' + esc(give.fund) + '"><input type="hidden" name="amount" value="' + total() + '"><input type="hidden" name="frequency" value="' + give.freq + '"><input type="hidden" name="share" value="' + (give.share != null && f.shares ? esc(L(f.shares[give.share].name)) + " x" + give.qty : "") + '"><input type="hidden" name="date" value="' + new Date().toISOString().slice(0, 10) + '">' +
        '<div class="row2"><div class="field"><label for="d_name">' + U("name") + ' *</label><input class="input" id="d_name" name="name" required autocomplete="name"></div><div class="field"><label for="d_phone">' + U("phone") + ' *</label><input class="input" id="d_phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel"></div></div>' +
        '<div class="row2"><div class="field"><label for="d_txn">' + U("txn_id") + ' *</label><input class="input" id="d_txn" name="txn" required></div><div class="field"><label for="d_ch">' + U("channel") + '</label><select class="input" id="d_ch" name="channel">' + chs().map(function (c) { return '<option value="' + esc(c.type + ":" + c.number) + '"' + (c === chOpts[0] ? " selected" : "") + ">" + esc(tr(c.name)) + " · " + esc(c.number) + "</option>"; }).join("") + "</select></div></div>" +
        '<div class="field"><label for="d_msg">' + U("message") + '</label><textarea class="input" id="d_msg" name="message" rows="2" style="min-height:70px"></textarea></div><button class="btn primary lg" type="submit">' + icon("check") + U("submit") + '</button><div class="out" aria-live="polite"></div></form>';
    }
    var canNext = s === 1 ? !!give.fund : s === 2 ? total() >= 10 : s === 3;
    html += '<div class="wiz-nav">' + (s > 1 ? '<button class="btn" data-wiz="back">' + icon("arrow", "flip-ltr") + L({ bn: "আগের ধাপ", en: "Back", ar: "السابق" }) + "</button>" : "<span></span>") +
      (s < 4 ? '<button class="btn primary lg" data-wiz="next"' + (canNext ? "" : " disabled") + ">" + (s === 3 ? L({ bn: "টাকা পাঠিয়েছি", en: "I've sent it", ar: "تم الإرسال" }) : L({ bn: "পরের ধাপ", en: "Continue", ar: "التالي" })) + ARROW + "</button>" : "") + "</div>";
    w.innerHTML = html;
  }
  function wizNav(n) { give.step = Math.max(1, Math.min(4, n)); drawWiz(); var t = $("#wizSteps"); if (t && t.getBoundingClientRect().top < 0) t.scrollIntoView({ behavior: "smooth" }); }
  document.addEventListener("click", function (e) {
    if (st.route !== "donate" || !$("#wiz")) return;
    var t = e.target, b;
    if ((b = t.closest("[data-wiz-go]"))) { var n = +b.dataset.wizGo; if (n === 1 || (n === 2 && give.fund) || (n >= 3 && give.fund && total() >= 10)) wizNav(n); return; }
    if ((b = t.closest("[data-pick]"))) { give.fund = b.dataset.pick; give.share = null; give.qty = 1; give.amount = (fundById(give.fund).suggested || [1000])[1]; wizNav(2); return; }
    if ((b = t.closest("[data-amt]"))) { give.share = null; give.amount = +b.dataset.amt; drawWiz(); return; }
    if ((b = t.closest(".share[data-share]"))) { give.share = +b.dataset.share; give.qty = 1; drawWiz(); return; }
    if ((b = t.closest("[data-qty]"))) { give.qty = Math.max(1, Math.min(999, give.qty + (+b.dataset.qty))); drawWiz(); return; }
    if ((b = t.closest("[data-freq]"))) { give.freq = b.dataset.freq; drawWiz(); return; }
    if ((b = t.closest("[data-method]"))) { give.method = b.dataset.method; drawWiz(); return; }
    if ((b = t.closest("[data-wiz]"))) { wizNav(give.step + (b.dataset.wiz === "next" ? 1 : -1)); return; }
  });
  document.addEventListener("input", function (e) {
    if (e.target.id !== "wizAmt") return;
    give.share = null; give.amount = Math.max(0, parseInt(e.target.value, 10) || 0);
    $$("#wiz [data-amt]").forEach(function (x) { x.setAttribute("aria-pressed", String(+x.dataset.amt === give.amount)); });
    $$("#wiz .share").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
    var nx = $('#wiz [data-wiz="next"]'); if (nx) nx.disabled = give.amount < 10;
    var sm = $("#wiz .wiz-sum strong"); if (sm) sm.innerHTML = give.amount ? money(give.amount) : "—";
  });
  document.addEventListener("click", function (e) {
    var gv = e.target.closest("[data-give]"); if (gv) { e.preventDefault(); give = { fund: gv.dataset.give, share: null, qty: 1, amount: (fundById(gv.dataset.give).suggested || [1000])[1], freq: "once", method: "bkash", step: 2 }; st.giveKeep = true; location.hash = "#donate"; return; }
    var df = e.target.closest("a[data-fund]"); if (df) { st.fund = df.dataset.fund; }
    var sc = e.target.closest("[data-scrollto]"); if (sc) { var tt = document.getElementById(sc.dataset.scrollto); if (tt) tt.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });

  /* ================= campus 3D + construction update ================= */
  function futureB(id) { return h.find(((C().future || {}).buildings) || [], id) || {}; }
  function campusGroups() {
    var F = C().floors || {}, mp = C().masterplan || {};
    function sts(list) { return (list || []).slice(1).map(function (f) { return f.status; }); }
    return (mp.groups || []).map(function (g) {
      return { id: g.id, label: L(futureB(g.id).name), parts: g.parts.map(function (p) {
        var q = { x: p.x, z: p.z, w: p.w, d: p.d, kind: p.kind, ghostFloors: p.ghostFloors, name: L(p.name) };
        if (p.status === "mosque") { q.kind = "masjid"; q.floors = sts(F.mosque); q.foundation = ((F.mosque || [])[0] || {}).status || "done"; }
        if (p.status === "academic") { q.floors = sts(F.academic); q.foundation = ((F.academic || [])[0] || {}).status || "progress"; }
        return q;
      }) };
    });
  }
  function itemsHtml(b) { return '<div class="items">' + (b.items || []).map(function (it) { return '<div class="it"><span class="ic">' + icon(it.icon || "cube") + "</span><span>" + T(it.name) + "</span></div>"; }).join("") + "</div>"; }
  function bldPanel(id) {
    var b = futureB(id); if (!b.id) return "";
    var floorsKind = id === "masjid-complex" ? "mosque" : id === "academic-1" ? "academic" : null;
    var COLS = (window.IBT3D && window.IBT3D.colors) || {}, mg = h.find((C().masterplan || {}).groups || [], id) || {};
    return '<div class="bld-tabs">' + ((C().future || {}).buildings || []).map(function (x) { return '<button data-bld="' + esc(x.id) + '" aria-pressed="' + (x.id === id) + '"><i style="background:' + (COLS[x.id] || "var(--accent)") + '"></i>' + T(x.name) + "</button>"; }).join("") + "</div>" +
      "<div><h3>" + T(b.name) + '</h3><div style="margin-top:8px"><span class="chip ' + (b.status === "planned" ? "muted" : "gold") + '"><span class="dot"></span>' + T(b.statusText) + "</span></div></div>" +
      (floorsKind ? levelsHtml(floorsKind) : "") +
      ((mg.parts || []).length > 1 ? '<div class="faint" style="font-weight:600">' + L({ bn: "মাস্টারপ্ল্যানে এই গ্রুপের ভবন", en: "Buildings in this group (master plan)", ar: "مباني هذه المجموعة في المخطط" }) + '</div><div class="parts">' + mg.parts.map(function (p) { return '<span class="chip">' + T(p.name) + "</span>"; }).join("") + "</div>" : "") +
      '<div class="faint" style="font-weight:600">' + U("what_inside") + "</div>" + itemsHtml(b) +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto">' + (b.fund ? '<a class="btn primary sm" href="#fund-' + esc(b.fund) + '">' + icon("heart") + U("give_to_fund") + "</a>" : '<a class="btn primary sm" href="#donate">' + icon("heart") + U("donate") + "</a>") + '<a class="btn sm" href="#future">' + U("nav_future") + ARROW + "</a></div>";
  }
  function campusSection(sel) {
    sel = sel || "masjid-complex";
    return '<div class="campus"><div class="stage3d rv" id="campusStage"><canvas aria-label="3D"></canvas><div class="labels"></div><span class="hint">' + icon("cube") + " " + U("drag_hint") + '</span><div class="zoom3d"><button type="button" data-z3="in" aria-label="+">+</button><button type="button" data-z3="out" aria-label="−">−</button><button type="button" data-z3="reset" aria-label="reset">' + icon("locate") + '</button></div><div class="legend"><span class="chip"><i style="background:var(--done)"></i>' + U("status_done") + '</span><span class="chip"><i style="background:var(--progress)"></i>' + U("status_progress") + '</span><span class="chip"><i style="border:1.5px dashed var(--text-3)"></i>' + U("status_planned") + '</span></div></div><div class="bld-panel rv" id="bldPanel" data-sel="' + esc(sel) + '">' + bldPanel(sel) + "</div></div>";
  }
  function mountCampus() {
    var stage = $("#campusStage"); if (!stage || !window.IBT3D) return;
    var canvas = $("canvas", stage), labels = $(".labels", stage), panel = $("#bldPanel");
    function fallback() { canvas.remove(); stage.insertAdjacentHTML("afterbegin", '<img class="fallback" src="img/design-aerial.jpg" alt="">'); $(".hint", stage).remove(); }
    if (!window.IBT3D.ok()) return fallback();
    var route = st.route;
    window.IBT3D.load().then(function () {
      if (st.route !== route || !document.body.contains(canvas)) return;
      var sc = window.IBT3D.mount(canvas, { groups: campusGroups(), context: (C().masterplan || {}).context, theme: st.theme, labelsEl: labels, selected: panel.dataset.sel, onPick: function (id) { panel.dataset.sel = id; panel.innerHTML = bldPanel(id); } });
      if (sc) { h.scenes().push(sc); IBT._campus = sc; } else fallback();
    }, fallback);
  }
  document.addEventListener("click", function (e) {
    var z = e.target.closest("[data-z3]"); if (z && IBT._campus) { if (z.dataset.z3 === "reset") IBT._campus.reset(); else IBT._campus.zoom(z.dataset.z3 === "in" ? 0.8 : 1.25); return; }
    var b = e.target.closest("[data-bld]"); if (!b) return;
    var panel = $("#bldPanel"); if (!panel) return; panel.dataset.sel = b.dataset.bld; panel.innerHTML = bldPanel(b.dataset.bld);
    if (IBT._campus) IBT._campus.setSelected(b.dataset.bld);
  });
  function ring(kind) {
    var list = (C().floors || {})[kind] || []; if (!list.length) return "";
    var v = list.reduce(function (a, f) { return a + (f.status === "done" ? 1 : f.status === "progress" ? 0.5 : 0); }, 0), p = Math.round(v / list.length * 100);
    return '<span class="ring" data-p="' + p + '" title="' + esc(L({ bn: "কাঠামোর অগ্রগতি (আনুমানিক)", en: "Structure progress (approx.)", ar: "تقدم الهيكل (تقريبي)" })) + '"><b>' + digits(p) + "%</b></span>";
  }
  function updateSection() {
    var F = C().floors || {}, ph = F.photos || {};
    function card(kind, title, fundId, vid) {
      return '<div class="upd rv"><div class="ph"><img loading="lazy" src="' + esc(img(ph[kind])) + '" alt=""><span class="chip">' + h.fdate(F.asOf) + '</span></div><div class="in"><div class="upd-top"><h3>' + title + '</h3>' + ring(kind) + '</div><div class="head">' + icon("check") + "<span>" + T((F.headline || {})[kind]) + "</span></div>" + levelsHtml(kind) + '<div class="spec">' + T((F.specs || {})[kind]) + '</div><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn primary sm" href="#fund-' + fundId + '">' + icon("heart") + U("give_to_fund") + "</a>" + (vid ? '<button class="btn sm" data-play="' + vid + '" data-title="' + esc(Uraw(kind === "mosque" ? "masjid" : "academic_bld")) + '">' + icon("play") + U("watch") + "</button>" : "") + "</div></div></div>";
    }
    return '<div class="update">' + card("mosque", U("masjid"), "mosque", "ViHzrqAKvO8") + card("academic", U("academic_bld"), "academy", "GW_HDHAsbyM") + '</div><div class="src">' + U("source") + ": " + T(F.source) + "</div>";
  }

  /* ================= future projects ================= */
  P.future = function () {
    var Fu = C().future || {};
    return h.pageHead(U("nav_projects"), T(Fu.title), T(Fu.intro), h.crumbs([[U("nav_future")]])) +
      '<section class="section tight" style="padding-top:0"><div class="wrap">' + campusSection("masjid-complex") + '<p class="faint" style="margin-top:12px">' + T(Fu.note) + "</p></div></section>" +
      '<section class="section tight"><div class="wrap fut">' + (Fu.buildings || []).map(function (b, i) {
        return '<article class="fbld rv" id="b-' + esc(b.id) + '"><div class="ph"><img loading="lazy" src="' + esc(img(b.image)) + '" alt=""><span class="num">' + digits(i + 1) + '</span>' + (b.illustrative ? '<span class="chip ill">' + U("illustrative") + "</span>" : "") + '</div><div class="in"><div><span class="chip ' + (b.status === "planned" ? "muted" : "gold") + '"><span class="dot"></span>' + T(b.statusText) + "</span></div><h3>" + T(b.name) + '</h3><div class="faint" style="font-weight:600">' + U("what_inside") + "</div>" + itemsHtml(b) +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">' + (b.fund ? '<a class="btn primary sm" href="#fund-' + esc(b.fund) + '">' + icon("heart") + U("give_to_fund") + "</a>" : '<a class="btn primary sm" href="#donate">' + icon("heart") + U("donate") + "</a>") + "</div></div></article>";
      }).join("") + "</div></section>";
  };

  /* ================= home ================= */
  P.home = function () {
    var c = C(), H = c.home, S = c.settings, V = h.V();
    var slides = (H.heroSlides || []).length ? H.heroSlides : [{ image: H.heroImage, caption: "" }];
    var latest = (V.videos || []).filter(function (v) { return v.channel === "ibt"; })[0];
    var html = '<section class="hero hero-photo" id="hero"><div class="slides" aria-hidden="true">' + slides.map(function (sl, i) { return '<div class="slide' + (i ? "" : " on") + '"><img ' + (i ? 'data-src' : 'src') + '="' + esc(img(sl.image)) + '" alt=""' + (i ? ' decoding="async"' : ' fetchpriority="high"') + "></div>"; }).join("") + "</div>" +
      '<div class="wrap"><div class="content"><div class="eyebrow">' + T(H.heroEyebrow) + '</div><h1 class="h-display">' + T(H.heroTitle) + '</h1><p class="lead">' + T(H.heroText) + '</p><div class="ctas"><a class="btn light lg" href="#activities">' + icon("book") + U("explore_work") + '</a><a class="btn on-dark lg" href="#projects">' + icon("cube") + U("discover_projects") + '</a><a class="btn gold lg" href="#donate">' + icon("heart") + U("support_mission") + "</a></div></div>" +
      '<div class="hero-foot"><div><div class="cap" id="heroCap">' + h.slideCap(slides[0]) + '</div><div class="dots" role="tablist">' + slides.map(function (sl, i) { return '<button role="tab" aria-label="' + (i + 1) + '" aria-current="' + (i ? "false" : "true") + '" data-slide="' + i + '"></button>'; }).join("") + "</div></div>" +
      (latest ? '<button class="latest-vid" data-play="' + esc(latest.id) + '" data-title="' + esc(latest.title) + '"><img src="' + esc(h.ytThumb(latest.id, true)) + '" alt=""><span><small>' + U("latest_videos") + " · YouTube</small><b>" + esc(latest.title) + "</b></span></button>" : "") + "</div></div></section>";
    html += '<div class="wrap"><a class="pt-strip" id="ptStrip" href="#prayer" style="color:inherit"><div class="now"><small>' + U("prayer_title") + '</small><b data-pt-next>—</b><small data-pt-loc></small></div><div class="times" data-pt-times></div><span class="linkarrow">' + U("view_all") + ARROW + "</span></a></div>";
    html += '<section class="section tight"><div class="wrap"><div class="facts rv">' + (H.facts || []).map(function (f) { return '<div><b data-count="' + esc(f.value) + '"' + (f.plain ? ' data-plain="1"' : "") + ">" + (f.plain ? digits(f.value) : num(+f.value)) + "</b><span>" + T(f.label) + "</span></div>"; }).join("") + '</div><div class="src">' + T(H.factsSource) + "</div></div></section>";
    html += '<section class="section" style="padding-top:clamp(24px,4vw,48px)"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">' + U("construction_update") + " · " + h.fdate((c.floors || {}).asOf) + '</div><h2 class="h-section">' + T(((c.projects || [])[0] || {}).name) + '</h2></div><a class="linkarrow" href="#project-ibjmc">' + U("learn_more") + ARROW + "</a></div>" + updateSection() + "</div></section>";
    html += '<section class="section alt"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">' + U("nav_funds") + '</div><h2 class="h-section">' + L({ bn: "যে খাতে দান করতে চান", en: "Choose where your gift goes", ar: "اختر أين يذهب عطاؤك" }) + '</h2></div><a class="linkarrow" href="#funds">' + U("all_causes") + ARROW + '</a></div><div class="causes">' + funds().slice(0, 6).map(causeCard).join("") + "</div></div></section>";
    html += '<section class="section"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">' + U("explore_3d") + '</div><h2 class="h-section">' + T((c.future || {}).title) + '</h2><p>' + T((c.future || {}).intro) + '</p></div><a class="linkarrow" href="#future">' + U("view_all") + ARROW + "</a></div>" + campusSection("masjid-complex") + "</div></section>";
    html += '<section class="section" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">' + T(S.tagline) + '</div><h2 class="h-section">' + U("our_work") + '</h2></div></div><div class="work-grid">' + (H.pillars || []).map(function (p, i) { return '<a class="work rv' + (i === 0 ? " wide" : "") + '" href="' + esc(p.link || "#initiatives") + '"><img loading="lazy" src="' + esc(img(p.image)) + '" alt=""><div class="in"><h3>' + T(p.title) + "</h3><p>" + T(p.text) + "</p></div></a>"; }).join("") + "</div></div></section>";
    html += '<section class="section alt"><div class="wrap split"><div class="rv"><div class="eyebrow">' + U("nav_quran") + '</div><h2 class="h-section">' + U("quran_title") + '</h2><p class="lead">' + L({ bn: "পছন্দের কারির তিলাওয়াত শুনুন, অর্থসহ পড়ুন এবং প্রয়োজনে তাফসির খুলে দেখুন।", en: "Listen with your chosen reciter, read with translation, and open the tafsir whenever you need it.", ar: "استمع بصوت قارئك المفضل، واقرأ مع الترجمة، وافتح التفسير متى شئت." }) + '</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn primary" href="#quran">' + icon("quran") + U("nav_quran") + '</a><a class="btn" href="#prayer">' + icon("clock") + U("nav_prayer") + '</a></div></div><div class="verse rv"><div class="ar" lang="ar">إِنَّ هَٰذَا ٱلْقُرْءَانَ يَهْدِى لِلَّتِى هِىَ أَقْوَمُ</div><p>' + L({ bn: "নিশ্চয় এই কুরআন সেই পথ দেখায় যা সবচেয়ে সরল ও সঠিক।", en: "Indeed, this Qur'an guides to that which is most upright.", ar: "" }) + "</p><small>" + L({ bn: "সূরা আল-ইসরা ১৭:৯", en: "Surah al-Isra 17:9", ar: "سورة الإسراء ٩" }) + "</small></div></div></section>";
    var vids = (V.videos || []).filter(function (v) { return v.channel === "ibt"; }).slice(0, 8);
    if (vids.length) html += '<section class="section"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">YouTube</div><h2 class="h-section">' + U("latest_videos") + '</h2></div><a class="linkarrow" href="#media">' + U("all_videos") + ARROW + '</a></div><div class="grid g4">' + vids.map(h.vcard).join("") + "</div></div></section>";
    html += '<section class="section" style="padding-top:0"><div class="wrap"><div class="sec-head"><h2 class="h-section">' + U("activities") + '</h2><a class="linkarrow" href="#news">' + U("view_all") + ARROW + '</a></div><div class="acts">' + h.sortedNews().slice(0, 5).map(h.actRow).join("") + "</div></div></section>";
    html += '<section class="section" style="padding-top:0"><div class="wrap split rev"><div class="photo rv" style="aspect-ratio:4/5;max-height:560px"><img loading="lazy" src="' + esc(img(c.chairman.photo2 || c.chairman.photo)) + '" alt="' + esc(tr(c.chairman.name)) + '"></div><div class="rv"><div class="eyebrow">' + U("chairman_title") + '</div><h2 class="h-section">' + T(c.chairman.name) + '</h2><p class="muted">' + T(c.chairman.role) + '</p><p class="lead">' + T(c.chairman.message).slice(0, 380) + '…</p><a class="btn" href="#chairman">' + U("read_message") + ARROW + "</a></div></div></section>";
    var ch = ((c.payment || {}).channels || []).filter(function (x) { return x.show && x.type !== "bank"; });
    html += '<section class="section" style="padding-top:0"><div class="wrap"><div class="donate-band rv"><div><h2 class="h-section">' + U("donate_band") + "</h2><p>" + T((c.donateCopy || {}).transparency) + '</p><a class="btn light lg" href="#donate">' + icon("heart") + U("give_now") + ARROW + '</a></div><div class="chs">' + ch.map(function (x) { return '<div class="ch"><span>' + T(x.name) + "</span><span>" + esc(x.number) + "</span></div>"; }).join("") + "</div></div></div></section>";
    return html;
  };

  /* project page: replace tracker with the campus + update cards */
  var origProject = P.project;
  P.project = function (id) {
    var html = origProject(id);
    if (id !== "ibjmc") return html;
    html = html.replace(/<section class="section tight" id="tracker">[\s\S]*?<\/section>/, '<section class="section tight" id="tracker"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">' + U("construction_update") + " · " + h.fdate((C().floors || {}).asOf) + '</div><h2 class="h-section">' + U("current_status") + "</h2></div></div>" + updateSection() + '<div style="margin-top:28px">' + campusSection("masjid-complex") + "</div></div></section>");
    return html;
  };

  /* ================= prayer times ================= */
  var CITIES = [
    ["BD", "বাংলাদেশ", "Bangladesh", "بنغلاديش", "Asia/Dhaka", "Karachi", [["Uttara, Dhaka", "উত্তরা, ঢাকা", "أُترا، دكا", 23.8759, 90.3795], ["Dhaka", "ঢাকা", "دكا", 23.8103, 90.4125], ["Chattogram", "চট্টগ্রাম", "شيتاغونغ", 22.3569, 91.7832], ["Sylhet", "সিলেট", "سلهت", 24.8949, 91.8687], ["Rajshahi", "রাজশাহী", "راجشاهي", 24.3745, 88.6042], ["Khulna", "খুলনা", "خولنا", 22.8456, 89.5403], ["Barishal", "বরিশাল", "باريسال", 22.701, 90.3535], ["Rangpur", "রংপুর", "رانغبور", 25.7439, 89.2752], ["Mymensingh", "ময়মনসিংহ", "ميمنسينغ", 24.7471, 90.4203], ["Cumilla", "কুমিল্লা", "كوميلا", 23.4607, 91.1809], ["Gazipur", "গাজীপুর", "غازيبور", 23.9999, 90.4203], ["Narayanganj", "নারায়ণগঞ্জ", "نارايانغانج", 23.6238, 90.5], ["Cox's Bazar", "কক্সবাজার", "كوكس بازار", 21.4272, 92.0058]]],
    ["SA", "সৌদি আরব", "Saudi Arabia", "السعودية", "Asia/Riyadh", "UmmAlQura", [["Makkah", "মক্কা", "مكة المكرمة", 21.4225, 39.8262], ["Madinah", "মদিনা", "المدينة المنورة", 24.4672, 39.6111], ["Riyadh", "রিয়াদ", "الرياض", 24.7136, 46.6753], ["Jeddah", "জেদ্দা", "جدة", 21.4858, 39.1925], ["Dammam", "দাম্মাম", "الدمام", 26.4207, 50.0888]]],
    ["AE", "সংযুক্ত আরব আমিরাত", "United Arab Emirates", "الإمارات", "Asia/Dubai", "Dubai", [["Dubai", "দুবাই", "دبي", 25.2048, 55.2708], ["Abu Dhabi", "আবুধাবি", "أبوظبي", 24.4539, 54.3773], ["Sharjah", "শারজাহ", "الشارقة", 25.3463, 55.4209]]],
    ["QA", "কাতার", "Qatar", "قطر", "Asia/Qatar", "Qatar", [["Doha", "দোহা", "الدوحة", 25.2854, 51.531]]],
    ["KW", "কুয়েত", "Kuwait", "الكويت", "Asia/Kuwait", "Kuwait", [["Kuwait City", "কুয়েত সিটি", "مدينة الكويت", 29.3759, 47.9774]]],
    ["OM", "ওমান", "Oman", "عُمان", "Asia/Muscat", "MuslimWorldLeague", [["Muscat", "মাসকাট", "مسقط", 23.588, 58.3829]]],
    ["BH", "বাহরাইন", "Bahrain", "البحرين", "Asia/Bahrain", "MuslimWorldLeague", [["Manama", "মানামা", "المنامة", 26.2285, 50.586]]],
    ["MY", "মালয়েশিয়া", "Malaysia", "ماليزيا", "Asia/Kuala_Lumpur", "Singapore", [["Kuala Lumpur", "কুয়ালালামপুর", "كوالالمبور", 3.139, 101.6869], ["Penang", "পেনাং", "بينانغ", 5.4141, 100.3288]]],
    ["SG", "সিঙ্গাপুর", "Singapore", "سنغافورة", "Asia/Singapore", "Singapore", [["Singapore", "সিঙ্গাপুর", "سنغافورة", 1.3521, 103.8198]]],
    ["ID", "ইন্দোনেশিয়া", "Indonesia", "إندونيسيا", "Asia/Jakarta", "Singapore", [["Jakarta", "জাকার্তা", "جاكرتا", -6.2088, 106.8456]]],
    ["PK", "পাকিস্তান", "Pakistan", "باكستان", "Asia/Karachi", "Karachi", [["Karachi", "করাচি", "كراتشي", 24.8607, 67.0011], ["Lahore", "লাহোর", "لاهور", 31.5204, 74.3587], ["Islamabad", "ইসলামাবাদ", "إسلام آباد", 33.6844, 73.0479]]],
    ["IN", "ভারত", "India", "الهند", "Asia/Kolkata", "Karachi", [["Kolkata", "কলকাতা", "كولكاتا", 22.5726, 88.3639], ["Delhi", "দিল্লি", "دلهي", 28.7041, 77.1025], ["Mumbai", "মুম্বাই", "مومباي", 19.076, 72.8777]]],
    ["MV", "মালদ্বীপ", "Maldives", "المالديف", "Indian/Maldives", "MuslimWorldLeague", [["Malé", "মালে", "ماليه", 4.1755, 73.5093]]],
    ["TR", "তুরস্ক", "Türkiye", "تركيا", "Europe/Istanbul", "Turkey", [["Istanbul", "ইস্তাম্বুল", "إسطنبول", 41.0082, 28.9784], ["Ankara", "আঙ্কারা", "أنقرة", 39.9334, 32.8597]]],
    ["EG", "মিশর", "Egypt", "مصر", "Africa/Cairo", "Egyptian", [["Cairo", "কায়রো", "القاهرة", 30.0444, 31.2357]]],
    ["GB", "যুক্তরাজ্য", "United Kingdom", "المملكة المتحدة", "Europe/London", "MoonsightingCommittee", [["London", "লন্ডন", "لندن", 51.5074, -0.1278], ["Birmingham", "বার্মিংহাম", "برمنغهام", 52.4862, -1.8904], ["Manchester", "ম্যানচেস্টার", "مانشستر", 53.4808, -2.2426]]],
    ["US", "যুক্তরাষ্ট্র", "United States", "الولايات المتحدة", "America/New_York", "NorthAmerica", [["New York", "নিউইয়র্ক", "نيويورك", 40.7128, -74.006, "America/New_York"], ["Chicago", "শিকাগো", "شيكاغو", 41.8781, -87.6298, "America/Chicago"], ["Houston", "হিউস্টন", "هيوستن", 29.7604, -95.3698, "America/Chicago"], ["Los Angeles", "লস অ্যাঞ্জেলেস", "لوس أنجلوس", 34.0522, -118.2437, "America/Los_Angeles"]]],
    ["CA", "কানাডা", "Canada", "كندا", "America/Toronto", "NorthAmerica", [["Toronto", "টরন্টো", "تورنتو", 43.6532, -79.3832], ["Montreal", "মন্ট্রিয়াল", "مونتريال", 45.5019, -73.5674]]],
    ["AU", "অস্ট্রেলিয়া", "Australia", "أستراليا", "Australia/Sydney", "MuslimWorldLeague", [["Sydney", "সিডনি", "سيدني", -33.8688, 151.2093], ["Melbourne", "মেলবোর্ন", "ملبورن", -37.8136, 144.9631, "Australia/Melbourne"]]],
    ["DE", "জার্মানি", "Germany", "ألمانيا", "Europe/Berlin", "MuslimWorldLeague", [["Berlin", "বার্লিন", "برلين", 52.52, 13.405]]],
    ["FR", "ফ্রান্স", "France", "فرنسا", "Europe/Paris", "MuslimWorldLeague", [["Paris", "প্যারিস", "باريس", 48.8566, 2.3522]]],
    ["IT", "ইতালি", "Italy", "إيطاليا", "Europe/Rome", "MuslimWorldLeague", [["Rome", "রোম", "روما", 41.9028, 12.4964]]],
    ["JP", "জাপান", "Japan", "اليابان", "Asia/Tokyo", "MuslimWorldLeague", [["Tokyo", "টোকিও", "طوكيو", 35.6762, 139.6503]]],
    ["ZA", "দক্ষিণ আফ্রিকা", "South Africa", "جنوب أفريقيا", "Africa/Johannesburg", "MuslimWorldLeague", [["Johannesburg", "জোহানেসবার্গ", "جوهانسبرغ", -26.2041, 28.0473]]]
  ];
  var METHODS = [["Karachi", "University of Islamic Sciences, Karachi"], ["MuslimWorldLeague", "Muslim World League"], ["UmmAlQura", "Umm al-Qura, Makkah"], ["Egyptian", "Egyptian General Authority"], ["Dubai", "Dubai"], ["Qatar", "Qatar"], ["Kuwait", "Kuwait"], ["Singapore", "Singapore / Malaysia (JAKIM)"], ["Turkey", "Diyanet, Türkiye"], ["NorthAmerica", "ISNA, North America"], ["MoonsightingCommittee", "Moonsighting Committee"], ["Tehran", "Tehran"]];
  var PNAMES = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
  function cityLabel(cc, ci) { var co = CITIES[cc], c = co[6][ci]; return st.lang === "bn" ? c[1] + ", " + co[1] : st.lang === "ar" ? c[2] + "، " + co[3] : c[0] + ", " + co[2]; }
  function ptSettings() {
    var s = null; try { s = JSON.parse(h.ls("ibt_pt") || "null"); } catch (e) { }
    if (s && s.lat != null) return s;
    // default is always Uttara, Dhaka (IBT's home), never guessed from the device time zone
    var cc = 0; CITIES.forEach(function (co, i) { if (co[0] === "BD") cc = i; });
    return cityPick(cc, 0, null, "standard");
  }
  function cityPick(cc, ci, method, asr) {
    var co = CITIES[cc], c = co[6][ci];
    return { cc: cc, ci: ci, lat: c[3], lng: c[4], tz: c[5] || co[4], method: method || co[5], asr: asr || "standard", geo: false };
  }
  function saveSet(s) { h.ls("ibt_pt", JSON.stringify(s)); }
  function dateInTz(tz, add) {
    var d = new Date(Date.now() + (add || 0) * 864e5), parts = {};
    try { new Intl.DateTimeFormat("en-US", { timeZone: tz, year: "numeric", month: "numeric", day: "numeric" }).formatToParts(d).forEach(function (p) { parts[p.type] = p.value; }); } catch (e) { return d; }
    return new Date(+parts.year, +parts.month - 1, +parts.day);
  }
  function computeTimes(s, day) {
    var A = window.adhan; if (!A) return null;
    var params = (A.CalculationMethod[s.method] || A.CalculationMethod.MuslimWorldLeague)();
    params.madhab = s.asr === "hanafi" ? A.Madhab.Hanafi : A.Madhab.Shafi;
    if (Math.abs(s.lat) > 48) params.highLatitudeRule = A.HighLatitudeRule.recommended(new A.Coordinates(s.lat, s.lng));
    return new A.PrayerTimes(new A.Coordinates(s.lat, s.lng), dateInTz(s.tz, day || 0), params);
  }
  function fmtT(d, tz) { try { return new Intl.DateTimeFormat(h.LOC[st.lang], { hour: "numeric", minute: "2-digit", timeZone: tz }).format(d); } catch (e) { return d.toTimeString().slice(0, 5); } }
  function nextPrayer(s) {
    var now = new Date(), t0 = computeTimes(s, 0); if (!t0) return null;
    var order = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
    for (var i = 0; i < order.length; i++) if (t0[order[i]] > now) return { name: order[i], at: t0[order[i]], times: t0 };
    var t1 = computeTimes(s, 1); return { name: "fajr", at: t1.fajr, times: t0 };
  }
  function cd(ms) { var s = Math.max(0, Math.floor(ms / 1000)), hh = Math.floor(s / 3600), mm = Math.floor(s % 3600 / 60), ss = s % 60; return digits((hh ? hh + ":" : "") + String(mm).padStart(2, "0") + ":" + String(ss).padStart(2, "0")); }
  function ptLabel(s) { return s.geo ? Uraw("my_location") : cityLabel(s.cc, s.ci); }
  function loadAdhan() {
    if (window.adhan) return Promise.resolve();
    return new Promise(function (res, rej) { var sc = document.createElement("script"); sc.src = "assets/vendor/adhan.umd.min.js"; sc.onload = res; sc.onerror = rej; document.head.appendChild(sc); });
  }
  function homeStrip() {
    var el = $("#ptStrip"); if (!el) return;
    loadAdhan().then(function () {
      var s = ptSettings();
      every(1000, function () {
        if (!document.body.contains(el)) return;
        var n = nextPrayer(s); if (!n) return;
        $("[data-pt-next]", el).textContent = Uraw(n.name) + " · " + cd(n.at - new Date());
        $("[data-pt-loc]", el).textContent = ptLabel(s);
        var html = PNAMES.map(function (k) { return '<div class="' + (k === n.name ? "next" : "") + '"><span>' + U(k) + "</span><b>" + esc(fmtT(n.times[k], s.tz)) + "</b></div>"; }).join("");
        var tbox = $("[data-pt-times]", el); if (tbox.innerHTML !== html) tbox.innerHTML = html;
      });
    }, function () { el.style.display = "none"; });
  }
  P.prayer = function () {
    return h.pageHead(U("nav_prayer"), U("prayer_title"), U("prayer_note"), h.crumbs([[U("nav_prayer")]])) +
      '<section class="section tight" style="padding-top:0"><div class="wrap pt-layout"><div><div class="pt-next" id="ptNext"><div><small>' + U("next_prayer") + '</small><div class="nm" data-n>—</div><div class="loc" data-loc></div></div><div style="text-align:end"><small>' + U("in_time") + '</small><div class="cd" data-cd>—</div><div class="loc" data-hijri></div></div></div><div class="pt-list" id="ptList"></div>' +
      '<h2 class="h-section" style="margin-top:36px;font-size:1.4rem">' + L({ bn: "এই সপ্তাহ", en: "This week", ar: "هذا الأسبوع" }) + '</h2><div class="tbl-wrap"><table class="pt-week" id="ptWeek"></table></div></div>' +
      '<aside class="pt-set" id="ptSet"></aside></div></section>';
  };
  function prayerPage() {
    var box = $("#ptSet"); if (!box) return;
    loadAdhan().then(function () {
      var s = ptSettings();
      function setHtml() {
        var co = CITIES[s.cc] || CITIES[0];
        box.innerHTML = '<div class="field"><label>' + U("country") + '</label><select class="input" aria-label="' + esc(Uraw("country")) + '" data-pt="cc">' + CITIES.map(function (c, i) { return '<option value="' + i + '"' + (i === s.cc && !s.geo ? " selected" : "") + ">" + esc(st.lang === "bn" ? c[1] : st.lang === "ar" ? c[3] : c[2]) + "</option>"; }).join("") + "</select></div>" +
          '<div class="field"><label>' + U("city") + '</label><select class="input" aria-label="' + esc(Uraw("city")) + '" data-pt="ci">' + co[6].map(function (c, j) { return '<option value="' + j + '"' + (j === s.ci && !s.geo ? " selected" : "") + ">" + esc(st.lang === "bn" ? c[1] : st.lang === "ar" ? c[2] : c[0]) + "</option>"; }).join("") + "</select></div>" +
          '<button class="btn" data-pt-geo>' + icon("locate") + U("use_location") + "</button>" +
          '<div class="field"><label>' + U("calc_method") + '</label><select class="input" aria-label="' + esc(Uraw("calc_method")) + '" data-pt="method">' + METHODS.map(function (m) { return '<option value="' + m[0] + '"' + (m[0] === s.method ? " selected" : "") + ">" + esc(m[1]) + "</option>"; }).join("") + "</select></div>" +
          '<div class="field"><label>' + U("asr_method") + '</label><select class="input" aria-label="' + esc(Uraw("asr_method")) + '" data-pt="asr"><option value="standard"' + (s.asr !== "hanafi" ? " selected" : "") + ">" + esc(Uraw("asr_standard")) + '</option><option value="hanafi"' + (s.asr === "hanafi" ? " selected" : "") + ">" + esc(Uraw("asr_hanafi")) + "</option></select></div>" +
          '<p class="faint" style="margin:0">' + U("prayer_note") + "</p>";
      }
      function draw() {
        var n = nextPrayer(s); if (!n) return;
        var nx = $("#ptNext"); if (!nx) return;
        $("[data-n]", nx).textContent = Uraw(n.name); $("[data-cd]", nx).textContent = cd(n.at - new Date());
        $("[data-loc]", nx).textContent = ptLabel(s) + " · " + fmtT(n.at, s.tz);
        $("[data-hijri]", nx).textContent = h.hijri(new Date().toISOString().slice(0, 10));
        var now = new Date();
        var lh = PNAMES.map(function (k) { return '<div class="p ' + (k === n.name ? "next" : (n.times[k] < now && n.name !== "fajr" ? "past" : "")) + '"><span>' + U(k) + (k === "dhuhr" && dateInTz(s.tz).getDay() === 5 ? " / " + U("jumuah") : "") + "</span><b>" + esc(fmtT(n.times[k], s.tz)) + "</b></div>"; }).join("");
        var pl = $("#ptList"); if (pl.innerHTML !== lh) pl.innerHTML = lh;
      }
      function week() {
        var rows = "<tr><th></th>" + PNAMES.map(function (k) { return "<th>" + U(k) + "</th>"; }).join("") + "</tr>";
        for (var i = 0; i < 7; i++) {
          var t = computeTimes(s, i), d = dateInTz(s.tz, i);
          rows += '<tr class="' + (i === 0 ? "today" : "") + '"><td>' + esc(new Intl.DateTimeFormat(h.LOC[st.lang], { weekday: "short", day: "numeric", month: "short" }).format(d)) + "</td>" + PNAMES.map(function (k) { return "<td>" + esc(fmtT(t[k], s.tz)) + "</td>"; }).join("") + "</tr>";
        }
        $("#ptWeek").innerHTML = rows;
      }
      function apply() { saveSet(s); draw(); week(); }
      setHtml(); week(); every(1000, draw);
      box.addEventListener("change", function (e) {
        var k = e.target.dataset.pt; if (!k) return;
        if (k === "cc") { s = cityPick(+e.target.value, 0, null, s.asr); setHtml(); }
        else if (k === "ci") { s = cityPick(s.cc, +e.target.value, s.method, s.asr); }
        else s[k] = e.target.value;
        apply();
      });
      box.addEventListener("click", function (e) {
        if (!e.target.closest("[data-pt-geo]") || !navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(function (pos) {
          var tz = ""; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (er) { }
          s = { cc: s.cc, ci: s.ci, lat: +pos.coords.latitude.toFixed(4), lng: +pos.coords.longitude.toFixed(4), tz: tz || s.tz, method: s.method, asr: s.asr, geo: true };
          setHtml(); apply(); h.toast(Uraw("my_location"));
        }, function () { h.toast(Uraw("load_failed")); }, { timeout: 10000, maximumAge: 3600000 });
      });
    });
  }

  /* ================= Quran ================= */
  var QAPI = "https://api.quran.com/api/v4/";
  var RECITERS = [[7, "Mishari Rashid al-Afasy"], [3, "Abdur-Rahman as-Sudais"], [10, "Sa'ud ash-Shuraym"], [4, "Abu Bakr al-Shatri"], [2, "AbdulBaset AbdulSamad (Murattal)"], [1, "AbdulBaset AbdulSamad (Mujawwad)"], [9, "Mohamed Siddiq al-Minshawi (Murattal)"], [8, "Mohamed Siddiq al-Minshawi (Mujawwad)"], [6, "Mahmoud Khalil Al-Husary"], [12, "Mahmoud Khalil Al-Husary (Muallim)"], [5, "Hani ar-Rifai"], [11, "Mohamed al-Tablawi"]];
  var qcache = {};
  function qget(path) {
    if (qcache[path]) return qcache[path];
    qcache[path] = fetch(QAPI + path).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
    qcache[path].catch(function () { delete qcache[path]; });
    return qcache[path];
  }
  function qs() {
    var d = { mode: "surah", n: 1, reciter: 7, trBn: true, trEn: st.lang !== "bn", tafsir: st.lang === "en" ? 169 : 166, tafAll: false, size: 2 };
    try { var s = JSON.parse(h.ls("ibt_q") || "{}"); Object.keys(s).forEach(function (k) { d[k] = s[k]; }); } catch (e) { }
    return d;
  }
  function qsave(s) { h.ls("ibt_q", JSON.stringify(s)); }
  var ALLOW = { P: "p", BR: "br", B: "b", STRONG: "b", EM: "i", I: "i", H1: "h4", H2: "h4", H3: "h4", H4: "h4", UL: "ul", OL: "ol", LI: "li", SUP: "sup", BLOCKQUOTE: "blockquote" };
  function clean(html) {
    var doc = new DOMParser().parseFromString("<div>" + String(html || "") + "</div>", "text/html");
    function walk(n) {
      var out = "";
      n.childNodes.forEach(function (c) {
        if (c.nodeType === 3) out += esc(c.nodeValue);
        else if (c.nodeType === 1) {
          var tg = ALLOW[c.tagName], inner = walk(c);
          if (c.tagName === "SCRIPT" || c.tagName === "STYLE") return;
          out += tg ? (tg === "br" ? "<br>" : "<" + tg + ">" + inner + "</" + tg + ">") : inner;
        }
      });
      return out;
    }
    return walk(doc.body.firstChild);
  }
  function arNum(n) { return String(n).replace(/\d/g, function (d) { return "٠١٢٣٤٥٦٧٨٩"[d]; }); }
  var Q = { s: null, chapters: null, page: 0, totalPages: 1, loading: false, audio: null, audioMap: {}, playing: null, keys: [] };
  P.quran = function () {
    return h.pageHead(U("nav_quran"), U("quran_title"), "", h.crumbs([[U("nav_quran")]])) + '<section class="section tight" style="padding-top:0"><div class="wrap"><div class="q-top" id="qTop"><div class="spinner"></div></div><div id="qHead"></div><div class="ayahs" id="qBody"></div><div id="qMore"></div><div class="q-nav" id="qNav"></div><p class="faint q-src">' + U("quran_source") + '</p></div></section><div class="q-player" id="qPlayer"><button data-qp="prev" class="sec" aria-label="' + esc(Uraw("prev")) + '">' + icon("prev") + '</button><button data-qp="toggle" aria-label="' + esc(Uraw("play_all")) + '">' + icon("pause") + '</button><button data-qp="next" class="sec" aria-label="' + esc(Uraw("next")) + '">' + icon("next") + '</button><span class="t" data-qp-t></span><button data-qp="stop" class="sec" aria-label="' + esc(Uraw("close")) + '">' + icon("x") + "</button></div>";
  };
  function qInit() {
    var top = $("#qTop"); if (!top) return;
    Q.s = qs(); Q.audioMap = {}; Q.page = 0; Q.keys = [];
    document.documentElement.style.setProperty("--qsize", [1.6, 1.85, 2.1, 2.45, 2.8][Q.s.size] + "rem");
    qget("chapters?language=" + (st.lang === "bn" ? "bn" : st.lang === "ar" ? "ar" : "en")).then(function (d) {
      Q.chapters = d.chapters; drawTop(); loadPart(true);
    }, function () { top.innerHTML = '<div class="notice err">' + U("load_failed") + ' <button class="btn sm" data-q="retry">' + U("retry") + "</button></div>"; });
  }
  function drawTop() {
    var s = Q.s, top = $("#qTop");
    top.innerHTML = '<div><label>' + U("surah") + '</label><select class="input" aria-label="' + esc(Uraw("surah")) + '" data-q="surah">' + Q.chapters.map(function (c) { return '<option value="' + c.id + '"' + (s.mode === "surah" && c.id === s.n ? " selected" : "") + ">" + digits(c.id) + ". " + esc(c.name_simple) + " · " + esc(c.translated_name.name) + "</option>"; }).join("") + "</select></div>" +
      '<div><label>' + U("juz") + '</label><select class="input" aria-label="' + esc(Uraw("juz")) + '" data-q="juz"><option value="">—</option>' + Array.apply(null, Array(30)).map(function (_, i) { return '<option value="' + (i + 1) + '"' + (s.mode === "juz" && s.n === i + 1 ? " selected" : "") + ">" + U("juz") + " " + digits(i + 1) + "</option>"; }).join("") + "</select></div>" +
      '<div><label>' + U("reciter") + '</label><select class="input" aria-label="' + esc(Uraw("reciter")) + '" data-q="reciter">' + RECITERS.map(function (r) { return '<option value="' + r[0] + '"' + (r[0] === s.reciter ? " selected" : "") + ">" + esc(r[1]) + "</option>"; }).join("") + "</select></div>" +
      '<div><label>' + U("tafsir") + '</label><select class="input" aria-label="' + esc(Uraw("tafsir")) + '" data-q="tafsir"><option value="166"' + (s.tafsir === 166 ? " selected" : "") + ">" + esc(Uraw("tafsir_zakaria")) + '</option><option value="169"' + (s.tafsir === 169 ? " selected" : "") + ">" + esc(Uraw("tafsir_kathir")) + "</option></select></div>" +
      '<div class="q-acts"><button class="btn primary sm" data-q="play">' + icon("play") + U("play_all") + '</button><button class="toggle" data-q="trBn" aria-pressed="' + !!s.trBn + '">বাংলা</button><button class="toggle" data-q="trEn" aria-pressed="' + !!s.trEn + '">English</button><button class="toggle" data-q="tafAll" aria-pressed="' + !!s.tafAll + '">' + icon("doc") + U(s.tafAll ? "hide_tafsir" : "show_tafsir") + '</button><button class="toggle" data-q="size" aria-label="' + esc(Uraw("font_size")) + '" title="' + esc(Uraw("font_size")) + '">A<small>A</small></button></div>';
  }
  function loadPart(reset) {
    var s = Q.s; if (Q.loading) return; if (!reset && Q.page >= Q.totalPages) return;
    Q.loading = true;
    var body = $("#qBody"); if (!body) return;
    if (reset) {
      body.innerHTML = ""; Q.page = 0; Q.keys = []; $("#qHead").innerHTML = "";
      var ch = s.mode === "surah" ? Q.chapters[s.n - 1] : null;
      $("#qHead").innerHTML = ch ? '<div class="q-head"><div class="ar" lang="ar">' + esc(ch.name_arabic) + "</div><h2>" + esc(ch.name_simple) + " · " + esc(ch.translated_name.name) + "</h2><p>" + U(ch.revelation_place === "makkah" ? "makki" : "madani") + " · " + digits(ch.verses_count) + " " + U("ayah") + "</p>" + (ch.bismillah_pre ? '<div class="bism" lang="ar">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>' : "") + "</div>"
        : '<div class="q-head"><h2>' + U("juz") + " " + digits(s.n) + "</h2></div>";
      drawNav();
    }
    $("#qMore").innerHTML = '<div class="spinner"></div>';
    var path = (s.mode === "surah" ? "verses/by_chapter/" : "verses/by_juz/") + s.n + "?words=false&translations=213,20&fields=text_uthmani&per_page=50&page=" + (Q.page + 1);
    qget(path).then(function (d) {
      Q.page = d.pagination.current_page; Q.totalPages = d.pagination.total_pages;
      body.insertAdjacentHTML("beforeend", d.verses.map(ayahHtml).join(""));
      d.verses.forEach(function (v) { Q.keys.push(v.verse_key); });
      Q.loading = false;
      $("#qMore").innerHTML = Q.page < Q.totalPages ? '<div style="text-align:center;margin-top:16px"><button class="btn" data-q="more">' + U("load_more") + "</button></div>" : "";
      if (s.tafAll) $$(".ayah .tf[hidden]").forEach(function (t) { openTafsir(t.closest(".ayah")); });
      sentinel();
    }, function () { Q.loading = false; $("#qMore").innerHTML = '<div class="notice err">' + U("load_failed") + ' <button class="btn sm" data-q="more">' + U("retry") + "</button></div>"; });
  }
  function ayahHtml(v) {
    var s = Q.s, trs = {}; (v.translations || []).forEach(function (t) { trs[t.resource_id] = t.text; });
    var bn = trs[213] ? clean(String(trs[213]).replace(/<sup[^>]*>(.*?)<\/sup>/g, "<sup>$1</sup>")) : "", en = trs[20] ? clean(String(trs[20]).replace(/<sup[^>]*>.*?<\/sup>/g, "")) : "";
    return '<article class="ayah" id="v-' + esc(v.verse_key.replace(":", "-")) + '" data-key="' + esc(v.verse_key) + '"><div class="side"><span class="k">' + esc(v.verse_key) + '</span><button data-q="playone" aria-label="' + esc(Uraw("play_all")) + '">' + icon("play") + '</button><button data-copy="' + esc(v.text_uthmani + " (" + v.verse_key + ")") + '" aria-label="' + esc(Uraw("copy")) + '">' + icon("copy") + "</button></div><div>" +
      '<div class="ar" lang="ar" dir="rtl">' + esc(v.text_uthmani) + ' <span class="end">﴿' + arNum(v.verse_number) + "﴾</span></div>" +
      (bn ? '<p class="tr" lang="bn" data-tr="bn"' + (s.trBn ? "" : " hidden") + "><small>" + esc(Uraw("bn_zakaria")) + "</small>" + bn + "</p>" : "") +
      (en ? '<p class="tr" lang="en" dir="ltr" data-tr="en"' + (s.trEn ? "" : " hidden") + "><small>" + esc(Uraw("en_saheeh")) + "</small>" + en + "</p>" : "") +
      '<button class="tf-btn" data-q="tf">' + icon("doc") + U("tafsir") + '</button><div class="tf" hidden></div></div></article>';
  }
  function openTafsir(a, toggle) {
    if (!a) return; var box = $(".tf", a);
    if (toggle && !box.hidden) { box.hidden = true; return; }
    box.hidden = false;
    var id = Q.s.tafsir, key = a.dataset.key;
    if (box.dataset.loaded === key + ":" + id) return;
    box.innerHTML = '<div class="spinner" style="margin:6px auto"></div>';
    qget("tafsirs/" + id + "/by_ayah/" + key).then(function (d) {
      var txt = clean((d.tafsir || {}).text);
      box.setAttribute("lang", id === 166 ? "bn" : "en"); box.setAttribute("dir", "ltr");
      box.innerHTML = "<h4>" + esc(Uraw(id === 166 ? "tafsir_zakaria" : "tafsir_kathir")) + "</h4>" + (txt || '<p class="faint">—</p>'); box.dataset.loaded = key + ":" + id;
    }, function () { box.innerHTML = '<p class="faint">' + U("load_failed") + "</p>"; });
  }
  var qObs = null;
  function sentinel() {
    if (qObs) qObs.disconnect();
    var m = $("#qMore button[data-q=more]"); if (!m || !window.IntersectionObserver) return;
    qObs = new IntersectionObserver(function (es) { if (es[0].isIntersecting) loadPart(false); }, { rootMargin: "600px" }); qObs.observe(m);
  }
  function drawNav() {
    var s = Q.s, max = s.mode === "surah" ? 114 : 30, nav = $("#qNav"); if (!nav) return;
    nav.innerHTML = (s.n > 1 ? '<button class="btn" data-q="go" data-to="' + (s.n - 1) + '">' + icon("arrow", "flip-ltr") + U("prev") + "</button>" : "<span></span>") + (s.n < max ? '<button class="btn" data-q="go" data-to="' + (s.n + 1) + '">' + U("next") + ARROW + "</button>" : "");
  }
  function audioMap() {
    var s = Q.s, key = s.reciter + ":" + s.mode + ":" + s.n;
    if (Q.audioMap[key]) return Q.audioMap[key];
    var path = "recitations/" + s.reciter + "/" + (s.mode === "surah" ? "by_chapter/" : "by_juz/") + s.n + "?per_page=300";
    Q.audioMap[key] = qget(path).then(function (d) {
      var m = {}; (d.audio_files || []).forEach(function (a) { var u = a.url || ""; m[a.verse_key] = /^https?:|^\/\//.test(u) ? (u.indexOf("//") === 0 ? "https:" + u : u) : "https://verses.quran.com/" + u; });
      return m;
    });
    return Q.audioMap[key];
  }
  function qPlay(key) {
    audioMap().then(function (m) {
      if (!m[key]) return;
      if (!Q.audio) { Q.audio = new Audio(); Q.audio.preload = "auto"; Q.audio.addEventListener("ended", function () { var i = Q.keys.indexOf(Q.playing); if (i > -1 && i + 1 < Q.keys.length) qPlay(Q.keys[i + 1]); else if (Q.page < Q.totalPages) { loadPart(false); setTimeout(function () { var j = Q.keys.indexOf(Q.playing); if (j + 1 < Q.keys.length) qPlay(Q.keys[j + 1]); else qAudioStop(); }, 1500); } else qAudioStop(); }); }
      Q.playing = key; Q.audio.src = m[key]; Q.audio.play().catch(function () { });
      $$(".ayah.playing").forEach(function (a) { a.classList.remove("playing"); });
      var a = $("#v-" + key.replace(":", "-")); if (a) { a.classList.add("playing"); a.scrollIntoView({ behavior: "smooth", block: "center" }); }
      var pl = $("#qPlayer"); if (pl) { pl.classList.add("show"); document.body.classList.add("has-qplayer"); $("[data-qp-t]", pl).textContent = (RECITERS.filter(function (r) { return r[0] === Q.s.reciter; })[0] || [0, ""])[1] + " · " + key; $("[data-qp=toggle]", pl).innerHTML = icon("pause"); }
      var nx = Q.keys[Q.keys.indexOf(key) + 1]; if (nx && m[nx]) { var pre = new Audio(); pre.preload = "auto"; pre.src = m[nx]; }
    });
  }
  function qAudioStop() {
    if (Q.audio) { Q.audio.pause(); Q.audio.removeAttribute("src"); }
    Q.playing = null; $$(".ayah.playing").forEach(function (a) { a.classList.remove("playing"); });
    var pl = $("#qPlayer"); if (pl) pl.classList.remove("show"); document.body.classList.remove("has-qplayer");
  }
  document.addEventListener("change", function (e) {
    var q = e.target.closest("#qTop [data-q]"); if (!q) return;
    var s = Q.s, k = q.dataset.q, v = q.value;
    if (k === "surah") { s.mode = "surah"; s.n = +v; qAudioStop(); loadPart(true); drawTop(); }
    if (k === "juz" && v) { s.mode = "juz"; s.n = +v; qAudioStop(); loadPart(true); drawTop(); }
    if (k === "reciter") { s.reciter = +v; if (Q.playing) qPlay(Q.playing); }
    if (k === "tafsir") { s.tafsir = +v; $$(".ayah .tf").forEach(function (t) { if (!t.hidden) openTafsir(t.closest(".ayah")); else t.dataset.loaded = ""; }); }
    qsave(s); window.scrollTo({ top: 0 });
  });
  document.addEventListener("click", function (e) {
    var q = e.target.closest("[data-q]"), p = e.target.closest("[data-qp]");
    if (p && Q.s) {
      var a = p.dataset.qp, i = Q.keys.indexOf(Q.playing);
      if (a === "toggle" && Q.audio) { if (Q.audio.paused) { Q.audio.play(); p.innerHTML = icon("pause"); } else { Q.audio.pause(); p.innerHTML = icon("play"); } }
      if (a === "next" && i + 1 < Q.keys.length) qPlay(Q.keys[i + 1]);
      if (a === "prev" && i > 0) qPlay(Q.keys[i - 1]);
      if (a === "stop") qAudioStop();
      return;
    }
    if (!q || !Q.s || st.route !== "quran") return;
    var s = Q.s, k = q.dataset.q;
    if (k === "retry") qInit();
    if (k === "more") loadPart(false);
    if (k === "play") qPlay(Q.keys[0]);
    if (k === "playone") qPlay(q.closest(".ayah").dataset.key);
    if (k === "tf") openTafsir(q.closest(".ayah"), true);
    if (k === "trBn" || k === "trEn") { s[k] = !s[k]; q.setAttribute("aria-pressed", String(s[k])); $$('.ayah [data-tr="' + (k === "trBn" ? "bn" : "en") + '"]').forEach(function (t) { t.hidden = !s[k]; }); }
    if (k === "tafAll") { s.tafAll = !s.tafAll; drawTop(); $$(".ayah").forEach(function (a) { if (s.tafAll) openTafsir(a); else $(".tf", a).hidden = true; }); }
    if (k === "size") { s.size = (s.size + 1) % 5; document.documentElement.style.setProperty("--qsize", [1.6, 1.85, 2.1, 2.45, 2.8][s.size] + "rem"); }
    if (k === "go") { s.n = +q.dataset.to; qAudioStop(); loadPart(true); drawTop(); window.scrollTo({ top: 0 }); }
    qsave(s);
  });

  /* ================= hooks ================= */
  IBT.afterHooks = (IBT.afterHooks || []).concat([function (route) {
    if (route === "donate") drawWiz();
    if ($("#campusStage")) { var cs = $("#campusStage"); if ("IntersectionObserver" in window && st.route === "home") { var cio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { cio.disconnect(); mountCampus(); } }, { rootMargin: "400px" }); cio.observe(cs); } else mountCampus(); }
    if ($("#ptStrip")) homeStrip();
    if (route === "prayer") prayerPage();
    if (route === "quran") qInit();
  }]);
})();
