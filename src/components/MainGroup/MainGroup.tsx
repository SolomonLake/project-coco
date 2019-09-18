import React, { useContext } from "react";
import { AppStoreContext } from "../appStore";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, Divider } from "@material-ui/core";
import { MainGroupAppState } from "../appState";
import { databaseService } from "../../scripts/databaseServices/databaseService";
import { useMainGroupStore } from "./mainGroupStore";
import { startAppGroupObserver } from "../appGroupObserver";
import { gapiCalendar } from "../../scripts/gapi/gapiCalendar";
import { mainGroupActionCreator } from "./mainGroupActionCreator";
import { MainGroupHeader } from "./components/MainGroupHeader";
import { MainGroupFooter } from "./components/MainGroupFooter";

export const MainGroup = (props: { appState: MainGroupAppState }) => {
  const appStore = useContext(AppStoreContext);
  const mainGroupStore = useMainGroupStore(props.appState.initialAppGroup);
  React.useEffect(() => {
    const unsubscribe = startAppGroupObserver(
      mainGroupStore.state.appGroup.appGroupId,
      mainGroupStore.dispatch,
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item style={{ width: "100%" }}>
        <MainGroupHeader
          mainGroupStore={mainGroupStore}
          user={props.appState.user}
        />
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <Grid container direction="column" spacing={2} justify="center">
          <Grid item>
            <Typography>
              <b>Available</b>
            </Typography>
          </Grid>
          <Grid item>
            <Divider></Divider>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <MainGroupFooter
          appStore={appStore}
          mainGroupStore={mainGroupStore}
          user={props.appState.user}
        />
      </Grid>
    </Grid>
  );
};
