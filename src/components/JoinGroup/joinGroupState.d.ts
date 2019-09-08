export type JoinGroupState = {
  view: AppView;
};

export type AppView = "initial" | "joinGroup" | "main";
