import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { EquiposComputo } from 'src/equipos-computo/entities/equipos-computo.entity';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';

@Entity('teclado')
export class Teclado {
  @PrimaryGeneratedColumn('uuid')
  idTeclado: string;

  //TODO: Modificar a string y agregar validación de formato
  @Column('varchar')
  numeroInventario: string;

  @Column('varchar')
  marca: string;

  @Column('varchar')
  modelo: string;

  @Column('varchar')
  tipoConector: string;

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

  @ManyToOne(() => Departamento, { nullable: false })
  @JoinColumn({ name: 'idDepartamento' })
  departamento: Departamento;

  @ManyToOne(() => UnidadAcademica, { nullable: false })
  @JoinColumn({ name: 'idUnidadAcademica' })
  unidadAcademica: UnidadAcademica;
}
