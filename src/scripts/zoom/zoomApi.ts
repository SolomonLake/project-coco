import { config } from "../../environments/config";
import { zoomAuth } from "./zoomAuth";
import { ZoomApiProxyBody } from "../../../sharedTypes/zoomApiProxyTypes";

export const zoomApi = {
  getUser: async () => {
    const result = await makeApiCall({
      endPoint: "https://api.zoom.us/v2/users/me",
      requestInit: {
        method: "GET",
      },
    });
    return result;
  },
};

async function makeApiCall(zoomApiProxyBody: ZoomApiProxyBody) {
  const tokenData = await zoomAuth.getToken();
  const response = await fetch(
    config().CLOUD_FUNCTION_ENDPOINT +
      `/zoomApiProxy?zoomTokenData=${encodeURIComponent(
        JSON.stringify(tokenData),
      )}`,
    { method: "POST", body: JSON.stringify(zoomApiProxyBody) },
  );
  const responseJson = await response.json();
  return responseJson;
}
