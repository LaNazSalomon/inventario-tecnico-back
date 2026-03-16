import { Module } from '@nestjs/common';
import { EquiposImpresionService } from './equipos-impresion.service';
import { EquiposImpresionController } from './equipos-impresion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { UsersModule } from 'src/users/users.module';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { EquipoImpresion } from './entities/equipos-impresion.entity';
import { UtilsReportsModule } from 'src/utils-reports/utils-reports.module';
import { ReportesImpresorasController } from './reports/reportes-impresoras.controller';
import { ReportesImpresorasSerivce } from './reports/reportes-impresioras.service';

@Module({
  imports: [
    EstadoFuncionamientoModule,
    MarcaEquipoModule,
    ModeloEquipoModule,
    UsersModule,
    UnidadAcademicaModule,
    DepartamentoModule,
    UtilsReportsModule,
    TypeOrmModule.forFeature([EquipoImpresion]),
  ],
  controllers: [EquiposImpresionController, ReportesImpresorasController],
  providers: [EquiposImpresionService, ReportesImpresorasSerivce],
  exports: [TypeOrmModule],
})
export class EquiposImpresionModule {}
