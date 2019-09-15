import { firestoreDb } from "./initializeFirestoreCF";

export const firestoreApiFactory = <T extends {}>(collection: string) => {
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
  };
};
