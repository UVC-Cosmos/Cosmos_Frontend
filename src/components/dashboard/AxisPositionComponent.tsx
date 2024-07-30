import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import { No3Motor1PositionAtom, No3Motor2PositionAtom } from '../../atom/mqtt/mqttAtom';

const AxisPositionComponent: React.FC = () => {
  const [motor1Position] = useAtom(No3Motor1PositionAtom);
  const [motor2Position] = useAtom(No3Motor2PositionAtom);

  const [option1, setOptions1] = useState({
    chart: {
      id: 'realtime',
      type: 'line',
      height: 'auto',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 500 // 1초마다 업데이트
        }
      },
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
      max: 1500000, // 예시: 0~100 범위 설정, 실제 값에 맞게 조정
      tickAmount: 4,
      title: {
        text: '위치'
      }
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: '3호기 1축 모터 위치 (세로축)',
      align: 'left'
    }
  });

  const [option2, setOptions2] = useState({
    chart: {
      id: 'realtime',
      type: 'line',
      height: 'auto',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 500 // 1초마다 업데이트
        }
      },
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
      max: 30000000, // 예시: 0~100 범위 설정, 실제 값에 맞게 조정
      tickAmount: 4,
      title: {
        text: '위치'
      }
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: '3호기 2축 모터 위치 (가로축)',
      align: 'left'
    }
  });
  const [series1, setSeries1] = useState<{ name: string; data: (string | number)[][] }[]>([
    {
      name: '3호기 1축',
      data: []
    }
  ]);
  const [series2, setSeries2] = useState<{ name: string; data: (string | number)[][] }[]>([
    {
      name: '3호기 2축',
      data: []
    }
  ]);

  // motor1 은 세로축 최대 1500000
  // motor2 는 가로축 최대 30000000

  useEffect(() => {
    // const intervalId = setInterval(() => {
    setSeries1((prevSeries) => [
      {
        ...prevSeries[0],
        data: [...prevSeries[0].data, [new Date().getTime(), parseFloat(motor1Position)]]
      }
    ]);

    setSeries2((prevSeries) => [
      {
        ...prevSeries[0],
        data: [...prevSeries[0].data, [new Date().getTime(), parseFloat(motor2Position)]]
      }
    ]);
    // }, 1000); // 1초마다 데이터 추가

    // return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 제거
  }, [motor1Position, motor2Position]);

  return (
    <>
      <div className="border rounded-lg bg-white mb-2">
        <Chart
          options={option1 as ApexCharts.ApexOptions}
          series={series1 as ApexCharts.ApexAxisChartSeries}
          type="line"
          style={{ width: '100%' }}
          height={150}
        />
      </div>
      <div className="border rounded-lg bg-white">
        <Chart
          options={option2 as ApexCharts.ApexOptions}
          series={series2 as ApexCharts.ApexAxisChartSeries}
          type="line"
          style={{ width: '100%' }}
          height={150}
        />
      </div>
    </>
  );
};

export default AxisPositionComponent;
