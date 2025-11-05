import { Role } from 'common/enums/role.enum';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Puesto } from 'src/puesto/entities/puesto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  idEmpleado: string;

  // Es para que en consultas con findOneBy no nos devuelvan la contraseña
  @Column('text', {
    select: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  rol: Role;

  @Column('integer')
  numeroEmpleado: number;

  @Column('text')
  nombreEmpleado: string;

  @Column('text')
  apellidoPaterno: string;

  @Column('text')
  apellidoMaterno: string;

  @ManyToOne(() => Puesto, (p) => p.empleados)
  @JoinColumn({ name: 'idPuesto' })
  puesto: Puesto;

  @ManyToOne(() => Departamento, (d) => d.empleados)
  @JoinColumn({ name: 'idDepartamento' })
  departamento: Departamento;
}
