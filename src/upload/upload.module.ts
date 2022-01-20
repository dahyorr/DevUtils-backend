import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, ConfigService],
  imports: [RedisCacheModule],
})
export class UploadModule {}
