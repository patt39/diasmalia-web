export type AnimalModel = {
  createdAt: Date;
  id: string;
  code: string;
  gender: string;
  weight: Number;
  status: string;
  male: Number;
  female: Number;
  quantity: Number;
  birthday: Number;
  codeFather: string;
  codeMother: string;
  attachment: any;
  isCastrated: boolean;
  isIsolated: boolean;
  productionPhase: string;
  electronicCode: string;
  organizationId: string;
  organization: {
    logo: string;
    name: string;
    image: string;
  };
  locationId: string;
  location: {
    code: string;
    productionPhase: string;
  };
  breedId: true;
  breed: {
    name: string;
  };
  animalTypeId: string;
  animalType: {
    id: string;
    slug: string;
    photo: string;
    name: string;
  };
  _count: {
    select: {
      milkings: Number;
      weanings: Number;
      gestations: Number;
      farrowings: Number;
      treatments: Number;
    };
  };
};
