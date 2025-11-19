import { Module } from '@nestjs/common';
import { SistemaOperativoService } from './sistema-operativo.service';
import { SistemaOperativoController } from './sistema-operativo.controller';

@Module({
  controllers: [SistemaOperativoController],
  providers: [SistemaOperativoService],
})
export class SistemaOperativoModule {}
