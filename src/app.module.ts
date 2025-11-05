import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PuestoModule } from './puesto/puesto.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { UnidadAcademicaModule } from './unidad-academica/unidad-academica.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    PuestoModule,
    DepartamentoModule,
    UnidadAcademicaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
