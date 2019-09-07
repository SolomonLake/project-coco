import { CachedZoomTokenData } from "../../shared/types/zoomTypes";
import { windowUtils } from "../utils/windowUtils";
import { config } from "../../environments/config";

export const zoomAuth = {
  initialize: (): Promise<CachedZoomTokenData> => {
    return new Promise((resolve, _reject) => {
      const tokenDataString = windowUtils.getUrlParam("zoom_token_data");
      if (tokenDataString) {
        const tokenData: CachedZoomTokenData = JSON.parse(
          decodeURIComponent(tokenDataString),
        );
        window.history.pushState(
          {},
          document.title,
          window.location.origin + window.location.pathname,
        );
        console.log("tokenData", tokenData);
        resolve(tokenData);
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
    });
  },
  getUser: async () => {
    const apiUrl = "https://api.zoom.us/v2/users/me";
    const result = await makeApiCall(apiUrl);
    return result;
  },
};

async function makeApiCall(apiUrl: string) {
  const response = await fetch(
    config().CLOUD_FUNCTION_ENDPOINT +
      `/zoomApiProxy?endPoint=${apiUrl}&zoomTokenData=${encodeURIComponent(
        JSON.stringify(await cachedZoomTokenData),
      )}`,
  );
  const responseJson = await response.json();
  return responseJson;
}

const cachedZoomTokenData: Promise<CachedZoomTokenData> = zoomAuth.initialize();
