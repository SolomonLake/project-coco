import React from "react";
import { Avatar } from "@material-ui/core";
import { AppGroupUser } from "../../../../sharedTypes/appGroupEntry";
import { themePalette, themePaletteBackground } from "../../../theme";
import { MainGroupSection } from "../mainGroupTypes";

export const UserAvatar = (props: {
  user: AppGroupUser;
  section: MainGroupSection;
  darkTheme: boolean;
}) => {
  const userStatusIsAvailable = props.user.doNotDisturbUntil < Date.now();
  return (
    <div>
      <Avatar alt={props.user.displayName} src={props.user.avatarUrl} />
      {props.section !== "offline" && (
        <span>
          <div
            style={{
              height: "10px",
              width: "10px",
              backgroundColor: props.darkTheme
                ? themePaletteBackground.dark
                : themePaletteBackground.light,
              borderRadius: "50%",
              position: "absolute",
              transform: "translate(1.9em, -0.6em)",
            }}
          />
          <div
            style={{
              height: "7px",
              width: "7px",
              backgroundColor: userStatusIsAvailable
                ? themePalette.secondary.main
                : themePalette.error.main,
              borderRadius: "50%",
              position: "absolute",
              transform: "translate(2.01em, -0.49em)",
            }}
          />
        </span>
      )}
    </div>
  );
};
