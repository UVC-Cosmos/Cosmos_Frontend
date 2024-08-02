import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import diceImage0 from '../../assets/dice/dice0.png';
import diceImage1 from '../../assets/dice/dice1.png';
import diceImage2 from '../../assets/dice/dice2.png';
import diceImage3 from '../../assets/dice/dice3.png';
import diceImage4 from '../../assets/dice/dice4.png';
import diceImage5 from '../../assets/dice/dice5.png';
import diceImage6 from '../../assets/dice/dice6.png';
import { DiceComparisonValueAtom, DiceValueAtom } from '../../atom/mqtt/mqttAtom';

interface DiceCounts {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
}

const DiceValuesComponent: React.FC<{ sendMessage: (command: string, value: string) => void }> = ({
  sendMessage
}) => {
  const [diceValue, setDiceValue] = useAtom(DiceValueAtom);
  const [dice, setDice] = useState<string>('0');
  const [diceComparisonValue] = useAtom(DiceComparisonValueAtom);
  const [tempComparisonValue, setTempComparisonValue] = useState(diceComparisonValue);

  // // apex chart
  // const [options, setOptions] = useState({
  //   chart: {
  //     id: 'basic-bar',
  //     toolbar: {
  //       show: false
  //     }
  //   },
  //   background: 'rgba(49, 53, 60, 1)',
  //   title: {
  //     text: '주사위 빈도',
  //     style: {
  //       color: '#ffffff'
  //     }
  //   },
  //   xaxis: {
  //     categories: [1, 2, 3, 4, 5, 6],
  //     labels: {
  //       show: false
  //     },
  //     axisBorder: {
  //       show: false
  //     },
  //     axisTicks: {
  //       show: false
  //     }
  //   },
  //   yaxis: {
  //     labels: {
  //       style: {
  //         colors: ['#ffffff']
  //       }
  //     }
  //   },
  //   grid: {
  //     yaxis: {
  //       lines: {
  //         show: false
  //       },
  //       show: false
  //     }
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: true,
  //       borderRadius: 4,
  //       columnWidth: '35%'
  //     }
  //   }
  // });

  // const [series, setSeries] = useState([
  //   {
  //     name: '주사위 빈도',
  //     data: [
  //       diceCounts['1'],
  //       diceCounts['2'],
  //       diceCounts['3'],
  //       diceCounts['4'],
  //       diceCounts['5'],
  //       diceCounts['6']
  //     ]
  //   }
  // ]);

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
    setDice(tempComparisonValue);
    sendMessage('38', tempComparisonValue); // 서버로 값 전송
  };

  return (
    <div className="bg-bgComp h-[100%] px-2">
      <h2 className="text-base font-bold mb-4 text-white">다이스 밸류</h2>
      <p className="text-white">기준값: {dice}</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row">
          <div className="flex flex-col justify-around">
            <p className="text-white">주사위 기준 값</p>
            <div className="flex flex-row items-center">
              <input
                type="number"
                id="주사위 변경값"
                max={6}
                min={1}
                value={tempComparisonValue}
                onChange={handleComparisonValueChange}
                className="border rounded px-2 py-1"
              />
              <button
                onClick={handleSendComparisonValue}
                className="ml-2 px-4 py-2 bg-blue-500 h-8 text-white border rounded flex items-center"
              >
                변경
              </button>
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
    </div>
  );
};

export default DiceValuesComponent;
