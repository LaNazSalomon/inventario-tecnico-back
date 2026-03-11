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
import { TipoEquipoAlmacenamiento } from '../enums/tipo-equipo-almacenamiento.enum';

@Entity('equipos_almacenamiento')
export class EquipoAlmacenamiento {
  @PrimaryGeneratedColumn('uuid')
  idEquipoAlmacenamiento: string;

  @Column('text', {
    nullable: true,
  })
  inventario?: string;

  @Column('text', { nullable: true })
  serie?: string;

  @Column('text')
  capacidadAlmacenamiento: string; // Ejemplo: "1TB", "500GB"

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => MarcaEquipo)
  @JoinColumn({ name: 'marca_equipo_almacenamiento_id' })
  marcaEquipoAlmacenamiento: MarcaEquipo;

  @ManyToOne(() => ModeloEquipo)
  @JoinColumn({ name: 'modelo_equipo_almacenamiento_id' })
  modeloEquipoAlmacenamiento: ModeloEquipo;

  @ManyToOne(() => EstadoFuncionamiento)
  @JoinColumn({ name: 'estado_funcionamiento_id' })
  estadoFuncionamiento: EstadoFuncionamiento;

  @Column({
    type: 'enum',
    enum: TipoEquipoAlmacenamiento,
    default: TipoEquipoAlmacenamiento.DISCO_DURO,
  })
  tipoEquipoAlmacenamiento: TipoEquipoAlmacenamiento;
}
