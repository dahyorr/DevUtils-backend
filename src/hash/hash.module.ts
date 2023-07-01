import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashController } from './hash.controller';
import { HashGateway } from './hash.gateway';
import { HashService } from './hash.service';
import { PrismaService } from 'src/prisma.service';
import { WorkerModule } from 'src/worker/worker.module';

@Module({
  controllers: [HashController],
  providers: [HashService, HashGateway, ConfigService, PrismaService],
  imports: [WorkerModule]
})
export class HashModule { }
