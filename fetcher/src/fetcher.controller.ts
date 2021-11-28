import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import {
  MessagePattern,
  ClientProxy,
  EventPattern,
} from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';

import { firstValueFrom, timeout } from 'rxjs';
import { DeviceSignal } from '../../common/enum/device-signal.enum';

import { FetcherService } from './services/fetcher.service';

@Controller('fetcher')
export class FetcherController {
  constructor(
    private readonly fetcherService: FetcherService,
    @Inject('PUBLISHER_SERVICE')
    private readonly publisherServiceClient: ClientProxy,
  ) {}

  @MessagePattern('manual_fetch')
  public async manualFetchWeather(payload: object): Promise<string> {
    const { message, signal } = await this.fetcherService.manualSignalRoutine();

    const response = await firstValueFrom(
      this.publisherServiceClient
        .send<string>('receive_signal', signal)
        .pipe(timeout(5000)),
    );

    return message;
  }

  // Fetch weather data every hour
  @Cron('* 0 * * * * ')
  public async routineFetchWeather() {
    const signal = await this.fetcherService.hourlySignalRoutine();

    const response = await firstValueFrom(
      this.publisherServiceClient
        .send<string>('receive_signal', signal)
        .pipe(timeout(8000)),
    );
  }
}
