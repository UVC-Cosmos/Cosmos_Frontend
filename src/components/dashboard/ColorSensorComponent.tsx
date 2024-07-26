import React, { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { No1CountAtom, No2SensingMemoryAtom } from '../../atom/mqtt/mqttAtom';
import whiteChipImage from '../../assets/whiteChipImage.png';
import redChipImage from '../../assets/redChipImage.jpeg';

const ColorSensorComponent: React.FC = () => {
  const [no1CountString] = useAtom(No1CountAtom);
  const [no2SensingMemory] = useAtom(No2SensingMemoryAtom);
  const no1Count = parseInt(no1CountString, 10);

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
        } else {
          setChipColor('red');
        }
      }, 5000);

      setPreviousNo1Count(no1Count);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [no1Count]);

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white m-4">
      <h2 className="text-lg font-bold mb-4">반출 된 칩 색깔</h2>
      {chipColor && (
        <img
          src={chipColor === 'white' ? whiteChipImage : redChipImage}
          alt="Chip Color"
          className="w-24 h-24"
        />
      )}
    </div>
  );
};

export default ColorSensorComponent;
