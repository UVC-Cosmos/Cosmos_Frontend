import { apiInstance } from '@/api/api';
import { IMember } from '@/interface/authInterface';
import { useQuery } from '@tanstack/react-query';

const fetchUser = async (): Promise<IMember[]> => {
  const response = await apiInstance.get('/admin/get-all-users');
  return response.data;
};

export const useMemberQuery = () => {
  return useQuery<IMember[]>({
    queryKey: ['allMembers'],
    queryFn: fetchUser
  });
};
