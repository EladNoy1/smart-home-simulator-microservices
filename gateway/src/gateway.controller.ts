import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { firstValueFrom, timeout } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { DeviceSignal } from '../../common/enum/device-signal.enum';

@Controller('gateway')
@ApiTags('gateway')
export class GatewayController {
  constructor(
    @Inject('LIGHTSWITCH_SERVICE')
    private readonly lightSwitchServiceClient: ClientProxy,
    @Inject('WATERHEATER_SERVICE')
    private readonly waterHeaterServiceClient: ClientProxy,
    @Inject('AIRCONDITIONER_SERVICE')
    private readonly airConditionerServiceClient: ClientProxy,
    @Inject('FETCHER_SERVICE')
    private readonly fetcherServiceClient: ClientProxy,
  ) {}

  @Get('/sanity')
  sanity() {
    return 'Gateway microservice is live.';
  }

  @Get('/sanity/lightswitch')
  async sanityLightswitch() {
    const response = await firstValueFrom(
      this.lightSwitchServiceClient
        .send<string>('sanity', {})
        .pipe(timeout(5000)),
    );
    return response;
  }

  @Get('/sanity/waterheater')
  async sanityWaterHeater() {
    console.log(this.waterHeaterServiceClient);

    const response = await firstValueFrom(
      this.waterHeaterServiceClient
        .send<string>('sanity', {})
        .pipe(timeout(5000)),
    );
    return response;
  }

  @Get('/sanity/airconditioner')
  async sanityAirConditioner() {
    const response = await firstValueFrom(
      this.airConditionerServiceClient
        .send<string>('sanity', {})
        .pipe(timeout(5000)),
    );
    return response;
  }

  @Post('/test/lightswitch/')
  manualTestLightSwitchService(@Body('signal') signal: DeviceSignal) {
    const response = this.lightSwitchServiceClient.send<string, DeviceSignal>(
      'manual_signal_device',
      signal,
    );
    return response;
  }

  @Post('test/waterheater/')
  manualTestWaterHeaterService(@Body('signal') signal: DeviceSignal) {
    const response = this.waterHeaterServiceClient.send<string, DeviceSignal>(
      'manual_signal_device',
      signal,
    );
    return response;
  }

  @Post('test/airconditioner/')
  manualTestAirConditionerService(@Body('signal') signal: DeviceSignal) {
    const response = this.airConditionerServiceClient.send<
      string,
      DeviceSignal
    >('manual_signal_device', signal);
    return response;
  }

  @Get('/fetch_weather_data/')
  manualFetchWeatherData() {
    const response = this.fetcherServiceClient.send<object, object>(
      'manual_fetch',
      {},
    );
    return response;
  }

  @Get('/state/lightswitch')
  getLightSwitchState() {
    const response = this.lightSwitchServiceClient.send<string, object>(
      'state_report',
      {},
    );
    return response;
  }

  @Get('/state/waterheater')
  getWaterHeaterState() {
    const response = this.waterHeaterServiceClient.send<string, object>(
      'state_report',
      {},
    );
    return response;
  }

  @Get('/state/airconditioner')
  getAirConditionerState() {
    const response = this.airConditionerServiceClient.send<string, object>(
      'state_report',
      {},
    );
    return response;
  }
}
