// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import cors from "cors";

const firebaseConfig = {
  apiKey: "AIzaSyBptWvtHbu4UnSQ-MRBGyNZziiFb-VDSBY",
  authDomain: "chatapp-e64f4.firebaseapp.com",
  projectId: "chatapp-e64f4",
  storageBucket: "chatapp-e64f4.appspot.com",
  messagingSenderId: "994699594941",
  appId: "1:994699594941:web:03b75fdca7263a9973bbd4",
  measurementId: "G-D8MJ2XV3X5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db=getFirestore();