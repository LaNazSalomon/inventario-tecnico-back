import { Module } from '@nestjs/common';
import { EquipoTelefonicoService } from './equipo-telefonico.service';
import { EquipoTelefonicoController } from './equipo-telefonico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from 'src/modelo-equipo/modelo-equipo.module';
import { UsersModule } from 'src/users/users.module';
import { EquipoTelefonico } from './entities/equipo-telefonico.entity';

@Module({
  imports: [
    EstadoFuncionamientoModule,
    MarcaEquipoModule,
    ModeloEquipoModule,
    UsersModule,
    TypeOrmModule.forFeature([EquipoTelefonico]),
  ],
  controllers: [EquipoTelefonicoController],
  providers: [EquipoTelefonicoService],
  exports: [TypeOrmModule],
})
export class EquipoTelefonicoModule {}
