import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { No3Motor1PositionAtom, No3Motor2PositionAtom } from '../../atom/mqtt/mqttAtom';

const AxisPositionComponent: React.FC = () => {
  const [motor1Position] = useAtom(No3Motor1PositionAtom);
  const [motor2Position] = useAtom(No3Motor2PositionAtom);

  const [options, setOptions] = useState({
    chart: {
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 500 // 0.5초 마다 업데이트
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
    yaxis: {
      min: 0,
      max: 50000000, // 예시: 0~100 범위 설정, 실제 값에 맞게 조정
      title: {
        text: '위치'
      }
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: '3호기 모터 위치 (실시간)',
      align: 'left'
    }
  });
  const [series, setSeries] = useState<{ name: string; data: (string | number)[][] }[]>([
    {
      name: '3호기 1축',
      data: []
    },
    {
      name: '3호기 2축',
      data: []
    }
  ]);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    setSeries((prevSeries) => [
      {
        ...prevSeries[0],
        data: [...prevSeries[0].data, [new Date().getTime(), parseFloat(motor1Position) * 50]]
      },
      {
        ...prevSeries[1],
        data: [...prevSeries[1].data, [new Date().getTime(), motor2Position]]
      }
    ]);
    // }, 1000); // 1초마다 데이터 추가

    // return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 제거
  }, [motor1Position, motor2Position]);

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white m-4">
      <Chart
        options={options as ApexCharts.ApexOptions}
        series={series as ApexAxisChartSeries | ApexNonAxisChartSeries | undefined}
        type="line"
        height={300}
        width={600}
      />
    </div>
  );
};

export default AxisPositionComponent;
