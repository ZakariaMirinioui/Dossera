import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import BaseRoutes from "./routes";
import React from "react";

// Initialize Firebase (optional - remove if not needed for DOSSERA)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

let app: FirebaseApp | null = null;
if (firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
}

function App() {
    React.useEffect(() => {
        try {
            if (app && typeof window !== "undefined") {
                getAnalytics(app);
            }
        } catch {
            /* analytics optional */
        }
    }, []);

    return (
        <>
            <BaseRoutes />
        </>
    );
}

export default App;
