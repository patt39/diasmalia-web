export type IncubationsModel = {
  createdAt: Date;
  id: string;
  dueDate: Date;
  quantityStart: number;
  quantityEnd: number;
  animalTypeId: string;
  animalType: {
    name: string;
  };
};
