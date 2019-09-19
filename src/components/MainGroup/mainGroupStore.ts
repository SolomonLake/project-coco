import { MainGroupAction } from "./mainGroupAction";
import React, { Dispatch, useReducer } from "react";
import { AppGroupEntry } from "./../../../sharedTypes/appGroupEntry.d";

export type MainGroupState = {
  appGroup: AppGroupEntry;
  latestQuarterHour: number;
};

export type MainGroupStore = {
  state: MainGroupState;
  dispatch: Dispatch<MainGroupAction>;
};

function reducer(state: MainGroupState, action: MainGroupAction) {
  console.log("mainGroupStoreReducer previous state:", state);
  console.log("mainGroupStoreReducer", action);
  switch (action.type) {
    case "UPDATE_APP_GROUP":
      return logState({
        ...state,
        appGroup: action.newAppGroup,
      });
    case "UPDATE_LATEST_QUARTER_HOUR":
      return logState({
        ...state,
        latestQuarterHour: action.latestQuarterHour,
      });
    default: {
      const _: never = action;
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
  const [state, dispatch] = useReducer(reducer, {
    appGroup,
    latestQuarterHour: 0,
  });
  return { state, dispatch };
}
