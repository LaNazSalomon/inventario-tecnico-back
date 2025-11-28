import { Module } from '@nestjs/common';
import { ModeloProcesadorService } from './modelo-procesador.service';
import { ModeloProcesadorController } from './modelo-procesador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloProcesador } from './entities/modelo-procesador.entity';
import { TipoProcesadorModule } from 'src/tipo-procesador/tipo-procesador.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ TypeOrmModule.forFeature( [ ModeloProcesador ] ), TipoProcesadorModule, UsersModule ],
  controllers: [ModeloProcesadorController],
  providers: [ModeloProcesadorService],
  exports: [ TypeOrmModule ]
})
export class ModeloProcesadorModule {}
