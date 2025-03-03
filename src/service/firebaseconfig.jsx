// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD68nrtTvn41HOuHpkjkjNX5v32NjFe3I",
  authDomain: "ai-trip-planner-e0aad.firebaseapp.com",
  projectId: "ai-trip-planner-e0aad",
  storageBucket: "ai-trip-planner-e0aad.firebasestorage.app",
  messagingSenderId: "877992260812",
  appId: "1:877992260812:web:0c39aa54351b7a42257e69",
  measurementId: "G-KPKR9J1R5E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
//const analytics = getAnalytics(app);