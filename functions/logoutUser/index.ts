import { runLogoutUser } from "./logoutUser";
import { Request, Response } from "express";

export const logoutUser = (req: Request, res: Response): any => {
  runLogoutUser(req, res);
};
