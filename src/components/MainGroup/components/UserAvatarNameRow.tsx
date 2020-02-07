import React, { useState } from "react";
import {
  IconButton,
  Grid,
  Typography,
  Button,
  Switch,
  ButtonGroup,
} from "@material-ui/core";
import { MainGroupStore } from "../mainGroupStore";
import {
  CalendarMeeting,
  AppGroupUser,
} from "../../../../sharedTypes/appGroupEntry";
import { dateUtils } from "../../../scripts/utils/dateUtils";
import { notification } from "../../../scripts/notification/notification";
import { MainGroupSection } from "../mainGroupTypes";
import VideocamIcon from "@material-ui/icons/Videocam";
import ClearIcon from "@material-ui/icons/Clear";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { themePalette } from "../../../theme";
import { UserAvatar } from "./UserAvatar";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { appGroupsDatabaseAccessor } from "../../../scripts/databaseServices/appGroupsDatabaseAccessor";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TimerOutlinedIcon from "@material-ui/icons/TimerOutlined";
import {
  THIRTY_MINUTES,
  ONE_MINUTE,
  FIFTEEN_MINUTES,
  ONE_HOUR,
} from "../../../scripts/constants/timesInMilliseconds";

const NOT_SYNCED_MESSAGE = "Calendar not synced";
const NO_UPCOMING_EVENTS_MESSAGE = "No upcoming events";
const DO_NOT_DISTURB_MESSAGE = "Busy for ~";

export const UserAvatarNameRow = (props: {
  mainGroupStore: MainGroupStore;
  user: AppGroupUser;
  isCurrentUser: boolean;
  currentUser: AppGroupUser;
  section: MainGroupSection;
  showNextMeetingTime: boolean;
  darkTheme: boolean;
}) => {
  const dailyCalendarEvents =
    props.mainGroupStore.state.appGroup.userIds[props.user.userId]
      .dailyCalendarEvents;
  const [nextMeetingTimeString, updateNextMeetingTimeString] = useState(
    getNextMeetingTimeString(props.user.doNotDisturbUntil, dailyCalendarEvents),
  );

  React.useEffect(() => {
    // component mount

    updateNextMeetingTimeString(
      getNextMeetingTimeString(
        props.user.doNotDisturbUntil,
        dailyCalendarEvents,
      ),
    );
    const updateMeetingTimeInterval = setInterval(() => {
      updateNextMeetingTimeString(
        getNextMeetingTimeString(
          props.user.doNotDisturbUntil,
          dailyCalendarEvents,
        ),
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

  const userStatusIsAvailable = props.user.doNotDisturbUntil < Date.now();

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justify="flex-start"
      alignItems="center"
      style={{ flexWrap: "nowrap" }}
    >
      <Grid item>
        <UserAvatar
          user={props.user}
          section={props.section}
          darkTheme={props.darkTheme}
        />
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        <Grid container direction="column" spacing={0} justify="flex-start">
          <Grid item>
            <Typography>{props.user.displayName}</Typography>
          </Grid>
          {props.showNextMeetingTime && (
            <Grid item>
              <Grid container direction="row" justify="flex-start">
                <Grid item>
                  {props.isCurrentUser &&
                  nextMeetingTimeString === NOT_SYNCED_MESSAGE ? (
                    <Typography variant="caption" color="error">
                      <i>{nextMeetingTimeString}</i>
                    </Typography>
                  ) : (
                    <Typography variant="caption">
                      <i>{nextMeetingTimeString}</i>
                    </Typography>
                  )}
                </Grid>
                {nextMeetingTimeString.startsWith(DO_NOT_DISTURB_MESSAGE) && (
                  <Grid
                    item
                    justify="center"
                    alignItems="center"
                    style={{ display: "flex" }}
                  >
                    <TimerOutlinedIcon style={{ fontSize: "1.3em" }} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      {props.section === "available" &&
        props.currentUser.personalMeetingUrl &&
        !props.isCurrentUser && (
          <Grid item>
            <IconButton
              aria-label="start video call"
              onClick={() => {
                const meetingUrl = props.currentUser.personalMeetingUrl;
                notification.sendOpenMeetingNotification(
                  props.user.userId,
                  props.currentUser.userId,
                  meetingUrl,
                );
                window.open(meetingUrl, "_blank");
              }}
            >
              <VideocamIcon
                color={userStatusIsAvailable ? "secondary" : "error"}
              />
            </IconButton>
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
      {props.isCurrentUser && props.section === "appHeader" && (
        <Grid item>
          <ButtonGroup
            variant="text"
            size="small"
            aria-label="small outlined button group"
          >
            {!userStatusIsAvailable && (
              <IconButton
                onClick={() => {
                  appGroupsDatabaseAccessor.updateUserDoNotDistrubUntil(
                    props.mainGroupStore.state.appGroup.appGroupId,
                    props.user.userId,
                    Date.now() - 1,
                  );
                }}
                size="small"
                color="primary"
              >
                <ClearIcon />
              </IconButton>
            )}
            {!userStatusIsAvailable && (
              <IconButton
                onClick={() => {
                  appGroupsDatabaseAccessor.updateUserDoNotDistrubUntil(
                    props.mainGroupStore.state.appGroup.appGroupId,
                    props.user.userId,
                    props.user.doNotDisturbUntil - FIFTEEN_MINUTES,
                  );
                }}
                size="small"
                color="primary"
              >
                <RemoveIcon />
              </IconButton>
            )}
            <Button
              onClick={() => {
                const currentDoNotDisturbUntil = userStatusIsAvailable
                  ? Date.now()
                  : props.user.doNotDisturbUntil;
                const incrementAmount = userStatusIsAvailable
                  ? ONE_HOUR
                  : FIFTEEN_MINUTES;
                appGroupsDatabaseAccessor.updateUserDoNotDistrubUntil(
                  props.mainGroupStore.state.appGroup.appGroupId,
                  props.user.userId,
                  currentDoNotDisturbUntil + incrementAmount,
                );
              }}
              style={
                !userStatusIsAvailable
                  ? {
                      color: themePalette.error.main,
                    }
                  : {}
              }
            >
              Busy
              {!userStatusIsAvailable && <AddIcon />}
            </Button>
          </ButtonGroup>
        </Grid>
      )}
    </Grid>
  );
};

function getNextMeetingTimeString(
  doNotDisturbUntil: number,
  dailyCalendarEvents: Array<CalendarMeeting> | null,
): string {
  if (dailyCalendarEvents === null) {
    return NOT_SYNCED_MESSAGE;
  } else if (doNotDisturbUntil > Date.now()) {
    return (
      DO_NOT_DISTURB_MESSAGE +
      dateUtils.timeHoursAndMinutes(doNotDisturbUntil - Date.now() + ONE_MINUTE)
    );
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
