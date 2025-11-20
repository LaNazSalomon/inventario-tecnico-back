import { Module } from '@nestjs/common';
import { PantallaService } from './pantalla.service';
import { PantallaController } from './pantalla.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResolucionPantalla, TamanoPantalla, TipoPantalla } from './entities/pantalla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoPantalla, ResolucionPantalla, TamanoPantalla])],
  controllers: [PantallaController],
  providers: [PantallaService],
  exports: [TypeOrmModule],
})
export class PantallaModule {}
