export type TreatmentsModel = {
  createdAt: Date;
  id: string;
  note: string;
  dose: number;
  name: string;
  method: string;
  medication: string;
  diagnosis: string;
  animal: Array<{
    code: string;
  }>;
  animalType: {
    name: string;
  };
};

export type TreatmentAvesModel = {
  createdAt: Date;
  id: string;
  note: string;
  dose: number;
  name: string;
  method: string;
  medication: string;
  diagnosis: string;
  animal: {
    code: string;
  };
  animalType: {
    name: string;
  };
};

export type TreatmentsPostModel = {
  createdAt: Date;
  id: string;
  note: string;
  dose: number;
  name: string;
  method: string;
  medication: string;
  diagnosis: string;
  animals: any;
  animalType: {
    name: string;
  };
};

export type HealthsModel = {
  createdAt: Date;
  id: string;
  image: any;
  name: string;
  description: string;
};
