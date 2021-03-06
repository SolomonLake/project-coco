import { UserEntry } from "./userEntry.d";

export type AppGroupEntry = {
  appGroupId: string;
  userIds: {
    [userId: string]: AppGroupUser;
  };
};

export type AppGroupUser = UserEntry & {
  userId: string;
  lastOnline: number;
  doNotDisturbUntil: number;
  currentMeeting: null | VideoMeeting;
  dailyCalendarEvents: Array<CalendarMeeting> | null;
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
