import { AxisPosition2Component } from '@/components/dashboard/AxisPosition2Component';
import ChipsValueCountComponent from '@/components/dashboard/ChipsValueCountComponent';
import { DiceValueCountComponent } from '@/components/dashboard/DiceValueCountComponent';
import { MaterialStatus1Component } from '@/components/dashboard/MaterialStatus1Component';
import { MaterialStatus2Component } from '@/components/dashboard/MaterialStatus2Component';
import AxisPositionComponent from '../components/dashboard/AxisPositionComponent';
import ColorSensorComponent from '../components/dashboard/ColorSensorComponent';
import DiceValuesComponent from '../components/dashboard/DiceValuesComponent';
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
    <div className="parent grid grid-cols-4 grid-rows-4 gap-2 h-full w-full">
      <div className="div1 col-start-1 col-end-2 row-start-1 row-end-2 border-2 border-borderMaterial">
        <MaterialStatus1Component />
      </div>
      <div className="div2 col-start-1 col-end-2 row-start-2 row-end-3 border-2 border-borderMaterial">
        <MaterialStatus2Component />
      </div>
      <div className="div3 col-start-1 col-end-2 row-start-3 row-end-4">
        <ProcessTimeComponent sendMessage={sendMessage} />
      </div>
      <div className="div4 col-start-1 col-end-2 row-start-4 row-end-5">
        <DiceValuesComponent sendMessage={sendMessage} />
      </div>
      <div className="div5 col-start-2 col-end-4 row-start-1 row-end-3 relative">
        <UnityComponent />
        <div
          id="status-component"
          className="absolute bottom-1 right-0 transform -translate-x-3 -translate-y-2"
        >
          <StatusComponent sendMessage={sendMessage} />
        </div>
      </div>
      <div className="div6 col-start-2 col-end-4 row-start-3 row-end-4">
        <AxisPositionComponent />
      </div>
      <div className="div7 col-start-2 col-end-4 row-start-4 row-end-5">
        <AxisPosition2Component />
      </div>
      <div className="div8 col-start-4 col-end-5 row-start-1 row-end-2">
        <ChipsValueCountComponent />
      </div>
      <div className="div9 col-start-4 col-end-5 row-start-2 row-end-3">
        <ColorSensorComponent />
      </div>
      <div className="div10 col-start-4 col-end-5 row-start-3 row-end-4">
        <ProductionComponent />
      </div>
      <div className="div11 col-start-4 col-end-5 row-start-4 row-end-5">
        <DiceValueCountComponent />
      </div>
    </div>
  );
};

export default DashBoardPage;
