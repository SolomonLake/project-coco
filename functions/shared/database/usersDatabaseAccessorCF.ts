import { UserEntry } from "./../../../sharedTypes/userEntry.d";
import { firestoreApiFactory } from "../firestore/firestoreApiCF";

const usersDatabaseApi = firestoreApiFactory<UserEntry>("users");

export const usersDatabaseAccessorCF = {
  getUser: async (userId: string): Promise<UserEntry | null> => {
    return await usersDatabaseApi.get(userId);
  },
};
