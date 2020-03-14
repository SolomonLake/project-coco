import { CachedZoomTokenData } from "../../../sharedTypes/zoomTypes";
import { Storage } from "@google-cloud/storage";
import { processEnv } from "../../processEnv";

const storage = new Storage({
  credentials: {
    // need to do this because in dev the private key doesn't have actual newlines in it
    private_key: processEnv.GCP_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: processEnv.GCP_CLIENT_EMAIL,
  },
});

const tokenBucket = storage.bucket(processEnv.GCS_TOKEN_BUCKET_NAME);

export const gcsService = {
  setAuthToken: async (userKey: string, tokenData: CachedZoomTokenData) => {
    await tokenBucket.file(userKey).save(JSON.stringify(tokenData));
  },
  getAuthToken: async (
    userKey: string,
  ): Promise<CachedZoomTokenData | null> => {
    const tokenFile = tokenBucket.file(userKey);
    const existsData = await tokenFile.exists();
    const exists = existsData[0];
    if (exists) {
      const tokenData = await tokenFile.download();
      const dataString = tokenData[0].toString("utf8");
      return JSON.parse(dataString);
    } else {
      return null;
    }
  },
};
