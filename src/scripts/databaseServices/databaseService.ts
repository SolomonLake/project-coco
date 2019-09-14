import {
  appGroupsDatabaseAccessor,
  AppGroupEntry,
} from "./appGroupsDatabaseAccessor";
import { usersDatabaseAccessor, UserEntry } from "./usersDatabaseAccessor";

export const databaseApi = {
  createGroup: async (user: UserEntry): Promise<AppGroupEntry> => {
    const newGroup = await appGroupsDatabaseAccessor.createNewAppGroup(user);
    await usersDatabaseAccessor.updateGroup(user.userId, newGroup.appGroupId);
    return newGroup;
  },
  userTryJoinGroup: async (
    user: UserEntry,
    groupId: string,
  ): Promise<AppGroupEntry | null> => {
    const existingGroup = await appGroupsDatabaseAccessor.getAppGroup(groupId);
    if (existingGroup) {
      const group = await appGroupsDatabaseAccessor.userJoinExistingAppGroup(
        user,
        groupId,
      );
      await usersDatabaseAccessor.updateGroup(user.userId, groupId);
      return group;
    } else {
      return null;
    }
  },
  userLeaveGroup: async (user: UserEntry, appGroup: AppGroupEntry) => {
    await appGroupsDatabaseAccessor.removeUserFromAppGroup(appGroup, user);
    await usersDatabaseAccessor.updateGroup(user.userId, null);
  },
};
