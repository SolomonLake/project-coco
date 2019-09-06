import { getUrlParam } from "../../utils/windowUtils";
import { config } from "../../environments/dev";

export const zoomAuth = {
  initialize: async () => {
    const refreshToken = getUrlParam("refresh_token");
    if (refreshToken) {
      debugger;
      // set refresh token cookie
    }
  },
  getAccessToken: async () => {
    window.open(
      config.CLOUD_FUNCTION_ENDPOINT + "/zoomGetRefreshToken",
      "_self",
    );
  },
  getUser: async () => {
    // get access token from cookie
    const zoomAccessToken = await zoomAuth.getAccessToken();
    // const apiUrl = "https://api.zoom.us/v2/users/me";
    // const response = await fetch(apiUrl, {
    //   headers: { Authorization: `Bearer ${zoomAccessToken}` },
    // });
    // const responseJson = await response.json();
    // return responseJson;
  },
};
