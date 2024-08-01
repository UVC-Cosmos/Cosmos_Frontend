import { useAtom } from 'jotai';
import React from 'react';
import { No1ChipEmptyAtom, No2CubeFullAtom } from '../../atom/mqtt/mqttAtom';

const MaterialStatusComponent: React.FC = () => {
  const [no1ChipEmpty] = useAtom(No1ChipEmptyAtom);
  const [no2CubeFull] = useAtom(No2CubeFullAtom);

  const getBlinkingStyle = (isEmpty: boolean) => ({
    color: isEmpty ? 'red' : 'green',
    animation: isEmpty ? 'blinking 1s infinite' : 'none',
    borderColor: isEmpty ? 'red' : 'green'
  });

  return (
    <div className="p-2 bg-bgComp h-[100%]">
      <h2 className="text-sm font-bold text-white mb-4">자재 유무</h2>
      <div className="flex flex-row justify-around items-center gap-2 w-[100%] h-[70%]">
        <div
          className="stats shadow bg-bgLayout border"
          style={getBlinkingStyle(no1ChipEmpty.toString() === 'true')}
        >
          <div className="stat">
            <div className="stat-title text-white">1호기 칩</div>
            <div className="stat-value">
              <p style={getBlinkingStyle(no1ChipEmpty.toString() === 'true')}>
                {no1ChipEmpty.toString() === 'true' ? '자재 없음!' : '생산 가능'}
              </p>
            </div>
          </div>
        </div>

        <div
          className="stats shadow bg-bgLayout border"
          style={getBlinkingStyle(no2CubeFull.toString() === 'true')}
        >
          <div className="stat">
            <div className="stat-title text-white">2호기 칩</div>
            <div className="stat-value">
              <p style={getBlinkingStyle(no2CubeFull.toString() === 'true')}>
                {no2CubeFull.toString() === 'true' ? '자재 없음!' : '생산 가능'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialStatusComponent;
