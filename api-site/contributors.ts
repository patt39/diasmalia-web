import { makeApiCall, PaginationRequest } from '@/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

export const GetContributorsAPI = (
  payload: {
    search?: string;
    take: number;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const { take, sort, search, organizationId } = payload;
  return useInfiniteQuery({
    queryKey: ['contributors', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getContributors',
        queryParams: {
          take,
          sort,
          search,
          organizationId,
          page: pageParam,
        },
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};
