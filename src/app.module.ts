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
import { TipoVelocidadModule } from './tipo-velocidad/tipo-velocidad.module';
import { TipoAlmacenamientoExtraibleModule } from './tipo-almacenamiento-extraible/tipo-almacenamiento-extraible.module';
import { TipoConexionRedModule } from './tipo-conexion-red/tipo-conexion-red.module';
import { SistemaOperativoModule } from './sistema-operativo/sistema-operativo.module';
import { VersionSoModule } from './version-so/version-so.module';
import { ArquitecturaSoModule } from './arquitectura-so/arquitectura-so.module';
import { EstadoLicenciamientoModule } from './estado-licenciamiento/estado-licenciamiento.module';
import { EstadosSoModule } from './estados-so/estados-so.module';
import { PantallaModule } from './pantalla/pantalla.module';

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
    MarcaEquipoModule,
    ModeloEquipoModule,
    TipoEquipoModule,
    TipoProcesadorModule,
    ModeloProcesadorModule,
    TipoVelocidadModule,
    TipoAlmacenamientoExtraibleModule,
    TipoConexionRedModule,
    SistemaOperativoModule,
    VersionSoModule,
    ArquitecturaSoModule,
    EstadoLicenciamientoModule,
    EstadosSoModule,
    PantallaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
