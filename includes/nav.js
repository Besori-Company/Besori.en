// ==================== NAVIGATION ====================
document.getElementById("nav-placeholder").innerHTML = `
    <nav class="barra-nav" role="navigation" aria-label="Main menu">
        <div class="nav_contenedor">
            <div class="nav_enlaces">
                <a href="/index.html">Home</a>
                <a href="/pages/catalog.html">Catalog</a>
                <a href="/pages/aboutus.html">About us</a>
            </div>

            <button class="btn_usuario" aria-label="User account">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="usuario_icono">
                    <circle cx="12" cy="7" r="4"/>
                    <path d="M6 21v-2a6 6 0 0 1 12 0v2"/>
                </svg>
                <span class="btn_texto">Account</span>
            </button>
        </div>
    </nav>
`;

// ==================== FLOATING NAVIGATION ====================
const nav = document.querySelector('.barra-nav');
let navFijo = false;
window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    if (!navFijo && y > 100) navFijo = true;
    else if (navFijo && y < 50) navFijo = false;
    nav.classList.toggle('nav_fijo', navFijo);
});
