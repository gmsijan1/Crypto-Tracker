// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9KUA-5vjKWmVVNTkeiilXWYYaUbvPsEA",
  authDomain: "crypto-tracker-6d25d.firebaseapp.com",
  projectId: "crypto-tracker-6d25d",
  storageBucket: "crypto-tracker-6d25d.firebasestorage.app",
  messagingSenderId: "141657753462",
  appId: "1:141657753462:web:347077f12d87f96c955c57",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
