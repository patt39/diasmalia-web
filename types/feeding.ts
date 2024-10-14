export type FeedingsModel = {
  createdAt: Date;
  id: string;
  quantity: number;
  feedType: string;
  animals: {
    code: string;
  };
  animalType: {
    name: string;
  };
};

export type FeedingAvesModel = {
  createdAt: Date;
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
  createdAt: Date;
  id: string;
  weight: number;
  quantity: number;
  feedCategory: string;
  animalTypeName: string;
  compostion: [
    {
      id: string;
      type: string;
      percentage: number;
      createdAt: Date;
    },
  ];
  animalType: {
    name: string;
  };
};

export type FeedStockPostModel = {
  weight?: number;
  quantity?: number;
  feedCategory?: string;
  animalTypeName?: string;
  composition?: any;
  type?: string;
  percentage?: number;
};

export type FeedingsPostModel = {
  createdAt: Date;
  id: string;
  quantity: number;
  feedType: string;
  animals: any;
  animalType: {
    name: string;
  };
};
