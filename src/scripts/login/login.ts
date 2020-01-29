import { LoginUserSuccessResult } from "../../../sharedTypes/loginUserSuccessResult";
import { zoomAuth } from "../zoom/zoomAuth";
import { environment } from "../environment/environment";
import { config } from "../config/config";

export async function login() {
  await zoomAuth.authorizeZoom();
  const response = await fetch(
    environment().CLOUD_FUNCTION_ENDPOINT + `/loginUser`,
    {
      credentials: "include",
    },
  );
  const responseJson: LoginUserSuccessResult = await response.json();
  return responseJson;
}
