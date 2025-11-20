import { Module } from '@nestjs/common';
import { TipoEquipoService } from './tipo-equipo.service';
import { TipoEquipoController } from './tipo-equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEquipo } from './entities/tipo-equipo.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([TipoEquipo])],
  controllers: [TipoEquipoController],
  providers: [TipoEquipoService],
  exports: [ TypeOrmModule ]
})
export class TipoEquipoModule {}
