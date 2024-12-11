// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR2XLu2__rSh_TOizUWJf3bA1dIpR1uKo",
  authDomain: "business-directory-28051.firebaseapp.com",
  projectId: "business-directory-28051",
  storageBucket: "business-directory-28051.firebasestorage.app",
  messagingSenderId: "403126806904",
  appId: "1:403126806904:web:de4828cd0b76e71a47408d",
  measurementId: "G-4YJBJMVKMF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);