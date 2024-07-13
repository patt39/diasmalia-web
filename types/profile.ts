export type ColorType = 'indigo' | 'red' | 'sky';

export type ImageProfileModel = {
  id: 'aws' | 'provider';
  patch: string;
};
export const arrayColors = [
  { id: '2', name: 'indigo' },
  { id: '3', name: 'red' },
  // { id: "4", name: "green" },
];

export type ProfileFormModel = {
  username: string;
  lastName: string;
  firstName: string;
  phone: string;
  description: string;
  birthday: Date;
  currencyId: string;
  color: string;
  url: string;
  countryId: string;
  imageList: any;
  social: any;
  attachment: any;
};

export type NextStepProfileFormModel = {
  birthday: Date;
  username: string;
  url?: string;
  currencyId: string;
  userId?: string;
};

export type ProfileModel = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  address: string;
  occupation: string;
  companyName: string;
  photo: ImageProfileModel;
  userId: string;
  description: string;
  currencyId: string;
  currency: {
    symbol: string;
  };
};

export type CurrencyModel = {
  id: string;
  name: string;
  code: string;
  symbol: string;
  amount: number;
};
