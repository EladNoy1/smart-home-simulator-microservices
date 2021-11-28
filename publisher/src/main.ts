import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { PublisherModule } from './publisher.module';
import { ConfigService } from './services/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PublisherModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: new ConfigService().get('port'),
    },
  } as TcpOptions);

  await app.listen();
}
bootstrap();
