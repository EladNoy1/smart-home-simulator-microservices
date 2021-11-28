import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConfigService } from './config.service';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DeviceSignal } from '../../../common/enum/device-signal.enum';
import { ClientProxy } from '@nestjs/microservices';
import { TEMP_THRESHOLD } from '../constants/temp-threshold.const';

@Injectable()
export class FetcherService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  previousSignal: DeviceSignal;

  @Cron('5 * * * * * ')
  private async minutelyFetchRoutine(signal: string): Promise<void> {
    await this.fetchWeatherData();
  }

  public async hourlySignalRoutine(): Promise<DeviceSignal> {
    const weatherData = this.fetchWeatherData();
    return this.signalByWeatherData(weatherData);
  }

  public async manualSignalRoutine(): Promise<{
    signal: DeviceSignal;
    message: string;
  }> {
    const weatherData = await this.fetchWeatherData();
    const signal = this.signalByWeatherData(weatherData);
    const message = this.messageByWeatherData(weatherData, signal);

    return { signal, message };
  }

  private async fetchWeatherData(): Promise<object> {
    const response = await firstValueFrom(
      this.httpService.get(
        `https://api.openweathermap.org/data/2.5/weather?q=tel%20aviv&units=metric&APPID=${this.configService.openWeatherApiKey}`,
      ),
    );

    console.log(response.data);
    return response.data;
  }

  private signalByWeatherData(weatherData: any) {
    const temperature = weatherData.main.temp;
    let outSignal: DeviceSignal;

    if (temperature > TEMP_THRESHOLD.hot) {
      outSignal = DeviceSignal.HOT;
    } else if (temperature < TEMP_THRESHOLD.cold) {
      outSignal = DeviceSignal.COLD;
    } else {
      outSignal = DeviceSignal.NORMAL;
    }

    return outSignal;
  }

  private messageByWeatherData(weatherData: any, signal: DeviceSignal): string {
    const message = `Read ${weatherData.main.temp} degrees in ${weatherData.name}, sent '${signal}'' signal`;
    return message;
  }
}
