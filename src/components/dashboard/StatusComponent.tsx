import { useAtom } from 'jotai';
import React from 'react';
import {
  EmergencyStateAtom,
  No1PowerStateAtom,
  No2PowerStateAtom,
  No3PowerStateAtom,
  Sen1PowerStateAtom,
  Sen2PowerStateAtom,
  StartStateAtom
} from '../../atom/mqtt/mqttAtom';

const StatusComponent: React.FC<{ sendMessage: (command: string, value: string) => void }> = ({
  sendMessage
}) => {
  const [startState] = useAtom(StartStateAtom);
  const [emergencyState] = useAtom(EmergencyStateAtom);
  const [no1PowerState] = useAtom(No1PowerStateAtom);
  const [no2PowerState] = useAtom(No2PowerStateAtom);
  const [no3PowerState] = useAtom(No3PowerStateAtom);
  const [sen1PowerState] = useAtom(Sen1PowerStateAtom);
  const [sen2PowerState] = useAtom(Sen2PowerStateAtom);

  const getStatusCircle = (state: string) => {
    if (state === 'true') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 32 32">
          <path
            fill="#00ff04"
            d="M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16S8.268 2 16 2s14 6.268 14 14"
          ></path>
        </svg>
      );
    } else if (state === 'false') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 32 32">
          <path
            fill="#ff0000"
            d="M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16S8.268 2 16 2s14 6.268 14 14"
          ></path>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 32 32">
          <path
            fill="#8e8e8e"
            d="M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16S8.268 2 16 2s14 6.268 14 14"
          ></path>
        </svg>
      );
    }
  };

  return (
    <div className="flex flex-row rounded-xl bg-dashColor mb-2 justify-around items-center h-[15vh]">
      <div className="flex flex-col gap-2 items-center justify-center h-[12vh]">
        <div className="text-mainColor font-bold text-sm">가동</div>
        <div>{getStatusCircle(startState.toString())}</div>
        <div>
          <button
            className="btn btn-sm"
            onClick={() => sendMessage('1', startState.toString() === 'true' ? '0' : '1')}
          >
            {startState.toString() === 'true' ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
      <div className="h-[12vh] flex flex-col gap-2 items-center justify-center">
        <div className="text-mainColor font-bold text-sm">비상정지</div>
        <div>{getStatusCircle(emergencyState.toString())}</div>
        <div>
          <button className="btn btn-sm" disabled>
            {'Stop'}
          </button>
        </div>
      </div>
      <div className="h-[12vh] flex flex-col gap-2 items-center justify-center">
        <div className="text-mainColor font-bold text-sm">1호기</div>
        <div>{getStatusCircle(no1PowerState.toString())}</div>
        <div>
          <button
            className="btn btn-sm"
            onClick={() => sendMessage('9', no1PowerState.toString() === 'true' ? '0' : '1')}
          >
            {no1PowerState.toString() === 'true' ? 'OFF' : 'ON'}
          </button>
        </div>
      </div>
      <div className="h-[12vh] flex flex-col gap-2 items-center justify-center">
        <div className="text-mainColor font-bold text-sm">2호기</div>
        <div>{getStatusCircle(no2PowerState.toString())}</div>
        <div>
          <button
            className="btn btn-sm"
            onClick={() => sendMessage('10', no2PowerState.toString() === 'true' ? '0' : '1')}
          >
            {no2PowerState.toString() === 'true' ? 'OFF' : 'ON'}
          </button>
        </div>
      </div>
      <div className="h-[12vh] flex flex-col gap-2 items-center justify-center">
        <div className="text-mainColor font-bold text-sm">3호기</div>
        <div>{getStatusCircle(no3PowerState.toString())}</div>
        <div>
          <button
            className="btn btn-sm"
            onClick={() => sendMessage('11', no3PowerState.toString() === 'true' ? '0' : '1')}
          >
            {no3PowerState.toString() === 'true' ? 'OFF' : 'ON'}
          </button>
        </div>
      </div>
      <div className="h-[12vh] flex flex-col gap-2 items-center justify-center">
        <div className="text-mainColor font-bold text-sm">센서</div>
        <div>{getStatusCircle(sen1PowerState.toString())}</div>
        <div>
          <button
            className="btn btn-sm"
            onClick={() => sendMessage('12', sen1PowerState.toString() === 'true' ? '0' : '1')}
          >
            {sen1PowerState.toString() === 'true' ? 'OFF' : 'ON'}
          </button>
        </div>
      </div>
      <div className="h-[12vh] flex flex-col gap-2 items-center justify-center">
        <div className="text-mainColor font-bold text-sm">센서2</div>
        <div>{getStatusCircle(sen2PowerState.toString())}</div>
        <div>
          <button
            className="btn btn-sm"
            onClick={() => sendMessage('13', sen2PowerState.toString() === 'true' ? '0' : '1')}
          >
            {sen2PowerState.toString() === 'true' ? 'OFF' : 'ON'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusComponent;
