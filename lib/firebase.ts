import { initializeApp, getApps } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyA9FspNqqMEQ53xPnM19OzAuUIK4uFNrxo",
  authDomain: "findceylinks-3490e.firebaseapp.com",
  projectId: "findceylinks-3490e",
  storageBucket: "findceylinks-3490e.firebasestorage.app",
  messagingSenderId: "863261656486",
  appId: "1:863261656486:web:c64e622668cf611f65bb67",
  measurementId: "G-CJPY0RGB2Y"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore
export const db = getFirestore(app);

// Enable offline persistence
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    console.warn("Firestore offline persistence error:", err);
  });
}

// Firebase Auth
export const auth = getAuth(app); // ✅ Export auth

// Analytics (optional)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics };
