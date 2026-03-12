import { Module } from '@nestjs/common';
import { EquipoAlmacenamientoService } from './equipo-almacenamiento.service';
import { EquipoAlmacenamientoController } from './equipo-almacenamiento.controller';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoAlmacenamiento } from './entities/equipo-almacenamiento.entity';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';

@Module({
  imports: [
    EstadoFuncionamientoModule,
    MarcaEquipoModule,
    ModeloEquipoModule,
    UsersModule,
    UnidadAcademicaModule,
    DepartamentoModule,
    TypeOrmModule.forFeature([ EquipoAlmacenamiento ]),
  ],
  controllers: [EquipoAlmacenamientoController],
  providers: [EquipoAlmacenamientoService],
  exports: [ TypeOrmModule ],
})
export class EquipoAlmacenamientoModule {}
