import { config } from "../config/config";

let _gapiClientLoaded: Promise<void> | null = null;

export async function ensureGapiClient(): Promise<typeof gapi.client> {
  if (_gapiClientLoaded) {
    await _gapiClientLoaded;
    return gapi.client;
  } else {
    _gapiClientLoaded = initClient();
    await _gapiClientLoaded;
    return gapi.client;
  }
}

async function initClient(): Promise<void> {
  await new Promise((resolve, reject) => {
    gapi.load("client:auth2", {
      callback: async () => {
        try {
          const initConfig = {
            apiKey: config().GOOGLE_CALENDAR_API_KEY,
            clientId: config().GOOGLE_AUTH_CLIENT_ID,
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
            ],
            scope: "https://www.googleapis.com/auth/calendar.events.readonly",
          };
          await gapi.client.init(initConfig);

          const authInstance = gapi.auth2.getAuthInstance();
          const notSignedIn = !authInstance.isSignedIn.get();
          if (notSignedIn) {
            await authInstance.signIn();
          }
          resolve();
        } catch (e) {
          _gapiClientLoaded = null;
          reject(e);
        }
      },
    });
  });
}
