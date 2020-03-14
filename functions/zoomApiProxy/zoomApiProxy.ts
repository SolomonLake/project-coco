import { ZoomApiProxyBody } from "../../sharedTypes/zoomApiProxyTypes";
import { Request, Response } from "express";
import fetch from "node-fetch";
import Cookie from "cookie";
import { getValidAccessToken } from "../shared/zoom/getValidAccessToken";
import { processEnv } from "../processEnv";
// import { redisService } from "../shared/redis/redisService";
import { decodeJwt } from "../shared/auth/jwtCookie";
import { gcsService } from "../shared/gcs/gcsService";

const acceptableEndpoints = ["https://api.zoom.us/v2/users/me"];

export const runZoomApiProxy = async (req: Request, res: Response) => {
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
    const encodedZoomUserId = Cookie.parse(<any>req.headers.cookie || "")
      .__session;
    const zoomUserIdJwt = decodeJwt(encodedZoomUserId);
    const zoomUserId = zoomUserIdJwt ? zoomUserIdJwt.userId : null;
    const zoomTokenData = zoomUserId
      ? await gcsService.getAuthToken(zoomUserId)
      : null;
    const requestBody: ZoomApiProxyBody = JSON.parse(req.body);
    if (
      requestBody &&
      requestBody.endPoint &&
      acceptableEndpoints.includes(requestBody.endPoint) &&
      zoomUserId &&
      zoomTokenData
    ) {
      const accessToken = await getValidAccessToken(zoomTokenData, zoomUserId);
      const response = await fetch(requestBody.endPoint, {
        ...requestBody.requestInit,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(
        "api call response",
        requestBody.endPoint,
        response.status,
        response.statusText,
      );
      const responseJson = await response.json();
      res.send(responseJson);
    } else {
      res.status(404).send("missing query params endPoint and/or auth cookie");
    }
  }
};
