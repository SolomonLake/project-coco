import { windowUtils } from "../utils/windowUtils";
import { environment } from "../environment/environment";

let loggedIn: Promise<string> = new Promise((resolve, _reject) => {
  if (windowUtils.getUrlParam("logged_in")) {
    window.history.pushState(
      {},
      document.title,
      windowUtils.removeUrlParam("logged_in"),
    );
    resolve();
  } else {
    window.location.href = `${
      environment().CLOUD_FUNCTION_ENDPOINT
    }/zoomGetTokenData?redirectUrl=${window.location.href}`;
  }
});

export const zoomAuth = {
  authorizeZoom: async (): Promise<void> => {
    await loggedIn;
  },
};
