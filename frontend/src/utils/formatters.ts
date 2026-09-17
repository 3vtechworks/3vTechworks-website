import dayjs from 'dayjs';

export const formatDate = (dateString?: string | Date, format = 'MMM DD, YYYY'): string => {
  if (!dateString) return '-';
  return dayjs(dateString).format(format);
};

export const formatDateTime = (dateString?: string | Date): string => {
  if (!dateString) return '-';
  return dayjs(dateString).format('MMM DD, YYYY HH:mm');
};

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
