import React, { useContext } from "react";
import { AppStoreContext } from "../appStore";
import Typography from "@material-ui/core/Typography";
import { Grid, Button } from "@material-ui/core";
import { MainGroupAppState } from "../appState";
import { databaseApi } from "../../scripts/databaseServices/databaseService";

export const MainGroup = ({
  mainGroupAppState,
}: {
  mainGroupAppState: MainGroupAppState;
}) => {
  const appStore = useContext(AppStoreContext);
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
          GroupId: {mainGroupAppState.appGroup.appGroupId}
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
              mainGroupAppState.user,
              mainGroupAppState.appGroup,
            );
            appStore.dispatch({
              type: "TRANSITION_APP_STATE",
              newAppState: {
                view: "joinGroup",
                user: { ...mainGroupAppState.user, groupId: null },
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
