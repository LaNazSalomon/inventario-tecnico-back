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
import { TipoEquipoEnergia } from '../enums/tipo-equipo-energia.enum';

@Entity('equipos_energia')
export class EquipoEnergia {
  @PrimaryGeneratedColumn('uuid')
  idEquipoEnergia: string;

  @Column('text', { nullable: true, unique: true })
  inventario?: string;

  @Column('text', { nullable: true })
  serie?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => MarcaEquipo)
  @JoinColumn({ name: 'marca_equipo_energia_id' })
  marcaEquipoEnergia: MarcaEquipo;

  @ManyToOne(() => ModeloEquipo)
  @JoinColumn({ name: 'modelo_equipo_energia_id' })
  modeloEquipoEnergia: ModeloEquipo;

  @ManyToOne(() => EstadoFuncionamiento)
  @JoinColumn({ name: 'estado_funcionamiento_id' })
  estadoFuncionamiento: EstadoFuncionamiento;

  @Column({
    type: 'enum',
    enum: TipoEquipoEnergia,
    default: TipoEquipoEnergia.NO_BREAK,
  })
  tipoEquipoEnergia: TipoEquipoEnergia;
}