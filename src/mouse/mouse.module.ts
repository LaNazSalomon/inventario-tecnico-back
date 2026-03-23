import { Module } from '@nestjs/common';
import { MouseService } from './mouse.service';
import { MouseController } from './mouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mouse } from './entities/mouse.entity';
import { UsersModule } from 'src/users/users.module';
import { EquiposComputoModule } from 'src/equipos-computo/equipos-computo.module';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { UtilsReportsModule } from 'src/utils-reports/utils-reports.module';
import { ReportesMousesService } from './reports/reportes-mouse.service';
import { ReportesMouseController } from './reports/reportes-mouse.controller';

@Module({
  imports: [
    EstadoFuncionamientoModule,
    UsersModule,
    EquiposComputoModule,
    DepartamentoModule,
    UnidadAcademicaModule,
    UtilsReportsModule,
    TypeOrmModule.forFeature([Mouse]),
  ],
  controllers: [MouseController, ReportesMouseController],
  providers: [MouseService, ReportesMousesService],
  exports: [TypeOrmModule],
})
export class MouseModule {}
