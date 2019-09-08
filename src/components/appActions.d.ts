import { AppView } from "./appState";

export type AppAction = ChangeView;

type ChangeView = {
  type: "CHANGE_VIEW";
  view: AppView;
};
