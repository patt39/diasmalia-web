export type IncubationsModel = {
  createdAt: string;
  id: string;
  dueDate: Date;
  quantityStart: number;
  quantityEnd: number;
  animalTypeId: string;
  animalType: {
    name: string;
  };
};
