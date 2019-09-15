import { AppGroupEntry } from "./../../../sharedTypes/appGroupEntry.d";

export type MainGroupAction = UpdateAppGroup;

type UpdateAppGroup = {
  type: "UPDATE_APP_GROUP";
  newAppGroup: AppGroupEntry;
};
