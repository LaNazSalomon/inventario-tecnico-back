import { Module } from '@nestjs/common';
import { EquipoTelefonicoService } from './equipo-telefonico.service';
import { EquipoTelefonicoController } from './equipo-telefonico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { UsersModule } from 'src/users/users.module';
import { EquipoTelefonico } from './entities/equipo-telefonico.entity';
import { UtilsReportsModule } from 'src/utils-reports/utils-reports.module';
import { ReportesTelefonicosController } from './reports/reportes-telefonicos.controller';
import { ReportesTelefonicosService } from './reports/reportes-telefonicos.service';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';

@Module({
  imports: [
    EstadoFuncionamientoModule,
    MarcaEquipoModule,
    ModeloEquipoModule,
    UsersModule,
    UnidadAcademicaModule,
    DepartamentoModule,
    UtilsReportsModule,
    TypeOrmModule.forFeature([EquipoTelefonico]),
  ],
  controllers: [EquipoTelefonicoController, ReportesTelefonicosController],
  providers: [EquipoTelefonicoService, ReportesTelefonicosService],
  exports: [TypeOrmModule],
})
export class EquipoTelefonicoModule {}
