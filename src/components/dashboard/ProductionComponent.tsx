import { useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { No1CountAtom, No2CountAtom, No3CountAtom } from '../../atom/mqtt/mqttAtom';

const ProductionComponent: React.FC = () => {
  const [no1Count] = useAtom(No1CountAtom);
  const [no2Count] = useAtom(No2CountAtom);
  const [no3Count] = useAtom(No3CountAtom);

  // 차트 데이터와 옵션
  const [chartData, setChartData] = useState({
    series: [
      {
        name: '생산량',
        data: [no1Count, no2Count, no3Count]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        },
        background: 'rgba(49, 53, 60, 1)'
      },

      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['1호기', '2호기', '3호기'],
        labels: {
          style: {
            colors: ['#ffffff', '#ffffff', '#ffffff']
          }
        }
      },
      yaxis: {
        show: false
      },
      title: {
        text: '호기 별 생산량',
        align: 'left',
        style: {
          color: '#ffffff'
        }
      }
    }
  });

  // 생산량 업데이트 시 차트 데이터 업데이트
  useEffect(() => {
    setChartData({
      series: [
        {
          name: '생산량',
          data: [no1Count, no2Count, no3Count]
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          },
          background: 'rgba(49, 53, 60, 1)'
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['1호기', '2호기', '3호기']
        }
      }
    });
  }, [no1Count, no2Count, no3Count]);

  return (
    <>
      {/* <p className="text-lg font-bold">1호기 생산량: {no1Count}</p>
      <p className="text-lg font-bold">2호기 생산량: {no2Count}</p>
      <p className="text-lg font-bold">3호기 생산량: {no3Count}</p> */}
      <Chart
        options={chartData.options as ApexCharts.ApexOptions}
        series={chartData.series}
        type="bar"
        style={{ width: '100%' }}
        height={'100%'}
      />
    </>
  );
};

export default ProductionComponent;
