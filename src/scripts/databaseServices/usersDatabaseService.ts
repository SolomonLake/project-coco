import { firestoreApiFactory } from "./../firestore/firestoreApi";

const usersDatabaseApi = firestoreApiFactory<UserEntry>("users");

export type UserEntry = {
  userId: string;
  groupId: string;
  displayName: string;
  personalMeetingUrl: string;
};

export const usersDatabaseService = {
  getUser: async (userId: string): Promise<UserEntry | null> => {
    return await usersDatabaseApi.get(userId);
  },
  createUser: async (user: UserEntry) => {
    return await usersDatabaseApi.set(user.userId, user);
  },
};
