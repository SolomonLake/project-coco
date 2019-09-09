import React, { useContext } from "react";
import logo from "../../svgs/logo.svg";
import { AppStoreContext } from "../appStore";
import { useJoinGroupStore } from "./joinGroupStore";
import { joinGroupApi } from "./joinGroupApi";

export const JoinGroup = () => {
  const appStore = useContext(AppStoreContext);
  const joinGroupStore = useJoinGroupStore();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload...
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          onClick={() => {
            appStore.dispatch({ type: "CHANGE_VIEW", view: "main" });
          }}
        >
          Start
        </button>
        <button
          onClick={async () => {
            appStore.dispatch({ type: "CHANGE_VIEW", view: "loading" });
            await joinGroupApi.createGroup();
            appStore.dispatch({ type: "CHANGE_VIEW", view: "main" });
          }}
        >
          Create Group
        </button>
      </header>
    </div>
  );
};