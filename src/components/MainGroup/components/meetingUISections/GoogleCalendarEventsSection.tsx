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
import ScheduleIcon from "@material-ui/icons/Schedule";
import { CalendarMeetings } from "../computeMeetingsUi";
import { dateUtils } from "../../../../scripts/utils/dateUtils";

export const GoogleCalendarEventsSection = (props: {
  mainGroupStore: MainGroupStore;
  currentUserId: string;
  calendarMeetings: CalendarMeetings;
}) => {
  const mainGroupStore = props.mainGroupStore;
  const currentUserId = props.currentUserId;

  return (
    <Grid container direction="column">
      <Typography>
        <b>Google Calendar Events</b>
      </Typography>
      {_.values(props.calendarMeetings).map(calendarEvent => {
        const firstUserInMeeting = _.values(calendarEvent.users).filter(
          user => {
            return !!user.currentMeeting;
          },
        )[0];
        const firstUserMeetingUrl =
          firstUserInMeeting && firstUserInMeeting.currentMeeting
            ? firstUserInMeeting.currentMeeting.meetingUrl
            : null;
        return (
          <Grid
            container
            direction="row"
            spacing={2}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item style={{ flexGrow: 1 }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                spacing={1}
                alignItems="center"
              >
                <Grid item style={{ flexGrow: 1, paddingLeft: "1em" }}>
                  <Typography variant="subtitle2">
                    {calendarEvent.meeting.eventName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {dateUtils.dateToLocalTimeStringHMMeridiem(
                      new Date(calendarEvent.meeting.startTime),
                    ) +
                      " - " +
                      dateUtils.dateToLocalTimeStringHMMeridiem(
                        new Date(calendarEvent.meeting.endTime),
                      )}
                  </Typography>
                </Grid>
              </Grid>
              {_.values(calendarEvent.users).map(user => {
                return (
                  <UserAvatarNameRow
                    mainGroupStore={mainGroupStore}
                    user={user}
                    isCurrentUser={user.userId === currentUserId}
                    currentUser={
                      mainGroupStore.state.appGroup.userIds[currentUserId]
                    }
                    section="calendar"
                    showNextMeetingTime={false}
                  />
                );
              })}
            </Grid>
            {firstUserMeetingUrl && (
              <Grid item>
                <IconButton
                  color="primary"
                  aria-label="join calendar meeting video call"
                  href={firstUserMeetingUrl}
                  target="_blank"
                >
                  <VideocamIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};
