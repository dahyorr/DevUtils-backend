import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UploadModule } from '../upload/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  providers: [AppService],
})
export class AppModule {}
