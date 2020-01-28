import { windowUtils } from "../utils/windowUtils";
import { environment } from "../environment/environment";

let cachedZoomUserId: Promise<string> | null;

export const zoomAuth = {
  initialize: (): Promise<string> => {
    cachedZoomUserId = new Promise((resolve, _reject) => {
      const userId = windowUtils.getUrlParam("zoom_user_id");
      if (userId) {
        resolve(userId);
      } else {
        window.location.href =
          environment().CLOUD_FUNCTION_ENDPOINT + "/zoomGetTokenData";
      }
    });
    return cachedZoomUserId;
  },
  authorizeZoom: (): Promise<string> => {
    if (cachedZoomUserId) {
      return cachedZoomUserId;
    } else {
      return zoomAuth.initialize();
    }
  },
};
