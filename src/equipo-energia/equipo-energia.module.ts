import { Module } from '@nestjs/common';
import { EquipoEnergiaService } from './equipo-energia.service';
import { EquipoEnergiaController } from './equipo-energia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { UsersModule } from 'src/users/users.module';
import { EquipoEnergia } from './entities/equipo-energia.entity';

@Module({
  imports: [
    EstadoFuncionamientoModule,
    MarcaEquipoModule,
    ModeloEquipoModule,
    UsersModule,
    TypeOrmModule.forFeature([EquipoEnergia]),
  ],
  controllers: [EquipoEnergiaController],
  providers: [EquipoEnergiaService],
  exports: [TypeOrmModule],
})
export class EquipoEnergiaModule {}
