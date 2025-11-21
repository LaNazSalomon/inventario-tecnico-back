import { Module } from '@nestjs/common';
import { EstadoLicenciamientoService } from './estado-licenciamiento.service';
import { EstadoLicenciamientoController } from './estado-licenciamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoLicenciamiento } from './entities/estado-licenciamiento.entity';
import { EstadoFuncionamiento } from './entities/estado-funcionamiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoLicenciamiento, EstadoFuncionamiento])],
  controllers: [EstadoLicenciamientoController],
  providers: [EstadoLicenciamientoService],
  exports: [TypeOrmModule],
})
export class EstadoLicenciamientoModule {}
