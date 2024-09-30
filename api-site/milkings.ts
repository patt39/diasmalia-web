import { MilkingsModel } from '@/types/milking';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOrUpdateOneMilkingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['milkings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: MilkingsModel & { milkingId: string }) => {
      const { milkingId } = payload;
      return milkingId
        ? await makeApiCall({
            action: 'updateOneMilking',
            body: payload,
            urlParams: { milkingId },
          })
        : await makeApiCall({
            action: 'createOneMilking',
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

export const GetMilkingsAPI = (
  payload: {
    search?: string;
    take: number;
    sortBy: string;
    periode?: string;
    pageItem?: number;
    productionPhase?: string;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const {
    take,
    sort,
    sortBy,
    search,
    pageItem,
    periode,
    productionPhase,
    animalTypeId,
    organizationId,
  } = payload;
  return useQuery({
    queryKey: ['milkings', { ...payload }],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await makeApiCall({
        action: 'getMilkings',
        queryParams: {
          take,
          sort,
          search,
          sortBy,
          periode,
          productionPhase,
          animalTypeId,
          page: pageItem,
          organizationId,
        },
      }),
    staleTime: 6000,
  });
};

export const MilkingsAnalyticAPI = (payload: {
  periode?: string;
  days?: string;
  months?: string;
  year?: string;
  animalTypeId?: string;
  organizationId?: string;
}) => {
  const { year, months, days, animalTypeId, organizationId } = payload;
  return useQuery({
    queryKey: ['milkings-analytics', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getMilkingsAnalytics',
        queryParams: {
          year,
          days,
          months,
          animalTypeId,
          organizationId,
        },
      }),
  });
};
