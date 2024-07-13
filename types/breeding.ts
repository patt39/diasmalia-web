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
