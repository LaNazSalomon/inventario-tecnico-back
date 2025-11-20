import { Module } from '@nestjs/common';
import { EstadoLicenciamientoService } from './estado-licenciamiento.service';
import { EstadoLicenciamientoController } from './estado-licenciamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoFuncionamiento, EstadoLicenciamiento } from './entities/estado-licenciamiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoLicenciamiento, EstadoFuncionamiento])],
  controllers: [EstadoLicenciamientoController],
  providers: [EstadoLicenciamientoService],
  exports: [TypeOrmModule],
})
export class EstadoLicenciamientoModule {}
