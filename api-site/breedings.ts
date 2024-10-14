import { makeApiCall, PaginationRequest } from '@/utils';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const GetOneBreedingAPI = (payload: { breedingId: string }) => {
  const { breedingId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['breeding', breedingId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneBreeding',
        urlParams: { breedingId },
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

export const GetOneMaleBreedingAPI = (payload: { animalMaleId: string }) => {
  const { animalMaleId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['breeding', animalMaleId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneMaleBreeding',
        urlParams: { animalMaleId },
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

export const CreateOrUpdateOneBreedingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['breedings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { breedingId: string }) => {
      const { breedingId } = payload;
      return breedingId
        ? await makeApiCall({
            action: 'updateOneBreeding',
            body: payload,
            urlParams: { breedingId },
          })
        : await makeApiCall({
            action: 'createOneBreeding',
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

export const CreateOneCheckAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['breedings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { breedingId: string }) => {
      const { breedingId } = payload;
      return await makeApiCall({
        action: 'createOneCheck',
        body: { ...payload },
        urlParams: { breedingId },
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

export const UpdateOneCheckAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['breedings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { checkPregnancyId: string }) => {
      const { checkPregnancyId } = payload;
      return await makeApiCall({
        action: 'updateOneCheck',
        body: { ...payload },
        urlParams: { checkPregnancyId },
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

export const GetBreedingsAPI = (
  payload: {
    search?: string;
    take?: number;
    periode?: string;
    sort?: string;
    sortBy?: string;
    animalId?: string;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const {
    take,
    sort,
    search,
    periode,
    sortBy,
    animalId,
    animalTypeId,
    organizationId,
  } = payload;
  return useInfiniteQuery({
    queryKey: ['breedings', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getBreedings',
        queryParams: {
          take,
          sort,
          search,
          sortBy,
          periode,
          animalId,
          animalTypeId,
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 5000,
    initialPageParam: 1,
  });
};

export const GetBreedingHistoryAPI = (
  payload: {
    search?: string;
    take?: number;
    periode?: string;
    sort?: string;
    sortBy?: string;
    animalId?: string;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const {
    take,
    sort,
    search,
    periode,
    sortBy,
    animalId,
    animalTypeId,
    organizationId,
  } = payload;
  return useInfiniteQuery({
    queryKey: ['breedings', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getBreedingHistory',
        queryParams: {
          take,
          sort,
          search,
          sortBy,
          periode,
          animalId,
          animalTypeId,
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 5000,
    initialPageParam: 1,
  });
};

export const DeleteOneBreedingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['breedings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { breedingId: string }) => {
      const { breedingId } = payload;
      return await makeApiCall({
        action: 'deleteOneBreeding',
        urlParams: { breedingId },
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
