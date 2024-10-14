import { GestationsModel } from '@/types/gestation';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const GetOneGestationAPI = (payload: { gestationId: string }) => {
  const { gestationId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['gestation', gestationId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneGestation',
        urlParams: { gestationId },
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

export const UpdateOneGestationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['gestations'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: GestationsModel & { gestationId: string }) => {
      const { gestationId } = payload;
      return gestationId
        ? await makeApiCall({
            action: 'updateOneGestation',
            body: payload,
            urlParams: { gestationId },
          })
        : await makeApiCall({
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

export const GetGestationsAPI = (
  payload: {
    search?: string;
    take: number;
    sortBy: string;
    periode?: string;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const { take, sort, search, periode, animalTypeId, sortBy, organizationId } =
    payload;
  return useInfiniteQuery({
    queryKey: [
      'gestations',
      'breedings',
      'farrowings',
      'infinite',
      { ...payload },
    ],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getGestations',
        queryParams: {
          take,
          sort,
          search,
          sortBy,
          periode,
          animalTypeId,
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};

export const DeleteOneGestationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['gestations'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { gestationId: string }) => {
      const { gestationId } = payload;
      return await makeApiCall({
        action: 'deleteOneGestation',
        urlParams: { gestationId },
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
