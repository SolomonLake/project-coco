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
import { UserEntry } from "../../sharedTypes/userEntry";
import { DarkThemeState } from "../index";

async function initializeApp(appStore: AppStore) {
  const userAndCustomToken = await login();
  setConfig(userAndCustomToken.config);
  await initializeFirestore(userAndCustomToken.customToken);
  const user = await usersDatabaseAccessor.findOrCreateUser(
    userAndCustomToken.user,
  );

  const appGroup = user.groupId
    ? await appGroupsDatabaseAccessor.getAppGroup(user.groupId)
    : await checkForJoinGroupLink(user);
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

export const App = (props: { darkThemeState: DarkThemeState }) => {
  return (
    <Container maxWidth="xs" style={{ marginTop: "2em" }}>
      <BrowserRouter>
        <div>
          <Route
            path="/"
            render={() => <AppContent darkThemeState={props.darkThemeState} />}
          />
        </div>
      </BrowserRouter>
    </Container>
  );
};

export const AppContent = (props: { darkThemeState: DarkThemeState }) => {
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
          <MainGroup
            appState={appStore.state}
            darkThemeState={props.darkThemeState}
          />
        </AppStoreContext.Provider>
      );
    default:
      const _: never = appStore.state;
      throw new Error(`unknown state view`);
  }
};

async function checkForJoinGroupLink(user: UserEntry) {
  const windowJoinId = windowUtils.getUrlParam("joinId");
  if (windowJoinId) {
    const appGroup = await databaseService.userTryJoinGroup(user, windowJoinId);
    window.history.pushState(
      {},
      document.title,
      windowUtils.removeUrlParam("joinId"),
    );
    return appGroup;
  } else {
    return null;
  }
}
