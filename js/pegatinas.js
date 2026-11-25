/* Iconos como pegatinas: duplica el trazo del icono como silueta de color detrás */
document.querySelectorAll('.titulo_ico').forEach(function (ico) {
  var svg = ico.querySelector('svg');
  if (!svg || svg.querySelector('.peg-fondo')) return;
  var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', 'peg-fondo');
  Array.from(svg.children).forEach(function (n) { g.appendChild(n.cloneNode(true)); });
  svg.insertBefore(g, svg.firstChild);
  ico.classList.add('pegatina');
});
