import React, { useContext } from "react";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import { MainGroupStore } from "../mainGroupStore";
import { mainGroupActionCreator } from "../mainGroupActionCreator";
import { UserEntry } from "../../../../sharedTypes/userEntry";
import { AppStore } from "../../appStore";
import { databaseService } from "../../../scripts/databaseServices/databaseService";

export const MainGroupFooter = (props: {
  appStore: AppStore;
  mainGroupStore: MainGroupStore;
  user: UserEntry;
}) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={async () => {
        props.appStore.dispatch({
          type: "TRANSITION_APP_STATE",
          newAppState: { view: "loading" },
        });
        await databaseService.userLeaveGroup(
          props.user,
          props.mainGroupStore.state.appGroup,
        );
        props.appStore.dispatch({
          type: "TRANSITION_APP_STATE",
          newAppState: {
            view: "joinGroup",
            user: { ...props.user, groupId: null },
          },
        });
      }}
    >
      Leave Group
    </Button>
  );
};
