import { appGroupsDatabaseService } from "../../scripts/databaseServices/appGroupsDatabaseService";
import { authenticatedUser } from "../../scripts/authenticatedUser/authenticatedUser";
import { usersDatabaseService } from "../../scripts/databaseServices/usersDatabaseService";

export const joinGroupApi = {
  createGroup: async () => {
    const user = authenticatedUser();
    const newGroup = await appGroupsDatabaseService.createNewAppGroup(user);
    await usersDatabaseService.updateGroup(user.userId, newGroup.appGroupId);
  },
};
