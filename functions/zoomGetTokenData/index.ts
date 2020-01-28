import { Request, Response } from "express";
import { runZoomGetTokenData } from "./zoomGetTokenData";

export const zoomGetTokenData = async (
  req: Request,
  res: Response,
): Promise<any> => {
  runZoomGetTokenData(req, res);
};
