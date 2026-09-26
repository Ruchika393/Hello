import { initializeApp } from "firebase/app";
// 1. Add GoogleAuthProvider to the firebase/auth imports
import { getAuth, GoogleAuthProvider } from "firebase/auth";
console.log(
  "Firebase API Key loaded:",
  !!import.meta.env.VITE_FIREBASE_APIKEY
);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewai-79bce.firebaseapp.com",
  projectId: "interviewai-79bce",
  storageBucket: "interviewai-79bce.firebasestorage.app",
  messagingSenderId: "727744041137",
  appId: "1:727744041137:web:d92cd31b5299aff5dcd290"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };