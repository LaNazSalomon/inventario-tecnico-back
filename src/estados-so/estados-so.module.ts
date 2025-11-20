import { Module } from '@nestjs/common';
import { EstadosSoService } from './estados-so.service';
import { EstadosSoController } from './estados-so.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoFuncionamiento, EstadoLicenciamiento } from './entities/estados-so.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([EstadoLicenciamiento, EstadoFuncionamiento])],
  controllers: [EstadosSoController],
  providers: [EstadosSoService],
  exports: [TypeOrmModule]
})
export class EstadosSoModule {}
