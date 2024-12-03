export type ColorType = 'indigo' | 'red' | 'sky';

export type ImageProfileModel = {
  id: 'aws' | 'provider';
  patch: string;
};

export type ProfileFormModel = {
  lastName: string;
  firstName: string;
  phone: string;
  description: string;
  currencyId: string;
  occupation: string;
  address: string;
  countryId: string;
  imageList: any;
  city: string;
  testimonial: string;
  image: any;
};

export type ImagesModel = {
  id: string;
  imageList?: any;
  newImageLists?: any;
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
