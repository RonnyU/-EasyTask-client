import { format, parseISO, addDays } from 'date-fns';

export const formatWithNameToGTM = (date: string) => {
  const dateParse = addDays(parseISO(date), 1);

  return format(dateParse, 'EEEE,MMMM do, yyyy');
};

export const formatToGTM = (date: string) => {
  const dateParse = addDays(parseISO(date), 1);

  return format(dateParse, 'yyyy-MM-dd');
};
