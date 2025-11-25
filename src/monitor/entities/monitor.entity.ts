import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { EstadoFuncionamiento } from 'src/estados-so/entities/estados-so.entity';
import { EquiposComputo } from 'src/equipos-computo/entities/equipos-computo.entity';

@Entity('monitor')
export class Monitor {
  @PrimaryGeneratedColumn('uuid')
  idMonitor: string;

  @Column('int')
  numeroInventario: number;

  @Column('varchar')
  marca: string;

  @Column('varchar')
  modelo: string;

  @Column('float')
  pulgadas: number;

  @Column('varchar')
  resolucion: string;

  @Column('varchar')
  tipoPantalla: string;

  @Column('int')
  cantidadPuertosVGA: number;

  @Column('int')
  cantidadPuertosDVI: number;

  @Column('int')
  cantidadPuertosHDMI: number;

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