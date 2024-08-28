import { DateTime } from 'luxon';

export const formateDate = (date: Date, locale: string) => {
  const todaysDate = new Date();
  const dateInit = DateTime.fromISO(String(date));
  const currentYear = todaysDate.getFullYear();
  const dateYear = Number(dateInit.toFormat('yyyy'));
  return currentYear === dateYear
    ? dateInit.setLocale(locale).toFormat('dd LLL yyyy')
    : dateInit.setLocale(locale).toFormat('D');
};

export const formateFromNow = (date: Date, locale: string) => {
  const todaysDate = new Date();
  const dateInit = DateTime.fromISO(String(date));
  const currentYear = todaysDate.getFullYear();
  const dateYear = Number(dateInit.toFormat('yyyy'));
  return currentYear === dateYear
    ? dateInit.setLocale(locale).toRelative()
    : dateInit.setLocale(locale).toFormat('D');
};

export const formatDDMMYYDate = (date: Date) =>
  DateTime.fromISO(String(date)).toFormat('dd/MM/yyyy h:mm:ss a');

export const formatDateDDMMYY = (date: Date) =>
  DateTime.fromISO(String(date)).toFormat('dd-MM-yyyy');

export const formatDateDifference = (date: Date) => {
  const birthDate = DateTime.fromISO(String(date).split('T')[0]);
  const now = DateTime.now();
  const days = Math.floor(now.diff(birthDate, 'days').days);
  const years = Math.floor(now.diff(birthDate, 'years').years);
  const months = Math.floor(now.diff(birthDate, 'months').months);

  //const age = years >= 1 ? `${years} years` : `${months} mths`;
  let age = '';
  if (years > 1) {
    age = `${years} years`;
  }
  if (months >= 1 && years < 1) {
    age = `${months} months`;
  }
  if (days < 32 && months < 1 && years < 1) {
    age = `${days} days`;
  }

  return age;
};

export const formateNowDateUnixInteger = (date: Date) => {
  return DateTime.fromJSDate(date).toUnixInteger() as unknown as number;
};
