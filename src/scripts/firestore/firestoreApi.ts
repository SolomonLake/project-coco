import { firestoreDb } from "./firestoreInitialize";
import { DatabaseCollection } from "../databaseServices/databaseServiceTypes";
import { async } from "q";

export const firestoreApiFactory = <T extends {}>(
  collection: DatabaseCollection,
) => {
  return {
    get: async (documentPath: string): Promise<T | null> => {
      const docRef = firestoreDb()
        .collection(collection)
        .doc(documentPath);

      const doc = await docRef.get();
      if (doc.exists) {
        return doc.data() as T;
      } else {
        return null;
      }
    },
    set: async (documentPath: string, entry: T): Promise<void> => {
      await firestoreDb()
        .collection(collection)
        .doc(documentPath)
        .set(entry);
    },
  };
};
