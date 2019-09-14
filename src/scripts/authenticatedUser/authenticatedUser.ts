import { ZoomUser } from "../../shared/types/zoomTypes";
import {
  UserEntry,
  usersDatabaseService,
} from "../databaseServices/usersDatabaseService";

export function authenticatedUser() {
  if (_authenticatedUser) {
    return _authenticatedUser;
  } else {
    throw new Error("authenticated user not initialized");
  }
}

export async function initializeAuthenticatedUser(user: ZoomUser) {
  const userEntry = await usersDatabaseService.findOrCreateUser(user);
  _authenticatedUser = userEntry;
  return userEntry;
}

let _authenticatedUser: null | UserEntry = null;
