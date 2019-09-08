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
  let computedState;
  switch (action.type) {
    case "CREATE_GROUP": {
      computedState = state;
      break;
    }
    default: {
      const _: never = action.type;
      return state;
    }
  }
  console.log("joinGroupStoreReducer computed state", computedState);
  return computedState;
}

// Container
export const JoinGroupStoreContext = React.createContext<JoinGroupStore>(
  null as any,
);

export function useJoinGroupStore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
