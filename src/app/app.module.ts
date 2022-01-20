import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UploadModule } from '../upload/upload.module';
import { ConfigModule } from '@nestjs/config';
// import { PublishModule } from 'src/publish/publish.module';
import { HashModule } from '../hash/hash.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true
    }),
    HashModule 
  ],
  providers: [AppService],
})
export class AppModule {}
