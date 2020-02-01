import { localStorageUtils } from "./localStorageUtils";

export const windowUtils = {
  getUrlParam: (urlParamKey: string): string | null => {
    const regExp = new RegExp(urlParamKey + "=(.*?)($|&)", "g");
    const decodedWindowLocation = decodeURIComponent(window.location.search);
    const matchArray = decodedWindowLocation.match(regExp);
    if (matchArray && matchArray.length) {
      const firstMatch = matchArray[0];
      return firstMatch.replace(urlParamKey + "=", "").replace("&", "");
    } else {
      return null;
    }
  },
  testPopupsBlocked: (): boolean => {
    const popupsArentBlocked = localStorageUtils.getItem("popupsArentBlocked");
    if (popupsArentBlocked) {
      return false;
    } else {
      const newWindow = window.open("", "_blank");
      try {
        if (newWindow) {
          newWindow.close();
          localStorageUtils.setItem("popupsArentBlocked", true);
          return false;
        } else {
          return true;
        }
      } catch (e) {
        return true;
      }
    }
  },
};
