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
    <div className="w-[calc(97vw-5rem)] h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex flex-row gap-4">
        <UnityComponent />
        <div className="rounded-2xl bg-mainColorM p-2 flex-flex-col">
          <StatusComponent sendMessage={sendMessage} />
          <div className="flex flex-row gap-2">
            <ProcessTimeComponent sendMessage={sendMessage} />
            <ProductionStatsComponent sendMessage={sendMessage} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-around mt-5 p-5 bg-gray-100">
        <div className="flex-wrap">
          <DataTimeComponent />
        </div>

        <div className="flex-wrap">
          <MaterialStatusComponent />
        </div>
        <div className="flex-wrap">
          <DiceValuesComponent sendMessage={sendMessage} />
        </div>
        <div className="flex-wrap">
          <ColorSensorComponent />
        </div>
        <div className="flex-wrap"></div>
        <div className="flex-wrap">
          <ProductionComponent />
        </div>
        <div className="flex-wrap"></div>
        <div className="flex-wrap">
          <AxisPositionComponent />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
