import { 
 db,
 colRefre,
} from './index2.js';

import {
  colRef,
  colRefr
} from './index3.js';


import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDdEb07pset3rHKSotw7OPeqWGBgdJ62ho",
  authDomain: "e-pengurusan.firebaseapp.com",
  projectId: "e-pengurusan",
  storageBucket: "e-pengurusan.appspot.com",
  messagingSenderId: "254129445585",
  appId: "1:254129445585:web:a3fc464493f786c7b703f0"
}
