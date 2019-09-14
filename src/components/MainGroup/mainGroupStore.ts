import { AppGroupEntry } from "./../../scripts/databaseServices/appGroupsDatabaseAccessor";
import { MainGroupAction } from "./mainGroupAction";
import { MainGroupState } from "./mainGroupState";
import React, { Dispatch, useReducer } from "react";

export type MainGroupStore = {
  state: MainGroupState;
  dispatch: Dispatch<MainGroupAction>;
};

function reducer(state: MainGroupState, action: MainGroupAction) {
  console.log("mainGroupStoreReducer previous state:", state);
  console.log("mainGroupStoreReducer", action);
  switch (action.type) {
    case "UPDATE_APP_GROUP": {
      return logState({
        ...state,
        appGroup: action.newAppGroup,
      });
      break;
    }
    default: {
      const _: never = action.type;
      return state;
    }
  }
}
function logState(newState: MainGroupState) {
  console.log("mainGroupStoreReducer computed state", newState);
  return newState;
}

// Container
export const MainGroupStoreContext = React.createContext<MainGroupStore>(
  null as any,
);

export function useMainGroupStore(appGroup: AppGroupEntry) {
  const [state, dispatch] = useReducer(reducer, { appGroup });
  return { state, dispatch };
}
