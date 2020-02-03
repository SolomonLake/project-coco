import React, { useState } from "react";
import { Grid, Typography, Button, Divider, Avatar } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import { MainGroupStore } from "../mainGroupStore";
import { mainGroupActionCreator } from "../mainGroupActionCreator";
import { UserEntry } from "../../../../sharedTypes/userEntry";
import { UserAvatarNameRow } from "./UserAvatarNameRow";
import { makeStyles } from "@material-ui/core/styles";
import { AppGroupUser } from "../../../../sharedTypes/appGroupEntry";
import { copyUtils } from "../../../scripts/utils/copyUtils";
import { windowUtils } from "../../../scripts/utils/windowUtils";
import CheckIcon from "@material-ui/icons/Check";
import SyncIcon from "@material-ui/icons/Sync";

const useStyles = makeStyles(theme => ({
  icon: {
    transform: "rotate(135deg)",
  },
}));

export const MainGroupHeader = (props: {
  mainGroupStore: MainGroupStore;
  user: AppGroupUser;
  darkTheme: boolean;
}) => {
  const classes = useStyles();
  const [copyJoinGroupButtonClicked, setCopyJoinGroupButtonClicked] = useState(
    false,
  );
  const [calendarSynced, setCalendarSynced] = useState(false);

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
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                const joinGroupUrl =
                  window.location.origin +
                  window.location.pathname +
                  "?joinId=" +
                  props.mainGroupStore.state.appGroup.appGroupId;
                copyUtils.copyToClipboard(joinGroupUrl);
                setCopyJoinGroupButtonClicked(true);
                setTimeout(() => {
                  setCopyJoinGroupButtonClicked(false);
                }, 2000);
              }}
            >
              {copyJoinGroupButtonClicked ? (
                <CheckIcon />
              ) : (
                <LinkIcon className={classes.icon} />
              )}
              {props.mainGroupStore.state.appGroup.appGroupId}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                await mainGroupActionCreator.syncCalendarEvents(
                  props.user.userId,
                  props.mainGroupStore.state.appGroup.appGroupId,
                );
                setCalendarSynced(true);
                setTimeout(() => {
                  setCalendarSynced(false);
                }, 2000);
              }}
            >
              {calendarSynced ? <CheckIcon /> : <SyncIcon />}
              Sync Google Calendar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <UserAvatarNameRow
          user={props.user}
          mainGroupStore={props.mainGroupStore}
          isCurrentUser={true}
          currentUser={props.user}
          showNextMeetingTime={true}
          section="appHeader"
          darkTheme={props.darkTheme}
        />
      </Grid>
      <Grid item>
        <Divider></Divider>
      </Grid>
    </Grid>
  );
};
