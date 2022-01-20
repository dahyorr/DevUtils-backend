import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}
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
    const fileId = this.generateUUID();
    await this.saveFile(fileId, file.buffer);
    // TODO: save file metadata to database
    return { fileId, message: 'File uploaded successfully' };
  }
}
