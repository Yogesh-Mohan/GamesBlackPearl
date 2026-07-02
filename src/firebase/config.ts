import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAYz-YWUwXo6HU8rVGWMTYhgdUh4dX5gPI",
  authDomain: "black-pearl-games-b0384.firebaseapp.com",
  projectId: "black-pearl-games-b0384",
  storageBucket: "black-pearl-games-b0384.firebasestorage.app",
  messagingSenderId: "698840474540",
  appId: "1:698840474540:web:c8612d2fdcb648d1341009",
  measurementId: "G-M87JNQNX9F"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics only runs on the client
export const getClientAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
