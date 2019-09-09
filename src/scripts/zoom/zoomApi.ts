import { config } from "../../environments/config";
import { zoomAuth } from "./zoomAuth";

export const zoomApi = {
  getUser: async () => {
    const apiUrl = "https://api.zoom.us/v2/users/me";
    const result = await makeApiCall(apiUrl);
    return result;
  },
};

async function makeApiCall(apiUrl: string) {
  const tokenData = await zoomAuth.getToken();
  const response = await fetch(
    config().CLOUD_FUNCTION_ENDPOINT +
      `/zoomApiProxy?endPoint=${apiUrl}&zoomTokenData=${encodeURIComponent(
        JSON.stringify(tokenData),
      )}`,
  );
  const responseJson = await response.json();
  return responseJson;
}
