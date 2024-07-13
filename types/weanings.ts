export type WeaningsModel = {
  createdAt: string;
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
