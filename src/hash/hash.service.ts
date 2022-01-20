import { Injectable } from '@nestjs/common';
import { PublishService } from 'src/publish/publish.service';

@Injectable()
export class HashService {
  constructor(private readonly publishService: PublishService) {}

  initiateFileHash(fileId: string, hashType: string) {
    // TODO: check if hash exists in database and throw error
    // TODO: check if hash of hashtype for file exists
    this.publishService.publishMessage(hashType, fileId);
    return {
      message: 'Hash request initaited',
    };
  }

  getHashResult(fileId: string, hashType: string) {
    //TODO: check db if hashtype is available or pending
    console.log(fileId, hashType);
    return 'Not Ready';
  }
}
