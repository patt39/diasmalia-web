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

  /****************** Animal Types route */
  getAnimalTypes: GET(`${baseUrl}/animal-type`),
  getOneAnimalType: GET(`${baseUrl}/animal-type/view/:animalTypeId`),

  /****************** Activity logs route */
  getActivityLogs: GET(`${baseUrl}/activity-logs`),

  /****************** Sales route */
  getSales: GET(`${baseUrl}/sales`),
  exportSales: GET(`${baseUrl}/sales/export`),
  getOneSale: GET(`${baseUrl}/sales/view/:saleId`),
  createOneSale: POST(`${baseUrl}/sales/bulk/create`),
  updateOneSale: PUT(`${baseUrl}/sales/:saleId/edit`),
  deleteOneSale: DELETE(`${baseUrl}/sales/:saleId/delete`),

  /****************** User route */
  ipLocation: GET(`${baseUrl}/ip-location`),
  getOneUserMe: GET(`${baseUrl}/users/me`),

  /****************** AssignedType route */
  createAssignedType: POST(`${baseUrl}/assigned-type/multiple/create`),
  getAssignedTypes: GET(`${baseUrl}/assigned-type`),
  deleteOneAssignedType: DELETE(
    `${baseUrl}/assigned-type/:assignTypeId/delete`,
  ),

  /****************** Contributors route */
  getContributors: GET(`${baseUrl}/contributors`),

  /****************** Finances route */
  getFinances: GET(`${baseUrl}/finances`),
  createOneFinance: POST(`${baseUrl}/finances/create`),
  updateOneFinance: PUT(`${baseUrl}/finances/:financeId/edit`),

  /****************** Locations route */
  getLocations: GET(`${baseUrl}/locations`),
  changeStatus: PUT(`${baseUrl}/locations/:locationId/change-status`),
  deleteOneLocation: DELETE(`${baseUrl}/locations/:locationId/delete`),

  /****************** Animals route */
  getAnimals: GET(`${baseUrl}/animals`),
  getAnimalsStatistics: GET(`${baseUrl}/animals/statistics`),
  deleteOneAnimal: DELETE(`${baseUrl}/animals/:animalId/delete`),

  /****************** Feedings route */
  getFeedings: GET(`${baseUrl}/feedings`),
  createOneFeeding: POST(`${baseUrl}/feedings/bulk/create`),
  createOneAvesFeeding: POST(`${baseUrl}/feedings/create/aves`),
  updateOneFeeding: PUT(`${baseUrl}/feedings/:feedingId/edit`),
  updateOneAvesFeeding: PUT(`${baseUrl}/feedings/:feedingId/edit`),
  deleteOneFeeding: DELETE(`${baseUrl}/feedings/:feedingId/delete`),

  /****************** Fattenings route */
  getFattenings: GET(`${baseUrl}/fattenings`),
  createOneFattening: POST(`${baseUrl}/fattenings/bulk/create`),
  updateOneFattening: PUT(`${baseUrl}/fattenings/:fatteningId/edit`),
  deleteOneFattening: DELETE(`${baseUrl}/fattenings/:fatteningId/delete`),

  /****************** Deaths route */
  getDeaths: GET(`${baseUrl}/deaths`),
  createOneDeath: POST(`${baseUrl}/deaths/bulk/create`),
  updateOneDeath: PUT(`${baseUrl}/deaths/:deathId/edit`),
  createOneAvesDeath: POST(`${baseUrl}/deaths/create/aves`),
  updateOneAvesDeath: PUT(`${baseUrl}/deaths/:deathId/edit`),
  deleteOneDeath: DELETE(`${baseUrl}/deaths/:deathId/delete`),

  /****************** Breedings route */
  getBreedings: GET(`${baseUrl}/breedings`),
  createOneBreeding: POST(`${baseUrl}/breedings/create`),
  updateOneBreeding: PUT(`${baseUrl}/breedings/:breedingId/edit`),
  deleteOneBreeding: DELETE(`${baseUrl}/breedings/:breedingId/delete`),

  /****************** Egg-harvestings route */
  getEggharvestings: GET(`${baseUrl}/egg-harvestings`),
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
  updateOneFarrowing: PUT(`${baseUrl}/farrowings/:farrowingId/edit`),
  deleteOneFarrowing: DELETE(`${baseUrl}/farrowings/:farrowingId/delete`),

  /****************** Isolations route */
  getIsolations: GET(`${baseUrl}/isolations`),
  createOneIsolation: POST(`${baseUrl}/isolations/bulk/create`),
  updateOneIsolation: PUT(`${baseUrl}/isolations/:isolationId/edit`),
  createOneAvesIsolation: POST(`${baseUrl}/isolations/create/aves`),
  updateOneAvesIsolation: PUT(`${baseUrl}/isolations/:isolationId/edit`),
  deleteOneIsolation: DELETE(`${baseUrl}/isolations/:isolationId/delete`),

  /****************** Milkings route */
  getMilkings: GET(`${baseUrl}/milkings`),
  deleteOneMilking: DELETE(`${baseUrl}/milkings/:milkingId/delete`),

  /****************** Incubations route */
  getIncubations: GET(`${baseUrl}/incubations`),
  createOneIncubation: POST(`${baseUrl}/incubations/create`),
  updateOneIncubation: PUT(`${baseUrl}/incubations/:incubationId/edit`),
  deleteOneIncubation: DELETE(`${baseUrl}/incubations/:incubationId/delete`),

  /****************** Weaning route */
  getWeanings: GET(`${baseUrl}/weanings`),
  createOneWeaning: POST(`${baseUrl}/weanings/create`),
  updateOneWeaning: PUT(`${baseUrl}/weanings/:weaningId/edit`),
  deleteOneWeaning: DELETE(`${baseUrl}/weanings/:weaningId/delete`),

  /****************** Gestation route */
  getGestations: GET(`${baseUrl}/gestations`),
  updateOneGestation: GET(`${baseUrl}/gestations/:gestationId/edit`),
  deleteOneGestation: DELETE(`${baseUrl}/weanings/:weaningId/delete`),

  /****************** Treatment route */
  getTreatments: GET(`${baseUrl}/treatments`),
  createOneTreatment: POST(`${baseUrl}/treatments/bulk/create`),
  updateOneTreatment: GET(`${baseUrl}/treatments/:treatmentId/edit`),
  createOneAvesTreatment: POST(`${baseUrl}/treatments/create/aves`),
  updateOneAvesTreatment: PUT(`${baseUrl}/treatments/:treatmentId/edit`),
  deleteOneTreatment: DELETE(`${baseUrl}/treatments/:treatmentId/delete`),
};