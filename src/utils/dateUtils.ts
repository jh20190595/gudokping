import { differenceInDays, parseISO, startOfDay } from 'date-fns';

export const calculateDday = (targetDateStr: string) => {
  if (!targetDateStr) return -999; 

  const today = new Date();
  const targetDate = parseISO(targetDateStr);

  const diff = differenceInDays(
    startOfDay(targetDate), 
    startOfDay(today)
  );

  return diff;
};