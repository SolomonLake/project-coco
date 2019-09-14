import { firestoreDb } from "./firestoreInitialize";
import { DatabaseCollection } from "../databaseServices/databaseTypes";
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
    update: async (
      documentPath: string,
      entry: Partial<T | {}>,
    ): Promise<void> => {
      await firestoreDb()
        .collection(collection)
        .doc(documentPath)
        .update(entry);
    },
    delete: async (documentPath: string) => {
      await firestoreDb()
        .collection(collection)
        .doc(documentPath)
        .delete();
    },
    watch: async (document: string, callback: (entry: T) => void) => {
      firestoreDb()
        .collection(collection)
        .doc(document)
        .onSnapshot(doc => {
          callback(doc.data() as T);
        });
    },
  };
};
