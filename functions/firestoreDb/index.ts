import { Request, Response } from "express";
import admin from "firebase-admin";
import { serviceAccount } from "./scripts/firestoreServiceAccount";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-coco-251813.firebaseio.com",
});

const db = admin.firestore();

export const firestoreDb = (req: Request, res: Response): any => {
  let docRef = db.collection("users").doc("alovelace");

  let setAda = docRef.set({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
};
