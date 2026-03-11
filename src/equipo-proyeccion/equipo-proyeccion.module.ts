import { Module } from '@nestjs/common';
import { EquipoProyeccionService } from './equipo-proyeccion.service';
import { EquipoProyeccionController } from './equipo-proyeccion.controller';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { UsersModule } from 'src/users/users.module';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoProyeccion } from './entities/equipo-proyeccion.entity';

@Module({
  imports: [
    EstadoFuncionamientoModule,
    MarcaEquipoModule,
    ModeloEquipoModule,
    UsersModule,
    UnidadAcademicaModule,
    DepartamentoModule,
    TypeOrmModule.forFeature([ EquipoProyeccion ]),
  ],
  controllers: [EquipoProyeccionController],
  providers: [EquipoProyeccionService],
  exports: [ TypeOrmModule ],
})
export class EquipoProyeccionModule {}
