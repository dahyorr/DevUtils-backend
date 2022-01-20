import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { HashDetailsDto } from './dtos/hash-details.dto';
import { HashService } from './hash.service';

@Controller('hash')
export class HashController {
  constructor(private readonly service: HashService) {}

  @Post('initiate')
  intiateFileHash(@Body() { fileId, hashType }: HashDetailsDto, @Res({passthrough: true}) res: Response) {
    return this.service.initiateFileHash(fileId, hashType, res);
  }

  @Get('result')
  getHashResult(@Query() { fileId, hashType }: HashDetailsDto) {
    return this.service.getHashResult(fileId, hashType);
  }
}
