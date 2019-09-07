import fetch from "node-fetch";
import { Request, Response } from "express";

const zoomRedirectUrl =
  process.env.CLOUD_FUNCTION_ENDPOINT__ZOOM_GET_TOKEN_DATA;

export const zoomGetTokenData = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const zoomCode = req.query.code;
  if (!zoomCode) {
    const zoomAppClientId = process.env.ZOOM_CLIENT_ID;
    const zoomTokenUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${zoomAppClientId}&redirect_uri=${zoomRedirectUrl}`;
    res.redirect(zoomTokenUrl);
  } else {
    const authHeader =
      "Basic " +
      Buffer.from(
        process.env.ZOOM_CLIENT_ID + ":" + process.env.ZOOM_CLIENT_SECRET,
      ).toString("base64");
    const authUrl =
      "https://zoom.us/oauth/token" +
      "?grant_type=authorization_code&code=" +
      zoomCode +
      "&redirect_uri=" +
      zoomRedirectUrl;
    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
    });
    const responseJson = await response.json();
    const responseJsonWithExpiresAt = {
      ...responseJson,
      expiresAt: Date.now() + responseJson.expires_in - 2 * 60 * 1000,
    };
    console.log("redirecting to", process.env.APP_ENDPOINT);
    res.redirect(
      process.env.APP_ENDPOINT +
        `?zoom_token_data=${encodeURIComponent(
          JSON.stringify(responseJsonWithExpiresAt),
        )}`,
    );
  }
};
