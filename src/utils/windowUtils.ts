export function getUrlParam(urlParamKey: string): string | null {
  const regExp = new RegExp(urlParamKey + "=(.*?)($|&)", "g");
  const decodedWindowLocation = decodeURIComponent(window.location.search);
  const matchArray = decodedWindowLocation.match(regExp);
  if (matchArray && matchArray.length) {
    const firstMatch = matchArray[0];
    return firstMatch.replace(urlParamKey + "=", "").replace("&", "");
  } else {
    return null;
  }
}
