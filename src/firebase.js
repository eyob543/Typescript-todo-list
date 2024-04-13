// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvXRITHtcs06TtfdvRfgTCzp6nD_wSqss",
    authDomain: "todo-list-c5cd3.firebaseapp.com",
    projectId: "todo-list-c5cd3",
    storageBucket: "todo-list-c5cd3.appspot.com",
    messagingSenderId: "609111290234",
    appId: "1:609111290234:web:ca59c97b853f22c308a6c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export default app;
