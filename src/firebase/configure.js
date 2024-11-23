import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyChTHMu5RxafzKUOop4YjMLd85opH145-U",
  authDomain: "event-mangement-5e04c.firebaseapp.com",
  projectId: "event-mangement-5e04c",
  storageBucket: "event-mangement-5e04c.firebasestorage.app",
  messagingSenderId: "685396345031",
  appId: "1:685396345031:web:3efe623d915cf5dea9fee2",
  measurementId: "G-68P0TTWHRZ"
};

 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app)