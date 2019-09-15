import { firestoreApiFactory } from "../firestore/firestoreApi";
import { ZoomUser } from "../../../sharedTypes/zoomTypes";
import { UserEntry } from "../../../sharedTypes/userEntry";

const usersDatabaseApi = firestoreApiFactory<UserEntry>("users");

export const usersDatabaseAccessor = {
  getUser: async (userId: string): Promise<UserEntry | null> => {
    return await usersDatabaseApi.get(userId);
  },
  createUser: async (user: UserEntry) => {
    return await usersDatabaseApi.set(user.userId, user);
  },
  findOrCreateUser: async (user: ZoomUser): Promise<UserEntry> => {
    const existingUser = await usersDatabaseAccessor.getUser(user.id);
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
