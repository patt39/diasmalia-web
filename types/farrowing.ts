export type FarrowingsModel = {
  createdAt: string;
  id: string;
  litter: number;
  note: string;
  animal: {
    select: {
      id: string;
      code: string;
      productionPhase: string;
      weight: number;
      electronicCode: string;
      status: string;
      gender: string;
      animalTypeId: string;
      animalType: {
        select: {
          name: string;
        };
      };
      location: {
        select: {
          code: string;
        };
      };
      breed: {
        select: {
          name: string;
        };
      };
    };
  };
  animalTypeId: string;
  animalType: {
    select: {
      name: string;
    };
  };
};
