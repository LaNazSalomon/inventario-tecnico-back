import { Roles } from '../../common/enums/role.enum';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Puesto } from 'src/puesto/entities/puesto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';


//TODO: Poner la eliminacion en cascada en todas las partes


@Entity('users')
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
    enum: Roles,
    default: Roles.User,
  })
  rol: Roles;

  @Column('text', {
    unique: true,
    nullable: false
  })
  numeroEmpleado: string;

  @Column('text')
  nombreEmpleado: string;

  @Column('text')
  apellidoPaterno: string;

  @Column('text')
  apellidoMaterno: string;

  @Column( 'text', { unique: true } )
  email: string;

  @ManyToOne(() => Puesto, (p) => p.empleados, { nullable: false})
  @JoinColumn({ name: 'idPuesto' })
  puesto: Puesto;

  @ManyToOne(() => Departamento, (d) => d.empleados, {nullable: false})
  @JoinColumn({ name: 'idDepartamento' })
  departamento: Departamento;
}
