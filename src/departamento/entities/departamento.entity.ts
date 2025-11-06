import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('departamento')
export class Departamento {
  @PrimaryGeneratedColumn('uuid')
  idDepartamento: string;

  @Column('text')
  nombreDepartamento: string;

  @ManyToOne(() => UnidadAcademica, (ua) => ua.departamentos,{
    nullable: false
  })
  @JoinColumn({ name: 'idUnidadAcademica' })
  unidadAcademica: UnidadAcademica;

  @OneToMany(() => User, (u) => u.departamento)
  empleados: User[];
}
