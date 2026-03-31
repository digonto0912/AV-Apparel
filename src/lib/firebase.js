import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIceqMXYNY5EH_3vTmIbogjb6wJ2CCBxQ",
  authDomain: "speakup-27de0.firebaseapp.com",
  databaseURL: "https://speakup-27de0-default-rtdb.firebaseio.com",
  projectId: "speakup-27de0",
  storageBucket: "speakup-27de0.firebasestorage.app",
  messagingSenderId: "811108429557",
  appId: "1:811108429557:web:1ad8de2151de43b8f8dfbc",
  measurementId: "G-BQ65T23S3M",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
