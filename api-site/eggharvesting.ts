import { EggHarvestingsModel } from '@/types/egg-harvesting';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOrUpdateOneEggHarvestingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['eggharvestings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: EggHarvestingsModel & { eggHarvestingId: string },
    ) => {
      const { eggHarvestingId } = payload;
      return eggHarvestingId
        ? await makeApiCall({
            action: 'updateOneEggharvesting',
            body: payload,
            urlParams: { eggHarvestingId },
          })
        : await makeApiCall({
            action: 'createOneEggHarvesting',
            body: { ...payload },
          });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};

export const GetEggHarvestingsAPI = (
  payload: {
    search?: string;
    take?: number;
    periode?: string;
    pageItem?: number;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const { take, sort, search, periode, sortBy, animalTypeId, organizationId } =
    payload;
  return useQuery({
    queryKey: ['eggharvestings', { ...payload }],
    placeholderData: keepPreviousData,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getEggharvestings',
        queryParams: {
          take,
          sort,
          search,
          sortBy,
          periode,
          animalTypeId,
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 6000,
  });
};

export const GetEggHarvestingsAnalyticAPI = (payload: {
  periode?: string;
  days?: string;
  months?: string;
  year?: string;
  animalTypeId?: string;
  organizationId?: string;
}) => {
  const { year, months, days, animalTypeId, organizationId } = payload;
  return useQuery({
    queryKey: ['eggharvestings-analytics', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getEggharvestingAnalytics',
        queryParams: {
          year,
          months,
          days,
          animalTypeId,
          organizationId,
        },
      }),
  });
};

export const DeleteOneEggHarvestingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['eggharvestings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { eggHarvestingId: string }) => {
      const { eggHarvestingId } = payload;
      return await makeApiCall({
        action: 'deleteOneEggharvesting',
        urlParams: { eggHarvestingId },
      });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
