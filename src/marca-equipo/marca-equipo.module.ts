import { Module } from '@nestjs/common';
import { MarcaEquipoService } from './marca-equipo.service';
import { MarcaEquipoController } from './marca-equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaEquipo } from './entities/marca-equipo.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ TypeOrmModule.forFeature([MarcaEquipo]), UsersModule],
  controllers: [MarcaEquipoController],
  providers: [MarcaEquipoService],
  exports: [ TypeOrmModule]
})
export class MarcaEquipoModule {}
