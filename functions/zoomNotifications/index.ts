import { Request, Response } from "express";
import { runZoomNotifications } from "./zoomNotifications";

export const zoomNotifications = (req: Request, res: Response): any => {
  runZoomNotifications(req, res);
};
