export type UserEntry = {
  userId: string;
  groupId: string | null;
  displayName: string;
  personalMeetingUrl: string;
  avatarUrl: string;
  notificationQueue: UserNotificationSet;
};

export type UserNotificationSet = { [id: string]: UserNotification };

export type UserNotification = OpenMeeting_UserNotification;

type UserNotificationBase = {
  from: "user" | "pearcoco_internal";
  fromId: string;
  timestamp: number;
  notificationId: string;
};

export type OpenMeeting_UserNotification = UserNotificationBase & {
  type: "openMeeting";
  meetingUrl: string;
};
