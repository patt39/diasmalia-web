import { CagesModel } from '@/types/animal';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const PutInCagesAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['cages'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: CagesModel) => {
      return await makeApiCall({
        action: 'putInCages',
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

export const UpdateOneCageAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['cages'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { cageId: string }) => {
      const { cageId } = payload;
      return await makeApiCall({
        action: 'updateCage',
        body: { ...payload },
        urlParams: { cageId },
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

export const CageEggHarvestingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['cages'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { cageId: string }) => {
      const { cageId } = payload;
      return await makeApiCall({
        action: 'cageEggHarvesting',
        body: { ...payload },
        urlParams: { cageId },
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

export const GetAnimalCagesAPI = (
  payload: {
    search?: string;
    take?: number;
    animalId?: string;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const { take, sort, search, sortBy, animalId, animalTypeId, organizationId } =
    payload;
  return useInfiniteQuery({
    queryKey: ['cages', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getAnimalCages',
        queryParams: {
          take,
          sort,
          search,
          sortBy,
          animalId,
          animalTypeId,
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 6000,
    initialPageParam: 1,
  });
};

export const DeleteOneCageAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['cages'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { cageId: string }) => {
      const { cageId } = payload;
      return await makeApiCall({
        action: 'deleteOneCage',
        urlParams: { cageId },
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

export const ArchiveOneAnimalAPI = ({
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
        action: 'archiveOneAnimal',
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
