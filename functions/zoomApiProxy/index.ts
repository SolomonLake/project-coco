import { CachedZoomTokenData } from "./../../src/js/zoomAuth/zoomAuth";
import { Request, Response } from "express";
import fetch from "node-fetch";

const zoomRedirectUrl =
  process.env.CLOUD_FUNCTION_ENDPOINT + "/zoomGetTokenData";

export const zoomApiProxy = async (req: Request, res: Response) => {
  // Set CORS headers for preflight requests
  // Allows GETs from origin https://mydomain.com with Authorization header

  res.set("Access-Control-Allow-Origin", "https://solomonlake.github.io");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    const endPoint = req.query.endPoint;
    const zoomTokenDataString = req.query.zoomTokenData;
    if (endPoint && zoomTokenDataString) {
      const zoomTokenData = JSON.parse(decodeURIComponent(zoomTokenDataString));
      const accessToken = await getValidAccessToken(zoomTokenData);
      const response = await fetch(endPoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const responseJson = response.json();
      res.send(responseJson);
    } else {
      res
        .status(404)
        .send("missing query params endPoint and/or zoomTokenData");
    }
  }
};

async function getValidAccessToken(
  zoomTokenData: CachedZoomTokenData,
): Promise<string> {
  const tokenIsNotExpired = zoomTokenData.expiresAt > Date.now();
  if (tokenIsNotExpired) {
    return zoomTokenData.access_token;
  } else {
    const authHeader =
      "Basic " +
      Buffer.from(
        process.env.ZOOM_CLIENT_ID + ":" + process.env.ZOOM_CLIENT_SECRET,
      ).toString("base64");
    const authUrl =
      "https://zoom.us/oauth/token" +
      "?grant_type=refresh_token&refresh_token=" +
      zoomTokenData.refresh_token +
      "&redirect_uri=" +
      zoomRedirectUrl;
    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
    });
    const responseJson = await response.json();
    return responseJson.access_token;
  }
}
