import { Module } from '@nestjs/common';
import { ArquitecturaSoService } from './arquitectura-so.service';
import { ArquitecturaSoController } from './arquitectura-so.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquitecturaSO } from './entities/arquitectura-so.entity';

@Module({
  imports: [ TypeOrmModule.forFeature( [ArquitecturaSO])],
  controllers: [ArquitecturaSoController],
  providers: [ArquitecturaSoService],
  exports: [TypeOrmModule]
})
export class ArquitecturaSoModule {}
