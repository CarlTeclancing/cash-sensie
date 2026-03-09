// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAM1Ty9_bfRqcelMJrYON9UEUf21ifMjgw",
  authDomain: "cash-sensie.firebaseapp.com",
  projectId: "cash-sensie",
  storageBucket: "cash-sensie.firebasestorage.app",
  messagingSenderId: "110530778667",
  appId: "1:110530778667:web:7c912d9e4b930faecafc6e",
  measurementId: "G-1WLEEY3E26"
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);