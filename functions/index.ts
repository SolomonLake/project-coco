import { loginUser } from "./loginUser/index";
import { zoomNotifications } from "./zoomNotifications/index";
import { zoomGetTokenData } from "./zoomGetTokenData/index";
import { zoomApiProxy } from "./zoomApiProxy/index";
import { Request, Response } from "express";

export function index(req: Request, res: Response) {
  console.log("index", req.path);
  switch (req.path) {
    case "/":
    case "/zoomGetTokenData":
      return zoomGetTokenData(req, res);
    case "/zoomApiProxy":
      return zoomApiProxy(req, res);
    case "/zoomNotifications":
      return zoomNotifications(req, res);
    case "/loginUser":
      return loginUser(req, res);
    default:
      res.send("function not defined");
  }
}
