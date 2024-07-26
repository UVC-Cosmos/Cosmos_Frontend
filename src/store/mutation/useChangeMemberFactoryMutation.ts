import { apiInstance } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const changeUserFactory = async (memberId: number, factory: string[]) => {
  await apiInstance.patch(`/member/${memberId}`, {
    factory
  });
};

export const useChangeMemberFactoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { memberId: number; factory: string[] }) =>
      changeUserFactory(variables.memberId, variables.factory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allMembers'] });
    }
  });
};
