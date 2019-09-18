import { AppGroupEntry } from "./../../sharedTypes/appGroupEntry.d";
import { UserEntry } from "../../sharedTypes/userEntry";

// export type AppState = {
//   view: AppView;
//   appGroup: AppGroupEntry | null;
//   user: UserEntry | null;
// };
export type AppState =
  | InitialAppState
  | JoinGroupAppState
  | MainGroupAppState
  | LoadingAppState;

export type AppView = "initial" | "joinGroup" | "mainGroup" | "loading";

export type InitialAppState = {
  view: "initial";
};

export type JoinGroupAppState = {
  view: "joinGroup";
  user: UserEntry;
};

export type MainGroupAppState = {
  view: "mainGroup";
  user: UserEntry;
  initialAppGroup: AppGroupEntry;
};

export type LoadingAppState = {
  view: "loading";
};
