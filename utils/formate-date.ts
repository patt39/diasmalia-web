import dayjs from 'dayjs';
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

export const formatMMDate = (month: number, locale: string) => {
  const todaysDate = new Date();
  const currentYear = todaysDate.getFullYear();
  return DateTime.fromJSDate(
    new Date(`${Number(currentYear)}-${Number(month)}-01`),
  )
    .setLocale(locale)
    .toLocaleString({ month: 'long' });
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
export const getMonthNow = (date: Date) => {
  return dayjs(date).format('MM') as unknown as Date;
};
export const formatDDMMYYDate = (date: Date) =>
  DateTime.fromISO(String(date)).toFormat('dd/MM/yyyy h:mm:ss a');

export const formatDateDDMMYY = (date: Date) =>
  DateTime.fromISO(String(date)).toFormat('dd-MM-yyyy');

export const dateTimeNowUtc = () => DateTime.utc().toJSDate();

export const formatDateDifference = (date: Date) => {
  const birthDate = DateTime.fromISO(String(date).split('T')[0]);
  const now = DateTime.now();
  const days = Math.floor(now.diff(birthDate, 'days').days);
  const years = Math.floor(now.diff(birthDate, 'years').years);
  const months = Math.floor(now.diff(birthDate, 'months').months);

  //const age = years >= 1 ? `${years} years` : `${months} mths`;
  let age = '';
  if (years > 1) {
    age = `${years} ans`;
  }
  if (months == 1 && years < 1) {
    age = `${months} mois`;
  }
  if (months > 1 && years < 1) {
    age = `${months}mois`;
  }
  if (days < 32 && months < 1 && years < 1) {
    age = `${days} jours`;
  }

  return age;
};

export const formatWeight = (weight: number) => {
  if (weight < 1000) {
    return `${weight}g`;
  }
  if (weight >= 1000) {
    return `${(weight / 1000).toFixed(1)}kg`;
  }
};

export const formateNowDateUnixInteger = (date: Date) => {
  return DateTime.fromJSDate(date).toUnixInteger() as unknown as number;
};
