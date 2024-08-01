import classNames from 'classnames';
import { useAtom } from 'jotai';
import React from 'react';
import {
  // EmergencyStateAtom,
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
  // const [emergencyState] = useAtom(EmergencyStateAtom);
  const [no1PowerState] = useAtom(No1PowerStateAtom);
  const [no2PowerState] = useAtom(No2PowerStateAtom);
  const [no3PowerState] = useAtom(No3PowerStateAtom);
  const [sen1PowerState] = useAtom(Sen1PowerStateAtom);
  const [sen2PowerState] = useAtom(Sen2PowerStateAtom);

  const getStatusColor = (state: string) => {
    if (state === 'true') {
      return 'bg-colorOn';
    } else if (state === 'false') {
      return 'bg-colorOff';
    } else {
      return 'bg-colorNone';
    }
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
        <div>
          <button
            className={classNames('btn btn-sm min-h-5 h-5', getStatusColor(startState.toString()))}
            onClick={() => sendMessage('1', startState.toString() === 'true' ? '0' : '1')}
          >
            {startState.toString() === 'true' ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white font-bold text-sm">1호기</div>
        <div>
          <button
            className={classNames(
              'btn btn-sm min-h-5 h-5',
              getStatusColor(no1PowerState.toString())
            )}
            onClick={() => sendMessage('9', no1PowerState.toString() === 'true' ? '0' : '1')}
          >
            {no1PowerState.toString() === 'true' ? 'OFF' : 'ON'}
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white font-bold text-sm">2호기</div>
        <div>
          <button
            className={classNames(
              'btn btn-sm min-h-5 h-5',
              getStatusColor(no2PowerState.toString())
            )}
            onClick={() => sendMessage('10', no2PowerState.toString() === 'true' ? '0' : '1')}
          >
            {no2PowerState.toString() === 'true' ? 'OFF' : 'ON'}
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white font-bold text-sm">3호기</div>
        <div>
          <button
            className={classNames(
              'btn btn-sm min-h-5 h-5',
              getStatusColor(no3PowerState.toString())
            )}
            onClick={() => sendMessage('11', no3PowerState.toString() === 'true' ? '0' : '1')}
          >
            {no3PowerState.toString() === 'true' ? 'OFF' : 'ON'}
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white font-bold text-sm">센서</div>
        <div>
          <button
            className={classNames(
              'btn btn-sm min-h-5 h-5',
              getStatusColor(sen1PowerState.toString())
            )}
            onClick={() => sendMessage('12', sen1PowerState.toString() === 'true' ? '0' : '1')}
          >
            {sen1PowerState.toString() === 'true' ? 'OFF' : 'ON'}
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center justify-between w-[8vw]">
        <div className="text-white font-bold text-sm">센서2</div>
        <div>
          <button
            className={classNames(
              'btn btn-sm min-h-5 h-5',
              getStatusColor(sen2PowerState.toString())
            )}
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
