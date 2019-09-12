import { ZoomApiProxyBody } from "./../../../src/shared/types/zoomApiProxyTypes.d";
import { CachedZoomTokenData } from "./../../../src/shared/types/zoomTypes.d";
import { Request, Response } from "express";
import fetch from "node-fetch";
import { getValidAccessToken } from "./getValidAccessToken";

export const runZoomApiProxy = async (req: Request, res: Response) => {
  // Set CORS headers for preflight requests
  // Allows GETs from origin https://mydomain.com with Authorization header

  res.set("Access-Control-Allow-Origin", process.env.APP_DOMAIN);

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    const zoomTokenDataString = req.query.zoomTokenData;
    const requestBody: ZoomApiProxyBody = JSON.parse(req.body);
    if (requestBody && requestBody.endPoint && zoomTokenDataString) {
      const zoomTokenData = JSON.parse(decodeURIComponent(zoomTokenDataString));
      const accessToken = await getValidAccessToken(zoomTokenData);
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
      res
        .status(404)
        .send("missing query params endPoint and/or zoomTokenData");
    }
  }
};
