import { Module } from '@nestjs/common';
import { MouseService } from './mouse.service';
import { MouseController } from './mouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mouse } from './entities/mouse.entity';
import { UsersModule } from 'src/users/users.module';
import { EquiposComputoModule } from 'src/equipos-computo/equipos-computo.module';
import { EstadoFuncionamientoModule } from 'src/estado-funcionamiento/estado-funcionamiento.module';

@Module({
  imports: [ 
    EstadoFuncionamientoModule,
    UsersModule,
    EquiposComputoModule,
    TypeOrmModule.forFeature([Mouse])],
  controllers: [MouseController],
  providers: [MouseService],
  exports: [ TypeOrmModule]
})
export class MouseModule {}
