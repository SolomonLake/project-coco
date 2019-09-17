import { firestoreAdmin } from "./initializeFirestoreAdmin";

export function firestoreDb() {
  if (_firestoreDb) {
    return _firestoreDb;
  } else {
    const admin = firestoreAdmin();

    _firestoreDb = admin.firestore();
    return _firestoreDb;
  }
}

let _firestoreDb: FirebaseFirestore.Firestore | null = null;
