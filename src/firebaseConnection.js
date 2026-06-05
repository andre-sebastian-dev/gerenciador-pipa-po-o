import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDCN-pZiQBXmh7Rd6OdwWy1h3CV1XP16lE",
  authDomain: "pipa-poco.firebaseapp.com",
  projectId: "pipa-poco",
  storageBucket: "pipa-poco.firebasestorage.app",
  messagingSenderId: "733854114235",
  appId: "1:733854114235:web:66562892c1237509eae49e",
  measurementId: "G-CZY25CPDCD"
};

const firebaApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaApp);
const auth = getAuth(firebaApp)

export {db, auth};