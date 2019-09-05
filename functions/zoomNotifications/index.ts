import { Request, Response } from "express";

export const notifications = (req: Request, res: Response): any => {
  res.send("Hello, World");
};
