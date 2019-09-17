import admin from "firebase-admin";
import { serviceAccount } from "./firestoreServiceAccount";

export function firestoreAdmin() {
  if (_firestoreAdmin) {
    return _firestoreAdmin;
  } else {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://project-coco-251813.firebaseio.com",
    });

    _firestoreAdmin = admin;
    return _firestoreAdmin;
  }
}

let _firestoreAdmin: typeof admin | null = null;
