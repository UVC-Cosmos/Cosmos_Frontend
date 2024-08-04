import { apiInstance } from '@/api/api';
import { dummyHistory } from '@/dummy/dummyMember';
import { IHistory } from '@/interface/historyInterface';
import { useHistoryQuery } from '@/store/query/useHistoryQuery';
import { useEffect, useState } from 'react';
import CSVDownloader from 'react-csv-downloader';
export const LogPage = (): JSX.Element => {
  const { data: history } = useHistoryQuery();

  // csv 데이터 생성.
  const csvData = history!.map((entry) => ({
    cell1: entry.date,
    cell2: entry.Statistics['1'],
    cell3: entry.Statistics['2'],
    cell4: entry.Statistics['3'],
    cell5: entry.Defect.machine1DefectRate,
    cell6: entry.Defect.machine2DefectRate,
    cell7: entry.Defect.totalDefectRate,
    cell8: entry.Dice['1'],
    cell9: entry.Dice['2'],
    cell10: entry.Dice['3'],
    cell11: entry.Dice['4'],
    cell12: entry.Dice['5'],
    cell13: entry.Dice['6']
  }));

  // CSV 컬럼 정보 생성
  const columns = [
    { id: 'cell1', displayName: '생산일자' },
    { id: 'cell2', displayName: '생산량 1호기' },
    { id: 'cell3', displayName: '생산량 2호기' },
    { id: 'cell4', displayName: '생산량 3호기' },
    { id: 'cell5', displayName: '불량률 1호기' },
    { id: 'cell6', displayName: '불량률 2호기' },
    { id: 'cell7', displayName: '불량률 토탈' },
    { id: 'cell8', displayName: '주사위 1' },
    { id: 'cell9', displayName: '주사위 2' },
    { id: 'cell10', displayName: '주사위 3' },
    { id: 'cell11', displayName: '주사위 4' },
    { id: 'cell12', displayName: '주사위 5' },
    { id: 'cell13', displayName: '주사위 6' }
  ];

  // yyyy-mm-dd 형식을 yyyy.mm.dd 형식으로 변경
  const changeDateFormat = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="w-[100%] h-[100%] mx-auto bg-white">
      <div className="overflow-x-auto flex flex-col items-center">
        <div className="w-[80vw] flex flex-row justify-between mt-4">
          <div className="text-2xl text-center font-bold flex items-center">생산 이력</div>
          <CSVDownloader filename="생산량" extension=".csv" datas={csvData} columns={columns}>
            <div className="flex justify-center rounded-sm p-2 items-center ml-[4rem] bg-mainColor w-[10rem] text-white">
              데이터 다운로드
            </div>
          </CSVDownloader>
        </div>

        <table className="w-[80vw] table mx-auto mt-8">
          <thead>
            <tr>
              <th
                colSpan={1}
                className="w-1/13 text-center text-white border-borderGray border bg-tableHeader"
              >
                생산일자
              </th>
              <th
                colSpan={3}
                className="w-1/6 text-center text-white border-borderGray border bg-tableHeader"
              >
                호기 별 생산량
              </th>
              <th
                colSpan={3}
                className="w-1/6 text-center text-white border-borderGray border bg-tableHeader"
              >
                호기 별 불량률
              </th>
              <th
                colSpan={6}
                className="w-1/6 text-center text-white border-borderGray border bg-tableHeader"
              >
                주사위 별 빈도
              </th>
            </tr>
            <tr>
              <th className="w-1/13 border-l-borderGray border-l text-center bg-tableHeader2 text-bgComp">
                생산일자
              </th>
              <th className="w-1/12 border-l-borderGray border-l text-center bg-tableHeader2 text-bgComp">
                1호기
              </th>
              <th className="w-1/12 bg-tableHeader2 text-bgComp text-center">2호기</th>
              <th className="w-1/12 border-r-borderGray border-r bg-tableHeader2 text-bgComp text-center">
                3호기
              </th>
              <th className="w-1/12 bg-tableHeader2 text-bgComp text-center">1호기</th>
              <th className="w-1/12 bg-tableHeader2 text-bgComp text-center">2호기</th>
              <th className="w-1/12 border-r-borderGray border-r bg-tableHeader2 text-bgComp text-center">
                Total
              </th>
              <th className="w-1/12 bg-tableHeader2 text-bgComp text-center">1</th>
              <th className="w-1/12 bg-tableHeader2 text-bgComp text-center">2</th>
              <th className="w-1/12 bg-tableHeader2 text-bgComp text-center">3</th>
              <th className="w-1/12 bg-tableHeader2 text-bgComp text-center">4</th>
              <th className="w-1/12 bg-tableHeader2 text-bgComp text-center">5</th>
              <th className="w-1/12 border-r-borderGray border-r bg-tableHeader2 text-bgComp text-center">
                6
              </th>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((entry, index) => (
                <tr
                  key={index}
                  className={index === history.length - 1 ? 'border-b border-b-borderGray' : ''}
                >
                  <td className="border-l-borderGray border-l text-center text-bgComp">
                    {changeDateFormat(entry.date)}
                  </td>
                  <td className="border-l-borderGray border-l text-center text-bgComp">
                    {entry.Statistics['1']}
                  </td>
                  <td className="text-center text-bgComp">{entry.Statistics['2']}</td>
                  <td className="border-r-borderGray border-r text-center text-bgComp">
                    {entry.Statistics['3']}
                  </td>
                  <td className="text-center text-bgComp">{entry.Defect.machine1DefectRate}</td>
                  <td className="text-center text-bgComp">{entry.Defect.machine2DefectRate}</td>
                  <td className="border-r-borderGray border-r text-center text-bgComp">
                    {entry.Defect.totalDefectRate}
                  </td>
                  <td className="text-center text-bgComp">{entry.Dice['1']}</td>
                  <td className="text-center text-bgComp">{entry.Dice['2']}</td>
                  <td className="text-center text-bgComp">{entry.Dice['3']}</td>
                  <td className="text-center text-bgComp">{entry.Dice['4']}</td>
                  <td className="text-center text-bgComp">{entry.Dice['5']}</td>
                  <td className="border-r-borderGray border-r text-center text-bgComp">
                    {entry.Dice['6']}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* CSV 다운로드 버튼 추가 */}
      </div>
    </div>
  );
};
