import { format, isToday, isTomorrow } from 'date-fns';

export const _renderDateLabel = (date: string) => {
  return isToday(new Date(date))
    ? 'Today'
    : isTomorrow(new Date(date))
    ? 'Tomorrow'
    : format(new Date(date), 'E');
};
