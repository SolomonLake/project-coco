import React, { useContext } from "react";
import { AppStoreContext } from "../appStore";
import { useJoinGroupStore } from "./joinGroupStore";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { databaseService } from "../../scripts/databaseServices/databaseService";
import { JoinGroupAppState } from "../appState";

export const JoinGroup = (props: { appState: JoinGroupAppState }) => {
  const appStore = useContext(AppStoreContext);
  const joinGroupStore = useJoinGroupStore();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      <Grid item>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              label="Group Id"
              margin="normal"
              variant="outlined"
              value={joinGroupStore.state.joinId}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                joinGroupStore.dispatch({
                  type: "UPDATE_JOIN_ID",
                  newJoinId: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={async () => {
                appStore.dispatch({
                  type: "TRANSITION_APP_STATE",
                  newAppState: { view: "loading" },
                });
                const group = await databaseService.userTryJoinGroup(
                  props.appState.user,
                  joinGroupStore.state.joinId,
                );
                if (group) {
                  appStore.dispatch({
                    type: "TRANSITION_APP_STATE",
                    newAppState: {
                      view: "mainGroup",
                      user: {
                        ...props.appState.user,
                        groupId: group.appGroupId,
                      },
                      initialAppGroup: group,
                    },
                  });
                } else {
                  appStore.dispatch({
                    type: "TRANSITION_APP_STATE",
                    newAppState: props.appState,
                  });
                  // group doesn't exist effect
                  console.log("group doesn't exist");
                }
              }}
            >
              Join
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          onClick={async () => {
            appStore.dispatch({
              type: "TRANSITION_APP_STATE",
              newAppState: { view: "loading" },
            });
            const group = await databaseService.createGroup(
              props.appState.user,
            );
            appStore.dispatch({
              type: "TRANSITION_APP_STATE",
              newAppState: {
                view: "mainGroup",
                user: { ...props.appState.user, groupId: group.appGroupId },
                initialAppGroup: group,
              },
            });
          }}
        >
          Create Group
        </Button>
      </Grid>
    </Grid>
  );
};
