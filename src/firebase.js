// firebase.js — configuration et initialisation de Firebase
// Ce fichier est importé partout où on a besoin de Firebase

import { initializeApp }              from 'firebase/app'
import { getFirestore }               from 'firebase/firestore'
import { getAuth }                    from 'firebase/auth'

// Configuration Firebase depuis les variables d'environnement
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialise Firebase
const app = initializeApp(firebaseConfig)

// Export des services dont on a besoin
export const db   = getFirestore(app)  // base de données
export const auth = getAuth(app)       // authentification