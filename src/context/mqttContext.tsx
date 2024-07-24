import React, { createContext, useContext, ReactNode, useEffect, useRef } from 'react';
import mqtt from 'mqtt';
import { useSetAtom } from 'jotai';
import { updateAtoms } from '../utils/mqttUtils';
import {
  DataTimeAtom,
  StartStateAtom,
  No1ChipEmptyAtom,
  ResetStateAtom,
  No1PowerStateAtom,
  No2PowerStateAtom,
  No3PowerStateAtom,
  Sen1PowerStateAtom,
  Sen2PowerStateAtom,
  No1DelayTimeAtom,
  No1CountAtom,
  No2CountAtom,
  No3CountAtom,
  No3Motor1PositionAtom,
  No3Motor2PositionAtom,
  No2ChipAtom,
  No2CubeFullAtom,
  No2OperationModeAtom,
  VisionCmdMemoryAtom,
  VelocityAtom,
  EmergencyStateAtom,
  InputLimitAtom,
  DiceValueAtom,
  DiceComparisonValueAtom,
  ColorSensorSensingAtom,
  No3GripperAtom
} from '../atom/mqtt/mqttAtom';

const MqttContext = createContext<null>(null);

export const useMqtt = () => useContext(MqttContext);

type MqttProviderProps = {
  children: ReactNode;
};

const atomMap = {
  '0': DataTimeAtom,
  '1': StartStateAtom,
  '2': No1ChipEmptyAtom,
  '8': ResetStateAtom,
  '9': No1PowerStateAtom,
  '10': No2PowerStateAtom,
  '11': No3PowerStateAtom,
  '12': Sen1PowerStateAtom,
  '13': Sen2PowerStateAtom,
  '14': No1DelayTimeAtom,
  '15': No1CountAtom,
  '16': No2CountAtom,
  '17': No3CountAtom,
  '21': No3Motor1PositionAtom,
  '22': No3Motor2PositionAtom,
  '24': No2ChipAtom,
  '25': No2CubeFullAtom,
  '31': No2OperationModeAtom,
  '33': VisionCmdMemoryAtom,
  '34': VelocityAtom,
  '35': EmergencyStateAtom,
  '36': InputLimitAtom,
  '37': DiceValueAtom,
  '38': DiceComparisonValueAtom,
  '39': ColorSensorSensingAtom,
  '40': No3GripperAtom
};

export const MqttProvider: React.FC<MqttProviderProps> = ({ children }) => {
  const setDataTime = useSetAtom(DataTimeAtom);
  const setStartState = useSetAtom(StartStateAtom);
  const setNo1ChipEmpty = useSetAtom(No1ChipEmptyAtom);
  const setResetState = useSetAtom(ResetStateAtom);
  const setNo1PowerState = useSetAtom(No1PowerStateAtom);
  const setNo2PowerState = useSetAtom(No2PowerStateAtom);
  const setNo3PowerState = useSetAtom(No3PowerStateAtom);
  const setSen1PowerState = useSetAtom(Sen1PowerStateAtom);
  const setSen2PowerState = useSetAtom(Sen2PowerStateAtom);
  const setNo1DelayTime = useSetAtom(No1DelayTimeAtom);
  const setNo1Count = useSetAtom(No1CountAtom);
  const setNo2Count = useSetAtom(No2CountAtom);
  const setNo3Count = useSetAtom(No3CountAtom);
  const setNo3Motor1Position = useSetAtom(No3Motor1PositionAtom);
  const setNo3Motor2Position = useSetAtom(No3Motor2PositionAtom);
  const setNo2Chip = useSetAtom(No2ChipAtom);
  const setNo2CubeFull = useSetAtom(No2CubeFullAtom);
  const setNo2OperationMode = useSetAtom(No2OperationModeAtom);
  const setVisionCmdMemory = useSetAtom(VisionCmdMemoryAtom);
  const setVelocity = useSetAtom(VelocityAtom);
  const setEmergencyState = useSetAtom(EmergencyStateAtom);
  const setInputLimit = useSetAtom(InputLimitAtom);
  const setDiceValue = useSetAtom(DiceValueAtom);
  const setDiceComparisonValue = useSetAtom(DiceComparisonValueAtom);
  const setColorSensorSensing = useSetAtom(ColorSensorSensingAtom);
  const setNo3Gripper = useSetAtom(No3GripperAtom);

  const previousDataRef = useRef<{ [key: string]: string }>({});

  useEffect(() => {
    const client = mqtt.connect('ws://192.168.0.19:9001/mqtt');

    client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      client.subscribe('edge/edukit/status');
    });

    client.on('message', (topic, message) => {
      const parsedMessage: { tagId: string; value: string }[] = JSON.parse(message.toString());
      updateAtoms(parsedMessage, previousDataRef.current, atomMap, {
        '0': setDataTime,
        '1': setStartState,
        '2': setNo1ChipEmpty,
        '8': setResetState,
        '9': setNo1PowerState,
        '10': setNo2PowerState,
        '11': setNo3PowerState,
        '12': setSen1PowerState,
        '13': setSen2PowerState,
        '14': setNo1DelayTime,
        '15': setNo1Count,
        '16': setNo2Count,
        '17': setNo3Count,
        '21': setNo3Motor1Position,
        '22': setNo3Motor2Position,
        '24': setNo2Chip,
        '25': setNo2CubeFull,
        '31': setNo2OperationMode,
        '33': setVisionCmdMemory,
        '34': setVelocity,
        '35': setEmergencyState,
        '36': setInputLimit,
        '37': setDiceValue,
        '38': setDiceComparisonValue,
        '39': setColorSensorSensing,
        '40': setNo3Gripper
      });
      previousDataRef.current = parsedMessage.reduce((acc: { [key: string]: string }, data) => {
        acc[data.tagId] = data.value;
        return acc;
      }, {});
    });

    return () => {
      client.end();
    };
  }, [
    setDataTime,
    setStartState,
    setNo1ChipEmpty,
    setResetState,
    setNo1PowerState,
    setNo2PowerState,
    setNo3PowerState,
    setSen1PowerState,
    setSen2PowerState,
    setNo1DelayTime,
    setNo1Count,
    setNo2Count,
    setNo3Count,
    setNo3Motor1Position,
    setNo3Motor2Position,
    setNo2Chip,
    setNo2CubeFull,
    setNo2OperationMode,
    setVisionCmdMemory,
    setVelocity,
    setEmergencyState,
    setInputLimit,
    setDiceValue,
    setDiceComparisonValue,
    setColorSensorSensing,
    setNo3Gripper
  ]);

  return <MqttContext.Provider value={null}>{children}</MqttContext.Provider>;
};
