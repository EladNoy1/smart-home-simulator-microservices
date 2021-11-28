import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { LightSwitchController } from './lightswitch.controller';
import { LightSwitchService } from './services/lightswitch.service';
import { ConfigService } from './services/config.service';

@Module({
  imports: [],
  controllers: [LightSwitchController],
  providers: [LightSwitchService, ConfigService],
})
export class LightSwitchModule {}
