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

export type UserAvailabilityStatus = "available" | "busy" | "offline";
