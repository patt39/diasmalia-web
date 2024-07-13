import {
  AssignedTypeFormModel,
  AssignedTypeModel,
  ResponseAssignedTypeModel,
} from '@/types/assigned-type';
import { makeApiCall, PaginationRequest, SortModel } from '@/utils';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const createAssignedTypeAPI = async (
  payload: AssignedTypeFormModel,
): Promise<{ data: AssignedTypeModel }> => {
  return await makeApiCall({
    action: 'createAssignedType',
    body: payload,
  });
};

export const getAssignedTypeAPI = async (
  payload: PaginationRequest,
): Promise<{ data: ResponseAssignedTypeModel }> => {
  return await makeApiCall({
    action: 'getAssignedTypes',
    queryParams: payload,
  });
};

export const GetAssignedTypesAPI = (payload: {
  take?: number;
  sort: SortModel;
  sortBy: string;
}) => {
  return useInfiniteQuery({
    queryKey: ['assignedTypes', 'infinite', { ...payload }],
    queryFn: async ({ pageParam = 1 }) =>
      await getAssignedTypeAPI({
        ...payload,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page ?? undefined,
  });
};

export const DeleteOneAssignedTypeAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['assignedTypes'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { assignTypeId: string }) => {
      const { assignTypeId } = payload;
      return await makeApiCall({
        action: 'deleteOneAssignedType',
        urlParams: { assignTypeId },
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
