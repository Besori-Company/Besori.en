(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var T = 36 * Math.PI / 180;
  var MARGEN = 8;
  var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
  var conRaton = window.matchMedia('(hover: hover)');

  function n(v) { return Math.round(v * 100) / 100; }
  function lim(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function suave(v) { return v * v * (3 - 2 * v); }
  function sale(v) { return 1 - Math.pow(1 - v, 3); }

  function cadena(piezas, cuellos, cy) {
    var d = '', grupo = [], ci = [];
    function A(r, x, y) { return 'A' + n(r) + ' ' + n(r) + ' 0 0 1 ' + n(x) + ' ' + n(y); }
    function dibuja(g, cs) {
      var s = '';
      g.forEach(function (e, k) {
        var izq = k > 0, der = k < g.length - 1;
        var lx = izq ? e.xl - e.r * Math.cos(T) : e.xl - e.r, ly = izq ? cy - e.r * Math.sin(T) : cy;
        if (k === 0) s += 'M' + n(lx) + ' ' + n(ly);
        s += A(e.r, e.xl, cy - e.r) + 'H' + n(e.xr);
        var rx = der ? e.xr + e.r * Math.cos(T) : e.xr + e.r, ry = der ? cy - e.r * Math.sin(T) : cy;
        s += A(e.r, rx, ry);
        if (der) {
          var f = g[k + 1], w = cs[k];
          var bx = f.xl - f.r * Math.cos(T), by = cy - f.r * Math.sin(T);
          var mx = ((e.xr + e.r) + (f.xl - f.r)) / 2;
          s += 'C' + n(rx + (mx - rx) * .6) + ' ' + n(cy - w) + ' ' + n(bx - (bx - mx) * .6) + ' ' + n(cy - w) + ' ' + n(bx) + ' ' + n(by);
        }
      });
      for (var k = g.length - 1; k >= 0; k--) {
        var e = g[k], izq = k > 0;
        s += A(e.r, e.xr, cy + e.r) + 'H' + n(e.xl);
        var lx = izq ? e.xl - e.r * Math.cos(T) : e.xl - e.r, ly = izq ? cy + e.r * Math.sin(T) : cy;
        s += A(e.r, lx, ly);
        if (izq) {
          var p = g[k - 1], w = cs[k - 1];
          var rx = p.xr + p.r * Math.cos(T), ry = cy + p.r * Math.sin(T);
          var mx = ((p.xr + p.r) + (e.xl - e.r)) / 2;
          s += 'C' + n(lx - (lx - mx) * .6) + ' ' + n(cy + w) + ' ' + n(rx + (mx - rx) * .6) + ' ' + n(cy + w) + ' ' + n(rx) + ' ' + n(ry);
        }
      }
      return s + 'Z';
    }
    piezas.forEach(function (e, i) {
      grupo.push(e);
      if (i < piezas.length - 1 && cuellos[i] > 0) { ci.push(cuellos[i]); return; }
      d += dibuja(grupo, ci); grupo = []; ci = [];
    });
    return d;
  }

  function preparar(chip) {
    var texto = chip.querySelector('.tipo-chip__texto');
    if (!texto) return;
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'tipo-chip__forma');
    svg.setAttribute('aria-hidden', 'true');
    var id = 'tipo-chip-' + Math.random().toString(36).slice(2, 8);
    svg.innerHTML = '<defs><linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" style="stop-color: var(--chip-oscuro)"/><stop offset="0" style="stop-color: var(--chip-medio)"/>' +
      '<stop offset="0" style="stop-color: var(--chip-capsula)"/><stop offset="1" style="stop-color: var(--chip-capsula-fin)"/></linearGradient></defs>' +
      '<path fill="url(#' + id + ')"/>';
    chip.insertBefore(svg, chip.firstChild);
    var grad = svg.querySelector('linearGradient'), stops = grad.querySelectorAll('stop'), path = svg.querySelector('path');
    var m = {}, p = 0, v = 0, objetivo = 0, anim = false;

    function medir() {
      var H = chip.offsetHeight;
      m.H = H; m.R = H / 2; m.cy = MARGEN + H / 2;
      m.capX = texto.offsetLeft; m.capW = texto.offsetWidth;
      m.g0 = H * 0.11; m.gF = m.capX - H;
      m.W = m.capX + m.capW + H * 0.3;
      svg.setAttribute('width', n(m.W + 2 * MARGEN));
      svg.setAttribute('height', n(H + 2 * MARGEN));
      svg.setAttribute('viewBox', '0 0 ' + n(m.W + 2 * MARGEN) + ' ' + n(H + 2 * MARGEN));
      grad.setAttribute('x1', MARGEN); grad.setAttribute('x2', n(MARGEN + m.capX + m.capW));
      var total = m.capX + m.capW;
      stops[1].setAttribute('offset', n(H * 0.9 / total));
      stops[2].setAttribute('offset', n((H + m.g0) / total));
    }

    function pintar() {
      var R = m.R, H = m.H;
      var a = suave(lim(p / 0.32));
      var b = sale(lim((p - 0.26) / 0.42));
      var c = suave(lim((p - 0.62) / 0.38));
      var gap = m.g0 + (m.gF - m.g0) * c;
      var rc = R * a;
      var largo = (m.capW - 2 * R) * b;
      var cuello = rc > 0.5 ? Math.min(R, rc) * 0.42 * (a < 1 ? a : 1) * (1 - c / 0.7) : 0;
      var piezas = [{ xl: MARGEN + R, xr: MARGEN + R, r: R }];
      if (rc > 0.3) {
        var x0 = MARGEN + 2 * R + gap;
        piezas.push({ xl: x0 + rc, xr: x0 + rc + Math.max(largo, 0), r: rc });
      }
      path.setAttribute('d', cadena(piezas, [cuello], m.cy));
      var t = suave(lim((p - 0.5) / 0.35));
      texto.style.setProperty('--chip-p', n(t));
      texto.style.setProperty('--chip-mueve', n(gap - m.gF) + 'px');
    }

    function paso() {
      var dt = 1 / 60;
      var k = objetivo ? 55 : 80, amort = 2 * Math.sqrt(k);
      v += (k * (objetivo - p) - amort * v) * dt;
      p += v * dt;
      if (Math.abs(objetivo - p) < 0.002 && Math.abs(v) < 0.002) { p = objetivo; v = 0; anim = false; pintar(); return; }
      pintar();
      requestAnimationFrame(paso);
    }

    function ir(o) {
      objetivo = o;
      if (sinMovimiento.matches) { p = o; pintar(); return; }
      if (!anim) { anim = true; requestAnimationFrame(paso); }
    }

    medir();
    p = objetivo = conRaton.matches ? 0 : 1;
    pintar();
    chip.classList.add('tipo-chip--lista');

    var zona = chip.closest('.tool-card') || chip;
    zona.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') ir(1); });
    zona.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') ir(0); });
    zona.addEventListener('focusin', function () { ir(1); });
    zona.addEventListener('focusout', function () { if (conRaton.matches) ir(0); });
    conRaton.addEventListener('change', function () { ir(conRaton.matches ? 0 : 1); });
    if (document.fonts) document.fonts.ready.then(function () { medir(); pintar(); });
    window.addEventListener('resize', function () { medir(); pintar(); });
  }

  document.querySelectorAll('.tipo-chip').forEach(preparar);
})();
