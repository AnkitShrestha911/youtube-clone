// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
    authDomain: "clone-c8a97.firebaseapp.com",
    projectId: "clone-c8a97",
    storageBucket: "clone-c8a97.appspot.com",
    messagingSenderId: "701768094966",
    appId: "1:701768094966:web:98966cbe0fca001631c8d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);