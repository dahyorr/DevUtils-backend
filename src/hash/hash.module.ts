import { Module } from '@nestjs/common';
import { PublishModule } from 'src/publish/publish.module';
import { HashController } from './hash.controller';
import { HashService } from './hash.service';

@Module({
  controllers: [HashController],
  providers: [HashService],
  imports: [PublishModule]
})
export class HashModule {}
