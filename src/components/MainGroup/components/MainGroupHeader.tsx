import React, { useContext } from "react";
import { Grid, Typography, Button, Divider, Avatar } from "@material-ui/core";
import { MainGroupStore } from "../mainGroupStore";
import { mainGroupActionCreator } from "../mainGroupActionCreator";
import { UserEntry } from "../../../../sharedTypes/userEntry";
import { UserAvatarNameRow } from "./UserAvatarNameRow";
import { AppGroupUser } from "../../../../sharedTypes/appGroupEntry";

export const MainGroupHeader = (props: {
  mainGroupStore: MainGroupStore;
  user: AppGroupUser;
}) => {
  return (
    <Grid container direction="column" spacing={2} justify="center">
      <Grid item>
        <Grid
          container
          direction="row"
          spacing={3}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography>
              Group Id: {props.mainGroupStore.state.appGroup.appGroupId}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                mainGroupActionCreator.syncCalendarEvents(
                  props.user.userId,
                  props.mainGroupStore.state.appGroup.appGroupId,
                );
              }}
            >
              Sync Google Calendar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <UserAvatarNameRow
          user={props.user}
          mainGroupStore={props.mainGroupStore}
          currentUser={true}
          showNextMeetingTime={true}
        />
      </Grid>
      <Grid item>
        <Divider></Divider>
      </Grid>
    </Grid>
  );
};
