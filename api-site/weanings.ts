import { WeaningsModel } from '@/types/weanings';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const GetOneWeaningAPI = (payload: { farrowingId: string }) => {
  const { farrowingId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['weaning', farrowingId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneWeaning',
        urlParams: { farrowingId },
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

export const GetOneAnimalWeanedAPI = (payload: { animalId: string }) => {
  const { animalId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['weaning', animalId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneAnimalWeaned',
        urlParams: { animalId },
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

export const CreateOrUpdateOneWeaningAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['weanings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: WeaningsModel & { weaningId: string }) => {
      const { weaningId } = payload;
      return weaningId
        ? await makeApiCall({
            action: 'updateOneWeaning',
            body: payload,
            urlParams: { weaningId },
          })
        : await makeApiCall({
            action: 'createOneWeaning',
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

export const GetWeaningsAPI = (
  payload: {
    search?: string;
    take?: number;
    periode?: string;
    pageItem?: number;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const {
    take,
    sort,
    pageItem,
    search,
    periode,
    sortBy,
    animalTypeId,
    organizationId,
  } = payload;
  return useQuery({
    queryKey: ['weanings', { ...payload }],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await makeApiCall({
        action: 'getWeanings',
        queryParams: {
          take,
          sort,
          search,
          sortBy,
          periode,
          animalTypeId,
          page: pageItem,
          organizationId,
        },
      }),
    staleTime: 6000,
  });
};

export const GetBirthAnalyticAPI = (payload: {
  periode?: string;
  days?: string;
  months?: string;
  year?: string;
  animalTypeId?: string;
  organizationId?: string;
}) => {
  const { year, months, days, animalTypeId, organizationId } = payload;
  return useQuery({
    queryKey: ['birth-analytics', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getBirthAnalytics',
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

export const DeleteOneWeaningAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['weanings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { weaningId: string }) => {
      const { weaningId } = payload;
      return await makeApiCall({
        action: 'deleteOneWeaning',
        urlParams: { weaningId },
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
