import { Request, Response } from "express";
import { runZoomApiProxy } from "./scripts/zoomApiProxy";

export const zoomApiProxy = async (req: Request, res: Response) => {
  runZoomApiProxy(req, res);
};
