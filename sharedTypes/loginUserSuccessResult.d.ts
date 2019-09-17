import { AppConfig } from "./configTypes";
import { ZoomUser } from "./zoomTypes";

export type LoginUserSuccessResult = {
  customToken: string;
  user: ZoomUser;
  config: AppConfig;
};
