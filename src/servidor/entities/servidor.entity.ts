import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ModeloEquipo } from 'src/modelo-equipo/entities/modelo-equipo.entity';
import { TipoProcesador } from 'src/tipo-procesador/entities/tipo-procesador.entity';
import { ModeloProcesador } from 'src/modelo-procesador/entities/modelo-procesador.entity';
import { VersionSO } from 'src/version-so/entities/version-so.entity';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { User } from 'src/users/entities/user.entity';
import { TipoServidor } from '../enums/tipo-servidor.enum';
import { SistemaOperativo } from 'src/equipos-computo/enums/sistema-operativo.enum';
import { Arquitectura } from 'src/equipos-computo/enums/arquitectura.enum';
import { EstadoLicencia } from 'src/equipos-computo/enums/estado-licencia.enum';
import { TipoConexionRed } from 'src/equipos-computo/enums/tipo-conexion-red.enum';

@Entity('servidor')
export class Servidor {
  @PrimaryGeneratedColumn('uuid')
  idServidor: string;

  @Column({
    type: 'enum',
    enum: TipoServidor,
    name: 'tipo_servidor',
  })
  tipoServidor: TipoServidor;

  @ManyToOne(() => MarcaEquipo)
  @JoinColumn({ name: 'marca_id' })
  marca: MarcaEquipo;

  @ManyToOne(() => ModeloEquipo)
  @JoinColumn({ name: 'modelo_id' })
  modelo: ModeloEquipo;

  @ManyToOne(() => TipoProcesador)
  @JoinColumn({ name: 'tipo_procesador_id' })
  tipoProcesador: TipoProcesador;

  @ManyToOne(() => ModeloProcesador)
  @JoinColumn({ name: 'modelo_procesador_id' })
  modeloProcesador: ModeloProcesador;

  @Column('float')
  velocidadProcesador: number;

  @Column('int')
  nucleosProcesador: number;

  @Column('int')
  cantidadProcesadores: number;

  @Column('int')
  cantidadMaxProcesadores: number;

  @Column('int')
  capacidadRAM: number;

  @Column('int')
  capacidadMaxRAM: number;

  @Column('int')
  capacidadAlmacenamiento: number;

  @Column('float')
  porcentajeUsoAlmacenamiento: number;

  @Column({
    type: 'enum',
    enum: SistemaOperativo,
    name: 'sistema_operativo',
  })
  sistemaOperativo: SistemaOperativo;

  @ManyToOne(() => VersionSO)
  @JoinColumn({ name: 'version_so_id' })
  versionSO: VersionSO;

  @Column({
    type: 'enum',
    enum: Arquitectura,
    name: 'arquitectura_so',
  })
  arquitecturaSO: Arquitectura;

  @Column({
    type: 'enum',
    enum: EstadoLicencia,
    name: 'estado_licencia_so',
  })
  estadoLicenciamientoSO: EstadoLicencia;

  @Column({
    type: 'enum',
    enum: TipoConexionRed,
    name: 'tipo_conexion',
  })
  tipoConexion: TipoConexionRed;

  @Column('text')
  direccionIPInterna: string;

  @Column('text')
  direccionIPExterna: string;

  @Column('text')
  rol: string;

  @Column('text')
  proposito: string;

  @Column('text')
  criticidad: string;

  @Column('text')
  puertosAbiertos: string;

  @Column('boolean')
  aplicaBalanceoCarga: boolean;

  @Column('text')
  politicaRespaldo: string;

  @Column('text')
  tipoPoliticaRespaldo: string;

  @Column('text')
  periodicidadRespaldo: string;

  @Column('text')
  serie: string;

  @Column({ type: 'date', nullable: true })
  fechaVencimientoGarantia: Date;

  @ManyToOne(() => EstadoFuncionamiento)
  @JoinColumn({ name: 'estado_funcionamiento_id' })
  estadoFuncionamiento: EstadoFuncionamiento;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'empleado_id' })
  empleado: User;
}
