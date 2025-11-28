import { Module } from '@nestjs/common';
import { TecladoService } from './teclado.service';
import { TecladoController } from './teclado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teclado } from './entities/teclado.entity';
import { UsersModule } from 'src/users/users.module';
import { EquiposComputoModule } from 'src/equipos-computo/equipos-computo.module';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';

@Module({
  imports: [ 
    EstadoFuncionamientoModule,
    UsersModule,
    EquiposComputoModule,
    TypeOrmModule.forFeature([Teclado])],
  controllers: [TecladoController],
  providers: [TecladoService],
  exports: [TypeOrmModule]
})
export class TecladoModule {}
