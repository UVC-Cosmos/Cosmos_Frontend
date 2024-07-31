import { useAtom } from 'jotai';
import React from 'react';
import { No1ChipEmptyAtom, No2CubeFullAtom } from '../../atom/mqtt/mqttAtom';

const MaterialStatusComponent: React.FC = () => {
  const [no1ChipEmpty] = useAtom(No1ChipEmptyAtom);
  const [no2CubeFull] = useAtom(No2CubeFullAtom);

  const getBlinkingStyle = (isEmpty: boolean) => ({
    color: isEmpty ? 'red' : 'green',
    animation: isEmpty ? 'blinking 1s infinite' : 'none'
  });

  return (
    <div className="p-2 bg-bgComp h-[100%]">
      <h2 className="text-base font-bold mb-4 text-white">자재 유무</h2>
      <p style={getBlinkingStyle(no1ChipEmpty.toString() === 'true')}>
        1호기 칩: {no1ChipEmpty.toString() === 'true' ? '자재 없음!' : '생산 가능'}
      </p>
      <p style={getBlinkingStyle(no2CubeFull.toString() === 'true')}>
        2호기 칩: {no2CubeFull.toString() === 'true' ? '자재 없음!' : '생산 가능'}
      </p>
    </div>
  );
};

export default MaterialStatusComponent;
