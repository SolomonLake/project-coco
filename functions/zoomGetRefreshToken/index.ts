import { Request, Response } from "express";

const zoomRedirectUrl =
  process.env.CLOUD_FUNCTION_ENDPOINT + "/zoomGetRefreshToken";

export const zoomGetRefreshToken = async (
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
      btoa(process.env.ZOOM_CLIENT_ID + ":" + process.env.ZOOM_CLIENT_SECRET);
    const authUrl =
      "https://zoom.us/oauth/token" +
      "?grant_type=authorization_code&code=" +
      zoomCode +
      "&redirect_uri=" +
      zoomRedirectUrl;
    const response = await fetch(authUrl, {
      headers: {
        Authorization: authHeader,
      },
      credentials: "include",
    });
    const responseJson = await response.json();
    res.redirect(
      process.env.APP_ENDPOINT + `?refresh_token=${responseJson.refresh_token}`,
    );
  }
};
