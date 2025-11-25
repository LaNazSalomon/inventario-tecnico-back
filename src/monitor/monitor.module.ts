import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitor } from './entities/monitor.entity';
import { UsersModule } from 'src/users/users.module';
import { EstadoLicenciamientoModule } from 'src/estado-licenciamiento/estado-licenciamiento.module';
import { EquiposComputoModule } from 'src/equipos-computo/equipos-computo.module';

@Module({
  imports: [
    UsersModule,
    EstadoLicenciamientoModule,
    EquiposComputoModule,
    TypeOrmModule.forFeature([Monitor])],
  controllers: [MonitorController],
  providers: [MonitorService],
  exports: [TypeOrmModule]
})
export class MonitorModule {}
