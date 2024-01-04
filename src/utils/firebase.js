// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBunuGVVGjqKqZNcEW5ba0sdxYbpIcy6og",
  authDomain: "netflixgpt-a4df5.firebaseapp.com",
  projectId: "netflixgpt-a4df5",
  storageBucket: "netflixgpt-a4df5.appspot.com",
  messagingSenderId: "274333679014",
  appId: "1:274333679014:web:a85288ffabf3807daba367",
  measurementId: "G-JYMZR647EQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
