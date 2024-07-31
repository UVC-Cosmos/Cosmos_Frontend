import { AxisPosition2Component } from '@/components/dashboard/AxisPosition2Component';
import ChipsValueCountComponent from '@/components/dashboard/ChipsValueCountComponent';
import { DiceValueCountComponent } from '@/components/dashboard/DiceValueCountComponent';
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
    <div className="grid grid-cols-[1fr_2fr_1fr] grid-rows-4 gap-2 h-[100%] w-[100%]">
      <div className="row-span-1 col-span-1 mt-2 ml-2">
        <MaterialStatusComponent />
      </div>
      <div className="row-start-2 row-span-1 col-span-1 ml-2">
        <ProcessTimeComponent sendMessage={sendMessage} />
      </div>
      <div className="row-start-3 row-span-2 col-span-1 mb-2 ml-2">
        <ProductionComponent />
      </div>
      <div className="row-span-2 col-start-2 col-span-1 relative mt-2">
        <UnityComponent />
        <div
          id="status-component"
          className="absolute bottom-1 right-0 transform -translate-x-3 -translate-y-2"
        >
          <StatusComponent sendMessage={sendMessage} />
        </div>
      </div>
      <div className="row-start-3 col-start-2">
        <AxisPositionComponent />
      </div>
      <div className="row-start-4 col-start-2 mb-2">
        <AxisPosition2Component />
      </div>
      <div className="row-span-1 col-start-3 col-span-1 mt-2 mr-2">
        <ChipsValueCountComponent />
      </div>
      <div className="row-start-2 row-span-1 col-start-3 col-span-1 mr-2">
        <ColorSensorComponent />
      </div>
      <div className="row-start-3 row-span-1 col-start-3 col-span-1 mr-2">
        <DiceValuesComponent sendMessage={sendMessage} />
      </div>
      <div className="row-start-4 col-start-3 row-span-1 col-span-1 mb-2 mr-2">
        <DiceValueCountComponent />
      </div>
    </div>
    // <div id="dashboard-container" className="flex flex-row overflow-hidden">
    //   <div id="left" className=" flex flex-col">
    //     {/* <DataTimeComponent /> */}
    //     <MaterialStatusComponent />
    //     <ProcessTimeComponent sendMessage={sendMessage} />
    //     <ProductionStatsComponent sendMessage={sendMessage} />
    //   </div>
    //   <div id="center" className=" flex flex-col justify-start gap-2">
    //     <div className="relative h-[45vh] bg-mainColor p-4">
    //       <UnityComponent />
    //       <div
    //         id="status-component"
    //         className="absolute bottom-1 right-0 transform -translate-x-3 -translate-y-2"
    //       >
    //         <StatusComponent sendMessage={sendMessage} />
    //       </div>
    //     </div>
    //     <div id="axis-component" className="">
    //       <AxisPositionComponent />
    //     </div>
    //   </div>
    //   <div id="right" className=" flex flex-col">
    //     <ChipsValueCountComponent />
    //     <ColorSensorComponent />
    //     <DiceValuesComponent sendMessage={sendMessage} />
    //   </div>
    // </div>
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
