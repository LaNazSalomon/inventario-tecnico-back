import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


//Puesto se refiere a que se dedica ejemplo, profesor de asignatura
//jefe de departamento de contabilidad
@Entity('puesto')
export class Puesto {
  @PrimaryGeneratedColumn('uuid')
  idPuesto: string;

  @Column('text')
  nombrePuesto: string;

  @Column('text')
  descripcion: string;

  @OneToMany(() => User, (u) => u.puesto, {

  })
  empleados: User[];
}
