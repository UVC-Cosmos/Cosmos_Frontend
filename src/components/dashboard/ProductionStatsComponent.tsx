import React, { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import {
  InputLimitAtom,
  No1CountAtom,
  No2CountAtom,
  No3CountAtom,
  DiceComparisonValueAtom,
  DiceValueAtom,
  No2SensingMemoryAtom
} from '../../atom/mqtt/mqttAtom';

const ProductionStatsComponent: React.FC<{
  sendMessage: (command: string, value: string) => void;
}> = ({ sendMessage }) => {
  const [inputLimit] = useAtom(InputLimitAtom);
  const [tempInputLimit, setTempInputLimit] = useState(inputLimit);
  const [no1Count] = useAtom(No1CountAtom);
  const [no2Count] = useAtom(No2CountAtom);
  const [no3Count] = useAtom(No3CountAtom);
  const [diceComparisonValue] = useAtom(DiceComparisonValueAtom);
  const [diceValue] = useAtom(DiceValueAtom);

  const calculateDefectRate = (count1: string, count2: string) => {
    const num1 = parseInt(count1, 10);
    const num2 = parseInt(count2, 10);
    if (isNaN(num1) || isNaN(num2) || num1 === 0) return 0;
    return ((num1 - num2) / num1) * 100;
  };

  const [previousNo1Count, setPreviousNo1Count] = useState<number>(
    isNaN(parseInt(no1Count, 10)) ? 0 : parseInt(no1Count, 10)
  );
  const [previousNo2Count, setPreviousNo2Count] = useState<number>(
    isNaN(parseInt(no2Count, 10)) ? 0 : parseInt(no2Count, 10)
  );
  const [chipDefectRate, setChipDefectRate] = useState<number>(0);
  const [diceDefectRate, setDiceDefectRate] = useState<number>(0);
  const [no2SensingMemory] = useAtom(No2SensingMemoryAtom);
  const sensingMemoryRef = useRef(no2SensingMemory);

  useEffect(() => {
    sensingMemoryRef.current = no2SensingMemory;
  }, [no2SensingMemory]);

  useEffect(() => {
    if (parseInt(no1Count, 10) > previousNo1Count) {
      const timeoutId = setTimeout(() => {
        if (sensingMemoryRef.current.toString() === 'true') {
          setChipDefectRate(calculateDefectRate(no1Count, no2Count)); // 정상이라도 불량률을 계산
        } else {
          setChipDefectRate(calculateDefectRate(no1Count, no2Count)); // 불량률을 계산
        }
      }, 4000);

      setPreviousNo1Count(parseInt(no1Count, 10));
      setPreviousNo2Count(parseInt(no2Count, 10));

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [no1Count]);

  useEffect(() => {
    if (parseInt(no2Count, 10) > previousNo2Count && diceValue < diceComparisonValue) {
      setDiceDefectRate(calculateDefectRate(no2Count, no3Count)); // 주사위 불량률을 계산
      setPreviousNo2Count(parseInt(no2Count, 10));
    }
  }, [no2Count, diceValue, diceComparisonValue, no3Count]);

  const handleInputLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempInputLimit(event.target.value);
  };

  const handleSendInputLimit = () => {
    sendMessage('36', tempInputLimit); // 서버로 값 전송
  };

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white m-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">생산 계획량</h2>
        <p>
          현재 계획량: {no3Count}/{inputLimit}
          <input
            type="number"
            value={tempInputLimit}
            onChange={handleInputLimitChange}
            className="border rounded px-2 py-1 ml-2 mr-2"
          />
          <button
            onClick={handleSendInputLimit}
            className="ml-2 px-4 py-2 bg-blue-500 text-black border rounded"
          >
            변경
          </button>
        </p>
      </div>
      <p>1호기 생산량: {no1Count}</p>
      <p>2호기 생산량: {no2Count}</p>
      <p>3호기 생산량: {no3Count}</p>
      <p>1호기 불량률(하얀,빨간): {chipDefectRate.toFixed(2)}%</p>
      <p>2호기 불량률(주사위 기준 이하값): {diceDefectRate.toFixed(2)}%</p>
    </div>
  );
};

export default ProductionStatsComponent;
