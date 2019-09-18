import React, { useContext } from "react";
import { Grid, Typography, Button, Divider, Avatar } from "@material-ui/core";
import { MainGroupStore } from "../mainGroupStore";
import { mainGroupActionCreator } from "../mainGroupActionCreator";
import { UserEntry } from "../../../../sharedTypes/userEntry";

function militaryToAmPm(hours: number): number {
  return ((hours + 11) % 12) + 1;
}

export const MainGroupHeader = (props: {
  mainGroupStore: MainGroupStore;
  user: UserEntry;
}) => {
  // first, filter all meetings that ended in the past, and do not start today
  const upcomingMeetings = props.mainGroupStore.state.appGroup.userIds[
    props.user.userId
  ].dailyCalendarEvents.filter(m => {
    const localEndTime = new Date(m.endTime);
    const localEndTimeNum = localEndTime.getTime();
    const currentTimeNum = Date.now();
    const meetingEndsInTheFuture = localEndTimeNum > currentTimeNum;

    const localStartTime = new Date(m.startTime);
    const localStartTimeDate = localStartTime.getDate();
    const currentDate = new Date(currentTimeNum).getDate();
    const meetingStartsToday = localStartTimeDate === currentDate;

    return meetingEndsInTheFuture && meetingStartsToday;
  });

  const nextMeeting = upcomingMeetings[0];
  let nextMeetingTimeString = null;
  if (nextMeeting) {
    const nextMeetingStartTime = nextMeeting.startTime;

    const localStartTime = new Date(nextMeetingStartTime);

    const localStartTimeHoursMilitary = localStartTime.getHours();

    const localStartTimeHours = militaryToAmPm(localStartTimeHoursMilitary);

    const localStartTimeMinutes = localStartTime.getMinutes();

    const localStartTimeNum = localStartTime.getTime();
    const currentTimeNum = Date.now();
    const meetingStartedInThePast = localStartTimeNum < currentTimeNum;

    const localEndTime = new Date(nextMeeting.endTime);
    const localEndTimeHours = militaryToAmPm(localEndTime.getHours());
    const localEndTimeMinutes = localEndTime.getMinutes();
    const endMinutesString =
      localEndTimeMinutes !== 0 ? `:${localEndTimeMinutes}` : "";

    const startMinutesString =
      localStartTimeMinutes !== 0 ? `:${localStartTimeMinutes}` : "";
    nextMeetingTimeString = meetingStartedInThePast
      ? `'${nextMeeting.eventName}' ends at ${localEndTimeHours}${endMinutesString}`
      : `Next meeting at ${localStartTimeHours}${startMinutesString}`;
  }

  return (
    <Grid container direction="column" spacing={2} justify="center">
      <Grid item>
        <Grid
          container
          direction="row"
          spacing={5}
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
                mainGroupActionCreator.updateCalendarEvents(
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
        <Grid
          container
          direction="row"
          spacing={2}
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Avatar alt={props.user.displayName} src={props.user.avatarUrl} />
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={0} justify="flex-start">
              <Grid item>
                <Typography>{props.user.displayName}</Typography>
              </Grid>
              {nextMeetingTimeString && (
                <Grid item>
                  <Typography variant="caption">
                    <i>{nextMeetingTimeString}</i>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Divider></Divider>
      </Grid>
    </Grid>
  );
};
