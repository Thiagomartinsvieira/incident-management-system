import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBye0y--oY7O9xRWtAI141a2KKLLVf68vY',
  authDomain: 'tickets-project-1f300.firebaseapp.com',
  projectId: 'tickets-project-1f300',
  storageBucket: 'tickets-project-1f300.appspot.com',
  messagingSenderId: '651956830765',
  appId: '1:651956830765:web:2b01cf9b140676c3ac2ea4',
  measurementId: 'G-K6SPJKCYHW',
}

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage }
