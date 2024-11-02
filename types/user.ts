import { ImageProfileModel, ProfileModel } from './profile';

export type UserModel = {
  _count: any;
  accessToken: string;
  confirmedAt: string;
  createdAt: Date;
  email: string;
  id: string;
  username: string;
  organizationId: string;
  organization: {
    logo: ImageProfileModel;
    name: string;
    image: ImageProfileModel;
    description: string;
  };
  profileId: string;
  profile: ProfileModel;
  url: string;
};

export type ContributorModel = {
  createdAt: Date;
  id: string;
  role: string;
  userId: string;
  user: {
    id: string;
    email: string;
    profile: {
      firstName: string;
      lastName: string;
      occupation: string;
      address: string;
      phone: number;
      photo: string;
      description: string;
      currency: {
        symbol: string;
      };
    };
  };
  organizationId: string;
  organization: {
    logo: string;
    name: string;
    description: string;
  };
  userCreatedId: string;
};

export type ContributorStatusModel = {
  createdAt: Date;
  id: string;
  role: string;
};
