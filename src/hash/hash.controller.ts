import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HashDetailsDto } from './dtos/hash-details.dto';
import { HashService } from './hash.service';

@Controller('hash')
export class HashController {
  constructor(private readonly service: HashService) {}

  @Post('initiate')
  intiateFileHash(@Body() { fileId, hashType }: HashDetailsDto) {
    return this.service.initiateFileHash(fileId, hashType);
  }

  @Get('result')
  getHashResult(@Query() { fileId, hashType }: HashDetailsDto) {
    return this.service.getHashResult(fileId, hashType);
  }
}
