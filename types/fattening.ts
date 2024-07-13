export type FatteningsModel = {
  createdAt: string;
  updatedAt: string;
  id: string;
  initialWeight: number;
  actualWeight: number;
  animalType: {
    select: {
      name: string;
    };
  };
  animal: {
    id: string;
    code: string;
    gender: string;
    weight: number;
    electronicCode: string;
    productionPhase: string;
  };
  userCreatedId: string;
  organizationId: string;
};
