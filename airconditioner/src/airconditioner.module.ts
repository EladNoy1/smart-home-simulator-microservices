import { Module } from '@nestjs/common';
import { AirConditionerController } from './airconditioner.controller';
import { AirConditionerService } from './services/airconditioner.service';
import { ConfigService } from './services/config.service';

@Module({
  imports: [],
  controllers: [AirConditionerController],
  providers: [AirConditionerService, ConfigService],
})
export class AirConditionerModule {}
