import { ZoomUser } from "./zoomTypes";

export type LoginUserSuccessResult = {
  customToken: string;
  user: ZoomUser;
};
