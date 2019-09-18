import { UserEntry } from "./../../../sharedTypes/userEntry.d";
import {
  AppGroupEntry,
  CalendarEvent,
} from "./../../../sharedTypes/appGroupEntry.d";
import firebase from "firebase";
import { firestoreApiFactory } from "../firestore/firestoreApi";
import { generateRandomAlphaNumericString } from "../utils/generateUtils";

const appGroupsDatabaseApi = firestoreApiFactory<AppGroupEntry>("appGroups");

export const appGroupsDatabaseAccessor = {
  watchAppGroup: (
    appGroupId: string,
    callback: (appGroup: AppGroupEntry) => void,
  ) => {
    return appGroupsDatabaseApi.watch(appGroupId, callback);
  },
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
  createNewAppGroup: async (firstUser: UserEntry) => {
    const newAppGroup: AppGroupEntry = {
      appGroupId: "g" + generateRandomAlphaNumericString(5),
      userIds: {
        [firstUser.userId]: {
          userId: firstUser.userId,
          availabilityStatus: "available",
          currentMeeting: null,
          dailyCalendarEvents: [],
        },
      },
    };
    await appGroupsDatabaseApi.set(newAppGroup.appGroupId, newAppGroup);
    return newAppGroup;
  },
  userJoinExistingAppGroup: async (user: UserEntry, groupId: string) => {
    const updateGroupAccessor = {
      [`userIds.${user.userId}`]: {
        userId: user.userId,
        availabilityStatus: "available",
        currentMeeting: null,
        dailyCalendarEvents: {},
      },
    };
    appGroupsDatabaseApi.update(groupId, updateGroupAccessor);
    return appGroupsDatabaseAccessor.getExistingAppGroup(groupId);
  },
  removeUserFromAppGroup: async (appGroup: AppGroupEntry, user: UserEntry) => {
    await appGroupsDatabaseApi.update(appGroup.appGroupId, {
      [`userIds.${user.userId}`]: firebase.firestore.FieldValue.delete(),
    });
  },
  setUserCalendarEvents(
    userId: string,
    appGroupId: string,
    calendarEvents: Array<CalendarEvent>,
  ) {
    const updateGroupAccessor = {
      [`userIds.${userId}.dailyCalendarEvents`]: calendarEvents,
    };
    appGroupsDatabaseApi.update(appGroupId, updateGroupAccessor);
  },
};