// init firebase app
initializeApp(firebaseConfig)

// init services
export const db = getFirestore()

//collection ref
export const colRef = collection(db, 'jawatan')
export const colRefr = collection(db, 'guru')


//get collection data
getDocs(colRef)
   .then((snapshot) => {
      let jawatan = []
      snapshot.docs.forEach((doc) => {
        jawatan.push({ ...doc.data(), id: doc.id })
      })
      console.log(jawatan)
    })
    .catch(err => {
      console.log(err.message)
    })

getDocs(colRefr)
    .then((snapshot) => {
       let guru = []
       snapshot.docs.forEach((doc) => {
         guru.push({ ...doc.data(), id: doc.id })
       })
       console.log(guru)
     })
     .catch(err => {
       console.log(err.message)
     })
