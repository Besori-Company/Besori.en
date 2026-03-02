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

    <!-- ===== AUTH MODAL ===== -->
    <div class="modal_overlay" id="modal-auth">
        <div class="modal_contenido">
            <button class="modal_cerrar" id="cerrar-modal-auth" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
            <div class="auth_tabs">
                <button class="auth_tab auth_tab-activo" data-tab="login">Sign In</button>
                <button class="auth_tab" data-tab="registro">Sign Up</button>
            </div>

            <!-- Login -->
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
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="form_extras">
                    <label class="checkbox_label">
                        <input type="checkbox" id="recordar"><span>Remember me</span>
                    </label>
                </div>
                <button type="submit" class="btn_submit">Sign In</button>
                <div class="auth_divider"><span>or continue with</span></div>
                <div class="auth_redes">
                    <button type="button" class="btn_red btn_google" id="btn-google-login">
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

            <!-- Sign Up -->
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
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
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
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="form_grupo">
                    <label class="checkbox_label">
                        <input type="checkbox" id="terminos" required>
                        <span style="font-size:1.5rem;">I accept the <a href="/Besori.en/pages/terms.html" style="color:#3577b1;text-decoration:none;">terms and conditions</a></span>
                    </label>
                </div>
                <button type="submit" class="btn_submit">Create account</button>
                <div class="auth_divider"><span>or continue with</span></div>
                <div class="auth_redes">
                    <button type="button" class="btn_red btn_google_registro" id="btn-google-registro">
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

    <!-- ===== MFA SETUP MODAL ===== -->
    <div class="modal_overlay" id="modal-mfa-setup">
        <div class="modal_contenido modal_mfa">
            <div class="mfa_header">
                <div class="mfa_icon_wrap">🔐</div>
                <h2 class="auth_titulo">Set up two-step verification</h2>
                <p class="mfa_subtitulo">This is required to protect your account. It only takes a minute.</p>
            </div>
            <div class="mfa_pasos">
                <div class="mfa_paso">
                    <div class="paso_numero">1</div>
                    <div class="paso_contenido">
                        <h3>Download an authenticator app</h3>
                        <div class="apps_lista">
                            <span class="app_chip">Google Authenticator</span>
                            <span class="app_chip">Microsoft Authenticator</span>
                            <span class="app_chip">Authy</span>
                        </div>
                    </div>
                </div>
                <div class="mfa_paso">
                    <div class="paso_numero">2</div>
                    <div class="paso_contenido">
                        <h3>Scan this QR code</h3>
                        <div class="qr_container">
                            <div id="qr-loading" class="qr_loading">
                                <div class="spinner_mfa"></div>
                                <span>Generating code...</span>
                            </div>
                            <div id="qr-code-div" style="display:none;"></div>
                        </div>
                        <details class="clave_manual_wrap">
                            <summary>Can't scan? Enter the code manually</summary>
                            <div class="clave_manual">
                                <code id="totp-secret-display">---</code>
                                <button type="button" class="btn_copiar" id="btn-copiar-clave">Copy</button>
                            </div>
                        </details>
                    </div>
                </div>
                <div class="mfa_paso">
                    <div class="paso_numero">3</div>
                    <div class="paso_contenido">
                        <h3>Enter the 6-digit code</h3>
                        <input type="text" id="mfa-setup-codigo" class="form_input codigo_totp_input"
                               placeholder="000000" maxlength="6" inputmode="numeric" autocomplete="one-time-code">
                    </div>
                </div>
            </div>
            <div id="mfa-setup-error" class="mfa_error" style="display:none;"></div>
            <button type="button" class="btn_submit" id="btn-activar-mfa">Enable two-step verification</button>
            <p class="mfa_nota">Your account will be protected with this setup</p>
        </div>
    </div>

    <!-- ===== MFA LOGIN VERIFY MODAL ===== -->
    <div class="modal_overlay" id="modal-mfa-login">
        <div class="modal_contenido modal_mfa_login">
            <div class="mfa_header">
                <div class="mfa_icon_wrap">🔑</div>
                <h2 class="auth_titulo">Two-step verification</h2>
                <p class="mfa_subtitulo">Enter the 6-digit code from your authenticator app</p>
            </div>
            <input type="text" id="mfa-login-codigo" class="form_input codigo_totp_input"
                   placeholder="000000" maxlength="6" inputmode="numeric" autocomplete="one-time-code"
                   style="margin-top:2rem;">
            <div id="mfa-login-error" class="mfa_error" style="display:none;margin-top:1rem;"></div>
            <button type="button" class="btn_submit" id="btn-verificar-mfa-login" style="margin-top:1.5rem;">Verify</button>
            <button type="button" class="btn_link" id="btn-cancelar-mfa-login">Cancel</button>
        </div>
    </div>
`;

// ==================== MFA STYLES ====================
(function() {
    if (document.getElementById('mfa-styles')) return;
    const s = document.createElement('style');
    s.id = 'mfa-styles';
    s.textContent = `
        .modal_mfa { max-width: 500px; max-height: 90vh; overflow-y: auto; }
        .modal_mfa_login { max-width: 380px; text-align: center; }
        .mfa_header { text-align: center; margin-bottom: 2rem; }
        .mfa_icon_wrap { font-size: 3rem; margin-bottom: 1rem; }
        .mfa_subtitulo { color: #666; font-size: 1.4rem; margin-top: 0.5rem; line-height: 1.5; }
        .mfa_pasos { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 2rem; }
        .mfa_paso { display: flex; gap: 1.4rem; align-items: flex-start; }
        .paso_numero { min-width: 3rem; height: 3rem; background: #3577b1; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.4rem; flex-shrink: 0; }
        .paso_contenido h3 { font-size: 1.5rem; margin-bottom: 0.6rem; }
        .apps_lista { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
        .app_chip { background: #e8f0fb; color: #3577b1; padding: 0.3rem 1rem; border-radius: 20px; font-size: 1.2rem; }
        .qr_container { display: flex; justify-content: center; margin: 1rem 0; }
        .qr_loading { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; color: #666; font-size: 1.3rem; }
        .spinner_mfa { width: 3rem; height: 3rem; border: 3px solid #e8f0fb; border-top-color: #3577b1; border-radius: 50%; animation: spinMfa 0.8s linear infinite; }
        @keyframes spinMfa { to { transform: rotate(360deg); } }
        #qr-code-div img, #qr-code-div canvas { border-radius: 8px; }
        .clave_manual_wrap { margin-top: 1rem; font-size: 1.3rem; }
        .clave_manual_wrap summary { cursor: pointer; color: #3577b1; }
        .clave_manual { display: flex; align-items: center; gap: 1rem; margin-top: 0.8rem; background: #f3f4f6; padding: 0.8rem 1rem; border-radius: 6px; }
        .clave_manual code { font-size: 1.2rem; letter-spacing: 0.1em; flex: 1; word-break: break-all; }
        .btn_copiar { background: #3577b1; color: white; border: none; padding: 0.4rem 1rem; border-radius: 4px; cursor: pointer; font-size: 1.2rem; white-space: nowrap; }
        .btn_copiar:hover { background: #2a5f96; }
        .codigo_totp_input { text-align: center !important; font-size: 2.4rem !important; letter-spacing: 0.4em; font-weight: bold; }
        .mfa_error { background: #fef2f2; border-left: 4px solid #ef4444; color: #dc2626; padding: 1rem 1.4rem; border-radius: 6px; font-size: 1.3rem; margin-top: 1rem; }
        .mfa_nota { text-align: center; font-size: 1.2rem; color: #666; margin-top: 1.5rem; }
        .btn_link { display: block; width: 100%; text-align: center; background: none; border: none; color: #666; cursor: pointer; font-size: 1.4rem; margin-top: 1rem; padding: 0.8rem; }
        .btn_link:hover { color: #3577b1; text-decoration: underline; }
        .form_extras { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .menu_usuario { position: absolute; top: 100%; right: 0; margin-top: 8px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 12px; min-width: 200px; display: none; z-index: 1000; }
        .menu_usuario.activo { display: block; }
        .menu_usuario_info { padding: 8px; margin-bottom: 8px; }
        .menu_usuario_info strong { display: block; margin-bottom: 4px; font-size: 1.4rem; }
        .menu_usuario_info small { color: #666; font-size: 1.2rem; display: block; }
        .menu_usuario hr { border: none; border-top: 1px solid #e5e7eb; margin: 8px 0; }
        .menu_usuario_item { display: block; padding: 10px 12px; color: #374151; text-decoration: none; border-radius: 4px; transition: background 0.2s; font-size: 1.3rem; }
        .menu_usuario_item:hover { background: #f3f4f6; }
        .nav_contenedor { position: relative; }
    `;
    document.head.appendChild(s);
})();

// ==================== GLOBAL VARIABLES ====================
let _totpSecretSetup = null;
let _totpSecretLogin = null;
let _usuarioSesionPendiente = null;

// ==================== HELPERS ====================

function abrirModal(id) {
    document.getElementById(id).classList.add('modal_activo');
    document.body.style.overflow = 'hidden';
}
function cerrarModal(id) {
    document.getElementById(id).classList.remove('modal_activo');
    document.body.style.overflow = '';
}
function cerrarTodos() {
    ['modal-auth', 'modal-mfa-setup', 'modal-mfa-login'].forEach(cerrarModal);
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const n = document.createElement('div');
    n.className = `notificacion notificacion_${tipo}`;
    n.textContent = mensaje;
    if (!document.getElementById('notificacion-styles')) {
        const s = document.createElement('style');
        s.id = 'notificacion-styles';
        s.textContent = `.notificacion{position:fixed;top:20px;right:20px;padding:16px 24px;background:white;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);z-index:10000;animation:slideIn .3s ease-out;max-width:400px;font-size:1.4rem}.notificacion_exito{border-left:4px solid #10b981}.notificacion_error{border-left:4px solid #ef4444}.notificacion_info{border-left:4px solid #3b82f6}@keyframes slideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(400px);opacity:0}}`;
        document.head.appendChild(s);
    }
    document.body.appendChild(n);
    setTimeout(() => {
        n.style.animation = 'slideOut .3s ease-out';
        setTimeout(() => n.remove(), 300);
    }, 4000);
}

function soloNumeros(inputId) {
    const el = document.getElementById(inputId);
    if (el) el.addEventListener('input', function() { this.value = this.value.replace(/\D/g, ''); });
}

// ==================== FLOATING NAVIGATION ====================
const nav = document.querySelector('.barra-nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('nav_fijo', window.pageYOffset > 100);
});

// ==================== TABS + SHOW PASSWORD ====================
document.querySelectorAll('.auth_tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.auth_tab').forEach(t => t.classList.remove('auth_tab-activo'));
        document.querySelectorAll('.auth_form').forEach(f => f.classList.remove('auth_form-activo'));
        tab.classList.add('auth_tab-activo');
        document.getElementById(`form-${tab.dataset.tab}`).classList.add('auth_form-activo');
    });
});

document.querySelectorAll('.btn_ver_password').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        input.type = input.type === 'password' ? 'text' : 'password';
    });
});

soloNumeros('mfa-setup-codigo');
soloNumeros('mfa-login-codigo');

// Close modals
document.getElementById('cerrar-modal-auth').addEventListener('click', () => cerrarModal('modal-auth'));
document.getElementById('modal-auth').addEventListener('click', e => { if (e.target.id === 'modal-auth') cerrarModal('modal-auth'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarTodos(); });

// Account button
document.querySelector('.btn_usuario').addEventListener('click', async (e) => {
    e.stopPropagation();
    const { auth } = await import('/Besori.en/includes/firebase.js');
    if (!auth.currentUser) {
        abrirModal('modal-auth');
    } else {
        const m = document.getElementById('menu-usuario');
        if (m) m.classList.toggle('activo');
    }
});

// ==================== MFA SETUP ====================

async function iniciarSetupMfa() {
    cerrarTodos();
    document.getElementById('qr-loading').style.display = 'flex';
    document.getElementById('qr-code-div').style.display = 'none';
    document.getElementById('qr-code-div').innerHTML = '';
    document.getElementById('totp-secret-display').textContent = '---';
    document.getElementById('mfa-setup-codigo').value = '';
    document.getElementById('mfa-setup-error').style.display = 'none';
    abrirModal('modal-mfa-setup');

    try {
        const { generarSecretoTotp, obtenerUsuarioActual } = await import('/Besori.en/includes/firebase.js');
        const user = obtenerUsuarioActual();
        const resultado = await generarSecretoTotp(user.email);

        if (!resultado.success) {
            document.getElementById('mfa-setup-error').textContent = resultado.error;
            document.getElementById('mfa-setup-error').style.display = 'block';
            return;
        }

        _totpSecretSetup = resultado.secretBase32;
        document.getElementById('totp-secret-display').textContent = resultado.secretBase32;

        await new Promise((res, rej) => {
            if (window.QRCode) { res(); return; }
            const sc = document.createElement('script');
            sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
            sc.onload = res; sc.onerror = rej;
            document.head.appendChild(sc);
        });

        document.getElementById('qr-loading').style.display = 'none';
        document.getElementById('qr-code-div').style.display = 'flex';
        document.getElementById('qr-code-div').style.justifyContent = 'center';

        new QRCode(document.getElementById('qr-code-div'), {
            text: resultado.totpUri,
            width: 200,
            height: 200,
            colorDark: '#1a1a2e',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
        });
    } catch (err) {
        document.getElementById('qr-loading').innerHTML = '<span style="color:#ef4444">Error generating QR. Use the manual code.</span>';
    }
}

// Copy manual key
document.getElementById('btn-copiar-clave').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('totp-secret-display').textContent).then(() => {
        const btn = document.getElementById('btn-copiar-clave');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 2000);
    });
});

// Enable MFA
document.getElementById('btn-activar-mfa').addEventListener('click', async () => {
    const codigo = document.getElementById('mfa-setup-codigo').value.trim();
    const errorDiv = document.getElementById('mfa-setup-error');
    errorDiv.style.display = 'none';

    if (codigo.length !== 6) {
        errorDiv.textContent = 'Enter the 6-digit code from your authenticator app.';
        errorDiv.style.display = 'block';
        return;
    }
    if (!_totpSecretSetup) {
        errorDiv.textContent = 'Error: reload the page and try again.';
        errorDiv.style.display = 'block';
        return;
    }

    const btn = document.getElementById('btn-activar-mfa');
    btn.disabled = true;
    btn.textContent = 'Verifying...';

    try {
        const { verificarCodigoTotp, guardarMfaActivado, obtenerUsuarioActual } = await import('/Besori.en/includes/firebase.js');
        const user = obtenerUsuarioActual();
        const esValido = await verificarCodigoTotp(_totpSecretSetup, codigo);

        if (!esValido) {
            errorDiv.textContent = 'Incorrect code. Check your authenticator app and try again.';
            errorDiv.style.display = 'block';
            btn.disabled = false;
            btn.textContent = 'Enable two-step verification';
            return;
        }

        const resultado = await guardarMfaActivado(user.uid, _totpSecretSetup);
        if (resultado.success) {
            _totpSecretSetup = null;
            window._mfaEnProceso = false;
            cerrarModal('modal-mfa-setup');
            mostrarNotificacion('Two-step verification enabled! Your account is protected.', 'exito');
            actualizarMenuUsuario(user);
        } else {
            errorDiv.textContent = resultado.error;
            errorDiv.style.display = 'block';
        }
    } catch (err) {
        errorDiv.textContent = 'Error enabling. Please try again.';
        errorDiv.style.display = 'block';
    } finally {
        btn.disabled = false;
        btn.textContent = 'Enable two-step verification';
    }
});

// ==================== MFA LOGIN VERIFY ====================

function mostrarVerificacionMfaLogin(totpSecret, user) {
    _totpSecretLogin = totpSecret;
    _usuarioSesionPendiente = user;
    document.getElementById('mfa-login-codigo').value = '';
    document.getElementById('mfa-login-error').style.display = 'none';
    cerrarTodos();
    abrirModal('modal-mfa-login');
}

document.getElementById('btn-verificar-mfa-login').addEventListener('click', async () => {
    const codigo = document.getElementById('mfa-login-codigo').value.trim();
    const errorDiv = document.getElementById('mfa-login-error');
    errorDiv.style.display = 'none';

    if (codigo.length !== 6) {
        errorDiv.textContent = 'Enter the 6-digit code.';
        errorDiv.style.display = 'block';
        return;
    }

    const btn = document.getElementById('btn-verificar-mfa-login');
    btn.disabled = true;
    btn.textContent = 'Verifying...';

    try {
        const { verificarCodigoTotp } = await import('/Besori.en/includes/firebase.js');
        const esValido = await verificarCodigoTotp(_totpSecretLogin, codigo);

        if (esValido) {
            window._mfaEnProceso = false;
            cerrarModal('modal-mfa-login');
            mostrarNotificacion('Welcome! Signed in successfully', 'exito');
            actualizarMenuUsuario(_usuarioSesionPendiente);
            _totpSecretLogin = null;
            _usuarioSesionPendiente = null;
        } else {
            errorDiv.textContent = 'Incorrect code. Please try again.';
            errorDiv.style.display = 'block';
        }
    } catch (err) {
        errorDiv.textContent = 'Error verifying. Please try again.';
        errorDiv.style.display = 'block';
    } finally {
        btn.disabled = false;
        btn.textContent = 'Verify';
    }
});

document.getElementById('btn-cancelar-mfa-login').addEventListener('click', async () => {
    const { cerrarSesion } = await import('/Besori.en/includes/firebase.js');
    await cerrarSesion();
    _totpSecretLogin = null;
    _usuarioSesionPendiente = null;
    cerrarModal('modal-mfa-login');
    abrirModal('modal-auth');
});

// ==================== LOGIN FORM ====================

document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const recordar = document.getElementById('recordar').checked;

    const btn = e.target.querySelector('.btn_submit');
    btn.disabled = true;
    btn.textContent = 'Signing in...';

    try {
        const { iniciarSesion } = await import('/Besori.en/includes/firebase.js');
        const resultado = await iniciarSesion(email, password, recordar);

        if (resultado.success) {
            if (resultado.requiresMfaSetup) {
                window._mfaEnProceso = true;
                mostrarNotificacion('Please set up two-step verification', 'info');
                await iniciarSetupMfa();
            } else if (resultado.requiresMfaVerify) {
                window._mfaEnProceso = true;
                mostrarVerificacionMfaLogin(resultado.totpSecret, resultado.user);
            } else {
                cerrarModal('modal-auth');
                mostrarNotificacion('Welcome!', 'exito');
                actualizarMenuUsuario(resultado.user);
            }
            e.target.reset();
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (err) {
        mostrarNotificacion('Error signing in. Please try again', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Sign In';
    }
});

// ==================== SIGN UP FORM ====================

document.getElementById('form-registro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('registro-nombre').value;
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;
    const passwordConfirmar = document.getElementById('registro-password-confirmar').value;

    if (password !== passwordConfirmar) { mostrarNotificacion('Passwords do not match', 'error'); return; }

    const btn = e.target.querySelector('.btn_submit');
    btn.disabled = true;
    btn.textContent = 'Creating account...';

    try {
        const { registrarUsuario } = await import('/Besori.en/includes/firebase.js');
        const resultado = await registrarUsuario(email, password, nombre);

        if (resultado.success) {
            e.target.reset();
            mostrarNotificacion('Account created! Now set up two-step verification', 'exito');
            await iniciarSetupMfa();
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (err) {
        mostrarNotificacion('Error creating account. Please try again', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Create account';
    }
});

// ==================== GOOGLE ====================

async function manejarGoogle() {
    this.disabled = true;
    const original = this.innerHTML;
    this.innerHTML = '<span style="opacity:.6">Connecting...</span>';

    try {
        const { iniciarSesionConGoogle } = await import('/Besori.en/includes/firebase.js');
        const resultado = await iniciarSesionConGoogle();

        if (resultado.redirecting) return;

        if (resultado.success) {
            if (resultado.requiresMfaSetup) {
                window._mfaEnProceso = true;
                mostrarNotificacion('Welcome! Set up two-step verification', 'info');
                await iniciarSetupMfa();
            } else if (resultado.requiresMfaVerify) {
                window._mfaEnProceso = true;
                mostrarVerificacionMfaLogin(resultado.totpSecret, resultado.user);
            } else {
                cerrarModal('modal-auth');
                mostrarNotificacion('Connected with Google!', 'exito');
                actualizarMenuUsuario(resultado.user);
            }
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (err) {
        mostrarNotificacion('Error connecting to Google', 'error');
    } finally {
        this.disabled = false;
        this.innerHTML = original;
    }
}

document.getElementById('btn-google-login').addEventListener('click', manejarGoogle);
document.getElementById('btn-google-registro').addEventListener('click', manejarGoogle);

// ==================== GOOGLE REDIRECT (production) ====================

(async function() {
    const esLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (esLocal) return;
    try {
        const { manejarRedirectGoogle } = await import('/Besori.en/includes/firebase.js');
        const resultado = await manejarRedirectGoogle();
        if (!resultado) return;
        if (resultado.success) {
            if (resultado.requiresMfaSetup) {
                window._mfaEnProceso = true;
                await iniciarSetupMfa();
            } else if (resultado.requiresMfaVerify) {
                window._mfaEnProceso = true;
                mostrarVerificacionMfaLogin(resultado.totpSecret, resultado.user);
            } else {
                mostrarNotificacion('Connected with Google!', 'exito');
                actualizarMenuUsuario(resultado.user);
            }
        }
    } catch (err) { /* no pending redirect */ }
})();

// ==================== AUTH OBSERVER ====================

(async function() {
    const { observarEstadoAutenticacion, obtenerDatosUsuario, cerrarSesion } = await import('/Besori.en/includes/firebase.js');
    window._mfaEnProceso = false;

    observarEstadoAutenticacion(async (user) => {
        const btnTexto = document.querySelector('.btn_usuario .btn_texto');
        if (user) {
            if (window._mfaEnProceso) return;
            const { success, data } = await obtenerDatosUsuario(user.uid);
            if (!success) { await cerrarSesion(); return; }
            if (!data || !data.mfaConfigurado) {
                window._mfaEnProceso = true;
                if (btnTexto) btnTexto.textContent = 'Account';
                mostrarNotificacion('You must set up two-step verification to continue', 'info');
                await iniciarSetupMfa();
                return;
            }
            if (btnTexto) btnTexto.textContent = user.displayName || user.email.split('@')[0];
            actualizarMenuUsuario(user);
        } else {
            if (btnTexto) btnTexto.textContent = 'Account';
            const m = document.getElementById('menu-usuario');
            if (m) m.remove();
        }
    });
})();

// ==================== USER MENU ====================

function actualizarMenuUsuario(user) {
    if (!user) return;
    const btnUsuario = document.querySelector('.btn_usuario');
    let menu = document.getElementById('menu-usuario');
    if (!menu) {
        menu = document.createElement('div');
        menu.id = 'menu-usuario';
        menu.className = 'menu_usuario';
        menu.innerHTML = `
            <div class="menu_usuario_info">
                <strong>${user.displayName || 'User'}</strong>
                <small>${user.email}</small>
            </div>
            <hr>
            <a href="#" class="menu_usuario_item" id="btn-cerrar-sesion">Sign out</a>
        `;

        if (!document.getElementById('menu-usuario-extra-styles')) {
            const s = document.createElement('style');
            s.id = 'menu-usuario-extra-styles';
            s.textContent = `.mfa_badge_menu { color: #10b981 !important; font-weight: 600; margin-top: 4px; }`;
            document.head.appendChild(s);
        }

        btnUsuario.parentElement.appendChild(menu);

        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !btnUsuario.contains(e.target)) menu.classList.remove('activo');
        });

        document.getElementById('btn-cerrar-sesion').addEventListener('click', async (e) => {
            e.preventDefault();
            const { cerrarSesion } = await import('/Besori.en/includes/firebase.js');
            const r = await cerrarSesion();
            if (r.success) {
                mostrarNotificacion('Signed out successfully', 'exito');
                menu.remove();
            }
        });
    }
}
