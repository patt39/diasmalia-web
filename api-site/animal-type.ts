import { makeApiCall, PaginationRequest } from '@/utils';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const GetOneAnimalTypeAPI = (payload: { animalTypeId: string }) => {
  const { animalTypeId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['animalType', animalTypeId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneAnimalType',
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

export const GetInfiniteAnimalTypesAPI = (
  payload: {
    take: number;
    sortBy: string;
    status: string;
  } & PaginationRequest,
) => {
  const { take, sort, sortBy, organizationId } = payload;
  return useInfiniteQuery({
    queryKey: ['animal-types', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getAnimalTypes',
        queryParams: {
          take,
          sort,
          sortBy,
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 6000,
    initialPageParam: 1,
  });
};
