import { DiceComparisonValueAtom } from '@/atom/mqtt/mqttAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';

interface ComponentProps {
  toggleSetting: () => void;
  sendMessage: (command: string, value: string) => void;
  setDice: (value: string) => void;
}

export const SetDiceValueModal = ({ toggleSetting, sendMessage, setDice }: ComponentProps) => {
  const [diceComparisonValue] = useAtom(DiceComparisonValueAtom);
  const [tempComparisonValue, setTempComparisonValue] = useState(diceComparisonValue);

  const handleComparisonValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempComparisonValue(event.target.value);
  };

  const handleSendComparisonValue = () => {
    setDice(tempComparisonValue);
    sendMessage('38', tempComparisonValue); // 서버로 값 전송
    toggleSetting();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute w-56 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bgComp p-4 rounded-lg">
        <h2 className="text-white text-xl">주사위 값 설정</h2>
        <div className="flex flex-col gap-2 mt-4">
          <div>
            <input
              id="comparisonValue"
              type="number"
              step="1"
              min={1}
              max={6}
              value={tempComparisonValue}
              onChange={handleComparisonValueChange}
              className="border rounded px-2 py-1 pr-10 w-full" // pr-10으로 오른쪽 여백 추가
            />
          </div>
          <div className="flex flex-row w-full gap-2 justify-end items-center">
            <button
              onClick={handleSendComparisonValue}
              className="px-4 py-1 bg-white text-black border rounded"
            >
              변경
            </button>
            <button
              className="bg-white text-black border px-4 py-1 rounded"
              onClick={toggleSetting}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
