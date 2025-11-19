import { Module } from '@nestjs/common';
import { EquiposComputoService } from './equipos-computo.service';
import { EquiposComputoController } from './equipos-computo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposComputo } from './entities/equipos-computo.entity';

@Module({
  imports: [ TypeOrmModule.forFeature( [EquiposComputo] )],
  controllers: [EquiposComputoController],
  providers: [EquiposComputoService],
  exports: [ TypeOrmModule ]
})
export class EquiposComputoModule {}
