import { LoginUserSuccessResult } from "./../../src/shared/types/loginUserSuccessResult.d";
import { Request, Response } from "express";
import admin from "firebase-admin";
import { serviceAccount } from "./scripts/firestoreServiceAccount";
import fetch from "node-fetch";
import { processEnv } from "../processEnv";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-coco-251813.firebaseio.com",
});

export const runLoginUser = async (req: Request, res: Response) => {
  // Set CORS headers for preflight requests
  // Allows GETs from origin https://mydomain.com with Authorization header

  res.set("Access-Control-Allow-Origin", processEnv.APP_DOMAIN);

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    const zoomTokenDataString = req.query.zoomTokenData;
    if (zoomTokenDataString) {
      const zoomTokenData = JSON.parse(decodeURIComponent(zoomTokenDataString));
      const accessToken = zoomTokenData.access_token;
      const response = await fetch("https://api.zoom.us/v2/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("login user response", response.status, response.statusText);
      const responseJson = await response.json();
      if (responseJson.id) {
        const userId = responseJson.id;
        admin
          .auth()
          .createCustomToken(userId)
          .then(function(customToken) {
            const successResult: LoginUserSuccessResult = {
              customToken,
              user: responseJson,
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
      res.status(404).send("missing query param zoomTokenData");
    }
  }
};
