import { UserEntry } from "./usersDatabaseService";
import { firestoreApiFactory } from "./../firestore/firestoreApi";
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

export const appGroupsDatabaseService = {
  getAppGroup: async (appGroupId: string): Promise<AppGroupEntry | null> => {
    return await appGroupsDatabaseApi.get(appGroupId);
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
};
