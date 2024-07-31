export const LogPage = (): JSX.Element => {
  return (
    <div className="w-[100%] h-[100%] mx-auto bg-white">
      <div className="overflow-x-auto">
        <table className="w-[90vw] table m-4">
          <thead>
            <tr>
              <th className="w-1/12">No</th>
              <th className="w-1/6">생산량</th>
              <th className="w-1/6">불량률</th>
              <th className="w-1/6">평균</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
