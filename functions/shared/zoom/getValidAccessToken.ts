import { CachedZoomTokenData } from "../../../sharedTypes/zoomTypes";
import fetch from "node-fetch";
import { processEnv } from "../../processEnv";

const zoomRedirectUrl = processEnv.CLOUD_FUNCTION_ENDPOINT__ZOOM_GET_TOKEN_DATA;

export async function getValidAccessToken(
  zoomTokenData: CachedZoomTokenData,
): Promise<string> {
  const tokenIsNotExpired = zoomTokenData.expiresAt > Date.now();
  if (tokenIsNotExpired) {
    return zoomTokenData.access_token;
  } else {
    const authHeader =
      "Basic " +
      Buffer.from(
        processEnv.ZOOM_CLIENT_ID + ":" + processEnv.ZOOM_CLIENT_SECRET,
      ).toString("base64");
    console.log("refreshing token");
    const authUrl =
      "https://zoom.us/oauth/token" +
      "?grant_type=refresh_token&refresh_token=" +
      zoomTokenData.refresh_token +
      "&redirect_uri=" +
      zoomRedirectUrl;
    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
      },
    });
    console.log(
      "refreshing token response",
      response.status,
      response.statusText,
    );
    const responseJson = await response.json();
    return responseJson.access_token;
  }
}
