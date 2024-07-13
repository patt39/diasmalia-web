import { PaginationResponse } from '@/utils';

export type ResponseAssignedTypeModel = {
  value: Array<AssignedTypeModel>;
} & PaginationResponse;

export type AssignedTypeModel = {
  createdAt: Date;
  id: string;
  userId: string;
  user: {
    email: string;
    profile: {
      firstName: string;
      lastName: string;
    };
  };
  animalTypeId: string;
  animalType: {
    icon: string;
    name: string;
  };
  organizationId: string;
};

export type AssignedTypeFormModel = {
  animalTypeIds: string[];
};
