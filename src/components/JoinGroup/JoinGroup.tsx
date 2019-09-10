import React, { useContext } from "react";
import logo from "../../svgs/logo.svg";
import { AppStoreContext } from "../appStore";
import { useJoinGroupStore } from "./joinGroupStore";
import { joinGroupApi } from "./joinGroupApi";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export const JoinGroup = () => {
  const appStore = useContext(AppStoreContext);
  const joinGroupStore = useJoinGroupStore();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <TextField label="Join Id" margin="normal" variant="outlined" />
          </Grid>
          <Grid item>
            <Button color="primary">Join</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          onClick={async () => {
            appStore.dispatch({ type: "CHANGE_VIEW", view: "loading" });
            await joinGroupApi.createGroup();
            appStore.dispatch({ type: "CHANGE_VIEW", view: "main" });
          }}
        >
          Create Group
        </Button>
      </Grid>
    </Grid>
  );
};
