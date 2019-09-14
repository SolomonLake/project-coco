import React from "react";
import { Loading } from "./Loading/Loading";
import { AppStoreContext, useAppStore, AppStore } from "./appStore";
import { AppAction } from "./appActions";
import { JoinGroup } from "./JoinGroup/JoinGroup";
import { Main } from "./Main/Main";
import { zoomApi } from "../scripts/zoom/zoomApi";
import { zoomAuth } from "../scripts/zoom/zoomAuth";
import { login } from "../scripts/login/login";
import { initializeFirestore } from "../scripts/firestore/firestoreInitialize";
import { initializeAuthenticatedUser } from "../scripts/authenticatedUser/authenticatedUser";
import { usersDatabaseService } from "../scripts/databaseServices/usersDatabaseService";

async function initializeApp(appStore: AppStore) {
  zoomAuth.initialize();
  const userAndCustomToken = await login();
  await initializeFirestore(userAndCustomToken.customToken);
  const existingUser = await initializeAuthenticatedUser(
    userAndCustomToken.user,
  );
  if (existingUser.groupId) {
    appStore.dispatch({ type: "CHANGE_VIEW", view: "main" });
  } else {
    appStore.dispatch({ type: "CHANGE_VIEW", view: "joinGroup" });
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
