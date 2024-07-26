import React from 'react';
import { useAtom } from 'jotai';
import { No3Motor1PositionAtom, No3Motor2PositionAtom } from '../../atom/mqtt/mqttAtom';

const AxisPositionComponent: React.FC = () => {
  const [motor1Position] = useAtom(No3Motor1PositionAtom);
  const [motor2Position] = useAtom(No3Motor2PositionAtom);

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white m-4">
      <h2 className="text-lg font-bold mb-4">3호기 모터 위치</h2>
      <p>3호기 1축 위치: {motor1Position}</p>
      <p>3호기 2축 위치: {motor2Position}</p>
    </div>
  );
};

export default AxisPositionComponent;
