import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { FileMetaData } from 'src/types';
import {S3, Endpoint} from 'aws-sdk'
// import path from 'path'

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisCache: RedisCacheService,
  ) {}
  UPLOAD_PATH = this.configService.get<string>('UPLOAD_DESTINATION');
  S3_ENDPOINT = this.configService.get<string>('S3_ENDPOINT');
  S3_BUCKET = this.configService.get<string>('S3_UPLOAD_BUCKET')

  s3Client = new S3({
    endpoint: new Endpoint(this.S3_ENDPOINT),
    credentials: {
      accessKeyId: this.configService.get<string>('S3_UPLOAD_KEY'),
      secretAccessKey: this.configService.get<string>('S3_UPLOAD_SECRET'),
    }
  })

  generateUUID() {
    return uuidv4();
  }

  generateFilePath(uuid: string) {
    return `${this.UPLOAD_PATH}/${uuid}`;
  }

  async saveFile(uuid: string, fileBuffer: Buffer) {
    await writeFile(this.generateFilePath(uuid), fileBuffer);
  }

  async uploadFile(uuid: string, fileBuffer: Buffer){
    const params = {
      Bucket: this.S3_BUCKET,
      Key: uuid,
      Body: fileBuffer
    };
    await this.s3Client.upload(params).promise()
  }

  async initiateUpload(file: Express.Multer.File) {
    /* processes upload and saves metadata to cache*/
    const fileId = this.generateUUID();
    const { buffer, originalname: filename, size, mimetype } = file;
    const res = await this.uploadFile(fileId, buffer);
    console.log(res)
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
