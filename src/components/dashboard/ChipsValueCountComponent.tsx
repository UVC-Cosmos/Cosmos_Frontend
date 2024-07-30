import React from 'react';
import Chart from 'react-apexcharts';

const ChipsValueCountComponent: React.FC = () => {
  const options = {
    chart: {
      type: 'pie' // 'pie' 타입을 ApexCharts에서 지원하는 타입으로 변경해야 합니다.
    },
    labels: ['Category 1', 'Category 2']
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200
    //       },
    //       legend: {
    //         position: 'bottom'
    //       }
    //     }
    //   }
    // ]
  };

  const series = [44, 55];

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white m-4">
      <Chart
        options={options} // 타입 강제 캐스팅을 제거하고, 올바른 타입을 사용해야 합니다.
        series={series}
        type="pie"
        height={300}
        width={300}
      />
    </div>
  );
};

export default ChipsValueCountComponent;
