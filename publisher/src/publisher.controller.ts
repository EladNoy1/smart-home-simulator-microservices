import { Controller, Inject } from '@nestjs/common';
import { firstValueFrom, timeout } from 'rxjs';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

import { DeviceSignal } from '../..//common/enum/device-signal.enum';
import { DeviceSignalEvent } from '../../common/interfaces/device-signal-event.interface';

@Controller('publisher')
export class PublisherController {
  constructor(
    @Inject('LIGHTSWITCH_SERVICE')
    private readonly lightSwitchServiceClient: ClientProxy,
    @Inject('WATERHEATER_SERVICE')
    private readonly waterHeaterServiceClient: ClientProxy,
    @Inject('AIRCONDITIONER_SERVICE')
    private readonly airConditionerServiceClient: ClientProxy,
  ) {}

  @MessagePattern('receive_signal')
  publishSignalEvent(signal: DeviceSignal): string {
    console.log('Publisher received signal, passing on event');

    const deviceSignalEvent: DeviceSignalEvent = {
      signal,
      publishedAt: new Date(),
    };
    this.lightSwitchServiceClient.emit<string, DeviceSignalEvent>(
      'signal_devices',
      deviceSignalEvent,
    );
    this.waterHeaterServiceClient.emit<string, DeviceSignalEvent>(
      'signal_devices',
      deviceSignalEvent,
    );
    this.airConditionerServiceClient.emit<string, DeviceSignalEvent>(
      'signal_devices',
      deviceSignalEvent,
    );

    return 'Device signal event was published';
  }

  @MessagePattern('sanity')
  sanity() {
    return 'Publisher microservice is live.';
  }
}
