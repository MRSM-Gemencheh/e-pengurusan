import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_ow3SQ-q23fH6a0-uRx5C_VhemrAHRI8",
    authDomain: "e-pengurusan-technova.firebaseapp.com",
    projectId: "e-pengurusan-technova",
    storageBucket: "e-pengurusan-technova.appspot.com",
    messagingSenderId: "103182397041",
    appId: "1:103182397041:web:8aff5a3a06b8e1d758b5d0",
    measurementId: "G-5GNDNEVXMJ"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Fetch Program Names from Firestore

const db = getFirestore(app);

// Create a reference to the programs collection

const programsRef = collection(db, 'senaraiProgram');

// Create a query against the collection

const programsQuery = query(programsRef, orderBy('nama'));

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

    console.log(doc.data())

    const programName = doc.data().nama;
    const programElement = document.createElement('h1');

    const programDate = doc.data().tarikh;
    const programDateElement = document.createElement('h3');

    const kemaskiniElement = document.createElement('button')
    kemaskiniElement.className = 'button is-link mx-4'
    kemaskiniElement.textContent = "Kemaskini"
    
    const padamElement = document.createElement('button')
    padamElement.className = 'button is-danger'
    padamElement.textContent = "Padam"

    
    programElement.textContent = programName;
    programElement.className = 'title is-5 mt-5'
    programDateElement.textContent = programDate;
    programDateElement.className = 'subtitle'


    programsContainer.appendChild(programElement);
    programsContainer.appendChild(programDateElement);
    programsContainer.appendChild(kemaskiniElement);
    programsContainer.appendChild(padamElement);


    }
);





























