export type AppGroupEntry = {
  appGroupId: string;
  userIds: {
    [userId: string]: {
      userId: string;
      availabilityStatus: UserAvailabilityStatus;
      currentMeeting: null | OnlineMeeting;
      dailyCalendarEvents: {
        [eventId: string]: CalendarEvent;
      };
    };
  };
};

export type CalendarEvent = {
  eventId: string;
  eventName: string;
  startTime: string;
  endTime: string;
  eventLink: string;
};

export type OnlineMeeting = {
  meetingId: string;
  meetingUrl: string;
  meetingName: string;
  meetingStartTime: string;
};

export type UserAvailabilityStatus = "available" | "busy" | "offline";
