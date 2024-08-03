import { useAtom } from 'jotai';
import React, { useEffect, useState, useRef } from 'react';
import redChipImage from '../../assets/redChipImage.png';
import whiteChipImage from '../../assets/whiteChipImage.png';
import { No1CountAtom, No2SensingMemoryAtom } from '../../atom/mqtt/mqttAtom';

const ColorSensorComponent: React.FC = () => {
  const [no1CountString] = useAtom(No1CountAtom);
  const [no2SensingMemory] = useAtom(No2SensingMemoryAtom);
  const no1Count = parseInt(no1CountString, 10);
  // const isChipColor = useRef<boolean>(false);
  const [chipColor, setChipColor] = useState<string>('');
  const [previousNo1Count, setPreviousNo1Count] = useState<number>(isNaN(no1Count) ? 0 : no1Count);
  const sensingMemoryRef = useRef(no2SensingMemory);

  useEffect(() => {
    sensingMemoryRef.current = no2SensingMemory;
  }, [no2SensingMemory]);

  useEffect(() => {
    if (no1Count > previousNo1Count) {
      const timeoutId = setTimeout(() => {
        if (sensingMemoryRef.current.toString() === 'true') {
          setChipColor('white');
          // isChipColor.current = true;
        } else {
          setChipColor('red');
          // isChipColor.current = true;
        }
      }, 5000);

      setPreviousNo1Count(no1Count);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [no1Count]);

  return (
    <div className="p-2 bg-bgComp h-[100%]">
      <h2 className="font-bold text-white mb-4 text-2xl">반출 된 칩 색깔</h2>
      <div className="flex items-center justify-center">
        {chipColor && (
          <img
            src={chipColor === 'white' ? whiteChipImage : redChipImage}
            alt="Chip Color"
            className="w-36 h-36"
          />
        )}
      </div>
    </div>
  );
};

export default ColorSensorComponent;
