import { FeedingAvesModel, FeedingsPostModel } from '@/types/feeding';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOrUpdateOneFeedingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['feedings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: FeedingsPostModel & { feedingId: string }) => {
      const { feedingId } = payload;
      return feedingId
        ? await makeApiCall({
            action: 'updateOneFeeding',
            body: payload,
            urlParams: { feedingId },
          })
        : await makeApiCall({
            action: 'createOneFeeding',
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

export const CreateOrUpdateOneAvesFeedingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['feedings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: FeedingAvesModel & { feedingId: string }) => {
      const { feedingId } = payload;
      return feedingId
        ? await makeApiCall({
            action: 'updateOneAvesFeeding',
            body: payload,
            urlParams: { feedingId },
          })
        : await makeApiCall({
            action: 'createOneAvesFeeding',
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

export const GetFeedingsAPI = (
  payload: {
    search?: string;
    take: number;
    sortBy: string;
    periode?: string;
    pageItem?: number;
    productionPhase?: string;
    feedingsCount?: string;
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
    feedingsCount,
    organizationId,
  } = payload;
  return useQuery({
    queryKey: ['feedings', { ...payload }],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await makeApiCall({
        action: 'getFeedings',
        queryParams: {
          take,
          sort,
          search,
          sortBy,
          periode,
          productionPhase,
          feedingsCount,
          animalTypeId,
          page: pageItem,
          organizationId,
        },
      }),
    staleTime: 60_000,
  });
};

export const FeedingsAnalyticAPI = (payload: {
  periode?: string;
  days?: string;
  months?: string;
  year?: string;
  animalTypeId?: string;
  organizationId?: string;
}) => {
  const { year, months, days, animalTypeId, organizationId } = payload;
  return useQuery({
    queryKey: ['feedings-analytics', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getFeedingsAnalytics',
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

export const DeleteOneFeedingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['feedings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { feedingId: string }) => {
      const { feedingId } = payload;
      return await makeApiCall({
        action: 'deleteOneFeeding',
        urlParams: { feedingId },
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
