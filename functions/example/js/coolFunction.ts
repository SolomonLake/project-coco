import { Request, Response } from "express";

export const coolFunction = (req: Request, res: Response): any => {
  res.send("Hello, World");
};
