import classNames from 'classnames';
import { useAtom } from 'jotai';
import React from 'react';
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

  const handleToggle = (command: string, state: string) => {
    sendMessage(command, state === 'true' ? '0' : '1');
  };

  return (
    <div className="flex flex-col mb-2 items-center w-[9vw]">
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white opacity-100 font-bold text-sm">리셋</div>
        <button onClick={() => sendMessage('8', '1')} className="btn btn-primary min-h-5 h-5">
          reset
        </button>
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white opacity-100 font-bold text-sm">가동</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={startState.toString() === 'true'}
          onChange={() => handleToggle('1', startState.toString())}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white font-bold text-sm">1호기</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={no1PowerState.toString() === 'true'}
          onChange={() => handleToggle('9', no1PowerState.toString())}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white font-bold text-sm">2호기</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={no2PowerState.toString() === 'true'}
          onChange={() => handleToggle('10', no2PowerState.toString())}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white font-bold text-sm">3호기</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={no3PowerState.toString() === 'true'}
          onChange={() => handleToggle('11', no3PowerState.toString())}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white font-bold text-sm">센서</div>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={sen1PowerState.toString() === 'true'}
          onChange={() => handleToggle('12', sen1PowerState.toString())}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
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
