import { Module } from '@nestjs/common';
import { EquipoProyeccionService } from './equipo-proyeccion.service';
import { EquipoProyeccionController } from './equipo-proyeccion.controller';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { UsersModule } from 'src/users/users.module';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoProyeccion } from './entities/equipo-proyeccion.entity';
import { UtilsReportsModule } from 'src/utils-reports/utils-reports.module';
import { ReportesController } from './reportes/reportes-proyectores.controller';
import { ReportesProyectoresService } from './reportes/reportes-proyectores.service';

@Module({
  imports: [
    UtilsReportsModule,
    EstadoFuncionamientoModule,
    MarcaEquipoModule,
    ModeloEquipoModule,
    UsersModule,
    UnidadAcademicaModule,
    DepartamentoModule,
    TypeOrmModule.forFeature([ EquipoProyeccion ]),
  ],
  controllers: [EquipoProyeccionController, ReportesController],
  providers: [EquipoProyeccionService, ReportesProyectoresService],
  exports: [ TypeOrmModule ],
})
export class EquipoProyeccionModule {}
