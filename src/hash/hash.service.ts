import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  checkHashExistience(fileData: FileMetaData){
    if(fileData.hashes){
      return fileData.hashes
    }
    return false
  }

  async addPendingStatus(fileId: string, fileData: FileMetaData, hashType: HashType){
    const hashPendingData = {
      hashType,
      status: "Pending" as const,
      hash: ""
    }
    if(fileData.hashes){
      fileData.hashes.push(hashPendingData)
    }
    else{
      fileData.hashes = [hashPendingData]
    }
    await this.redisCache.setValue(fileId, fileData)
    return true
  }

  async initiateFileHash(
    fileId: string,
    hashTypes: HashType[],
  ) {
    /* starts file hashing */
    const fileData = await this.validatFileRecord(fileId)
    hashTypes.forEach(async (hashType) => {
      const hashedResult = this.parseFileHash(fileData, hashType)
      if(hashedResult){
        return;
      }
      await this.addPendingStatus(fileId, fileData, hashType)
      this.publishService.publishMessage(hashType, fileId);
    })
    return {
      message: 'Hash request initaited',
    };
  }

  async getHashResult(fileId: string) {
    /* fetches file hashing result */
    const fileData = await this.validatFileRecord(fileId)
    const hashedResult = this.checkHashExistience(fileData)

    if(!hashedResult){
      throw new BadRequestException(`File has not been hashed`)
    }

    return hashedResult
  }
}
