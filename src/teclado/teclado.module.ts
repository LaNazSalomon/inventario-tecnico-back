import { Module } from '@nestjs/common';
import { TecladoService } from './teclado.service';
import { TecladoController } from './teclado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teclado } from './entities/teclado.entity';
import { UsersModule } from 'src/users/users.module';
import { EquiposComputoModule } from 'src/equipos-computo/equipos-computo.module';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { UtilsReportsModule } from 'src/utils-reports/utils-reports.module';
import { ReportesTecladoController } from './reports/reportes-teclado.controller';
import { ReportesTecladoService } from './reports/reportes-teclado.service';

@Module({
  imports: [
    EstadoFuncionamientoModule,
    UsersModule,
    EquiposComputoModule,
    DepartamentoModule,
    UnidadAcademicaModule,
    UtilsReportsModule,
    TypeOrmModule.forFeature([Teclado]),
  ],
  controllers: [TecladoController, ReportesTecladoController],
  providers: [TecladoService, ReportesTecladoService],
  exports: [TypeOrmModule],
})
export class TecladoModule {}
