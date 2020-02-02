import React, { useContext, useState } from "react";
import { Grid, Typography, Button, Divider, Avatar } from "@material-ui/core";
import { MainGroupStore } from "../mainGroupStore";
import { mainGroupActionCreator } from "../mainGroupActionCreator";
import { UserEntry } from "../../../../sharedTypes/userEntry";
import { AppStore } from "../../appStore";
import { databaseService } from "../../../scripts/databaseServices/databaseService";
import {
  CalendarMeeting,
  AppGroupUser,
} from "../../../../sharedTypes/appGroupEntry";
import { InlineFunction } from "../../generic/InlineFunction";
import { dateUtils } from "../../../scripts/utils/dateUtils";
import { notification } from "../../../scripts/notification/notification";
import { MainGroupSection } from "../mainGroupTypes";

const NOT_SYNCED_MESSAGE = "Calendar not synced";
const NO_UPCOMING_EVENTS_MESSAGE = "No upcoming events";

export const UserAvatarNameRow = (props: {
  mainGroupStore: MainGroupStore;
  user: AppGroupUser;
  isCurrentUser: boolean;
  currentUser: AppGroupUser;
  section: MainGroupSection;
  showNextMeetingTime: boolean;
}) => {
  const dailyCalendarEvents =
    props.mainGroupStore.state.appGroup.userIds[props.user.userId]
      .dailyCalendarEvents;
  const [nextMeetingTimeString, updateNextMeetingTimeString] = useState(
    getNextMeetingTimeString(dailyCalendarEvents),
  );

  React.useEffect(() => {
    // component mount

    updateNextMeetingTimeString(getNextMeetingTimeString(dailyCalendarEvents));
    const updateMeetingTimeInterval = setInterval(() => {
      updateNextMeetingTimeString(
        getNextMeetingTimeString(dailyCalendarEvents),
      );
    }, 10 * 1000);

    return () => {
      // component dismount
      clearInterval(updateMeetingTimeInterval);
    };
  }, [
    props.mainGroupStore.state.appGroup.userIds[props.user.userId]
      .dailyCalendarEvents,
  ]);
  console.log(props.currentUser.personalMeetingUrl);

  return (
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
          {props.showNextMeetingTime && (
            <Grid item>
              {props.isCurrentUser &&
              nextMeetingTimeString === "Calendar not synced" ? (
                <Typography variant="caption" color="error">
                  <i>{nextMeetingTimeString}</i>
                </Typography>
              ) : (
                <Typography variant="caption">
                  <i>{nextMeetingTimeString}</i>
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      {props.section === "available" &&
        props.currentUser.personalMeetingUrl &&
        !props.isCurrentUser && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                const meetingUrl = props.currentUser.personalMeetingUrl;
                notification.sendOpenMeetingNotification(
                  props.user.userId,
                  props.currentUser.userId,
                  meetingUrl,
                );
                window.open(meetingUrl, "_blank");
              }}
            >
              Call
            </Button>
          </Grid>
        )}
      {!props.currentUser.personalMeetingUrl &&
        props.isCurrentUser &&
        props.section === "available" && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                window.open("https://zoom.us/profile", "_blank");
              }}
            >
              Acquire Meeting Url
            </Button>
          </Grid>
        )}
    </Grid>
  );
};

function getNextMeetingTimeString(
  dailyCalendarEvents: Array<CalendarMeeting> | null,
): string {
  if (dailyCalendarEvents === null) {
    return NOT_SYNCED_MESSAGE;
  } else {
    // first, filter all meetings that ended in the past, and do not start today
    const currentDateObj = new Date();
    const currentTimeNum = currentDateObj.getTime();
    const currentDateString = currentDateObj.toDateString();

    const upcomingMeetings = dailyCalendarEvents.filter(m => {
      const localEndTime = new Date(m.endTime);
      const localEndTimeNum = localEndTime.getTime();
      const meetingEndsInTheFuture = localEndTimeNum > currentTimeNum;

      const localStartTime = new Date(m.startTime);
      const localStartTimeDate = localStartTime.toDateString();
      const meetingStartsToday = localStartTimeDate === currentDateString;

      return meetingEndsInTheFuture && meetingStartsToday;
    });

    const nextMeeting = upcomingMeetings[0];
    if (nextMeeting) {
      const localStartTime = new Date(nextMeeting.startTime);
      const localEndTime = new Date(nextMeeting.endTime);

      const localStartTimeNum = localStartTime.getTime();
      const meetingStartedInThePast = localStartTimeNum < currentTimeNum;

      const startTimeString = dateUtils.dateToLocalTimeStringHMMeridiem(
        localStartTime,
      );
      const endTimeString = dateUtils.dateToLocalTimeStringHMMeridiem(
        localEndTime,
      );

      const nextMeetingTimeString = meetingStartedInThePast
        ? `${nextMeeting.eventName} ends at ${endTimeString}`
        : `Next meeting at ${startTimeString}`;
      return nextMeetingTimeString;
    } else {
      return NO_UPCOMING_EVENTS_MESSAGE;
    }
  }
}
