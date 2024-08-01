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
          speed: 500 // 1초마다 업데이트
        }
      },
      // fontColor: '#ffffff',
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

  // useEffect(() => {
  //   setSeries((prevSeries) => [
  //     {
  //       ...prevSeries[0],
  //       data: [...prevSeries[0].data, [new Date().getTime(), motor2Position]]
  //     }
  //   ]);
  // }, [motor2Position]);

  useEffect(() => {
    if (motor2Position) {
      setSeries((prevSeries) => [
        {
          ...prevSeries[0],
          data: [...prevSeries[0].data, [new Date().getTime(), parseFloat(motor2Position)]]
        }
      ]);
    }
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
