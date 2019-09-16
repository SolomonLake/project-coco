import { Zoom_ParticipantJoined } from "./zoomWebhookTypes";
import { usersDatabaseAccessorCF } from "../../shared/database/usersDatabaseAccessorCF";
import { appGroupsDatabaseAccessorCF } from "../../shared/database/appGroupsDatabaseAccessorCF";

export async function userJoinedMeeting(
  zoomEvent: Zoom_ParticipantJoined,
): Promise<void> {
  const userJoinedPayload = zoomEvent.payload;
  const userId = userJoinedPayload.object.participant.id;
  console.log(
    `zoomNotifications: meeting.participant_joined: userId ${userId}`,
  );
  const userEntry = await usersDatabaseAccessorCF.getUser(userId);
  if (userEntry && userEntry.groupId) {
    const meetingId = userJoinedPayload.object.id;
    const currentMeeting = {
      meetingId: meetingId,
      meetingUrl: "https://zoom.us/j/" + meetingId,
      meetingName: userJoinedPayload.object.topic,
      meetingStartTime: userJoinedPayload.object.start_time,
    };
    console.log(
      `zoomNotifications: meeting.participant_joined: userId ${userId} is joining meeting:`,
      currentMeeting,
    );
    await appGroupsDatabaseAccessorCF.setUserCurrentMeeting(
      userId,
      userEntry.groupId,
      currentMeeting,
    );
  }
}
