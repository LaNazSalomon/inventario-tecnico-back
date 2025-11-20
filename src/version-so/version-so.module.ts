import { Module } from '@nestjs/common';
import { VersionSoService } from './version-so.service';
import { VersionSoController } from './version-so.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionSO } from './entities/version-so.entity';
import { SistemaOperativoModule } from 'src/sistema-operativo/sistema-operativo.module';

@Module({
  imports: [ TypeOrmModule.forFeature([VersionSO]), SistemaOperativoModule ],
  controllers: [VersionSoController],
  providers: [VersionSoService],
  exports: [ TypeOrmModule]
})
export class VersionSoModule {}
