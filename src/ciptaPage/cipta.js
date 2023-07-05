import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, getDocs, addDoc } from "firebase/firestore";
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


document.addEventListener('DOMContentLoaded', function () {
  // Code to execute when the DOM content is loaded

  const signInButton = document.getElementById('signInButton');
  const signOutButton = document.getElementById('signOutButton');

  // Page exclusive

  const submitButton = document.getElementById('submitButton')

  const namaProgramIP = document.getElementById('namaProgramIP')
  const anjuranIP = document.getElementById('anjuranIP')
  const lokasiIP = document.getElementById('lokasiIP')
  const tarikhIP = document.getElementById('tarikhIP')

  return signInButton, signOutButton, submitButton, namaProgramIP, anjuranIP, lokasiIP, tarikhIP
});

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth();

auth.onAuthStateChanged(function (user) {
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

submitButton.addEventListener("click", async function () {

  let namaProgramX = namaProgramIP.value
  let anjuranX = anjuranIP.value
  let lokasiX = lokasiIP.value
  let tarikhX = tarikhIP.value

  // Convert tarikhX to unix seconds before sending to Firebase

  tarikhX = new Date(tarikhX).getTime() / 1000

  console.log(tarikhX)


  // Retrieve the checked checkboxes
  let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  let jawatanX = Array.from(checkboxes).map(checkbox => checkbox.id);

  // Send to Firestore

  const docRef = await addDoc(collection(db, "program"), {
    namaProgram: namaProgramX,
    anjuran: anjuranX,
    lokasi: lokasiX,
    tarikh: tarikhX,
    jawatan: jawatanX
  });
  console.log("Document written with ID: ", docRef.id);

  // Back to previous page

  alert("Program berjaya dicipta!")

  window.history.back();

});


