import { Request, Response } from "express";
import admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

export const firestoreDb = (req: Request, res: Response): any => {
  res.send("Hello, World");
};
