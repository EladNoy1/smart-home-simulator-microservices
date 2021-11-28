import { DeviceSignal } from "../enum/device-signal.enum";
export interface DeviceSignalEvent {
  signal: DeviceSignal;
  publishedAt: Date; // Time of event publishing
}
