// Canales: baraja de cartas. Una encima y el resto.
(function () {
  const baraja = document.querySelector('.canales-baraja');
  if (!baraja) return;

  const mesa = baraja.closest('.canales-mesa');
  const naipes = Array.from(baraja.querySelectorAll('.canal-naipe'));
  const puntos = Array.from(document.querySelectorAll('.canales-punto'));
  const flechas = Array.from(document.querySelectorAll('.canales-flecha'));
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
  const SALIDA = 280;
  let orden = naipes.slice();
  let ocupado = false;

  function pintar() {
    orden.forEach((naipe, i) => {
      naipe.dataset.pos = i;
      const arriba = i === 0;
      naipe.setAttribute('aria-hidden', arriba ? 'false' : 'true');
      naipe.querySelectorAll('a').forEach((a) => (a.tabIndex = arriba ? 0 : -1));
    });
    const actual = orden[0].dataset.canal;
    if (mesa) mesa.dataset.canal = actual; // Color de la seccion acorde con la carta
    puntos.forEach((p) => p.setAttribute('aria-pressed', String(p.dataset.canal === actual)));
  }
  
  function animar(naipe, clase, nuevoOrden) {
    if (sinMovimiento.matches) {
      orden = nuevoOrden;
      pintar();
      return;
    }
    ocupado = true;
    naipe.classList.add(clase);
    setTimeout(() => {
      orden = nuevoOrden;
      naipe.classList.remove(clase);
      pintar();
      setTimeout(() => (ocupado = false), 220);
    }, SALIDA);
  }

  function sacar(naipe) {
    if (ocupado || naipe === orden[0]) return;
    animar(naipe, 'sacando', [naipe].concat(orden.filter((n) => n !== naipe)));
  }

  function siguiente() {
    if (ocupado) return;
    const arriba = orden[0];
    animar(arriba, 'descartando', orden.slice(1).concat(arriba));
  }

  function anterior() {
    sacar(orden[orden.length - 1]);
  }

  naipes.forEach((naipe) => {
    naipe.addEventListener('click', (e) => {
      if (naipe === orden[0]) return;
      e.preventDefault();
      sacar(naipe);
    });
  });

  puntos.forEach((p) => {
    p.addEventListener('click', () => {
      const naipe = naipes.find((n) => n.dataset.canal === p.dataset.canal);
      if (naipe) sacar(naipe);
    });
  });

  flechas.forEach((f) => {
    f.addEventListener('click', () => (f.dataset.dir === '1' ? siguiente() : anterior()));
  });

  baraja.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); siguiente(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); anterior(); }
  });

  // Deslizar en pantallas táctiles
  let inicioX = null;
  let inicioY = null;
  baraja.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    inicioX = e.clientX;
    inicioY = e.clientY;
  });
  baraja.addEventListener('pointerup', (e) => {
    if (inicioX === null) return;
    const dx = e.clientX - inicioX;
    const dy = e.clientY - inicioY;
    inicioX = inicioY = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) siguiente();
    else anterior();
  });
  baraja.addEventListener('pointercancel', () => (inicioX = inicioY = null));

  pintar();
})();
