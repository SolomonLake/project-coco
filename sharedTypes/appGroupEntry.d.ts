export type AppGroupEntry = {
  appGroupId: string;
  userIds: {
    [userId: string]: AppGroupUser;
  };
};

export type AppGroupUser = {
  userId: string;
  lastOnline: number;
  availabilityStatus: UserAvailabilityStatus;
  currentMeeting: null | VideoMeeting;
  dailyCalendarEvents: Array<CalendarMeeting>;
};

export type CalendarMeeting = {
  id: string;
  eventName: string;
  startTime: string;
  endTime: string;
  eventLink: string;
};

export type VideoMeeting = {
  meetingId: string;
  meetingUrl: string;
  meetingName: string;
  meetingStartTime: string;
};

export type UserAvailabilityStatus = "available" | "busy" | "offline";
