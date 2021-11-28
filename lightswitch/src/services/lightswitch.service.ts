import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConfigService } from './config.service';
import { DeviceSignal } from '../../../common/enum/device-signal.enum';
import { SmartDeviceService } from '../../../common/interfaces/smart-device-service.interface';
import { DeviceStateChange } from '../../../common/interfaces/device-state-change.interface';

@Injectable()
export class LightSwitchService implements SmartDeviceService {
  constructor(private readonly configService: ConfigService) {}

  private isOn: boolean;

  public handleSignal(signal: string): DeviceStateChange {
    const oldState = this.stateReport();
    let outputMessage: string;

    switch (signal) {
      case DeviceSignal.HOT:
        outputMessage = `'${signal}' received, turning lights on`;
        this.isOn = true;
        break;

      case DeviceSignal.COLD:
        outputMessage = `'${signal}' received, turning lights off`;
        this.isOn = false;
        break;

      case DeviceSignal.NORMAL:
        outputMessage = outputMessage = `'${signal}' received, leaving light switch state unchanged`;
        break;

      default:
        outputMessage = `'${signal}' signal received, an invalid signal. Leaving light switch state unchanged.`;
        break;
    }

    const newState = this.stateReport();
    console.log(outputMessage);
    return { oldState, newState };
  }

  public stateReport(): string {
    return `Light switches are currently ${this.isOn ? 'on' : 'off'}`;
  }
}
