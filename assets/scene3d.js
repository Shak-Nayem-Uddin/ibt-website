/* IBT 3D campus (Three.js r128, loaded on demand) laid out from the IBT master plan (New Dhaka City).
   Realistic model: cast floors appear as a bare concrete frame, floors still to come as a glass outline
   of the design, proposed buildings as finished facades; roads, trees and the neighbourhood around.
   Window lights come on in the dark theme. Exposes window.IBT3D. */
(function () {
  "use strict";
  var loading = null;
  function webglOK() { try { var c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch (e) { return false; } }
  function lowEnd() { var n = navigator; return !!(n.connection && n.connection.saveData) || (n.deviceMemory || 4) <= 1; }
  function load() {
    if (window.THREE) return Promise.resolve(window.THREE);
    if (loading) return loading;
    loading = new Promise(function (res, rej) {
      var s = document.createElement("script"); s.src = "assets/vendor/three.min.js"; s.async = true;
      s.onload = function () { res(window.THREE); }; s.onerror = function () { loading = null; rej(new Error("three")); };
      document.head.appendChild(s);
    });
    return loading;
  }
  var COLORS = { "masjid-complex": "#235347", "academic-1": "#163832", "academic-2": "#4C7A66", "academic-3": "#5E8B76", "taibah-tower": "#0B2B26" };
  var PAL = {
    light: { grass: 0x95b37f, lawn: 0xa9c793, soil: 0xa48d6c, road: 0x4a5150, walk: 0xd9dcd6, plaster: 0xf1efe9, ctxTint: 0xe6e3dc, concrete: 0x9ea49f, ghost: 0xe6f3fb, ghostOp: 0.32, ghostEdge: 0x235347, ghostEdgeOp: 0.7, dome: 0xe9efe9, tree: [0x5f8a4c, 0x6f9a55, 0x557d45], trunk: 0x6b5440, hemiSky: 0xeef7f0, hemiGround: 0x6f7f62, hemiI: 0.85, sun: 0xfff1d8, sunI: 1.25, night: 0, exposure: 1.05, sel: 0x8EB69B },
    dark: { grass: 0x1d3a2c, lawn: 0x24463a, soil: 0x3d3529, road: 0x1c2321, walk: 0x39433f, plaster: 0x8d9a93, ctxTint: 0x6d7a73, concrete: 0x6e7470, ghost: 0xDAF1DE, ghostOp: 0.12, ghostEdge: 0x8EB69B, ghostEdgeOp: 0.85, dome: 0x9db7a6, tree: [0x1f4232, 0x264b38, 0x1b3a2c], trunk: 0x2e261e, hemiSky: 0x9fc4ae, hemiGround: 0x051F20, hemiI: 0.55, sun: 0xcfe3ff, sunI: 0.42, night: 1, exposure: 1.15, sel: 0xDAF1DE }
  };
  /* facade atlas: top band = roof, lower 72% = one storey with 4 window bays (night copy lights some windows) */
  function facadeTex(THREE, night) {
    var c = document.createElement("canvas"); c.width = 512; c.height = 256; var g = c.getContext("2d");
    g.fillStyle = night ? "#000" : "#c9cec9"; g.fillRect(0, 0, 512, 72);
    if (!night) { for (var k = 0; k < 220; k++) { g.fillStyle = "rgba(0,0,0," + (Math.random() * 0.06) + ")"; g.fillRect(Math.random() * 512, Math.random() * 70, 3, 3); } }
    var top = 72, hh = 184;
    g.fillStyle = night ? "#000" : "#f4f2ec"; g.fillRect(0, top, 512, hh);
    if (!night) { g.fillStyle = "#d7d6cf"; g.fillRect(0, top + hh - 16, 512, 16); g.fillStyle = "#e9e7e0"; g.fillRect(0, top, 512, 6); }
    var lit = [1, 0, 1, 1];
    for (var b = 0; b < 4; b++) {
      var x = b * 128 + 18, y = top + 30, w = 92, h = 112;
      if (night) { g.fillStyle = lit[b] ? (b === 2 ? "#ffe7b0" : "#e9f7ec") : "#000"; g.fillRect(x + 4, y + 4, w - 8, h - 8); continue; }
      g.fillStyle = "#59615d"; g.fillRect(x - 3, y - 3, w + 6, h + 6);
      var gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, "#5f7f86"); gr.addColorStop(0.55, "#2f4a50"); gr.addColorStop(1, "#22383d");
      g.fillStyle = gr; g.fillRect(x, y, w, h);
      g.fillStyle = "rgba(255,255,255,.18)"; g.beginPath(); g.moveTo(x, y + h * 0.55); g.lineTo(x + w * 0.5, y); g.lineTo(x + w * 0.7, y); g.lineTo(x, y + h * 0.85); g.fill();
      g.fillStyle = "#59615d"; g.fillRect(x + w / 2 - 2, y, 4, h); g.fillRect(x, y + h * 0.38, w, 3);
      g.fillStyle = "#cfcdc5"; g.fillRect(x - 8, y + h + 3, w + 16, 6);
    }
    var t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.ClampToEdgeWrapping; t.anisotropy = 4; if (!night) t.encoding = THREE.sRGBEncoding; return t;
  }
  /* boxes merged into one geometry; sides map one storey of the atlas, tops map the roof band */
  function Boxes() { this.p = []; this.n = []; this.u = []; this.i = []; }
  Boxes.prototype.add = function (x, y, z, w, h, d, bay) {
    var P = this.p, N = this.n, Uv = this.u, I = this.i, hw = w / 2, hd = d / 2, B = bay || 1.25;
    var faces = [[[1, 0, 0], [[hw, 0, hd], [hw, 0, -hd], [hw, h, -hd], [hw, h, hd]], d], [[-1, 0, 0], [[-hw, 0, -hd], [-hw, 0, hd], [-hw, h, hd], [-hw, h, -hd]], d],
      [[0, 0, 1], [[-hw, 0, hd], [hw, 0, hd], [hw, h, hd], [-hw, h, hd]], w], [[0, 0, -1], [[hw, 0, -hd], [-hw, 0, -hd], [-hw, h, -hd], [hw, h, -hd]], w], [[0, 1, 0], [[-hw, h, hd], [hw, h, hd], [hw, h, -hd], [-hw, h, -hd]], 0]];
    faces.forEach(function (f) {
      var base = P.length / 3, rep = f[2] ? f[2] / (B * 4) : 0;
      f[1].forEach(function (v, k) {
        P.push(x + v[0], y + v[1], z + v[2]); N.push(f[0][0], f[0][1], f[0][2]);
        if (f[2]) Uv.push((k === 1 || k === 2) ? rep : 0, (k >= 2) ? 0.715 : 0.005); else Uv.push(0.2 + (k === 1 || k === 2 ? 0.5 : 0), 0.78 + (k >= 2 ? 0.18 : 0));
      });
      I.push(base, base + 1, base + 2, base, base + 2, base + 3);
    });
  };
  Boxes.prototype.geo = function (THREE) {
    var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3)); g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3)); g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2)); g.setIndex(this.i); g.computeBoundingSphere(); return g;
  };
  function mount(canvas, opts) {
    opts = opts || {};
    var THREE = window.THREE; if (!THREE || !webglOK()) return null;
    var theme = opts.theme === "dark" ? "dark" : "light", pal = PAL[theme];
    var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, low = lowEnd();
    var renderer; try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, preserveDrawingBuffer: !!opts.snapshot }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, low ? 1 : 2));
    renderer.outputEncoding = THREE.sRGBEncoding; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = pal.exposure;
    renderer.shadowMap.enabled = !low; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(32, 1, 0.5, 900);
    var root = new THREE.Group(); scene.add(root);
    var hemi = new THREE.HemisphereLight(pal.hemiSky, pal.hemiGround, pal.hemiI); scene.add(hemi);
    var sun = new THREE.DirectionalLight(pal.sun, pal.sunI); sun.position.set(-45, 62, 38); sun.castShadow = !low;
    sun.shadow.mapSize.set(2048, 2048); var sc = sun.shadow.camera; sc.left = -70; sc.right = 70; sc.top = 45; sc.bottom = -45; sc.near = 1; sc.far = 220; sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.02; scene.add(sun);
    var fill = new THREE.DirectionalLight(0xdff2e6, 0.22); fill.position.set(35, 25, -30); scene.add(fill);
    var mats = [], geos = [], texs = [];
    function lin(c) { return new THREE.Color(c).convertSRGBToLinear(); }
    function M(c, o) { o = o || {}; var m = new THREE.MeshStandardMaterial(Object.assign({ roughness: 0.9, metalness: 0 }, o)); m.color = lin(c); mats.push(m); return m; }
    function L(c, op) { var m = new THREE.LineBasicMaterial({ color: lin(c), transparent: true, opacity: op }); mats.push(m); return m; }
    function G(g) { geos.push(g); return g; }
    function add(mesh, cast) { mesh.castShadow = !!cast && !low; mesh.receiveShadow = true; root.add(mesh); return mesh; }
    var dayTex = facadeTex(THREE, false), nightTex = facadeTex(THREE, true); texs.push(dayTex, nightTex);

    // terrain, roads and trees
    var grassMat = M(pal.grass), lawnMat = M(pal.lawn), soilMat = M(pal.soil, { roughness: 1 }), roadMat = M(pal.road, { roughness: 0.95 }), walkMat = M(pal.walk), markMat = M(0xf3f1e6, { roughness: 0.6 });
    var ground = add(new THREE.Mesh(G(new THREE.PlaneGeometry(420, 300)), grassMat)); ground.rotation.x = -Math.PI / 2; ground.position.set(0, -0.01, 4);
    var road = add(new THREE.Mesh(G(new THREE.BoxGeometry(150, 0.04, 3.2)), roadMat)); road.position.set(0, 0.02, 12.5);
    [10.55, 14.45].forEach(function (z) { var w = add(new THREE.Mesh(G(new THREE.BoxGeometry(150, 0.1, 0.7)), walkMat)); w.position.set(0, 0.05, z); });
    var dashG = G(new THREE.BoxGeometry(1.4, 0.02, 0.12)); for (var dx = -72; dx <= 72; dx += 3.2) { var dm0 = new THREE.Mesh(dashG, markMat); dm0.position.set(dx, 0.05, 12.5); root.add(dm0); }
    var trunkMat = M(pal.trunk), leafMats = pal.tree.map(function (c) { return M(c, { roughness: 0.95, flatShading: true }); });
    var trunkG = G(new THREE.CylinderGeometry(0.09, 0.13, 0.9, 6)), leafG = G(new THREE.IcosahedronGeometry(0.75, 0));
    function tree(x, z, s) {
      s = s || 1; var t0 = new THREE.Mesh(trunkG, trunkMat); t0.position.set(x, 0.45 * s, z); t0.scale.setScalar(s); add(t0, true);
      for (var q = 0; q < 3; q++) { var lf = new THREE.Mesh(leafG, leafMats[(((q + Math.round(x)) % 3) + 3) % 3]); var r = (0.75 + q * 0.12) * s; lf.scale.set(r, r * 0.95, r); lf.position.set(x + (q - 1) * 0.28 * s, (1.15 + q * 0.32) * s, z + ((q % 2) - 0.5) * 0.3 * s); lf.rotation.y = q; add(lf, true); }
    }
    for (var t = -70; t <= 70; t += 4.6) { tree(t, 9.7, 0.95 + ((t * 7) % 3) * 0.06); tree(t + 2.3, 15.3, 0.9 + ((t * 5) % 4) * 0.05); }

    // neighbourhood (context) as plastered blocks, one draw call
    var ctxMat = M(pal.ctxTint, { map: dayTex, emissiveMap: nightTex, emissive: lin(0xffffff), emissiveIntensity: pal.night * 0.55, roughness: 0.92 });
    var cb = new Boxes(), pads = new Boxes();
    (opts.context || []).forEach(function (c) {
      var fl = (c[4] || 3) > 3 ? 2 : 1, w = c[2] * 0.62, d = c[3] * 0.62;
      for (var k = 0; k < fl; k++) cb.add(c[0], 0.1 + k * 0.72, c[1], w, 0.72, d, 1.1);
      pads.add(c[0], 0, c[1], c[2] * 0.96, 0.1, c[3] * 0.96, 50);
    });
    if (cb.p.length) { add(new THREE.Mesh(G(cb.geo(THREE)), ctxMat), true); add(new THREE.Mesh(G(pads.geo(THREE)), walkMat)); }

    var roofs = [];
    var FH = 0.85, groups = {}, pickables = [], groupMats = {}, labelAnchor = {}, partAnchor = [];
    var concrete = M(pal.concrete, { roughness: 0.95 }), ghost = M(pal.ghost, { transparent: true, opacity: pal.ghostOp, roughness: 0.15, metalness: 0.1, depthWrite: false }), ghostEdge = L(pal.ghostEdge, pal.ghostEdgeOp);
    var domeMat = M(pal.dome, { roughness: 0.35, metalness: 0.25 }), rebar = L(0x5a4a3a, 0.9), craneMat = M(0xd9a441, { roughness: 0.6, metalness: 0.3 });
    var facadeMat = M(pal.plaster, { map: dayTex, emissiveMap: nightTex, emissive: lin(0xffffff), emissiveIntensity: pal.night * 0.7, roughness: 0.85 });
    function gm(id) { if (!groupMats[id]) groupMats[id] = { edge: L(pal.sel, 0) }; return groupMats[id]; }
    function outline(grp, gid, w, h, d, x, z) { var e = new THREE.LineSegments(G(new THREE.EdgesGeometry(new THREE.BoxGeometry(w + 0.25, h + 0.1, d + 0.25))), gm(gid).edge); e.position.set(x, h / 2, z); grp.add(e); }
    function pick(m, gid) { m.userData.gid = gid; pickables.push(m); return m; }
    function skeleton(grp, gid, w, d, x, y, z) {
      var slab = new THREE.Mesh(G(new THREE.BoxGeometry(w, 0.14, d)), concrete); slab.position.set(x, y + FH - 0.07, z); slab.castShadow = !low; slab.receiveShadow = true; grp.add(pick(slab, gid));
      var colG = G(new THREE.BoxGeometry(0.28, FH - 0.14, 0.28)), nx = 4, nz = 4;
      for (var a = 0; a < nx; a++) for (var b = 0; b < nz; b++) { var cm = new THREE.Mesh(colG, concrete); cm.position.set(x - w / 2 + 0.3 + a * (w - 0.6) / (nx - 1), y + (FH - 0.14) / 2, z - d / 2 + 0.3 + b * (d - 0.6) / (nz - 1)); cm.castShadow = !low; grp.add(cm); }
    }
    function ghostFloor(grp, gid, w, d, x, y, z, hgt) {
      var g = G(new THREE.BoxGeometry(w, hgt || FH - 0.04, d)), m = new THREE.Mesh(g, ghost); m.position.set(x, y + (hgt || FH - 0.04) / 2, z); m.renderOrder = 2; grp.add(pick(m, gid));
      var e = new THREE.LineSegments(G(new THREE.EdgesGeometry(g)), ghostEdge); e.position.copy(m.position); e.renderOrder = 3; grp.add(e);
    }
    function crane(grp, x, z, hgt) {
      var mast = new THREE.Mesh(G(new THREE.BoxGeometry(0.4, hgt, 0.4)), craneMat); mast.position.set(x, hgt / 2, z); mast.castShadow = !low; grp.add(mast);
      var jib = new THREE.Mesh(G(new THREE.BoxGeometry(9, 0.28, 0.32)), craneMat); jib.position.set(x + 2.6, hgt + 0.15, z); jib.castShadow = !low; grp.add(jib);
      var cw = new THREE.Mesh(G(new THREE.BoxGeometry(1, 0.6, 0.6)), concrete); cw.position.set(x - 1.6, hgt - 0.1, z); grp.add(cw);
      var cab = new THREE.Mesh(G(new THREE.BoxGeometry(0.6, 0.5, 0.6)), M(0xf2f2ee)); cab.position.set(x + 0.4, hgt - 0.35, z); grp.add(cab);
      var hook = new THREE.LineSegments(G(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x + 5.5, hgt, z), new THREE.Vector3(x + 5.5, hgt - 3.2, z)])), rebar); grp.add(hook);
    }
    (opts.groups || []).forEach(function (gp) {
      var grp = new THREE.Group(); root.add(grp); groups[gp.id] = grp; var top = { y: -1, x: 0, z: 0 };
      gp.parts.forEach(function (p) {
        var y = 0;
        if (p.kind === "ground") {
          var f = new THREE.Mesh(G(new THREE.BoxGeometry(p.w * 0.92, 0.08, p.d * 0.92)), lawnMat); f.position.set(p.x, 0.04, p.z); f.receiveShadow = true; grp.add(pick(f, gp.id));
          var le = new THREE.LineSegments(G(new THREE.EdgesGeometry(new THREE.BoxGeometry(p.w * 0.62, 0.01, p.d * 0.62))), L(0xffffff, 0.85)); le.position.set(p.x, 0.1, p.z); grp.add(le);
          roofs.push({ grp: grp, x: p.x, z: p.z, w: p.w * 0.6, d: p.d * 0.3, y: 0.1, name: p.name || "" });
          return;
        }
        if (p.floors && p.floors.length) {
          // construction site: soil pad, foundation, cast floors as a concrete frame, the rest as a glass outline of the design
          var site = new THREE.Mesh(G(new THREE.BoxGeometry(p.w + 3.2, 0.06, p.d + 3.2)), soilMat); site.position.set(p.x, 0.03, p.z); site.receiveShadow = true; grp.add(site);
          var fd = p.foundation || "done";
          if (fd === "done") { var pad = new THREE.Mesh(G(new THREE.BoxGeometry(p.w + 0.4, 0.22, p.d + 0.4)), concrete); pad.position.set(p.x, 0.11, p.z); pad.receiveShadow = true; grp.add(pick(pad, gp.id)); y = 0.22; }
          else {
            var capG = G(new THREE.BoxGeometry(0.75, 0.32, 0.75));
            for (var a = 0; a < 5; a++) for (var b = 0; b < 5; b++) { var cp = new THREE.Mesh(capG, concrete); cp.position.set(p.x - p.w / 2 + 0.5 + a * (p.w - 1) / 4, 0.16, p.z - p.d / 2 + 0.5 + b * (p.d - 1) / 4); cp.castShadow = !low; grp.add(pick(cp, gp.id)); }
            var rb = []; for (var r1 = 0; r1 < 5; r1++) { var xx = p.x - p.w / 2 + 0.5 + r1 * (p.w - 1) / 4; rb.push(new THREE.Vector3(xx, 0.32, p.z - p.d / 2 + 0.5), new THREE.Vector3(xx, 0.32, p.z + p.d / 2 - 0.5)); }
            grp.add(new THREE.LineSegments(G(new THREE.BufferGeometry().setFromPoints(rb)), rebar)); y = 0.32;
          }
          p.floors.forEach(function (st) { if (st === "done") skeleton(grp, gp.id, p.w, p.d, p.x, y, p.z); else ghostFloor(grp, gp.id, p.w, p.d, p.x, y, p.z); y += FH; });
          if (fd !== "done" || p.floors.indexOf("done") < 0) crane(grp, p.x + p.w / 2 + 1.6, p.z - p.d / 2 - 0.8, Math.max(y + 2.5, 8));
        } else {
          // proposed: finished facade, as an architect's model
          var n = p.ghostFloors || 5, bx = new Boxes();
          for (var k = 0; k < n; k++) { var inset = p.kind === "tower" && k > n * 0.6 ? 0.5 : 0; bx.add(p.x, y, p.z, p.w - inset, FH, p.d - inset, 1.15); y += FH; }
          var bm = new THREE.Mesh(G(bx.geo(THREE)), facadeMat); bm.castShadow = !low; bm.receiveShadow = true; grp.add(pick(bm, gp.id));
          var rf = new THREE.Mesh(G(new THREE.BoxGeometry(p.w - (p.kind === "tower" ? 0.5 : 0) + 0.1, 0.12, p.d - (p.kind === "tower" ? 0.5 : 0) + 0.1)), concrete); rf.position.set(p.x, y + 0.06, p.z); grp.add(rf);
        }
        outline(grp, gp.id, p.w, y, p.d, p.x, p.z);
        roofs.push({ grp: grp, x: p.x, z: p.z, w: p.w - (p.kind === "tower" ? 0.5 : 0), d: p.d - (p.kind === "tower" ? 0.5 : 0), y: y + (p.floors && p.floors.length ? 0.02 : 0.13), name: p.name || gp.label || "", masjid: p.kind === "masjid" });
        if (p.kind === "masjid") {
          var r = Math.min(p.w, p.d) * 0.26, finished = (p.floors || []).every(function (s) { return s === "done"; });
          var dm = new THREE.Mesh(G(new THREE.SphereGeometry(r, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2)), finished ? domeMat : ghost); dm.position.set(p.x, y, p.z); dm.renderOrder = 2; grp.add(pick(dm, gp.id));
          var de = new THREE.LineSegments(G(new THREE.EdgesGeometry(dm.geometry, 25)), ghostEdge); de.position.copy(dm.position); grp.add(de);
          var drum = new THREE.Mesh(G(new THREE.CylinderGeometry(r * 1.02, r * 1.02, 0.35, 40)), finished ? domeMat : ghost); drum.position.set(p.x, y - 0.1, p.z); grp.add(drum);
          var mh = y + 3.6, mg = G(new THREE.CylinderGeometry(0.28, 0.36, mh, 12)), mx = p.x - p.w / 2 - 0.9, mz = p.z - p.d / 2 + 0.6;
          var mn = new THREE.Mesh(mg, ghost); mn.position.set(mx, mh / 2, mz); mn.renderOrder = 2; grp.add(pick(mn, gp.id));
          var mle = new THREE.LineSegments(G(new THREE.EdgesGeometry(mg, 30)), ghostEdge); mle.position.copy(mn.position); grp.add(mle);
          var bal = new THREE.Mesh(G(new THREE.CylinderGeometry(0.5, 0.5, 0.14, 12)), ghost); bal.position.set(mx, mh * 0.72, mz); grp.add(bal);
          var cap = new THREE.Mesh(G(new THREE.ConeGeometry(0.38, 1.1, 12)), ghost); cap.position.set(mx, mh + 0.55, mz); grp.add(cap);
          y = Math.max(y + r, mh + 1.1);
        }
        if (p.kind === "tower") { var sp = new THREE.Mesh(G(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 6)), concrete); sp.position.set(p.x, y + 1.1, p.z); grp.add(sp); y += 2.2; }
        if (y > top.y) top = { y: y, x: p.x, z: p.z };
        if (p.name && gp.parts.length > 1) partAnchor.push({ gid: gp.id, name: p.name, v: new THREE.Vector3(p.x, Math.max(y, 0.4) + 0.3, p.z) });
      });
      labelAnchor[gp.id] = new THREE.Vector3(top.x, top.y + 0.8, top.z);
    });

    // names painted on the roofs (always visible), as on the marked-up master plan
    function roofText(r) {
      if (!r.name) return;
      var tw = r.w * 0.9, td = r.masjid ? r.d * 0.2 : r.d * 0.86, cw = 768, ch = Math.max(140, Math.round(cw * td / tw));
      var cv = document.createElement("canvas"); cv.width = cw; cv.height = ch; var cx = cv.getContext("2d");
      var fam = '"Hind Siliguri","Noto Sans Bengali","Naskh","Jakarta",sans-serif', words = String(r.name).split(/\s+/), lines = [], fs = 64;
      function wrap(size) { cx.font = "700 " + size + "px " + fam; var ls = [], cur = ""; words.forEach(function (w) { var t = cur ? cur + " " + w : w; if (cx.measureText(t).width > cw * 0.92 && cur) { ls.push(cur); cur = w; } else cur = t; }); if (cur) ls.push(cur); return ls; }
      for (fs = 120; fs > 18; fs -= 4) { lines = wrap(fs); var wide = Math.max.apply(null, lines.map(function (l) { return cx.measureText(l).width; })); if (wide <= cw * 0.92 && lines.length * fs * 1.18 <= ch * 0.9) break; }
      cx.font = "700 " + fs + "px " + fam; cx.textAlign = "center"; cx.textBaseline = "middle"; cx.fillStyle = "#0B2B26";
      var y0 = ch / 2 - (lines.length - 1) * fs * 0.59;
      lines.forEach(function (l, i) { cx.fillText(l, cw / 2, y0 + i * fs * 1.18); });
      var tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4; if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace; texs.push(tex);
      var mt = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }); mats.push(mt);
      var m = new THREE.Mesh(G(new THREE.PlaneGeometry(tw, td)), mt); m.rotation.x = -Math.PI / 2;
      m.position.set(r.x, r.y + 0.01, r.masjid ? r.z + r.d * 0.36 : r.z); m.renderOrder = 4; r.grp.add(m);
    }
    var fontsReady = document.fonts && document.fonts.load ? Promise.all([document.fonts.load('700 40px "Hind Siliguri"', "অআ"), document.fonts.load('700 40px "Jakarta"', "Ab")]).catch(function () {}) : Promise.resolve();
    fontsReady.then(function () { roofs.forEach(roofText); });
    // a few site trees around the IBT plots
    [[-26, -12], [-13, -12], [-27, 12.5 - 4], [-4, -12], [8, -11], [-31, 0]].forEach(function (q) { tree(q[0], q[1], 1.1); });

    // frame the IBT buildings (not the whole neighbourhood)
    var bb = new THREE.Box3(), pad = 7; (opts.groups || []).forEach(function (gp) { gp.parts.forEach(function (p) { if (!(p.floors && p.floors.length)) return; bb.expandByPoint(new THREE.Vector3(p.x - p.w / 2 - pad, 0, p.z - p.d / 2 - pad)); bb.expandByPoint(new THREE.Vector3(p.x + p.w / 2 + pad, 10, p.z + p.d / 2 + pad)); }); });
    if (bb.isEmpty()) bb.set(new THREE.Vector3(-40, 0, -10), new THREE.Vector3(40, 10, 20));
    var target = new THREE.Vector3((bb.min.x + bb.max.x) / 2, 3, (bb.min.z + bb.max.z) / 2);
    var corners = []; [bb.min.x, bb.max.x].forEach(function (x) { [bb.min.y, bb.max.y].forEach(function (y) { [bb.min.z, bb.max.z].forEach(function (z) { corners.push(new THREE.Vector3(x, y, z)); }); }); });
    var baseAz = opts.az != null ? opts.az : -0.5, az = baseAz, el = 0.52, dist = 120, rotT = 0, minD = 30, maxD = 200, autoRot = !reduced && !opts.snapshot, lastInteract = 0;
    function placeCam() { camera.position.set(target.x + dist * Math.cos(el) * Math.sin(az), target.y + dist * Math.sin(el), target.z + dist * Math.cos(el) * Math.cos(az)); camera.lookAt(target); }
    var fitW = opts.fitWidth || 104, fitH = opts.fitHeight || 36, fitted = false;
    function resize() {
      var w = canvas.clientWidth || canvas.parentNode.clientWidth, h = canvas.clientHeight || canvas.parentNode.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h;
      camera.updateProjectionMatrix();
      var keep = dist, lo = 10, hi = 400, pv = new THREE.Vector3();
      for (var it = 0; it < 22; it++) {
        var mid = (lo + hi) / 2, ok = true; dist = mid; placeCam(); camera.updateMatrixWorld();
        for (var c = 0; c < corners.length; c++) { pv.copy(corners[c]).project(camera); if (Math.abs(pv.x) > 0.9 || pv.y > 0.72 || pv.y < -0.8) { ok = false; break; } }
        if (ok) hi = mid; else lo = mid;
      }
      var fitD = hi; dist = keep;
      minD = fitD * 0.4; maxD = fitD * 3.2;
      if (!fitted) { dist = opts.view && opts.view.dist ? opts.view.dist : fitD; fitted = true; } else dist = Math.min(maxD, Math.max(minD, dist));
      camera.updateProjectionMatrix(); placeCam();
    }
    var ro = window.ResizeObserver ? new ResizeObserver(resize) : null; if (ro) ro.observe(canvas.parentNode); else window.addEventListener("resize", resize);

    var labelsEl = opts.labelsEl, labelNodes = {}, partNodes = [];
    if (labelsEl) {
      labelsEl.innerHTML = "";
      (opts.groups || []).forEach(function (gp, gi) {
        var d = document.createElement("button"); d.type = "button"; d.className = "lbl3d"; d.dataset.bid = gp.id; d.title = gp.label || gp.id;
        var i = document.createElement("i"); i.style.background = COLORS[gp.id] || "#2F8A5E"; i.textContent = String(gi + 1); d.appendChild(i);
        var nm = document.createElement("span"); nm.className = "nm"; nm.textContent = gp.label || gp.id; d.appendChild(nm);
        d.addEventListener("click", function (ev) { ev.stopPropagation(); select(gp.id, true); });
        labelsEl.appendChild(d); labelNodes[gp.id] = d; d._anchor = labelAnchor[gp.id]; d._gid = gp.id;
      });
      partAnchor.forEach(function (pa) {
        var d = document.createElement("span"); d.className = "lbl3d part"; d.textContent = pa.name; d.style.setProperty("--c", COLORS[pa.gid] || "#2F8A5E");
        labelsEl.appendChild(d); d._anchor = pa.v; d._gid = pa.gid; d._part = true; partNodes.push(d);
      });
    }
    var v3 = new THREE.Vector3();
    function updateLabels() {
      if (!labelsEl) return;
      var w = canvas.clientWidth, h = canvas.clientHeight, ns = [];
      Object.keys(labelNodes).map(function (k) { return labelNodes[k]; }).concat(partNodes).forEach(function (n) {
        var vis = !n._part || n._gid === selected;
        n.classList.toggle("off", !vis); if (!vis) return;
        v3.copy(n._anchor).project(camera);
        n._x = (v3.x + 1) / 2 * w; n._y = (1 - v3.y) / 2 * h; n._w = n.offsetWidth; n._h = n.offsetHeight; n._hid = v3.z > 1 || n._x < -20 || n._x > w + 20; ns.push(n);
      });
      // group pins first so they keep their place; part tags move away from them
      ns.sort(function (a, b) { return (a._part ? 1 : 0) - (b._part ? 1 : 0) || a._y - b._y; });
      for (var i = 0; i < ns.length; i++) for (var pass = 0; pass < 3; pass++) for (var j = 0; j < i; j++) {
        var a = ns[j], b = ns[i];
        if (Math.abs(a._x - b._x) < (a._w + b._w) / 2 + 4 && Math.abs(a._y - b._y) < (a._h + b._h) / 2 + 3) b._y = a._y + (a._h + b._h) / 2 + 3;
      }
      ns.forEach(function (n) {
        var x = Math.max(n._w / 2 + 6, Math.min(w - n._w / 2 - 6, n._x)), y = Math.max(n._h + 56, Math.min(h - 54, n._y));
        n.style.transform = "translate(" + (x - n._w / 2).toFixed(1) + "px," + (y - n._h).toFixed(1) + "px)"; n.classList.toggle("hid", n._hid);
      });
    }

    var selected = null;
    function select(id, fromUser) {
      selected = id;
      Object.keys(groupMats).forEach(function (k) { groupMats[k].edge.opacity = k === id ? 0.95 : 0; });
      Object.keys(labelNodes).forEach(function (k) { labelNodes[k].classList.toggle("sel", k === id); });
      if (fromUser && opts.onPick) opts.onPick(id);
      if (fromUser) { autoRot = false; lastInteract = performance.now(); }
    }
    var drag = null, pinch = null, ray = new THREE.Raycaster(), mv = new THREE.Vector2(), pts = {};
    function down(e) {
      pts[e.pointerId] = { x: e.clientX, y: e.clientY }; var k = Object.keys(pts);
      if (k.length === 2) { pinch = { d: Math.hypot(pts[k[0]].x - pts[k[1]].x, pts[k[0]].y - pts[k[1]].y), dist: dist }; drag = null; }
      else drag = { x: e.clientX, y: e.clientY, az: az, el: el, moved: false, rot: false, type: e.pointerType };
      autoRot = false; lastInteract = performance.now();
    }
    function move(e) {
      if (!pts[e.pointerId]) return; pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var k = Object.keys(pts);
      if (pinch && k.length === 2) { var dd = Math.hypot(pts[k[0]].x - pts[k[1]].x, pts[k[0]].y - pts[k[1]].y); dist = Math.max(minD, Math.min(maxD, pinch.dist * pinch.d / Math.max(dd, 1))); placeCam(); return; }
      if (!drag) return; var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.rot && Math.abs(dx) + Math.abs(dy) > 6) { drag.moved = true; if (drag.type !== "mouse" && Math.abs(dy) > Math.abs(dx) * 1.3) { drag = null; return; } drag.rot = true; }
      if (drag.rot) { az = drag.az - dx * 0.006; el = Math.max(0.18, Math.min(1.25, drag.el + dy * 0.004)); placeCam(); lastInteract = performance.now(); }
    }
    function up(e) {
      if (drag && !drag.moved && pts[e.pointerId]) {
        var r = canvas.getBoundingClientRect(); mv.x = ((e.clientX - r.left) / r.width) * 2 - 1; mv.y = -((e.clientY - r.top) / r.height) * 2 + 1;
        ray.setFromCamera(mv, camera); var hit = ray.intersectObjects(pickables, false)[0]; if (hit) select(hit.object.userData.gid, true);
      }
      delete pts[e.pointerId]; if (Object.keys(pts).length < 2) pinch = null; drag = null;
    }
    function wheel(e) { if (!(e.ctrlKey || e.metaKey || canvas.dataset.focus)) return; e.preventDefault(); dist = Math.max(minD, Math.min(maxD, dist + e.deltaY * 0.08)); placeCam(); }
    canvas.style.touchAction = "pan-y";
    canvas.addEventListener("pointerdown", down); window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
    canvas.addEventListener("wheel", wheel, { passive: false });
    canvas.addEventListener("click", function () { canvas.dataset.focus = "1"; });
    function zoomBy(f) { dist = Math.max(minD, Math.min(maxD, dist * f)); placeCam(); autoRot = false; lastInteract = performance.now(); }

    var visible = true, raf = 0, io = null;
    if (window.IntersectionObserver && !opts.snapshot) { io = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible && !raf) loop(); }); io.observe(canvas); }
    function loop() {
      raf = 0; if (!visible) return;
      if (!autoRot && !drag && !opts.snapshot && performance.now() - lastInteract > 7000 && !reduced) { autoRot = true; baseAz = az - Math.sin(rotT) * 0.28; }
      if (autoRot) { rotT += 0.0035; az = baseAz + Math.sin(rotT) * 0.28; placeCam(); }
      renderer.render(scene, camera); updateLabels(); if (!opts.snapshot) raf = requestAnimationFrame(loop);
    }
    if (opts.view) { az = opts.view.az; el = opts.view.el; if (opts.view.tx != null) target.set(opts.view.tx, opts.view.ty || 2, opts.view.tz); }
    resize(); placeCam(); if (opts.selected !== undefined) select(opts.selected, false); loop();
    return {
      setTheme: function (t) {
        theme = t === "dark" ? "dark" : "light"; pal = PAL[theme];
        grassMat.color.copy(lin(pal.grass)); lawnMat.color.copy(lin(pal.lawn)); soilMat.color.copy(lin(pal.soil)); roadMat.color.copy(lin(pal.road)); walkMat.color.copy(lin(pal.walk)); trunkMat.color.copy(lin(pal.trunk));
        leafMats.forEach(function (m, i) { m.color.copy(lin(pal.tree[i])); });
        ctxMat.color.copy(lin(pal.ctxTint)); ctxMat.emissiveIntensity = pal.night * 0.55; facadeMat.color.copy(lin(pal.plaster)); facadeMat.emissiveIntensity = pal.night * 0.7;
        concrete.color.copy(lin(pal.concrete)); ghost.color.copy(lin(pal.ghost)); ghost.opacity = pal.ghostOp; ghostEdge.color.copy(lin(pal.ghostEdge)); ghostEdge.opacity = pal.ghostEdgeOp; domeMat.color.copy(lin(pal.dome));
        Object.keys(groupMats).forEach(function (k) { groupMats[k].edge.color.copy(lin(pal.sel)); });
        hemi.color.copy(lin(pal.hemiSky)); hemi.groundColor.copy(lin(pal.hemiGround)); hemi.intensity = pal.hemiI; sun.color.copy(lin(pal.sun)); sun.intensity = pal.sunI; renderer.toneMappingExposure = pal.exposure; select(selected, false);
      },
      setSelected: function (id) { select(id, false); },
      zoom: zoomBy,
      reset: function () { fitted = false; az = baseAz = opts.az != null ? opts.az : -0.5; el = 0.52; rotT = 0; resize(); },
      render: function () { renderer.render(scene, camera); updateLabels(); },
      destroy: function () {
        cancelAnimationFrame(raf); raf = 0; visible = false; if (io) io.disconnect(); if (ro) ro.disconnect(); else window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
        geos.forEach(function (g) { g.dispose(); }); mats.forEach(function (m) { m.dispose(); }); texs.forEach(function (x) { x.dispose(); }); renderer.dispose(); if (labelsEl) labelsEl.innerHTML = "";
      }
    };
  }
  window.IBT3D = { mount: mount, load: load, lowEnd: lowEnd, ok: webglOK, colors: COLORS };
})();
