import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ModeloEquipo } from 'src/modelo-equipo/entities/modelo-equipo.entity';
import { User } from 'src/users/entities/user.entity';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { TipoEquipoProyeccion, TipoPantalla } from '../enums';

@Entity('equipos_proyeccion')
export class EquipoProyeccion {
  @PrimaryGeneratedColumn('uuid')
  idEquipoProyeccion: string;

  @Column('text')
  inventario: string;

  @Column('text')
  serie: string;

  @Column('text', { nullable: true })
  pulgadas: string;

  @Column('text')
  resolucion: string;

  @Column('int', { default: 0 })
  cantidadPuertosUsbA: number;

  @Column('int', { default: 0 })
  cantidadPuertosUsbB: number;

  @Column('int', { default: 0 })
  cantidadPuertosVga: number;

  @Column('int', { default: 0 })
  cantidadPuertosDvi: number;

  @Column('int', { default: 0 })
  cantidadPuertosHdmi: number;

  @Column('int', { default: 0 })
  cantidadPuertosRj45: number;

  @Column('int', { default: 0 })
  cantidadPuertosRca: number;

  @Column('int', { default: 0 })
  cantidadPuertosSuperVideo: number;

  @Column({ type: 'date', nullable: true })
  fechaVencimientoGarantia?: Date;

  // Relaciones
  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => EstadoFuncionamiento)
  @JoinColumn({ name: 'estado_funcionamiento_id' })
  estadoFuncionamiento: EstadoFuncionamiento;

  @ManyToOne(() => MarcaEquipo)
  @JoinColumn({ name: 'marca_equipo_proyeccion_id' })
  marcaEquipoProyeccion: MarcaEquipo;

  @ManyToOne(() => ModeloEquipo)
  @JoinColumn({ name: 'modelo_equipo_proyeccion_id' })
  modeloEquipoProyeccion: ModeloEquipo;

  @ManyToOne(() => UnidadAcademica)
  @JoinColumn({ name: 'unidadAcademica' })
  unidadAcademica: UnidadAcademica;

  @ManyToOne(() => Departamento)
  @JoinColumn({ name: 'departamento' })
  departamentoArea: Departamento;

  @Column({
    type: 'enum',
    enum: TipoEquipoProyeccion,
    default: TipoEquipoProyeccion.PROYECTOR,
  })
  tipoEquipoProyeccion: TipoEquipoProyeccion;

  @Column({
  type: 'enum',
  enum: TipoPantalla,
  default: TipoPantalla.NA,
  nullable: true,
})
tipoPantalla?: TipoPantalla;
}
