import fetch from "node-fetch";
import { Request, Response } from "express";
import { processEnv } from "../processEnv";
import { redisService } from "../shared/redis/redisService";

const zoomRedirectUrl = processEnv.CLOUD_FUNCTION_ENDPOINT__ZOOM_GET_TOKEN_DATA;

export const runZoomGetTokenData = async (
  req: Request,
  res: Response,
): Promise<any> => {
  res.setHeader("Cache-Control", "private");
  const auth = req.cookies ? req.cookies["__session"] : null;
  console.log("AUTH", auth);
  const zoomUserId = req.query.zoomUserId;
  const zoomTokenData = zoomUserId
    ? await redisService.getAuthToken(zoomUserId)
    : null;
  if (zoomTokenData) {
    res.redirect(processEnv.APP_ENDPOINT + `?zoom_user_id=${zoomUserId}`);
  } else {
    const zoomCode = req.query.code;
    if (!zoomCode) {
      const zoomAppClientId = processEnv.ZOOM_CLIENT_ID;
      const zoomTokenUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${zoomAppClientId}&redirect_uri=${zoomRedirectUrl}`;
      res.redirect(zoomTokenUrl);
    } else {
      const authHeader =
        "Basic " +
        Buffer.from(
          processEnv.ZOOM_CLIENT_ID + ":" + processEnv.ZOOM_CLIENT_SECRET,
        ).toString("base64");
      const authUrl =
        "https://zoom.us/oauth/token" +
        "?grant_type=authorization_code&code=" +
        zoomCode +
        "&redirect_uri=" +
        zoomRedirectUrl;
      const accessTokenResponse = await fetch(authUrl, {
        method: "POST",
        headers: {
          Authorization: authHeader,
        },
      });
      const accessTokenResponseJson = await accessTokenResponse.json();
      const expiresInMS = accessTokenResponseJson.expires_in * 1000;
      const twoMinutes = 2 * 60 * 1000;
      const responseJsonWithExpiresAt = {
        ...accessTokenResponseJson,
        expiresAt: Date.now() + expiresInMS - twoMinutes,
      };
      const userResponse = await fetch("https://api.zoom.us/v2/users/me", {
        headers: {
          Authorization: `Bearer ${responseJsonWithExpiresAt.access_token}`,
        },
      });
      const userResponseJson = await userResponse.json();
      if (userResponseJson.id) {
        redisService.setAuthToken(
          userResponseJson.id,
          responseJsonWithExpiresAt,
        );
        console.log("redirecting to", processEnv.APP_ENDPOINT);
        res.cookie("__session", userResponseJson.id, {
          secure: true,
          path: "/",
          sameSite: "None",
          httpOnly: true,
        });
        res.redirect(
          processEnv.APP_ENDPOINT + `?zoom_user_id=${userResponseJson.id}`,
        );
      } else {
        res.status(404).send("unable to get userId from zoom");
      }
    }
  }
};
