// https://www.w3schools.com/js/js_cookies.asp

export const cookieUtils = {
  setCookie: (cookieName: string, cookieValue: any, expiresInDays: number) => {
    const stringifiedCookieValue = JSON.stringify(cookieValue);
    const d = new Date();
    d.setTime(d.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie =
      cookieName + "=" + stringifiedCookieValue + ";" + expires + ";path=/";
  },
  getCookie(cookieName: string) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) == " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  },
  checkCookie: (cookieName: string) => {
    const username = cookieUtils.getCookie(cookieName);
    if (username != "") {
      return true;
    } else {
      return false;
    }
  },
};
