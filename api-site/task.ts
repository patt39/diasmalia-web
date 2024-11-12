import { TaskModel } from '@/types/task';
import { makeApiCall, PaginationRequest } from '@/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const ViewTaskAPI = (payload: { taskId: string }) => {
  const { taskId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () =>
      await makeApiCall({
        action: 'viewTask',
        urlParams: { taskId },
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

export const AssigneTaskAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['tasks'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: TaskModel) => {
      await makeApiCall({
        action: 'assigneTask',
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

export const UpdateTaskAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['tasks'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { taskId: string }) => {
      const { taskId } = payload;
      return await makeApiCall({
        action: 'updateTask',
        body: { ...payload },
        urlParams: { taskId },
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

export const GetTasksAPI = (
  payload: {
    take: number;
    sortBy: string;
    type?: string;
    periode?: string;
    pageItem?: number;
    frequency?: string;
    animalTypeId?: string;
    contributorId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const {
    take,
    sort,
    type,
    sortBy,
    search,
    pageItem,
    periode,
    frequency,
    animalTypeId,
    contributorId,
    organizationId,
  } = payload;
  return useQuery({
    queryKey: ['tasks', { ...payload }],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await makeApiCall({
        action: 'getTasks',
        queryParams: {
          take,
          sort,
          type,
          search,
          sortBy,
          periode,
          frequency,
          animalTypeId,
          contributorId,
          page: pageItem,
          organizationId,
        },
      }),
    staleTime: 6000,
  });
};

export const DeleteOneTaskAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['tasks'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { taskId: string }) => {
      const { taskId } = payload;
      return await makeApiCall({
        action: 'deleteTask',
        urlParams: { taskId },
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
