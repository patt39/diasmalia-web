import { ContactsModel } from '@/types/contact';
import { makeApiCall } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const GetOneContactMessageAPI = (payload: { contactId: string }) => {
  const { contactId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['contact', contactId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneContact',
        urlParams: { contactId },
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

export const SendContactAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['contacts'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: ContactsModel) => {
      await makeApiCall({
        action: 'sendContact',
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
