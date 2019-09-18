import { AppConfig } from "../sharedTypes/appConfigTypes";

export const processEnv = {
  ZOOM_CLIENT_SECRET: process.env.ZOOM_CLIENT_SECRET,
  ZOOM_CLIENT_ID: process.env.ZOOM_CLIENT_ID,
  ZOOM_APP_VERIFICATION: process.env.ZOOM_APP_VERIFICATION,
  APP_ENDPOINT: process.env.APP_ENDPOINT,
  APP_DOMAIN: process.env.APP_DOMAIN,
  CLOUD_FUNCTION_ENDPOINT__ZOOM_GET_TOKEN_DATA:
    process.env.CLOUD_FUNCTION_ENDPOINT__ZOOM_GET_TOKEN_DATA,
  CLOUD_FUNCTION_ENDPOINT: process.env.CLOUD_FUNCTION_ENDPOINT,
  FIRESTORE_PRIVATE_KEY: process.env.FIRESTORE_PRIVATE_KEY,
  FIRESTORE_API_KEY: process.env.FIRESTORE_API_KEY,
  FIRESTORE_AUTH_DOMAIN: process.env.FIRESTORE_AUTH_DOMAIN,
  FIRESTORE_PROJECT_ID: process.env.FIRESTORE_PROJECT_ID,
  GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  GOOGLE_CALENDAR_API_KEY: process.env.GOOGLE_CALENDAR_API_KEY,
} as AppConfig;
