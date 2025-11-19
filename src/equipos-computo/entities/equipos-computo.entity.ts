import { Departamento } from 'src/departamento/entities/departamento.entity';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';


@Entity('equipo-computo')
export class EquiposComputo {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  inventarioCSYT: string;

  @Column('text')
  nombreEquipo: string;

  @Column('text')
  tipoEquipo: string;

  @Column('text')
  marca: string;

  @Column('text')
  modelo: string;

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

  @Column('text')
  tipoConexionRed: string;

  @Column('text')
  tipoProcesador: string;

  @Column('text')
  modeloProcesador: string;

  @Column('float')
  velocidadProcesador: number;

  @Column('text')
  tipoVelocidad: string;

  @Column('int')
  nucleos: number;

  @Column('text')
  capacidadRam: string;

  @Column('text')
  capacidadAlmacenamiento: string;

  @Column('text')
  sistemaOperativo: string;

  @Column('text')
  versionSO: string;

  @Column('text')
  arquitecturaSO: string;

  @Column('text')
  estadoLicenciamiento: string;

  @Column('text')
  estadoFuncionamiento: string;

  @Column('text')
  serie: string;

  @Column('text')
  pantallaPulgadas: string;

  @Column('text')
  pantallaResolucion: string;

  @Column('text')
  pantallaTipo: string;

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

  @Column()
  tipoAlmacenamientoExtraible: string;

  @Column({ type: 'date' })
  fechaVencimientoGarantia: Date;

  @Column({ nullable: true })
  complemento: string;


  
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