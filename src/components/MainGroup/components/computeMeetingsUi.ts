import {
  AppGroupEntry,
  VideoMeeting,
  CalendarMeeting,
  AppGroupUser,
} from "../../../../sharedTypes/appGroupEntry.d";
import { KEEP_ALIVE_PING_INTERVAL } from "../MainGroup";
import { getCurrentCalendarEvent } from "../components/calendarUiUtils";
import _ from "underscore";

export type MeetingUsers = { [userId: string]: AppGroupUser };
export type VideoMeetings = {
  [videoMeetingId: string]: {
    meeting: VideoMeeting;
    users: MeetingUsers;
  };
};
export type CalendarMeetings = {
  [calendarMeetingId: string]: {
    meeting: CalendarMeeting;
    users: MeetingUsers;
  };
};
export type Meetings = {
  offline: MeetingUsers;
  video: VideoMeetings;
  calendar: CalendarMeetings;
  available: MeetingUsers;
  busy: MeetingUsers;
};
// lastOnline
// currentMeeting
// dailyCalendarEvents
// Offline:
//  Date.now() - lastOnline > KEEP_ALIVE_PING_INTERVAL
// Do not Disturb:
//  !offline && !videoCall and !calendarEvent && status === busy
// Available:
//  !offline && !videoCall and !calendarEvent && status === available
// Video Calls:
//  videoCall = !offline && currentMeeting is not null
// Calendar Events:
//  calendarEvent = !offline && have event in daily calendar events where startTime is in past and endTime is in future
export function computeMeetingsUi(
  appGroup: AppGroupEntry,
  currentUserId: string,
): Meetings {
  const { [currentUserId]: currentUser, ...restOfUsers } = appGroup.userIds;
  const sortedUserIds = [currentUser, ..._.values(restOfUsers).sort()];

  const currentTime = Date.now();
  const offlineUsers: MeetingUsers = sortedUserIds.reduce(
    (gatheredOfflineUsers, user) => {
      const userIsOffline =
        currentTime - user.lastOnline > KEEP_ALIVE_PING_INTERVAL * 1.5;
      if (userIsOffline) {
        return {
          ...gatheredOfflineUsers,
          [user.userId]: user,
        };
      } else {
        return gatheredOfflineUsers;
      }
    },
    {},
  );

  const videoMeetings: VideoMeetings = sortedUserIds.reduce(
    (gatheredVideoMeetings, user) => {
      const userIsNotOffline = !offlineUsers[user.userId];
      if (userIsNotOffline && user.currentMeeting) {
        const userVideoMeeting = user.currentMeeting;
        const existingMeeting =
          gatheredVideoMeetings[userVideoMeeting.meetingId];
        const existingMeetingUsers = existingMeeting
          ? existingMeeting.users
          : {};
        return {
          ...gatheredVideoMeetings,
          [userVideoMeeting.meetingId]: {
            meeting: userVideoMeeting,
            users: {
              ...existingMeetingUsers,
              [user.userId]: user,
            },
          },
        };
      } else {
        return gatheredVideoMeetings;
      }
    },
    {} as VideoMeetings,
  );

  const calendarMeetings: CalendarMeetings = sortedUserIds.reduce(
    (gatheredCalendarMeetings, user) => {
      const userIsNotOffline = !offlineUsers[user.userId];
      const currentCalendarEvent = getCurrentCalendarEvent(
        user.dailyCalendarEvents,
      );
      if (userIsNotOffline && !!currentCalendarEvent) {
        const existingCalendarEvent =
          gatheredCalendarMeetings[currentCalendarEvent.id];
        const existingCalendarEventUsers = existingCalendarEvent
          ? existingCalendarEvent.users
          : {};
        return {
          ...gatheredCalendarMeetings,
          [currentCalendarEvent.id]: {
            meeting: currentCalendarEvent,
            users: {
              ...existingCalendarEventUsers,
              [user.userId]: user,
            },
          },
        };
      } else {
        return gatheredCalendarMeetings;
      }
    },
    {} as CalendarMeetings,
  );

  const availableUsers: MeetingUsers = sortedUserIds.reduce(
    (gatheredAvailableUsers, user) => {
      const userIsNotOffline = !offlineUsers[user.userId];
      const userDoesntHaveCurrentVideoMeeting = !user.currentMeeting;
      const userDoesntHaveCurrentCalendarEvent = !getCurrentCalendarEvent(
        user.dailyCalendarEvents,
      );
      // const userStatusIsAvailable = user.availabilityStatus === "available";
      if (
        userIsNotOffline &&
        userDoesntHaveCurrentVideoMeeting &&
        userDoesntHaveCurrentCalendarEvent
        //&& userStatusIsAvailable
      ) {
        return {
          ...gatheredAvailableUsers,
          [user.userId]: user,
        };
      } else {
        return gatheredAvailableUsers;
      }
    },
    {},
  );

  const busyUsers: MeetingUsers = sortedUserIds.reduce(
    (gatheredBusyUsers, user) => {
      const userIsNotOffline = !offlineUsers[user.userId];
      const userDoesntHaveCurrentVideoMeeting = !user.currentMeeting;
      const userDoesntHaveCurrentCalendarEvent = !getCurrentCalendarEvent(
        user.dailyCalendarEvents,
      );
      const userStatusIsBusy = user.availabilityStatus === "busy";
      if (
        userIsNotOffline &&
        userDoesntHaveCurrentVideoMeeting &&
        userDoesntHaveCurrentCalendarEvent &&
        userStatusIsBusy
      ) {
        return {
          ...gatheredBusyUsers,
          [user.userId]: user,
        };
      } else {
        return gatheredBusyUsers;
      }
    },
    {},
  );

  return {
    offline: offlineUsers,
    video: videoMeetings,
    calendar: calendarMeetings,
    available: availableUsers,
    busy: busyUsers,
  };
}
