import React, { useState } from 'react';
import { useAtom } from 'jotai';
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
    <div className="border rounded-lg p-6 shadow-md bg-white m-4">
      <h2 className="text-lg font-bold mb-4">공정 시간 설정</h2>
      <p>현재 공정 반복 시간: {parseFloat(no1DelayTime).toFixed(1)} 초</p>
      <div>
        <label htmlFor="delayTime" className="mr-2">
          새 공정 반복 시간:
        </label>
        <input
          id="delayTime"
          type="number"
          step="0.1"
          value={parseFloat(tempDelayTime).toFixed(1)}
          onChange={handleDelayTimeChange}
          className="border rounded px-2 py-1 mr-2"
        />
        초
        <button
          onClick={handleSendDelayTime}
          className="ml-2 px-4 py-2 bg-blue-500 text-black border rounded"
        >
          변경
        </button>
      </div>
      <p className="mt-4">시간당 생산량: {productionPerHour} 개</p>
    </div>
  );
};

export default ProcessTimeComponent;
