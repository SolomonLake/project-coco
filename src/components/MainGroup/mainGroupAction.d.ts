import { AppGroupEntry } from "./../../../sharedTypes/appGroupEntry.d";

export type MainGroupAction = UpdateAppGroup | UpdateLatestQuarterHour;

type UpdateAppGroup = {
  type: "UPDATE_APP_GROUP";
  newAppGroup: AppGroupEntry;
};

type UpdateLatestQuarterHour = {
  type: "UPDATE_LATEST_QUARTER_HOUR";
  latestQuarterHour: number;
};
