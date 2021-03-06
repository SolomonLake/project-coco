import { environment } from "../environment/environment";
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
  await zoomAuth.authorizeZoom();
  const response = await fetch(
    environment().CLOUD_FUNCTION_ENDPOINT + `/zoomApiProxy`,
    {
      method: "POST",
      body: JSON.stringify(zoomApiProxyBody),
      credentials: "include",
    },
  );
  const responseJson = await response.json();
  return responseJson;
}
