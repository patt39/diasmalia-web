export type DeathsModel = {
  createdAt: Date;
  id: string;
  note: string;
  male: number;
  female: number;
  number: number;
  animalId: string;
  animal: {
    code: string;
    status: string;
    gender: string;
    weight: number;
    isIsolated: boolean;
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
