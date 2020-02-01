import React from "react";
import { Loading } from "./Loading/Loading";
import { AppStoreContext, useAppStore, AppStore } from "./appStore";
import { AppAction } from "./appActions";
import { JoinGroup } from "./JoinGroup/JoinGroup";
import { MainGroup } from "./MainGroup/MainGroup";
import { zoomApi } from "../scripts/zoom/zoomApi";
import { login } from "../scripts/login/login";
import { initializeFirestore } from "../scripts/firestore/firestoreInitialize";
import { usersDatabaseAccessor } from "../scripts/databaseServices/usersDatabaseAccessor";
import { appGroupsDatabaseAccessor } from "../scripts/databaseServices/appGroupsDatabaseAccessor";
import { setConfig } from "../scripts/config/config";
import { Grid, Container } from "@material-ui/core";
import { startUserObserver } from "./appUserObserver";

async function initializeApp(appStore: AppStore) {
  const userAndCustomToken = await login();
  setConfig(userAndCustomToken.config);
  await initializeFirestore(userAndCustomToken.customToken);
  const user = await usersDatabaseAccessor.findOrCreateUser(
    userAndCustomToken.user,
  );
  const appGroup = user.groupId
    ? await appGroupsDatabaseAccessor.getAppGroup(user.groupId)
    : null;
  startUserObserver(user.userId, appStore.dispatch);
  if (user.groupId && appGroup) {
    const newWindow = window.open("", "_blank");
    try {
      if (newWindow) {
        newWindow.close();
        debugger;
      } else {
        debugger;
      }
    } catch (e) {
      debugger;
    }
    appGroupsDatabaseAccessor.updateUser(user, appGroup.appGroupId);
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
  return (
    <Container maxWidth="xs" style={{ marginTop: "2em" }}>
      <AppContent />
    </Container>
  );
};

export const AppContent: React.FC = () => {
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
