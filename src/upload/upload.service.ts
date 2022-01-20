import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { FileMetaData } from 'src/types';

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisCache: RedisCacheService,
  ) {}
  UPLOAD_PATH = this.configService.get<string>('UPLOAD_DESTINATION');

  generateUUID() {
    return uuidv4();
  }

  generateFilePath(uuid: string) {
    return `${this.UPLOAD_PATH}/${uuid}`;
  }

  async saveFile(uuid: string, fileBuffer: Buffer) {
    await writeFile(this.generateFilePath(uuid), fileBuffer);
  }

  async initiateUpload(file: Express.Multer.File) {
    /* processes upload and saves metadata to cache*/
    const fileId = this.generateUUID();
    const { buffer, originalname: filename, size, mimetype } = file;

    await this.saveFile(fileId, buffer);
    const metaData: FileMetaData = { 
      filename, 
      size, 
      mimetype,
      hashes: null
    };
    await this.redisCache.setValue<FileMetaData>(fileId, metaData);
    return { fileId, message: 'File uploaded successfully' };
  }
}
