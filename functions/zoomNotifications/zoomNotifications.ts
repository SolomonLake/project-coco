import { Request, Response } from "express";
import { Zoom_WebhookBody } from "./scripts/zoomWebhookTypes";
import { processEnv } from "../processEnv";
import { userJoinedMeeting } from "./scripts/userJoinedMeeting";
import { userLeftMeeting } from "./scripts/userLeftMeeting";

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
        await userJoinedMeeting(zoomEvent);
        res.send({ status: "success" });
        break;
      case "meeting.participant_left":
        await userLeftMeeting(zoomEvent);
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
