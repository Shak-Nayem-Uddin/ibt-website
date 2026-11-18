/* IBT 3D: procedural architectural visualisation of the Imam Bukhari Jame Masjid
   & Academic Campus. Used for the hero (vision mode) and the construction tracker
   (status mode). Requires THREE (r128). Exposes window.IBT3D. */
(function () {
  "use strict";
  function webglOK() {
    try { var c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch (e) { return false; }
  }
  function lowEnd() {
    var n = navigator, mem = n.deviceMemory || 4;
    var save = n.connection && n.connection.saveData;
    return !!save || mem <= 1;
  }

  function windowTexture(THREE, cols, rows, lit, base) {
    var c = document.createElement("canvas"); c.width = 256; c.height = 128;
    var g = c.getContext("2d");
    g.fillStyle = base; g.fillRect(0, 0, 256, 128);
    var cw = 256 / cols, rh = 128 / rows;
    for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
      var on = lit && Math.random() > 0.35;
      g.fillStyle = on ? "rgba(255," + (200 + Math.random() * 40 | 0) + ",140," + (0.65 + Math.random() * 0.35) + ")" : "rgba(20,40,60,0.85)";
      g.fillRect(x * cw + cw * 0.18, y * rh + rh * 0.2, cw * 0.64, rh * 0.6);
    }
    var t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
  }

  function mount(canvas, opts) {
    opts = opts || {};
    if (!window.THREE || !webglOK()) return null;
    var THREE = window.THREE;
    var mode = opts.mode || "hero";
    var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !lowEnd(), alpha: true, powerPreference: "high-performance" }); }
    catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowEnd() ? 1 : 1.75));
    renderer.outputEncoding = THREE.sRGBEncoding;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
    var root = new THREE.Group(); scene.add(root);

    var hemi = new THREE.HemisphereLight(0xbfd8ff, 0x0b1d14, 0.7); scene.add(hemi);
    var sun = new THREE.DirectionalLight(0xffffff, 0.9); sun.position.set(-6, 10, 6); scene.add(sun);
    var rim = new THREE.DirectionalLight(0x8cc05a, 0.35); rim.position.set(6, 4, -6); scene.add(rim);
    var glowLight = new THREE.PointLight(0xffc46a, 0.0, 12); glowLight.position.set(0, 2, 2); scene.add(glowLight);

    // Ground & river
    var groundMat = new THREE.MeshStandardMaterial({ color: 0x0f2a22, roughness: 1, metalness: 0 });
    var ground = new THREE.Mesh(new THREE.CircleGeometry(9, 64), groundMat);
    ground.rotation.x = -Math.PI / 2; root.add(ground);
    var ringMat = new THREE.LineBasicMaterial({ color: 0x8cc05a, transparent: true, opacity: 0.25 });
    [3.2, 5.2, 7.4].forEach(function (r) {
      var pts = []; for (var i = 0; i <= 96; i++) { var a = i / 96 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, 0.005, Math.sin(a) * r)); }
      root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat));
    });
    var riverMat = new THREE.MeshStandardMaterial({ color: 0x1e5a86, roughness: 0.25, metalness: 0.3, transparent: true, opacity: 0.85 });
    var river = new THREE.Mesh(new THREE.PlaneGeometry(22, 2.2), riverMat);
    river.rotation.x = -Math.PI / 2; river.rotation.z = 0.35; river.position.set(0, 0.01, -5.4); root.add(river);
    var pathMat = new THREE.MeshStandardMaterial({ color: 0x3a4a3f, roughness: 1 });
    var path = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 7), pathMat);
    path.rotation.x = -Math.PI / 2; path.position.set(-0.6, 0.012, 3.6); root.add(path);

    // Trees
    var treeMat = new THREE.MeshStandardMaterial({ color: 0x2f6b3a, roughness: 0.9, flatShading: true });
    var trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3526 });
    function tree(x, z, s) {
      var g = new THREE.Group();
      var tr = new THREE.Mesh(new THREE.CylinderGeometry(0.03 * s, 0.04 * s, 0.3 * s, 6), trunkMat); tr.position.y = 0.15 * s; g.add(tr);
      var cr = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28 * s, 0), treeMat); cr.position.y = 0.48 * s; g.add(cr);
      g.position.set(x, 0, z); root.add(g);
    }
    [[-3.6, 1.6, 1.2], [-4.2, -0.4, 1], [3.9, 2.2, 1.1], [4.6, 0.2, 0.9], [-2.6, 3.4, 0.8], [2.6, 3.8, 0.9], [-5, 2.4, 1.3], [5.2, -1.8, 1]].forEach(function (t) { tree(t[0], t[1], t[2]); });

    // Building factory
    var FH = 0.3; // floor height
    var buildings = { mosque: [], academic: [] };
    var pickables = [];
    var brick = new THREE.Color(0xa0523a), cream = new THREE.Color(0xe9dcc6);

    function matsFor(status, kind, lit) {
      var tex = windowTexture(THREE, kind === "mosque" ? 6 : 10, 1, lit, kind === "mosque" ? "#c9b79b" : "#d9cdb7");
      var solid = new THREE.MeshStandardMaterial({ color: kind === "mosque" ? brick : (lit ? new THREE.Color(0xbfb29c) : cream), roughness: 0.75, metalness: 0.05, map: tex, emissive: lit ? 0xffb35a : 0x000000, emissiveMap: lit ? tex : null, emissiveIntensity: lit ? (kind === "mosque" ? 0.5 : 0.32) : 0 });
      if (status === "done" || mode === "hero") return { body: solid, edge: 0x8cc05a, edgeOp: mode === "hero" ? 0.0 : 0.6 };
      if (status === "progress") return { body: new THREE.MeshStandardMaterial({ color: 0xE0B252, roughness: 0.5, transparent: true, opacity: 0.88, emissive: 0xE0A030, emissiveIntensity: 0.7 }), edge: 0xffd27a, edgeOp: 0.95, pulse: true };
      return { body: new THREE.MeshPhysicalMaterial({ color: 0x9fd0ff, roughness: 0.1, metalness: 0, transparent: true, opacity: 0.08 }), edge: 0xbfe3ff, edgeOp: 0.35 };
    }

    function addFloor(kind, idx, w, d, x, z, status, lit, parts) {
      var group = new THREE.Group();
      var h = idx === 0 ? 0.12 : FH;
      var y = idx === 0 ? 0.06 : 0.12 + (idx - 1) * FH + FH / 2;
      (parts || [{ w: w, d: d, x: 0, z: 0 }]).forEach(function (p) {
        var m = matsFor(status, kind, lit && idx > 0);
        var geo = new THREE.BoxGeometry(p.w, h * 0.96, p.d);
        var mesh = new THREE.Mesh(geo, m.body);
        mesh.position.set(x + p.x, y, z + p.z);
        mesh.userData = { kind: kind, idx: idx };
        group.add(mesh); pickables.push(mesh);
        if (m.edgeOp > 0) {
          var e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: m.edge, transparent: true, opacity: m.edgeOp }));
          e.position.copy(mesh.position); group.add(e);
          if (m.pulse) e.userData.pulse = true;
        }
        // slab line
        if (idx > 0) {
          var slab = new THREE.Mesh(new THREE.BoxGeometry(p.w * 1.03, 0.02, p.d * 1.03), new THREE.MeshStandardMaterial({ color: 0xf2efe8, roughness: 0.6, transparent: status === "planned" && mode !== "hero", opacity: status === "planned" && mode !== "hero" ? 0.25 : 1 }));
          slab.position.set(x + p.x, y + h / 2, z + p.z); group.add(slab);
        }
      });
      group.userData = { kind: kind, idx: idx, status: status, baseY: 0 };
      root.add(group);
      buildings[kind].push(group);
      return group;
    }

    function arch(x, z, height, width, color) {
      // Grand portal: two piers + a pointed (two-centred) arch, in gold, set on the masjid's front face
      var g = new THREE.Group();
      var mat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.35, metalness: 0.55, emissive: 0x5a4416, emissiveIntensity: 0.45 });
      var pierH = height * 0.72, w = width / 2, t = 0.07;
      [-1, 1].forEach(function (sx) { var p = new THREE.Mesh(new THREE.BoxGeometry(t, pierH, t * 1.4), mat); p.position.set(sx * w, pierH / 2, 0); g.add(p); });
      // arch crown: semicircle torus spanning the piers
      var crown = new THREE.Mesh(new THREE.TorusGeometry(w, t * 0.55, 8, 32, Math.PI), mat);
      crown.position.set(0, pierH, 0); g.add(crown);
      var keystone = new THREE.Mesh(new THREE.ConeGeometry(t * 0.9, t * 2.4, 4), mat);
      keystone.position.set(0, pierH + w + t, 0); g.add(keystone);
      var lintel = new THREE.Mesh(new THREE.BoxGeometry(width + t * 2, t, t * 1.4), mat); lintel.position.set(0, height * 0.02, 0); g.add(lintel);
      // inner glowing screen (mashrabiya feel)
      var screen = new THREE.Mesh(new THREE.CircleGeometry(w * 0.95, 32, 0, Math.PI), new THREE.MeshStandardMaterial({ color: 0x1b2f3a, emissive: 0xffc46a, emissiveIntensity: 0.22, transparent: true, opacity: 0.85, side: THREE.DoubleSide }));
      screen.position.set(0, pierH, -0.01); g.add(screen);
      var screen2 = new THREE.Mesh(new THREE.PlaneGeometry(width * 0.92, pierH * 0.96), new THREE.MeshStandardMaterial({ color: 0x1b2f3a, emissive: 0xffc46a, emissiveIntensity: 0.18, transparent: true, opacity: 0.85 }));
      screen2.position.set(0, pierH * 0.5, -0.01); g.add(screen2);
      g.position.set(x, 0.12, z); root.add(g); return g;
    }

    var lit = !!opts.night;
    var floors = opts.floors || { mosque: [], academic: [] };
    function build() {
      // clear previous
      ["mosque", "academic"].forEach(function (k) { buildings[k].forEach(function (g) { root.remove(g); }); buildings[k] = []; });
      pickables.length = 0;
      (floors.mosque || []).forEach(function (f, i) { addFloor("mosque", i, 1.5, 1.25, -1.15, 0.55, f.status, lit); });
      var ac = floors.academic || [];
      ac.forEach(function (f, i) {
        addFloor("academic", i, 0, 0, 1.25, -0.35, f.status, lit, [{ w: 0.95, d: 1.0, x: -0.35, z: 0 }, { w: 0.95, d: 1.0, x: 0.85, z: -0.25 }]);
      });
    }
    build();
    var mosqueTop = 0.12 + Math.max(0, (floors.mosque || []).length - 1) * FH;
    var portal = arch(-1.15, 1.2, Math.max(1.0, mosqueTop * 0.78), 0.82, 0xc9a865);
    // crescent finial on mosque
    var fin = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 8, 24, Math.PI * 1.4), new THREE.MeshStandardMaterial({ color: 0xd9bd84, metalness: 0.7, roughness: 0.3, emissive: 0x6b5220, emissiveIntensity: 0.6 }));
    fin.position.set(-1.15, mosqueTop + 0.32, 0.55); fin.rotation.z = 0.6; root.add(fin);
    var finPole = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.2, 6), fin.material); finPole.position.set(-1.15, mosqueTop + 0.16, 0.55); root.add(finPole);

    // Stars (night)
    var starGeo = new THREE.BufferGeometry(), sp = [];
    for (var i = 0; i < 500; i++) { var r = 30 + Math.random() * 30, th = Math.random() * Math.PI * 2, ph = Math.random() * Math.PI * 0.45; sp.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) + 2, r * Math.sin(ph) * Math.sin(th)); }
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
    var stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.7 }));
    scene.add(stars);

    function setTheme(theme) {
      var night = theme !== "light";
      if (night !== lit) { lit = night; build(); }
      stars.visible = night;
      hemi.color.set(night ? 0x9fb8e0 : 0xdcecff); hemi.groundColor.set(night ? 0x0b1d14 : 0x6c8a52); hemi.intensity = night ? 0.55 : 0.95;
      sun.color.set(night ? 0xa9c4ff : 0xfff3df); sun.intensity = night ? 0.45 : 1.1;
      groundMat.color.set(night ? 0x0f2a22 : 0x9dbd7f);
      treeMat.color.set(night ? 0x24563a : 0x4f8a3e);
      ringMat.opacity = night ? 0.25 : 0.35; ringMat.color.set(night ? 0x8cc05a : 0x4e7a2a);
      glowLight.intensity = night ? 0.9 : 0;
      scene.fog = new THREE.Fog(night ? 0x06182a : 0xeef4e8, 12, 30);
    }
    setTheme(opts.theme || "dark");

    // Camera rig
    var target = new THREE.Vector3(0.1, mode === "hero" ? 1.45 : 1.5, 0);
    var radius = mode === "hero" ? 12.5 : 11, angle = mode === "hero" ? 0.62 : 0.75, elev = mode === "hero" ? 0.26 : 0.32;
    var mx = 0, my = 0, tmx = 0, tmy = 0;
    var auto = !reduced;
    function place() {
      var a = angle + mx * 0.25, e = elev + my * 0.08;
      camera.position.set(target.x + Math.sin(a) * radius * Math.cos(e), target.y + Math.sin(e) * radius, target.z + Math.cos(a) * radius * Math.cos(e));
      camera.lookAt(target);
    }
    function resize() {
      var w = canvas.clientWidth || canvas.parentNode.clientWidth, h = canvas.clientHeight || canvas.parentNode.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h;
      if (mode === "hero") {
        // shift composition so the building sits on the visual "end" side
        var rtl = document.documentElement.dir === "rtl";
        var off = w > 760 ? (rtl ? -1 : 1) * 0.2 : 0;
        camera.setViewOffset(w, h, -off * w, w > 760 ? 0 : h * 0.18, w, h);
        radius = w < 760 ? 14.5 : 12.5;
      }
      camera.updateProjectionMatrix(); place(); render();
    }
    function onMove(ev) {
      var r = canvas.getBoundingClientRect();
      tmx = ((ev.clientX - r.left) / r.width - 0.5) * 2; tmy = ((ev.clientY - r.top) / r.height - 0.5) * 2;
    }
    var host = mode === "hero" ? canvas.parentNode : canvas;
    host.addEventListener("pointermove", onMove);

    // Picking (tracker)
    var ray = new THREE.Raycaster(), v2 = new THREE.Vector2(), selected = null;
    function pick(ev) {
      var r = canvas.getBoundingClientRect();
      v2.x = ((ev.clientX - r.left) / r.width) * 2 - 1; v2.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(v2, camera);
      var hits = ray.intersectObjects(pickables, false);
      if (hits.length) { var u = hits[0].object.userData; setSelected(u.kind, u.idx); if (opts.onPick) opts.onPick(u.kind, u.idx); }
    }
    if (mode === "tracker") canvas.addEventListener("click", pick);
    function setSelected(kind, idx) {
      selected = kind ? { kind: kind, idx: idx } : null;
      ["mosque", "academic"].forEach(function (k) { buildings[k].forEach(function (g, i) { g.userData.lift = (selected && selected.kind === k && selected.idx === i) ? 1 : 0; }); });
      render();
    }

    // Assembly animation for tracker: floors rise in on first view
    var t0 = performance.now(), assembled = reduced || mode === "hero";
    var running = false, visible = true, raf = 0, last = 0;
    function render() { renderer.render(scene, camera); }
    function frame(now) {
      raf = 0; if (!running) return;
      var dt = Math.min(64, now - (last || now)); last = now;
      mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
      if (auto) angle += dt * (mode === "hero" ? 0.00006 : 0.00004);
      var tt = (now - t0) / 1000;
      ["mosque", "academic"].forEach(function (k) {
        buildings[k].forEach(function (g, i) {
          var target = (g.userData.lift || 0) * 0.12;
          if (!assembled) { var p = Math.min(1, Math.max(0, (tt - i * 0.12 - (k === "academic" ? 0.4 : 0)) / 0.6)); var ease = 1 - Math.pow(1 - p, 3); g.position.y = (1 - ease) * 1.6 + target; g.visible = p > 0; }
          else { g.position.y += (target - g.position.y) * 0.15; g.visible = true; }
          g.children.forEach(function (c) { if (c.userData.pulse) c.material.opacity = 0.55 + Math.sin(now / 300) * 0.4; });
        });
      });
      if (!assembled && tt > 3) assembled = true;
      stars.rotation.y += dt * 0.000005;
      place(); render();
      raf = requestAnimationFrame(frame);
    }
    function start() { if (running || !visible || document.hidden) return; running = true; last = 0; raf = requestAnimationFrame(frame); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
    var io = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; visible ? start() : stop(); }, { threshold: 0.01 });
    io.observe(canvas);
    function vis() { document.hidden ? stop() : start(); }
    document.addEventListener("visibilitychange", vis);
    var ro = new ResizeObserver(resize); ro.observe(canvas);
    resize(); start();

    return {
      setTheme: function (t) { setTheme(t); render(); },
      setFloors: function (f) { floors = f; build(); render(); },
      setSelected: setSelected,
      relayout: resize,
      destroy: function () {
        stop(); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", vis);
        host.removeEventListener("pointermove", onMove); canvas.removeEventListener("click", pick);
        renderer.dispose();
      }
    };
  }
  window.IBT3D = { mount: mount, supported: function () { return !!window.THREE && webglOK(); }, lowEnd: lowEnd };
})();
