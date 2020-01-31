import { firestoreApiFactory } from "../firestore/firestoreApi";
import { ZoomUser } from "../../../sharedTypes/zoomTypes";
import {
  UserEntry,
  UserNotification,
  UserNotificationSet,
} from "../../../sharedTypes/userEntry";
import firebase from "firebase";

const usersDatabaseApi = firestoreApiFactory<UserEntry>("users");

export const usersDatabaseAccessor = {
  watchUser: (userId: string, callback: (appGroup: UserEntry) => void) => {
    return usersDatabaseApi.watch(userId, callback);
  },
  getUser: async (userId: string): Promise<UserEntry | null> => {
    return await usersDatabaseApi.get(userId);
  },
  createUser: async (user: UserEntry) => {
    return await usersDatabaseApi.set(user.userId, user);
  },
  findOrCreateUser: async (user: ZoomUser): Promise<UserEntry> => {
    const existingUser = await usersDatabaseAccessor.getUser(user.id);
    if (existingUser) {
      const userEntry = {
        ...existingUser,
        displayName: user.first_name + " " + user.last_name,
        personalMeetingUrl: user.personal_meeting_url,
        avatarUrl: user.pic_url,
      };
      await usersDatabaseApi.update(userEntry.userId, userEntry);
      return userEntry;
    } else {
      const userEntry = {
        userId: user.id,
        groupId: null,
        displayName: user.first_name + " " + user.last_name,
        personalMeetingUrl: user.personal_meeting_url,
        avatarUrl: user.pic_url,
        notificationQueue: {},
      };
      await usersDatabaseApi.set(userEntry.userId, userEntry);
      return userEntry;
    }
  },
  updateGroup: async (userId: string, groupId: string | null) => {
    await usersDatabaseApi.update(userId, { groupId });
  },
  pushNotification: async (userId: string, notification: UserNotification) => {
    const pushNotificationAccessor = {
      [`notificationQueue.${notification.notificationId}`]: notification,
    };
    await usersDatabaseApi.update(userId, pushNotificationAccessor);
  },
  clearNotifications: async (
    userId: string,
    notificationArray: Array<UserNotification>,
  ) => {
    const notificationClearBatch = usersDatabaseApi.batch();
    notificationArray.map(notification => {
      const userRef = usersDatabaseApi.docRef(userId);
      notificationClearBatch.update(userRef, {
        [`notificationQueue.${notification.notificationId}`]: firebase.firestore.FieldValue.delete(),
      });
    });
    await notificationClearBatch.commit();
  },
};
