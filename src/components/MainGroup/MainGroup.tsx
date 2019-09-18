import React, { useContext } from "react";
import { AppStoreContext } from "../appStore";
import Typography from "@material-ui/core/Typography";
import { Grid, Button } from "@material-ui/core";
import { MainGroupAppState } from "../appState";
import { databaseService } from "../../scripts/databaseServices/databaseService";
import { useMainGroupStore } from "./mainGroupStore";
import { startAppGroupObserver } from "../appGroupObserver";
import { gapiCalendar } from "../../scripts/gapi/gapiCalendar";
import { mainGroupActionCreator } from "./mainGroupActionCreator";

export const MainGroup = (props: { appState: MainGroupAppState }) => {
  const appStore = useContext(AppStoreContext);
  const mainGroupStore = useMainGroupStore(props.appState.initialAppGroup);
  React.useEffect(() => {
    const unsubscribe = startAppGroupObserver(
      mainGroupStore.state.appGroup.appGroupId,
      mainGroupStore.dispatch,
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      <Grid item>
        <Typography>
          GroupId: {mainGroupStore.state.appGroup.appGroupId}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            mainGroupActionCreator.updateCalendarEvents(
              props.appState.user.userId,
              mainGroupStore.state.appGroup.appGroupId,
            );
          }}
        >
          Sync Google Calendar
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={async () => {
            appStore.dispatch({
              type: "TRANSITION_APP_STATE",
              newAppState: { view: "loading" },
            });
            await databaseService.userLeaveGroup(
              props.appState.user,
              mainGroupStore.state.appGroup,
            );
            appStore.dispatch({
              type: "TRANSITION_APP_STATE",
              newAppState: {
                view: "joinGroup",
                user: { ...props.appState.user, groupId: null },
              },
            });
          }}
        >
          Leave Group
        </Button>
      </Grid>
    </Grid>
  );
};
