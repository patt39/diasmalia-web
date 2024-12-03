import { UploadFile } from 'antd';
import { v4 as uuidv4 } from 'uuid';

export interface KeyAsString {
  [key: string]: string;
}

export interface KeyAsStringNumber {
  [key: string]: number;
}

export const generateUUID = () => {
  return uuidv4();
};

export const capitalizeName = (s: string) => {
  if (typeof s !== 'string') return '';
  const v = s.toLowerCase();
  return v.charAt(0).toUpperCase() + v.slice(1);
};

export const firstLetterToUpperCase = (value: string): string => {
  const valueLower = String(value).toLowerCase();
  return valueLower.charAt(0).toUpperCase() + valueLower.slice(1);
};

export const capitalizeFirstLetter = (value: string): string => {
  const valueUpper = String(value).toLowerCase();
  return valueUpper.charAt(0).toUpperCase() + valueUpper.slice(1);
};

export const convertToPluralMonth = (value: number): string =>
  Number(value) > 1 ? `${value} months` : `month`;

/** Fix date */
export const capitalizeOneFirstLetter = (a: string, b?: string) => {
  const fistLetter = capitalizeName(a).substring(0, 1).toUpperCase();
  const secondLetter = capitalizeName(b || '')
    .substring(0, 1)
    .toUpperCase();
  return `${fistLetter}${secondLetter}`;
};

/** Fix truncate */
export const truncateInput = (input: string, value: number) => {
  return input?.length > value ? `${input.substring(0, value)}...` : input;
};

export const truncateSubstring = (input: string, value: number) => {
  return input?.length > value ? input.substring(value) : input;
};

export const filterImageAndFile = (options: {
  imageList?: UploadFile[];
  fileList?: UploadFile[];
}) => {
  let newFileLists: any = [];
  let newImageLists: any = [];
  const { imageList, fileList } = options;

  imageList
    ?.filter((file: any) => file?.status === 'done')
    .forEach((file: any) => {
      newImageLists.push(file);
    });

  fileList
    ?.filter((file: any) => file?.status === 'done')
    .forEach((file: any) => {
      newFileLists.push(file);
    });

  return { newFileLists, newImageLists };
};

export const itemsNumberArray = (value: number) =>
  Array.from({ length: value }, (_, index) => index);
