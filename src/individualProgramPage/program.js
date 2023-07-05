import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// DOM elements
document.addEventListener('DOMContentLoaded', async function () {
    const programName = document.getElementById('programName');
    const signInButton = document.getElementById('signInButton');
    const signOutButton = document.getElementById('signOutButton');

    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            userName.textContent = user.displayName;

            signInButton.style.display = "none";
            signOutButton.style.display = "block";
        } else {
            console.log("User is not logged in");
        }
    });

    // Get the document ID from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const docID = urlParams.get('docID');

    // Get the details about the program from the 'program' collection in Firestore using the document ID
    const programRef = doc(db, "program", docID);
    const programDocSnap = await getDoc(programRef);

    // Get the list of teachers from the 'guru' collection in Firestore
    const guruRef = collection(db, "guru");
    const guruQuery = query(guruRef, orderBy("nama"));
    const guruDocSnap = await getDocs(guruQuery);

    // From the 'guru' collection snapshot, store all of the names in an array
    let guruArray = [];
    guruDocSnap.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().nama);
        guruArray.push(doc.data().nama);
    });

    // Rest of your code that depends on the guruArray

    // From the snapshot of the document, do the following:
    // 1. Display the program name
    // 2. Display the list of jawatan in the program
    // 3. For every jawatan, create a dropdown listing all of the teacher's name in the 'guru' collection from Firebase

    let jawatanArray = [];

    if (programDocSnap.exists()) {
        programName.textContent = programDocSnap.data().namaProgram;

        // Store the list of jawatan in an array
        for (let i = 0; i < programDocSnap.data().jawatan.length; i++) {
            jawatanArray.push(programDocSnap.data().jawatan[i].jawatan);
        }

        // Create the dropdowns after fetching the necessary data
        createDropdowns();
    } else {
        console.log("No such document!");
    }

    function createDropdowns() {
        const mainForm = document.getElementById('mainForm');

        for (let i = 0; i < jawatanArray.length; i++) {

            const blockElement = document.createElement('div')
            blockElement.className = "mt-5"
            mainForm.appendChild(blockElement)

            let jawatanName = document.createElement('h3');
            // Capitalize and remove dashes before setting it as the textcontent
            jawatanArray[i] = jawatanArray[i].replace(/-/g, ' ');
            jawatanArray[i] = jawatanArray[i].replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            jawatanName.textContent = jawatanArray[i];
            blockElement.appendChild(jawatanName);

            const bulmaSelectDiv = document.createElement('div')
            bulmaSelectDiv.className = 'select'
            blockElement.appendChild(bulmaSelectDiv)

            const guruDropdown = document.createElement('select');
            guruDropdown.setAttribute('id', 'guruDropdown' + i);
            guruDropdown.setAttribute('name', 'guruDropdown' + i);
            guruDropdown.setAttribute('class', 'guruDropdown');
            bulmaSelectDiv.appendChild(guruDropdown);

            // Create an option for every teacher in the 'guru' collection
            for (let j = 0; j < guruArray.length; j++) {
                const guruOption = document.createElement('option');
                guruOption.setAttribute('value', guruArray[j]);
                guruOption.textContent = guruArray[j];
                guruDropdown.appendChild(guruOption);
            }

            // Create an option for 'Tiada'
            const guruOption = document.createElement('option');
            guruOption.setAttribute('value', 'Tiada');
            guruOption.textContent = 'Tiada';
            guruDropdown.appendChild(guruOption);
        }

        // Create the first 'div' element with the class 'field is-grouped mt-5'
        const div1 = document.createElement('div');
        div1.className = 'field is-grouped mt-5';

        // Create the first 'div' element with the class 'control'
        const divControl1 = document.createElement('div');
        divControl1.className = 'control';

        // Create the 'button' element with the class 'button is-link' and the ID 'submitButton'
        const submitButton = document.createElement('button');
        submitButton.className = 'button is-link';
        submitButton.id = 'submitButton';
        submitButton.textContent = 'Hantar';

        // Append the 'submitButton' to the first 'div' with the class 'control'
        divControl1.appendChild(submitButton);

        // Create the second 'div' element with the class 'control'
        const divControl2 = document.createElement('div');
        divControl2.className = 'control';

        // Create the 'button' element with the class 'button is-link is-light'
        const cancelButton = document.createElement('button');
        cancelButton.className = 'button is-link is-light';

        // Create the 'a' element with the href './senarai.html' and the text 'Batal'
        const cancelButtonLink = document.createElement('a');
        cancelButtonLink.href = './senarai.html';
        cancelButtonLink.textContent = 'Batal';

        // Append the 'cancelButtonLink' to the 'cancelButton'
        cancelButton.appendChild(cancelButtonLink);

        // Append the 'cancelButton' to the second 'div' with the class 'control'
        divControl2.appendChild(cancelButton);

        // Append the first 'div' with the class 'control' to the 'div' with the class 'field is-grouped mt-5'
        div1.appendChild(divControl1);

        // Append the second 'div' with the class 'control' to the 'div' with the class 'field is-grouped mt-5'
        div1.appendChild(divControl2);

        // Append the 'div' with the class 'field is-grouped mt-5' to the 'mainForm'
        mainForm.appendChild(div1);


        // When the user clicks the button send the data in the form to firestore
        // Update the document of the 'program' collection to include a new array named 'pengisiTugas'
        // The array should have the jawatan name and who is going to fill in the jawatan based on the selected dropdown value

        // Add event listener to the submit button
        submitButton.addEventListener('click', async function () {
            // Create an array to store the pengisiTugas data
            const pengisiTugasArray = [];

            // Iterate over the jawatanArray to get the selected values from the dropdowns
            for (let i = 0; i < jawatanArray.length; i++) {
                const guruDropdown = document.getElementById('guruDropdown' + i);
                const selectedTeacher = guruDropdown.value;

                // Create an object with the jawatan name and selected teacher
                const pengisiTugas = {
                    jawatan: jawatanArray[i],
                    guru: selectedTeacher
                };

                // Add the pengisiTugas object to the array
                pengisiTugasArray.push(pengisiTugas);
            }

            // Update the document in the 'program' collection
            try {
                await updateDoc(programRef, {
                    pengisiTugas: pengisiTugasArray
                });
                console.log("Document successfully updated!");
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        });






    }
});
