import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('estado-licenciamiento')
export class EstadoLicenciamiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  estado: string;
}

@Entity('estado-funcionamiento')
export class EstadoFuncionamiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  estado: string;
}