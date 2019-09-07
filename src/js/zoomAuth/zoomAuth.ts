import { windowUtils } from "../utils/windowUtils";
import { config } from "../../environments/config";
import { ONE_MINUTE } from "../constants/timesInMilliseconds";

type CachedTokenData = ZoomTokenData & {
  expires_at: number;
};

type ZoomTokenData = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
};

export const zoomAuth = {
  initialize: (): CachedTokenData => {
    const tokenDataString = windowUtils.getUrlParam("zoom_token_data");
    if (tokenDataString) {
      const tokenData: ZoomTokenData = JSON.parse(
        decodeURIComponent(tokenDataString),
      );
      return {
        ...tokenData,
        expires_at: Date.now() + tokenData.expires_in - 5 * ONE_MINUTE,
      };
    } else {
      window.location.href =
        config().CLOUD_FUNCTION_ENDPOINT + "/zoomGetRefreshToken";
      return {
        expires_at: 0,
        access_token: "",
        token_type: "",
        refresh_token: "",
        expires_in: 0,
        scope: "",
      };
    }
  },
  getUser: async () => {
    // const apiUrl = "https://api.zoom.us/v2/users/me";
    // const response = await fetch(apiUrl, {
    //   headers: { Authorization: `Bearer ${cachedAccessToken}` },
    //   credentials: "include",
    // });
    // const responseJson = await response.json();
    // return responseJson;
    console.log("hello");
  },
};

const cachedAccessTokenData: CachedTokenData = zoomAuth.initialize();
