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
import { windowUtils } from "../scripts/utils/windowUtils";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { databaseService } from "../scripts/databaseServices/databaseService";

async function initializeApp(appStore: AppStore) {
  const userAndCustomToken = await login();
  setConfig(userAndCustomToken.config);
  await initializeFirestore(userAndCustomToken.customToken);
  const user = await usersDatabaseAccessor.findOrCreateUser(
    userAndCustomToken.user,
  );
  const windowJoinId = windowUtils.getUrlParam("joinId");
  const appGroup = user.groupId
    ? await appGroupsDatabaseAccessor.getAppGroup(user.groupId)
    : windowJoinId
    ? await databaseService.userTryJoinGroup(user, windowJoinId)
    : null;
  startUserObserver(user.userId, appStore.dispatch);
  if (appGroup) {
    appGroupsDatabaseAccessor.updateUser(user, appGroup.appGroupId);
    const newestUserVersion = await usersDatabaseAccessor.findOrCreateUser(
      userAndCustomToken.user,
    );
    appStore.dispatch({
      type: "TRANSITION_APP_STATE",
      newAppState: {
        view: "mainGroup",
        user: newestUserVersion,
        initialAppGroup: appGroup,
        popupsBlocked: windowUtils.testPopupsBlocked(),
      },
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
      <BrowserRouter>
        <div>
          <Route path="/" component={AppContent} />
        </div>
      </BrowserRouter>
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
