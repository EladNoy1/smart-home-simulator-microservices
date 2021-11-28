import { DeviceSignal } from "../enum/device-signal.enum";
import { DeviceStateChange } from "./device-state-change.interface";

export interface SmartDeviceService {
  stateReport: () => string;
  handleSignal: (DeviceSignal) => DeviceStateChange;
}
