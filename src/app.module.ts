import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PuestoModule } from './puesto/puesto.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { UnidadAcademicaModule } from './unidad-academica/unidad-academica.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailsModule } from './emails/emails.module';
import { EquiposComputoModule } from './equipos-computo/equipos-computo.module';

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
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT!,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.EMAIL,
      },
    }),
    UsersModule,
    PuestoModule,
    DepartamentoModule,
    UnidadAcademicaModule,
    EmailsModule,
    EquiposComputoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
