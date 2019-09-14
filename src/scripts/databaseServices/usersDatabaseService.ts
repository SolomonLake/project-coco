import { firestoreApiFactory } from "./../firestore/firestoreApi";
import { ZoomUser } from "../../shared/types/zoomTypes";

const usersDatabaseApi = firestoreApiFactory<UserEntry>("users");

export type UserEntry = {
  userId: string;
  groupId: string | null;
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
  findOrCreateUser: async (user: ZoomUser): Promise<UserEntry> => {
    const existingUser = await usersDatabaseService.getUser(user.id);
    if (existingUser) {
      return existingUser;
    } else {
      const userEntry = {
        userId: user.id,
        groupId: null,
        displayName: user.first_name + " " + user.last_name,
        personalMeetingUrl: user.personal_meeting_url,
      };
      await usersDatabaseApi.set(userEntry.userId, userEntry);
      return userEntry;
    }
  },
  updateGroup: async (userId: string, groupId: string | null) => {
    await usersDatabaseApi.update(userId, { groupId });
  },
};
