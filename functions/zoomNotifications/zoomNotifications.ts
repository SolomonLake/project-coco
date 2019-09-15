import { usersDatabaseAccessorCF } from "./../shared/database/usersDatabaseAccessorCF";
import { appGroupsDatabaseAccessorCF } from "./../shared/database/appGroupsDatabaseAccessorCF";
import { Request, Response } from "express";
import { Zoom_WebhookBody } from "./scripts/zoomWebhookTypes";
import { processEnv } from "../processEnv";

const zoomAppVerification = processEnv.ZOOM_APP_VERIFICATION;

export const runZoomNotifications = async (req: Request, res: Response) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization === zoomAppVerification
  ) {
    const zoomEvent: Zoom_WebhookBody = req.body;
    const zoomEventName = zoomEvent.event;
    switch (zoomEvent.event) {
      case "meeting.participant_joined":
        const userJoinedPayload = zoomEvent.payload;
        const userId = userJoinedPayload.object.participant.user_id;
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
        res.send({ status: "success" });
        break;
      case "meeting.participant_left":
        res.send({ status: "success" });
        break;
      default:
        console.log("unknown zoom event: ", zoomEventName);
        const unreachable: never = zoomEvent;
    }
  } else {
    res.status(304).send({ message: "unauthenticated request" });
  }
};
