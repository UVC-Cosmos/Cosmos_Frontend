import { apiInstance } from '@/api/api';
import { IHistory } from '@/interface/historyInterface';
import { useQuery } from '@tanstack/react-query';

const fetchHistory = async (date: number): Promise<IHistory[]> => {
  const response = await apiInstance.get(`/history/:${date}`);
  return response.data;
};

export const useHistoryQuery = (date: number) => {
  return useQuery<IHistory[]>({
    queryKey: ['history', date],
    queryFn: () => fetchHistory(date),
    enabled: true
  });
};
