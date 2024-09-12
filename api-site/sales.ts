import { SalesModel } from '@/types/sale';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const GetOneSaleAPI = (payload: { saleId: string }) => {
  const { saleId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['sale', saleId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneSale',
        urlParams: { saleId },
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as any,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const SalesPdfDownloadAPI = async (payload: { saleId: string }) => {
  const { saleId } = payload;
  const data = await makeApiCall({
    action: 'downloadSalePdf',
    urlParams: { saleId },
  });
  return data;
};

export const GetOneSaleAnimalTypeAPI = (payload: { animalTypeId: string }) => {
  const { animalTypeId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['sale', animalTypeId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneSaleAnimalType',
        urlParams: { animalTypeId },
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as any,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

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

export const CreateOrUpdateAvesSaleAPI = ({
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
            action: 'updateOneAvesSale',
            body: payload,
            urlParams: { saleId },
          })
        : await makeApiCall({
            action: 'createOneAvesSale',
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

export const exportSalesAPI = async () => {
  return await makeApiCall({
    action: 'exportSales',
  });
};

export const GetSalesAPI = (
  payload: {
    take: number;
    search?: string;
    periode?: string;
    method?: string;
    detail?: string;
    sortBy?: string;
    pageItem?: number;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const {
    take,
    sort,
    search,
    sortBy,
    method,
    detail,
    periode,
    pageItem,
    animalTypeId,
    organizationId,
  } = payload;
  return useQuery({
    queryKey: ['sales', { ...payload }],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await makeApiCall({
        action: 'getSales',
        queryParams: {
          take,
          sort,
          method,
          search,
          sortBy,
          detail,
          periode,
          animalTypeId,
          page: pageItem,
          organizationId,
        },
      }),
    staleTime: 5000,
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
