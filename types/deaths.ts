export type DeathsModel = {
  createdAt: Date;
  id: string;
  note: string;
  number: number;
  animalId: string;
  animal: {
    code: string;
    isIsolated: boolean;
    status: string;
    gender: string;
    weight: number;
    electronicCode: string;
    productionPhase: string;
  };
  animalTypeId: string;
  animalType: {
    name: string;
  };
  organizationId: string;
  organization: {
    name: string;
  };
  userCreatedId: string;
};
