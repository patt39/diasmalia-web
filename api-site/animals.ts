import { AnimalModel } from '@/types/animal';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const GetAnimalStatisticsAPI = (payload: { animalTypeId: string }) => {
  const { animalTypeId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['animal', animalTypeId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getAnimalStatistics',
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

export const GetOneAnimalAPI = (payload: { animalId: string }) => {
  const { animalId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['animal', animalId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneAnimal',
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

export const CreateOrUpdateOneAnimalAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['animals'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: AnimalModel & { animalId: string }) => {
      const { animalId } = payload;
      return animalId
        ? await makeApiCall({
            action: 'updateOneAnimal',
            body: payload,
            urlParams: { animalId },
          })
        : await makeApiCall({
            action: 'createOneAnimal',
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

export const CreateOneAvesAnimalAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['animals'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: AnimalModel & { animalTypeId: string }) => {
      const { animalTypeId } = payload;
      return await makeApiCall({
        action: 'createOneAvesAnimal',
        body: { ...payload },
        urlParams: { animalTypeId },
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

export const UpdateOneAvesAnimalAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['animals'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { animalId: string }) => {
      const { animalId } = payload;
      return await makeApiCall({
        action: 'updateOneAves',
        body: { ...payload },
        urlParams: { animalId },
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

export const GetAnimalsAPI = (
  payload: {
    search?: string;
    take?: number;
    status?: string;
    gender?: string;
    isIsolated?: string;
    animalTypeId?: string;
    productionPhase?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const {
    take,
    sort,
    search,
    status,
    sortBy,
    gender,
    isIsolated,
    productionPhase,
    animalTypeId,
    organizationId,
  } = payload;
  return useInfiniteQuery({
    queryKey: ['animals', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getAnimals',
        queryParams: {
          take,
          sort,
          search,
          status,
          sortBy,
          gender,
          isIsolated,
          animalTypeId,
          productionPhase,
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};

export const DeleteOneAnimalAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['animals'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { animalId: string }) => {
      const { animalId } = payload;
      return await makeApiCall({
        action: 'deleteOneAnimal',
        urlParams: { animalId },
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
