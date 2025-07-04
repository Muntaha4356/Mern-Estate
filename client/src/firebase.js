// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-78855.firebaseapp.com",
  projectId: "mern-project-78855",
  storageBucket: "mern-project-78855.firebasestorage.app",
  messagingSenderId: "130558278285",
  appId: "1:130558278285:web:76dae37012603e8ec280c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);