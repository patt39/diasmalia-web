import { BlogsModel } from '@/types/blog';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const ViewBlogAPI = (payload: { slug: string }) => {
  const { slug } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['blog', slug],
    queryFn: async () =>
      await makeApiCall({
        action: 'viewBlog',
        urlParams: { slug },
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

export const CreateOrUpdateBlogAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['blogs'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: BlogsModel & { blogId: string }) => {
      const { blogId } = payload;
      return blogId
        ? await makeApiCall({
            action: 'updateBlog',
            body: payload,
            urlParams: { blogId },
          })
        : await makeApiCall({
            action: 'createBlog',
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

export const GetBlogsAPI = (
  payload: {
    take?: number;
  } & PaginationRequest,
) => {
  const { take, sort, sortBy } = payload;
  return useInfiniteQuery({
    queryKey: ['blogs', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getBlogs',
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
