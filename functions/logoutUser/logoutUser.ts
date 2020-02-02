import { Request, Response } from "express";
import { processEnv } from "../processEnv";

export const runLogoutUser = async (req: Request, res: Response) => {
  // Set CORS headers for preflight requests
  // Allows GETs from origin https://mydomain.com with Authorization header

  res.set("Access-Control-Allow-Origin", processEnv.APP_DOMAIN);
  res.set("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Credentials", "true");
    res.status(204).send("");
  } else {
    const redirectParam = req.query.redirectTo;
    const redirectUrl = redirectParam
      ? decodeURIComponent(req.query.redirectTo)
      : processEnv.APP_DOMAIN;
    res.clearCookie("__session");
    res.redirect(redirectUrl);
  }
};
