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

export const GetSuggestionsAPI = (
  payload: {
    take?: number;
    userId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const { take, sort, sortBy, userId, organizationId } = payload;
  return useInfiniteQuery({
    queryKey: ['suggestions', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getSuggestions',
        queryParams: {
          take,
          sort,
          sortBy,
          userId,
          organizationId,
          page: pageParam,
        },
      }),
    staleTime: 6000,
    initialPageParam: 1,
  });
};

export const DeleteOneSuggestionAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['suggestions'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { suggestionId: string }) => {
      const { suggestionId } = payload;
      return await makeApiCall({
        action: 'deleteOneSuggestion',
        urlParams: { suggestionId },
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
