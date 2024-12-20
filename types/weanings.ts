export type WeaningsModel = {
  createdAt: Date;
  id: string;
  litter: number;
  animal: {
    code: string;
  };
  farrowing: {
    litter: number;
  };
  animalType: {
    name: string;
  };
};
