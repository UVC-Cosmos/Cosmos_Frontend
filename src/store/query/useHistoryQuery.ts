import { apiInstance } from '@/api/api';
import { IHistory } from '@/interface/historyInterface';
import { useQuery } from '@tanstack/react-query';

const fetchHistory = async (): Promise<IHistory[]> => {
  const response = await apiInstance.get(`/history/`);
  return response.data;
};

export const useHistoryQuery = () => {
  return useQuery<IHistory[]>({
    queryKey: ['history'],
    queryFn: fetchHistory,
    enabled: true
  });
};
