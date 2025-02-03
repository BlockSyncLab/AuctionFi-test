// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyxaJxYfLUyO4kUiIMxQDsGRxZzeJJiFQ",
  authDomain: "auctionfi.firebaseapp.com",
  projectId: "auctionfi",
  storageBucket: "auctionfi.firebasestorage.app",
  messagingSenderId: "475790663585",
  appId: "1:475790663585:web:d901775be2a02c1de275e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);