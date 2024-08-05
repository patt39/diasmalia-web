export type BreedingsModel = {
  createdAt: string;
  id: string;
  note: string;
  maleCode: string;
  femaleCode: string;
  method: string;
  checkStatus: boolean;
  animalTypeId: string;
  animalType: {
    select: {
      icon: string;
      name: string;
    };
  };
  organizationId: string;
  organization: {
    select: {
      name: string;
    };
  };
};

export type CheckPregnancysModel = {
  createdAt: string;
  id: string;
  method: string;
  result: string;
  farrowingDate: Date;
  organizationId: string;
  organization: {
    name: string;
  };
};
