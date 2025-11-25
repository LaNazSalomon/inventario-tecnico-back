import { Module } from '@nestjs/common';
import { MouseService } from './mouse.service';
import { MouseController } from './mouse.controller';

@Module({
  controllers: [MouseController],
  providers: [MouseService],
})
export class MouseModule {}
