export type AppGroupEntry = {
  appGroupId: string;
  userIds: {
    [userId: string]: {
      userId: string;
      availabilityStatus: UserAvailabilityStatus;
      currentMeeting: null | OnlineMeeting;
      dailyCalendarEvents: Array<CalendarEvent>;
    };
  };
};

export type CalendarEvent = {
  id: string;
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
