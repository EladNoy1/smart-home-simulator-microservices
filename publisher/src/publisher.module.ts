import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PublisherController } from './publisher.controller';
import { ConfigService } from './services/config.service';

@Module({
  imports: [],
  controllers: [PublisherController],
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
  ],
})
export class PublisherModule {}
