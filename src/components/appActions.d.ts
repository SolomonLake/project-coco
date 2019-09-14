import { AppState } from "./appState.d";
import { AppView } from "./appState";

export type AppAction = TransitionAppState;

type TransitionAppState = {
  type: "TRANSITION_APP_STATE";
  newAppState: AppState;
};
