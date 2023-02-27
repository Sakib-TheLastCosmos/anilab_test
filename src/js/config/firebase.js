// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzt_zZJMAUZ0QbhcBuy4fIG3JkVlzCSy4",
  authDomain: "anilab-42c99.firebaseapp.com",
  projectId: "anilab-42c99",
  storageBucket: "anilab-42c99.appspot.com",
  messagingSenderId: "897409077716",
  appId: "1:897409077716:web:e94b6ac83c03274c6fc641",
  measurementId: "G-K614ELZZKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()
export const storage = getStorage(app)
