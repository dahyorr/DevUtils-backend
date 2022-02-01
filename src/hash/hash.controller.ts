import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HashRequestDto, HashGetRequestDto } from './dtos/hash-request.dto';
import { HashService } from './hash.service';

@Controller('hash')
export class HashController {
  constructor(private readonly service: HashService) {}

  @Post('initiate')
  intiateFileHash(@Body() { fileId, hashType }: HashRequestDto) {
    return this.service.initiateFileHash(fileId, hashType);
  }

  @Get('result')
  getHashResult(@Query() { fileId }: HashGetRequestDto) {
    return this.service.getHashResult(fileId);
  }
}
