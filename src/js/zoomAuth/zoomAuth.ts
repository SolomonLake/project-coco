import { windowUtils } from "../utils/windowUtils";
import { config } from "../../environments/config";
import { ONE_MINUTE } from "../constants/timesInMilliseconds";

export type CachedZoomTokenData = {
  expiresAt: number;

  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
};

export const zoomAuth = {
  initialize: (): CachedZoomTokenData => {
    const tokenDataString = windowUtils.getUrlParam("zoom_token_data");
    if (tokenDataString) {
      const tokenData: CachedZoomTokenData = JSON.parse(
        decodeURIComponent(tokenDataString),
      );
      console.log("tokenData", tokenData);
      return tokenData;
    } else {
      window.location.href =
        config().CLOUD_FUNCTION_ENDPOINT + "/zoomGetTokenData";
      return {
        expiresAt: 0,
        access_token: "",
        token_type: "",
        refresh_token: "",
        expires_in: 0,
        scope: "",
      };
    }
  },
  getUser: async () => {
    const apiUrl = "https://api.zoom.us/v2/users/me";
    const response = await fetch(
      config().CLOUD_FUNCTION_ENDPOINT +
        `/zoomApiProxy?endPoint=${apiUrl}&zoomTokenData=${encodeURIComponent(
          JSON.stringify(cachedZoomTokenData),
        )}`,
    );
    const responseJson = await response.json();
    return responseJson;
  },
};

const cachedZoomTokenData: CachedZoomTokenData = zoomAuth.initialize();
