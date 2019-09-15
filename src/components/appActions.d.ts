import { AppGroupEntry } from "./../scripts/databaseServices/appGroupsDatabaseAccessor";
import { AppState } from "./appState.d";
import { AppView } from "./appState";
import { UserEntry } from "../scripts/databaseServices/usersDatabaseAccessor";

export type AppAction = TransitionAppState;

type TransitionAppState = {
  type: "TRANSITION_APP_STATE";
  newAppState: AppState;
};
