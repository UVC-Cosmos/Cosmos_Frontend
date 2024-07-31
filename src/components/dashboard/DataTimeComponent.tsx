import React from 'react';
import { useAtom } from 'jotai';
import { DataTimeAtom } from '../../atom/mqtt/mqttAtom';

const DataTimeComponent: React.FC = () => {
  const [dataTime] = useAtom(DataTimeAtom);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours() - 9).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}년${month}월${day}일 ${hours}시${minutes}분${seconds}초`;
  };

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white m-4">
      <h2 className="text-lg font-bold mb-4">데이터 수집 시간</h2>
      <p>{formatDateTime(dataTime)}</p>
    </div>
  );
};

export default DataTimeComponent;
