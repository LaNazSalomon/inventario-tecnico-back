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
import { MarcaEquipoModule } from './marca-equipo/marca-equipo.module';
import { ModeloEquipoModule } from './modelo-equipo/modelo-equipo.module';
import { TipoEquipoModule } from './tipo-equipo/tipo-equipo.module';
import { TipoProcesadorModule } from './tipo-procesador/tipo-procesador.module';
import { ModeloProcesadorModule } from './modelo-procesador/modelo-procesador.module';
import { TipoAlmacenamientoExtraibleModule } from './tipo-almacenamiento-extraible/tipo-almacenamiento-extraible.module';
import { VersionSoModule } from './version-so/version-so.module';
import { PantallaModule } from './pantalla/pantalla.module';
import { TecladoModule } from './teclado/teclado.module';
import { MouseModule } from './mouse/mouse.module';
import { MonitorModule } from './monitor/monitor.module';
import { EstadoFuncionamientoModule } from './estado-funcionamiento/estado-funcionamiento.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod' ? true : false,
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
    MarcaEquipoModule,
    ModeloEquipoModule,
    TipoEquipoModule,
    TipoProcesadorModule,
    ModeloProcesadorModule,
    TipoAlmacenamientoExtraibleModule,
    VersionSoModule,
    PantallaModule,
    TecladoModule,
    MouseModule,
    MonitorModule,
    EstadoFuncionamientoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
