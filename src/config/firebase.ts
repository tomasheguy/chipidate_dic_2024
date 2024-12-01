import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services with error handling
const auth = getAuth(app);
auth.useDeviceLanguage();

const db = getFirestore(app);
const storage = getStorage(app);

let analytics: Analytics | null = null;

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  analytics = getAnalytics(app);
}

// Error mapping for user-friendly messages
const getAuthErrorMessage = (error: any): string => {
  if (!error) return 'An unknown error occurred';
  
  const errorCode = error.code || '';
  
  switch (errorCode) {
    case 'auth/configuration-not-found':
      return 'Authentication configuration error. Please try again.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please register first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful attempts. Please try again later.';
    case 'auth/popup-blocked':
      return 'Popup blocked. Please allow popups for authentication.';
    case 'auth/popup-closed-by-user':
      return 'Authentication cancelled. Please try again.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for authentication.';
    case 'auth/invalid-api-key':
      return 'Invalid API configuration. Please contact support.';
    case 'auth/internal-error':
      return 'An internal authentication error occurred. Please try again.';
    default:
      return error.message || 'An error occurred. Please try again.';
  }
};

export { auth, db, storage, analytics, getAuthErrorMessage };
export default app;