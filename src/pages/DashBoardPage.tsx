// import React from 'react';
// import UnityComponent from '../components/unity/UnityComponent';
// import DataTimeComponent from '../components/dashboard/DataTimeComponent';
// import StatusComponent from '../components/dashboard/StatusComponent';
// import MaterialStatusComponent from '../components/dashboard/MaterialStatusComponent';
// import DiceValuesComponent from '../components/dashboard/DiceValuesComponent';
// import ColorSensorComponent from '../components/dashboard/ColorSensorComponent';
// import ProcessTimeComponent from '../components/dashboard/ProcessTimeComponent';
// import ProductionComponent from '../components/dashboard/ProductionComponent';
// import ProductionStatsComponent from '../components/dashboard/ProductionStatsComponent';
// import AxisPositionComponent from '../components/dashboard/AxisPositionComponent';
// import useSocket from '../hooks/useSocket';

// const WebSocketServerUrl = import.meta.env.VITE_WEBSOCKET_SERVER_URL; // 노드서버 Url ex) http://192.168.0.16:3000
// const EdukitId = import.meta.env.VITE_EDUKIT_ID; // edukitId ex) UVC-EDU-01

// const DashBoardPage = () => {
//   const [socket, sendMessage] = useSocket(WebSocketServerUrl, EdukitId);

//   return (
//     <>
//       <UnityComponent />
//       <div
//         style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 20 }}
//       >
//         <DataTimeComponent />
//         <MaterialStatusComponent />
//         <DiceValuesComponent />
//         <ColorSensorComponent />
//         <ProcessTimeComponent />
//         <ProductionComponent />
//         <ProductionStatsComponent />
//         <AxisPositionComponent />
//         <StatusComponent sendMessage={sendMessage} />
//       </div>
//     </>
//   );
// };

import { send } from 'process';
// export default DashBoardPage;
import React from 'react';
import AxisPositionComponent from '../components/dashboard/AxisPositionComponent';
import ColorSensorComponent from '../components/dashboard/ColorSensorComponent';
import DataTimeComponent from '../components/dashboard/DataTimeComponent';
import DiceValuesComponent from '../components/dashboard/DiceValuesComponent';
import MaterialStatusComponent from '../components/dashboard/MaterialStatusComponent';
import ProcessTimeComponent from '../components/dashboard/ProcessTimeComponent';
import ProductionComponent from '../components/dashboard/ProductionComponent';
import ProductionStatsComponent from '../components/dashboard/ProductionStatsComponent';
import StatusComponent from '../components/dashboard/StatusComponent';
import UnityComponent from '../components/unity/UnityComponent';
import useSocket from '../hooks/useSocket';

const WebSocketServerUrl = import.meta.env.VITE_WEBSOCKET_SERVER_URL; // 노드서버 Url ex) http://192.168.0.16:3000
const EdukitId = import.meta.env.VITE_EDUKIT_ID; // edukitId ex) UVC-EDU-01

const DashBoardPage = () => {
  const [socket, sendMessage] = useSocket(WebSocketServerUrl, EdukitId);

  return (
    <div className="px-4 flex flex-col h-[45vh]">
      <div className="flex flex-row gap-4">
        <div className="rounded-2xl bg-mainColorM p-2 flex-flex-col ">
          <UnityComponent />
        </div>
        <div className="rounded-2xl bg-mainColorM p-2 flex-flex-col w-[35vw]">
          <StatusComponent sendMessage={sendMessage} />
          <div className="flex flex-row gap-2 h-[30vh]">
            <ProcessTimeComponent sendMessage={sendMessage} />
            <ProductionStatsComponent sendMessage={sendMessage} />
          </div>
        </div>
        <div className="rounded-2xl bg-mainColorM p-2 flex-flex-col w-[25vw]">
          <DiceValuesComponent sendMessage={sendMessage} />
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div>
          <DataTimeComponent />
        </div>
        <div>
          <MaterialStatusComponent />
        </div>

        <div>
          <ColorSensorComponent />
        </div>
        <div></div>
        <div>
          <ProductionComponent />
        </div>
        <div></div>
        <div>
          <AxisPositionComponent />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
