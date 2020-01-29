import admin from "firebase-admin";
import { serviceAccount } from "./firestoreServiceAccount";
import { processEnv } from "../../processEnv";

export function firestoreAdmin() {
  if (_firestoreAdmin) {
    return _firestoreAdmin;
  } else {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: processEnv.FIRESTORE_DATABASE_URL,
    });

    _firestoreAdmin = admin;
    return _firestoreAdmin;
  }
}

let _firestoreAdmin: typeof admin | null = null;
