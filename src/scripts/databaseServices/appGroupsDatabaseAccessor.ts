import firebase from "firebase";
import { UserEntry } from "./usersDatabaseAccessor";
import { firestoreApiFactory } from "../firestore/firestoreApi";
import { generateRandomAlphaNumericString } from "../utils/generateUtils";

const appGroupsDatabaseApi = firestoreApiFactory<AppGroupEntry>("appGroups");

export type AppGroupEntry = {
  appGroupId: string;
  userIds: {
    [userId: string]: {
      userId: string;
      availabilityStatus: UserAvailabilityStatus;
      currentMeeting: null | {
        meetingUrl: string | null;
        meetingName: string;
        meetingStartTime: string;
      };
      dailyCalendarEvents: {
        [eventId: string]: {
          eventId: string;
          eventName: string;
          startTime: string;
          endTime: string;
          eventLink: string;
        };
      };
    };
  };
};

type UserAvailabilityStatus = "available" | "busy" | "offline";

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
          dailyCalendarEvents: {},
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
};
