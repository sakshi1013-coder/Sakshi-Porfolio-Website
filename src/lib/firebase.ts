import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbPV6VwZYUhaplgQKkm1nWzSA3xNzG_l0",
    authDomain: "sakshi-642e3.firebaseapp.com",
    projectId: "sakshi-642e3",
    storageBucket: "sakshi-642e3.firebasestorage.app",
    messagingSenderId: "641355112068",
    appId: "1:641355112068:web:23dcd54be3f8cb1b4f6cd1",
    measurementId: "G-8S4CMTKM40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only on client side)
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

// Initialize Services
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, storage, auth, db };
