import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { time } from 'console';
import { Model } from 'mongoose';
import { TEMP_RANGE } from '../constants/temp-range.const';
import { TempChangeBySignal } from '../interfaces/temp-change-by-signal.interface';
import { setTimeout } from 'timers';
import { DeviceSignal } from '../../../common/enum/device-signal.enum';
import { DeviceStateChange } from '../../../common/interfaces/device-state-change.interface';
import { SmartDeviceService } from '../../../common/interfaces/smart-device-service.interface';
import { ConfigService } from './config.service';

@Injectable()
export class AirConditionerService implements SmartDeviceService {
  constructor(private readonly configService: ConfigService) {}

  private isOn: boolean;
  private currentTemp: number = 25; // Default temp is 25 degrees celsius
  private tempChangeBySignal: TempChangeBySignal = { hot: -10, cold: 13 };

  public handleSignal(signal: DeviceSignal): DeviceStateChange {
    const oldState = this.stateReport();
    let outputMessage;

    switch (signal) {
      case DeviceSignal.COLD:
        this.isOn = true;
        this.currentTemp = Math.min(
          TEMP_RANGE.maxTemp,
          this.currentTemp + this.tempChangeBySignal.cold,
        );

        outputMessage = `'${signal}'' received, increasing temperature by ${this.tempChangeBySignal.cold} degrees celsius to ${this.currentTemp} degrees celsius`;
        break;

      case DeviceSignal.HOT:
        this.isOn = true;
        this.currentTemp = Math.max(
          TEMP_RANGE.minTemp,
          this.currentTemp + this.tempChangeBySignal.hot,
        );

        outputMessage = `'${signal}'' received, decreasing temperature by ${this.tempChangeBySignal.hot} degrees celsius to ${this.currentTemp} degrees celsius`;
        break;

      case DeviceSignal.NORMAL:
        this.isOn = false;
        outputMessage = `'${signal}'' signal received, turning off air conditioner unit`;
        break;

      default:
        outputMessage = `'${signal}'' signal received, an invalid signal. Leaving air conditioner state unchanged.`;
        break;
    }

    const newState = this.stateReport();
    console.log(outputMessage);

    return { oldState, newState };
  }

  public stateReport(): string {
    return `Air Conditioner is currently ${
      this.isOn ? 'on' : 'off'
    }, temperature is set to ${this.currentTemp} degrees celsius`;
  }
}
