import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PublishService {
  constructor(
    @Inject('HASHING_SERVICE') private readonly client: ClientProxy,
  ) {}

  publishMessage(pattern: string, message: string) {
    this.client.emit(pattern, message);
  }
  
}
