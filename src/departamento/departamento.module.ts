import { Module } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { DepartamentoController } from './departamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';

@Module({
  imports: [ TypeOrmModule.forFeature( [ Departamento ] ), UnidadAcademicaModule ],
  controllers: [DepartamentoController],
  providers: [DepartamentoService],
  exports: [ TypeOrmModule ]
})
export class DepartamentoModule {}
