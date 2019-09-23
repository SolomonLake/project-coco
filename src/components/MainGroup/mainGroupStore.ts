import { MainGroupAction } from "./mainGroupAction";
import React, { Dispatch, useReducer } from "react";
import {
  AppGroupEntry,
  VideoMeeting,
  CalendarMeeting,
} from "./../../../sharedTypes/appGroupEntry.d";

export type MainGroupState = {
  appGroup: AppGroupEntry;
  lastCheckForMeetingUIUpdate: number;
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
    case "CHECK_FOR_MEETINGS_UI_UPDATE":
      return logState({
        ...state,
        lastCheckForMeetingUIUpdate: Date.now(),
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
    lastCheckForMeetingUIUpdate: 0,
  });
  return { state, dispatch };
}
