import { Module } from '@nestjs/common';
import { TecladoService } from './teclado.service';
import { TecladoController } from './teclado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teclado } from './entities/teclado.entity';
import { EstadoLicenciamientoModule } from 'src/estado-licenciamiento/estado-licenciamiento.module';
import { UsersModule } from 'src/users/users.module';
import { EquiposComputoModule } from 'src/equipos-computo/equipos-computo.module';

@Module({
  imports: [ 
    EstadoLicenciamientoModule,
    UsersModule,
    EquiposComputoModule,
    TypeOrmModule.forFeature([Teclado])],
  controllers: [TecladoController],
  providers: [TecladoService],
  exports: [TypeOrmModule]
})
export class TecladoModule {}
