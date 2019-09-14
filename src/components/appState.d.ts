import { AppGroupEntry } from "./../scripts/databaseServices/appGroupsDatabaseAccessor";
import { UserEntry } from "../scripts/databaseServices/usersDatabaseAccessor";

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
  appGroup: AppGroupEntry;
};

export type LoadingAppState = {
  view: "loading";
};
