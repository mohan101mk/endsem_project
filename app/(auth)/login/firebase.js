// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCZQJwit5zmlM-_WSFnjBr--eLZcPmCi0",
  authDomain: "finx-29d7a.firebaseapp.com",
  projectId: "finx-29d7a",
  storageBucket: "finx-29d7a.appspot.com",
  messagingSenderId: "1042909293879",
  appId: "1:1042909293879:web:3df7ce9a968e157a933eb2",
  measurementId: "G-LSSDB052LF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);