import { Request, Response } from "express";
import { Zoom_WebhookBody } from "./js/zoomWebhookTypes";

const zoomAppVerification = process.env.ZOOM_APP_VERIFICATION;

export const zoomNotifications = (req: Request, res: Response): any => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization === zoomAppVerification
  ) {
    const zoomEvent: Zoom_WebhookBody = req.body;
    const zoomEventName = zoomEvent.event;
    switch (zoomEvent.event) {
      case "meeting.participant_joined":
      case "meeting.participant_left":
        break;
      default:
        console.log("unknown zoom event: ", zoomEventName);
        const unreachable: never = zoomEvent;
    }
  } else {
    res.status(304).send("unauthenticated request");
  }
};
