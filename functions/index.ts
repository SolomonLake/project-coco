import { Request, Response } from "express";

import { loginUser } from "./loginUser/index";
export { loginUser } from "./loginUser/index";
import { logoutUser } from "./logoutUser/index";
export { logoutUser } from "./logoutUser/index";
import { zoomNotifications } from "./zoomNotifications/index";
export { zoomNotifications } from "./zoomNotifications/index";
import { zoomGetTokenData } from "./zoomGetTokenData/index";
export { zoomGetTokenData } from "./zoomGetTokenData/index";
import { zoomApiProxy } from "./zoomApiProxy/index";
export { zoomApiProxy } from "./zoomApiProxy/index";

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
    case "/logoutUser":
      return logoutUser(req, res);
    default:
      res.send("function not defined");
  }
}
