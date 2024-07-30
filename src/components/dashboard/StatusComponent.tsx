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
        <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 32 32">
          <path
            fill="#00ff04"
            d="M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16S8.268 2 16 2s14 6.268 14 14"
          ></path>
        </svg>
      );
    } else if (state === 'false') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 32 32">
          <path
            fill="#ff0000"
            d="M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16S8.268 2 16 2s14 6.268 14 14"
          ></path>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 32 32">
          <path
            fill="#8e8e8e"
            d="M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16S8.268 2 16 2s14 6.268 14 14"
          ></path>
        </svg>
      );
    }
  };

  return (
    <div className="flex flex-row rounded-xl bg-dashColor mb-2">
      <div className="stat flex flex-col gap-2 items-center justify-center">
        <div className="stat-title text-white">시작 / 정지</div>
        <div>{getStatusCircle(startState.toString())}</div>
        <div className="stat-actions">
          <button onClick={() => sendMessage('1', startState.toString() === 'true' ? '0' : '1')}>
            {startState.toString() === 'true' ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
      <div className="stat">
        <p>비상정지: {getStatusCircle(emergencyState.toString())}</p>
      </div>
      <div className="stat">
        <p>1호기: {getStatusCircle(no1PowerState.toString())}</p>
        <button onClick={() => sendMessage('9', no1PowerState.toString() === 'true' ? '0' : '1')}>
          {no1PowerState.toString() === 'true' ? '1호기 OFF' : '1호기 ON'}
        </button>
      </div>
      <div className="stat">
        <p>2호기: {getStatusCircle(no2PowerState.toString())}</p>
        <button onClick={() => sendMessage('10', no2PowerState.toString() === 'true' ? '0' : '1')}>
          {no2PowerState.toString() === 'true' ? '2호기 OFF' : '2호기 ON'}
        </button>
      </div>
      <div className="stat">
        <p>3호기: {getStatusCircle(no3PowerState.toString())}</p>
        <button onClick={() => sendMessage('11', no3PowerState.toString() === 'true' ? '0' : '1')}>
          {no3PowerState.toString() === 'true' ? '3호기 OFF' : '3호기 ON'}
        </button>
      </div>
      <div className="stat">
        <p>Sensor1: {getStatusCircle(sen1PowerState.toString())}</p>
        <button onClick={() => sendMessage('12', sen1PowerState.toString() === 'true' ? '0' : '1')}>
          {sen1PowerState.toString() === 'true' ? 'Sensor1 OFF' : 'Sensor1 ON'}
        </button>
      </div>
      <div className="stat">
        <p>Sensor2: {getStatusCircle(sen2PowerState.toString())}</p>
        <button onClick={() => sendMessage('13', sen2PowerState.toString() === 'true' ? '0' : '1')}>
          {sen2PowerState.toString() === 'true' ? 'Sensor2 OFF' : 'Sensor2 ON'}
        </button>
      </div>
    </div>
  );
};

export default StatusComponent;
