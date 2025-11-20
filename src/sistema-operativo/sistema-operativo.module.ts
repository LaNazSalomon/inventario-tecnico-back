import { Module } from '@nestjs/common';
import { SistemaOperativoService } from './sistema-operativo.service';
import { SistemaOperativoController } from './sistema-operativo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SistemaOperativo } from './entities/sistema-operativo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SistemaOperativo])],
  controllers: [SistemaOperativoController],
  providers: [SistemaOperativoService],
  exports: [TypeOrmModule],
})
export class SistemaOperativoModule {}
