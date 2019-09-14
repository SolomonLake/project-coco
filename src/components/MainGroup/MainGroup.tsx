import React, { useContext } from "react";
import { AppStoreContext } from "../appStore";
import Typography from "@material-ui/core/Typography";
import { Grid, Button } from "@material-ui/core";
import { MainGroupAppState } from "../appState";
import { databaseApi } from "../../scripts/databaseServices/databaseService";
import { useMainGroupStore } from "./mainGroupStore";
import { startAppGroupObserver } from "../appGroupObserver";

export const MainGroup = (props: { appState: MainGroupAppState }) => {
  const appStore = useContext(AppStoreContext);
  const mainGroupStore = useMainGroupStore(props.appState.initialAppGroup);
  startAppGroupObserver(
    mainGroupStore.state.appGroup.appGroupId,
    mainGroupStore.dispatch,
  );
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
          color="secondary"
          onClick={async () => {
            appStore.dispatch({
              type: "TRANSITION_APP_STATE",
              newAppState: { view: "loading" },
            });
            const group = await databaseApi.userLeaveGroup(
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
