import { firestoreDb } from "./firestoreInitialize";
import { DatabaseCollection } from "../databaseServices/databaseTypes";

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
    set: async (documentPath: string, entry: T | any): Promise<void> => {
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
    watch: (documentPath: string, callback: (entry: T | any) => void) => {
      return firestoreDb()
        .collection(collection)
        .doc(documentPath)
        .onSnapshot(doc => {
          callback(doc.data() as T);
        });
    },
    batch: () => {
      return firestoreDb().batch();
    },
    docRef: (documentPath: string) => {
      return firestoreDb()
        .collection(collection)
        .doc(documentPath);
    },
    collectionRef: (collectionPath: string) => {
      return firestoreDb().collection(collection);
    },
  };
};
