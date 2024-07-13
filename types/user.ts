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
