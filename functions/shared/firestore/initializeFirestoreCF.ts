import admin from "firebase-admin";
import { serviceAccount } from "./firestoreServiceAccount";

export function firestoreDb() {
  if (_firestoreDb) {
    return _firestoreDb;
  } else {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://project-coco-251813.firebaseio.com",
    });

    _firestoreDb = admin.firestore();
    return _firestoreDb;
  }
}

let _firestoreDb: FirebaseFirestore.Firestore | null = null;
