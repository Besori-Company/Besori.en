const containers = document.querySelectorAll('.producto_contenido');

containers.forEach(container => {
  container.addEventListener('mouseenter', () => {
    document.documentElement.classList.add('hover-bg');

    if (container.classList.contains('kael')) {
      document.documentElement.style.setProperty('--circle-color', 'rgba(255, 140, 0, 0.55)'); // naranja
    } else {
      document.documentElement.style.setProperty('--circle-color', 'rgba(97, 204, 174, 0.81)'); // Cloud
    }
  });

  container.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--circle-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--circle-y', `${e.clientY}px`);
    document.documentElement.style.setProperty('--circle-transform', 'translate(-50%, -50%)');
  });

  container.addEventListener('mouseleave', () => {
    document.documentElement.classList.remove('hover-bg');
  });
});