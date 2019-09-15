import { MainGroupAction } from "./MainGroup/mainGroupAction.d";
import {
  AppGroupEntry,
  appGroupsDatabaseAccessor,
} from "./../scripts/databaseServices/appGroupsDatabaseAccessor";
import { Dispatch } from "react";

export function startAppGroupObserver(
  appGroupdId: string,
  dispatch: Dispatch<MainGroupAction>,
) {
  const unsubscribe = appGroupsDatabaseAccessor.watchAppGroup(
    appGroupdId,
    (appGroup: AppGroupEntry) => {
      dispatch({
        type: "UPDATE_APP_GROUP",
        newAppGroup: appGroup,
      });
    },
  );
  return unsubscribe;
}
