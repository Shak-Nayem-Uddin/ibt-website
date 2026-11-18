/**
 * Imam Bukhari Trust: Website CMS backend (Google Apps Script web app)
 * ------------------------------------------------------------------
 * Storage
 *   - Drive folder "IBT Website CMS": one JSON file per document (cms__home.json, drafts__home.json, audit__2026-11-19.json ...)
 *   - Drive folder "IBT Website CMS/images": uploaded photos & PDFs (shared: anyone with link can view)
 *   - Google Sheet "IBT Website Inbox": every contact / registration / donation-report submission (one row each)
 * Security
 *   - Public:   GET content (published cms/* only), POST submit (rate-limited)
 *   - Admin:    everything else needs a token from POST {action:"login", password}
 *   - Password is stored hashed in Script Properties (set with setup() / setPassword()).
 * Deploy: Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone.
 */

var ROOT_NAME = "IBT Website CMS";
var TOKEN_HOURS = 12;

// ---------- one-time setup ----------
function setup() {
  var props = PropertiesService.getScriptProperties();
  var root = getOrCreateFolder_(ROOT_NAME, DriveApp.getRootFolder());
  var images = getOrCreateFolder_("images", root);
  props.setProperty("ROOT_ID", root.getId());
  props.setProperty("IMAGES_ID", images.getId());
  if (!props.getProperty("SHEET_ID")) {
    var ss = SpreadsheetApp.create("IBT Website Inbox");
    var sh = ss.getSheets()[0]; sh.setName("Inbox");
    sh.appendRow(["id", "time", "kind", "ref", "name", "phone", "email", "amount", "channel", "txn", "fund", "date", "message", "lang", "status", "raw"]);
    sh.setFrozenRows(1);
    DriveApp.getFileById(ss.getId()).moveTo(root);
    props.setProperty("SHEET_ID", ss.getId());
  }
  if (!props.getProperty("SECRET")) props.setProperty("SECRET", Utilities.getUuid() + Utilities.getUuid());
  if (!props.getProperty("PASS_HASH")) setPassword("IBT-change-me-2026");
  Logger.log("Setup complete. Folder: " + root.getUrl() + "  Inbox sheet: https://docs.google.com/spreadsheets/d/" + props.getProperty("SHEET_ID"));
}
/** Change the admin password: edit the text below, run setPassword once, then clear it. */
function setPassword(pw) {
  pw = pw || "PUT-NEW-PASSWORD-HERE";
  PropertiesService.getScriptProperties().setProperty("PASS_HASH", hash_(pw));
  Logger.log("Admin password updated.");
}

// ---------- HTTP ----------
function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    if (p.action === "content" || !p.action) return json_({ ok: true, docs: listDocs_("cms") });
    if (p.action === "ping") return json_({ ok: true, at: new Date().toISOString() });
    return json_({ ok: false, error: "unknown_action" });
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}

function doPost(e) {
  var body = {};
  try { body = JSON.parse(e.postData.contents || "{}"); } catch (x) { return json_({ ok: false, error: "bad_json" }); }
  try {
    switch (body.action) {
      case "login": return login_(body);
      case "submit": return submit_(body);
    }
    var who = checkToken_(body.token);
    if (!who) return json_({ ok: false, error: "auth" });
    switch (body.action) {
      case "get": return json_({ ok: true, doc: readDoc_(body.path) });
      case "list": return json_({ ok: true, docs: listDocs_(body.collection) });
      case "set": guardPath_(body.path); writeDoc_(body.path, body.data); return json_({ ok: true });
      case "delete": guardPath_(body.path); deleteDoc_(body.path); return json_({ ok: true });
      case "inbox": return json_({ ok: true, items: inbox_() });
      case "upload": return json_(upload_(body));
      case "assets": return json_({ ok: true, assets: listAssets_() });
      case "deleteAsset": DriveApp.getFileById(body.id).setTrashed(true); return json_({ ok: true });
    }
    return json_({ ok: false, error: "unknown_action" });
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}

// ---------- auth ----------
function login_(b) {
  var cache = CacheService.getScriptCache(), k = "fails";
  var fails = +(cache.get(k) || 0);
  if (fails > 20) return json_({ ok: false, error: "locked_try_later" });
  if (hash_(String(b.password || "")) !== PropertiesService.getScriptProperties().getProperty("PASS_HASH")) {
    cache.put(k, String(fails + 1), 900); Utilities.sleep(800);
    return json_({ ok: false, error: "wrong_password" });
  }
  var exp = Date.now() + TOKEN_HOURS * 3600 * 1000;
  var name = String(b.name || "Editor").slice(0, 60);
  var payload = exp + "|" + Utilities.base64EncodeWebSafe(name);
  return json_({ ok: true, token: payload + "|" + sign_(payload), name: name, expires: exp });
}
function checkToken_(t) {
  if (!t) return null; var parts = String(t).split("|"); if (parts.length !== 3) return null;
  var payload = parts[0] + "|" + parts[1];
  if (sign_(payload) !== parts[2] || +parts[0] < Date.now()) return null;
  return Utilities.newBlob(Utilities.base64DecodeWebSafe(parts[1])).getDataAsString();
}
function sign_(s) { return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(s, PropertiesService.getScriptProperties().getProperty("SECRET"))); }
function hash_(s) { return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, "ibt:" + s)); }

// ---------- document store (Drive JSON files) ----------
var ALLOWED = /^(cms|drafts|audit|inboxstate)\/[A-Za-z0-9._:@+~-]+$/;
function guardPath_(p) { if (!ALLOWED.test(String(p))) throw new Error("bad_path"); }
function fname_(path) { return String(path).replace(/\//g, "__") + ".json"; }
function root_() { return DriveApp.getFolderById(PropertiesService.getScriptProperties().getProperty("ROOT_ID")); }
function findFile_(path) { var it = root_().getFilesByName(fname_(path)); return it.hasNext() ? it.next() : null; }
function readDoc_(path) {
  guardPath_(path); var f = findFile_(path);
  return f ? { id: String(path).split("/").pop(), data: JSON.parse(f.getBlob().getDataAsString()) } : null;
}
function writeDoc_(path, data) {
  var f = findFile_(path), text = JSON.stringify(data);
  if (text.length > 900000) throw new Error("too_large");
  if (f) f.setContent(text); else root_().createFile(fname_(path), text, "application/json");
  CacheService.getScriptCache().remove("list:" + String(path).split("/")[0]);
}
function deleteDoc_(path) { var f = findFile_(path); if (f) f.setTrashed(true); CacheService.getScriptCache().remove("list:" + String(path).split("/")[0]); }
function listDocs_(col) {
  if (!/^(cms|drafts|audit|inboxstate)$/.test(col)) throw new Error("bad_collection");
  var cache = CacheService.getScriptCache(), ck = "list:" + col, hit = cache.get(ck);
  if (hit) return JSON.parse(hit);
  var out = [], it = root_().searchFiles('title contains "' + col + '__" and trashed = false');
  while (it.hasNext()) {
    var f = it.next(), n = f.getName(); if (n.indexOf(col + "__") !== 0) continue;
    out.push({ id: n.slice(col.length + 2).replace(/\.json$/, ""), data: JSON.parse(f.getBlob().getDataAsString()) });
  }
  var s = JSON.stringify(out); if (s.length < 95000) cache.put(ck, s, 60);
  return out;
}

// ---------- submissions → Google Sheet ----------
function submit_(b) {
  var cache = CacheService.getScriptCache(), n = +(cache.get("sub_rate") || 0);
  if (n > 120) return json_({ ok: false, error: "rate_limited" });
  cache.put("sub_rate", String(n + 1), 600);
  var d = b.data || {}; function v(k) { return String(d[k] == null ? "" : d[k]).slice(0, 2000); }
  var id = Utilities.getUuid().slice(0, 8);
  var sh = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("SHEET_ID")).getSheetByName("Inbox");
  sh.appendRow([id, new Date(), String(b.kind || "").slice(0, 30), String(b.ref || "").slice(0, 80), v("name"), v("phone"), v("email"), v("amount"), v("channel"), v("txn"), v("fund"), v("date"), v("message"), String(b.lang || ""), "new", JSON.stringify(d).slice(0, 4000)]);
  return json_({ ok: true, id: id });
}
function inbox_() {
  var sh = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("SHEET_ID")).getSheetByName("Inbox");
  var rows = sh.getDataRange().getValues(); rows.shift();
  return rows.slice(-1000).map(function (r) {
    var data = {}; try { data = JSON.parse(r[15] || "{}"); } catch (x) { }
    return { id: String(r[0]), at: new Date(r[1]).toISOString(), kind: r[2], ref: r[3], data: data, lang: r[13], status: r[14] };
  });
}

// ---------- uploads → Drive ----------
function upload_(b) {
  var bytes = Utilities.base64Decode(b.base64);
  if (bytes.length > 20 * 1024 * 1024) return { ok: false, error: "too_large" };
  var folder = DriveApp.getFolderById(PropertiesService.getScriptProperties().getProperty("IMAGES_ID"));
  var f = folder.createFile(Utilities.newBlob(bytes, b.mime || "application/octet-stream", String(b.name || "upload").slice(0, 120)));
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return { ok: true, id: f.getId(), url: assetUrl_(f), contentType: f.getMimeType(), sizeBytes: bytes.length };
}
function listAssets_() {
  var out = [], it = DriveApp.getFolderById(PropertiesService.getScriptProperties().getProperty("IMAGES_ID")).getFiles();
  while (it.hasNext() && out.length < 500) { var f = it.next(); if (!f.isTrashed()) out.push({ id: f.getId(), url: assetUrl_(f), contentType: f.getMimeType(), sizeBytes: f.getSize() }); }
  return out;
}
function assetUrl_(f) { return /^image\//.test(f.getMimeType()) ? "https://lh3.googleusercontent.com/d/" + f.getId() : "https://drive.google.com/file/d/" + f.getId() + "/view"; }

// ---------- helpers ----------
function getOrCreateFolder_(name, parent) { var it = parent.getFoldersByName(name); return it.hasNext() ? it.next() : parent.createFolder(name); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
