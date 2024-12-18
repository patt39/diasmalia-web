import { FinancesModel } from '@/types/finance';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const GetFinancesAnalyticAPI = (payload: {
  periode?: string;
  days?: string;
  months?: string;
  year?: string;
  organizationId?: string;
}) => {
  const { year, months, days, organizationId } = payload;
  return useQuery({
    queryKey: ['finance-analytics', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getFinanceAnalytics',
        queryParams: {
          year,
          months,
          days,
          organizationId,
        },
      }),
  });
};

export const CreateOrUpdateOneFinanceAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['finances'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: FinancesModel & { financeId: string }) => {
      const { financeId } = payload;
      return financeId
        ? await makeApiCall({
            action: 'updateOneFinance',
            body: payload,
            urlParams: { financeId },
          })
        : await makeApiCall({
            action: 'createOneFinance',
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

export const GetFinancesAPI = (
  payload: {
    search?: string;
    take?: number;
    type?: string;
    periode?: string;
    animalTypeId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const { take, sort, search, periode, sortBy, type, organizationId } = payload;
  return useInfiniteQuery({
    queryKey: ['finances', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getFinances',
        queryParams: {
          take,
          sort,
          type,
          search,
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

export const GetOneFinanceAPI = (payload: { financeId: string }) => {
  const { financeId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['finance', financeId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneFinance',
        urlParams: { financeId },
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
