import { useAtom } from 'jotai';
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';
import { No1CountAtom, No2CountAtom, No2SensingMemoryAtom } from '../../atom/mqtt/mqttAtom';

const ChipsValueCountComponent: React.FC = () => {
  const [no1CountString] = useAtom(No1CountAtom);
  const [no2CountString] = useAtom(No2CountAtom);
  const [no2SensingMemory] = useAtom(No2SensingMemoryAtom);

  // 문자열을 숫자로 변환
  const no1Count = parseInt(no1CountString, 10) || 0;
  const no2Count = parseInt(no2CountString, 10) || 0;
  const [redChip, setRedChip] = useState<number>(0); // redChip 상태 관리 추가
  const [previousNo1Count, setPreviousNo1Count] = useState<number>(no1Count);
  const sensingMemoryRef = useRef(no2SensingMemory);

  // 차트 데이터를 상태로 관리
  const [chartData, setChartData] = useState({
    series: [no1Count, redChip],
    options: {
      chart: {
        width: 300,
        type: 'pie',
        background: 'rgba(49, 53, 60, 1)'
      },
      labels: ['양품', '불량품'],
      colors: ['#18d618', '#f44336'],
      legend: {
        labels: {
          colors: '#ffffff'
        }
      },
      title: {
        text: '1호기 불/양품 생산량',
        align: 'left',
        style: {
          color: '#ffffff',
          fontSize: '20px'
        }
      }
    }
  });

  useEffect(() => {
    sensingMemoryRef.current = no2SensingMemory;
  }, [no2SensingMemory]);

  useEffect(() => {
    if (no1Count > previousNo1Count) {
      const timeoutId = setTimeout(() => {
        if (sensingMemoryRef.current.toString() === 'true') {
          setChartData((prevData) => ({
            ...prevData,
            series: [prevData.series[0] + 1, prevData.series[1]]
          }));
        } else {
          const newRedChip = no1Count - no2Count;
          setRedChip(newRedChip);
          setChartData((prevData) => ({
            ...prevData,
            series: [prevData.series[0], newRedChip]
          }));
        }
        setPreviousNo1Count(no1Count);
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [no1Count, no2Count]);

  return (
    <div className="relative w-full h-full">
      <div
        style={{
          filter: no1Count === 0 && no2Count === 0 ? 'blur(5px)' : 'none',
          pointerEvents: no1Count === 0 && no2Count === 0 ? 'none' : 'auto',
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={'100%'}
          height={'100%'}
        />
      </div>
      {no1Count === 0 && no2Count === 0 && (
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
            zIndex: 2
          }}
        >
          <p>1호기의 생산량이 0 입니다.</p>
        </div>
      )}
    </div>
  );
};

export default ChipsValueCountComponent;
