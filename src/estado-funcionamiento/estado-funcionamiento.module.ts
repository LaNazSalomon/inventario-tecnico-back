import { Module } from '@nestjs/common';
import { EstadoFuncionamientoService } from './estado-funcionamiento.service';
import { EstadoFuncionamientoController } from './estado-funcionamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoFuncionamiento } from './entities/estado-funcionamiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ EstadoFuncionamiento ])],
  controllers: [EstadoFuncionamientoController],
  providers: [EstadoFuncionamientoService],
  exports: [TypeOrmModule],
})
export class EstadoFuncionamientoModule {}
