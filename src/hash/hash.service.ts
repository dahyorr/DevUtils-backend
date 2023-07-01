import { Injectable, NotFoundException } from '@nestjs/common';
import { HashType } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import { WorkerService } from 'src/worker/worker.service';
import { HashStatus } from '@prisma/client';

@Injectable()
export class HashService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly worker: WorkerService,
  ) { }

  async validatFileRecord(fileId: string) {
    /*  Returns file record if it exists in cache */
    const fileData = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!fileData) {
      throw new NotFoundException('This record does not exist');
    }
    return fileData
  }

  // parseFileHash(fileData: FileMetaData, hashType: HashType) {
  //   /* Parses provided record if requested hash object exists*/
  //   if (!fileData.hashes) {
  //     return null
  //   }
  //   const result = fileData.hashes.find(
  //     (hashObj) => hashObj.hashType === hashType,
  //   );

  //   return result ? result : null
  // }

  // checkHashExistience(fileData: File) {

  //   if (fileData.hashes) {
  //     return fileData.hashes
  //   }
  //   return false
  // }

  // async addPendingStatus(fileId: string, fileData: FileMetaData, hashType: HashType) {
  //   const hashPendingData = {
  //     hashType,
  //     status: "Pending" as const,
  //     hash: ""
  //   }
  //   if (fileData.hashes) {
  //     fileData.hashes.push(hashPendingData)
  //   }
  //   else {
  //     fileData.hashes = [hashPendingData]
  //   }
  //   // await this.redisCache.setValue(fileId, fileData)
  //   return true
  // }

  async initiateFileHash(
    fileId: string,
    hashTypes: HashType[],
  ) {
    /* starts file hashing */
    const fileData = await this.validatFileRecord(fileId)
    await this.prisma.hash.createMany({
      data: hashTypes.map(hashType => ({
        type: hashType,
        file_id: fileData.id
      }))
    })
    return {
      message: 'Hash request initaited',
    };
  }

  async getHashResult(fileId: string) {
    /* fetches file hashing result */
    const fileData = await this.prisma.file.findUnique({
      where: { id: fileId }, select: {
        id: true,
        key: true,
        hashes: {
          select: {
            id: true,
            type: true,
            status: true,
            hash: true
          }
        }
      }
    })
    if (!fileData) {
      throw new NotFoundException('This record does not exist');
    }
    const hashes = fileData.hashes
    const sortedHashes = hashes.reduce((acc, cur) => {
      acc[cur.status].push(cur)
      return acc
    }, {
      pending: [],
      completed: [],
      failed: [],
    } as Record<HashStatus, typeof hashes>)


    if (sortedHashes['pending'].length > 0) {
      const hashes = await Promise.all(sortedHashes['pending'].map(h => this.worker.hashRequest(fileData.id, h.type)))
      // const hashesToUpdate = sortedHashes['pending'].map((h, i) => ({ ...h, hash: hashes[i], status: 'completed' }))
      const res = await Promise.all(sortedHashes['pending'].map(({ id, ...hashData }, i) => (this.prisma.hash.update({
        where: { id },
        data: {
          ...hashData,
          hash: hashes[i].hash,
          status: 'completed'
        }
      }))))
      console.log(res)
    }

    return hashes
  }
}
