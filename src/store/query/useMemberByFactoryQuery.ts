import { apiInstance } from '@/api/api';
import { IMember } from '@/interface/authInterface';
import { useQuery } from '@tanstack/react-query';

const fetchUserByFactory = async (factoryId: number): Promise<IMember[]> => {
  const response = await apiInstance.get(`/factoryAdmin/factory-users/${factoryId}`);
  return response.data;
};

export const useMemberByFactoryQuery = (factoryId: number) => {
  return useQuery<IMember[]>({
    queryKey: ['factoryMembers'],
    queryFn: () => fetchUserByFactory(factoryId),
    enabled: true
  });
};
