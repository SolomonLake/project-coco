export const dateUtils = {
  dateToLocalTimeStringHMMeridiem: (date: Date): string => {
    return (
      date.toLocaleTimeString().slice(0, -6) +
      date.toLocaleTimeString().slice(-2)
    );
  },
  timeHoursAndMinutes: (timeInMS: number): string => {
    const minutes = Math.floor(timeInMS / 60000);
    const minutesRemainder = minutes % 60;
    const hours = Math.floor(minutes / 60);
    const hoursString = hours > 0 ? `${hours}:` : "";
    return hoursString + minutesRemainder;
  },
};
