import { Request, Response } from "express";

export const notificationsRoutes = [
  {
    path: "/notifications",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.send("Hello world!");
    },
  },
];
