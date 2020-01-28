import { LoginUserSuccessResult } from "../../../sharedTypes/loginUserSuccessResult";
import { zoomAuth } from "../zoom/zoomAuth";
import { environment } from "../environment/environment";

export async function login() {
  const zoomUserId = await zoomAuth.authorizeZoom();
  debugger;
  const response = await fetch(
    environment().CLOUD_FUNCTION_ENDPOINT +
      `/loginUser?zoomUserId=${zoomUserId}`,
  );
  debugger;
  const responseJson: LoginUserSuccessResult = await response.json();
  return responseJson;
}
