import { Module } from '@nestjs/common';
import { EquiposComputoService } from './equipos-computo.service';
import { EquiposComputoController } from './equipos-computo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposComputo } from './entities/equipos-computo.entity';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { TipoEquipoModule } from 'src/tipo-equipo/tipo-equipo.module';
import { TipoProcesadorModule } from 'src/tipo-procesador/tipo-procesador.module';
import { ModeloProcesadorModule } from 'src/modelo-procesador/modelo-procesador.module';
import { TipoAlmacenamientoExtraibleModule } from 'src/tipo-almacenamiento-extraible/tipo-almacenamiento-extraible.module';
import { VersionSoModule } from 'src/version-so/version-so.module';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { UsersModule } from 'src/users/users.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { ReportesComputoController } from './reports/reportes-computo.controller';
import { ReportesComputoService } from './reports/reportes-computo.service';
import { UtilsReportsModule } from 'src/utils-reports/utils-reports.module';

@Module({
  imports: [
    MarcaEquipoModule,
    ModeloEquipoModule,
    TipoEquipoModule,
    TipoProcesadorModule,
    ModeloProcesadorModule,
    TipoAlmacenamientoExtraibleModule,
    VersionSoModule,
    TypeOrmModule,
    UnidadAcademicaModule,
    EstadoFuncionamientoModule,
    UsersModule,
    DepartamentoModule,
    UtilsReportsModule,
    TypeOrmModule.forFeature([EquiposComputo]),
  ],
  controllers: [EquiposComputoController, ReportesComputoController],
  providers: [EquiposComputoService, ReportesComputoService],
  exports: [TypeOrmModule],
})
export class EquiposComputoModule {}
