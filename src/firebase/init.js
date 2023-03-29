// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQmU3nqAVuArDlIF_vsnYCqAnzshZs9Lg",
  authDomain: "mayrang-shoppy.firebaseapp.com",
  databaseURL: "https://mayrang-shoppy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mayrang-shoppy",
  storageBucket: "mayrang-shoppy.appspot.com",
  messagingSenderId: "871859531754",
  appId: "1:871859531754:web:4be57c6acfa5482aaf8c93",
  measurementId: "G-2813BKNQ6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
