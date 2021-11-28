import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.AIRCONDITIONER_SERVICE_PORT,
    };
    this.envConfig.baseUri = process.env.BASE_URI;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
