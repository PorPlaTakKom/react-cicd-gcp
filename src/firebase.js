import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyABidwK2SgFbZaGrwS02AuPWpxskHqflb0",
  authDomain: "khamsap-419713.firebaseapp.com",
  databaseURL: "https://khamsap-419713-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "khamsap-419713",
  storageBucket: "khamsap-419713.appspot.com",
  messagingSenderId: "83592512351",
  appId: "1:83592512351:web:d0ad973ebea10670882cea"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "kham-sap"); 