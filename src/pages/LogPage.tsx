import { dummyHistory } from '@/dummy/dummyMember';
import CSVDownloader from 'react-csv-downloader';
export const LogPage = (): JSX.Element => {
  // csv 데이터 생성.
  const csvData = dummyHistory.map((entry, index) => ({
    cell1: index + 1,
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
    { id: 'cell1', displayName: 'No' },
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

  return (
    <div className="w-[100%] h-[100%] mx-auto bg-white">
      <div className="overflow-x-auto flex flex-col items-center">
        <table className="w-[90vw] table m-4">
          <thead>
            <tr>
              <th colSpan={3} className="w-1/6 text-center border-borderGray border">
                생산량
              </th>
              <th colSpan={3} className="w-1/6 text-center border-borderGray border">
                불량률
              </th>
              <th colSpan={6} className="w-1/6 text-center border-borderGray border">
                주사위
              </th>
            </tr>
            <tr>
              <th className="w-1/12 border-l-borderGray border-l">1호기</th>
              <th className="w-1/12">2호기</th>
              <th className="w-1/12 border-r-borderGray border-r">3호기</th>
              <th className="w-1/12">1호기</th>
              <th className="w-1/12">2호기</th>
              <th className="w-1/12 border-r-borderGray border-r">토탈</th>
              <th className="w-1/12">1</th>
              <th className="w-1/12">2</th>
              <th className="w-1/12">3</th>
              <th className="w-1/12">4</th>
              <th className="w-1/12">5</th>
              <th className="w-1/12 border-r-borderGray border-r">6</th>
            </tr>
          </thead>
          <tbody>
            {dummyHistory.map((entry, index) => (
              <tr
                key={index}
                className={index === dummyHistory.length - 1 ? 'border-b border-b-borderGray' : ''}
              >
                <td className="border-l-borderGray border-l">{entry.Statistics['1']}</td>
                <td>{entry.Statistics['2']}</td>
                <td className="border-r-borderGray border-r">{entry.Statistics['3']}</td>
                <td>{entry.Defect.machine1DefectRate}</td>
                <td>{entry.Defect.machine2DefectRate}</td>
                <td className="border-r-borderGray border-r">{entry.Defect.totalDefectRate}</td>
                <td>{entry.Dice['1']}</td>
                <td>{entry.Dice['2']}</td>
                <td>{entry.Dice['3']}</td>
                <td>{entry.Dice['4']}</td>
                <td>{entry.Dice['5']}</td>
                <td className="border-r-borderGray border-r">{entry.Dice['6']}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* CSV 다운로드 버튼 추가 */}
      </div>
      <CSVDownloader filename="생산량" extension=".csv" datas={csvData} columns={columns}>
        <div className="flex justify-center rounded-sm p-2 items-center ml-[4rem] bg-mainColor w-[10rem] text-white">
          데이터 다운로드
        </div>
      </CSVDownloader>
    </div>
  );
};
