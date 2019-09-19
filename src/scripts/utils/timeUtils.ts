import { ONE_MINUTE } from "../constants/timesInMilliseconds";

type ClearQuarterHourInterval = () => void;

export const timeUtils = {
  setQuarterHourInterval: (callback: () => void): ClearQuarterHourInterval => {
    const currentDate = new Date();
    const currentMinutes = currentDate.getMinutes();
    const currentMinutesPlus15 = currentMinutes + 15;
    const nextQuarterMinute =
      currentMinutesPlus15 - (currentMinutesPlus15 % 15);
    const nextSeconds = 1;
    var nextDate = new Date();
    nextDate.setMinutes(nextQuarterMinute);
    nextDate.setSeconds(nextSeconds);
    const difference = nextDate.getTime() - Date.now();

    let quarterHourInterval: NodeJS.Timeout | null = null;

    const initialTimeout = setTimeout(() => {
      callback();
      quarterHourInterval = setInterval(() => {
        callback();
      }, 15 * ONE_MINUTE);
    }, difference);

    return () => {
      clearTimeout(initialTimeout);
      if (quarterHourInterval) {
        clearInterval(quarterHourInterval);
      }
    };
  },
};
