import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { time } from 'console';
import { Model } from 'mongoose';
import { setTimeout } from 'timers';
import { DeviceSignal } from '../../../common/enum/device-signal.enum';
import { ConfigService } from './config.service';
import { SmartDeviceService } from '../../../common/interfaces/smart-device-service.interface';
import { DeviceStateChange } from '../../../common/interfaces/device-state-change.interface';
import { TIME_HOME } from '../constants/time-home.const';

@Injectable()
export class WaterHeaterService implements SmartDeviceService {
  constructor(private readonly configService: ConfigService) {}

  private isOn: boolean;
  private readonly heatingDurationInMinutes: number = 25;

  public handleSignal(signal: DeviceSignal): DeviceStateChange {
    const oldState = this.stateReport();
    let outputMessage: string;

    // Check if arriving home soon
    const timeHome = new Date();
    timeHome.setHours(TIME_HOME.hour);
    timeHome.setMinutes(TIME_HOME.minute);
    const minuteDifference = this.minuteDifference(new Date(), timeHome);
    const isHomeSoon = minuteDifference < 25;

    if (signal === DeviceSignal.COLD && isHomeSoon) {
      this.isOn = true; // Heat water
      console.log(
        `${signal} signal received, starting to heat water for ${this.heatingDurationInMinutes} minutes`,
      );

      setTimeout(() => {
        this.isOn = false;
        console.log('Finished heating water');
      }, this.heatingDurationInMinutes * 60 * 1000);
    } else {
      outputMessage = `Water Heater state is unchanged`;
    }

    console.log(outputMessage);
    const newState = this.stateReport();
    return { oldState, newState };
  }

  public stateReport(): string {
    return `Water heater is currently ${this.isOn ? 'on' : 'off'}`;
  }

  // TODO: Should be moved to a utilities service
  private minuteDifference(date1: Date, date2: Date): number {
    const differenceInMilliseconds = date1.getTime() - date2.getTime(); // This will give difference in milliseconds
    var differenceInMinutes = Math.round(differenceInMilliseconds / 60000);

    return differenceInMinutes;
  }
}
