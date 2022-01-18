import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';

@Injectable()
export class UploadService {
  UPLOAD_PATH = process.env.UPLOAD_DESTINATION;

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
    const uuid = this.generateUUID();
    await this.saveFile(uuid, file.buffer);
    return uuid;
  }
}
