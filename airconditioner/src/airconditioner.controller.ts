import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import {
  MessagePattern,
  ClientProxy,
  EventPattern,
} from '@nestjs/microservices';
import { DeviceSignal } from '../../common/enum/device-signal.enum';
import { AirConditionerService } from './services/airconditioner.service';
import { SmartDeviceController } from '../../common/interfaces/smart-device-controller.interface';
import { DeviceStateChange } from '../../common/interfaces/device-state-change.interface';
import { DeviceSignalEvent } from '../../common/interfaces/device-signal-event.interface';

@Controller('airconditioner')
export class AirConditionerController implements SmartDeviceController {
  constructor(private readonly airConditionerService: AirConditionerService) {}

  @MessagePattern('sanity')
  public sanityCheck(payload) {
    return 'Air Conditioner Microservice is live';
  }

  @EventPattern('signal_devices')
  public handleSignalEvent(signalEvent: DeviceSignalEvent): DeviceStateChange {
    return this.airConditionerService.handleSignal(signalEvent.signal);
  }

  @MessagePattern('manual_signal_device')
  public handleManualSignal(signal: DeviceSignal): DeviceStateChange {
    return this.airConditionerService.handleSignal(signal);
  }

  @MessagePattern('state_report')
  public stateReport(payload: object): string {
    return this.airConditionerService.stateReport();
  }
}
