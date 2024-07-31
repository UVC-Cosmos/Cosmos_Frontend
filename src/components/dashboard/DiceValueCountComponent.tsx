import { DiceValueAtom } from '@/atom/mqtt/mqttAtom';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface DiceCounts {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
}

export const DiceValueCountComponent: React.FC = () => {
  const [diceValue] = useAtomValue(DiceValueAtom);
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
      }
    },
    background: 'rgba(49, 53, 60, 1)',
    title: {
      text: '주사위 빈도',
      style: {
        color: '#ffffff'
      }
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
    yaxis: {
      labels: {
        style: {
          colors: ['#ffffff']
        }
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
      data: [
        diceCounts['1'],
        diceCounts['2'],
        diceCounts['3'],
        diceCounts['4'],
        diceCounts['5'],
        diceCounts['6']
      ]
    }
  ]);

  useEffect(() => {
    if (diceValue >= '1' && diceValue <= '6') {
      setDiceCounts((prevCounts) => ({
        ...prevCounts,
        [diceValue]: (prevCounts[diceValue as keyof DiceCounts] ?? 0) + 1
      }));
    }
  }, [diceValue]);

  useEffect(() => {
    setSeries([
      {
        name: '주사위 빈도',
        data: [
          diceCounts['1'],
          diceCounts['2'],
          diceCounts['3'],
          diceCounts['4'],
          diceCounts['5'],
          diceCounts['6']
        ]
      }
    ]);
  }, [diceCounts]);

  return (
    <div className="bg-bgComp h-[100%] px-2">
      <Chart options={options} series={series} type="bar" width={'100%'} height={'100%'} />
    </div>
  );
};
