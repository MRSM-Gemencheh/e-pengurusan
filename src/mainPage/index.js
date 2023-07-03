// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// Handling Sign In

const provider = new GoogleAuthProvider();
const auth = getAuth();

document.addEventListener('DOMContentLoaded', function() {
  // Code to execute when the DOM content is loaded
  let programsContainer = document.getElementById('programsContainer')
  // Use the element
  let welcomeText = document.getElementById('welcomeText')

  const signInButton = document.getElementById('signInButton');

  const signOutButton = document.getElementById('signOutButton');

  return programsContainer, welcomeText, signInButton, signOutButton
});

getRedirectResult(getAuth())
.then((result) => {
  // This gives you a Google Access Token. You can use it to access Google APIs.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;

  // The signed-in user info.
  const user = result.user;
  // IdP data available using getAdditionalUserInfo(result)
  // ...

  welcomeText.textContent = "Selamat datang! Berjaya log masuk sebagai: " + result.user.displayName
  signInButton.style.display = "none"


  console.log("Sign in successful! Signed in as: " + result.user.displayName)

}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  // const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
});

auth.languageCode = 'en';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

// Additional scope requests can be passed as an array of strings.
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

function signTheUserIn() {  
  signInWithRedirect(auth, provider);
}

document.body.onload = function() {

  signInButton.addEventListener('click', () => {
    console.log("Sign in button clicked!")
    signTheUserIn();
  })


  
  signOutButton.addEventListener('click', () => { 
  
    signOut(auth).then(() => {
      location.reload()
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  
  })
}

// Fetch Program Names from Firestore

const db = getFirestore(app);

// Create a reference to the programs collection

const programsRef = collection(db, 'senaraiProgram');

// Create a query against the collection

const programsQuery = query(programsRef, orderBy('nama'));

// Get the documents from the query

const programsSnapshot = await getDocs(programsQuery);

// For every program, create a h3 element with the program name as the text content

// Wait for page load before fetching the element



programsSnapshot.forEach((doc) => {

    console.log(doc.data())

    const programName = doc.data().nama;
    const programElement = document.createElement('h1');

    const programDate = doc.data().tarikh;
    const programDateElement = document.createElement('h3');
    
    programElement.textContent = programName;
    programElement.className = 'title is-5'
    programDateElement.textContent = programDate;
    programDateElement.className = 'subtitle'


    programsContainer.appendChild(programElement);
    programsContainer.appendChild(programDateElement);


    }
);

