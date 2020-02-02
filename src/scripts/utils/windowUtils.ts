import { localStorageUtils } from "./localStorageUtils";
import queryString from "querystring";

export const windowUtils = {
  getUrlParam: (urlParamKey: string): string | null => {
    const urlParams = queryString.parse(window.location.search.slice(1));
    const parsedParam = urlParams ? urlParams[urlParamKey] : null;
    return parsedParam instanceof Array ? parsedParam[0] : parsedParam;
  },
  addUrlParam: (urlParamKey: string, urlParamValue: string) => {
    const urlParams = queryString.parse(window.location.search.slice(1));
    const newParams = { ...urlParams, [urlParamKey]: urlParamValue };
    return (
      window.location.origin +
      window.location.pathname +
      "?" +
      queryString.stringify(newParams)
    );
  },
  removeUrlParam: (urlParamKey: string): string => {
    const urlSearchParams = queryString.parse(window.location.search.slice(1));
    const { [urlParamKey]: val, ...paramsWithoutKey } = urlSearchParams;
    const newSearch =
      Object.keys(paramsWithoutKey).length > 0
        ? "?" + queryString.stringify(paramsWithoutKey)
        : "";
    return window.location.origin + window.location.pathname + newSearch;
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
