import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import {
  MessagePattern,
  ClientProxy,
  EventPattern,
} from '@nestjs/microservices';
import { WaterHeaterService } from './services/waterheater.service';
import { SmartDeviceController } from '../../common/interfaces/smart-device-controller.interface';
import { DeviceStateChange } from '../../common/interfaces/device-state-change.interface';
import { DeviceSignal } from '../../common/enum/device-signal.enum';
import { DeviceSignalEvent } from '../../common/interfaces/device-signal-event.interface';

@Controller('lightswitch')
export class WaterHeaterController implements SmartDeviceController {
  constructor(private readonly waterHeaterService: WaterHeaterService) {}

  @MessagePattern('sanity')
  public sanityCheck(payload: object) {
    return 'Water Heater microservice is live';
  }

  @EventPattern('signal_devices')
  public handleSignalEvent(signalEvent: DeviceSignalEvent): DeviceStateChange {
    return this.waterHeaterService.handleSignal(signalEvent.signal);
  }

  @MessagePattern('manual_signal_device')
  public handleManualSignal(signal: DeviceSignal): DeviceStateChange {
    return this.waterHeaterService.handleSignal(signal);
  }

  @MessagePattern('state_report')
  public stateReport(payload: object): string {
    return this.waterHeaterService.stateReport();
  }
}
