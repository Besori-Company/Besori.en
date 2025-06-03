
const containers = document.querySelectorAll('.image-container');
 containers.forEach(container => {
   container.addEventListener('mouseenter', () => {
     document.documentElement.classList.add('hover-bg');
   });
   container.addEventListener('mousemove', (e) => {
     document.documentElement.style.setProperty('--x', `${e.clientX}px`);
     document.documentElement.style.setProperty('--y', `${e.clientY}px`);
     const bg = document.documentElement;
     const before = getComputedStyle(bg, '::before');
     bg.style.setProperty('--before-top', `${e.clientY}px`);
     bg.style.setProperty('--before-left', `${e.clientX}px`);
     bg.style.setProperty('--x', `${e.clientX}px`);
     bg.style.setProperty('--y', `${e.clientY}px`);
     bg.style.setProperty('--circle-x', `${e.clientX}px`);
     bg.style.setProperty('--circle-y', `${e.clientY}px`);
     bg.style.setProperty('--circle-transform', `translate(-50%, -50%)`);
   });
   container.addEventListener('mouseleave', () => {
     document.documentElement.classList.remove('hover-bg');
   });
 });