import { Module } from '@nestjs/common';
import { UnidadAcademicaService } from './unidad-academica.service';
import { UnidadAcademicaController } from './unidad-academica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadAcademica } from './entities/unidad-academica.entity';

@Module({
  imports: [ TypeOrmModule.forFeature( [ UnidadAcademica ] ) ],
  controllers: [UnidadAcademicaController],
  providers: [UnidadAcademicaService],
  exports: [ TypeOrmModule ]
})
export class UnidadAcademicaModule {}
