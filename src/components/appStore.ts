import { AppStoreAction } from "./appActions";
import { AppStoreState } from "./appState";
import React, { Dispatch, useReducer } from "react";

export type AppStore = {
  state: AppStoreState;
  dispatch: Dispatch<AppStoreAction>;
};

const initialState: AppStoreState = { view: "initial" };

function reducer(state: AppStoreState, action: AppStoreAction) {
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
