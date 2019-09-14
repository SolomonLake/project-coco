import { AppAction } from "./appActions";
import { AppState } from "./appState";
import React, { Dispatch, useReducer } from "react";

export type AppStore = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

const initialState: AppState = { view: "initial" };

function reducer(state: AppState, action: AppAction) {
  console.log("appStoreReducer previous state:", state);
  console.log("appStoreReducer", action);
  switch (action.type) {
    case "TRANSITION_APP_STATE": {
      return logState(action.newAppState);
    }
    default: {
      const _: never = action.type;
      return state;
    }
  }
}
function logState(newState: AppState) {
  console.log("appStoreReducer computed state", newState);
  return newState;
}

// Container
export const AppStoreContext = React.createContext<AppStore>(null as any);

export function useAppStore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
