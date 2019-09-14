import { appGroupsDatabaseService } from "../../scripts/databaseServices/appGroupsDatabaseService";
import { authenticatedUser } from "../../scripts/authenticatedUser/authenticatedUser";

export const joinGroupApi = {
  createGroup: async () => {
    await appGroupsDatabaseService.createNewAppGroup(authenticatedUser());
  },
};
