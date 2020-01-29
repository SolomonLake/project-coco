import { windowUtils } from "../utils/windowUtils";
import { environment } from "../environment/environment";

let loggedIn: Promise<string> = new Promise((resolve, _reject) => {
  if (windowUtils.getUrlParam("logged_in")) {
    window.history.pushState(
      {},
      document.title,
      window.location.origin + window.location.pathname,
    );
    resolve();
  } else {
    window.location.href =
      environment().CLOUD_FUNCTION_ENDPOINT + "/zoomGetTokenData";
  }
});

export const zoomAuth = {
  authorizeZoom: async (): Promise<void> => {
    await loggedIn;
  },
};
