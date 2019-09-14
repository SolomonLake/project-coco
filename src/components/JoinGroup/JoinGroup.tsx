import React, { useContext } from "react";
import logo from "../../svgs/logo.svg";
import { AppStoreContext } from "../appStore";
import { useJoinGroupStore } from "./joinGroupStore";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { databaseApi } from "../../scripts/databaseServices/databaseService";
import { JoinGroupAppState } from "../appState";

export const JoinGroup = ({
  joinGroupAppState,
}: {
  joinGroupAppState: JoinGroupAppState;
}) => {
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
                const group = await databaseApi.userTryJoinGroup(
                  joinGroupAppState.user,
                  joinGroupStore.state.joinId,
                );
                if (group) {
                  appStore.dispatch({
                    type: "TRANSITION_APP_STATE",
                    newAppState: {
                      view: "mainGroup",
                      user: {
                        ...joinGroupAppState.user,
                        groupId: group.appGroupId,
                      },
                      appGroup: group,
                    },
                  });
                } else {
                  appStore.dispatch({
                    type: "TRANSITION_APP_STATE",
                    newAppState: joinGroupAppState,
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
            const group = await databaseApi.createGroup(joinGroupAppState.user);
            appStore.dispatch({
              type: "TRANSITION_APP_STATE",
              newAppState: {
                view: "mainGroup",
                user: { ...joinGroupAppState.user, groupId: group.appGroupId },
                appGroup: group,
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
