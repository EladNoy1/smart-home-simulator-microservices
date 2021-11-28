import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.PUBLISHER_SERVICE_PORT;
    this.envConfig.lightSwitchService = {
      options: {
        port: process.env.LIGHTSWITCH_SERVICE_PORT,
        host: process.env.LIGHTSWITCH_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.waterHeaterService = {
      options: {
        port: process.env.WATERHEATER_SERVICE_PORT,
        host: process.env.WATERHEATER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.airConditionerService = {
      options: {
        port: process.env.AIRCONDITIONER_SERVICE_PORT,
        host: process.env.AIRCONDITIONER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
