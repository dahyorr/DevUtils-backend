import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UploadModule } from '../upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { PublishModule } from 'src/publish/publish.module';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    PublishModule
  ],
  providers: [AppService],
})
export class AppModule {}
