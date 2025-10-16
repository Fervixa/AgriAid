// /lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// ✅ Prevent re-initialization during hot reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Google provider
export const provider = new GoogleAuthProvider();

// ✅ Make login persistent (stay logged in after refresh)
// Only call browser-specific APIs when running in the browser.
if (typeof window !== "undefined") {
  // setPersistence returns a promise but we intentionally don't await it here
  // to avoid changing module evaluation ordering. Any errors will be logged.
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    // Log persistence errors in development so they don't fail the build.
    // In production you may want to handle this differently.
    // eslint-disable-next-line no-console
    console.warn("Could not set Firebase auth persistence:", err);
  });
}

// Helper to create a Google provider instance (keeps the client import stable)
export function createGoogleProvider() {
  const p = new GoogleAuthProvider();
  // prompt to select account by default
  p.setCustomParameters({ prompt: "select_account" });
  return p;
}

export default app;
