import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyARv8FhJ_MOlrjG7vqDnlWWeG2cEzv2sLw",
  authDomain: "canker-tracker.firebaseapp.com",
  projectId: "canker-tracker",
  storageBucket: "canker-tracker.appspot.com",
  messagingSenderId: "545644088430",
  appId: "1:545644088430:web:95ee1f493415fcd9ac6a7f",
  measurementId: "G-B4Z069P3KT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 

export const db = getFirestore(app);