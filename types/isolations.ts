export type IsolationsModel = {
  createdAt: string;
  id: string;
  note: string;
  number: number;
  animal: Array<{
    code: string;
  }>;
  animalType: {
    name: string;
  };
};
