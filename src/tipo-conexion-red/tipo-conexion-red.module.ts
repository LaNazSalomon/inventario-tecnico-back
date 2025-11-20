import { Module } from '@nestjs/common';
import { TipoConexionRedService } from './tipo-conexion-red.service';
import { TipoConexionRedController } from './tipo-conexion-red.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoConexionRed } from './entities/tipo-conexion-red.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoConexionRed])],
  controllers: [TipoConexionRedController],
  providers: [TipoConexionRedService],
  exports: [TypeOrmModule],
})
export class TipoConexionRedModule {}
