import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// Actual Firebase project configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check if configuration is missing (only in development)
if (import.meta.env.DEV) {
    const missingKeys = Object.entries(firebaseConfig)
        .filter(([key, value]) => !value && key !== 'measurementId')
        .map(([key]) => key);

    if (missingKeys.length > 0) {
        console.error(`Firebase configuration missing: ${missingKeys.join(', ')}. Check your .env file.`);
    }
}



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics safely
export let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;


