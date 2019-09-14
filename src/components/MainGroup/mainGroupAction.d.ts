import { AppGroupEntry } from "./../../scripts/databaseServices/appGroupsDatabaseAccessor";

export type MainGroupAction = UpdateAppGroup;

type UpdateAppGroup = {
  type: "UPDATE_APP_GROUP";
  newAppGroup: AppGroupEntry;
};
