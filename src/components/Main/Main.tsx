import React, { useContext } from "react";
import { AppStoreContext } from "../appStore";
import Typography from "@material-ui/core/Typography";

export const Main = () => {
  const appStore = useContext(AppStoreContext);
  return <Typography>Main</Typography>;
};
