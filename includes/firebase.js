// Import the functions you need from the SDKs you need
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

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZqmt6-7MbFbd6J5bB_5lIHivAorfIL-I",
    authDomain: "besori-508f0.firebaseapp.com",
    projectId: "besori-508f0",
    storageBucket: "besori-508f0.firebasestorage.app",
    messagingSenderId: "570793081810",
    appId: "1:570793081810:web:16ad52e4ebc2567270a60b",
    measurementId: "G-C9Y7FBCTME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Configurar proveedores de autenticación
const googleProvider = new GoogleAuthProvider();

// ==================== FUNCIONES DE AUTENTICACIÓN ====================

// Registrar usuario con email y contraseña
export async function registrarUsuario(email, password, nombre) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Actualizar el perfil con el nombre
        await updateProfile(user, {
            displayName: nombre
        });
        
        console.log("Usuario registrado exitosamente:", user);
        return { success: true, user };
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

// Iniciar sesión con email y contraseña
export async function iniciarSesion(email, password, recordar = false) {
    try {
        // Configurar persistencia según la opción "recordar"
        const persistence = recordar ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistence);
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("Sesión iniciada exitosamente:", user);
        return { success: true, user };
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

// Cerrar sesión
export async function cerrarSesion() {
    try {
        await signOut(auth);
        console.log("Sesión cerrada exitosamente");
        return { success: true };
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

// Iniciar sesión con Google
export async function iniciarSesionConGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        console.log("Sesión iniciada con Google:", user);
        return { success: true, user };
    } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

// Observador de estado de autenticación
export function observarEstadoAutenticacion(callback) {
    return onAuthStateChanged(auth, callback);
}

// Obtener usuario actual
export function obtenerUsuarioActual() {
    return auth.currentUser;
}

// ==================== FUNCIONES AUXILIARES ====================

// Translate Firebase error codes to English messages
function obtenerMensajeError(codigoError) {
    const mensajes = {
        'auth/email-already-in-use': 'This email address is already registered',
        'auth/invalid-email': 'The email address is not valid',
        'auth/operation-not-allowed': 'Operation not allowed',
        'auth/weak-password': 'Password must be at least 6 characters',
        'auth/user-disabled': 'This account has been disabled',
        'auth/user-not-found': 'No account exists with this email address',
        'auth/wrong-password': 'Incorrect password',
        'auth/invalid-credential': 'Invalid credentials',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later',
        'auth/network-request-failed': 'Connection error. Please check your internet',
        'auth/popup-closed-by-user': 'You closed the authentication window',
        'auth/cancelled-popup-request': 'Operation cancelled',
        'auth/popup-blocked': 'Your browser blocked the pop-up window'
    };
    
    return mensajes[codigoError] || 'An error occurred. Please try again';
}

// Exportar auth para uso externo si es necesario
export { auth };