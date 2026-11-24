/* Admin CMS interface translation (Bangla → English).
   The admin UI is written in Bangla; when the site language is not Bangla,
   every visible admin string is swapped for its English version.
   Text typed into fields (inputs, textareas, JSON editors) is never touched. */
(function () {
  var IBT = window.IBT; if (!IBT) return;
  var BN = /[ঀ-৿]/;
  var D = window.IBT_ADMIN_EN || {}, MON = window.IBT_ADMIN_MON || {};
  var CM = null, CMsrc = null;

  function on() { return IBT.state && IBT.state.lang !== "bn"; }
  function latin(s) { return s.replace(/[০-৯]/g, function (d) { return "০১২৩৪৫৬৭৮৯".indexOf(d); }); }

  // bn → en map from the site content itself (institution names, item titles …)
  function contentMap() {
    var c = IBT.C; if (CM && CMsrc === c) return CM;
    CM = {}; CMsrc = c; var seen = 0;
    (function walk(o, d) {
      if (!o || typeof o !== "object" || d > 12 || seen > 60000) return; seen++;
      if (typeof o.bn === "string" && typeof o.en === "string" && o.en && BN.test(o.bn) && o.bn.length < 400) CM[o.bn.trim()] = o.en;
      for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k) && o[k] && typeof o[k] === "object") walk(o[k], d + 1);
    })(c, 0);
    return CM;
  }

  var RULES = [
    [/^“([\s\S]+)” প্রকাশ করবেন\? সবাই পরিবর্তন দেখতে পাবে।$/, function (m) { return "Publish “" + tx(m[1]) + "”? Everyone will see the changes."; }],
    [/^([০-৯\d]+)টি অংশ ড্রাফট হিসেবে ইমপোর্ট হয়েছে$/, function (m) { return latin(m[1]) + " sections imported as drafts"; }],
    [/^ব্যবহৃত: ([\s\S]*)$/, function (m) { return "Used: " + latin(m[1]); }],
    [/^ব্যর্থ: ([\s\S]*)$/, function (m) { return "Failed: " + tx(m[1]); }],
    [/^লগইন ব্যর্থ: ([\s\S]*)$/, function (m) { return "Login failed: " + tx(m[1]); }],
    [/^JSON ভুল: ([\s\S]*)$/, function (m) { return "JSON error: " + m[1]; }]
  ];

  function core(s) {
    if (Object.prototype.hasOwnProperty.call(D, s)) return D[s];
    var cm = contentMap(); if (Object.prototype.hasOwnProperty.call(cm, s)) return cm[s];
    for (var i = 0; i < RULES.length; i++) { var m = s.match(RULES[i][0]); if (m) return RULES[i][1](m); }
    var j = s.indexOf(": ");
    if (j > 0) { var a = s.slice(0, j), b = s.slice(j + 2); if (BN.test(a) && (D[a] || cm[a])) return core(a) + ": " + (BN.test(b) ? core(b) : b); }
    var k = s.indexOf(" · ");
    if (k > 0) return s.split(" · ").map(function (p) { return BN.test(p) ? core(p) : p; }).join(" · ");
    var t = s;
    for (var mo in MON) if (t.indexOf(mo) >= 0) t = t.split(mo).join(MON[mo]);
    return latin(t);
  }
  function tx(s) {
    if (!s || !BN.test(s)) return s;
    var m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    return m[1] + core(m[2]) + m[3];
  }
  IBT.adminTx = function (s) { return on() ? tx(s) : s; };

  var SKIP = "textarea,script,style,[contenteditable],[data-noi18n],.a-json";
  function apply(root) {
    if (!on() || !root) return;
    if (root.nodeType === 3) { fixText(root); return; }
    if (root.nodeType !== 1) return;
    if (root.closest && root.closest(SKIP)) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(fixText);
    var els = [root].concat([].slice.call(root.querySelectorAll("[placeholder],[title],[aria-label],optgroup[label],input[type=button],input[type=submit]")));
    els.forEach(function (el) {
      if (!el.getAttribute) return;
      ["placeholder", "title", "aria-label", "label"].forEach(function (a) { var v = el.getAttribute(a); if (v && BN.test(v)) el.setAttribute(a, tx(v)); });
      if ((el.type === "button" || el.type === "submit") && el.tagName === "INPUT" && BN.test(el.value)) el.value = tx(el.value);
    });
  }
  function fixText(n) {
    var v = n.nodeValue; if (!v || !BN.test(v)) return;
    var p = n.parentNode; if (!p || (p.closest && p.closest(SKIP))) return;
    var t = tx(v); if (t !== v) n.nodeValue = t;
  }

  // translate admin toasts
  var toast0 = IBT.toast;
  if (toast0) IBT.toast = function (m) { var a = [].slice.call(arguments); if (on() && IBT.state.route === "admin" && typeof m === "string") a[0] = tx(m); return toast0.apply(this, a); };

  // watch the admin view: everything admin.js writes is translated as it appears
  var mo = null;
  function watch() {
    var root = document.getElementById("adminRoot");
    if (mo) { mo.disconnect(); mo = null; }
    if (!root || !window.MutationObserver) return;
    apply(root);
    mo = new MutationObserver(function (ms) {
      if (!on()) return;
      ms.forEach(function (m) {
        if (m.type === "characterData") fixText(m.target);
        else if (m.type === "attributes") apply(m.target);
        else [].forEach.call(m.addedNodes, apply);
      });
    });
    mo.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "title", "aria-label", "label"] });
  }
  (IBT.afterHooks = IBT.afterHooks || []).push(function () { if (IBT.state.route === "admin") setTimeout(watch, 0); else if (mo) { mo.disconnect(); mo = null; } });
})();
