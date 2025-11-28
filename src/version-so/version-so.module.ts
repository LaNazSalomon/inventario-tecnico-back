import { Module } from '@nestjs/common';
import { VersionSoService } from './version-so.service';
import { VersionSoController } from './version-so.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionSO } from './entities/version-so.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ TypeOrmModule.forFeature([VersionSO]), UsersModule],
  controllers: [VersionSoController],
  providers: [VersionSoService],
  exports: [ TypeOrmModule]
})
export class VersionSoModule {}
