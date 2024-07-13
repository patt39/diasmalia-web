export type TreatmentsModel = {
  createdAt: string;
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
  createdAt: string;
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
