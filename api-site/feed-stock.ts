import { FeedStockModel } from '@/types/feeding';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOrUpdateOneFeedStockAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['feeds-stock'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: FeedStockModel & { feedStockId: string }) => {
      const { feedStockId } = payload;
      return feedStockId
        ? await makeApiCall({
            action: 'updateOneFeedStock',
            body: payload,
            urlParams: { feedStockId },
          })
        : await makeApiCall({
            action: 'createOneFeedStock',
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

export const GetFeedStockAPI = (
  payload: {
    take: number;
    sortBy: string;
    animalTypeName?: string;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const { take, sort, sortBy, animalTypeName, animalTypeId, organizationId } =
    payload;
  return useInfiniteQuery({
    queryKey: ['feeds-stock', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getFeedStocks',
        queryParams: {
          take,
          sort,
          sortBy,
          animalTypeName,
          animalTypeId,
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 6000,
    initialPageParam: 1,
  });
};

export const DeleteOneFeedStockAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['feeds-stock'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { feedStockId: string }) => {
      const { feedStockId } = payload;
      return await makeApiCall({
        action: 'deleteOneFeedStock',
        urlParams: { feedStockId },
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
