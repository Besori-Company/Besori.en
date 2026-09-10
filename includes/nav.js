// ==================== NAVIGATION ====================
(() => {
    const ENLACES = [
        { texto: 'Home',     href: '/index.html' },
        { texto: 'Catalog',  href: '/pages/catalog.html' },
        { texto: 'About us', href: '/pages/aboutus.html' },
    ];

    const MOVIL = window.matchMedia('(max-width: 750px)');
    const HOLGURA = 24;
    const LATERAL_MIN = 44;

    const enlacesHTML = () => ENLACES
        .map(({ texto, href }) => `<a href="${href}">${texto}</a>`)
        .join('');

    const raiz = document.getElementById('nav-placeholder');
    raiz.innerHTML = `
    <nav class="barra-nav" role="navigation" aria-label="Main menu">
        <div class="nav_contenedor">
            <button class="nav_burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav_panel">
                <svg class="nav_burger_ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <circle cx="12" cy="3.6" r="2.1"/>
                    <circle cx="20.4" cy="12" r="2.1"/>
                    <circle cx="12" cy="20.4" r="2.1"/>
                    <circle cx="3.6" cy="12" r="2.1"/>
                    <circle cx="12" cy="12" r="2.1"/>
                </svg>
            </button>

            <div class="nav_enlaces">${enlacesHTML()}</div>

            <button class="btn_usuario" aria-label="User account">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="usuario_icono">
                    <circle cx="12" cy="7" r="4"/>
                    <path d="M6 21v-2a6 6 0 0 1 12 0v2"/>
                </svg>
                <span class="btn_texto">Account</span>
            </button>
        </div>
    </nav>

    <div class="nav_panel" id="nav_panel">${enlacesHTML()}</div>
`;

    const barra = raiz.querySelector('.barra-nav');
    const contenedor = raiz.querySelector('.nav_contenedor');
    const enlaces = raiz.querySelector('.nav_enlaces');
    const burger = raiz.querySelector('.nav_burger');
    const cuenta = raiz.querySelector('.btn_usuario');
    const panel = raiz.querySelector('.nav_panel');

    function anchoEnlaces() {
        const previo = enlaces.getAttribute('style') || '';
        enlaces.style.cssText = 'display:flex;position:absolute;visibility:hidden;white-space:nowrap;';
        const ancho = enlaces.scrollWidth;
        enlaces.setAttribute('style', previo);
        return ancho;
    }

    function ajustarModo() {
        const disponible = contenedor.clientWidth;
        if (!disponible) return;
        const lateral = Math.max(cuenta.offsetWidth, LATERAL_MIN);
        const compacto = MOVIL.matches ||
            anchoEnlaces() + 2 * lateral + HOLGURA > disponible;
        if (compacto === raiz.classList.contains('nav_compacto')) return;
        raiz.classList.toggle('nav_compacto', compacto);
        if (!compacto) abrirPanel(false);
    }

    let ajustePendiente = false;
    function pedirAjuste() {
        if (ajustePendiente) return;
        ajustePendiente = true;
        requestAnimationFrame(() => {
            ajustePendiente = false;
            ajustarModo();
        });
    }

    const panelAbierto = () => panel.classList.contains('nav_panel_abierto');

    function colocarPanel() {
        const r = barra.getBoundingClientRect();
        panel.style.top = `${r.bottom + 10}px`;
        panel.style.left = `${r.left}px`;
        panel.style.width = `${r.width}px`;
    }

    function abrirPanel(abrir = !panelAbierto()) {
        if (abrir) colocarPanel();
        panel.classList.toggle('nav_panel_abierto', abrir);
        burger.classList.toggle('nav_burger_activo', abrir);
        burger.setAttribute('aria-expanded', String(abrir));
        burger.setAttribute('aria-label', abrir ? 'Close menu' : 'Open menu');
    }

    let fijo = false;
    function actualizarFijo() {
        const y = window.scrollY;
        if (!fijo && y > 100) fijo = true;
        else if (fijo && y < 50) fijo = false;
        if (barra.classList.contains('nav_fijo') === fijo) return false;
        barra.classList.toggle('nav_fijo', fijo);
        return true;
    }

    burger.addEventListener('click', e => {
        e.stopPropagation();
        abrirPanel();
    });

    panel.addEventListener('click', e => {
        if (e.target.closest('a')) abrirPanel(false);
    });

    document.addEventListener('click', e => {
        if (panelAbierto() && !raiz.contains(e.target)) abrirPanel(false);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && panelAbierto()) {
            abrirPanel(false);
            burger.focus();
        }
    });

    window.addEventListener('scroll', () => {
        if (actualizarFijo()) abrirPanel(false);
        else if (panelAbierto()) colocarPanel();
    }, { passive: true });

    window.addEventListener('resize', () => {
        if (panelAbierto()) colocarPanel();
    });

    new ResizeObserver(pedirAjuste).observe(contenedor);

    new MutationObserver(pedirAjuste).observe(contenedor, {
        childList: true,
        subtree: true,
        characterData: true,
    });
    MOVIL.addEventListener('change', pedirAjuste);
    document.fonts?.ready.then(ajustarModo);

    ajustarModo();
})();
