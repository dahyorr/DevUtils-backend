import { Controller, Get } from '@nestjs/common';
import { PublishService } from './publish.service';

@Controller('publish')
export class PublishController {
  constructor(private readonly publisherService: PublishService) {}

  @Get('test')
  testPublisher() {
    this.publisherService.publishMessage(
      'sha256',
      '30144822-d8de-41d6-9df6-bc9d32b50167',
    );
    return 'Here we go';
  }
}
