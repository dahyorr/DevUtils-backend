import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, ConfigService, PrismaService],
})
export class UploadModule { }
