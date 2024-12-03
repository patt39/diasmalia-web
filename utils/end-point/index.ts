import axios from 'axios';
import { DELETE, GET, POST, PUT } from './consts';
export interface ClientApiMethods {
  [key: string]: {
    endpoint: string;
    method: string;
  };
}

export type IntegrationApiCall = {
  action: string;
  body?: Object;
  urlParams?: Object;
  queryParams?: Object;
};

// const userToken =
//   typeof window !== 'undefined'
//     ? Cookies.get(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN))
//     : null;

export const makeApiCall = async ({
  action,
  body,
  urlParams = {},
  queryParams = {},
}: IntegrationApiCall): Promise<any> => {
  const getURLEndpoint = (options: {
    endpoint: string;
    urlParams: any;
    queryParams: any;
  }) => {
    const { endpoint, urlParams, queryParams } = options;

    //replace params in url
    let url = endpoint;
    if (urlParams) {
      Object.keys(urlParams).forEach((key: string) => {
        url = url.replace(`:${key}`, urlParams[key]);
      });
    }

    //add query params
    if (queryParams) {
      url += '?';
      Object.keys(queryParams).forEach((key: string) => {
        if (queryParams[key]) {
          url += `${key}=${queryParams[key]}&`;
        }
      });
      url = url.slice(0, -1);
    }

    return url;
  };

  const url = getURLEndpoint({
    endpoint: apiEndpoints[action].endpoint,
    urlParams: urlParams,
    queryParams: queryParams,
  });

  //   async request(req: Request<M>) {
  //   const m = this._methods[req.action];

  // axios.defaults.headers.common['Authorization'] = `${userToken}` ?? {};
  const response = await axios.request({
    method: apiEndpoints[action]?.method,
    url: url,
    data: body,
    withCredentials: true,
  });

  return response;
};

const baseUrl = process.env.NEXT_PUBLIC_HOST_SERVER;

export const apiEndpoints: ClientApiMethods = {
  /****************** Auth route */
  loginUser: POST(`${baseUrl}/login`),
  passwordResetUser: POST(`${baseUrl}/password/reset`),
  resetPassword: PUT(`${baseUrl}/password/update/:token`),
  resendCode: GET(`${baseUrl}/resend-code`),
  validCode: POST(`${baseUrl}/confirm-email`),
  registerUser: POST(`${baseUrl}/register`),
  logoutUsers: GET(`${baseUrl}/logout`),

  /****************** Animal Types route */
  getAnimalTypes: GET(`${baseUrl}/animal-type`),
  getOneAnimalType: GET(`${baseUrl}/animal-type/view/:animalTypeId`),

  /****************** Profile route */
  updateOneProfile: PUT(`${baseUrl}/profiles/:profileId/edit`),
  updateUpdatePassword: PUT(`${baseUrl}/users/update-password`),
  getOneProfile: GET(`${baseUrl}/profiles/:profileId/show`),

  /****************** Currency or Countries route */
  getAllCurrencies: GET(`${baseUrl}/currencies`),
  getAllCounties: GET(`${baseUrl}/countries`),

  /****************** Materials route */
  getMaterials: GET(`${baseUrl}/materials`),
  getAssignedMaterials: GET(`${baseUrl}/assigned-material/`),
  getOneMaterial: GET(`${baseUrl}/assigned-material/:materialId/view`),
  addMaterial: POST(`${baseUrl}/assigned-material/:materialId/create`),
  createMaterial: POST(
    `${baseUrl}/assigned-material/:materialId/:buildingId/create`,
  ),
  createAvesMaterial: POST(
    `${baseUrl}/assigned-material/:materialId/:locationId/aves-location`,
  ),
  changeMaterialStatus: PUT(
    `${baseUrl}/assigned-material/:assignMaterialId/change-status`,
  ),

  /****************** Health route */
  getHealths: GET(`${baseUrl}/health`),
  getOneHealth: GET(`${baseUrl}/health/:healthId/view`),
  createOneHealth: POST(`${baseUrl}/health/create`),
  updateOneHealth: PUT(`${baseUrl}/health/:healthId/edit`),
  changeNameStatus: PUT(`${baseUrl}/health/:healthId/change-status`),
  deleteOneHealth: DELETE(`${baseUrl}/health/:healthId/delete`),

  /****************** Feed stock route */
  getFeedStocks: GET(`${baseUrl}/feed-stock`),
  createOneFeedStock: POST(`${baseUrl}/feed-stock/create`),
  updateOneFeedStock: PUT(`${baseUrl}/feed-stock/:feedStockId/edit`),
  deleteOneFeedStock: DELETE(`${baseUrl}/feed-stock/:feedStockId/delete`),

  /****************** Activity logs route */
  getActivityLogs: GET(`${baseUrl}/activity-logs`),

  /****************** Contacts route */
  sendContact: POST(`${baseUrl}/contacts`),

  /****************** Faqs route */
  getFaqs: GET(`${baseUrl}/faqs`),
  createFaq: POST(`${baseUrl}/faqs/create`),
  updateFaq: POST(`${baseUrl}/faqs/:faqId/edit`),

  /****************** blog route */
  getBlogs: GET(`${baseUrl}/blogs`),
  creatBlog: POST(`${baseUrl}/blogs/create`),
  viewBlog: GET(`${baseUrl}/blogs/:slug/view`),
  updateBlog: POST(`${baseUrl}/blogs/:blogId/edit`),

  /****************** Sales route */
  getSales: GET(`${baseUrl}/sales`),
  exportSales: GET(`${baseUrl}/sales/export`),
  getOneSale: GET(`${baseUrl}/sales/:saleId/view`),
  createOneSale: POST(`${baseUrl}/sales/bulk/create`),
  updateSale: PUT(`${baseUrl}/sales/:saleId/edit`),
  createOneAvesSale: POST(`${baseUrl}/sales/create/aves`),
  deleteOneSale: DELETE(`${baseUrl}/sales/:saleId/delete`),
  downloadSalePdf: GET(`${baseUrl}/sales/:saleId/download`),
  getEggsAnalytics: GET(`${baseUrl}/analytics/sales/eggs`),
  getSalesAnalytics: GET(`${baseUrl}/analytics/sales`),
  getchicksAnalytics: GET(`${baseUrl}/analytics/sales/chicks`),
  getchickensAnalytics: GET(`${baseUrl}/analytics/sales/chickens`),
  getBestSaleChannel: GET(`${baseUrl}/sales/:animalTypeId/best-channel`),
  getOneSaleAnimalType: GET(`${baseUrl}/sales/:animalTypeId/view/animalType`),

  /****************** User route */
  getImages: GET(`${baseUrl}/images`),
  findUser: GET(`${baseUrl}/users/:userId/show`),
  addImage: POST(`${baseUrl}/images/create`),
  ipLocation: GET(`${baseUrl}/ip-location`),
  getOneUserMe: GET(`${baseUrl}/users/me`),
  verifyToken: GET(`${baseUrl}/verify/:token`),
  updateOrganization: PUT(`${baseUrl}/organization/:organizationId/edit`),
  findOrganization: GET(`${baseUrl}/organization/:userId/view/organization`),
  deleteOneImage: DELETE(`${baseUrl}/images/:imageId/delete`),

  /****************** AssignedType route */
  createAssignedType: POST(`${baseUrl}/assigned-type/multiple/create`),
  getAssignedTypes: GET(`${baseUrl}/assigned-type`),
  deleteOneAssignedType: DELETE(
    `${baseUrl}/assigned-type/:assignTypeId/delete`,
  ),

  /****************** Contributors route */
  getContributors: GET(`${baseUrl}/contributors`),
  addCollaborator: POST(`${baseUrl}/contributors/new`),
  getOrganizations: GET(`${baseUrl}/contributors/organizations`),
  inviteCollaborator: POST(`${baseUrl}/contributors/invitation`),
  updateOneContributor: PUT(`${baseUrl}/profiles/:profileId/edit`),
  resendEmail: GET(`${baseUrl}/contributors/:userId/resend-email`),
  invitationResendEmail: GET(
    `${baseUrl}/contributors/:userId/invitation/resend-email`,
  ),
  collaborationRejection: PUT(`${baseUrl}/users/rejection/:token`),
  contributorConfirmation: PUT(`${baseUrl}/users/confirmation/:token`),
  contributorInvitationConfirmation: PUT(
    `${baseUrl}/users/invitation/confirmation/:token`,
  ),
  changeContributorStatus: PUT(
    `${baseUrl}/contributors/:contributorId/role/edit`,
  ),
  changeOrganization: PUT(`${baseUrl}/organization/:organizationId/show`),
  getUserByOrganization: GET(`${baseUrl}/organization/:organizationId/view`),
  deleteOneContributor: DELETE(`${baseUrl}/contributors/:contributorId/delete`),

  /****************** Breeds route */
  getBreeds: GET(`${baseUrl}/breeds`),

  /****************** Finances route */
  getFinances: GET(`${baseUrl}/finances`),
  getFinanceAnalytics: GET(`${baseUrl}/analytics/revenue`),
  createOneFinance: POST(`${baseUrl}/finances/create`),
  getOneFinance: GET(`${baseUrl}/finances/:financeId/view`),
  updateOneFinance: PUT(`${baseUrl}/finances/:financeId/edit`),

  /****************** Locations route */
  getLocations: GET(`${baseUrl}/locations`),
  getOneLocation: GET(`${baseUrl}/locations/:locationId/view`),
  createOneLocation: POST(`${baseUrl}/locations/:animalTypeId/create`),
  createBulkLocations: POST(`${baseUrl}/locations/:animalTypeId/bulk`),
  updateOneLocation: PUT(`${baseUrl}/locations/:locationId/edit`),
  changeStatus: PUT(`${baseUrl}/locations/:locationId/change-status`),
  changeLocation: PUT(`${baseUrl}/locations/:locationId/change-location`),
  deleteOneLocation: DELETE(`${baseUrl}/locations/:locationId/delete`),

  /****************** Locations route */
  getBuildings: GET(`${baseUrl}/buildings`),
  getOneBuilding: GET(`${baseUrl}/buildings/:buildingId/view`),
  createOneBuilding: POST(`${baseUrl}/buildings/:animalTypeId/create`),
  updateOneBuilding: PUT(`${baseUrl}/buildings/:buildingId/edit`),
  deleteOneBuilding: DELETE(`${baseUrl}/buildings/:buildingId/delete`),

  /****************** Cages route */
  getAnimalCages: GET(`${baseUrl}/cages`),
  putInCages: POST(`${baseUrl}/cages/create`),
  updateCage: PUT(`${baseUrl}/cages/:cageId/edit`),
  cageEggHarvesting: PUT(`${baseUrl}/cages/:cageId/eggHarvest`),
  deleteOneCage: DELETE(`${baseUrl}/cages/:cageId/delete`),

  /****************** Animals route */
  getAnimals: GET(`${baseUrl}/animals`),
  createOneAnimal: POST(`${baseUrl}/animals/create`),
  getOneAnimal: GET(`${baseUrl}/animals/:animalId/view`),
  updateOneAnimal: PUT(`${baseUrl}/animals/:animalId/edit`),
  updateOneAves: PUT(`${baseUrl}/animals/:animalId/edit`),
  createBulkAnimal: POST(`${baseUrl}/animals/create/bulk`),
  animalsIdentification: POST(`${baseUrl}/animals/identification`),
  createOneAvesAnimal: POST(`${baseUrl}/animals/:animalTypeId/create`),
  createBulkAves: POST(`${baseUrl}/animals/create/:animalTypeId/bulk/aves`),
  getAnimalByAnimalType: GET(`${baseUrl}/animals/:animalTypeId/view/animal`),
  getAnimalStatistics: GET(`${baseUrl}/animals/:animalTypeId/statistics`),
  getAnimalDeadSoldStatistics: GET(
    `${baseUrl}/animals/:animalTypeId/statistics/all`,
  ),
  deleteOneAnimal: DELETE(`${baseUrl}/animals/:animalId/delete`),
  archiveOneAnimal: PUT(`${baseUrl}/animals/:animalId/archive/aves`),
  changeProductionStatus: PUT(`${baseUrl}/animals/:animalId/change-status`),

  /****************** Feedings route */
  getFeedings: GET(`${baseUrl}/feedings`),
  getFeedingsAnalytics: GET(`${baseUrl}/analytics/feedings`),
  createOneFeeding: POST(`${baseUrl}/feedings/bulk/create`),
  createOneAvesFeeding: POST(`${baseUrl}/feedings/create/aves`),
  updateOneFeeding: PUT(`${baseUrl}/feedings/:feedingId/edit`),
  updateOneAvesFeeding: PUT(`${baseUrl}/feedings/:feedingId/edit`),
  deleteOneFeeding: DELETE(`${baseUrl}/feedings/:feedingId/delete`),

  /****************** Fattenings route */
  getFattenings: GET(`${baseUrl}/fattenings`),
  getOneFattening: GET(`${baseUrl}/fattenings/:animalId/view`),
  createOneFattening: POST(`${baseUrl}/fattenings/bulk/create`),
  updateOneFattening: PUT(`${baseUrl}/fattenings/:fatteningId/edit`),
  deleteOneFattening: DELETE(`${baseUrl}/fattenings/:fatteningId/delete`),

  /****************** Deaths route */
  getDeaths: GET(`${baseUrl}/deaths`),
  getDeathAnalytics: GET(`${baseUrl}/analytics/deaths`),
  getOneDeath: GET(`${baseUrl}/deaths/:deathId/view`),
  getOneDeathAnimal: GET(`${baseUrl}/deaths/:animalId/show`),
  createOneDeath: POST(`${baseUrl}/deaths/bulk/create`),
  updateOneDeath: PUT(`${baseUrl}/deaths/:deathId/edit`),
  createOneAvesDeath: POST(`${baseUrl}/deaths/create/aves`),
  updateOneAvesDeath: PUT(`${baseUrl}/deaths/:deathId/edit`),
  deleteOneDeath: DELETE(`${baseUrl}/deaths/:deathId/delete`),

  /****************** Breedings route */
  getBreedings: GET(`${baseUrl}/breedings`),
  createOneBreeding: POST(`${baseUrl}/breedings/create`),
  getOneBreeding: GET(`${baseUrl}/breedings/:breedingId/view`),
  getBreedingHistory: GET(`${baseUrl}/breedings/animal/history`),
  updateOneBreeding: PUT(`${baseUrl}/breedings/:breedingId/edit`),
  deleteOneBreeding: DELETE(`${baseUrl}/breedings/:breedingId/delete`),
  createOneCheck: POST(`${baseUrl}/check-pregnancies/:breedingId/check`),
  getOneMaleBreeding: GET(`${baseUrl}/breedings/:animalMaleId/view/breeding`),
  getOneFemaleBreeding: GET(
    `${baseUrl}/breedings/:animalFemaleId/view/female-breeding`,
  ),
  updateOneCheck: PUT(`${baseUrl}/check-pregnancies/:checkPregnancyId/recheck`),

  /****************** Egg-harvestings route */
  getEggharvestings: GET(`${baseUrl}/egg-harvestings`),
  getEggharvestingAnalytics: GET(`${baseUrl}/analytics/egg-harvestings`),
  createOneEggHarvesting: POST(`${baseUrl}/egg-harvestings/create`),
  updateOneEggharvesting: PUT(
    `${baseUrl}/egg-harvestings/:eggHarvestingId/edit`,
  ),
  deleteOneEggharvesting: DELETE(
    `${baseUrl}/egg-harvestings/:eggHarvestingId/delete`,
  ),

  /****************** Farrowings route */
  getFarrowings: GET(`${baseUrl}/farrowings`),
  createOneFarrowing: POST(`${baseUrl}/farrowings/create/`),
  getOneFarrowing: GET(`${baseUrl}/farrowings/:farrowingId/view`),
  getOneFarrowingByAnimalId: GET(`${baseUrl}/farrowings/:animalId/view/animal`),
  updateOneFarrowing: PUT(`${baseUrl}/farrowings/:farrowingId/edit`),
  deleteOneFarrowing: DELETE(`${baseUrl}/farrowings/:farrowingId/delete`),

  /****************** Isolations route */
  getIsolations: GET(`${baseUrl}/isolations`),
  createOneIsolation: POST(`${baseUrl}/isolations/bulk/create`),
  getOneIsolation: GET(`${baseUrl}/isolations/:isolationId/view`),
  updateOneIsolation: PUT(`${baseUrl}/isolations/:isolationId/edit`),
  createOneAvesIsolation: POST(`${baseUrl}/isolations/create/aves`),
  updateOneAvesIsolation: PUT(`${baseUrl}/isolations/:isolationId/edit`),
  deleteOneIsolation: DELETE(`${baseUrl}/isolations/:isolationId/delete`),

  /****************** Milkings route */
  getMilkings: GET(`${baseUrl}/milkings`),
  getMilkingsAnalytics: GET(`${baseUrl}/analytics/milkings`),
  createOneMilking: POST(`${baseUrl}/milkings/bulk/create`),
  updateOneMilking: GET(`${baseUrl}/milkings/:milkingId/edit`),
  deleteOneMilking: DELETE(`${baseUrl}/milkings/:milkingId/delete`),

  /****************** Tasks routes */
  getTasks: GET(`${baseUrl}/tasks`),
  assigneTask: POST(`${baseUrl}/tasks/create`),
  viewTask: GET(`${baseUrl}/tasks/:taskId/show`),
  updateTask: PUT(`${baseUrl}/tasks/:taskId/edit`),
  deleteTask: DELETE(`${baseUrl}/tasks/:taskId/delete`),

  /****************** Incubations route */
  getIncubations: GET(`${baseUrl}/incubations`),
  createOneIncubation: POST(`${baseUrl}/incubations/create`),
  getIncubationsAnalytics: GET(`${baseUrl}/analytics/incubations`),
  getOneIncubation: GET(`${baseUrl}/incubations/:incubationId/view`),
  updateOneIncubation: PUT(`${baseUrl}/incubations/:incubationId/edit`),
  deleteOneIncubation: DELETE(`${baseUrl}/incubations/:incubationId/delete`),

  /****************** Weaning route */
  getWeanings: GET(`${baseUrl}/weanings`),
  createOneWeaning: POST(`${baseUrl}/weanings/create`),
  getBirthAnalytics: GET(`${baseUrl}/analytics/weanings`),
  getOneWeaning: GET(`${baseUrl}/weanings/:farrowingId/view`),
  getOneAnimalWeaned: GET(`${baseUrl}/weanings/:animalId/view/weaning`),
  updateOneWeaning: PUT(`${baseUrl}/weanings/:weaningId/edit`),
  deleteOneWeaning: DELETE(`${baseUrl}/weanings/:weaningId/delete`),

  /****************** Gestation route */
  getGestations: GET(`${baseUrl}/gestations`),
  getOneGestation: GET(`${baseUrl}/gestations/:gestationId/view`),
  getGestationByAnimalId: GET(`${baseUrl}/gestations/:animalId/show`),
  updateOneGestation: PUT(`${baseUrl}/gestations/:gestationId/edit`),
  deleteOneGestation: DELETE(`${baseUrl}/gestations/:gestationId/delete`),

  /****************** Treatment route */
  getTreatments: GET(`${baseUrl}/treatments`),
  createOneTreatment: POST(`${baseUrl}/treatments/bulk/create`),
  getOneTreatment: GET(`${baseUrl}/treatments/:treatmentId/view`),
  getOneAnimalTreatment: GET(`${baseUrl}/treatments/:animalId/view/treatment`),
  updateOneTreatment: PUT(`${baseUrl}/treatments/:treatmentId/edit`),
  createOneAvesTreatment: POST(`${baseUrl}/treatments/create/aves`),
  updateOneAvesTreatment: PUT(`${baseUrl}/treatments/:treatmentId/edit`),
  deleteOneTreatment: DELETE(`${baseUrl}/treatments/:treatmentId/delete`),
};
