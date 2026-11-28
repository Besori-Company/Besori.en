// ==================== NAVEGACIÓN ====================
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
        <svg class="nav_burbujas" aria-hidden="true"><path/></svg>
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
        burbujas.medir();
    }

    function abrirPanel(abrir = !panelAbierto()) {
        if (abrir) colocarPanel();
        panel.classList.toggle('nav_panel_abierto', abrir);
        burbujas.ir(abrir);
        burger.classList.toggle('nav_burger_activo', abrir);
        burger.setAttribute('aria-expanded', String(abrir));
        burger.setAttribute('aria-label', abrir ? 'Close menu' : 'Open menu');
    }

    // Burbuja
    const burbujas = (() => {
        const svg = raiz.querySelector('.nav_burbujas');
        const path = svg.querySelector('path');
        const links = [...panel.querySelectorAll('a')];
        const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
        const T = 36 * Math.PI / 180, S = Math.sin(T), C = Math.cos(T);
        const lim = v => v < 0 ? 0 : v > 1 ? 1 : v;
        const suave = v => v * v * (3 - 2 * v);
        const sale = v => 1 - Math.pow(1 - v, 3);
        const rebota = v => 1 + 2.70158 * Math.pow(v - 1, 3) + 1.70158 * Math.pow(v - 1, 2);
        const mezcla = (a, b, t) => a + (b - a) * t;
        const n = v => Math.round(v * 100) / 100;

        // Enlaces
        const ENTRA = 0.6, ESCALON = 0.05;
        const DURA = 1 - ENTRA - ESCALON * (links.length - 1);

        let g = null, anim = false, objetivo = 0, pPrevio = 0;
        const prog = { x: 0, v: 0 };
        const flan = { x: 0, v: 0 };
        const retro = { x: 0, v: 0 };

        function medir() {
            const o = svg.getBoundingClientRect();
            const b = burger.getBoundingClientRect();
            const r = panel.getBoundingClientRect();
            const radio = parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 20;
            g = {
                bx: b.left + b.width / 2 - o.left, by: b.top + b.height / 2 - o.top, rb: b.width / 2,
                L: r.left - o.left, R: r.right - o.left, T: r.top - o.top, B: r.bottom - o.top, radio,
                gota: Math.min(22, r.height / 2),
            };
            pintar();
        }

        // Rectángulo redondeado
        function caja(l, t, r, b, c) {
            c = Math.max(0, Math.min(c, (r - l) / 2, (b - t) / 2));
            return `M${n(l + c)} ${n(t)}A${n(c)} ${n(c)} 0 0 0 ${n(l)} ${n(t + c)}V${n(b - c)}` +
                `A${n(c)} ${n(c)} 0 0 0 ${n(l + c)} ${n(b)}H${n(r - c)}` +
                `A${n(c)} ${n(c)} 0 0 0 ${n(r)} ${n(b - c)}V${n(t + c)}` +
                `A${n(c)} ${n(c)} 0 0 0 ${n(r - c)} ${n(t)}Z`;
        }

        // Cuello vertical entre el botón y la gota
        function cuello(x, ya, ra, yb, rb, w) {
            const ay = ya + ra * C, by = yb - rb * C;
            if (w <= 0.5 || by - ay <= 1) return '';
            const my = ((ya + ra) + (yb - rb)) / 2;
            return `M${n(x - ra * S)} ${n(ay)}` +
                `C${n(x - w)} ${n(ay + (my - ay) * .6)} ${n(x - w)} ${n(by - (by - my) * .6)} ${n(x - rb * S)} ${n(by)}` +
                `H${n(x + rb * S)}` +
                `C${n(x + w)} ${n(by - (by - my) * .6)} ${n(x + w)} ${n(ay + (my - ay) * .6)} ${n(x + ra * S)} ${n(ay)}Z`;
        }

        function figura(p) {
            const { bx, by, L, R, T: top, B, radio, gota } = g;
            const rb = g.rb * Math.max(0.6, 1 + retro.x);
            let d = caja(bx - rb, by - rb, bx + rb, by + rb, rb);
            // 1 · el botón se estira en una lágrima larga
            const a = lim(p / 0.5);
            const cy = mezcla(by, top + gota, suave(a));
            const r = mezcla(rb * 0.8, gota, suave(a));
            // 2 · la gota se ensancha hasta ser la ventana
            const e = sale(lim((p - 0.45) / 0.5));
            const cola = (cy - by) * 0.45 * (1 - e);
            const l = mezcla(bx - r, L, e), rr = mezcla(bx + r, R, e);
            const t = mezcla(cy - r, top, e) - cola, b = mezcla(cy + r, B, e);
            // temblor: se estira en alto y encoge en ancho
            const j = flan.x, w2 = (rr - l) * (1 - j * 0.45), cx = (l + rr) / 2;
            d += caja(cx - w2 / 2, t, cx + w2 / 2, t + (b - t) * (1 + j), mezcla(r, radio, e));
            // 3 · el cuello se estrecha hasta soltarse
            d += cuello(bx, by, rb, cy - cola, r, r * 0.6 * (1 - suave(lim((p - 0.45) / 0.2))));
            return d;
        }

        // Golpes de los muelles secundarios al cruzar un umbral
        function golpes(p) {
            if (pPrevio < 0.65 && p >= 0.65) retro.v -= 4.5;      // suelta la gota
            else if (pPrevio > 0.65 && p <= 0.65) retro.v += 2.2; // la recoge
            if (pPrevio < 0.92 && p >= 0.92) flan.v += 0.5;       // aterriza la ventana
            pPrevio = p;
        }

        function pintar() {
            if (!g) return;
            const p = prog.x;
            const activo = p > 0.001 || Math.abs(retro.x) > 0.002;
            raiz.classList.toggle('nav_brotando', activo);
            path.setAttribute('d', activo ? figura(p) : '');
            links.forEach((a, i) => {
                const t = lim((p - ENTRA - i * ESCALON) / DURA);
                a.style.opacity = n(suave(t));
                a.style.transform = `translateX(${n((1 - (t > 0 ? rebota(t) : 0)) * -12)}px)`;
            });
        }

        function muelle(m, obj, k, z, dt) {
            m.v += (k * (obj - m.x) - 2 * z * Math.sqrt(k) * m.v) * dt;
            m.x += m.v * dt;
            return Math.abs(obj - m.x) < 0.002 && Math.abs(m.v) < 0.002;
        }

        function paso() {
            const dt = 1 / 60;
            const quietoP = muelle(prog, objetivo, objetivo ? 42 : 70, 1, dt);
            if (quietoP) { prog.x = objetivo; prog.v = 0; }
            golpes(prog.x);
            const quietoF = muelle(flan, 0, 220, 0.45, dt);
            const quietoR = muelle(retro, 0, 320, 0.25, dt);
            pintar();
            if (quietoP && quietoF && quietoR) { flan.x = retro.x = 0; anim = false; pintar(); return; }
            requestAnimationFrame(paso);
        }

        function ir(abrir) {
            if (abrir) medir();
            objetivo = abrir ? 1 : 0;
            if (sinMovimiento.matches) { prog.x = pPrevio = objetivo; prog.v = 0; pintar(); return; }
            if (!anim) { anim = true; requestAnimationFrame(paso); }
        }

        return { medir, ir };
    })();

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
