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
import { TipoConexionRed, TipoEquipoTelefonico } from '../enums';

@Entity('equipos_telefonicos')
export class EquipoTelefonico {
  @PrimaryGeneratedColumn('uuid')
  idEquipoTelefonico: string;

  @Column('text', { nullable: true, unique: true })
  inventario?: string;

  @Column('text', { nullable: true })
  serie?: string;

  @Column({
    type: 'enum',
    enum: TipoEquipoTelefonico,
    default: TipoEquipoTelefonico.TELEFONO,
  })
  tipoEquipoTelefonico: TipoEquipoTelefonico;

  @ManyToOne(() => MarcaEquipo)
  @JoinColumn({ name: 'marca_equipo_telefonico_id' })
  marcaEquipoTelefonico: MarcaEquipo;

  @ManyToOne(() => ModeloEquipo)
  @JoinColumn({ name: 'modelo_equipo_telefonico_id' })
  modeloEquipoTelefonico: ModeloEquipo;

  @Column({
    type: 'enum',
    enum: TipoConexionRed,
    default: TipoConexionRed.ETHERNET,
  })
  tipoConexionRed: TipoConexionRed;

  @Column('text', { nullable: true })
  direccionIp?: string;

  @Column('text', { nullable: true })
  numeroExtension?: string;

  @Column('boolean', { default: false })
  did: boolean; // SI/NO

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => EstadoFuncionamiento)
  @JoinColumn({ name: 'estado_funcionamiento_id' })
  estadoFuncionamiento: EstadoFuncionamiento;
}
