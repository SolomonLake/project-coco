import { AppGroupEntry } from "./../../../sharedTypes/appGroupEntry.d";
import { appGroupsDatabaseAccessor } from "./appGroupsDatabaseAccessor";
import { usersDatabaseAccessor } from "./usersDatabaseAccessor";
import _ from "underscore";
import { UserEntry } from "../../../sharedTypes/userEntry";

export const databaseService = {
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
    await usersDatabaseAccessor.updateGroup(user.userId, null);
    await appGroupsDatabaseAccessor.removeUserFromAppGroup(appGroup, user);
    const group = await appGroupsDatabaseAccessor.getAppGroup(
      appGroup.appGroupId,
    );
    if (group && group.userIds && _.values(group.userIds).length === 0) {
      // no users left in group
      await appGroupsDatabaseAccessor.deleteAppGroup(group.appGroupId);
    }
  },
};
