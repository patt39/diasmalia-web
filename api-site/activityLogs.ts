import { makeApiCall, PaginationRequest } from '@/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

export const GetActivityLogsAPI = (
  payload: {
    take?: number;
    sortBy: string;
    periode?: string;
  } & PaginationRequest,
) => {
  const { take, sort, sortBy, periode, organizationId } = payload;
  return useInfiniteQuery({
    queryKey: ['activityLogs', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getActivityLogs',
        queryParams: {
          take,
          sort,
          sortBy,
          periode,
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};
