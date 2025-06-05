// firebase.js

// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBqYj0wtO3uzSMwa8M-stqZmUHygFB24YY",
  authDomain: "grocery-baskets.firebaseapp.com",
  projectId: "grocery-baskets",
  storageBucket: "grocery-baskets.firebasestorage.app",
  messagingSenderId: "535036192036",
  appId: "1:535036192036:web:f7adae97e0c0a89f647fb1"
};




// Initialize Firebase app
const app = initializeApp(firebaseConfig);


const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Authentication and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Connect to emulators only in development
if (import.meta.env.DEV) {
  connectFirestoreEmulator(db, '127.0.0.1', 8081); 
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  console.log('⚡️ Connected to Firestore and Auth emulators');
}

export default app;
