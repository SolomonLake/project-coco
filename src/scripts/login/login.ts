import { LoginUserSuccessResult } from "../../../sharedTypes/loginUserSuccessResult";
import { zoomAuth } from "../zoom/zoomAuth";
import { environment } from "../environment/environment";

export async function login() {
  const tokenData = await zoomAuth.getToken();
  const response = await fetch(
    environment().CLOUD_FUNCTION_ENDPOINT +
      `/loginUser?zoomTokenData=${encodeURIComponent(
        JSON.stringify(tokenData),
      )}`,
  );
  const responseJson: LoginUserSuccessResult = await response.json();
  return responseJson;
}
