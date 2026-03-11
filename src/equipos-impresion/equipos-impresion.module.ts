import { Module } from '@nestjs/common';
import { EquiposImpresionService } from './equipos-impresion.service';
import { EquiposImpresionController } from './equipos-impresion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { UsersModule } from 'src/users/users.module';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { EquipoImpresion } from './entities/equipos-impresion.entity';

@Module({
  imports: [
    EstadoFuncionamientoModule,
    MarcaEquipoModule,
    ModeloEquipoModule,
    UsersModule,
    UnidadAcademicaModule,
    DepartamentoModule,
    TypeOrmModule.forFeature([EquipoImpresion]),
  ],
  controllers: [EquiposImpresionController],
  providers: [EquiposImpresionService],
  exports: [TypeOrmModule],
})
export class EquiposImpresionModule {}
