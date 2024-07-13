export type EggHarvestingsModel = {
  createdAt: string;
  id: string;
  size: string;
  quantity: number;
  animalTypeId: string;
  animalType: {
    icon: string;
    name: string;
  };
  animalId: string;
  animal: {
    code: string;
  };
  organizationId: string;
  organization: {
    name: string;
  };
  userCreatedId: string;
};
