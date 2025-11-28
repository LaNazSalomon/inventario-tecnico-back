import { Module } from '@nestjs/common';
import { ModeloEquipoService } from './modelo-equipo.service';
import { ModeloEquipoController } from './modelo-equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloEquipo } from './entities/modelo-equipo.entity';
import { MarcaEquipoModule } from 'src/marca-equipo/marca-equipo.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ModeloEquipo]), MarcaEquipoModule, UsersModule],
  controllers: [ModeloEquipoController],
  providers: [ModeloEquipoService],
  exports: [TypeOrmModule],
})
export class ModeloEquipoModule {}
