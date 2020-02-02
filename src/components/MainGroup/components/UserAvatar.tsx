import React from "react";
import { Avatar } from "@material-ui/core";
import { AppGroupUser } from "../../../../sharedTypes/appGroupEntry";
import theme from "../../../theme";
import { MainGroupSection } from "../mainGroupTypes";

export const UserAvatar = (props: {
  user: AppGroupUser;
  section: MainGroupSection;
}) => {
  const userStatusIsAvailable = props.user.doNotDisturbUntil < Date.now();
  return (
    <div>
      <Avatar alt={props.user.displayName} src={props.user.avatarUrl} />
      {props.section !== "offline" && (
        <span>
          <span
            style={{
              height: ".7em",
              width: ".7em",
              backgroundColor: theme.palette.background.default,
              borderRadius: "50%",
              position: "absolute",
              transform: "translate(1.9em, -0.6em)",
            }}
          />
          <span
            style={{
              height: ".5em",
              width: ".5em",
              backgroundColor: userStatusIsAvailable
                ? theme.palette.secondary.main
                : theme.palette.error.main,
              borderRadius: "50%",
              position: "absolute",
              transform: "translate(2em, -0.5em)",
            }}
          />
        </span>
      )}
    </div>
  );
};
