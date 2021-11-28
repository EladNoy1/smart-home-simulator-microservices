import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';

import { ConfigService } from './services/config.service';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [
    ConfigService,
    {
      provide: 'LIGHTSWITCH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const options = configService.get('lightSwitchService');
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    {
      provide: 'WATERHEATER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const options = configService.get('waterHeaterService');
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    {
      provide: 'AIRCONDITIONER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const options = configService.get('airConditionerService');
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    {
      provide: 'FETCHER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const options = configService.get('fetcherService');
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionGuard,
    // },
  ],
})
export class AppModule {}
