import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { User } from 'src/users/entities/user.entity';
import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ModeloEquipo } from 'src/modelo-equipo/entities/modelo-equipo.entity';
import { TipoEquipo } from 'src/tipo-equipo/entities/tipo-equipo.entity';
import { TipoProcesador } from 'src/tipo-procesador/entities/tipo-procesador.entity';
import { ModeloProcesador } from 'src/modelo-procesador/entities/modelo-procesador.entity';
import { TipoVelocidad } from 'src/tipo-velocidad/entities/tipo-velocidad.entity';
import { TipoAlmacenamientoExtraible } from 'src/tipo-almacenamiento-extraible/entities/tipo-almacenamiento-extraible.entity';
import { TipoConexionRed } from 'src/tipo-conexion-red/entities/tipo-conexion-red.entity';
import { VersionSO } from 'src/version-so/entities/version-so.entity';
import { EstadoLicenciamiento } from 'src/estado-licenciamiento/entities/estado-licenciamiento.entity';
import { EstadoFuncionamiento } from 'src/estados-so/entities/estados-so.entity';
import { TamanoPantalla } from 'src/pantalla/entities/tamano-pantalla.entity';
import { ResolucionPantalla } from 'src/pantalla/entities/resolucion-pantalla.entity';
import { TipoPantalla } from 'src/pantalla/entities/tipo-pantalla.entity';
import { SistemaOperativo } from '../enums/sistema-operativo.enum';
import { Arquitectura } from '../enums/arquitectura.enum';

@Entity('equipo-computo')
export class EquiposComputo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  inventario: number;

  @Column('text')
  nombreEquipo: string;

  @ManyToOne(() => TipoEquipo)
  @JoinColumn({ name: 'tipo_equipo_id' })
  tipoEquipo: TipoEquipo;

  @ManyToOne(() => MarcaEquipo)
  @JoinColumn({ name: 'marca_id' })
  marca: MarcaEquipo;

  @ManyToOne(() => ModeloEquipo)
  @JoinColumn({ name: 'modelo_id' })
  modelo: ModeloEquipo;

  @Column('text')
  direccionIP: string;

  @Column('text')
  direccionServidorDNS: string;

  @Column('text')
  mascaraSubRed: string;

  @Column('text')
  puertaEnlace: string;

  @Column('text')
  nombreDominio: string;

  @ManyToOne(() => TipoConexionRed)
  @JoinColumn({ name: 'tipo_conexion_red_id' })
  tipoConexionRed: TipoConexionRed;

  @ManyToOne(() => TipoProcesador)
  @JoinColumn({ name: 'tipo_procesador_id' })
  tipoProcesador: TipoProcesador;

  @ManyToOne(() => ModeloProcesador)
  @JoinColumn({ name: 'modelo_procesador_id' })
  modeloProcesador: ModeloProcesador;

  @Column('float')
  velocidadProcesador: number;

  @ManyToOne(() => TipoVelocidad)
  @JoinColumn({ name: 'tipo_velocidad_id' })
  tipoVelocidad: TipoVelocidad;

  @Column('int')
  nucleos: number;

  @Column('text')
  capacidadRam: string;

  @Column('text')
  capacidadAlmacenamiento: string;

  @Column({
    type: 'enum',
    enum: SistemaOperativo,
    name: 'sistema_operativo'
  })
  sistemaOperativo: SistemaOperativo;

  @ManyToOne(() => VersionSO)
  @JoinColumn({ name: 'version_so_id' })
  versionSO: VersionSO;

  @Column({
    type: 'enum',
    enum: Arquitectura,
    name: 'arquitectura_so'
  })
  arquitecturaSO: Arquitectura;

  @ManyToOne(() => EstadoLicenciamiento)
  @JoinColumn({ name: 'estado_licenciamiento_id' })
  estadoLicenciamiento: EstadoLicenciamiento;

  @ManyToOne(() => EstadoFuncionamiento)
  @JoinColumn({ name: 'estado_funcionamiento_id' })
  estadoFuncionamiento: EstadoFuncionamiento;

  @Column('text')
  serie: string;

  //* Vamos por aca
  @ManyToOne(() => TamanoPantalla)
  @JoinColumn({ name: 'tamano_pantalla_id' })
  pantallaPulgadas: TamanoPantalla;

  @ManyToOne(() => ResolucionPantalla)
  @JoinColumn({ name: 'resolucion_pantalla_id' })
  pantallaResolucion: ResolucionPantalla;

  @ManyToOne(() => TipoPantalla)
  @JoinColumn({ name: 'tipo_pantalla_id' })
  pantallaTipo: TipoPantalla;

  @Column('int')
  cantidadPuertosUSB: number;

  @Column('int')
  cantidadPuertosAudio: number;

  @Column('int')
  cantidadPuertosRed: number;

  @Column('int')
  cantidadPuertosHDMI: number;

  @Column('int')
  cantidadPuertosVGA: number;

  @Column('int')
  cantidadPuertosDVI: number;

  @Column('int')
  cantidadPuertosSerial: number;

  @Column('int')
  cantidadCamaraWeb: number;

  @Column('int')
  cantidadMicrofono: number;

  @ManyToOne(() => TipoAlmacenamientoExtraible)
  @JoinColumn({ name: 'tipo_almacenamiento_extraible_id' })
  tipoAlmacenamientoExtraible: TipoAlmacenamientoExtraible;

  @Column({ type: 'date' })
  fechaVencimientoGarantia: Date;

  @Column({ nullable: true })
  complemento: string;

  @Column('int')
  cantidadPuertosMiniHDMI: number;

  @Column('int')
  cantidadPuertosTarjetaMemoria: number;

  @Column('int')
  cantidadPuertosDIN5: number;

  @Column('int')
  cantidadPuertosDIN6: number;

  @Column('int')
  cantidadPuertosMiniDIN: number;

  @Column('varchar', { length: 50 })
  mac: string;

  @Column('int')
  cantidadPuertosParalelo: number;

  @Column('int')
  cantidadPuertosDisplayPort: number;

  @Column('int')
  cantidadPuertoSerialCom1: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario' })
  empleadoAsignado: User;

  @ManyToOne(() => UnidadAcademica)
  @JoinColumn({ name: 'unidadAcademica' })
  unidadAcademica: UnidadAcademica;

  @ManyToOne(() => Departamento)
  @JoinColumn({ name: 'departamento' })
  departamentoArea: Departamento;
}
