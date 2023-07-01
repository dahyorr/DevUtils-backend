import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    private prisma: PrismaService
  ) { }
  S3_BUCKET = this.configService.get<string>('S3_UPLOAD_BUCKET')
  S3_REGION = this.configService.get<string>('S3_REGION')
  s3Client = new S3Client({
    region: this.S3_REGION
  })

  async uploadFile(key: string, fileBuffer: Buffer) {
    const params = {
      Bucket: this.S3_BUCKET,
      Key: key,
      Body: fileBuffer,
    };
    await this.s3Client.send(new PutObjectCommand(params))
  }

  async initiateUpload(file: Express.Multer.File, prefix?: string) {
    /* processes upload and saves metadata to cache*/
    const fileId = uuidv4();
    let key = fileId
    if (prefix) {
      key = `${prefix}/${fileId}`
    }
    const { buffer, originalname: filename, size, mimetype } = file;
    await this.uploadFile(key, buffer);
    await this.prisma.file.create({
      data: {
        id: fileId,
        filename,
        size,
        mimetype,
        key
      }
    })
    // await this.redisCache.setValue<FileMetaData>(fileId, metaData);
    return { fileId, message: 'File uploaded successfully' };
  }
}
