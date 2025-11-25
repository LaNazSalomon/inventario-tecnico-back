import { Module } from '@nestjs/common';
import { TecladoService } from './teclado.service';
import { TecladoController } from './teclado.controller';

@Module({
  controllers: [TecladoController],
  providers: [TecladoService],
})
export class TecladoModule {}
