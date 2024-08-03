import { useAtom } from 'jotai';
import React, { useState } from 'react';
import diceImage0 from '../../assets/dice/dice0.png';
import diceImage1 from '../../assets/dice/dice1.png';
import diceImage2 from '../../assets/dice/dice2.png';
import diceImage3 from '../../assets/dice/dice3.png';
import diceImage4 from '../../assets/dice/dice4.png';
import diceImage5 from '../../assets/dice/dice5.png';
import diceImage6 from '../../assets/dice/dice6.png';
import { DiceValueAtom } from '../../atom/mqtt/mqttAtom';
import { SetDiceValueModal } from '../modal/SetDiceValueModal';

const DiceValuesComponent: React.FC<{ sendMessage: (command: string, value: string) => void }> = ({
  sendMessage
}) => {
  const [diceValue] = useAtom(DiceValueAtom);
  const [dice, setDice] = useState<string>('0');
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);

  const toggleSetting = () => {
    setIsSettingOpen(!isSettingOpen);
  };

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

  return (
    <div className="bg-bgComp h-[100%] p-2 relative">
      <button className="absolute right-2" onClick={toggleSetting}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 20 20">
          <path
            fill="white"
            d="M11.078 0c.294 0 .557.183.656.457l.706 1.957q.379.094.654.192q.3.107.78.33l1.644-.87a.7.7 0 0 1 .832.131l1.446 1.495c.192.199.246.49.138.744l-.771 1.807q.191.352.308.604q.126.273.312.76l1.797.77c.27.115.437.385.419.674l-.132 2.075a.69.69 0 0 1-.46.605l-1.702.605q-.073.352-.154.606a9 9 0 0 1-.298.774l.855 1.89a.68.68 0 0 1-.168.793l-1.626 1.452a.7.7 0 0 1-.796.096l-1.676-.888a7 7 0 0 1-.81.367l-.732.274l-.65 1.8a.7.7 0 0 1-.64.457L9.11 20a.7.7 0 0 1-.669-.447l-.766-2.027a15 15 0 0 1-.776-.29a10 10 0 0 1-.618-.293l-1.9.812a.7.7 0 0 1-.755-.133L2.22 16.303a.68.68 0 0 1-.155-.783l.817-1.78a10 10 0 0 1-.302-.644a14 14 0 0 1-.3-.811L.49 11.74a.69.69 0 0 1-.49-.683l.07-1.921a.69.69 0 0 1 .392-.594L2.34 7.64q.13-.478.23-.748a9 9 0 0 1 .314-.712L2.07 4.46a.68.68 0 0 1 .15-.79l1.404-1.326a.7.7 0 0 1 .75-.138l1.898.784q.314-.209.572-.344q.307-.162.824-.346l.66-1.841A.7.7 0 0 1 8.984 0zm-1.054 7.019c-1.667 0-3.018 1.335-3.018 2.983s1.351 2.984 3.018 2.984s3.017-1.336 3.017-2.984s-1.35-2.983-3.017-2.983"
          ></path>
        </svg>
      </button>
      <div className="flex flex-row justify-center items-center gap-2 w-[100%] h-[100%]">
        <div className="stats shadow bg-bgLayout border border-borderMaterial">
          <div className="stat">
            <div className="stat-title text-white">주사위 기준 값</div>
            <div className="stat-value text-center">
              <p className="text-borderMaterial">{dice}</p>
            </div>
          </div>
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          <img
            src={getDiceImage(diceValue)}
            alt={`Dice ${diceValue}`}
            className="w-24 h-24 mx-auto my-4"
          />
        </div>
      </div>
      {isSettingOpen && (
        <SetDiceValueModal
          toggleSetting={toggleSetting}
          sendMessage={sendMessage}
          setDice={setDice}
        />
      )}
    </div>
  );
};

export default DiceValuesComponent;
