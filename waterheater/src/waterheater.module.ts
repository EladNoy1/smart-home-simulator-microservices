import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config.service';
import { WaterHeaterService } from './services/waterheater.service';
import { WaterHeaterController } from './waterheater.controller';

@Module({
  imports: [],
  controllers: [WaterHeaterController],
  providers: [WaterHeaterService, ConfigService],
})
export class WaterHeaterModule {}
