/* IBT 3D campus model (Three.js r128, loaded on demand).
   Shows every planned building as a clean architectural massing model; each floor is
   coloured by its real status (done / in progress / planned). Exposes window.IBT3D. */
(function () {
  "use strict";
  var loading = null;
  function webglOK() {
    try { var c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch (e) { return false; }
  }
  function lowEnd() {
    var n = navigator, mem = n.deviceMemory || 4;
    return !!(n.connection && n.connection.saveData) || mem <= 1;
  }
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

  var PAL = {
    light: { ground: 0xE6F2E8, plinth: 0xF7FBF8, path: 0xD3E6D8, grass: 0xCFE5D4, water: 0x9CC7C9, done: 0x235347, progress: 0xC9A961, planned: 0xBFDCC6, plannedOp: 0.7, edge: 0x163832, edgeOp: 0.55, sel: 0x0B2B26, dome: 0xC9A961, tree: 0x6E9C7E, hemiSky: 0xffffff, hemiGround: 0xcfe5d4, sun: 0xffffff },
    dark: { ground: 0x0B2B26, plinth: 0x0E322C, path: 0x163832, grass: 0x123A33, water: 0x1D4F55, done: 0x4FA372, progress: 0xE0A93B, planned: 0xDAF1DE, plannedOp: 0.08, edge: 0xDAF1DE, edgeOp: 0.32, sel: 0xFFFFFF, dome: 0xE2C27E, tree: 0x2F6B55, hemiSky: 0xbfe3cf, hemiGround: 0x051F20, sun: 0xfff4e0 }
  };

  function mount(canvas, opts) {
    opts = opts || {};
    var THREE = window.THREE;
    if (!THREE || !webglOK()) return null;
    var theme = opts.theme === "dark" ? "dark" : "light", pal = PAL[theme];
    var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var low = lowEnd();
    var renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, low ? 1 : 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = !low; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(34, 1, 0.1, 500);
    var root = new THREE.Group(); scene.add(root);
    var hemi = new THREE.HemisphereLight(pal.hemiSky, pal.hemiGround, theme === "dark" ? 0.75 : 0.85); scene.add(hemi);
    var sun = new THREE.DirectionalLight(pal.sun, theme === "dark" ? 0.75 : 0.95);
    sun.position.set(-18, 30, 16); sun.castShadow = !low;
    sun.shadow.mapSize.set(2048, 2048); var sc = sun.shadow.camera; sc.left = -30; sc.right = 30; sc.top = 30; sc.bottom = -30; sc.near = 1; sc.far = 90; sun.shadow.bias = -0.0005;
    scene.add(sun);
    var fill = new THREE.DirectionalLight(0xffffff, 0.25); fill.position.set(14, 10, -12); scene.add(fill);

    var mats = [];
    function M(color, o) { var m = new THREE.MeshStandardMaterial(Object.assign({ color: color, roughness: 0.85, metalness: 0 }, o || {})); mats.push(m); return m; }
    var geos = [];
    function G(g) { geos.push(g); return g; }

    // ground: plinth, lawns, paths, river
    var groundMat = M(pal.ground), plinthMat = M(pal.plinth), pathMat = M(pal.path), grassMat = M(pal.grass), waterMat = M(pal.water, { roughness: 0.25, metalness: 0.1, transparent: true, opacity: 0.9 });
    var plinth = new THREE.Mesh(G(new THREE.BoxGeometry(44, 0.6, 30)), plinthMat); plinth.position.y = -0.3; plinth.receiveShadow = true; root.add(plinth);
    var base = new THREE.Mesh(G(new THREE.BoxGeometry(46, 0.4, 32)), groundMat); base.position.y = -0.8; root.add(base);
    [[-14, 7, 10, 7], [10, 8, 12, 6], [-3, -9, 16, 5]].forEach(function (l) { var g = new THREE.Mesh(G(new THREE.BoxGeometry(l[2], 0.05, l[3])), grassMat); g.position.set(l[0], 0.03, l[1]); g.receiveShadow = true; root.add(g); });
    [[0, 2.5, 40, 1.6], [-4, 0, 1.6, 26], [8.5, 0, 1.6, 26]].forEach(function (l) { var p = new THREE.Mesh(G(new THREE.BoxGeometry(l[2], 0.06, l[3])), pathMat); p.position.set(l[0], 0.04, l[1]); p.receiveShadow = true; root.add(p); });
    var river = new THREE.Mesh(G(new THREE.BoxGeometry(56, 0.3, 6)), waterMat); river.position.set(0, -0.75, -19); root.add(river);
    // trees
    var treeMat = M(pal.tree), trunkMat = M(theme === "dark" ? 0x3a2f25 : 0x8a7560);
    var treeGeo = G(new THREE.SphereGeometry(0.9, 12, 10)), trunkGeo = G(new THREE.CylinderGeometry(0.12, 0.15, 0.8, 6));
    for (var t = 0; t < 26; t++) {
      var a = t / 26 * Math.PI * 2, rx = 20 + (t % 3) * 0.6, rz = 13.2 + (t % 2) * 0.5;
      var x = Math.cos(a) * rx, z = Math.sin(a) * rz;
      if (z < -12.5) continue;
      var tr = new THREE.Mesh(trunkGeo, trunkMat); tr.position.set(x, 0.4, z); root.add(tr);
      var tc = new THREE.Mesh(treeGeo, treeMat); tc.position.set(x, 1.3, z); tc.scale.setScalar(0.8 + (t % 4) * 0.12); tc.castShadow = !low; root.add(tc);
    }

    // buildings
    var FH = 0.9; // floor height
    var pickables = [], groups = {};
    var doneMat = M(pal.done, { roughness: 0.7, emissive: pal.done, emissiveIntensity: theme === "dark" ? 0.12 : 0 }), progMat = M(pal.progress, { roughness: 0.6, emissive: pal.progress, emissiveIntensity: theme === "dark" ? 0.25 : 0.08 });
    var planMat = M(pal.planned, { transparent: true, opacity: pal.plannedOp, roughness: 0.2, metalness: 0.05, depthWrite: false });
    var edgeMat = new THREE.LineBasicMaterial({ color: pal.edge, transparent: true, opacity: pal.edgeOp });
    var selEdgeMat = new THREE.LineBasicMaterial({ color: pal.sel, transparent: true, opacity: 0.95 });
    var domeMat = M(pal.dome, { roughness: 0.35, metalness: 0.35 });
    function matFor(st) { return st === "done" ? doneMat : (st === "progress" || st === "next") ? progMat : planMat; }
    function addBlock(grp, w, h, d, y, st, bid, ox, oz) {
      var g = G(new THREE.BoxGeometry(w, h, d));
      var mesh = new THREE.Mesh(g, matFor(st)); mesh.position.set(ox || 0, y + h / 2, oz || 0);
      mesh.castShadow = st !== "planned" && !low; mesh.receiveShadow = true; mesh.userData.bid = bid; grp.add(mesh); pickables.push(mesh);
      var e = new THREE.LineSegments(G(new THREE.EdgesGeometry(g)), edgeMat); e.position.copy(mesh.position); e.userData.edge = true; grp.add(e);
      return mesh;
    }
    var B = opts.buildings || [];
    B.forEach(function (b) {
      var grp = new THREE.Group(); grp.position.set(b.x || 0, 0, b.z || 0); grp.rotation.y = b.rot || 0; root.add(grp);
      groups[b.id] = grp; grp.userData = { id: b.id, top: 0 };
      var floors = b.floors && b.floors.length ? b.floors : null;
      var y = 0;
      if (b.foundation) { addBlock(grp, b.w + 0.6, 0.25, b.d + 0.6, -0.02, b.foundation, b.id); y = 0.23; }
      if (floors) {
        floors.forEach(function (st, i) {
          var inset = b.stepBack && i >= b.stepBack ? b.stepInset || 1.2 : 0;
          addBlock(grp, b.w - inset * 2, FH - 0.06, b.d - inset * 2, y, st, b.id); y += FH;
        });
      } else {
        var n = b.ghostFloors || 6;
        for (var k = 0; k < n; k++) { addBlock(grp, b.w, FH - 0.06, b.d, y, "planned", b.id); y += FH; }
      }
      if (b.kind === "masjid") {
        var domeSt = floors ? floors[floors.length - 1] : "planned";
        var dm = new THREE.Mesh(G(new THREE.SphereGeometry(b.w * 0.24, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)), domeSt === "planned" ? planMat : domeMat);
        dm.position.set(0, y, 0); dm.userData.bid = b.id; grp.add(dm); pickables.push(dm);
        var de = new THREE.LineSegments(G(new THREE.EdgesGeometry(dm.geometry, 30)), edgeMat); de.position.copy(dm.position); grp.add(de);
        var mh = y + 3.2, mg = G(new THREE.CylinderGeometry(0.32, 0.4, mh, 10));
        var mn = new THREE.Mesh(mg, planMat); mn.position.set(b.w / 2 + 1, mh / 2, -b.d / 2 + 0.6); mn.userData.bid = b.id; grp.add(mn); pickables.push(mn);
        var mne = new THREE.LineSegments(G(new THREE.EdgesGeometry(mg, 30)), edgeMat); mne.position.copy(mn.position); grp.add(mne);
        var cap = new THREE.Mesh(G(new THREE.ConeGeometry(0.42, 1.1, 10)), domeMat); cap.position.set(mn.position.x, mh + 0.5, mn.position.z); grp.add(cap);
        y = Math.max(y + b.w * 0.24, mh + 1.1);
      }
      if (b.kind === "tower") {
        var sp = new THREE.Mesh(G(new THREE.ConeGeometry(b.w * 0.35, 2.2, 4)), planMat); sp.rotation.y = Math.PI / 4; sp.position.y = y + 1.1; sp.userData.bid = b.id; grp.add(sp); pickables.push(sp); y += 2.2;
      }
      grp.userData.top = y + 0.6;
    });

    // camera orbit
    var target = new THREE.Vector3(0, 2.6, 0);
    var az = opts.azimuth != null ? opts.azimuth : -0.6, el = 0.62, dist = 70, minD = 30, maxD = 110;
    var autoRot = !reduced, lastInteract = 0;
    function placeCam() {
      camera.position.set(target.x + dist * Math.cos(el) * Math.sin(az), target.y + dist * Math.sin(el), target.z + dist * Math.cos(el) * Math.cos(az));
      camera.lookAt(target);
    }
    function resize() {
      var w = canvas.clientWidth || canvas.parentNode.clientWidth, h = canvas.clientHeight || canvas.parentNode.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h;
      var tv = Math.tan(17 * Math.PI / 180), fitD = Math.max(19 / tv, 27 / (tv * camera.aspect));
      minD = fitD * 0.5; maxD = fitD * 1.3; dist = fitD * 0.86;
      camera.updateProjectionMatrix(); placeCam();
    }
    var ro = window.ResizeObserver ? new ResizeObserver(resize) : null; if (ro) ro.observe(canvas.parentNode); else window.addEventListener("resize", resize);

    // labels
    var labelsEl = opts.labelsEl, labelNodes = {};
    if (labelsEl) {
      labelsEl.innerHTML = "";
      B.forEach(function (b) {
        var d = document.createElement("button"); d.type = "button"; d.className = "lbl3d"; d.textContent = b.label || b.id; d.dataset.bid = b.id;
        d.addEventListener("click", function (ev) { ev.stopPropagation(); select(b.id, true); });
        labelsEl.appendChild(d); labelNodes[b.id] = d;
      });
    }
    var v3 = new THREE.Vector3();
    function updateLabels() {
      if (!labelsEl) return;
      var w = canvas.clientWidth, h = canvas.clientHeight;
      Object.keys(labelNodes).forEach(function (id) {
        var g = groups[id]; if (!g) return;
        v3.set(0, g.userData.top, 0); g.localToWorld(v3); v3.project(camera);
        var n = labelNodes[id];
        n.style.left = ((v3.x + 1) / 2 * w) + "px"; n.style.top = ((1 - v3.y) / 2 * h) + "px";
        n.classList.toggle("hid", v3.z > 1);
        n._x = (v3.x + 1) / 2 * w; n._y = (1 - v3.y) / 2 * h;
      });
      // simple collision avoidance: push overlapping labels apart vertically
      var ns = Object.keys(labelNodes).map(function (k) { return labelNodes[k]; }).sort(function (a, b) { return a._y - b._y; });
      for (var i = 0; i < ns.length; i++) for (var j = 0; j < i; j++) {
        var a = ns[j], b = ns[i], wa = a.offsetWidth, wb = b.offsetWidth, hh = a.offsetHeight + 4;
        if (Math.abs(a._x - b._x) < (wa + wb) / 2 + 4 && Math.abs(a._y - b._y) < hh) { b._y = a._y + hh; b.style.top = b._y + "px"; }
      }
    }

    // selection
    var selected = null;
    function select(id, fromUser) {
      selected = id;
      Object.keys(groups).forEach(function (k) {
        groups[k].children.forEach(function (c) { if (c.isLineSegments) c.material = k === id ? selEdgeMat : edgeMat; });
      });
      Object.keys(labelNodes).forEach(function (k) { labelNodes[k].classList.toggle("sel", k === id); });
      if (fromUser && opts.onPick) opts.onPick(id);
      if (fromUser) { autoRot = false; lastInteract = performance.now(); }
    }

    // pointer: drag rotate, click pick, wheel zoom
    var drag = null, ray = new THREE.Raycaster(), mv = new THREE.Vector2();
    function onDown(e) { drag = { x: e.clientX, y: e.clientY, az: az, el: el, moved: false }; autoRot = false; lastInteract = performance.now(); }
    function onMove(e) {
      if (!drag) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
      az = drag.az - dx * 0.006; el = Math.max(0.18, Math.min(1.2, drag.el + dy * 0.004)); placeCam(); lastInteract = performance.now();
    }
    function onUp(e) {
      if (drag && !drag.moved) {
        var r = canvas.getBoundingClientRect(); mv.x = ((e.clientX - r.left) / r.width) * 2 - 1; mv.y = -((e.clientY - r.top) / r.height) * 2 + 1;
        ray.setFromCamera(mv, camera); var hit = ray.intersectObjects(pickables, false)[0];
        if (hit && hit.object.userData.bid) select(hit.object.userData.bid, true);
      }
      drag = null;
    }
    function onWheel(e) { if (!e.ctrlKey && !e.metaKey && Math.abs(e.deltaY) < 50 && e.deltaMode === 0 && !canvas.matches(":hover")) return; e.preventDefault(); dist = Math.max(minD, Math.min(maxD, dist + e.deltaY * 0.03)); placeCam(); }
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    // render loop (pauses off-screen)
    var visible = true, raf = 0, io = null;
    if (window.IntersectionObserver) { io = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible && !raf) loop(); }); io.observe(canvas); }
    function loop() {
      raf = 0; if (!visible) return;
      if (!autoRot && !drag && performance.now() - lastInteract > 6000 && !reduced) autoRot = true;
      if (autoRot) { az += 0.0018; placeCam(); }
      renderer.render(scene, camera); updateLabels();
      raf = requestAnimationFrame(loop);
    }
    resize(); placeCam(); if (opts.selected) select(opts.selected, false); loop();

    return {
      setTheme: function (t) {
        theme = t === "dark" ? "dark" : "light"; pal = PAL[theme];
        groundMat.color.setHex(pal.ground); plinthMat.color.setHex(pal.plinth); pathMat.color.setHex(pal.path); grassMat.color.setHex(pal.grass); waterMat.color.setHex(pal.water);
        doneMat.color.setHex(pal.done); progMat.color.setHex(pal.progress); progMat.emissive.setHex(pal.progress); progMat.emissiveIntensity = theme === "dark" ? 0.25 : 0.08;
        planMat.color.setHex(pal.planned); planMat.opacity = pal.plannedOp; edgeMat.color.setHex(pal.edge); edgeMat.opacity = pal.edgeOp; selEdgeMat.color.setHex(pal.sel);
        domeMat.color.setHex(pal.dome); treeMat.color.setHex(pal.tree);
        hemi.color.setHex(pal.hemiSky); hemi.groundColor.setHex(pal.hemiGround); hemi.intensity = theme === "dark" ? 0.75 : 0.85; sun.intensity = theme === "dark" ? 0.75 : 0.95;
      },
      setSelected: function (id) { select(id, false); },
      destroy: function () {
        cancelAnimationFrame(raf); raf = 0; visible = false;
        if (io) io.disconnect(); if (ro) ro.disconnect(); else window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp);
        geos.forEach(function (g) { g.dispose(); }); mats.forEach(function (m) { m.dispose(); }); edgeMat.dispose(); selEdgeMat.dispose();
        renderer.dispose(); if (labelsEl) labelsEl.innerHTML = "";
      }
    };
  }
  window.IBT3D = { mount: mount, load: load, lowEnd: lowEnd, ok: webglOK };
})();
