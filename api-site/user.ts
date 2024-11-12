import { makeApiCall } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const IpLocationAPI = () => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['ip-location'],
    queryFn: async () =>
      await makeApiCall({
        action: 'ipLocation',
      }),
    staleTime: 6000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const GetOneUserMeAPI = () => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['user', 'change-organization'],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneUserMe',
      }),
    staleTime: 6000,
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

export const GetUserByOrganizationAPI = (payload: {
  organizationId: string;
}) => {
  const { organizationId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['user-organization', organizationId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getUserByOrganization',
        urlParams: { organizationId },
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

export const ChangeOrganizationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['change-organization'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { organizationId: string }) => {
      const { organizationId } = payload;
      return await makeApiCall({
        action: 'changeOrganization',
        urlParams: { organizationId },
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

export const logoutUsersAPI = async (): Promise<any> => {
  await makeApiCall({
    action: 'logoutUsers',
  });
};

export const VerifyTokenAPI = (payload: { token: string }) => {
  const { token } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['token', token],
    queryFn: async () =>
      await makeApiCall({
        action: 'verifyToken',
        urlParams: { token },
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

export const CntributorConfirmationAPI = (payload: { token: string }) => {
  const { token } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['token', token],
    queryFn: async () =>
      await makeApiCall({
        action: 'contributorConfirmation',
        urlParams: { token },
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

export const ContributorConfirmationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['token'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { token: string }) => {
      const { token } = payload;
      return await makeApiCall({
        action: 'contributorConfirmation',
        body: { ...payload },
        urlParams: { token },
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

export const InvitationConfirmationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['token'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { token: string }) => {
      const { token } = payload;
      return await makeApiCall({
        action: 'contributorInvitationConfirmation',
        urlParams: { token },
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

export const CollaborationRejectionAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['token'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { token: string }) => {
      const { token } = payload;
      return await makeApiCall({
        action: 'collaborationRejection',
        urlParams: { token },
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
