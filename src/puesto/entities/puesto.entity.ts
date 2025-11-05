import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('puesto')
export class Puesto {
  @PrimaryGeneratedColumn('uuid')
  idPuesto: string;

  @Column('text')
  nombrePuesto: string;

  @Column('text')
  descripcion: string;

  @OneToMany(() => User, (u) => u.puesto)
  empleados: User[];
}
