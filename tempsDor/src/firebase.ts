// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBgmVgD3Ge76WIXHkDLAiqvvooI14d85xg",
    authDomain: "temps-d-or.firebaseapp.com",
    projectId: "temps-d-or",
    storageBucket: "temps-d-or.appspot.com",
    messagingSenderId: "80217530401",
    appId: "1:80217530401:web:6d759724a1752f31510360",
    measurementId: "G-VSNB8WK2EV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
