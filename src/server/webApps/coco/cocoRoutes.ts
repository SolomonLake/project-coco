import { Request, Response } from "express";
import path from "path";
import express from "express";

const dir = path.join(__dirname, "../../client/webApps/coco/");

export const cocoRoutes = [
  {
    path: "/views",
    method: "set",
    handler: dir,
  },
  {
    path: "/",
    method: "use",
    handler: express.static(dir),
  },
  {
    path: "/",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.sendFile("index.html", { root: dir });
    },
  },
];
