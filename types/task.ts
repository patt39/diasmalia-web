export type TaskModel = {
  createdAt: Date;
  id: String;
  type: String;
  title: String;
  dueDate: Date;
  periode: String;
  frequency: String;
  description: String;
  contributorId: String;
  contributor: {
    user: {
      profile: {
        firstName: String;
        lastName: String;
      };
    };
  };
  animalId: String;
  animal: { code: String };
  organizationId: String;
  userCreatedId: String;
};

export type TasksPostModel = {
  createdAt: Date;
  id: string;
  quantity: number;
  feedType: string;
  animals: any;
  animalType: {
    name: string;
  };
};
