import { Module } from '@nestjs/common';
import { TipoProcesadorService } from './tipo-procesador.service';
import { TipoProcesadorController } from './tipo-procesador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProcesador } from './entities/tipo-procesador.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ TipoProcesador ])],
  controllers: [TipoProcesadorController],
  providers: [TipoProcesadorService],
  exports: [ TypeOrmModule ]
})
export class TipoProcesadorModule {}
