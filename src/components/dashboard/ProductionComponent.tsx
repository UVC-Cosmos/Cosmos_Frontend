import React from 'react';
import { useAtom } from 'jotai';
import { No1CountAtom, No2CountAtom, No3CountAtom } from '../../atom/mqtt/mqttAtom';

const ProductionComponent: React.FC = () => {
  const [no1Count] = useAtom(No1CountAtom);
  const [no2Count] = useAtom(No2CountAtom);
  const [no3Count] = useAtom(No3CountAtom);

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white m-4">
      <p className="text-lg font-bold">1호기 생산량: {no1Count}</p>
      <p className="text-lg font-bold">2호기 생산량: {no2Count}</p>
      <p className="text-lg font-bold">3호기 생산량: {no3Count}</p>
    </div>
  );
};

export default ProductionComponent;
