import React from 'react';
import { useAtom } from 'jotai';
import {
  StartStateAtom,
  EmergencyStateAtom,
  No1PowerStateAtom,
  No2PowerStateAtom,
  No3PowerStateAtom,
  Sen1PowerStateAtom,
  Sen2PowerStateAtom
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

  const getStatusCircle = (state: string) => (
    <span
      style={{
        display: 'inline-block',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: state === 'true' ? 'limegreen' : 'red',
        marginLeft: '10px'
      }}
    />
  );

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <h2>기기 상태</h2>
      <div className="flex">
        <p>시작/정지: {getStatusCircle(startState.toString())}</p>
        <button onClick={() => sendMessage('1', startState.toString() === 'true' ? '0' : '1')}>
          {startState.toString() === 'true' ? 'Stop' : 'Start'}
        </button>
      </div>
      <div className="flex">
        <p>비상정지: {getStatusCircle(emergencyState.toString())}</p>
      </div>
      <div className="flex">
        <p>1호기: {getStatusCircle(no1PowerState.toString())}</p>
        <button onClick={() => sendMessage('9', no1PowerState.toString() === 'true' ? '0' : '1')}>
          {no1PowerState.toString() === 'true' ? '1호기 OFF' : '1호기 ON'}
        </button>
      </div>
      <div className="flex">
        <p>2호기: {getStatusCircle(no2PowerState.toString())}</p>
        <button onClick={() => sendMessage('10', no2PowerState.toString() === 'true' ? '0' : '1')}>
          {no2PowerState.toString() === 'true' ? '2호기 OFF' : '2호기 ON'}
        </button>
      </div>
      <div className="flex">
        <p>3호기: {getStatusCircle(no3PowerState.toString())}</p>
        <button onClick={() => sendMessage('11', no3PowerState.toString() === 'true' ? '0' : '1')}>
          {no3PowerState.toString() === 'true' ? '3호기 OFF' : '3호기 ON'}
        </button>
      </div>
      <div className="flex">
        <p>Sensor1: {getStatusCircle(sen1PowerState.toString())}</p>
        <button onClick={() => sendMessage('12', sen1PowerState.toString() === 'true' ? '0' : '1')}>
          {sen1PowerState.toString() === 'true' ? 'Sensor1 OFF' : 'Sensor1 ON'}
        </button>
      </div>
      <div className="flex">
        <p>Sensor2: {getStatusCircle(sen2PowerState.toString())}</p>
        <button onClick={() => sendMessage('13', sen2PowerState.toString() === 'true' ? '0' : '1')}>
          {sen2PowerState.toString() === 'true' ? 'Sensor2 OFF' : 'Sensor2 ON'}
        </button>
      </div>
    </div>
  );
};

export default StatusComponent;
