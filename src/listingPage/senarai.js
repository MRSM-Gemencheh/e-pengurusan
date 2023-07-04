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
    let userName = document.getElementById('userName')
  
    return signInButton, signOutButton, userName
  });


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth();

// Get current logged in user

const user = auth.currentUser;

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in, you can access the user object
    console.log(user);

        // welcomeText.textContent = "Selamat datang! Berjaya log masuk sebagai: " + user.displayName
        userName.textContent = user.displayName

    signInButton.style.display = "none"
    signOutButton.style.display = "block"
  } else {
    // User is signed out
    console.log("User is not logged in");
  }
});


// Fetch Program Names from Firestore

const db = getFirestore(app);

// Create a reference to the programs collection

const programsRef = collection(db, 'program');

// Create a query against the collection

const programsQuery = query(programsRef, orderBy('tarikh'));

// Get the documents from the query

const programsSnapshot = await getDocs(programsQuery);

// For every program, create a h3 element with the program name as the text content

document.addEventListener('DOMContentLoaded', function() {
  // Code to execute when the DOM content is loaded
  let programsContainer = document.getElementById('programsContainer')
  // Use the element

  return programsContainer
});

programsSnapshot.forEach((doc) => {

    // console.log(doc.data())

    const programName = doc.data().namaProgram;
    const programElement = document.createElement('h1');

    const programDate = doc.data().tarikh;
    const date = new Date(programDate.seconds * 1000);
    let dateFormat = date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();

    const programDateElement = document.createElement('h3');

    const kemaskiniElement = document.createElement('button')
    kemaskiniElement.className = 'button is-link mx-4'
    kemaskiniElement.textContent = "Kemaskini"
    kemaskiniElement.id = doc.id
    
    const padamElement = document.createElement('button')
    padamElement.className = 'button is-danger'
    padamElement.textContent = "Padam"
    padamElement.id = doc.id

    
    programElement.textContent = programName;
    programElement.className = 'title is-5 mt-5'
    programDateElement.textContent = dateFormat;
    programDateElement.className = 'subtitle'


    programsContainer.appendChild(programElement);
    programsContainer.appendChild(programDateElement);
    programsContainer.appendChild(kemaskiniElement);
    programsContainer.appendChild(padamElement);

    }
);





























