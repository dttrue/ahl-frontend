// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseKey = process.env.REACT_APP_API_KEY;

console.log(process.env)

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "ahl-app.firebaseapp.com",
  projectId: "ahl-app",
  storageBucket: "ahl-app.appspot.com",
  messagingSenderId: "473760125882",
  appId: "1:473760125882:web:e6c34c8f0508227dcf0383",
  measurementId: "G-RFG7RDTD4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth