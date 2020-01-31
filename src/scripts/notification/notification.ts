import { usersDatabaseAccessor } from "../databaseServices/usersDatabaseAccessor";
import {
  UserEntry,
  UserNotification,
  UserNotificationSet,
} from "../../../sharedTypes/userEntry";
import { uuidv4 } from "../utils/generateUtils";

export const notification = {
  notificationsRecieved: (
    notificationSet: UserNotificationSet,
    userId: string,
  ) => {
    const notificationArray = Object.values(notificationSet);
    if (notificationArray.length > 0) {
      notificationArray.map((notification: UserNotification) => {
        switch (notification.type) {
          case "openMeeting":
            window.open(notification.meetingUrl, "_blank");
            break;
          default:
            console.log("unknown notification.type: ", notification.type);
            const unreachable: never = notification.type;
        }
      });
      usersDatabaseAccessor.clearNotifications(userId, notificationArray);
    }
  },
  sendOpenMeetingNotification: (
    userId: string,
    fromUserId: string,
    meetingUrl: string,
  ) => {
    return usersDatabaseAccessor.pushNotification(userId, {
      type: "openMeeting",
      meetingUrl,
      from: "user",
      fromId: fromUserId,
      timestamp: Date.now(),
      notificationId: uuidv4(),
    });
  },
};
