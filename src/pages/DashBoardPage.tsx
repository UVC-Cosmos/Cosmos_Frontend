// DashBoardPage.tsx
import React from 'react';
import UnityComponent from '../components/unity/UnityComponent';
import DataTimeComponent from '../components/dashboard/DataTimeComponent';
import StatusComponent from '../components/dashboard/StatusComponent';
import MaterialStatusComponent from '../components/dashboard/MaterialStatusComponent';
import DiceValuesComponent from '../components/dashboard/DiceValuesComponent';
import ColorSensorComponent from '../components/dashboard/ColorSensorComponent';
import ProcessTimeComponent from '../components/dashboard/ProcessTimeComponent';
import ProductionComponent from '../components/dashboard/ProductionComponent';
import ProductionStatsComponent from '../components/dashboard/ProductionStatsComponent';
import AxisPositionComponent from '../components/dashboard/AxisPositionComponent';
import useSocket from '../hooks/useSocket';
import { send } from 'process';

const WebSocketServerUrl = import.meta.env.VITE_WEBSOCKET_SERVER_URL; // 노드서버 Url ex) http://192.168.0.16:3000
const EdukitId = import.meta.env.VITE_EDUKIT_ID; // edukitId ex) UVC-EDU-01

const DashBoardPage = () => {
  const [socket, sendMessage, diceStats] = useSocket(WebSocketServerUrl, EdukitId);
  return (
    <>
      <UnityComponent />
      <div className="flex flex-wrap justify-around mt-5 p-5 bg-gray-100">
        <div className="w-full lg:w-1/3 p-2">
          <DataTimeComponent />
        </div>
        <div className="w-full lg:w-1/3 p-2">
          <StatusComponent sendMessage={sendMessage} />
        </div>
        <div className="w-full lg:w-1/3 p-2">
          <MaterialStatusComponent />
        </div>
        <div className="w-full lg:w-1/3 p-2">
          <DiceValuesComponent sendMessage={sendMessage} diceStats={diceStats} />
        </div>
        <div className="w-full lg:w-1/3 p-2">
          <ColorSensorComponent />
        </div>
        <div className="w-full lg:w-1/3 p-2">
          <ProcessTimeComponent sendMessage={sendMessage} />
        </div>
        <div className="w-full lg:w-1/3 p-2">
          <ProductionComponent />
        </div>
        <div className="w-full lg:w-1/3 p-2">
          <ProductionStatsComponent sendMessage={sendMessage} />
        </div>
        <div className="w-full lg:w-1/3 p-2">
          <AxisPositionComponent />
        </div>
      </div>
    </>
  );
};

export default DashBoardPage;
