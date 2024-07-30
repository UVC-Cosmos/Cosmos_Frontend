import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { DiceValueAtom, DiceComparisonValueAtom } from '../../atom/mqtt/mqttAtom';
import diceImage0 from '../../assets/dice/dice0.png';
import diceImage1 from '../../assets/dice/dice1.png';
import diceImage2 from '../../assets/dice/dice2.png';
import diceImage3 from '../../assets/dice/dice3.png';
import diceImage4 from '../../assets/dice/dice4.png';
import diceImage5 from '../../assets/dice/dice5.png';
import diceImage6 from '../../assets/dice/dice6.png';

const DiceValuesComponent: React.FC<{
  sendMessage: (command: string, value: string) => void;
  diceStats: { [key: string]: number };
}> = ({ sendMessage, diceStats }) => {
  const [diceValue] = useAtom(DiceValueAtom);
  const [diceComparisonValue] = useAtom(DiceComparisonValueAtom);
  const [tempComparisonValue, setTempComparisonValue] = useState(diceComparisonValue);

  const getDiceImage = (value: string) => {
    switch (value) {
      case '1':
        return diceImage1;
      case '2':
        return diceImage2;
      case '3':
        return diceImage3;
      case '4':
        return diceImage4;
      case '5':
        return diceImage5;
      case '6':
        return diceImage6;
      default:
        return diceImage0;
    }
  };

  const handleComparisonValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempComparisonValue(event.target.value);
  };

  const handleSendComparisonValue = () => {
    sendMessage('38', tempComparisonValue); // 서버로 값 전송
  };

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white m-4">
      <h2 className="text-lg font-bold mb-4">주사위</h2>
      <p>주사위값: {diceValue}</p>
      <p>
        주사위 기준 값: {diceComparisonValue}
        <input
          type="number"
          value={tempComparisonValue}
          onChange={handleComparisonValueChange}
          className="border rounded px-2 py-1 ml-2"
        />
        <button
          onClick={handleSendComparisonValue}
          className="ml-2 px-4 py-2 bg-blue-500 text-black border rounded"
        >
          변경
        </button>
      </p>
      <img
        src={getDiceImage(diceValue)}
        alt={`Dice ${diceValue}`}
        className="w-24 h-24 mx-auto my-4"
      />
      <div>
        <h3 className="text-md font-semibold">주사위 값 통계</h3>
        <p>1: {diceStats === null ? 0 : diceStats['1']}번</p>
        <p>2: {diceStats === null ? 0 : diceStats['2']}번</p>
        <p>3: {diceStats === null ? 0 : diceStats['3']}번</p>
        <p>4: {diceStats === null ? 0 : diceStats['4']}번</p>
        <p>5: {diceStats === null ? 0 : diceStats['5']}번</p>
        <p>6: {diceStats === null ? 0 : diceStats['6']}번</p>
      </div>
    </div>
  );
};

export default DiceValuesComponent;
