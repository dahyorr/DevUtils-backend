import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HashType } from 'src/types';

@Injectable()
export class PublishService {
  constructor(
    @Inject('HASHING_SERVICE') private readonly client: ClientProxy,
  ) {}

  publishMessage(pattern: HashType, message: string) {
    /* publishes message to worker with rabbitmq */
    this.client.emit(pattern, message);
  }
  
}
