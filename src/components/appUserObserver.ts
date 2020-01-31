import { AppGroupEntry } from "./../../sharedTypes/appGroupEntry.d";
import { AppAction } from "./appActions";
import { usersDatabaseAccessor } from "./../scripts/databaseServices/usersDatabaseAccessor";
import { Dispatch } from "react";
import { UserEntry } from "../../sharedTypes/userEntry";

export function startUserObserver(
  userId: string,
  dispatch: Dispatch<AppAction>,
) {
  const unsubscribe = usersDatabaseAccessor.watchUser(
    userId,
    (user: UserEntry) => {
      dispatch({
        type: "UPDATE_USER",
        newUser: user,
      });
    },
  );
  return unsubscribe;
}
