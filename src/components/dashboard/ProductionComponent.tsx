import { useAtomValue } from 'jotai';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { No1CountAtom, No2CountAtom, No3CountAtom } from '../../atom/mqtt/mqttAtom';

interface ProductionCounts {
  '1호기': number;
  '2호기': number;
  '3호기': number;
}

const ProductionComponent: React.FC = () => {
  const no1CountString = useAtomValue(No1CountAtom);
  const no2CountString = useAtomValue(No2CountAtom);
  const no3CountString = useAtomValue(No3CountAtom);

  // 문자열을 숫자로 변환
  const no1Count = parseInt(no1CountString, 10) || 0;
  const no2Count = parseInt(no2CountString, 10) || 0;
  const no3Count = parseInt(no3CountString, 10) || 0;

  const [productionCounts, setProductionCounts] = useState<ProductionCounts>({
    '1호기': no1Count,
    '2호기': no2Count,
    '3호기': no3Count
  });

  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      background: 'rgba(49, 53, 60, 1)'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        columnWidth: '35%'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['1호기', '2호기', '3호기'],
      labels: {
        show: false,
        style: {
          colors: ['#ffffff']
        }
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
    title: {
      text: '호기 별 생산량',
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '20px'
      }
    },
    grid: {
      yaxis: {
        lines: {
          show: false
        },
        show: false
      }
    }
  });

  const [series, setSeries] = useState([
    {
      name: '생산량',
      data: [productionCounts['1호기'], productionCounts['2호기'], productionCounts['3호기']]
    }
  ]);

  useEffect(() => {
    setProductionCounts({
      '1호기': no1Count,
      '2호기': no2Count,
      '3호기': no3Count
    });
  }, [no1Count, no2Count, no3Count]);

  useEffect(() => {
    setSeries([
      {
        name: '생산량',
        data: [productionCounts['1호기'], productionCounts['2호기'], productionCounts['3호기']]
      }
    ]);
  }, [productionCounts]);

  return (
    <div className="relative w-full h-full">
      <div
        style={{
          filter: no1Count === 0 && no2Count === 0 && no3Count === 0 ? 'blur(5px)' : 'none',
          pointerEvents: no1Count === 0 && no2Count === 0 && no3Count === 0 ? 'none' : 'auto',
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        <Chart options={options} series={series} type="bar" width={'100%'} height={'100%'} />
      </div>
      {no1Count === 0 && no2Count === 0 && no3Count === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
            zIndex: 2
          }}
        >
          <p>호기 별 생산량이 0 입니다.</p>
        </div>
      )}
    </div>
  );
};

export default ProductionComponent;
