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
  animalTypeId: string;
  animalType: {
    select: {
      icon: string;
      name: string;
    };
  };
  userCreatedId: string;
  productionPhase: string;
  organizationId: string;
  organization: {
    select: {
      name: string;
    };
  };
};
