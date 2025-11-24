import { Module } from '@nestjs/common';
import { TipoPantallaController } from './tipo-pantalla.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPantalla } from './entities/tipo-pantalla.entity';
import { ResolucionPantalla } from './entities/resolucion-pantalla.entity';
import { TamanoPantalla } from './entities/tamano-pantalla.entity';
import { ResolucionPantallaController } from './resolucion-pantalla.controller';
import { TamanoPantallaController } from './tamano-pantalla/tamano-pantalla.controller';
import { TipoPantallaService } from './tipo-pantalla.service';
import { TamanoPantallaService } from './tamano-pantalla/tamano-pantalla.service';
import { ResolucionPantallaService } from './resolucion-pantalla.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TipoPantalla,
      ResolucionPantalla,
      TamanoPantalla,
    ]),
  ],
  controllers: [
    ResolucionPantallaController,
    TamanoPantallaController,
    TipoPantallaController,
  ],
  providers: [
    TipoPantallaService,
    TamanoPantallaService,
    ResolucionPantallaService,
  ],
  exports: [TypeOrmModule],
})
export class PantallaModule {}
