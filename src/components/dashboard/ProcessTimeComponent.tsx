import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { No1DelayTimeAtom } from '../../atom/mqtt/mqttAtom';

const ProcessTimeComponent: React.FC<{ sendMessage: (command: string, value: string) => void }> = ({
  sendMessage
}) => {
  const [no1DelayTime] = useAtom(No1DelayTimeAtom);
  const [tempDelayTime, setTempDelayTime] = useState(no1DelayTime);

  const calculateProductionPerHour = (delayTime: string) => {
    const timeInSeconds = parseFloat(delayTime);
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) return 0;
    return Math.floor(3600 / timeInSeconds);
  };

  const productionPerHour = calculateProductionPerHour(no1DelayTime);

  const handleDelayTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempDelayTime(event.target.value);
  };

  const handleSendDelayTime = () => {
    sendMessage('14', (parseFloat(tempDelayTime) * 10).toString());
  };

  return (
    <div className="bg-bgComp p-2 h-[100%]">
      <h2 className="text-sm font-bold mb-4 text-white">공정 시간 설정</h2>
      <p className="text-white">
        현재 공정 반복 시간:
        {isNaN(parseFloat(no1DelayTime)) ? null : parseFloat(no1DelayTime).toFixed(1)} 초
      </p>
      <div className="flex flex-row mt-2 items-center">
        <label htmlFor="delayTime" className="mr-2 text-white">
          새 공정 반복 시간:
        </label>
        <div className="flex flex-row items-center">
          <div className="relative inline-block">
            <input
              id="delayTime"
              type="number"
              step="0.1"
              min={0}
              value={parseFloat(tempDelayTime).toFixed(1)}
              onChange={handleDelayTimeChange}
              className="border rounded px-2 py-1 mr-2 pr-10" // pr-10으로 오른쪽 여백 추가
            />
            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-textGray01">
              sec
            </span>
          </div>
          <p className="text-white">초</p>
          <button
            onClick={handleSendDelayTime}
            className="ml-2 px-4 py-1 bg-blue-500 text-black border rounded"
          >
            변경
          </button>
        </div>
      </div>
      <p className="mt-4 text-white">시간당 생산량: {productionPerHour} 개</p>
    </div>
  );
};

export default ProcessTimeComponent;
