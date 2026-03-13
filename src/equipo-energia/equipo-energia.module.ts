import { Module } from '@nestjs/common';
import { EquipoEnergiaService } from './equipo-energia.service';
import { EquipoEnergiaController } from './equipo-energia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { UsersModule } from 'src/users/users.module';
import { EquipoEnergia } from './entities/equipo-energia.entity';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { UtilsReportsModule } from 'src/utils-reports/utils-reports.module';
import { ReportesEnergiaController } from './reports/reportes-energia.controller';
import { ReportesEnergiaService } from './reports/reportes-energia.service';

@Module({
  imports: [
    EstadoFuncionamientoModule,
    MarcaEquipoModule,
    ModeloEquipoModule,
    DepartamentoModule,
    UnidadAcademicaModule,
    UtilsReportsModule,
    UsersModule,
    TypeOrmModule.forFeature([EquipoEnergia]),
  ],
  controllers: [EquipoEnergiaController, ReportesEnergiaController],
  providers: [EquipoEnergiaService, ReportesEnergiaService],
  exports: [TypeOrmModule],
})
export class EquipoEnergiaModule {}
