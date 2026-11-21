/* IBT 3D campus (Three.js r128, loaded on demand) laid out from the IBT master plan
   (New Dhaka City, 21 Nov 2026). Each project is a group of buildings; floors of buildings
   under construction are coloured by real status. Exposes window.IBT3D. */
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
  var COLORS = { "masjid-complex": "#2F8A5E", "academic-1": "#2E86A8", "academic-2": "#C4703F", "academic-3": "#7B62C0", "taibah-tower": "#B8912E" };
  var PAL = {
    light: { road: 0xF8FBF9, plot: 0xDCE8DF, ctx: 0xF2F6F3, ctxEdge: 0xB9CCBF, grass: 0xBFDDC4, done: 0x1F5A47, progress: 0xD39B2A, plannedOp: 0.38, edgeOp: 0.75, dome: 0xC9A961, tree: 0x7FAE8C, hemiSky: 0xffffff, hemiGround: 0xcfe0d3, hemiI: 0.9, sunI: 0.95 },
    dark: { road: 0x1A2522, plot: 0x16201D, ctx: 0x222E2A, ctxEdge: 0x3A4C45, grass: 0x1F3D30, done: 0x6FC49A, progress: 0xE8B04A, plannedOp: 0.32, edgeOp: 0.9, dome: 0xE2C27E, tree: 0x2E5A45, hemiSky: 0xd8ece0, hemiGround: 0x101816, hemiI: 0.75, sunI: 0.85 }
  };
  function mount(canvas, opts) {
    opts = opts || {};
    var THREE = window.THREE; if (!THREE || !webglOK()) return null;
    var theme = opts.theme === "dark" ? "dark" : "light", pal = PAL[theme];
    var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, low = lowEnd();
    var renderer; try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, preserveDrawingBuffer: !!opts.snapshot }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, low ? 1 : 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = !low; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(32, 1, 0.5, 900);
    var root = new THREE.Group(); scene.add(root);
    var hemi = new THREE.HemisphereLight(pal.hemiSky, pal.hemiGround, pal.hemiI); scene.add(hemi);
    var sun = new THREE.DirectionalLight(0xffffff, pal.sunI); sun.position.set(-40, 70, 35); sun.castShadow = !low;
    sun.shadow.mapSize.set(2048, 2048); var sc = sun.shadow.camera; sc.left = -60; sc.right = 60; sc.top = 40; sc.bottom = -40; sc.near = 1; sc.far = 200; sun.shadow.bias = -0.0006; scene.add(sun);
    var fill = new THREE.DirectionalLight(0xffffff, 0.25); fill.position.set(30, 20, -30); scene.add(fill);
    var mats = [], geos = [];
    function lin(c) { return new THREE.Color(c).convertSRGBToLinear(); }
    function M(c, o) { o = o || {}; if (o.emissive != null) o.emissive = lin(o.emissive); var m = new THREE.MeshStandardMaterial(Object.assign({ roughness: 0.85, metalness: 0 }, o)); m.color = lin(c); mats.push(m); return m; }
    function M0(c, o) { var m = new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.85, metalness: 0 }, o || {})); mats.push(m); return m; }
    function L(c, op) { var m = new THREE.LineBasicMaterial({ color: lin(c), transparent: true, opacity: op }); mats.push(m); return m; }
    function G(g) { geos.push(g); return g; }

    var groundMat = M(pal.road), plotMat = M(pal.plot), ctxMat = M(pal.ctx, { roughness: 0.95 }), ctxEdge = L(pal.ctxEdge, 0.45), grassMat = M(pal.grass), treeMat = M(pal.tree);
    var ground = new THREE.Mesh(G(new THREE.BoxGeometry(122, 0.6, 72)), groundMat); ground.position.set(0, -0.3, 4); ground.receiveShadow = true; root.add(ground);
    var ctxBox = G(new THREE.BoxGeometry(1, 1, 1)), ctxEdges = G(new THREE.EdgesGeometry(ctxBox));
    (opts.context || []).forEach(function (c) {
      var pad = new THREE.Mesh(ctxBox, plotMat); pad.scale.set(c[2] * 0.96, 0.08, c[3] * 0.96); pad.position.set(c[0], 0.04, c[1]); pad.receiveShadow = true; root.add(pad);
      var hgt = 0.35 + (c[4] || 3) * 0.12, m = new THREE.Mesh(ctxBox, ctxMat); m.scale.set(c[2] * 0.72, hgt, c[3] * 0.72); m.position.set(c[0], hgt / 2 + 0.08, c[1]); m.castShadow = !low; m.receiveShadow = true; root.add(m);
      var e = new THREE.LineSegments(ctxEdges, ctxEdge); e.scale.copy(m.scale); e.position.copy(m.position); root.add(e);
    });
    var treeGeo = G(new THREE.SphereGeometry(0.8, 10, 8));
    for (var t = -52; t <= 52; t += 5.5) { [11.6, 13.4].forEach(function (z) { var tr = new THREE.Mesh(treeGeo, treeMat); tr.position.set(t + (z > 12 ? 2.7 : 0), 0.9, z); tr.castShadow = !low; root.add(tr); }); }

    var FH = 0.85, groups = {}, pickables = [], groupMats = {}, labelAnchor = {}, partAnchor = [];
    var doneMat = M(pal.done, { roughness: 0.6 }), progMat = M(pal.progress, { roughness: 0.55, emissive: pal.progress, emissiveIntensity: 0.12 }), domeMat = M(pal.dome, { roughness: 0.35, metalness: 0.4 });
    function gm(id) {
      if (groupMats[id]) return groupMats[id];
      var col = COLORS[id] || "#2F8A5E";
      groupMats[id] = { plan: M(col, { transparent: true, opacity: pal.plannedOp, roughness: 0.25, metalness: 0.05, depthWrite: false }), edge: L(col, pal.edgeOp) };
      return groupMats[id];
    }
    function block(grp, gid, w, h, d, x, y, z, st) {
      var g = G(new THREE.BoxGeometry(w, h, d)), mt = st === "done" ? doneMat : (st === "progress" || st === "next") ? progMat : gm(gid).plan;
      var m = new THREE.Mesh(g, mt); m.position.set(x, y + h / 2, z); m.castShadow = st !== "planned" && !low; m.receiveShadow = true; m.userData.gid = gid; grp.add(m); pickables.push(m);
      var e = new THREE.LineSegments(G(new THREE.EdgesGeometry(g)), gm(gid).edge); e.position.copy(m.position); grp.add(e);
      return m;
    }
    (opts.groups || []).forEach(function (gp) {
      var grp = new THREE.Group(); root.add(grp); groups[gp.id] = grp; var top = { y: -1, x: 0, z: 0 };
      gp.parts.forEach(function (p, pi) {
        var y = 0;
        if (p.kind === "ground") {
          var f = new THREE.Mesh(G(new THREE.BoxGeometry(p.w * 0.92, 0.12, p.d * 0.92)), grassMat); f.position.set(p.x, 0.06, p.z); f.receiveShadow = true; f.userData.gid = gp.id; grp.add(f); pickables.push(f);
          var le = new THREE.LineSegments(G(new THREE.EdgesGeometry(new THREE.BoxGeometry(p.w * 0.62, 0.01, p.d * 0.62))), L(0xffffff, 0.8)); le.position.set(p.x, 0.14, p.z); grp.add(le);
          return;
        }
        if (p.floors && p.floors.length) {
          if (p.foundation) { block(grp, gp.id, p.w + 0.5, 0.22, p.d + 0.5, p.x, -0.02, p.z, p.foundation); y = 0.2; }
          p.floors.forEach(function (st) { block(grp, gp.id, p.w, FH - 0.06, p.d, p.x, y, p.z, st); y += FH; });
        } else {
          var n = p.ghostFloors || 5;
          for (var k = 0; k < n; k++) { var inset = p.kind === "tower" && k > n * 0.6 ? 0.5 : 0; block(grp, gp.id, p.w - inset, FH - 0.06, p.d - inset, p.x, y, p.z, "planned"); y += FH; }
        }
        if (p.kind === "masjid") {
          var last = (p.floors || [])[p.floors.length - 1] || "planned", r = Math.min(p.w, p.d) * 0.24;
          var dm = new THREE.Mesh(G(new THREE.SphereGeometry(r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)), last === "planned" ? gm(gp.id).plan : domeMat);
          dm.position.set(p.x, y, p.z); dm.userData.gid = gp.id; grp.add(dm); pickables.push(dm);
          var de = new THREE.LineSegments(G(new THREE.EdgesGeometry(dm.geometry, 30)), gm(gp.id).edge); de.position.copy(dm.position); grp.add(de);
          var mh = y + 3.4, mg = G(new THREE.CylinderGeometry(0.3, 0.38, mh, 10)), mx = p.x - p.w / 2 - 0.9, mz = p.z - p.d / 2 + 0.6;
          var mn = new THREE.Mesh(mg, gm(gp.id).plan); mn.position.set(mx, mh / 2, mz); mn.userData.gid = gp.id; grp.add(mn); pickables.push(mn);
          var me = new THREE.LineSegments(G(new THREE.EdgesGeometry(mg, 30)), gm(gp.id).edge); me.position.copy(mn.position); grp.add(me);
          var cap = new THREE.Mesh(G(new THREE.ConeGeometry(0.4, 1.1, 10)), domeMat); cap.position.set(mx, mh + 0.55, mz); grp.add(cap);
          y = Math.max(y + r, mh + 1.1);
        }
        if (p.kind === "tower") { var sp = new THREE.Mesh(G(new THREE.ConeGeometry(Math.min(p.w, p.d) * 0.3, 1.8, 4)), gm(gp.id).plan); sp.rotation.y = Math.PI / 4; sp.position.set(p.x, y + 0.9, p.z); grp.add(sp); y += 1.8; }
        if (y > top.y) top = { y: y, x: p.x, z: p.z };
        if (p.name && gp.parts.length > 1) partAnchor.push({ gid: gp.id, name: p.name, v: new THREE.Vector3(p.x, Math.max(y, 0.4) + 0.3, p.z) });
      });
      labelAnchor[gp.id] = new THREE.Vector3(top.x, top.y + 0.8, top.z);
    });

    // frame the IBT buildings (not the whole neighbourhood)
    var bb = new THREE.Box3(); (opts.groups || []).forEach(function (gp) { gp.parts.forEach(function (p) { bb.expandByPoint(new THREE.Vector3(p.x - p.w / 2, 0, p.z - p.d / 2)); bb.expandByPoint(new THREE.Vector3(p.x + p.w / 2, 12, p.z + p.d / 2)); }); });
    if (bb.isEmpty()) bb.set(new THREE.Vector3(-40, 0, -10), new THREE.Vector3(40, 10, 20));
    var target = new THREE.Vector3((bb.min.x + bb.max.x) / 2, 3, (bb.min.z + bb.max.z) / 2);
    var corners = []; [bb.min.x, bb.max.x].forEach(function (x) { [bb.min.y, bb.max.y].forEach(function (y) { [bb.min.z, bb.max.z].forEach(function (z) { corners.push(new THREE.Vector3(x, y, z)); }); }); });
    var baseAz = opts.az != null ? opts.az : -0.5, az = baseAz, el = 0.78, dist = 120, rotT = 0, minD = 30, maxD = 200, autoRot = !reduced && !opts.snapshot, lastInteract = 0;
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
      minD = fitD * 0.35; maxD = fitD * 1.4;
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
      Object.keys(groupMats).forEach(function (k) { var g = groupMats[k], on = !id || k === id; g.plan.opacity = on ? pal.plannedOp + 0.14 : pal.plannedOp * 0.4; g.edge.opacity = on ? 1 : pal.edgeOp * 0.3; });
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
      if (drag.rot) { az = drag.az - dx * 0.006; el = Math.max(0.25, Math.min(1.25, drag.el + dy * 0.004)); placeCam(); lastInteract = performance.now(); }
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
        groundMat.color.copy(lin(pal.road)); plotMat.color.copy(lin(pal.plot)); ctxMat.color.copy(lin(pal.ctx)); ctxEdge.color.copy(lin(pal.ctxEdge)); grassMat.color.copy(lin(pal.grass)); treeMat.color.copy(lin(pal.tree));
        doneMat.color.copy(lin(pal.done)); progMat.color.copy(lin(pal.progress)); progMat.emissive.copy(lin(pal.progress)); domeMat.color.copy(lin(pal.dome));
        hemi.color.copy(lin(pal.hemiSky)); hemi.groundColor.setHex(pal.hemiGround); hemi.intensity = pal.hemiI; sun.intensity = pal.sunI; select(selected, false);
      },
      setSelected: function (id) { select(id, false); },
      zoom: zoomBy,
      reset: function () { fitted = false; az = baseAz = opts.az != null ? opts.az : -0.5; el = 0.78; rotT = 0; resize(); },
      render: function () { renderer.render(scene, camera); updateLabels(); },
      destroy: function () {
        cancelAnimationFrame(raf); raf = 0; visible = false; if (io) io.disconnect(); if (ro) ro.disconnect(); else window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
        geos.forEach(function (g) { g.dispose(); }); mats.forEach(function (m) { m.dispose(); }); renderer.dispose(); if (labelsEl) labelsEl.innerHTML = "";
      }
    };
  }
  window.IBT3D = { mount: mount, load: load, lowEnd: lowEnd, ok: webglOK, colors: COLORS };
})();
