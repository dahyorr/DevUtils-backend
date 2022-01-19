import { Controller, Get } from '@nestjs/common';
import { PublishService } from './publish.service';

@Controller('publish')
export class PublishController {
  constructor(private readonly publisherService: PublishService) {}

  @Get('test')
  testPublisher() {
    this.publisherService.publishMessage('sha256', 'whreksuberseugskvehrbfiueskrh' );
    return 'Here we go  ';
  }
}
