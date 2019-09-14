//from http://stackoverflow.com/a/1349426/439317
export function generateRandomString(n: number, possible: string) {
  var text = "";
  for (var i = 0; i < n; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
export function generateRandomAlphaNumericString(n: number) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return generateRandomString(n, possible);
}
export function generateRandomUrlCode(n: number) {
  const possible = "abcdefghijklmnopqrstuvwxyz";
  return generateRandomString(n, possible);
}
export function generateRandomLetterNumericCode(n: number) {
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  return generateRandomString(n, possible);
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript?page=1&tab=votes#tab-top
export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
