export type SalesModel = {
  createdAt: string;
  id: string;
  price: number;
  soldTo: string;
  type: string;
  phone: number;
  note: string;
  email: string;
  quantity: number;
  method: string;
  assigneType: {
    select: {
      animalTypeId: string;
      animalType: {
        select: {
          name: string;
          slug: string;
        };
      };
    };
  };
  organization: {
    select: {
      name: string;
    };
  };
};
