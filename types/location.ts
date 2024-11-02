import { PaginationResponse } from '@/utils';

export type ResponseLocationModel = {
  value: Array<LocationModel>;
} & PaginationResponse;

export type LocationModel = {
  createdAt: Date;
  id: string;
  code: string;
  status: boolean;
  squareMeter: number;
  through: number;
  manger: number;
  userCreatedId: string;
  productionPhase: string;
};

export type LocationChangeModel = {
  animals: {
    code: string;
  };
  locationCode: string;
};
