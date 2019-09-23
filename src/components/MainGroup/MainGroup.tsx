import React, { useContext } from "react";
import { AppStoreContext } from "../appStore";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, Divider } from "@material-ui/core";
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
} from "./../../../sharedTypes/appGroupEntry.d";

export const KEEP_ALIVE_PING_INTERVAL = ONE_MINUTE;

type Meetings = {
  video: {
    [videoMeetingId: string]: {
      meeting: VideoMeeting;
      users: Array<string>;
    };
  };
  calendar: {
    [calendarMeetingId: string]: {
      meeting: CalendarMeeting;
      users: Array<string>;
    };
  };
  none: Array<string>;
};

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
  // lastOnline
  // currentMeeting
  // dailyCalendarEvents

  // Offline
  // Date.now() - lastOnline > KEEP_ALIVE_PING_INTERVAL

  // Available:
  // !offline && !videoCall and !calendarEvent

  // Video Calls:
  // videoCall = !offline && currentMeeting is not null

  // Calendar Events
  // calendarEvent = !offline && have event in daily calendar events where startTime is in past and endTime is in future
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
          user={props.appState.user}
        />
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <Grid container direction="column" spacing={2} justify="center">
          <Grid item>
            <Typography>
              <b>Available</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <b>Video Calls</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <b>Calendar Events</b>
            </Typography>
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
