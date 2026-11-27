(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var T = 36 * Math.PI / 180;
  var M = 10;
  var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
  var conRaton = window.matchMedia('(hover: hover)');

  function n(v) { return Math.round(v * 100) / 100; }
  function lim(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function suave(v) { return v * v * (3 - 2 * v); }

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
          var f = g[k + 1], w = cs[k], bx = f.xl - f.r * Math.cos(T), by = cy - f.r * Math.sin(T), mx = ((e.xr + e.r) + (f.xl - f.r)) / 2;
          s += 'C' + n(rx + (mx - rx) * .6) + ' ' + n(cy - w) + ' ' + n(bx - (bx - mx) * .6) + ' ' + n(cy - w) + ' ' + n(bx) + ' ' + n(by);
        }
      });
      for (var k = g.length - 1; k >= 0; k--) {
        var e = g[k], izq = k > 0;
        s += A(e.r, e.xr, cy + e.r) + 'H' + n(e.xl);
        var lx = izq ? e.xl - e.r * Math.cos(T) : e.xl - e.r, ly = izq ? cy + e.r * Math.sin(T) : cy;
        s += A(e.r, lx, ly);
        if (izq) {
          var q = g[k - 1], w = cs[k - 1], rx = q.xr + q.r * Math.cos(T), ry = cy + q.r * Math.sin(T), mx = ((q.xr + q.r) + (e.xl - e.r)) / 2;
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

  function preparar(b) {
    var estilo = getComputedStyle(b);
    var fondo = estilo.backgroundColor;
    var bola = estilo.getPropertyValue('--brota-bola').trim() || fondo;
    var colorFlecha = estilo.getPropertyValue('--brota-flecha').trim() || estilo.color;

    var flecha = document.createElement('span');
    flecha.className = 'brota__flecha';
    flecha.setAttribute('aria-hidden', 'true');
    var icono = b.querySelector('svg');
    if (icono) flecha.appendChild(icono);
    flecha.style.color = colorFlecha;

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'brota__forma');
    svg.setAttribute('aria-hidden', 'true');
    var id = 'brota-' + Math.random().toString(36).slice(2, 8);
    svg.innerHTML = '<defs><linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="0" x2="1" y1="0" y2="0">' +
      '<stop offset="0" stop-color="' + fondo + '"/><stop offset="0" stop-color="' + fondo + '"/>' +
      '<stop offset="0" stop-color="' + bola + '"/><stop offset="1" stop-color="' + bola + '"/></linearGradient></defs>' +
      '<path fill="url(#' + id + ')"/>';
    b.insertBefore(svg, b.firstChild);
    b.appendChild(flecha);
    b.classList.add('brota--lista');

    var grad = svg.querySelector('linearGradient'), st = grad.querySelectorAll('stop'), path = svg.querySelector('path');
    var m = {}, p = 0, v = 0, objetivo = 0, anim = false, recogiendo = false;

    function medir() {
      var H = b.offsetHeight, W = b.offsetWidth;
      m.H = H; m.R = H / 2; m.W = W; m.cy = M + H / 2; m.g0 = H * 0.1; m.gF = H * 0.28;
      var ancho = W + m.gF + H + 20;
      svg.setAttribute('width', n(ancho + 2 * M));
      svg.setAttribute('height', n(H + 2 * M));
      svg.setAttribute('viewBox', '0 0 ' + n(ancho + 2 * M) + ' ' + n(H + 2 * M));
      var fin = W + m.gF + H;
      grad.setAttribute('x1', M);
      grad.setAttribute('x2', n(M + fin));
      st[1].setAttribute('offset', n((W - 2) / fin));
      st[2].setAttribute('offset', n((W + m.g0 + 2) / fin));
      flecha.style.width = flecha.style.height = H + 'px';
    }

    function pintar() {
      var R = m.R;
      var a = lim(p / 0.4), c = suave(lim((p - 0.5) / 0.5));
      var r = R * (suave(a) + 0.08 * Math.sin(Math.PI * a));
      var hueco = m.g0 + (m.gF - m.g0) * c;
      var cuello = r > 0.5 ? Math.min(R, r) * 0.42 * suave(a) * (1 - c / 0.7) : 0;
      var f = suave(lim((p - 0.3) / 0.45));
      if (recogiendo) {
        r = R * suave(lim(p / 0.85));
        hueco = m.gF + (R - r) * 0.5;
        cuello = 0;
        f = suave(lim((p - 0.25) / 0.6));
      }
      var piezas = [{ xl: M + R, xr: M + m.W - R, r: R }];
      if (r > 0.3) piezas.push({ xl: M + m.W + hueco + r, xr: M + m.W + hueco + r, r: r });
      path.setAttribute('d', cadena(piezas, [cuello], m.cy));
      flecha.style.left = n(m.W + hueco + (r - R)) + 'px';
      flecha.style.setProperty('--brota-f', n(f));
    }

    function paso() {
      var dt = 1 / 60, k = objetivo ? 60 : 85, amort = 2 * Math.sqrt(k);
      v += (k * (objetivo - p) - amort * v) * dt;
      p += v * dt;
      if (Math.abs(objetivo - p) < 0.002 && Math.abs(v) < 0.002) { p = objetivo; v = 0; anim = false; if (p === 0) recogiendo = false; pintar(); return; }
      pintar();
      requestAnimationFrame(paso);
    }

    function ir(o) {
      if (o === 0 && p > 0.5) recogiendo = true;
      if (o === 1 && recogiendo && p < 0.6) { recogiendo = false; p = 0; v = 0; }
      objetivo = o;
      if (sinMovimiento.matches) { p = o; recogiendo = false; pintar(); return; }
      if (!anim) { anim = true; requestAnimationFrame(paso); }
    }

    medir();
    p = objetivo = conRaton.matches ? 0 : 1;
    pintar();
    var zona = b.closest('.ct-main, a.tool-card') || b;
    zona.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') ir(1); });
    zona.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') ir(0); });
    zona.addEventListener('focusin', function () { ir(1); });
    zona.addEventListener('focusout', function () { if (conRaton.matches) ir(0); });
    if (document.fonts) document.fonts.ready.then(function () { medir(); pintar(); });
    window.addEventListener('resize', function () { medir(); pintar(); });
  }

  document.querySelectorAll('.brota').forEach(preparar);
})();
