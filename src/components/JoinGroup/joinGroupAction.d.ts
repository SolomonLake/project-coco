import { AppView } from "./joinGroupState";

export type JoinGroupAction = UpdateJoinId;

type UpdateJoinId = {
  type: "UPDATE_JOIN_ID";
};
