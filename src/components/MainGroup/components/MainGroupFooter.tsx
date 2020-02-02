import React, { useState } from "react";
import { Grid, Typography, Button, Divider, Checkbox } from "@material-ui/core";
import { MainGroupStore } from "../mainGroupStore";
import { mainGroupActionCreator } from "../mainGroupActionCreator";
import { UserEntry } from "../../../../sharedTypes/userEntry";
import { AppStore } from "../../appStore";
import { databaseService } from "../../../scripts/databaseServices/databaseService";

export const MainGroupFooter = (props: {
  appStore: AppStore;
  mainGroupStore: MainGroupStore;
  user: UserEntry;
}) => {
  const [leavingConfirmed, updateLeavingConfirmed] = useState(false);
  return (
    <Grid container direction="row" spacing={1} alignItems="center">
      <Grid item>
        <Checkbox
          checked={leavingConfirmed}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            updateLeavingConfirmed(event.target.checked);
          }}
          color="default"
          value="primary"
          inputProps={{ "aria-label": "leave group confirmation" }}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          disabled={!leavingConfirmed}
          onClick={async () => {
            props.appStore.dispatch({
              type: "TRANSITION_APP_STATE",
              newAppState: { view: "loading" },
            });
            await databaseService.userLeaveGroup(
              props.user,
              props.mainGroupStore.state.appGroup,
            );
            props.appStore.dispatch({
              type: "TRANSITION_APP_STATE",
              newAppState: {
                view: "joinGroup",
                user: { ...props.user, groupId: null },
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
