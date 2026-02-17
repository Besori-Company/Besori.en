// ==================== NAVIGATION ====================
document.getElementById("nav-placeholder").innerHTML = `
    <nav class="barra-nav" role="navigation" aria-label="Main menu">
        <div class="nav_contenedor">
            <div class="nav_enlaces">
                <a href="/Besori.en/index.html">Home</a>
                <a href="/Besori.en/pages/aboutus.html">About us</a>
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

    <!-- Authentication modal -->
    <div class="modal_overlay" id="modal-auth">
        <div class="modal_contenido">
            <button class="modal_cerrar" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>

            <div class="auth_tabs">
                <button class="auth_tab auth_tab-activo" data-tab="login">Sign In</button>
                <button class="auth_tab" data-tab="registro">Sign Up</button>
            </div>

            <!-- Login Form -->
            <form class="auth_form auth_form-activo" id="form-login">
                <h2 class="auth_titulo">Welcome back</h2>
                
                <div class="form_grupo">
                    <label for="login-email" class="form_label">Email address</label>
                    <input type="email" id="login-email" class="form_input" placeholder="you@email.com" required>
                </div>

                <div class="form_grupo">
                    <label for="login-password" class="form_label">Password</label>
                    <div class="input_password">
                        <input type="password" id="login-password" class="form_input" placeholder="••••••••" required>
                        <button type="button" class="btn_ver_password" aria-label="Show password">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="form_extras">
                    <label class="checkbox_label">
                        <input type="checkbox" id="recordar">
                        <span>Remember me</span>
                    </label>
                    <!-- <a href="#" class="link_recuperar">Forgot your password?</a> -->
                </div>

                <button type="submit" class="btn_submit">Sign In</button>

                <div class="auth_divider"><span>or continue with</span></div>

                <div class="auth_redes">
                    <button type="button" class="btn_red btn_google">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                    </button>
                </div>
            </form>

            <!-- Sign Up Form -->
            <form class="auth_form" id="form-registro">
                <h2 class="auth_titulo">Create a new account</h2>
                
                <div class="form_grupo">
                    <label for="registro-nombre" class="form_label">Full name</label>
                    <input type="text" id="registro-nombre" class="form_input" placeholder="Your name" required>
                </div>

                <div class="form_grupo">
                    <label for="registro-email" class="form_label">Email address</label>
                    <input type="email" id="registro-email" class="form_input" placeholder="you@email.com" required>
                </div>

                <div class="form_grupo">
                    <label for="registro-password" class="form_label">Password</label>
                    <div class="input_password">
                        <input type="password" id="registro-password" class="form_input" placeholder="Minimum 8 characters" required minlength="8">
                        <button type="button" class="btn_ver_password" aria-label="Show password">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                    <small class="form_ayuda">Must be at least 8 characters</small>
                </div>

                <div class="form_grupo">
                    <label for="registro-password-confirmar" class="form_label">Confirm password</label>
                    <div class="input_password">
                        <input type="password" id="registro-password-confirmar" class="form_input" placeholder="Repeat your password" required minlength="8">
                        <button type="button" class="btn_ver_password" aria-label="Show password">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="form_grupo">
                    <label class="checkbox_label">
                        <input type="checkbox" id="terminos" required>
                        <span style="font-size: 1.5rem;">I accept the <a href="/Besori.en/pages/terms.html">terms and conditions</a></span>
                    </label>
                </div>

                <button type="submit" class="btn_submit">Create account</button>

                <div class="auth_divider"><span>or continue with</span></div>

                <div class="auth_redes">
                    <button type="button" class="btn_red btn_google_registro">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                    </button>
                </div>
            </form>
        </div>
    </div>
`;

// ==================== FLOATING NAVIGATION ====================
const nav = document.querySelector('.barra-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        nav.classList.add('nav_fijo');
    } else {
        nav.classList.remove('nav_fijo');
    }
    lastScroll = currentScroll;
});

// ==================== AUTHENTICATION MODAL ====================

const modal = document.getElementById('modal-auth');
const btnUsuario = document.querySelector('.btn_usuario');
const btnCerrar = document.querySelector('.modal_cerrar');
const tabs = document.querySelectorAll('.auth_tab');
const forms = document.querySelectorAll('.auth_form');

btnUsuario.addEventListener('click', async () => {
    try {
        const { auth } = await import('/Besori.en/includes/firebase.js');
        const currentUser = auth.currentUser;
        if (!currentUser) {
            modal.classList.add('modal_activo');
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        modal.classList.add('modal_activo');
        document.body.style.overflow = 'hidden';
    }
});

btnCerrar.addEventListener('click', () => {
    modal.classList.remove('modal_activo');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('modal_activo');
        document.body.style.overflow = '';
    }
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('auth_tab-activo'));
        tab.classList.add('auth_tab-activo');
        forms.forEach(form => {
            form.classList.remove('auth_form-activo');
            if (form.id === `form-${tabName}`) form.classList.add('auth_form-activo');
        });
    });
});

// ==================== TOGGLE SHOW PASSWORD ====================

document.querySelectorAll('.btn_ver_password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        const svg = btn.querySelector('svg');
        if (type === 'text') {
            svg.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;
        } else {
            svg.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
        }
    });
});

// ==================== FORM HANDLING ====================

const formLogin = document.getElementById('form-login');
const formRegistro = document.getElementById('form-registro');

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const recordar = document.getElementById('recordar').checked;
    try {
        const { iniciarSesion } = await import('/Besori.en/includes/firebase.js');
        const resultado = await iniciarSesion(email, password, recordar);
        if (resultado.success) {
            mostrarNotificacion('Welcome back!', 'exito');
            modal.classList.remove('modal_activo');
            document.body.style.overflow = '';
            formLogin.reset();
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (error) {
        mostrarNotificacion('Error connecting to the server', 'error');
    }
});

formRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('registro-nombre').value;
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;
    const passwordConfirmar = document.getElementById('registro-password-confirmar').value;
    const terminos = document.getElementById('terminos').checked;
    if (password !== passwordConfirmar) { mostrarNotificacion('Passwords do not match', 'error'); return; }
    if (!terminos) { mostrarNotificacion('You must accept the terms and conditions', 'error'); return; }
    try {
        const { registrarUsuario } = await import('/Besori.en/includes/firebase.js');
        const resultado = await registrarUsuario(email, password, nombre);
        if (resultado.success) {
            mostrarNotificacion('Account created successfully!', 'exito');
            modal.classList.remove('modal_activo');
            document.body.style.overflow = '';
            formRegistro.reset();
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (error) {
        mostrarNotificacion('Error connecting to the server', 'error');
    }
});

// ==================== GOOGLE AUTHENTICATION ====================

document.querySelector('.btn_google').addEventListener('click', async () => {
    try {
        const { iniciarSesionConGoogle } = await import('/Besori.en/includes/firebase.js');
        const resultado = await iniciarSesionConGoogle();
        if (resultado.success) {
            mostrarNotificacion('Welcome!', 'exito');
            modal.classList.remove('modal_activo');
            document.body.style.overflow = '';
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (error) {
        mostrarNotificacion('Error connecting to Google', 'error');
    }
});

document.querySelector('.btn_google_registro').addEventListener('click', async () => {
    try {
        const { iniciarSesionConGoogle } = await import('/Besori.en/includes/firebase.js');
        const resultado = await iniciarSesionConGoogle();
        if (resultado.success) {
            mostrarNotificacion('Account created successfully!', 'exito');
            modal.classList.remove('modal_activo');
            document.body.style.overflow = '';
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (error) {
        mostrarNotificacion('Error connecting to Google', 'error');
    }
});

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion_${tipo}`;
    notificacion.textContent = mensaje;
    if (!document.getElementById('notificacion-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notificacion-styles';
        styles.textContent = `
            .notificacion { position: fixed; top: 20px; right: 20px; padding: 16px 24px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,.15); z-index: 10000; animation: slideIn .3s ease-out; max-width: 400px; font-size: 1.4rem; }
            .notificacion_exito { border-left: 4px solid #10b981; }
            .notificacion_error { border-left: 4px solid #ef4444; }
            .notificacion_info { border-left: 4px solid #3b82f6; }
            @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
        `;
        document.head.appendChild(styles);
    }
    document.body.appendChild(notificacion);
    setTimeout(() => {
        notificacion.style.animation = 'slideOut .3s ease-out';
        setTimeout(() => notificacion.remove(), 300);
    }, 4000);
}

// ==================== AUTHENTICATION STATE OBSERVER ====================

(async function() {
    try {
        const { observarEstadoAutenticacion } = await import('/Besori.en/includes/firebase.js');
        observarEstadoAutenticacion((user) => {
            const btnUsuario = document.querySelector('.btn_usuario');
            const btnTexto = btnUsuario.querySelector('.btn_texto');
            if (user) {
                if (btnTexto) btnTexto.textContent = user.displayName || user.email.split('@')[0];
                actualizarMenuUsuario(user);
            } else {
                if (btnTexto) btnTexto.textContent = 'Account';
            }
        });
    } catch (error) {
        console.error('Error setting up authentication observer:', error);
    }
})();

function actualizarMenuUsuario(user) {
    const btnUsuario = document.querySelector('.btn_usuario');
    let menuUsuario = document.getElementById('menu-usuario');
    if (!menuUsuario) {
        menuUsuario = document.createElement('div');
        menuUsuario.id = 'menu-usuario';
        menuUsuario.className = 'menu_usuario';
        menuUsuario.innerHTML = `
            <div class="menu_usuario_info">
                <strong>${user.displayName || 'User'}</strong>
                <small>${user.email}</small>
            </div>
            <hr>
            <a href="#" class="menu_usuario_item" id="btn-cerrar-sesion">Sign out</a>
        `;
        if (!document.getElementById('menu-usuario-styles')) {
            const styles = document.createElement('style');
            styles.id = 'menu-usuario-styles';
            styles.textContent = `
                .menu_usuario { position: absolute; top: 100%; right: 0; margin-top: 8px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,.1); padding: 12px; min-width: 200px; display: none; z-index: 1000; }
                .menu_usuario.activo { display: block; }
                .menu_usuario_info { padding: 8px; margin-bottom: 8px; }
                .menu_usuario_info strong { display: block; margin-bottom: 4px; font-size: 1.4rem; }
                .menu_usuario_info small { color: #666; font-size: 1.2rem; }
                .menu_usuario hr { border: none; border-top: 1px solid #e5e7eb; margin: 8px 0; }
                .menu_usuario_item { display: block; padding: 10px 12px; color: #374151; text-decoration: none; border-radius: 4px; transition: background .2s; font-size: 1.3rem; }
                .menu_usuario_item:hover { background: #f3f4f6; }
            `;
            document.head.appendChild(styles);
        }
        btnUsuario.parentElement.appendChild(menuUsuario);
        btnUsuario.addEventListener('click', (e) => {
            if (user) { e.stopPropagation(); menuUsuario.classList.toggle('activo'); }
        });
        document.addEventListener('click', (e) => {
            if (!menuUsuario.contains(e.target) && e.target !== btnUsuario) menuUsuario.classList.remove('activo');
        });
        document.getElementById('btn-cerrar-sesion').addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const { cerrarSesion } = await import('/Besori.en/includes/firebase.js');
                const resultado = await cerrarSesion();
                if (resultado.success) {
                    mostrarNotificacion('Signed out successfully', 'exito');
                    menuUsuario.remove();
                }
            } catch (error) {
                mostrarNotificacion('Error signing out', 'error');
            }
        });
    }
}