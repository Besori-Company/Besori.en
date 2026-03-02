import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZqmt6-7MbFbd6J5bB_5lIHivAorfIL-I",
    authDomain: "besori-508f0.firebaseapp.com",
    projectId: "besori-508f0",
    storageBucket: "besori-508f0.firebasestorage.app",
    messagingSenderId: "570793081810",
    appId: "1:570793081810:web:16ad52e4ebc2567270a60b",
    measurementId: "G-C9Y7FBCTME"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

// ==================== TOTP MFA ====================

function cargarOTPAuth() {
    return new Promise((resolve, reject) => {
        if (window.OTPAuth) { resolve(window.OTPAuth); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/otpauth/9.3.6/otpauth.umd.min.js';
        script.onload = () => resolve(window.OTPAuth);
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

export async function generarSecretoTotp(email) {
    try {
        const OTPAuth = await cargarOTPAuth();
        const secret = new OTPAuth.Secret({ size: 20 });
        const secretBase32 = secret.base32;
        const totp = new OTPAuth.TOTP({
            issuer: 'Besori',
            label: email,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(secretBase32)
        });
        const totpUri = totp.toString();
        return { success: true, secretBase32, totpUri };
    } catch (error) {
        return { success: false, error: 'Error generating the QR code.' };
    }
}

export async function verificarCodigoTotp(secretBase32, codigo) {
    try {
        const OTPAuth = await cargarOTPAuth();
        const totp = new OTPAuth.TOTP({
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(secretBase32)
        });
        const delta = totp.validate({ token: codigo.trim(), window: 1 });
        return delta !== null;
    } catch (error) {
        return false;
    }
}

export async function guardarMfaActivado(uid, secretBase32) {
    try {
        await setDoc(doc(db, 'usuarios', uid), {
            mfaConfigurado: true,
            totpSecret: secretBase32
        }, { merge: true });
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Error saving the configuration.' };
    }
}

export async function obtenerDatosUsuario(uid) {
    try {
        const snap = await getDoc(doc(db, 'usuarios', uid));
        if (snap.exists()) return { success: true, data: snap.data() };
        return { success: true, data: null };
    } catch (error) {
        return { success: false, data: null };
    }
}

// ==================== AUTHENTICATION ====================

export async function registrarUsuario(email, password, nombre) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: nombre });
        await setDoc(doc(db, 'usuarios', user.uid), {
            nombre,
            email,
            mfaConfigurado: false,
            creadoEn: new Date()
        });
        return { success: true, user, requiresMfaSetup: true };
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

export async function iniciarSesion(email, password, recordar = false) {
    try {
        const persistence = recordar ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistence);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const snap = await getDoc(doc(db, 'usuarios', user.uid));
        const datos = snap.exists() ? snap.data() : {};
        if (!datos.mfaConfigurado) {
            return { success: true, user, requiresMfaSetup: true };
        }
        return { success: true, user, requiresMfaVerify: true, totpSecret: datos.totpSecret };
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

export async function iniciarSesionConGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return await procesarUsuarioGoogle(result.user);
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

async function procesarUsuarioGoogle(user) {
    const snap = await getDoc(doc(db, 'usuarios', user.uid));
    if (!snap.exists()) {
        await setDoc(doc(db, 'usuarios', user.uid), {
            nombre: user.displayName,
            email: user.email,
            mfaConfigurado: false,
            creadoEn: new Date()
        });
        return { success: true, user, requiresMfaSetup: true };
    }
    const datos = snap.data();
    if (!datos.mfaConfigurado) {
        return { success: true, user, requiresMfaSetup: true };
    }
    return { success: true, user, requiresMfaVerify: true, totpSecret: datos.totpSecret };
}


export async function cerrarSesion() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

export function observarEstadoAutenticacion(callback) {
    return onAuthStateChanged(auth, callback);
}

export function obtenerUsuarioActual() {
    return auth.currentUser;
}

function obtenerMensajeError(codigoError) {
    const mensajes = {
        'auth/email-already-in-use': 'This email address is already registered',
        'auth/invalid-email': 'The email address is not valid',
        'auth/operation-not-allowed': 'Operation not allowed',
        'auth/weak-password': 'Password must be at least 6 characters',
        'auth/user-disabled': 'This account has been disabled',
        'auth/user-not-found': 'No account exists with this email address',
        'auth/wrong-password': 'Incorrect password',
        'auth/invalid-credential': 'Invalid credentials. Check your email and password',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later',
        'auth/network-request-failed': 'Connection error. Please check your internet',
        'auth/popup-closed-by-user': 'You closed the authentication window',
        'auth/popup-blocked': 'Your browser blocked the pop-up window'
    };
    return mensajes[codigoError] || 'An error occurred. Please try again';
}

export { auth, db };
