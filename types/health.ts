export type HealthsModel = {
  createdAt: Date;
  id: string;
  name: number;
  category: string;
  animalType: {
    name: string;
  };
};
