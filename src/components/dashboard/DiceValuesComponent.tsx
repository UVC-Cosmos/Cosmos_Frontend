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
  const [diceValue] = useAtom(DiceValueAtom);
  const [diceComparisonValue] = useAtom(DiceComparisonValueAtom);
  const [tempComparisonValue, setTempComparisonValue] = useState(diceComparisonValue);
  const [diceCounts, setDiceCounts] = useState<DiceCounts>({
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0
  });

  // apex chart
  const [options, setOptions] = useState({
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false
      },
      background: '#ffffff'
    },
    title: {
      text: '주사위 빈도'
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6],
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    grid: {
      yaxis: {
        lines: {
          show: false
        },
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        columnWidth: '35%'
      }
    }
  });

  const [series, setSeries] = useState([
    {
      name: '주사위 빈도',
      data: [1, 3, 1, 2, 4, 5]
    }
  ]);

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

  useEffect(() => {
    if (diceValue >= '1' && diceValue <= '6') {
      setDiceCounts((prevCounts) => ({
        ...prevCounts,
        [diceValue]: (prevCounts[diceValue as keyof DiceCounts] ?? 0) + 1
      }));
    }
  }, [diceValue]);

  const handleComparisonValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempComparisonValue(event.target.value);
  };

  const handleSendComparisonValue = () => {
    sendMessage('38', tempComparisonValue); // 서버로 값 전송
  };

  return (
    <div className="border rounded-xl shadow-md bg-white h-[calc(45vh+0.5rem)] p-2">
      <h2 className="text-lg font-bold mb-4">주사위</h2>
      <p>주사위값: {diceValue}</p>
      주사위 기준 값: {diceComparisonValue}
      <input
        type="number"
        max={6}
        min={1}
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
      <img
        src={getDiceImage(diceValue)}
        alt={`Dice ${diceValue}`}
        className="w-24 h-24 mx-auto my-4"
      />
      <Chart options={options} series={series} type="bar" width={'250px'} height={'200px'} />
    </div>
  );
};

export default DiceValuesComponent;
