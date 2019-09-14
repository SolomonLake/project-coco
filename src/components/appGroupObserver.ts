import {
  AppGroupEntry,
  appGroupsDatabaseAccessor,
} from "./../scripts/databaseServices/appGroupsDatabaseAccessor";
import { Dispatch } from "react";

export function startAppGroupObserver(
  appGroupdId: string,
  dispatch: Dispatch<MainGroupAction>,
) {
  appGroupsDatabaseAccessor.watchAppGroup(
    appGroupdId,
    (appGroup: AppGroupEntry) => {
      // do shit on changes
    },
  );
}
