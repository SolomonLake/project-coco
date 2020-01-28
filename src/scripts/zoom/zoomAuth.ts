import { CachedZoomTokenData } from "../../../sharedTypes/zoomTypes";
import { windowUtils } from "../utils/windowUtils";
import { environment } from "../environment/environment";

let cachedZoomTokenData: Promise<CachedZoomTokenData> | null;

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
          environment().CLOUD_FUNCTION_ENDPOINT + "/zoomGetTokenData";
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
