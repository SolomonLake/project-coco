import { zoomAuth } from "../zoom/zoomAuth";
import { config } from "../../environments/config";

export async function login() {
  const tokenData = await zoomAuth.getToken();
  const response = await fetch(
    config().CLOUD_FUNCTION_ENDPOINT +
      `/loginUser?zoomTokenData=${encodeURIComponent(
        JSON.stringify(tokenData),
      )}`,
  );
  const responseJson = await response.json();
  console.log("response", responseJson);
  debugger;
  return responseJson;
}
