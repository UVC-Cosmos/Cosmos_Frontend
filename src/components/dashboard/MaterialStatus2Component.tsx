import { No2CubeFullAtom } from '@/atom/mqtt/mqttAtom';
import { useAtom } from 'jotai';

export const MaterialStatus2Component = () => {
  const [no2CubeFull] = useAtom(No2CubeFullAtom);

  const getBlinkingStyle = (isEmpty: boolean) => ({
    color: isEmpty ? 'red' : 'green',
    animation: isEmpty ? 'blinking 1s infinite' : 'none',
    borderColor: isEmpty ? 'red' : 'green'
  });

  return (
    <div className="p-2 bg-bgComp h-[100%]">
      <div className="flex flex-row justify-center items-center gap-2 w-[100%] h-[100%]">
        <div
          className="stats shadow bg-bgLayout border w-[80%]"
          style={getBlinkingStyle(no2CubeFull.toString() === 'true')}
        >
          <div className="stat">
            <div className="stat-title text-white text-center">2호기 자재 유무</div>
            <div className="stat-value text-center">
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
