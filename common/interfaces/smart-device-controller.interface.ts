import { DeviceSignal } from "../enum/device-signal.enum";
import { DeviceStateChange } from "./device-state-change.interface";
import { DeviceSignalEvent } from "./device-signal-event.interface";

export interface SmartDeviceController {
  handleSignalEvent: (signal: DeviceSignalEvent) => DeviceStateChange;
  handleManualSignal: (signal: DeviceSignal) => DeviceStateChange;
  stateReport: (payload: object) => string;
}
