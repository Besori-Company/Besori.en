const containers = document.querySelectorAll('.producto_contenido');
let isAnimating = false;
let currentColor = null;
let animationTimeout = null;
let expandTimeout = null;

containers.forEach(container => {
  container.addEventListener('mouseenter', () => {
    const root = document.documentElement;
    
    const newColor = container.classList.contains('kael') 
      ? 'rgba(255, 140, 0, 0.55)' 
      : 'rgba(97, 204, 174, 0.81)';
    
    if (isAnimating || newColor === currentColor) {
      return;
    }
    
    isAnimating = true;
    
    root.classList.remove('hover-bg');
    
    animationTimeout = setTimeout(() => {
      root.style.setProperty('--circle-color', newColor);
      currentColor = newColor;
      
      root.classList.add('hover-bg');
      
      expandTimeout = setTimeout(() => {
        isAnimating = false;
      }, 200);
      
    }, 400);
  });

  container.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--circle-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--circle-y', `${e.clientY}px`);
  });

  container.addEventListener('mouseleave', () => {
    const root = document.documentElement;
    
    if (animationTimeout) {
      clearTimeout(animationTimeout);
      animationTimeout = null;
    }
    
    if (expandTimeout) {
      clearTimeout(expandTimeout);
      expandTimeout = null;
    }
    
    root.classList.remove('hover-bg');
    
    isAnimating = false;
    currentColor = null;
  });
});