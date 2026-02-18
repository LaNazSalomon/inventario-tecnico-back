import { Module } from '@nestjs/common';
import { ServidorController } from './servidores.controller';
import { ServidorService } from './servidores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servidor } from './entities/servidor.entity';
import { UsersModule } from 'src/users/users.module';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { TipoProcesadorModule } from 'src/tipo-procesador/tipo-procesador.module';
import { ModeloProcesadorModule } from 'src/modelo-procesador/modelo-procesador.module';
import { VersionSoModule } from 'src/version-so/version-so.module';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servidor]),
    UsersModule,
    MarcaEquipoModule,
    ModeloEquipoModule,
    TipoProcesadorModule,
    ModeloProcesadorModule,
    VersionSoModule,
    EstadoFuncionamientoModule,
  ],
  controllers: [ServidorController],
  providers: [ServidorService],
  exports: [TypeOrmModule],
})
export class ServidoresModule {}
