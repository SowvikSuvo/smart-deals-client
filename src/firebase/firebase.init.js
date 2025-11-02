// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqBLMXDHWRxkjrv7RI8Y3uG_EzAnqbciI",
  authDomain: "smart-deals-95790.firebaseapp.com",
  projectId: "smart-deals-95790",
  storageBucket: "smart-deals-95790.firebasestorage.app",
  messagingSenderId: "545907273703",
  appId: "1:545907273703:web:48fcaaa914766f97195742",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
