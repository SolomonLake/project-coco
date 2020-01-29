export const dateUtils = {
  dateToLocalTimeStringHMMeridiem: (date: Date): string => {
    return (
      date.toLocaleTimeString().slice(0, -6) +
      date.toLocaleTimeString().slice(-2)
    );
  },
};
