import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, getAuth, signOut, linkWithCredential } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC_ow3SQ-q23fH6a0-uRx5C_VhemrAHRI8",
    authDomain: "e-pengurusan-technova.firebaseapp.com",
    projectId: "e-pengurusan-technova",
    storageBucket: "e-pengurusan-technova.appspot.com",
    messagingSenderId: "103182397041",
    appId: "1:103182397041:web:8aff5a3a06b8e1d758b5d0",
    measurementId: "G-5GNDNEVXMJ"
};


document.addEventListener('DOMContentLoaded', function () {

    const programName = document.getElementById('programName');
    const signInButton = document.getElementById('signInButton');
    const signOutButton = document.getElementById('signOutButton');


    return programName, signInButton, signOutButton
});

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth();

auth.onAuthStateChanged(function (user) {
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


// Get the document ID from the URL

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const docID = urlParams.get('docID')

const db = getFirestore(app);

// Get the details about the program from the 'program' collection in Firestore using the document ID

const programRef = doc(db, "program", docID);
const programDocSnap = getDoc(programRef);

// Get the list of teachers from the 'guru' collection in Firestore

const guruRef = collection(db, "guru");
const guruQuery = query(guruRef, orderBy("nama"));
const guruDocSnap = getDocs(guruQuery);

// From the 'guru' collection snapshot, store all of the names in an array

let guruArray = []

guruDocSnap.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().nama);
        guruArray.push(doc.data().nama)
    });
});

// From the snapshot of the document, do the following:
// 1. Display the program name
// 2. Display the list of jawatan in the program
// 3. For every jawatan, create a dropdown listing all of the teacher's name in the 'guru' collection from Firebase

let jawatanArray = []


programDocSnap.then((doc) => {
    if (doc.exists()) {
        console.log("Document data:", doc.data());
        programName.textContent = doc.data().namaProgram

        // Store the list of jawatan in an array


        for (let i = 0; i < doc.data().jawatan.length; i++) {
            jawatanArray.push(doc.data().jawatan[i])
        }

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
).catch((error) => {
    console.log("Error getting document:", error);
}
);


// For every jawatan, display the jawatan name and create a dropdown listing all of the teacher's name in the 'guru' collection from Firebase
// Append the jawatan name and the dropdown to the 
