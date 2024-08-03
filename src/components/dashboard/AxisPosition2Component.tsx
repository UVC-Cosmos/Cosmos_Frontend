import { No3Motor2PositionAtom } from '@/atom/mqtt/mqttAtom';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export const AxisPosition2Component: React.FC = () => {
  const [motor2Position] = useAtom(No3Motor2PositionAtom);

  const [option] = useState({
    chart: {
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 700 // 0.5초마다 업데이트
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
      },
      axisTicks: {
        color: '#ffffff'
      }
    },
    responsive: [
      {
        breakpoint: undefined
      }
    ],
    yaxis: {
      min: 0,
      max: 30000000,
      tickAmount: 4,
      labels: {
        style: {
          colors: ['#ffffff']
        }
      }
    },
    stroke: {
      curve: 'smooth',
      colors: ['rgba(126, 144, 68, 1)']
    },
    title: {
      text: '3호기 2축 모터 위치 (가로축)',
      align: 'left',
      style: {
        color: '#ffffff'
      }
    }
  });

  const [series, setSeries] = useState<{ name: string; data: (string | number)[][] }[]>([
    {
      name: '3호기 2축',
      data: []
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (motor2Position) {
        setSeries((prevSeries) => {
          const newData = [
            ...prevSeries[0].data,
            [new Date().getTime(), parseFloat(motor2Position)]
          ];

          // 데이터 수가 너무 많아지지 않도록 최대 100개의 데이터만 유지
          const maxDataPoints = 100;
          if (newData.length > maxDataPoints) {
            newData.splice(0, newData.length - maxDataPoints);
          }

          return [
            {
              ...prevSeries[0],
              data: newData
            }
          ];
        });
      }
    }, 500); // 0.5초마다 업데이트

    return () => clearInterval(interval);
  }, [motor2Position]);

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
