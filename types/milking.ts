export type MilkingsModel = {
  createdAt: Date;
  id: string;
  quantity: number;
  animalId: string;
  animal: {
    code: string;
  };
  animalTypeId: string;
  animalType: {
    select: {
      name: string;
    };
  };
};
