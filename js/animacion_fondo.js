const containers = document.querySelectorAll('.producto_contenido');
let isAnimating = false;
let currentColor = null;

containers.forEach(container => {
  container.addEventListener('mouseenter', () => {
    const root = document.documentElement;
    
    let newColor;

    if (container.classList.contains('kael')) {
      newColor = 'rgba(255, 140, 0, 0.55)';
    } else if (container.classList.contains('cloud')) {
      newColor = 'rgba(97, 204, 174, 0.81)';
    }
    
    if (isAnimating || newColor === currentColor) {
      return;
    }
    
    isAnimating = true;
    
    root.classList.remove('hover-bg');
    
    setTimeout(() => {
      root.style.setProperty('--circle-color', newColor);
      currentColor = newColor;
      
      root.classList.add('hover-bg');
      
      setTimeout(() => {
        isAnimating = false;
      }, 200);
      
    }, 500);
  });

  container.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--circle-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--circle-y', `${e.clientY}px`);
  });

  container.addEventListener('mouseleave', () => {
    const root = document.documentElement;
    root.classList.remove('hover-bg');
    
    setTimeout(() => {
      isAnimating = false;
      currentColor = null;
    }, 200);
  });
});