import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;
  readonly openWeatherApiKey = 'fca198d1c513a10caef780cd84517423';

  constructor() {
    this.envConfig = {
      port: process.env.FETCHER_SERVICE_PORT,
    };
    this.envConfig.baseUri = process.env.BASE_URI;

    this.envConfig.publisherService = {
      options: {
        port: process.env.PUBLISHER_SERVICE_PORT,
        host: process.env.PUBLISHER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
