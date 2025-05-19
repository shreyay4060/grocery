// firebase.js
// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Initialize Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Authentication and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Connect to emulators only in development
if (import.meta.env.DEV) {
  connectFirestoreEmulator(db, '127.0.0.1', 8081);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  console.log('⚡️ Connected to Firestore and Auth emulators');
}

export default app;