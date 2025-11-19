import { Module } from '@nestjs/common';
import { TipoVelocidadService } from './tipo-velocidad.service';
import { TipoVelocidadController } from './tipo-velocidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoVelocidad } from './entities/tipo-velocidad.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([TipoVelocidad]) ],
  controllers: [TipoVelocidadController],
  providers: [TipoVelocidadService],
  exports: [ TypeOrmModule ]
})
export class TipoVelocidadModule {}
