import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { EquiposComputo } from 'src/equipos-computo/entities/equipos-computo.entity';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';

@Entity('mouse')
export class Mouse {
  @PrimaryGeneratedColumn('uuid')
  idMouse: string;

  @Column('int')
  numeroInventario: number;

  @Column('varchar')
  marca: string;

  @Column('varchar')
  modelo: string;

  @Column('varchar')
  tipoConector: string;

  @Column('varchar')
  mecanismo: string;

  @Column('varchar')
  serie: string;

  @Column({ type: 'date' })
  fechaVencimientoGarantia: Date;

  @ManyToOne(() => EstadoFuncionamiento)
  @JoinColumn({ name: 'idEstado' })
  estado: EstadoFuncionamiento;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'idEmpleado' })
  empleado: User;

  @ManyToOne(() => EquiposComputo)
  @JoinColumn({ name: 'idEquipo' })
  equipo: EquiposComputo;
}