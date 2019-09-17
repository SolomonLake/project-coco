import { AppConfig } from "../../../sharedTypes/appConfigTypes";

export function setConfig(c: AppConfig) {
  _config = c;
}

export function config(): AppConfig {
  if (_config) {
    return _config;
  } else {
    throw new Error("config not initialized");
  }
}

let _config: AppConfig | null = null;
