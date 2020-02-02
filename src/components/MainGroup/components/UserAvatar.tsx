import React from "react";
import { Avatar } from "@material-ui/core";
import { AppGroupUser } from "../../../../sharedTypes/appGroupEntry";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import theme from "../../../theme";

export const UserAvatar = (props: { user: AppGroupUser }) => {
  const userStatusIsAvailable = props.user.doNotDisturbUntil < Date.now();
  return (
    <div>
      <Avatar alt={props.user.displayName} src={props.user.avatarUrl} />
      <FiberManualRecordIcon
        style={{
          position: "absolute",
          transform: "translate(1.2em, -.7em)",
          fontSize: "1.1rem",
          color: theme.palette.background.default,
        }}
      />
      <FiberManualRecordIcon
        color={userStatusIsAvailable ? "secondary" : "error"}
        style={{
          position: "absolute",
          transform: "translate(1.61em, -0.7em)",
          fontSize: ".9rem",
        }}
      />
    </div>
  );
};
