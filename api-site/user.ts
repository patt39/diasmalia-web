import { UserModel } from '@/types/user';
import { makeApiCall } from '@/utils';
import { useQuery } from '@tanstack/react-query';

export const IpLocationAPI = () => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['ip-location'],
    queryFn: async () =>
      await makeApiCall({
        action: 'ipLocation',
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const GetOneUserMeAPI = () => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneUserMe',
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as UserModel,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};
