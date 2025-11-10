import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { PuestoModule } from 'src/puesto/puesto.module';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DepartamentoModule, PuestoModule, EmailsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
