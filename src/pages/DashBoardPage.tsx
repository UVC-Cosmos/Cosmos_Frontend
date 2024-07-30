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

import ChipsValueCountComponent from '@/components/dashboard/ChipsValueCountComponent';
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
    <div id="dashboard-container" className="flex flex-row h-screen overflow-hidden">
      <div id="left" className="w-[20vw] flex flex-col">
        <DataTimeComponent />
        <MaterialStatusComponent />
        <ProcessTimeComponent sendMessage={sendMessage} />
        <ProductionStatsComponent sendMessage={sendMessage} />
      </div>
      <div id="center" className="w-[50vw] flex flex-col justify-start gap-2">
        <div className="relative h-[45vh] bg-mainColor p-4">
          <UnityComponent />

          <button
            onClick={() => sendMessage('8', '1')}
            className="absolute btn btn-primary top-4 right-40"
          >
            reset
          </button>
          <div
            id="status-component"
            className="absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-4 w-[40vw]"
          >
            <StatusComponent sendMessage={sendMessage} />
          </div>
        </div>
        <div id="axis-component" className="">
          <AxisPositionComponent />
        </div>
      </div>
      <div id="right" className="w-[20vw] flex flex-col">
        <ChipsValueCountComponent />
        <ColorSensorComponent />
        <DiceValuesComponent sendMessage={sendMessage} />
      </div>
    </div>
    // <div className="px-4 flex flex-col h-[45vh]">
    //   <div className="flex flex-row gap-4">
    //     <div className="rounded-2xl bg-mainColorM p-2 flex-flex-col relative">
    //       <UnityComponent />
    //       <button
    //         onClick={() => sendMessage('8', '1')}
    //         className="absolute btn btn-primary top-4 right-40"
    //       >
    //         reset
    //       </button>
    //     </div>
    //     <div className="rounded-2xl bg-mainColorM p-2 flex-flex-col w-[35vw]">
    //       <StatusComponent sendMessage={sendMessage} />
    //       <div className="flex flex-row gap-2 h-[30vh]">
    //         <ProcessTimeComponent sendMessage={sendMessage} />
    //         <ProductionStatsComponent sendMessage={sendMessage} />
    //       </div>
    //     </div>
    //     <div className="rounded-2xl bg-mainColorM p-2 flex-flex-col w-[25vw]">
    //       <DiceValuesComponent sendMessage={sendMessage} />
    //     </div>
    //   </div>

    //   <div className="flex flex-row justify-between">
    //     <div>
    //       <DataTimeComponent />
    //     </div>
    //     <div>
    //       <MaterialStatusComponent />
    //     </div>

    //     <div>
    //       <ColorSensorComponent />
    //     </div>
    //     <div></div>
    //     <div>
    //       <ProductionComponent />
    //     </div>
    //     <div></div>
    //     <div>
    //       <AxisPositionComponent />
    //     </div>
    //   </div>
    // </div>
  );
};

export default DashBoardPage;
