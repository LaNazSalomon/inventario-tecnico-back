import { Module } from '@nestjs/common';
import { ModeloEquipoService } from './modelo-equipo.service';
import { ModeloEquipoController } from './modelo-equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloEquipo } from './entities/modelo-equipo.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ModeloEquipo ]) ],
  controllers: [ModeloEquipoController],
  providers: [ModeloEquipoService],
  exports: [ TypeOrmModule ]
})
export class ModeloEquipoModule {}
