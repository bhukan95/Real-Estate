// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-55f22.firebaseapp.com",
  projectId: "real-estate-55f22",
  storageBucket: "real-estate-55f22.appspot.com",
  messagingSenderId: "1031301161815",
  appId: "1:1031301161815:web:ae062e38b749ade95f1412",
  measurementId: "G-L57WWBGZRC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);