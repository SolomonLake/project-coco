import fetch from "node-fetch";
import Cookie from "cookie";
import { Request, Response } from "express";
import { processEnv } from "../processEnv";
import { redisService } from "../shared/redis/redisService";
import { encodeJwt, decodeJwt } from "../shared/auth/jwtCookie";
import { zoomAccessTokenData } from "../shared/zoom/zoomAccessTokenData";

const zoomRedirectUrl = processEnv.CLOUD_FUNCTION_ENDPOINT__ZOOM_GET_TOKEN_DATA;

export const runZoomGetTokenData = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const encodedZoomUserId = Cookie.parse(<any>req.headers.cookie || "")
    .__session;
  const zoomUserIdJwt = decodeJwt(encodedZoomUserId);
  const zoomUserId = zoomUserIdJwt ? zoomUserIdJwt.userId : null;
  const zoomTokenData = zoomUserId
    ? await redisService.getAuthToken(zoomUserId)
    : null;
  if (zoomTokenData) {
    res.redirect(processEnv.APP_ENDPOINT + `?logged_in=true`);
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
      const responseJsonWithExpiresAt = zoomAccessTokenData(
        accessTokenResponseJson,
      );
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
        const authJwt = encodeJwt({ userId: userResponseJson.id });
        res.cookie("__session", authJwt, {
          //   secure: true,
          path: "/",
          sameSite: "None",
          httpOnly: true,
        });
        res.redirect(processEnv.APP_ENDPOINT + `?logged_in=true`);
      } else {
        res.status(404).send("unable to get userId from zoom");
      }
    }
  }
};
