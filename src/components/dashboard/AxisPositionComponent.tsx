import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { No3Motor1PositionAtom } from '../../atom/mqtt/mqttAtom';

const AxisPositionComponent: React.FC = () => {
  const [motor1Position] = useAtom(No3Motor1PositionAtom);

  const [option] = useState({
    chart: {
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 500 // 0.5초마다 업데이트
        }
      },
      background: 'rgba(49, 53, 60, 1)',
      borderRadius: '5px',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },

    xaxis: {
      type: 'datetime',
      labels: {
        show: false
      }
    },
    responsive: [
      {
        breakpoint: undefined
      }
    ],
    yaxis: {
      min: 0,
      max: 2500000,
      tickAmount: 4,
      labels: {
        style: {
          colors: ['#ffffff']
        }
      }
    },
    stroke: {
      curve: 'smooth',
      colors: ['rgba(112,195,208,1)']
    },
    title: {
      text: '3호기 1축 모터 위치 (세로축)',
      align: 'left',
      style: {
        color: '#ffffff'
      }
    }
  });

  const [series, setSeries] = useState<{ name: string; data: (string | number)[][] }[]>([
    {
      name: '3호기 1축',
      data: []
    }
  ]);

  // motor1 은 세로축 최대 1500000
  // motor2 는 가로축 최대 30000000

  useEffect(() => {
    if (motor1Position) {
      setSeries((prevSeries) => [
        {
          ...prevSeries[0],
          data: [...prevSeries[0].data, [new Date().getTime(), parseFloat(motor1Position)]]
        }
      ]);
    }
  }, [motor1Position]);

  return (
    <>
      <Chart
        options={option as ApexCharts.ApexOptions}
        series={series as ApexAxisChartSeries}
        type="line"
        style={{ width: '100%' }}
        height={'100%'}
      />
    </>
  );
};

export default AxisPositionComponent;
