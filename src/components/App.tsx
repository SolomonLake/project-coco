import React from "react";
import "./App.css";
import { Loading } from "./Loading/Loading";
import { AppStoreContext, useAppStore, AppStore } from "./appStore";
import { AppAction } from "./appActions";
import { JoinGroup } from "./JoinGroup/JoinGroup";
import { Main } from "./Main/Main";
import { zoomApi } from "../scripts/zoom/zoomApi";
import { zoomAuth } from "../scripts/zoom/zoomAuth";

async function initializeApp(appStore: AppStore) {
  zoomAuth.initialize();
  const user = await zoomApi.getUser();
  console.log("zoom user", user);
  appStore.dispatch({ type: "CHANGE_VIEW", view: "joinGroup" });
}

export const App: React.FC = () => {
  const appStore = useAppStore();
  switch (appStore.state.view) {
    case "initial":
      initializeApp(appStore);
      return <Loading />;
    case "loading":
      return <Loading />;
    case "joinGroup":
      return (
        <AppStoreContext.Provider value={appStore}>
          <JoinGroup />
        </AppStoreContext.Provider>
      );
    case "main":
      return (
        <AppStoreContext.Provider value={appStore}>
          <Main />
        </AppStoreContext.Provider>
      );
    default:
      const _: never = appStore.state.view;
      throw new Error(`unknown state view: ${appStore.state.view}`);
  }
};
