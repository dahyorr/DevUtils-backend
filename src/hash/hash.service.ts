import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { PublishService } from 'src/publish/publish.service';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { FileMetaData, HashType } from 'src/types';

@Injectable()
export class HashService {
  constructor(
    private readonly publishService: PublishService,
    private readonly redisCache: RedisCacheService,
  ) {}

  async validatFileRecord(fileId: string){
    /*  Returns file record if it exists in cache */
    const fileData = await this.redisCache.getValue<FileMetaData>(fileId);
    if (!fileData) {
      throw new NotFoundException('This record does not exist');
    }
    return fileData
  }

  parseFileHash(fileData: FileMetaData, hashType: HashType){
    /* Parses provided record if requested hash object exists*/
    if(!fileData.hashes){
      return null
    }
    const result = fileData.hashes.find(
      (hashObj) => hashObj.hashType === hashType,
    );

    return result ? result : null
  }

  async initiateFileHash(
    fileId: string,
    hashType: HashType,
    response: Response,
  ) {
    /* starts file hashing */
    const fileData = await this.validatFileRecord(fileId)
    const hashedResult = this.parseFileHash(fileData, hashType)
    
    if (hashedResult) {
      response.status(200).json({
        message: `File has already been hashed for ${hashType}`,
      });
      return;
    }

    this.publishService.publishMessage(hashType, fileId);
    return {
      message: 'Hash request initaited',
    };
  }

  async getHashResult(fileId: string, hashType: HashType) {
    /* fetches file hashing result */
    const fileData = await this.validatFileRecord(fileId)
    const hashedResult = this.parseFileHash(fileData, hashType)

    if(!hashedResult){
      throw new BadRequestException(`File has not been hashed for ${hashType}`)
    }

    return hashedResult
  }
}
