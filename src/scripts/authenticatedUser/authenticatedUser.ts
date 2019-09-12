import { ZoomUser } from "../../shared/types/zoomTypes";

export function authenticatedUser() {
  if (_authenticatedUser) {
    return _authenticatedUser;
  } else {
    throw new Error("authenticated user not initialized");
  }
}

export function initializeAuthenticatedUser(user: ZoomUser) {
  _authenticatedUser = user;
}

let _authenticatedUser: null | ZoomUser = null;
