import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitor } from './entities/monitor.entity';
import { UsersModule } from 'src/users/users.module';
import { EquiposComputoModule } from 'src/equipos-computo/equipos-computo.module';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';

@Module({
  imports: [
    UsersModule,
    EstadoFuncionamientoModule,
    EquiposComputoModule,
    TypeOrmModule.forFeature([Monitor])],
  controllers: [MonitorController],
  providers: [MonitorService],
  exports: [TypeOrmModule]
})
export class MonitorModule {}
