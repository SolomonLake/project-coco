import { JoinGroupAction } from "./joinGroupAction";
import { JoinGroupState } from "./joinGroupState";
import React, { Dispatch, useReducer } from "react";

export type JoinGroupStore = {
  state: JoinGroupState;
  dispatch: Dispatch<JoinGroupAction>;
};

const initialState: JoinGroupState = { view: "initial" };

function reducer(state: JoinGroupState, action: JoinGroupAction) {
  console.log("joinGroupStoreReducer previous state:", state);
  console.log("joinGroupStoreReducer", action);
  switch (action.type) {
    case "UPDATE_JOIN_ID": {
      return logState(state);
      break;
    }
    default: {
      const _: never = action.type;
      return state;
    }
  }
}
function logState(newState: JoinGroupState) {
  console.log("joinGroupStoreReducer computed state", newState);
  return newState;
}

// Container
export const JoinGroupStoreContext = React.createContext<JoinGroupStore>(
  null as any,
);

export function useJoinGroupStore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
