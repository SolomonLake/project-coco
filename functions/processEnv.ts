import { AppConfig } from "./configTypes.d";

export const processEnv = process.env;

declare var process: { env: AppConfig };
