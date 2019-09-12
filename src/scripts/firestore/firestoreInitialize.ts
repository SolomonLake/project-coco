import firebase from "firebase";
// Required for side-effects
import "firebase/firestore";

export function firestoreDb() {
  if (_firestoreDb) {
    return _firestoreDb;
  } else {
    throw new Error("firestoreDb not initialized");
  }
}

export async function initializeFirestore(customToken: string) {
  firebase.initializeApp({
    apiKey: "AIzaSyD-Lhms0AxUKDuyccRdicHf6xUCIT-vB0A",
    authDomain: "project-coco-251813.firebaseapp.com",
    projectId: "project-coco-251813",
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
