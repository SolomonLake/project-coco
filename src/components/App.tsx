import React from "react";
import { Loading } from "./Loading/Loading";
import { AppStoreContext, useAppStore, AppStore } from "./appStore";
import { AppAction } from "./appActions";
import { JoinGroup } from "./JoinGroup/JoinGroup";
import { MainGroup } from "./MainGroup/MainGroup";
import { zoomApi } from "../scripts/zoom/zoomApi";
import { zoomAuth } from "../scripts/zoom/zoomAuth";
import { login } from "../scripts/login/login";
import { initializeFirestore } from "../scripts/firestore/firestoreInitialize";
import { usersDatabaseAccessor } from "../scripts/databaseServices/usersDatabaseAccessor";
import { appGroupsDatabaseAccessor } from "../scripts/databaseServices/appGroupsDatabaseAccessor";

async function initializeApp(appStore: AppStore) {
  zoomAuth.initialize();
  const userAndCustomToken = await login();
  await initializeFirestore(userAndCustomToken.customToken);
  const user = await usersDatabaseAccessor.findOrCreateUser(
    userAndCustomToken.user,
  );
  const appGroup = user.groupId
    ? await appGroupsDatabaseAccessor.getAppGroup(user.groupId)
    : null;
  if (user.groupId && appGroup) {
    appStore.dispatch({
      type: "TRANSITION_APP_STATE",
      newAppState: { view: "mainGroup", user, initialAppGroup: appGroup },
    });
  } else {
    appStore.dispatch({
      type: "TRANSITION_APP_STATE",
      newAppState: { view: "joinGroup", user },
    });
  }
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
          <JoinGroup appState={appStore.state} />
        </AppStoreContext.Provider>
      );
    case "mainGroup":
      return (
        <AppStoreContext.Provider value={appStore}>
          <MainGroup appState={appStore.state} />
        </AppStoreContext.Provider>
      );
    default:
      const _: never = appStore.state;
      throw new Error(`unknown state view`);
  }
};
