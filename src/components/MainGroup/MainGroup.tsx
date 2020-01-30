import React, { useContext } from "react";
import { AppStoreContext } from "../appStore";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, Divider, Link } from "@material-ui/core";
import { MainGroupAppState } from "../appState";
import { databaseService } from "../../scripts/databaseServices/databaseService";
import { useMainGroupStore } from "./mainGroupStore";
import { startAppGroupObserver } from "../appGroupObserver";
import { gapiCalendar } from "../../scripts/gapi/gapiCalendar";
import { mainGroupActionCreator } from "./mainGroupActionCreator";
import { MainGroupHeader } from "./components/MainGroupHeader";
import { MainGroupFooter } from "./components/MainGroupFooter";
import { ONE_MINUTE } from "../../scripts/constants/timesInMilliseconds";
import { timeUtils } from "../../scripts/utils/timeUtils";
import { appGroupsDatabaseAccessor } from "../../scripts/databaseServices/appGroupsDatabaseAccessor";
import {
  AppGroupEntry,
  VideoMeeting,
  CalendarMeeting,
  AppGroupUser,
} from "./../../../sharedTypes/appGroupEntry.d";
import _ from "underscore";
import { getCurrentCalendarEvent } from "./components/calendarUiUtils";
import { UserAvatarNameRow } from "./components/UserAvatarNameRow";
import { dateUtils } from "../../scripts/utils/dateUtils";

export const KEEP_ALIVE_PING_INTERVAL = ONE_MINUTE;

export const MainGroup = (props: { appState: MainGroupAppState }) => {
  const appStore = useContext(AppStoreContext);
  const mainGroupStore = useMainGroupStore(props.appState.initialAppGroup);
  React.useEffect(() => {
    // component mount
    // sync calendar events
    mainGroupActionCreator.syncCalendarEvents(
      props.appState.user.userId,
      mainGroupStore.state.appGroup.appGroupId,
    );
    const calendarSyncInterval = setInterval(() => {
      mainGroupActionCreator.syncCalendarEvents(
        props.appState.user.userId,
        mainGroupStore.state.appGroup.appGroupId,
      );
    }, 10 * ONE_MINUTE);

    appGroupsDatabaseAccessor.sendAlivePing(
      props.appState.user.userId,
      mainGroupStore.state.appGroup.appGroupId,
    );
    const firebaseAlivePingInterval = setInterval(() => {
      appGroupsDatabaseAccessor.sendAlivePing(
        props.appState.user.userId,
        mainGroupStore.state.appGroup.appGroupId,
      );
    }, KEEP_ALIVE_PING_INTERVAL);

    // subscribe to appgroup changes
    const unsubscribe = startAppGroupObserver(
      mainGroupStore.state.appGroup.appGroupId,
      mainGroupStore.dispatch,
    );
    const meetingsUiUpdateInterval = setInterval(() => {
      mainGroupStore.dispatch({
        type: "CHECK_FOR_MEETINGS_UI_UPDATE",
      });
    }, 10 * 1000);
    return () => {
      clearInterval(calendarSyncInterval);
      clearInterval(firebaseAlivePingInterval);
      unsubscribe();
      clearInterval(meetingsUiUpdateInterval);
    };
  }, []);

  const meetingsUi = computeMeetingsUi(mainGroupStore.state.appGroup);
  console.log("meetingsUi", meetingsUi);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item style={{ width: "100%" }}>
        <MainGroupHeader
          mainGroupStore={mainGroupStore}
          user={
            mainGroupStore.state.appGroup.userIds[props.appState.user.userId]
          }
        />
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <Grid container direction="column" spacing={2} justify="center">
          <Grid item>
            <Typography>
              <b>Available</b>
            </Typography>
            {_.values(meetingsUi.available).map(user => {
              return (
                <UserAvatarNameRow
                  mainGroupStore={mainGroupStore}
                  user={user}
                  currentUser={user.userId === props.appState.user.userId}
                  showNextMeetingTime={
                    user.userId === props.appState.user.userId ? false : true
                  }
                />
              );
            })}
          </Grid>
          <Grid item>
            <Typography>
              <b>Video Calls</b>
            </Typography>
            {_.values(meetingsUi.video).map(videoMeeting => {
              return (
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography>{videoMeeting.meeting.meetingName}</Typography>
                    <Link
                      href={videoMeeting.meeting.meetingUrl}
                      target="_blank"
                    >
                      Open Meeting
                    </Link>
                    {_.values(videoMeeting.users).map(user => {
                      return (
                        <UserAvatarNameRow
                          mainGroupStore={mainGroupStore}
                          user={user}
                          currentUser={
                            user.userId === props.appState.user.userId
                          }
                          showNextMeetingTime={
                            user.userId === props.appState.user.userId
                              ? false
                              : true
                          }
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid item>
            <Typography>
              <b>Calendar Events</b>
            </Typography>
            {_.values(meetingsUi.calendar).map(calendarEvent => {
              return (
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      spacing={1}
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography variant="caption">
                          {calendarEvent.meeting.eventName}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">
                          {dateUtils.dateToLocalTimeStringHMMeridiem(
                            new Date(calendarEvent.meeting.startTime),
                          ) +
                            " - " +
                            dateUtils.dateToLocalTimeStringHMMeridiem(
                              new Date(calendarEvent.meeting.endTime),
                            )}
                        </Typography>
                      </Grid>
                    </Grid>
                    {_.values(calendarEvent.users).map(user => {
                      return (
                        <UserAvatarNameRow
                          mainGroupStore={mainGroupStore}
                          user={user}
                          currentUser={
                            user.userId === props.appState.user.userId
                          }
                          showNextMeetingTime={false}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid item>
            <Typography>
              <b>Offline</b>
            </Typography>
            {_.values(meetingsUi.offline).map(user => {
              return (
                <UserAvatarNameRow
                  mainGroupStore={mainGroupStore}
                  user={user}
                  currentUser={user.userId === props.appState.user.userId}
                  showNextMeetingTime={
                    user.userId === props.appState.user.userId ? false : true
                  }
                />
              );
            })}
          </Grid>
          {/* <Grid item>
            <Typography>
              <b>Do Not Disturb</b>
            </Typography>
          </Grid> */}
          <Grid item>
            <Divider></Divider>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <MainGroupFooter
          appStore={appStore}
          mainGroupStore={mainGroupStore}
          user={props.appState.user}
        />
      </Grid>
    </Grid>
  );
};

type MeetingUsers = { [userId: string]: AppGroupUser };
type VideoMeetings = {
  [videoMeetingId: string]: {
    meeting: VideoMeeting;
    users: MeetingUsers;
  };
};
type CalendarMeetings = {
  [calendarMeetingId: string]: {
    meeting: CalendarMeeting;
    users: MeetingUsers;
  };
};
type Meetings = {
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
function computeMeetingsUi(appGroup: AppGroupEntry): Meetings {
  const currentTime = Date.now();
  const offlineUsers: MeetingUsers = _.values(appGroup.userIds).reduce(
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

  const videoMeetings: VideoMeetings = _.values(appGroup.userIds).reduce(
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

  const calendarMeetings: CalendarMeetings = _.values(appGroup.userIds).reduce(
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

  const availableUsers: MeetingUsers = _.values(appGroup.userIds).reduce(
    (gatheredAvailableUsers, user) => {
      const userIsNotOffline = !offlineUsers[user.userId];
      const userDoesntHaveCurrentVideoMeeting = !user.currentMeeting;
      const userDoesntHaveCurrentCalendarEvent = !getCurrentCalendarEvent(
        user.dailyCalendarEvents,
      );
      const userStatusIsAvailable = user.availabilityStatus === "available";
      if (
        userIsNotOffline &&
        userDoesntHaveCurrentVideoMeeting &&
        userDoesntHaveCurrentCalendarEvent &&
        userStatusIsAvailable
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

  const busyUsers: MeetingUsers = _.values(appGroup.userIds).reduce(
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
