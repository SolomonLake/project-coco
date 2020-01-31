import { AppGroupEntry } from "./../scripts/databaseServices/appGroupsDatabaseAccessor";
import { AppState } from "./appState.d";
import { AppView } from "./appState";
import { UserEntry } from "../../sharedTypes/userEntry";

export type AppAction = TransitionAppState | UpdateUser;

type TransitionAppState = {
  type: "TRANSITION_APP_STATE";
  newAppState: AppState;
};

type UpdateUser = {
  type: "UPDATE_USER";
  newUser: UserEntry;
};
