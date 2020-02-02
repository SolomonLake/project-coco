import { UserEntry } from "./../../../sharedTypes/userEntry.d";
import {
  AppGroupEntry,
  CalendarMeeting,
  AppGroupUser,
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
      appGroupId: "G" + generateRandomAlphaNumericString(5).toUpperCase(),
      userIds: {
        [firstUser.userId]: {
          ...firstUser,
          userId: firstUser.userId,
          lastOnline: Date.now(),

          doNotDisturbUntil: 0,
          currentMeeting: null,
          dailyCalendarEvents: null,
        },
      },
    };
    await appGroupsDatabaseApi.set(newAppGroup.appGroupId, newAppGroup);
    return newAppGroup;
  },
  userJoinExistingAppGroup: async (user: UserEntry, groupId: string) => {
    const appGroupUser: AppGroupUser = {
      ...user,
      userId: user.userId,
      lastOnline: Date.now(),
      doNotDisturbUntil: 0,
      currentMeeting: null,
      dailyCalendarEvents: null,
    };
    const updateGroupAccessor = {
      [`userIds.${user.userId}`]: appGroupUser,
    };
    appGroupsDatabaseApi.update(groupId, updateGroupAccessor);
    return appGroupsDatabaseAccessor.getExistingAppGroup(groupId);
  },
  updateUserDoNotDistrubUntil: async (
    appGroupId: string,
    userId: string,
    doNotDisturbUntil: number,
  ) => {
    const updateGroupAccessor = {
      [`userIds.${userId}.doNotDisturbUntil`]: doNotDisturbUntil,
    };
    await appGroupsDatabaseApi.update(appGroupId, updateGroupAccessor);
  },
  removeUserFromAppGroup: async (appGroup: AppGroupEntry, user: UserEntry) => {
    await appGroupsDatabaseApi.update(appGroup.appGroupId, {
      [`userIds.${user.userId}`]: firebase.firestore.FieldValue.delete(),
    });
  },
  setUserCalendarEvents(
    userId: string,
    appGroupId: string,
    calendarEvents: Array<CalendarMeeting>,
  ) {
    const updateGroupAccessor = {
      [`userIds.${userId}.dailyCalendarEvents`]: calendarEvents,
    };
    appGroupsDatabaseApi.update(appGroupId, updateGroupAccessor);
  },
  updateUser(user: UserEntry, appGroupId: string) {
    const updateGroupAccessor = {
      [`userIds.${user.userId}.avatarUrl`]: user.avatarUrl,
      [`userIds.${user.userId}.displayName`]: user.displayName,
      [`userIds.${user.userId}.groupId`]: user.groupId,
      [`userIds.${user.userId}.personalMeetingUrl`]: user.personalMeetingUrl,
    };
    appGroupsDatabaseApi.update(appGroupId, updateGroupAccessor);
  },
  sendAlivePing: (userId: string, appGroupId: string) => {
    const updateGroupAccessor = {
      [`userIds.${userId}.lastOnline`]: Date.now(),
    };
    appGroupsDatabaseApi.update(appGroupId, updateGroupAccessor);
  },
};
