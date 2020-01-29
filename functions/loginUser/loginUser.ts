import { LoginUserSuccessResult } from "../../sharedTypes/loginUserSuccessResult";
import { Request, Response } from "express";
import { serviceAccount } from "../shared/firestore/firestoreServiceAccount";
import fetch from "node-fetch";
import Cookie from "cookie";
import { processEnv } from "../processEnv";
import { firestoreAdmin } from "../shared/firestore/initializeFirestoreAdmin";
import { getValidAccessToken } from "../shared/zoom/getValidAccessToken";
import { redisService } from "../shared/redis/redisService";
import { decodeJwt } from "../shared/auth/jwtCookie";

export const runLoginUser = async (req: Request, res: Response) => {
  // Set CORS headers for preflight requests
  // Allows GETs from origin https://mydomain.com with Authorization header

  res.set("Access-Control-Allow-Origin", processEnv.APP_DOMAIN);
  res.set("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Credentials", "true");
    res.status(204).send("");
  } else {
    const encodedZoomUserId = Cookie.parse(<any>req.headers.cookie || "")
      .__session;
    const zoomUserIdJwt = decodeJwt(encodedZoomUserId);
    const zoomUserId = zoomUserIdJwt ? zoomUserIdJwt.userId : null;
    const zoomTokenData = zoomUserId
      ? await redisService.getAuthToken(zoomUserId)
      : null;
    if (zoomUserId && zoomTokenData) {
      const accessToken = await getValidAccessToken(zoomTokenData, zoomUserId);
      const response = await fetch("https://api.zoom.us/v2/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("login user response", response.status, response.statusText);
      const responseJson = await response.json();
      if (responseJson.id) {
        const admin = firestoreAdmin();
        const userId = responseJson.id;
        admin
          .auth()
          .createCustomToken(userId)
          .then(function(customToken) {
            const successResult: LoginUserSuccessResult = {
              customToken,
              user: responseJson,
              config: processEnv,
            };
            res.send(successResult);
          })
          .catch(function(error) {
            console.log("Error creating custom token:", error);
            res.status(500).send("Error creating custom token");
          });
      } else {
        res.status(404).send("unable to get userId from zoom");
      }
    } else {
      res.status(404).send("missing auth cookie");
    }
  }
};
