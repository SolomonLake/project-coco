import { firestoreApiFactory } from "./../firestore/firestoreApi";

const appGroupsDatabaseApi = firestoreApiFactory<AppGroupEntry>("appGroups");

export type AppGroupEntry = {
  appGroupId: string;
  userIds: {
    [userId: string]: {
      userId: string;
      availabilityStatus: string;
      meetingUrl: string;
      meetingName: string;
      meetingStartTime: string;
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

export const appGroupsDatabaseService = {
  getAppGroup: async (appGroupId: string): Promise<AppGroupEntry | null> => {
    return await appGroupsDatabaseApi.get(appGroupId);
  },
  createAppGroup: async (appGroup: AppGroupEntry) => {
    return await appGroupsDatabaseApi.set(appGroup.appGroupId, appGroup);
  },
};
