import React, { useContext } from "react";
import { AppStoreContext } from "../appStore";

export const Main = () => {
  const appStore = useContext(AppStoreContext);
  return <div>Main</div>;
};
