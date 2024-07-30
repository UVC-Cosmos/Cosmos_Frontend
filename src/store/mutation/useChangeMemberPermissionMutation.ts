import { apiInstance } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const changeUserPermission = async (memberId: number, lines: string[]) => {
  await apiInstance.put(`/factoryAdmin/user-line-control/${memberId}`, {
    lines: lines
  });
};

export const useChangeMemberPermissionMutation = () => {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { memberId: number; lines: string[] }) =>
      changeUserPermission(variables.memberId, variables.lines),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['factoryMembers'] });
    }
  });
};
