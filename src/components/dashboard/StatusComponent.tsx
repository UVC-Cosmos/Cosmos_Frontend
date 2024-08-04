import classNames from 'classnames';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import {
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
  const [no1PowerState] = useAtom(No1PowerStateAtom);
  const [no2PowerState] = useAtom(No2PowerStateAtom);
  const [no3PowerState] = useAtom(No3PowerStateAtom);
  const [sen1PowerState] = useAtom(Sen1PowerStateAtom);
  const [sen2PowerState] = useAtom(Sen2PowerStateAtom);
  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));

  const userPermissions = user.Lines; // 유저가 제어할 수 있는 권한 배열

  const commandMapping: { [key: string]: { id: number; name: string } } = {
    '9': { id: 1, name: '1호기' },
    '10': { id: 2, name: '2호기' },
    '11': { id: 3, name: '3호기' },
    '12': { id: 4, name: '센서1' },
    '13': { id: 5, name: '센서2' }
  };
  const handleToggle = (command: string, state: string) => {
    const device = commandMapping[command];

    if (device) {
      const hasPermission = userPermissions.some((permission) => permission.id === device.id);

      if (hasPermission) {
        console.log(`${device.name}를 제어합니다.`);
        sendMessage(command, state === 'true' ? '0' : '1');
      } else {
        // 권한이 없는 경우, 경고를 띄움
        alert(`권한이 없어 ${device.name}를 제어할 수 없습니다.`);
        return;
      }
    }
    sendMessage(command, state === 'true' ? '0' : '1');
  };

  return (
    <div className="flex flex-col items-center w-[9vw]">
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white opacity-100 font-bold text-sm">리셋</div>
        <button onClick={() => sendMessage('8', '1')} className="btn btn-primary min-h-5 h-5">
          reset
        </button>
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw] mt-1">
        <div className="text-white opacity-100 font-bold text-sm">가동</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={startState.toString() === 'true'}
          onChange={() => handleToggle('1', startState.toString())}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw] mt-1">
        <div className="text-white font-bold text-sm">1호기</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={no1PowerState.toString() === 'true'}
          onChange={() => handleToggle('9', no1PowerState.toString())}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw] mt-1">
        <div className="text-white font-bold text-sm">2호기</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={no2PowerState.toString() === 'true'}
          onChange={() => handleToggle('10', no2PowerState.toString())}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw] mt-1">
        <div className="text-white font-bold text-sm">3호기</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={no3PowerState.toString() === 'true'}
          onChange={() => handleToggle('11', no3PowerState.toString())}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw] mt-1">
        <div className="text-white font-bold text-sm">센서</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={sen1PowerState.toString() === 'true'}
          onChange={() => handleToggle('12', sen1PowerState.toString())}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw] mt-1">
        <div className="text-white font-bold text-sm">센서2</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={sen2PowerState.toString() === 'true'}
          onChange={() => handleToggle('13', sen2PowerState.toString())}
        />
      </div>
    </div>
  );
};

export default StatusComponent;
