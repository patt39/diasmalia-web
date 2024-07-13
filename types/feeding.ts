export type FeedingsModel = {
  createdAt: Date;
  id: string;
  quantity: number;
  feedType: string;
  animal: {
    code: string;
  };
  animalType: {
    name: string;
  };
};

export type FeedingAvesModel = {
  createdAt: string;
  updatedAt: string;
  id: string;
  quantity: number;
  feedType: string;
  animal: {
    code: string;
  };
  animalType: {
    name: string;
  };
};
