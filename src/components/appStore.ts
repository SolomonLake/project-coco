import { AppAction } from "./appActions";
import { AppState } from "./appState";
import React, { Dispatch, useReducer } from "react";
import { notification } from "../scripts/notification/notification";

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
      return logState(action.newAppState, state);
    }
    case "UPDATE_USER": {
      switch (state.view) {
        case "joinGroup":
        case "mainGroup":
          return logState(
            {
              ...state,
              user: action.newUser,
            },
            state,
          );
        case "initial":
        case "loading":
          return state;
        default:
          const _: never = state;
          return state;
      }
    }
    default: {
      const _: never = action;
      return state;
    }
  }
}
function logState(newState: AppState, oldState: AppState) {
  console.log("appStoreReducer computed state", newState);
  runEffects(newState, oldState);
  return newState;
}

// Container
export const AppStoreContext = React.createContext<AppStore>(null as any);

export function useAppStore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}

function runEffects(newState: AppState, oldState: AppState) {
  switch (newState.view) {
    case "joinGroup":
    case "mainGroup":
      notification.notificationsRecieved(
        newState.user.notificationQueue,
        newState.user.userId,
      );
      break;
    case "initial":
    case "loading":
      break;
    default:
      const _: never = newState;
  }
}
