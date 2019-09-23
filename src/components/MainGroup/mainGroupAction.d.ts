import { AppGroupEntry } from "./../../../sharedTypes/appGroupEntry.d";

export type MainGroupAction = UpdateAppGroup | CheckForMeetingsUIUpdate;

type UpdateAppGroup = {
  type: "UPDATE_APP_GROUP";
  newAppGroup: AppGroupEntry;
};

type CheckForMeetingsUIUpdate = {
  type: "CHECK_FOR_MEETINGS_UI_UPDATE";
};
