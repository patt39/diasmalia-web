import { IncubationsModel } from '@/types/incubation';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const GetOneIncubationAPI = (payload: { animalId: string }) => {
  const { animalId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['incubation', animalId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneIncubation',
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

export const CreateOneIncubationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['incubations'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: IncubationsModel) => {
      await makeApiCall({
        action: 'createOneIncubation',
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

export const UpdateOneIncubationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['incubations'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: IncubationsModel & { incubationId: string },
    ) => {
      const { incubationId } = payload;
      return await makeApiCall({
        action: 'updateOneIncubation',
        body: { ...payload },
        urlParams: { incubationId },
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

export const GetIncubationsAPI = (
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
    queryKey: ['incubations', { ...payload }],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await makeApiCall({
        action: 'getIncubations',
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

export const GetIncubationsAnalyticAPI = (payload: {
  periode?: string;
  days?: string;
  months?: string;
  year?: string;
  animalTypeId?: string;
  organizationId?: string;
}) => {
  const { year, months, days, animalTypeId, organizationId } = payload;
  return useQuery({
    queryKey: ['incubations-analytics', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getIncubationsAnalytics',
        queryParams: {
          year,
          months,
          days,
          animalTypeId,
          organizationId,
        },
      }),
    //staleTime: 6000,
  });
};

export const DeleteOneIncubationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['incubations'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { incubationId: string }) => {
      const { incubationId } = payload;
      return await makeApiCall({
        action: 'deleteOneIncubation',
        urlParams: { incubationId },
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
