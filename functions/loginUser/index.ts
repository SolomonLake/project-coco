import { runLoginUser } from "./loginUser";
import { Request, Response } from "express";

export const loginUser = (req: Request, res: Response): any => {
  runLoginUser(req, res);
};
