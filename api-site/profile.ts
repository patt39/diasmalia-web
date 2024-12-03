import { ProfileFormModel, ProfileModel } from '@/types/profile';
import { PaginationRequest } from '@/utils';
import { makeApiCall } from '@/utils/end-point';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const UpdateOneProfileAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['profile'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: ProfileFormModel & { profileId: string },
    ): Promise<any> => {
      const { image, profileId } = payload;
      let data = new FormData();
      data.append('occupation', `${payload.occupation ?? ''}`);
      data.append('currencyId', `${payload.currencyId ?? ''}`);
      data.append('countryId', `${payload.countryId ?? ''}`);
      data.append('address', `${payload.address ?? ''}`);
      data.append('phone', `${payload.phone ?? ''}`);
      data.append('lastName', `${payload.lastName ?? ''}`);
      data.append('firstName', `${payload.firstName ?? ''}`);
      data.append('city', `${payload.city ?? ''}`);
      data.append('description', `${payload.description ?? ''}`);
      data.append('testimonial', `${payload.testimonial ?? ''}`);
      data.append('image', image);

      await makeApiCall({
        action: 'updateOneProfile',
        body: data,
        urlParams: { profileId },
      });

      return 'Ok';
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

export const GetOneProfileAPI = (payload: { profileId: string }) => {
  const { profileId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['profile', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneProfile',
        urlParams: { profileId },
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as ProfileModel | any,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const GetAllCurrenciesAPI = (
  payload: {
    status?: boolean;
    take?: number;
  } & PaginationRequest,
) => {
  const { take, sort, sortBy, status } = payload;
  return useInfiniteQuery({
    queryKey: ['currencies', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getAllCurrencies',
        queryParams: {
          take,
          sort,
          sortBy,
          status,
          page: pageParam,
        },
      }),
    staleTime: 6000,
    initialPageParam: 1,
  });
};

export const GetAllCountiesAPI = (
  payload: {
    search?: string;
    take?: number;
    status?: boolean;
  } & PaginationRequest,
) => {
  const { take, sort, sortBy, status } = payload;
  return useInfiniteQuery({
    queryKey: ['countries', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getAllCounties',
        queryParams: {
          take,
          sort,
          sortBy,
          status,
          page: pageParam,
        },
      }),
    staleTime: 6000,
    initialPageParam: 1,
  });
};

export const getOneFileProfileAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/users/file/${fileName}`
    : null;
