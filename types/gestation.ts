export type GestationsModel = {
  createdAt: string;
  id: string;
  note: string;
  animal: {
    select: {
      code: string;
      productionPhase: string;
      electronicCode: string;
      status: string;
      gender: string;
    };
  };
  animalTypeId: string;
  animalType: {
    select: {
      icon: string;
      name: string;
    };
  };
  userCreatedId: string;
};
