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
  let computedState;
  switch (action.type) {
    case "CHANGE_VIEW": {
      computedState = { ...state, view: action.view };
      break;
    }
    default: {
      const _: never = action.type;
      return state;
    }
  }
  console.log("appStoreReducer computed state", computedState);
  return computedState;
}

// Container
export const AppStoreContext = React.createContext<AppStore>(null as any);

export function useAppStore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
