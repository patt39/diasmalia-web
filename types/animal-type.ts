import { PaginationResponse } from '@/utils';

export type ResponseAnimalTypeModel = {
  value: Array<AnimalTypeModel>;
} & PaginationResponse;

export type AnimalTypeModel = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  id: string;
  name: string;
  icon: string;
};
