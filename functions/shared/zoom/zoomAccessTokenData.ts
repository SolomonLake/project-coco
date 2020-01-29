import { ZoomToken } from "../../../sharedTypes/zoomTypes";

export function zoomAccessTokenData(accessToken: ZoomToken) {
  const expiresInMS = accessToken.expires_in * 1000;
  const twoMinutes = 2 * 60 * 1000;
  const responseJsonWithExpiresAt = {
    ...accessToken,
    expiresAt: Date.now() + expiresInMS - twoMinutes,
  };
  return responseJsonWithExpiresAt;
}
