import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('unidad-academica')
export class UnidadAcademica {
  @PrimaryGeneratedColumn('uuid')
  idUnidadAcademica: string;

  @Column('text')
  nombreUnidad: string;

  @OneToMany(() => Departamento, (d) => d.unidadAcademica)
  departamentos: Departamento[];
}
