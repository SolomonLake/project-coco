export type AppState = {
  view: AppView;
};

export type AppView = "initial" | "joinGroup" | "main" | "loading";
