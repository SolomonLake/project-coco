import {
  AppGroupEntry,
  OnlineMeeting,
} from "./../../../sharedTypes/appGroupEntry.d";
import { firestoreApiFactory } from "../firestore/firestoreApiCF";

const appGroupsDatabaseApi = firestoreApiFactory<AppGroupEntry>("appGroups");

export const appGroupsDatabaseAccessorCF = {
  getAppGroup: async (appGroupId: string): Promise<AppGroupEntry | null> => {
    return await appGroupsDatabaseApi.get(appGroupId);
  },
  getExistingAppGroup: async (appGroupId: string): Promise<AppGroupEntry> => {
    const existingGroup = await appGroupsDatabaseApi.get(appGroupId);
    if (existingGroup) {
      return existingGroup;
    } else {
      throw new Error(
        "getExistingAppGroup: group doesn't exist with id:" + appGroupId,
      );
    }
  },
  setUserCurrentMeeting(
    userId: string,
    appGroupId: string,
    currentMeeting: OnlineMeeting | null,
  ) {
    const updateGroupAccessor = {
      [`userIds.${userId}.currentMeeting`]: currentMeeting,
    };
    appGroupsDatabaseApi.update(appGroupId, updateGroupAccessor);
  },
};
