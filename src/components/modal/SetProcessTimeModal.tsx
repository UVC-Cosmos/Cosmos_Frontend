import { No1DelayTimeAtom } from '@/atom/mqtt/mqttAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';

interface ComponentProps {
  toggleSetting: () => void;
  sendMessage: (command: string, value: string) => void;
}

export const SetProcessTimeModal = ({
  sendMessage,
  toggleSetting
}: ComponentProps): JSX.Element => {
  const [no1DelayTime] = useAtom(No1DelayTimeAtom);
  const [tempDelayTime, setTempDelayTime] = useState(no1DelayTime);

  const handleDelayTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempDelayTime(event.target.value);
  };

  const handleSendDelayTime = () => {
    sendMessage('14', (parseFloat(tempDelayTime) * 10).toString());
    toggleSetting();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bgComp p-4 rounded-lg">
        <h2 className="text-white text-xl">공정 반복 시간 설정</h2>
        <div className="flex flex-row gap-2 mt-4">
          <div className="relative inline-block">
            <input
              id="delayTime"
              type="number"
              step="0.1"
              min={0}
              value={parseFloat(tempDelayTime).toFixed(1)}
              onChange={handleDelayTimeChange}
              className="border rounded px-2 py-1 mr-2 pr-10 w-24"
            />
            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-textGray01">
              sec
            </span>
          </div>
          <button
            onClick={handleSendDelayTime}
            className="ml-2 px-4 py-1 bg-white text-black border rounded"
          >
            변경
          </button>
          <button className="bg-white text-black border px-4 py-1 rounded" onClick={toggleSetting}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
