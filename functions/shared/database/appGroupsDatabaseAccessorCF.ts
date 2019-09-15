import { AppGroupEntry } from "./../../../sharedTypes/appGroupEntry.d";
import firebase from "firebase";
import { firestoreApiFactory } from "../firestore/firestoreApiCF";

const appGroupsDatabaseApi = firestoreApiFactory<AppGroupEntry>("appGroups");

export const appGroupsDatabaseAccessor = {
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
  deleteAppGroup: async (appGroupId: string) => {
    return await appGroupsDatabaseApi.delete(appGroupId);
  },
  createAppGroup: async (appGroup: AppGroupEntry) => {
    return await appGroupsDatabaseApi.set(appGroup.appGroupId, appGroup);
  },
};
