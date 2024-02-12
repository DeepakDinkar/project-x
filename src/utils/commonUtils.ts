export const isDatePassed30Days = (date: string) => {
  const courseDate = new Date(date);

  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - courseDate.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);

  return daysDiff < 30;
};
