import { CachedZoomTokenData } from "../../../sharedTypes/zoomTypes";
import { redisClient } from "./redisClient";

export const redisService = {
  setAuthToken: async (
    userKey: string,
    tokenData: CachedZoomTokenData,
  ): Promise<void> => {
    const client = await redisClient();
    await client.set(`authToken:${userKey}`, JSON.stringify(tokenData));
  },
  getAuthToken: async (
    userKey: string,
  ): Promise<CachedZoomTokenData | null> => {
    const client = await redisClient();
    const stringifiedTokenData = await client.get(`authToken:${userKey}`);
    return JSON.parse(stringifiedTokenData);
  },
};
