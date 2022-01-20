import { Module } from '@nestjs/common';
import { PublishModule } from 'src/publish/publish.module';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { HashController } from './hash.controller';
import { HashService } from './hash.service';

@Module({
  controllers: [HashController],
  providers: [HashService],
  imports: [PublishModule, RedisCacheModule]
})
export class HashModule {}
