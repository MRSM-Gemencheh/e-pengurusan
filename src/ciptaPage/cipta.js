import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_ow3SQ-q23fH6a0-uRx5C_VhemrAHRI8",
    authDomain: "e-pengurusan-technova.firebaseapp.com",
    projectId: "e-pengurusan-technova",
    storageBucket: "e-pengurusan-technova.appspot.com",
    messagingSenderId: "103182397041",
    appId: "1:103182397041:web:8aff5a3a06b8e1d758b5d0",
    measurementId: "G-5GNDNEVXMJ"
  };


document.addEventListener('DOMContentLoaded', function() {
    // Code to execute when the DOM content is loaded
  
    const signInButton = document.getElementById('signInButton');
  
    const signOutButton = document.getElementById('signOutButton');
  
    return signInButton, signOutButton
  });

  // Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth();

auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in, you can access the user object
      console.log(user);
  
      signInButton.style.display = "none"
      signOutButton.style.display = "block"
    } else {
      // User is signed out
      console.log("User is not logged in");
    }
  });


// Fetch Program Names from Firestore

const db = getFirestore(app);