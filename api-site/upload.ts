//import { UploadFolderType } from '@/types/upload';
import { ImagesModel } from '@/types/profile';
import { PaginationRequest } from '@/utils';
import { makeApiCall } from '@/utils/end-point';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { RcFile } from 'antd/es/upload';

export const CreateOrUpdateOnePostGalleryAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['images'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: ImagesModel): Promise<any> => {
      const { newImageLists } = payload;
      let data = new FormData();
      data.append('description', `${payload.description ?? ''}`);
      newImageLists?.length > 0 &&
        newImageLists?.forEach((file: any) => {
          data.append('attachmentImages', file?.originFileObj as RcFile);
        });

      await makeApiCall({
        action: 'addImage',
        body: data,
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

export const GetImagesAPI = (
  payload: {
    take: number;
    userCreatedId?: string;
    organizationId?: string;
  } & PaginationRequest,
) => {
  const { take, sort, sortBy, organizationId, userCreatedId } = payload;
  return useInfiniteQuery({
    queryKey: ['images', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getImages',
        queryParams: {
          take,
          sort,
          sortBy,
          userCreatedId,
          organizationId,
          page: pageParam,
        },
      }),
    initialPageParam: 1,
  });
};

export const DeleteOneImageAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['images'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { imageId: string }) => {
      const { imageId } = payload;
      return await makeApiCall({
        action: 'deleteOneImage',
        urlParams: { imageId },
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
