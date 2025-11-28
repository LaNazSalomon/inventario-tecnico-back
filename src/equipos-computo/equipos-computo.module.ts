import { Module } from '@nestjs/common';
import { EquiposComputoService } from './equipos-computo.service';
import { EquiposComputoController } from './equipos-computo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposComputo } from './entities/equipos-computo.entity';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { TipoEquipoModule } from 'src/tipo-equipo/tipo-equipo.module';
import { TipoProcesadorModule } from 'src/tipo-procesador/tipo-procesador.module';
import { ModeloProcesadorModule } from 'src/modelo-procesador/modelo-procesador.module';
import { TipoAlmacenamientoExtraibleModule } from 'src/tipo-almacenamiento-extraible/tipo-almacenamiento-extraible.module';
import { VersionSoModule } from 'src/version-so/version-so.module';
import { PantallaModule } from 'src/pantalla/pantalla.module';
import { UnidadAcademicaModule } from 'src/unidad-academica/unidad-academica.module';
import { UsersModule } from 'src/users/users.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';

@Module({
  imports: [
    MarcaEquipoModule,
    ModeloEquipoModule,
    TipoEquipoModule,
    TipoProcesadorModule,
    ModeloProcesadorModule,
    TipoAlmacenamientoExtraibleModule,
    VersionSoModule,
    TypeOrmModule,
    PantallaModule,
    UnidadAcademicaModule,
    EstadoFuncionamientoModule,
    UsersModule,
    DepartamentoModule,
    TypeOrmModule.forFeature([EquiposComputo]),
  ],
  controllers: [EquiposComputoController],
  providers: [EquiposComputoService],
  exports: [TypeOrmModule],
})
export class EquiposComputoModule {}
