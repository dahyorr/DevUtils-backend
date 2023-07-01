import { Module } from '@nestjs/common';
import { UploadModule } from '../upload/upload.module';
import { ConfigModule } from '@nestjs/config';
// import { PublishModule } from 'src/publish/publish.module';
import { HashModule } from '../hash/hash.module';
import configuration from '../config/configuration';
// import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true
    }),
    HashModule,
    // ScheduleModule.forRoot()
  ],
})
export class AppModule { }
