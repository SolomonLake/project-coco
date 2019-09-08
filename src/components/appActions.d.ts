import { AppView } from "./appState";

export type AppStoreAction = ChangeView;

type ChangeView = {
  type: "CHANGE_VIEW";
  view: AppView;
};
