import React, { useContext } from "react";
import { AppStoreContext } from "../appStore";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, Divider, Link } from "@material-ui/core";
import { MainGroupAppState } from "../appState";
import { useMainGroupStore } from "./mainGroupStore";
import { startAppGroupObserver } from "../appGroupObserver";
import { mainGroupActionCreator } from "./mainGroupActionCreator";
import { MainGroupHeader } from "./components/MainGroupHeader";
import { MainGroupFooter } from "./components/MainGroupFooter";
import { MainGroupMeetingsUI } from "./components/MainGroupMeetingsUI";
import {
  ONE_MINUTE,
  ONE_SECOND,
} from "../../scripts/constants/timesInMilliseconds";
import { appGroupsDatabaseAccessor } from "../../scripts/databaseServices/appGroupsDatabaseAccessor";
import { DarkThemeState } from "../../index";

export const KEEP_ALIVE_PING_INTERVAL = ONE_SECOND * 20;

export const MainGroup = (props: {
  appState: MainGroupAppState;
  darkThemeState: DarkThemeState;
}) => {
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

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="flex-start"
      spacing={2}
    >
      {props.appState.popupsBlocked && (
        <Grid item style={{ width: "100%" }}>
          <Typography color="error">
            Please "Always allow popups" in order to receive video calls.
          </Typography>
        </Grid>
      )}
      <Grid item style={{ width: "100%" }}>
        <MainGroupHeader
          mainGroupStore={mainGroupStore}
          user={
            mainGroupStore.state.appGroup.userIds[props.appState.user.userId]
          }
          darkTheme={props.darkThemeState[0]}
        />
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <MainGroupMeetingsUI
          mainGroupStore={mainGroupStore}
          user={
            mainGroupStore.state.appGroup.userIds[props.appState.user.userId]
          }
          darkTheme={props.darkThemeState[0]}
        />
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <MainGroupFooter
          appStore={appStore}
          mainGroupStore={mainGroupStore}
          user={props.appState.user}
          darkThemeState={props.darkThemeState}
        />
      </Grid>
    </Grid>
  );
};
