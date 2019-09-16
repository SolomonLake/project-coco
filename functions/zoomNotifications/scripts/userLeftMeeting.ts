import { Zoom_ParticipantLeft } from "./zoomWebhookTypes";
import { usersDatabaseAccessorCF } from "../../shared/database/usersDatabaseAccessorCF";
import { appGroupsDatabaseAccessorCF } from "../../shared/database/appGroupsDatabaseAccessorCF";

export async function userLeftMeeting(zoomEvent: Zoom_ParticipantLeft) {
  const userJoinedPayload = zoomEvent.payload;
  const userId = userJoinedPayload.object.participant.id;
  console.log(`zoomNotifications: meeting.participant_left: userId ${userId}`);
  const userEntry = await usersDatabaseAccessorCF.getUser(userId);
  if (userEntry && userEntry.groupId) {
    await appGroupsDatabaseAccessorCF.setUserCurrentMeeting(
      userId,
      userEntry.groupId,
      null,
    );
  }
}
