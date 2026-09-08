// ==================== HYPRDESK ====================

const lightbox = document.createElement('div');
lightbox.className = 'hd-lightbox';
lightbox.innerHTML = `
    <button class="hd-lightbox__cerrar" aria-label="Close">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <img class="hd-lightbox__img" src="" alt="">
`;
document.body.appendChild(lightbox);

const lbImg = lightbox.querySelector('.hd-lightbox__img');

function abrirLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt;
    lightbox.style.display = 'flex';
    requestAnimationFrame(() => lightbox.classList.add('hd-lightbox--visible'));
    document.body.style.overflow = 'hidden';
}

function cerrarLightbox() {
    lightbox.classList.remove('hd-lightbox--visible');
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }, 250);
}

document.querySelectorAll('.hd-feature__media img').forEach(img => {
    img.addEventListener('click', () => abrirLightbox(img.src, img.alt));
});

lightbox.addEventListener('click', e => { if (e.target !== lbImg) cerrarLightbox(); });
lightbox.querySelector('.hd-lightbox__cerrar').addEventListener('click', cerrarLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarLightbox(); });

const descargas = document.querySelector('.hd-descargas');
const descargasToggle = descargas.querySelector('.hd-descargas__toggle');

function cerrarDescargas() {
    descargas.classList.remove('is-open');
    descargasToggle.setAttribute('aria-expanded', 'false');
}

descargasToggle.addEventListener('click', e => {
    e.stopPropagation();
    const abierto = descargas.classList.toggle('is-open');
    descargasToggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
});

document.addEventListener('click', e => {
    if (!descargas.contains(e.target)) cerrarDescargas();
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarDescargas(); });

descargas.querySelectorAll('.hd-descargas__item').forEach(item => {
    item.addEventListener('click', cerrarDescargas);
});

const copyBtn = document.querySelector('.hd-install__copy');
copyBtn.addEventListener('click', () => {
    const text = document.querySelector('.hd-install__code code').textContent;
    navigator.clipboard.writeText(text).then(() => {
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 2000);
    });
});
