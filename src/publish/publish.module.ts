import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PublishService } from './publish.service';
// import { PublishController } from './publish.controller';
import { ConfigService } from '@nestjs/config';


@Module({
  // controllers: [PublishController],
  providers: [
    PublishService,
    {
      provide: 'HASHING_SERVICE',
      useFactory: (configService: ConfigService) =>{
        const connectionString = configService.get<string>('amqpString')
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [connectionString],
            queue: 'hashing-queue',
            queueOptions: {
              durable: true,
            }
          }
        })
      },
      inject: [ConfigService]
    }],
  exports: [PublishService],
})
export class PublishModule {}
