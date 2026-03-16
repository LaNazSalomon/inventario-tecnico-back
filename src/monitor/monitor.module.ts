import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitor } from './entities/monitor.entity';
import { UsersModule } from 'src/users/users.module';
import { EquiposComputoModule } from 'src/equipos-computo/equipos-computo.module';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { UtilsReportsModule } from 'src/utils-reports/utils-reports.module';
import { ReportesMonitorController } from './reports/reportes-monitor.controller';
import { ReportesMonitorService } from './reports/reportes-monitor.service';

@Module({
  imports: [
    UsersModule,
    EstadoFuncionamientoModule,
    EquiposComputoModule,
    DepartamentoModule,
    UnidadAcademicaModule,
    UtilsReportsModule,
    TypeOrmModule.forFeature([Monitor]),
  ],
  controllers: [MonitorController, ReportesMonitorController],
  providers: [MonitorService, ReportesMonitorService],
  exports: [TypeOrmModule],
})
export class MonitorModule {}
