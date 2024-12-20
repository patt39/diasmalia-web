export type IsolationsModel = {
  createdAt: Date;
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
