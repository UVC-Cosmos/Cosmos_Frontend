import React from 'react';
import { useAtom } from 'jotai';
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

const MqttPage: React.FC = () => {
  const [dataTime] = useAtom(DataTimeAtom);
  const [startState] = useAtom(StartStateAtom);
  const [no1ChipEmpty] = useAtom(No1ChipEmptyAtom);
  const [resetState] = useAtom(ResetStateAtom);
  const [no1PowerState] = useAtom(No1PowerStateAtom);
  const [no2PowerState] = useAtom(No2PowerStateAtom);
  const [no3PowerState] = useAtom(No3PowerStateAtom);
  const [sen1PowerState] = useAtom(Sen1PowerStateAtom);
  const [sen2PowerState] = useAtom(Sen2PowerStateAtom);
  const [no1DelayTime] = useAtom(No1DelayTimeAtom);
  const [no1Count] = useAtom(No1CountAtom);
  const [no2Count] = useAtom(No2CountAtom);
  const [no3Count] = useAtom(No3CountAtom);
  const [no3Motor1Position] = useAtom(No3Motor1PositionAtom);
  const [no3Motor2Position] = useAtom(No3Motor2PositionAtom);
  const [no2Chip] = useAtom(No2ChipAtom);
  const [no2CubeFull] = useAtom(No2CubeFullAtom);
  const [no2OperationMode] = useAtom(No2OperationModeAtom);
  const [visionCmdMemory] = useAtom(VisionCmdMemoryAtom);
  const [velocity] = useAtom(VelocityAtom);
  const [emergencyState] = useAtom(EmergencyStateAtom);
  const [inputLimit] = useAtom(InputLimitAtom);
  const [diceValue] = useAtom(DiceValueAtom);
  const [diceComparisonValue] = useAtom(DiceComparisonValueAtom);
  const [colorSensorSensing] = useAtom(ColorSensorSensingAtom);
  const [no3Gripper] = useAtom(No3GripperAtom);

  return (
    <div>
      <h1>MqttPage</h1>
      <div>
        <h2>Machine States</h2>
        <p>Data Time: {dataTime}</p>
        <p>Start State: {startState}</p>
        <p>No1 Chip Empty: {no1ChipEmpty}</p>
        <p>Reset State: {resetState}</p>
        <p>No1 Power State: {no1PowerState}</p>
        <p>No2 Power State: {no2PowerState}</p>
        <p>No3 Power State: {no3PowerState}</p>
        <p>Sen1 Power State: {sen1PowerState}</p>
        <p>Sen2 Power State: {sen2PowerState}</p>
        <p>No1 Delay Time: {no1DelayTime}</p>
        <p>No1 Count: {no1Count}</p>
        <p>No2 Count: {no2Count}</p>
        <p>No3 Count: {no3Count}</p>
        <p>No3 Motor 1 Position: {no3Motor1Position}</p>
        <p>No3 Motor 2 Position: {no3Motor2Position}</p>
        <p>No2 Chip: {no2Chip}</p>
        <p>No2 Cube Full: {no2CubeFull}</p>
        <p>No2 Operation Mode: {no2OperationMode}</p>
        <p>Vision Cmd Memory: {visionCmdMemory}</p>
        <p>Velocity: {velocity}</p>
        <p>Emergency State: {emergencyState}</p>
        <p>Input Limit: {inputLimit}</p>
        <p>Dice Value: {diceValue}</p>
        <p>Dice Comparison Value: {diceComparisonValue}</p>
        <p>Color Sensor Sensing: {colorSensorSensing}</p>
        <p>No3 Gripper: {no3Gripper}</p>
      </div>
    </div>
  );
};

export default MqttPage;
