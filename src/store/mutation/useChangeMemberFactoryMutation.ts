import { apiInstance } from '@/api/api';
import { IFactory } from '@/interface/authInterface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const changeUserFactory = async (memberId: number, factory: string[]) => {
  await apiInstance.put(`/admin/update-user-factory/${memberId}`, {
    factoryNames: factory
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
