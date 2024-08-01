import { AxisPosition2Component } from '@/components/dashboard/AxisPosition2Component';
import ChipsValueCountComponent from '@/components/dashboard/ChipsValueCountComponent';
import { DiceValueCountComponent } from '@/components/dashboard/DiceValueCountComponent';
// export default DashBoardPage;
import AxisPositionComponent from '../components/dashboard/AxisPositionComponent';
import ColorSensorComponent from '../components/dashboard/ColorSensorComponent';
import DiceValuesComponent from '../components/dashboard/DiceValuesComponent';
import MaterialStatusComponent from '../components/dashboard/MaterialStatusComponent';
import ProcessTimeComponent from '../components/dashboard/ProcessTimeComponent';
import ProductionComponent from '../components/dashboard/ProductionComponent';
import StatusComponent from '../components/dashboard/StatusComponent';
import UnityComponent from '../components/unity/UnityComponent';
import useSocket from '../hooks/useSocket';

const WebSocketServerUrl = import.meta.env.VITE_WEBSOCKET_SERVER_URL; // 노드서버 Url ex) http://192.168.0.16:3000
const EdukitId = import.meta.env.VITE_EDUKIT_ID; // edukitId ex) UVC-EDU-01

const DashBoardPage = () => {
  const [socket, sendMessage, diceStats] = useSocket(WebSocketServerUrl, EdukitId);
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
  );
};

export default DashBoardPage;
