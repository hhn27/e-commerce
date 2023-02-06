import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAUe9HyZl-36Bv5TvCOGvNs5nfv0YS-lZk",
    authDomain: "e-commerce-fda6a.firebaseapp.com",
    databaseURL: "https://e-commerce-fda6a-default-rtdb.firebaseio.com",
    projectId: "e-commerce-fda6a",
    storageBucket: "e-commerce-fda6a.appspot.com",
    messagingSenderId: "517619504375",
    appId: "1:517619504375:web:b6215dd2a501330e0ceff2"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)