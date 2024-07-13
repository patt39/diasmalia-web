import { SalesModel } from '@/types/sale';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOrUpdateOneSaleAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['sales'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: SalesModel & { saleId: string }) => {
      const { saleId } = payload;
      return saleId
        ? await makeApiCall({
            action: 'updateOneSale',
            body: payload,
            urlParams: { saleId },
          })
        : await makeApiCall({
            action: 'createOneSale',
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

export const getSalesAPI = async (
  payload: {
    search?: string;
    take: number;
    type?: string;
    method?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  return await makeApiCall({
    action: 'getSales',
    queryParams: payload,
  });
};

export const exportSalesAPI = async () => {
  return await makeApiCall({
    action: 'exportSales',
  });
};

export const GetSalesAPI = (
  payload: {
    search?: string;
    take: number;
    animalTypeId?: string;
    method?: string;
    sortBy?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const { take, sort, search, sortBy, method, animalTypeId, organizationId } =
    payload;
  return useInfiniteQuery({
    queryKey: ['sales', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getSales',
        queryParams: {
          take,
          sort,
          method,
          search,
          sortBy,
          animalTypeId,
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};

export const DeleteOneSaleAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['sales'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { saleId: string }) => {
      const { saleId } = payload;
      return await makeApiCall({
        action: 'deleteOneSale',
        urlParams: { saleId },
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
