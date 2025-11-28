import { forwardRef, Module } from '@nestjs/common';
import { UnidadAcademicaService } from './unidad-academica.service';
import { UnidadAcademicaController } from './unidad-academica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadAcademica } from './entities/unidad-academica.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ TypeOrmModule.forFeature( [ UnidadAcademica ] ), forwardRef(() => UsersModule), ],
  controllers: [UnidadAcademicaController],
  providers: [UnidadAcademicaService],
  exports: [ TypeOrmModule ]
})
export class UnidadAcademicaModule {}
