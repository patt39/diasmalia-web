import { FarrowingsModel } from '@/types/farrowing';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const GetOneFarrowingAPI = (payload: { farrowingId: string }) => {
  const { farrowingId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['farrowing', farrowingId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneFarrowing',
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

export const GetOneFarrowingByAnimalIdAPI = (payload: { animalId: string }) => {
  const { animalId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['farrowing', animalId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneFarrowingByAnimalId',
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

export const CreateOrUpdateOneFarrowingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['farrowings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: FarrowingsModel & { farrowingId?: string }) => {
      const { farrowingId, image } = payload;
      let data = new FormData();

      data.append('death', `${payload.death ?? ''}`);
      // data.append('weight', `${payload.weight ?? ''}`);
      // data.append('litter', `${payload.litter ?? ''}`);
      data.append('note', `${payload.note ?? ''}`);
      data.append('image', image);

      return farrowingId
        ? await makeApiCall({
            action: 'updateOneFarrowing',
            body: data,
            urlParams: { farrowingId },
          })
        : await makeApiCall({
            action: 'createOneFarrowing',
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

export const GetFarrowingsAPI = (
  payload: {
    search?: string;
    take?: number;
    periode?: string;
    pageItem: number;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const {
    take,
    sort,
    search,
    pageItem,
    sortBy,
    periode,
    animalTypeId,
    organizationId,
  } = payload;
  return useQuery({
    queryKey: ['farrowings', { ...payload }],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await makeApiCall({
        action: 'getFarrowings',
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
    staleTime: 5000,
  });
};

export const DeleteOneFarrowingAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['farrowings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { farrowingId: string }) => {
      const { farrowingId } = payload;
      return await makeApiCall({
        action: 'deleteOneFarrowing',
        urlParams: { farrowingId },
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
