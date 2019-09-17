import { AppConfig } from "./appConfigTypes";
import { ZoomUser } from "./zoomTypes";

export type LoginUserSuccessResult = {
  customToken: string;
  user: ZoomUser;
  config: AppConfig;
};
