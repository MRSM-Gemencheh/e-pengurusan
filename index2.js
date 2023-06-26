// init firebase app
initializeApp(firebaseConfig)

// init services
export const db = getFirestore()

//collection ref
export const colRefre = collection(db, 'program')



//get collection data
 getDocs(colRefre)
   .then((snapshot) => {
      let program = []
      snapshot.docs.forEach((doc) => {
        program.push({ ...doc.data(), id: doc.id })
      })
      console.log(program)
    })
    .catch(err => {
      console.log(err.message)
    })
