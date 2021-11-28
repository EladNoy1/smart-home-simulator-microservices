import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import {
  MessagePattern,
  ClientProxy,
  EventPattern,
} from '@nestjs/microservices';

import { DeviceSignal } from '../../common/enum/device-signal.enum';
import { DeviceSignalEvent } from '../../common/interfaces/device-signal-event.interface';
import { DeviceStateChange } from '../../common/interfaces/device-state-change.interface';
import { SmartDeviceController } from '../../common/interfaces/smart-device-controller.interface';
import { LightSwitchService } from './services/lightswitch.service';

@Controller('lightswitch')
export class LightSwitchController implements SmartDeviceController {
  constructor(private readonly lightSwitchService: LightSwitchService) {}

  @MessagePattern('sanity')
  public sanityCheck(payload) {
    return 'Light switches service is live';
  }

  @EventPattern('signal_devices')
  public handleSignalEvent(signalEvent: DeviceSignalEvent): DeviceStateChange {
    return this.lightSwitchService.handleSignal(signalEvent.signal);
  }

  @MessagePattern('manual_signal_device')
  public handleManualSignal(signal: DeviceSignal): DeviceStateChange {
    return this.lightSwitchService.handleSignal(signal);
  }

  @MessagePattern('state_report')
  public stateReport(payload: object): string {
    return this.lightSwitchService.stateReport();
  }
}
