/* GitHub backend for the admin panel (no server needed).
   Editors sign in with a GitHub fine-grained token that can write to this repository.
   Published content, drafts and the audit log live in data/cms.json; uploads go to img/uploads/.
   Visitors only read data/cms.json. Used when no Apps Script URL is configured. */
(function () {
  "use strict";
  var cfg = window.IBT_CONFIG || {};
  if (cfg.api || (window.claude && window.claude.use)) return;
  var gh = cfg.github || {};
  var m = location.hostname.match(/^([^.]+)\.github\.io$/);
  var OWNER = gh.owner || (m ? m[1] : ""), REPO = gh.repo || (location.pathname.split("/")[1] || ""), BRANCH = gh.branch || "main";
  if (!OWNER || !REPO) { OWNER = "Shak-Nayem-Uddin"; REPO = "ibt-website"; }
  var FILE = "data/cms.json", RAW = "https://raw.githubusercontent.com/" + (gh.owner || OWNER) + "/" + (gh.repo || REPO) + "/" + BRANCH + "/", API = "https://api.github.com/repos/" + OWNER + "/" + REPO;
  var TK = "ibt_gh_token", NK = "ibt_gh_login";
  function store(k, v, keep) {
    try {
      if (v === undefined) return sessionStorage.getItem(k) || localStorage.getItem(k);
      sessionStorage.removeItem(k); localStorage.removeItem(k);
      if (v !== null) (keep ? localStorage : sessionStorage).setItem(k, v);
    } catch (e) { return null; }
  }
  function token() { return store(TK); }
  function api(path, opt) {
    opt = opt || {};
    var h = { Accept: opt.raw ? "application/vnd.github.raw+json" : "application/vnd.github+json" }; if (token()) h.Authorization = "Bearer " + token();
    if (opt.body) h["Content-Type"] = "application/json";
    return fetch(path.indexOf("http") === 0 ? path : API + path, { method: opt.method || "GET", headers: h, body: opt.body ? JSON.stringify(opt.body) : undefined, cache: "no-store" }).then(function (r) {
      if (r.status === 401) { store(TK, null); }
      if (opt.raw && r.ok) return r.text();
      return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) { var e = new Error(j.message || ("HTTP " + r.status)); e.status = r.status; e.code = codeOf(r.status, j.message || ""); throw e; } return j; });
    }, function () { var e = new Error("network"); e.code = "network"; throw e; });
  }
  // turn GitHub errors into codes the admin panel can explain in plain words
  function codeOf(st, msg) {
    if (st === 401) return "token-invalid";
    if (st === 403 && /not accessible by (personal access|integration)/i.test(msg)) return "no-write";
    if (st === 403 && /rate limit/i.test(msg)) return "rate-limit";
    if (st === 403) return "forbidden";
    if (st === 404) return "not-found";
    if (st === 409 || (st === 422 && /sha/i.test(msg))) return "conflict";
    if (st === 422) return "invalid";
    if (st >= 500) return "github-down";
    return "http-" + st;
  }
  function b64enc(str) { var b = new TextEncoder().encode(str), s = ""; for (var i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000)); return btoa(s); }
  function b64dec(b64) { var bin = atob(String(b64).replace(/\s/g, "")), u = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return new TextDecoder().decode(u); }
  var EMPTY = function () { return { cms: {}, drafts: {}, audit: {}, inboxstate: {} }; };
  function norm(doc) { doc = doc && typeof doc === "object" ? doc : EMPTY(); ["cms", "drafts", "audit", "inboxstate"].forEach(function (k) { if (!doc[k] || typeof doc[k] !== "object" || Array.isArray(doc[k])) doc[k] = {}; }); return doc; }

  // ---- read ----
  var cache = null, sha = null, mine = null; // mine: {sha, prev, doc, at} of our own last write
  function readPublic() {
    return fetch(FILE + "?t=" + Math.floor(Date.now() / 60000), { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : EMPTY(); }, function () { return EMPTY(); });
  }
  function readLive() {
    if (!token()) return readPublic().then(function (j) { cache = j; return j; });
    return api("/contents/" + FILE + "?ref=" + BRANCH).then(function (j) {
      // GitHub can answer with the copy from before our own write for a short while: keep ours
      if (mine && j.sha !== mine.sha && j.sha === mine.prev && Date.now() - mine.at < 180000) { sha = mine.sha; cache = JSON.parse(JSON.stringify(mine.doc)); return cache; }
      sha = j.sha;
      // files over 1 MB come without inline content
      var body = j.content && j.encoding === "base64" ? Promise.resolve(b64dec(j.content)) : api("/contents/" + FILE + "?ref=" + BRANCH, { raw: true });
      return body.then(function (txt) { cache = norm(JSON.parse(txt || "{}")); return cache; });
    }, function (e) { if (e.status === 404) { sha = null; cache = EMPTY(); return cache; } throw e; });
  }
  // ---- write (serialised; always re-reads so concurrent editors don't overwrite each other) ----
  var q = Promise.resolve();
  function mutate(fn, msg) {
    var attempt = function (n) {
      return readLive().then(function (doc) {
        doc = norm(doc);
        fn(doc);
        // keep the audit log to the last 90 days
        var days = Object.keys(doc.audit).sort(); while (days.length > 90) delete doc.audit[days.shift()];
        var prev = sha;
        return api("/contents/" + FILE, { method: "PUT", body: { message: "CMS: " + (msg || "update") + " (" + (store(NK) || "editor") + ")", content: b64enc(JSON.stringify(doc, null, 1)), sha: sha || undefined, branch: BRANCH } })
          .then(function (r) { sha = r.content && r.content.sha; cache = doc; mine = { sha: sha, prev: prev, doc: JSON.parse(JSON.stringify(doc)), at: Date.now() }; return doc; });
      }).catch(function (e) {
        // someone else (or a slow GitHub cache) changed the file in between: read again and retry
        if (e.code === "conflict" && n < 4) { mine = null; return new Promise(function (r) { setTimeout(r, 1200 * (n + 1)); }).then(function () { return attempt(n + 1); }); }
        throw e;
      });
    };
    var run = function () { return attempt(0); };
    q = q.then(run, run);
    return q;
  }

  function snap(id, data) { return { id: id, exists: data !== undefined && data !== null, data: function () { return data == null ? undefined : JSON.parse(JSON.stringify(data)); }, metadata: { fromCache: false, hasPendingWrites: false } }; }
  function qsnap(obj) { var d = Object.keys(obj || {}).map(function (k) { return snap(k, obj[k]); }); return { docs: d, size: d.length, empty: !d.length, docChanges: function () { return []; }, metadata: { fromCache: false } }; }
  var listeners = [];
  function notify(doc) { listeners.forEach(function (fn) { fn(qsnap(doc.cms)); }); }
  function docRef(path) {
    var seg = path.split("/"), col = seg[0], id = seg.slice(1).join("/");
    return {
      id: id, path: path,
      get: function () { if (col === "submissions") return Promise.resolve(snap(id, null)); return readLive().then(function (d) { return snap(id, ((d || {})[col] || {})[id]); }); },
      set: function (data) {
        if (col === "submissions") return Promise.reject(new Error("no-public-inbox"));
        return mutate(function (d) { d[col] = d[col] || {}; d[col][id] = data; }, col + "/" + id).then(function (d) { if (col === "cms") notify(d); });
      },
      update: function (part) { return mutate(function (d) { d[col] = d[col] || {}; d[col][id] = Object.assign(d[col][id] || {}, part); }, col + "/" + id).then(function (d) { if (col === "cms") notify(d); }); },
      delete: function () { return mutate(function (d) { if (d[col]) delete d[col][id]; }, "delete " + col + "/" + id).then(function (d) { if (col === "cms") notify(d); }); },
      onSnapshot: function (next) { this.get().then(next); return function () { }; }
    };
  }
  function colRef(col) {
    var c = {
      path: col,
      doc: function (id) { return docRef(col + "/" + (id || Date.now().toString(36))); },
      where: function () { return c; }, orderBy: function () { return c; }, limit: function () { return c; },
      get: function () { if (col === "submissions") return Promise.resolve(qsnap({})); return readLive().then(function (d) { return qsnap((d || {})[col]); }); },
      onSnapshot: function (next, err) {
        if (col === "cms") listeners.push(next);
        (col === "cms" && !token() ? readPublic() : readLive()).then(function (d) { next(qsnap((d || {})[col])); }, function (e) { err && err({ code: "unavailable", message: String(e) }); });
        return function () { listeners = listeners.filter(function (f) { return f !== next; }); };
      }
    };
    return c;
  }
  // several changes in one commit: fn receives {cms, drafts, audit, inboxstate}
  function tx(fn, msg) { return mutate(fn, msg).then(function (d) { notify(d); return d; }); }
  var db = { doc: docRef, collection: colRef, tx: tx };
  var user = {
    isOwner: function () { return !!token(); }, canEdit: function () { return !!token(); }, can: function () { return !!token(); },
    id: function () { return Promise.resolve(token() ? "gh:" + (store(NK) || "editor") : "public"); },
    me: function () { return Promise.resolve({ id: token() ? "gh:" + (store(NK) || "editor") : "public", name: store(NK) || "" }); },
    profiles: function (ids) { var o = {}; ids.forEach(function (i) { o[i] = { name: String(i).replace(/^gh:/, "") }; }); return Promise.resolve(o); }
  };
  function blobB64(blob) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(String(r.result).split(",")[1]); }; r.onerror = rej; r.readAsDataURL(blob); }); }
  var assets = {
    upload: function (blob) {
      var name = (blob.name || "upload").toLowerCase().replace(/[^a-z0-9.\-_]+/g, "-").replace(/-+/g, "-").slice(-60);
      var path = "img/uploads/" + new Date().toISOString().slice(0, 10) + "-" + Math.random().toString(36).slice(2, 6) + "-" + name;
      return blobB64(blob).then(function (b) { return api("/contents/" + path, { method: "PUT", body: { message: "CMS upload: " + name + " (" + (store(NK) || "editor") + ")", content: b, branch: BRANCH } }); })
        .then(function () { return { id: "gh/" + path, url: RAW + path, name: name, contentType: blob.type || "" }; });
    },
    list: function () {
      return api("/contents/img/uploads?ref=" + BRANCH).then(function (arr) {
        return { assets: (arr || []).filter(function (f) { return f.type === "file"; }).map(function (f) { var ct = /\.(png|jpe?g|webp|gif|svg)$/i.test(f.name) ? "image/" + f.name.split(".").pop().toLowerCase().replace("jpg", "jpeg") : /\.pdf$/i.test(f.name) ? "application/pdf" : ""; return { id: "gh/" + f.path, url: RAW + f.path, name: f.name, size: f.size, sha: f.sha, mime: ct, contentType: ct }; }).reverse(), usage: null };
      }, function (e) { if (e.status === 404) return { assets: [], usage: null }; throw e; });
    },
    delete: function (id) {
      var path = String(id).replace(/^gh\//, "");
      return api("/contents/" + path + "?ref=" + BRANCH).then(function (f) { return api("/contents/" + path, { method: "DELETE", body: { message: "CMS delete: " + path, sha: f.sha, branch: BRANCH } }); });
    }
  };
  // can this token write to the repository? (creates an unused blob object only: no commit, nothing visible)
  function writeCheck() {
    return api("/git/blobs", { method: "POST", body: { content: "ibt-cms write check", encoding: "utf-8" } }).then(function () { return true; }, function (e) { if (e.code === "no-write" || e.code === "forbidden" || e.code === "not-found") return false; throw e; });
  }
  window.IBT_GH = {
    check: function () { return writeCheck(); },
    owner: OWNER, repo: REPO, branch: BRANCH,
    login: function (tok, keep) {
      store(TK, tok.trim(), keep);
      return api("").then(function (r) {
        if (!r.permissions || !(r.permissions.push || r.permissions.admin || r.permissions.maintain)) throw new Error("no-write");
        return writeCheck().then(function (ok) { if (!ok) { var e = new Error("no-write"); e.code = "no-write"; throw e; } });
      }).then(function () {
        return api("https://api.github.com/user").then(function (u) { store(NK, u.login, keep); return u; }, function () { store(NK, "editor", keep); return {}; });
      }).catch(function (e) { store(TK, null); throw e; });
    },
    logout: function () { store(TK, null); store(NK, null); },
    loggedIn: function () { return !!token(); },
    login_name: function () { return store(NK) || ""; },
    assetUrl: function (id) { return String(id).replace(/^gh\//, ""); }
  };
  window.claude = { use: function (n) { return Promise.resolve({ db: db, user: user, assets: assets }[n] || null); } };
})();
