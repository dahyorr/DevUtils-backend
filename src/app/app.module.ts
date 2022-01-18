import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [UploadModule],
  providers: [AppService],
})
export class AppModule {}
