import { Module } from '@nestjs/common';
import { ModeloProcesadorService } from './modelo-procesador.service';
import { ModeloProcesadorController } from './modelo-procesador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloProcesador } from './entities/modelo-procesador.entity';

@Module({
  imports: [ TypeOrmModule.forFeature( [ ModeloProcesador ] ) ],
  controllers: [ModeloProcesadorController],
  providers: [ModeloProcesadorService],
  exports: [ TypeOrmModule ]
})
export class ModeloProcesadorModule {}
