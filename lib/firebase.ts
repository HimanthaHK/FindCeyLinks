import { initializeApp, getApps } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ✅ Your NEW Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA9FspNqqMEQ53xPnM19OzAuUIK4uFNrxo",
  authDomain: "findceylinks-3490e.firebaseapp.com",
  projectId: "findceylinks-3490e",
  storageBucket: "findceylinks-3490e.firebasestorage.app",
  messagingSenderId: "863261656486",
  appId: "1:863261656486:web:c64e622668cf611f65bb67",
  measurementId: "G-CJPY0RGB2Y"
};

// ✅ Make sure app is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence (optional but recommended)
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log("Firestore offline persistence enabled");
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
      } else if (err.code === 'unimplemented') {
        console.warn("The current browser doesn't support all of the features required to enable persistence.");
      } else {
        console.warn("Firestore offline persistence error:", err);
      }
    });
}

// (Optional) Analytics – only works in browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics };