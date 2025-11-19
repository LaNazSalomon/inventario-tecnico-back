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
import { TipoVelocidadModule } from 'src/tipo-velocidad/tipo-velocidad.module';
import { TipoAlmacenamientoExtraibleModule } from 'src/tipo-almacenamiento-extraible/tipo-almacenamiento-extraible.module';
import { TipoConexionRedModule } from 'src/tipo-conexion-red/tipo-conexion-red.module';

@Module({
  imports: [
    MarcaEquipoModule,
    ModeloEquipoModule,
    TipoEquipoModule,
    TipoProcesadorModule,
    ModeloProcesadorModule,
    TipoVelocidadModule,
    TipoAlmacenamientoExtraibleModule,
    TipoConexionRedModule,
    TypeOrmModule.forFeature([EquiposComputo]),
  ],
  controllers: [EquiposComputoController],
  providers: [EquiposComputoService],
  exports: [TypeOrmModule],
})
export class EquiposComputoModule {}
