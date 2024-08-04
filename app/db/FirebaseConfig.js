// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK6qDVVm3gl5-tz7EdbWs3Ooip__m3Tns",
  authDomain: "dmayorfitnesshub.firebaseapp.com",
  projectId: "dmayorfitnesshub",
  storageBucket: "dmayorfitnesshub.appspot.com",
  messagingSenderId: "930615567780",
  appId: "1:930615567780:web:3215f52612727e62e8cd31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
