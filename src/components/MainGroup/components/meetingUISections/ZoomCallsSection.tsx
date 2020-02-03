import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";
import { MainGroupStore } from "../../mainGroupStore";
import { UserAvatarNameRow } from "../UserAvatarNameRow";
import { VideoMeeting } from "../../../../../sharedTypes/appGroupEntry.d";
import _ from "underscore";
import VideocamIcon from "@material-ui/icons/Videocam";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import { VideoMeetings } from "../computeMeetingsUi";
import { dateUtils } from "../../../../scripts/utils/dateUtils";

export const ZoomCallsSection = (props: {
  mainGroupStore: MainGroupStore;
  currentUserId: string;
  videoMeetings: VideoMeetings;
  darkTheme: boolean;
}) => {
  const mainGroupStore = props.mainGroupStore;
  const currentUserId = props.currentUserId;

  return (
    <Grid container direction="column">
      <Typography>
        <b>Zoom Calls</b>
      </Typography>
      {_.values(props.videoMeetings).map(videoMeeting => {
        const meetingLengthInMinutes = dateUtils.timeHoursAndMinutes(
          Date.now() -
            new Date(videoMeeting.meeting.meetingStartTime).getTime(),
        );

        return (
          <Grid
            container
            direction="row"
            spacing={2}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                spacing={2}
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Button
                    variant="text"
                    color="primary"
                    href={videoMeeting.meeting.meetingUrl}
                    target="_blank"
                  >
                    Join Meeting <VideocamIcon />
                  </Button>
                </Grid>
                <Grid item>
                  <Typography style={{ display: "flex" }}>
                    <ScheduleRoundedIcon />
                    {meetingLengthInMinutes}
                  </Typography>
                </Grid>
              </Grid>
              {_.values(videoMeeting.users).map(user => {
                return (
                  <UserAvatarNameRow
                    mainGroupStore={mainGroupStore}
                    user={user}
                    isCurrentUser={user.userId === currentUserId}
                    currentUser={
                      mainGroupStore.state.appGroup.userIds[currentUserId]
                    }
                    section="video"
                    showNextMeetingTime={
                      user.userId === currentUserId ? false : true
                    }
                    darkTheme={props.darkTheme}
                  />
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};
