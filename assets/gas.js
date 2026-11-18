/* Apps Script backend adapter: when the site is hosted outside claude.ai (e.g. GitHub Pages)
   and window.IBT_CONFIG.api is set, this provides the same db / user / assets interface
   the site and admin panel use, backed by the IBT Website CMS Apps Script web app. */
(function () {
  "use strict";
  var cfg = window.IBT_CONFIG || {};
  if (!cfg.api || (window.claude && window.claude.use)) return;
  var API = cfg.api;
  var tokenKey = "ibt_gas_token", nameKey = "ibt_gas_name";
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) { return null; } }
  function token() { return ss(tokenKey); }
  function post(action, payload) {
    var body = Object.assign({}, payload || {}, { action: action, token: token() });
    return fetch(API, { method: "POST", body: JSON.stringify(body), redirect: "follow" }).then(function (r) { return r.json(); }).then(function (j) {
      if (!j.ok) { if (j.error === "auth") { ss(tokenKey, null); } var e = new Error(j.error || "error"); e.code = j.error; throw e; }
      return j;
    });
  }
  function snap(id, data) { return { id: id, exists: data !== undefined && data !== null, data: function () { return data == null ? undefined : JSON.parse(JSON.stringify(data)); }, metadata: { fromCache: false, hasPendingWrites: false } }; }
  function qsnap(docs) { var d = docs.map(function (x) { return snap(x.id, x.data); }); return { docs: d, size: d.length, empty: !d.length, docChanges: function () { return []; }, metadata: { fromCache: false } }; }
  var cmsListeners = [];
  function loadPublic() {
    return fetch(API + (API.indexOf("?") > -1 ? "&" : "?") + "action=content&t=" + Date.now()).then(function (r) { return r.json(); }).then(function (j) { if (!j.ok) throw new Error(j.error); return j.docs || []; });
  }
  function notifyCms() { loadPublic().then(function (docs) { cmsListeners.forEach(function (fn) { fn(qsnap(docs)); }); }); }
  var pendingSub = {};
  function docRef(path) {
    var seg = path.split("/"), col = seg[0];
    return {
      id: seg[seg.length - 1], path: path,
      get: function () {
        if (col === "submissions") return Promise.resolve(snap(seg[1], pendingSub[path] || null));
        return post("get", { path: path }).then(function (j) { return snap(seg[1], j.doc ? j.doc.data : null); });
      },
      set: function (data) {
        if (col === "submissions") { var it = (data.items || []).slice(-1)[0] || {}; return post("submit", { kind: it.kind, ref: it.ref, data: it.data, lang: it.lang }).then(function () { }); }
        return post("set", { path: path, data: data }).then(function () { if (col === "cms") notifyCms(); });
      },
      update: function (d) { return this.get().then(function (s) { return docRef(path).set(Object.assign(s.data() || {}, d)); }); },
      delete: function () { return post("delete", { path: path }).then(function () { if (col === "cms") notifyCms(); }); },
      onSnapshot: function (next) { this.get().then(next); return function () { }; }
    };
  }
  function colRef(col) {
    var q = {
      path: col,
      doc: function (id) { return docRef(col + "/" + (id || Math.random().toString(36).slice(2))); },
      where: function () { return q; }, orderBy: function () { return q; }, limit: function () { return q; },
      get: function () {
        if (col === "cms") return loadPublic().then(qsnap);
        if (col === "submissions") return post("inbox", {}).then(function (j) { return qsnap([{ id: "sheet", data: { items: j.items } }]); });
        return post("list", { collection: col }).then(function (j) { return qsnap(j.docs || []); });
      },
      onSnapshot: function (next, err) {
        if (col === "cms") { cmsListeners.push(next); loadPublic().then(function (d) { next(qsnap(d)); }, function (e) { err && err({ code: "unavailable", message: String(e) }); }); return function () { cmsListeners = cmsListeners.filter(function (f) { return f !== next; }); }; }
        q.get().then(next, function (e) { err && err({ code: "unavailable", message: String(e) }); }); return function () { };
      }
    };
    return q;
  }
  var db = { doc: docRef, collection: colRef };
  var user = {
    isOwner: function () { return !!token(); }, canEdit: function () { return !!token(); }, can: function () { return !!token(); },
    id: function () { return Promise.resolve(token() ? "gas:" + (ss(nameKey) || "editor") : "public"); },
    me: function () { return Promise.resolve({ id: token() ? "gas:" + (ss(nameKey) || "editor") : "public", name: ss(nameKey) || "" }); },
    profiles: function (ids) { var o = {}; ids.forEach(function (i) { o[i] = { name: String(i).replace(/^gas:/, "") }; }); return Promise.resolve(o); }
  };
  function b64(blob) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(String(r.result).split(",")[1]); }; r.onerror = rej; r.readAsDataURL(blob); }); }
  var assets = {
    upload: function (blob) { return b64(blob).then(function (data) { return post("upload", { base64: data, mime: blob.type, name: blob.name || "upload" }); }); },
    list: function () { return post("assets", {}).then(function (j) { return { assets: j.assets, usage: null }; }); },
    delete: function (id) { return post("deleteAsset", { id: id }); }
  };
  window.IBT_GAS = {
    api: API,
    login: function (name, password) { return post("login", { name: name, password: password }).then(function (j) { ss(tokenKey, j.token); ss(nameKey, j.name); return j; }); },
    logout: function () { ss(tokenKey, null); ss(nameKey, null); },
    loggedIn: function () { return !!token(); },
    assetUrl: function (id) { return "https://lh3.googleusercontent.com/d/" + id; }
  };
  window.claude = { use: function (n) { return Promise.resolve({ db: db, user: user, assets: assets }[n] || null); } };
})();
