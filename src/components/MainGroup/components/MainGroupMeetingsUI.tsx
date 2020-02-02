import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";
import { MainGroupStore } from "../mainGroupStore";
import { UserAvatarNameRow } from "./UserAvatarNameRow";
import {
  AppGroupEntry,
  VideoMeeting,
  CalendarMeeting,
  AppGroupUser,
} from "../../../../sharedTypes/appGroupEntry.d";
import _ from "underscore";
import { ZoomCallsSection } from "./meetingUISections/ZoomCallsSection";
import { GoogleCalendarEventsSection } from "./meetingUISections/GoogleCalendarEventsSection";
import { computeMeetingsUi } from "./computeMeetingsUi";

export const MainGroupMeetingsUI = (props: {
  mainGroupStore: MainGroupStore;
  user: AppGroupUser;
}) => {
  const mainGroupStore = props.mainGroupStore;
  const currentUser = props.user;
  const currentUserId = currentUser.userId;
  const meetingsUi = computeMeetingsUi(
    mainGroupStore.state.appGroup,
    currentUserId,
  );

  return (
    <Grid container direction="column" spacing={2} justify="center">
      <Grid item>
        <Typography>
          <b>Available</b>
        </Typography>
        {_.values(meetingsUi.available).map(user => {
          return (
            <UserAvatarNameRow
              mainGroupStore={mainGroupStore}
              user={user}
              isCurrentUser={user.userId === currentUserId}
              currentUser={mainGroupStore.state.appGroup.userIds[currentUserId]}
              section="available"
              showNextMeetingTime={user.userId === currentUserId ? false : true}
            />
          );
        })}
      </Grid>
      <Grid item>
        <ZoomCallsSection
          mainGroupStore={mainGroupStore}
          currentUserId={currentUserId}
          videoMeetings={meetingsUi.video}
        />
      </Grid>
      <Grid item>
        <GoogleCalendarEventsSection
          mainGroupStore={mainGroupStore}
          currentUserId={currentUserId}
          calendarMeetings={meetingsUi.calendar}
        />
      </Grid>
      <Grid item>
        <Typography>
          <b>Do Not Disturb</b>
        </Typography>
        {_.values(meetingsUi.doNotDisturb).map(user => {
          return (
            <UserAvatarNameRow
              mainGroupStore={mainGroupStore}
              user={user}
              isCurrentUser={user.userId === currentUserId}
              currentUser={mainGroupStore.state.appGroup.userIds[currentUserId]}
              section="doNotDisturb"
              showNextMeetingTime={true}
            />
          );
        })}
      </Grid>
      <Grid item>
        <Typography>
          <b>Offline</b>
        </Typography>
        {_.values(meetingsUi.offline).map(user => {
          return (
            <UserAvatarNameRow
              mainGroupStore={mainGroupStore}
              user={user}
              isCurrentUser={user.userId === currentUserId}
              currentUser={mainGroupStore.state.appGroup.userIds[currentUserId]}
              section="offline"
              showNextMeetingTime={false}
            />
          );
        })}
      </Grid>
      <Grid item>
        <Divider></Divider>
      </Grid>
    </Grid>
  );
};
