import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { ConfigService } from './services/config.service';
import { WaterHeaterModule } from './waterheater.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(WaterHeaterModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: new ConfigService().get('port'),
    },
  } as TcpOptions);

  await app.listen();
}
bootstrap();
