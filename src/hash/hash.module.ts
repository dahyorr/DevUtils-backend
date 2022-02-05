import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PublishModule } from 'src/publish/publish.module';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { HashController } from './hash.controller';
import { HashGateway } from './hash.gateway';
import { HashService } from './hash.service';

@Module({
  controllers: [HashController],
  providers: [HashService, HashGateway],
  imports: [PublishModule, RedisCacheModule, ConfigService]
})
export class HashModule {}
