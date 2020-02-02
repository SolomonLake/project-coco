// SRC: https://github.com/sindresorhus/copy-text-to-clipboard/blob/master/index.js
// MIT license

export const copyUtils = {
  copyToClipboard: (text: string) => {
    const el = document.createElement("textarea") as any;

    el.value = text;

    // Prevent keyboard from showing on mobile
    el.setAttribute("readonly", "");

    el.style.contain = "strict";
    el.style.position = "absolute";
    el.style.left = "-9999px";
    el.style.fontSize = "12pt"; // Prevent zooming on iOS

    const selection = document.getSelection();
    let originalRange = null;
    if (selection && selection.rangeCount > 0) {
      originalRange = selection.getRangeAt(0);
    }

    /* $FlowSupressErrorBecauseOfRequireAbuse */
    document.body.appendChild(el);
    el.select();

    // Explicit selection workaround for iOS
    el.selectionStart = 0;
    el.selectionEnd = text.length;

    let success = false;
    try {
      success = document.execCommand("copy");
    } catch (err) {}

    /* $FlowSupressErrorBecauseOfRequireAbuse */
    document.body.removeChild(el);

    if (selection && originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }

    return success;
  },
};
