import { apiInstance } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteMember = async (memberId: number) => {
  await apiInstance.delete(`/admin/delete-user/${memberId}`);
};
export const useDeleteMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allMembers'] });
    }
  });
};
