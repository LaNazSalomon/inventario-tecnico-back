import { forwardRef, Module } from '@nestjs/common';
import { PuestoService } from './puesto.service';
import { PuestoController } from './puesto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puesto } from './entities/puesto.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Puesto]), forwardRef(() => UsersModule)],
  controllers: [PuestoController],
  providers: [PuestoService],
  exports: [TypeOrmModule],
})
export class PuestoModule {}
