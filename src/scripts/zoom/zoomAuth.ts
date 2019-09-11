import { CachedZoomTokenData } from "../../shared/types/zoomTypes";
import { windowUtils } from "../utils/windowUtils";
import { config } from "../../environments/config";

export const zoomAuth = {
  initialize: (): Promise<CachedZoomTokenData> => {
    cachedZoomTokenData = new Promise((resolve, _reject) => {
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
        resolve(tokenData);
      } else {
        window.location.href =
          config().CLOUD_FUNCTION_ENDPOINT + "/zoomGetTokenData";
        resolve({
          expiresAt: 0,
          access_token: "",
          token_type: "",
          refresh_token: "",
          expires_in: 0,
          scope: "",
        });
      }
    });
    return cachedZoomTokenData;
  },
  getToken: (): Promise<CachedZoomTokenData> => {
    if (cachedZoomTokenData) {
      return cachedZoomTokenData;
    } else {
      return zoomAuth.initialize();
    }
  },
};

let cachedZoomTokenData: Promise<CachedZoomTokenData> | null;