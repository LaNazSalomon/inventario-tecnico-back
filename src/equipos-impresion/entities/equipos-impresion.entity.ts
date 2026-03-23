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
import { ModoColorEquipoImpresion, TipoEquipoImpresion } from '../enums';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';

@Entity('equipos_impresion')
export class EquipoImpresion {
  @PrimaryGeneratedColumn('uuid')
  idEquipoImpresion: string;

  @Column('text')
  inventario: string;

  @Column('boolean', { default: false })
  compartida: boolean;

  @Column('boolean', { default: false })
  multifuncional: boolean;

  @Column('text')
  serie: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => EstadoFuncionamiento)
  @JoinColumn({ name: 'estado_funcionamiento_id' })
  estadoFuncionamiento: EstadoFuncionamiento;

  @ManyToOne(() => MarcaEquipo)
  @JoinColumn({ name: 'marca_equipo_impresion_id' })
  marcaEquipoImpresion: MarcaEquipo;

  @ManyToOne(() => ModeloEquipo)
  @JoinColumn({ name: 'modelo_equipo_impresion_id' })
  modeloEquipoImpresion: ModeloEquipo;

  @ManyToOne(() => UnidadAcademica)
  @JoinColumn({ name: 'unidadAcademica' })
  unidadAcademica: UnidadAcademica;

  @ManyToOne(() => Departamento)
  @JoinColumn({ name: 'departamento' })
  departamentoArea: Departamento;

  @Column({
    type: 'enum',
    enum: TipoEquipoImpresion,
    default: TipoEquipoImpresion.INYECCION_TINTA,
  })
  tipoEquipoImpresion: TipoEquipoImpresion;

  @Column({
    type: 'enum',
    enum: ModoColorEquipoImpresion,
    default: ModoColorEquipoImpresion.MONOCROMATICA,
  })
  modoColorEquipoImpresion: ModoColorEquipoImpresion;
}
