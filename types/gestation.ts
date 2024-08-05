export type GestationsModel = {
  createdAt: string;
  id: string;
  note: string;
  farrowingDate: Date;
  animal: {
    code: string;
    electronicCode: string;
  };
  animalTypeId: string;
  animalType: {
    name: string;
  };
  userCreatedId: string;
};
