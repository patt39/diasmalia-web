import { FaqsModel } from '@/types/faq';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOrUpdateFaqAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['faqs'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: FaqsModel & { faqId: string }) => {
      const { faqId } = payload;
      return faqId
        ? await makeApiCall({
            action: 'updateFaq',
            body: payload,
            urlParams: { faqId },
          })
        : await makeApiCall({
            action: 'createFaq',
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

export const GetFaqsAPI = (
  payload: {
    take?: number;
  } & PaginationRequest,
) => {
  const { take, sort, sortBy } = payload;
  return useInfiniteQuery({
    queryKey: ['faqs', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getFaqs',
        queryParams: {
          take,
          sort,
          sortBy,
          page: pageParam,
        },
      }),
    staleTime: 6000,
    initialPageParam: 1,
  });
};
