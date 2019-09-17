import firebase from "firebase";
// Required for side-effects
import "firebase/firestore";
import { config } from "../config/config";

export function firestoreDb() {
  if (_firestoreDb) {
    return _firestoreDb;
  } else {
    throw new Error("firestoreDb not initialized");
  }
}

export async function initializeFirestore(customToken: string) {
  firebase.initializeApp({
    apiKey: config().FIRESTORE_API_KEY,
    authDomain: config().FIRESTORE_AUTH_DOMAIN,
    projectId: config().FIRESTORE_PROJECT_ID,
  });
  await firebase
    .auth()
    .signInWithCustomToken(customToken)
    .catch(function(error) {
      const { code, message } = error;
      console.log("firestoreInitialize error", code, message);
      throw error;
    });

  _firestoreDb = firebase.firestore();
}

let _firestoreDb: firebase.firestore.Firestore | null = null;
