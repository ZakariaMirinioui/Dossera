import BaseRoutes from "./routes";
import React from "react";

function App() {
    React.useEffect(() => {
        const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
        if (!projectId || typeof window === "undefined") return;

        try {
            import("firebase/app").then(({ initializeApp }) => {
                const app = initializeApp({
                    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
                    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
                    projectId,
                    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
                    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
                    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
                    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
                });
                import("firebase/analytics").then(({ getAnalytics }) => {
                    getAnalytics(app);
                });
            });
        } catch {
            /* analytics optional */
        }
    }, []);

    return <BaseRoutes />;
}

export default App;
