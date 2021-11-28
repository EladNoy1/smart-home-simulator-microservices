import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { FetcherController } from './fetcher.controller';
import { FetcherService } from './services/fetcher.service';
import { ConfigService } from './services/config.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  controllers: [FetcherController],
  providers: [
    FetcherService,
    ConfigService,
    {
      provide: 'PUBLISHER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const options = configService.get('publisherService');
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
  ],
})
export class FetcherModule {}
