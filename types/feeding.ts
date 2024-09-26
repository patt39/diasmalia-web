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

export type FeedStockModel = {
  createdAt: string;
  id: string;
  weight: number;
  quantity: number;
  feedCategory: string;
  animalTypeName: string;
  animalType: {
    name: string;
  };
};
